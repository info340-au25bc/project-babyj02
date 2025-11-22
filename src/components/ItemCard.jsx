import { Link } from 'react-router-dom';

export default function ItemCard({ src, alt, name, category, color, price }) {
  return (
    <article className="card item">
      <img src={src} alt={alt} />
      <div className="item-body">
        <div className="item-meta">
          <span className="h4">{name}</span>
          <span className="price">${price}</span>
        </div>
        <ul className="chips">
          <li className="chip">{category}</li>
          <li className="chip">{color}</li>
          <li className="chip pill">All season</li>
        </ul>
        <Link className="btn ghost" to="/builder">Add to Builder</Link>
      </div>
    </article>
  );
}
