import { Link } from "react-router-dom";

export default function ItemCard({ item, onToggleFavorite }) {
  const { id, name, category, color, price, imageUrl, isFavorite, occasion } = item;

  const badge = occasion ? (
    <span className="item-badge" aria-label={`Occasion: ${occasion}`}>
      {occasion}
    </span>
  ) : null;

  const favoriteLabel = isFavorite ? "Remove from favorites" : "Mark as favorite";

  return (
    <article className="item-card">
      <div className="item-image-wrapper">
        <img
          src={imageUrl || "/img/item-top.jpg"}
          alt={name || "Closet item"}
          className="item-image"
        />
        {badge}
        <button
          type="button"
          className={`favorite-button ${isFavorite ? "favorite-button--active" : ""}`}
          onClick={onToggleFavorite}
          aria-label={favoriteLabel}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="item-body">
        <h3 className="item-title">{name}</h3>
        <p className="item-meta">
          <span>{category}</span>
          {color && <span aria-label={`Color: ${color}`}>{color}</span>}
        </p>
        <p className="item-price">${Number(price || 0).toFixed(2)}</p>
        <div className="item-actions">
          <Link to="/builder" className="secondary-button">
            Use in outfit
          </Link>
        </div>
      </div>
    </article>
  );
}
