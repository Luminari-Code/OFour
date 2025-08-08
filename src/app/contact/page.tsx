import ContactForm from '@/components/contact-form';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Get in Touch</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">We'd love to hear from you! Whether you have a question, a special request, or just want to say hello.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-headline font-bold mb-6 text-center">Contact Us</h2>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-headline font-semibold flex items-center gap-3"><MapPin className="text-primary"/>Our Location</h3>
            <p className="text-lg text-muted-foreground mt-2 leading-relaxed">Kalyaninagar, Pune.</p>
            <div className="mt-4 rounded-lg overflow-hidden shadow-md">
              <Image 
                src="/images/Location.png" 
                alt="Map showing bakery location" 
                data-ai-hint="city map pune"
                width={600}
                height={400}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-headline font-semibold flex items-center gap-3"><Clock className="text-primary"/>Business Hours</h3>
              <ul className="text-lg text-muted-foreground mt-2 space-y-1">
                <li>Tuesday - Friday: 7am - 6pm</li>
                <li>Saturday - Sunday: 8am - 4pm</li>
                <li>Monday: Closed</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-headline font-semibold flex items-center gap-3"><Phone className="text-primary"/>Call Us</h3>
              <a href="tel:+919822493951" className="text-lg text-muted-foreground hover:text-primary transition-colors mt-2 block">+91 98224 93951</a>

              <h3 className="text-2xl font-headline font-semibold flex items-center gap-3 mt-4"><Mail className="text-primary"/>Email Us</h3>
              <a href="mailto:reachout.ofour@gmail.com" className="text-lg text-muted-foreground hover:text-primary transition-colors mt-2 block">reachout.ofour@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
