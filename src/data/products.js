const base = import.meta.env.BASE_URL;

export const homeProducts = [
  { id: 1, name: 'Espresso', price: 2.43, img: `${base}photo6.jpg` },
  { id: 2, name: 'Latte', price: 2.43, img: `${base}photo3.jpg` },
  { id: 3, name: 'Americano', price: 2.43, img: `${base}photo5.jpg` },
  { id: 4, name: 'Macchiato', price: 2.43, img: `${base}photo4.jpg` },
  { id: 5, name: 'Matcha', price: 2.43, img: `${base}photo1.jpg` },
  { id: 6, name: 'Coconut Latte', price: 2.43, img: `${base}photo13.jpg` },
];

export const menuProducts = [
  { id: 1, name: 'Espresso', price: 2.43, img: `${base}photo6.jpg` },
  { id: 2, name: 'Latte', price: 2.43, img: `${base}photo3.jpg` },
  { id: 3, name: 'Americano', price: 2.43, img: `${base}photo5.jpg` },
  { id: 4, name: 'Macchiato', price: 2.43, img: `${base}photo4.jpg` },
  { id: 5, name: 'Pink Berry Latte', price: 2.43, img: `${base}photo11.jpg` },
  { id: 6, name: 'Matcha', price: 2.43, img: `${base}photo1.jpg` },
  { id: 7, name: 'Rose Soda', price: 2.43, img: `${base}photo12.jpg` },
  { id: 8, name: 'Lychee Tea', price: 2.43, img: `${base}photo2.jpg` },
];

export const categories = [
  'Iced Coffee',
  'Milk Coffee',
  'Sweet Coffee',
  'Latte',
  'Espresso',
  'Matcha',
];