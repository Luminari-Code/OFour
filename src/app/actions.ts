
'use server';

import { z } from 'zod';
import { transporter } from '@/lib/email';
import { type CartItem } from '@/context/cart-context';
import { format, parseISO } from 'date-fns';
import allCoupons from '../../coupons.json';
import fs from 'fs/promises';
import path from 'path';

// Define coupon type based on coupons.json structure
type Coupon = {
  description: string;
  type: 'percentage' | 'free_item';
  value: number | string;
  condition?: {
    minCartValue?: number;
    firstOrder?: string;
  };
};

// Schema for Order Email
const sendOrderEmailSchema = z.object({
  cartItems: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.string(),
      image: z.string(),
      quantity: z.number(),
      isFree: z.boolean().optional(),
    })
  ),
  cartTotal: z.number(),
  name: z.string().min(2),
  phoneNumber: z.string(),
  deliveryDate: z.string(), // Changed to string to receive 'yyyy-MM-dd' format
  message: z.string().optional(),
  couponCode: z.string().optional(),
});

// Action to send Order Email
export async function sendOrderEmail(input: z.infer<typeof sendOrderEmailSchema>) {
  const validatedInput = sendOrderEmailSchema.safeParse(input);

  if (!validatedInput.success) {
    return { success: false, error: 'Invalid input.' };
  }

  const { cartItems, cartTotal, name, phoneNumber, deliveryDate, message, couponCode } = validatedInput.data;
  
  // --- Start: Save phone number for first-time user check ---
  const phoneNumbersPath = path.join(process.cwd(), 'phone-numbers.json');
  try {
    const data = await fs.readFile(phoneNumbersPath, 'utf-8');
    const phoneNumbers: string[] = JSON.parse(data);
    if (!phoneNumbers.includes(phoneNumber)) {
      phoneNumbers.push(phoneNumber);
      await fs.writeFile(phoneNumbersPath, JSON.stringify(phoneNumbers, null, 2), 'utf-8');
    }
  } catch (error) {
     if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // File doesn't exist, create it with the first number
      await fs.writeFile(phoneNumbersPath, JSON.stringify([phoneNumber], null, 2), 'utf-8');
    } else {
      console.error('Failed to read or write phone numbers file:', error);
      // Decide if you want to fail the order or just log the error
    }
  }
  // --- End: Save phone number ---
  
  const orderTime = new Date().toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  const subtotal = cartItems
    .filter(item => !item.isFree) // Exclude free items from subtotal calculation
    .reduce((total, item) => {
      const priceString = item.price.split(' ')[0] || "0";
      const price = parseFloat(priceString.replace(/[^0-9.-]+/g,""));
      return total + price * item.quantity;
    }, 0);

  let discount = 0;
  let finalTotal = cartTotal; // cartTotal from client is already the final total

  if (couponCode) {
    const couponsData = allCoupons as Record<string, Coupon>;
    const coupon = couponsData[couponCode];
    if (coupon && coupon.type === 'percentage') {
      discount = (subtotal * (coupon.value as number)) / 100;
    }
  }
  
  const tableRows = cartItems
    .map(
      (item) =>
        `<tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-family: Arial, sans-serif;">${item.name}${item.isFree ? ' (Free)' : ''}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-family: Arial, sans-serif;">${item.quantity}</td>
          <td style="border: 1px solid #ddd; padding: 8px; font-family: Arial, sans-serif;">${item.isFree ? '₹0.00' : item.price}</td>
        </tr>`
    )
    .join('');
    
  // Parse the date string without timezone conversion issues
  const correctedDeliveryDate = parseISO(deliveryDate);

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>New Order Received</h2>
      <p>An order has been placed via the website.</p>
      
      <h3 style="color: #774422;">Order Items:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fbeae7; color: #774422;">Item</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #fbeae7; color: #774422;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fbeae7; color: #774422;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;">Subtotal</td>
            <td style="border: 1px solid #ddd; padding: 8px;">₹${subtotal.toFixed(2)}</td>
          </tr>
          ${couponCode ? `
          <tr>
            <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;">Discount (${couponCode})</td>
            <td style="border: 1px solid #ddd; padding: 8px; color: green;">- ₹${discount.toFixed(2)}</td>
          </tr>
          ` : ''}
          <tr>
            <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">Total Amount</td>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">₹${finalTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <p><strong>(Payment will be coordinated shortly)</strong></p>
      
      <h3 style="color: #774422;">Customer Details:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; width: 30%;">Customer Name:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Phone Number:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${phoneNumber}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Requested Delivery Date:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${format(correctedDeliveryDate, 'PPP')}</td>
          </tr>
          ${couponCode ? `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Coupon Applied:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${couponCode}</td>
          </tr>
          ` : ''}
          ${message ? `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Message:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${message.replace(/\n/g, '<br>')}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Date and Time of Order:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${orderTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  const mailOptions = {
    from: `"Ò Four Online" <reachout.ofour@gmail.com>`,
    to: 'reachout.ofour@gmail.com',
    subject: `New Order Received - ${orderTime.split(',')[0]}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send order email.' };
  }
}

// Schema for Contact Form Email
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

// Action to send Contact Form Email
export async function sendContactEmail(input: z.infer<typeof contactFormSchema>) {
    const validatedInput = contactFormSchema.safeParse(input);

    if (!validatedInput.success) {
        return { success: false, error: 'Invalid input.' };
    }

    const { name, email, subject, message } = validatedInput.data;

    const emailHtml = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>New Contact Form Submission</h2>
            <p>You have received a new message from your website contact form.</p>
            <hr>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
        </div>
    `;

    const mailOptions = {
        from: `"Ò Four Online Contact" <reachout.ofour@gmail.com>`,
        to: 'reachout.ofour@gmail.com',
        subject: `New Contact Form Message: ${subject}`,
        replyTo: email,
        html: emailHtml,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Failed to send contact email:', error);
        return { success: false, error: 'Failed to send message.' };
    }
}


// Action to check if phone number exists
const checkPhoneNumberSchema = z.object({
  phoneNumber: z.string().min(10),
});

export async function checkPhoneNumber(input: z.infer<typeof checkPhoneNumberSchema>) {
    const validatedInput = checkPhoneNumberSchema.safeParse(input);
    if (!validatedInput.success) {
        return { isNew: true }; // Default to new if input is invalid
    }
    const { phoneNumber } = validatedInput.data;
    const phoneNumbersPath = path.join(process.cwd(), 'phone-numbers.json');

    try {
        const data = await fs.readFile(phoneNumbersPath, 'utf-8');
        const phoneNumbers: string[] = JSON.parse(data);
        return { isNew: !phoneNumbers.includes(phoneNumber) };
    } catch (error) {
         if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
             // File doesn't exist, so any number is a new user
            return { isNew: true };
         }
        console.error('Failed to read phone numbers file:', error);
        return { isNew: true }; // Fail safely, allowing the coupon
    }
}
