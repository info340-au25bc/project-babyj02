import React from "react";

const categoryImageMap = {
  top: "/img/item-top.jpg",
  tops: "/img/item-top.jpg",
  shirt: "/img/item-top.jpg",

  bottom: "/img/item-bottom.jpg",
  bottoms: "/img/item-bottom.jpg",
  pants: "/img/item-bottom.jpg",
  trousers: "/img/item-bottom.jpg",
  jeans: "/img/item-bottom.jpg",

  outerwear: "/img/item-outer.jpg",
  coat: "/img/item-outer.jpg",
  jacket: "/img/item-outer.jpg",
  blazer: "/img/item-outer.jpg",
  cardigan: "/img/item-outer.jpg",

  shoes: "/img/item-shoes.jpg",
  footwear: "/img/item-shoes.jpg",
};

export default function ItemCard({ item, onToggleFavorite }) {
  const {
    name,
    category,
    color,
    occasion,
    price,
    notes,
    isFavorite,
    imageUrl,
  } = item;

  const normalizedCategory = (category || "").toLowerCase();
  const fallbackImage =
    categoryImageMap[normalizedCategory] || "/img/outfit-hero.jpg";

  const displayImage =
    (imageUrl && imageUrl.trim().length > 0 ? imageUrl.trim() : null) ||
    fallbackImage;

  return (
    <article className="card item" role="listitem">
      <figure>
        <img src={displayImage} alt={name || "Closet item"} />
      </figure>

      <div className="item-body">
        <div className="item-meta">
          <div>
            <h3 className="h4">{name}</h3>
            <p className="muted">
              {category || "Item"}
              {color ? ` · ${color}` : ""}
              {occasion ? ` · ${occasion}` : ""}
            </p>
          </div>

          {typeof price === "number" && !Number.isNaN(price) && (
            <span className="price">${price.toFixed(0)}</span>
          )}
        </div>

        {notes && <p>{notes}</p>}

        {onToggleFavorite && (
          <div className="item-actions">
            <button
              type="button"
              className="chip pill"
              onClick={() => onToggleFavorite(item)}
            >
              {isFavorite ? "★ Favorited" : "☆ Add to favorites"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
