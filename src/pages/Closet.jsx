import { useMemo, useState } from 'react';
import ItemCard from '../components/ItemCard.jsx';
import { items, categories, colors, prices } from '../data.js';

export default function Closet() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');
  const [color, setColor] = useState('All');
  const [price, setPrice] = useState('All');

  const filtered = useMemo(() => {
    return items.filter(it => {
      const hitQ = q.trim() === '' || it.name.toLowerCase().includes(q.toLowerCase());
      const hitCat = category === 'All' || it.category === category;
      const hitColor = color === 'All' || it.color === color;
      const hitPrice =
        price === 'All' ||
        (price === '< $80' && it.price < 80) ||
        (price === '$80–$120' && it.price >= 80 && it.price <= 120) ||
        (price === '> $120' && it.price > 120);
      return hitQ && hitCat && hitColor && hitPrice;
    });
  }, [q, category, color, price]);

  return (
    <>
      <section className="card hero">
        <img className="hero-img" src="/img/closet-hero.jpg" alt="Soft neutral wardrobe backdrop" />
        <div className="hero-copy">
          <h1 className="h2">Closet</h1>
          <p className="muted">Filter and browse your capsule pieces.</p>
        </div>
      </section>

      <section className="card">
        <h2 className="h3">Filter</h2>
        <div className="form-grid">
          <div className="form-control">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="search"
              placeholder="Poplin, denim, loafers"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="cat">Category</label>
            <select id="cat" value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="color">Color</label>
            <select id="color" value={color} onChange={e => setColor(e.target.value)}>
              {colors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="price">Price</label>
            <select id="price" value={price} onChange={e => setPrice(e.target.value)}>
              {prices.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="grid">
        {filtered.map(it => (
          <ItemCard key={it.id} {...it} />
        ))}
      </section>
    </>
  );
}
