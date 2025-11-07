// Local images served from /public/img or /img if you kept that root.
// Prefer putting images into /public/img for Vite.
export const items = [
  { id: 1, name: 'White poplin shirt', category: 'Top', color: 'Ivory', price: 60,  src: '/img/item-top.jpg',   alt: 'White poplin shirt' },
  { id: 2, name: 'Blue straight denim', category: 'Bottom', color: 'Blue', price: 90, src: '/img/item-bottom.jpg', alt: 'Blue straight denim' },
  { id: 3, name: 'Black cardigan', category: 'Outer', color: 'Black', price: 120, src: '/img/item-outer.jpg',  alt: 'Black cardigan' },
  { id: 4, name: 'Black loafers', category: 'Shoes', color: 'Black', price: 150, src: '/img/item-shoes.jpg',   alt: 'Black loafers' },
  // repeat to show a grid of 8
  { id: 5, name: 'White poplin shirt', category: 'Top', color: 'Ivory', price: 60,  src: '/img/item-top.jpg',   alt: 'White poplin shirt' },
  { id: 6, name: 'Blue straight denim', category: 'Bottom', color: 'Blue', price: 90, src: '/img/item-bottom.jpg', alt: 'Blue straight denim' },
  { id: 7, name: 'Black cardigan', category: 'Outer', color: 'Black', price: 120, src: '/img/item-outer.jpg',  alt: 'Black cardigan' },
  { id: 8, name: 'Black loafers', category: 'Shoes', color: 'Black', price: 150, src: '/img/item-shoes.jpg',   alt: 'Black loafers' },
];

export const categories = ['All','Top','Bottom','Outer','Shoes'];
export const colors = ['All','Ivory','Beige','Black','Blue'];
export const prices = ['All','< $80','$80–$120','> $120'];
