
export type MenuItem = {
  name: string;
  price: string;
  description: string;
  flavourProfile: string;
  image: string;
  hint: string;
};

export const menuData: { [key: string]: MenuItem[] } = {
  breads: [
    { name: 'Pizza Focaccia', price: '₹400', description: 'Focaccia - Housemade Pizza Sauce- Blend of Cheese.', flavourProfile: 'Comfort, Cheesy, Thick.', image: '/images/Pizza Focaccia.jpg', hint: 'pizza focaccia' },
    { name: 'Pesto and Tomato Focaccia', price: '₹400', description: 'Focaccia- Pesto Sauce- Tomato.', flavourProfile: 'Herby, Soft, Rustic.', image: '/images/Pesto and Tomato Focaccia.jpg', hint: 'pesto focaccia' },
    { name: 'Olive Onion Focaccia', price: '₹400', description: 'Focaccia- Olive- Onion.', flavourProfile: 'Citrus, Bright, Savoury.', image: '/images/Olive Onion Focaccia.png', hint: 'olive onion focaccia' },
    { name: 'Slider Buns', price: '₹30 for 10pc', description: 'Burger bun, but cuter.', flavourProfile: 'Soft, Golden, Tender.', image: '/images/Slider Buns.jpg', hint: 'slider buns' },
  ],
  cakes: [
    { name: 'Chocolate Truffle', price: '₹1200 / ₹2200', description: 'Chocolate Sponge- Dark Chocolate Ganache.', flavourProfile: 'Classic, Timeless, Elevated.', image: '/images/Chocolate Truffle.jpg', hint: 'chocolate truffle cake' },
    { name: 'Choco Coffee', price: '₹1200 / ₹2200', description: 'Chocolate Coffee Sponge- Coffee Dark Chocolate Ganache.', flavourProfile: 'Deep, Balanced, and Elegant.', image: '/images/Choco Coffee.jpg', hint: 'chocolate coffee cake' },
    { name: 'Choco-Hazelnut', price: '₹1300 / ₹2300', description: 'Chocolate Sponge- Roasted Hazelnut- Hazelnut Praline- Dark Chocolate Ganache.', flavourProfile: 'Nutty, Silky, Indulgent.', image: '/images/Choco-Hazelnut.jpg', hint: 'chocolate hazelnut cake' },
    { name: 'Choco Berry', price: '₹1300 / ₹2300', description: 'Chocolate Sponge- Fresh Strawberry- Strawberry Colius- Dark Chocolate Ganache.', flavourProfile: 'Fresh, Lush, Decadent.', image: '/images/Choco Berry.jpg', hint: 'chocolate berry cake' },
    { name: 'White Choco- Pista', price: '₹1300 / ₹2300', description: 'Pista Sponge- Pista Cream- While Chocolate Ganache.', flavourProfile: 'Smooth, Rich, Creamy.', image: '/images/White Choco- Pista.jpg', hint: 'pistachio cake' },
    { name: 'Carrot Walnut', price: '₹1000 / ₹1700', description: 'Carrot Walnut Sponge- Cream Cheese Frosting.', flavourProfile: 'Earthy, Spiced, Surprising.', image: '/images/Carrot Walnut.jpg', hint: 'carrot walnut cake' },
    { name: 'Lemon-Blueberry', price: '₹1000 / ₹1700', description: 'Lemon Sponge- Blueberry Colius- Cream Cheese Frosting.', flavourProfile: 'Zesty, Fresh, Fruity.', image: '/images/Lemon-Blueberry.jpg', hint: 'lemon blueberry cake' },
    { name: 'Tiramisu', price: '₹1200 / ₹2200', description: 'Housemade Savoiardi Sponge- Espresso- Mascarpone Cream.', flavourProfile: 'Strong, Bold, Light.', image: '/images/Tiramisu.jpg', hint: 'tiramisu cake' },
    { name: 'Biscoff Tres Leches', price: '₹800', description: 'Signature Sponge- Biscoff Mousse- Biscoff Flavoured Milk.', flavourProfile: 'Soft, Soaked, Comforting.', image: '/images/Biscoff Tres Leches.jpg', hint: 'tres leches cake' },
  ],
  cheesecakes: [
    { name: 'New York', price: '₹1200 / ₹1700', description: 'Graham Cracker Base- Cream Cheese Filling.', flavourProfile: 'Classic, Velvety, Baked to Perfection.', image: '/images/New York.jpg', hint: 'new york cheesecake' },
    { name: 'Biscoff', price: '₹1300 / ₹1800', description: 'Graham Cracker Base- Cream Cheese Filling- Biscoff Spread.', flavourProfile: 'Creamy, Indulgent, Biscoff-Rich.', image: '/images/Biscoff Cheescake.jpg', hint: 'biscoff cheesecake' },
    { name: 'Nutella', price: '₹1250 / ₹1750', description: 'Graham Cracker Base- Cream Cheese Filling- Nutella Spread.', flavourProfile: 'Rich, Mouthful, Chocolatey.', image: '/images/Nutella Cheescake.jpg', hint: 'nutella cheesecake' },
    { name: 'Oreo', price: '₹1250 / ₹1750', description: 'Oreo Base- Oreo Cream Cheese Filling- Ganache.', flavourProfile: 'Sweet, Creamy, Oreo.', image: '/images/Oreo.jpg', hint: 'oreo cheesecake' },
    { name: 'Berry', price: '₹1300 / ₹1800', description: 'Graham Cracker Base- Cream Cheese Filling- Housemade Berry Compote.', flavourProfile: 'Refreshing, Citrus, Balanced.', image: '/images/Berry.jpg', hint: 'berry cheesecake' },
    { name: 'Apple Crumble', price: '₹1300 / ₹1800', description: 'Graham Cracker Base- Spiced Cream Cheese Filling- Apple Cinnamon Compote- Spiced Crumble.', flavourProfile: 'Spiced, Warm, Winter Special.', image: '/images/Apple Crumble.jpg', hint: 'apple crumble cheesecake' },
    { name: "Irish Cream Bailey’s", price: '₹1350 / ₹1850', description: 'Graham Cracker Base- Bailey’s and Cream Cheese Filling- Bailey’s Cream- Cocoa Dust.', flavourProfile: 'Tipsy, Awakening, Indulgent.', image: "/images/Irish Cream Bailey's.jpg", hint: 'baileys cheesecake' },
    { name: 'Japanese', price: '₹1200 / ₹1700', description: 'Viral Jiggly Cheesecake. Contains eggs.', flavourProfile: 'Soft, Cloud-like, Mildly Sweet.', image: '/images/Japanese.jpg', hint: 'japanese cheesecake' },
  ],
  cookies: [
    { name: 'Jeera', price: '₹300 / 250g', description: 'Roasted Jeera- Sweet and Salty.', flavourProfile: 'Savoury, Buttery, Toasted.', image: '/images/Jeera.jpg', hint: 'jeera cookies' },
    { name: 'Red Velvet', price: '₹400 / 250g', description: 'Red Velvet with Chocolate Chunks- Cream Cheese Filling.', flavourProfile: 'Unique, Balanced, Buttery.', image: '/images/Red Velvet.jpg', hint: 'red velvet cookies' },
    { name: 'Oats and Cranberry', price: '₹400 / 250g', description: 'Whole Oats- Chopped Cranberry.', flavourProfile: 'Chewy, Tart, Rustic.', image: '/images/Oats and Cranberry.jpg', hint: 'oat cranberry cookies' },
    { name: 'Chocolate Chunk', price: '₹400 / 250g', description: 'Chocolate Chunk- Walnuts.', flavourProfile: 'Hearty, Soft, Loaded.', image: '/images/Chocolate Chunk.jpg', hint: 'chocolate chunk cookies' },
  ],
  teaCakes: [
    { name: 'Pound Cake', price: '₹300', description: 'Sugar- Flour- Butter- Boom!', flavourProfile: 'Airy, Soft, Classic.', image: '/images/Pound Cake.jpg', hint: 'pound cake' },
    { name: 'Carrot and Walnut', price: '₹350', description: 'Carrot- Walnut- Cinnamon.', flavourProfile: 'Warm, Spiced, Earthy.', image: '/images/Carrot and Walnut.jpg', hint: 'carrot walnut teacake' },
    { name: 'Saffron Pista', price: '₹350', description: 'Infused Saffron Milk- Chunky Pista.', flavourProfile: 'Festive, Royal, Soft.', image: '/images/Saffron Pista.jpg', hint: 'saffron pista teacake' },
    { name: 'Banana Bread', price: '₹300', description: 'Sweet Banana, Chocolate Chunks, Crunchy Walnut.', flavourProfile: 'Nostalgic, Moist, Homey.', image: '/images/Banana Bread.jpg', hint: 'banana bread' },
    { name: 'Orange and Olive Oil', price: '₹350', description: 'Orange Zest- Olive Oil Loaf.', flavourProfile: 'Deep, Zesty, Fragrant.', image: '/images/Orange and Olive Oil.jpg', hint: 'orange olive oil cake' },
  ],
  tartsAndPies: [
    { name: 'Key Lime Pie', price: '₹800', description: 'Pie Base- Lemon Curd- Lemon Cream.', flavourProfile: 'Refreshing, Buttery, Bright.', image: '/images/Key Lime Pie.jpg', hint: 'key lime pie' },
    { name: 'Berry Almond Tart', price: '₹1100', description: 'Pie Base- Almond Cream- Fresh Berries.', flavourProfile: 'Tart, Dense, Fruity.', image: '/images/Berry Almond Tart.jpg', hint: 'berry almond tart' },
    { name: 'Pecan Tart', price: '₹1200', description: 'Pie Base- Pecan Filling.', flavourProfile: 'Caramelized, Nutty, Sweet.', image: '/images/Pecan Tart.jpg', hint: 'pecan tart' },
    { name: 'Apple Pie', price: '₹1000', description: 'Pie Base, Apple and Cinnamon Filling.', flavourProfile: 'Earthy, Spiced, Buttery.', image: '/images/Apple Pie.jpg', hint: 'apple pie' },
  ],
  brownies: [
    { name: 'Double Chocolate', price: '₹500', description: 'Elevated Brownie with Double the Chocolate!', flavourProfile: 'Bold, Chocolate Heaven, Chunky.', image: '/images/Double Chocolate.jpg', hint: 'double chocolate brownie' },
    { name: 'Biscoff', price: '₹550', description: 'Chocolate Base, Biscoff Spread, Biscoff biscuits.', flavourProfile: 'Chocolatey, Smooth, Biscoff-y.', image: '/images/Biscoff-Brownie.jpg', hint: 'biscoff brownie' },
    { name: 'Nutella', price: '₹550', description: 'Chocolate Base, Nutella Spread, Roasted Hazelnut.', flavourProfile: 'Chocolatey, Nutty, Fudgy.', image: '/images/Nutella Brownie.jpg', hint: 'nutella brownie' },
    { name: 'Ricotta Cheese and Chocolate', price: '₹750', description: 'Chocolate Base- Ricotta Cheese Topping.', flavourProfile: 'Dense, Chocolate, Buttery.', image: '/images/Ricotta Cheese and Chocolate.jpg', hint: 'ricotta brownie' },
    { name: 'Brookie', price: '₹700', description: 'Cookie on a Brownie!', flavourProfile: 'Chewy, Nutty, Chocolatey.', image: '/images/Brookie.jpg', hint: 'brookie' },
    { name: 'Assorted Brownie', price: '₹650', description: 'Can’t choose? Get all you can!', flavourProfile: 'Chocolate, Smooth, Gifting.', image: '/images/Assorted Brownie.jpg', hint: 'assorted brownies' },
  ]
};
