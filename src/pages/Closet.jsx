import React, { useMemo, useState } from "react";

/**
 * Static capsule pieces so the page looks fully designed
 * and uses all of your curated images.
 *
 * Images live in public/img so we can reference them with /img/...
 */
const INITIAL_ITEMS = [
  {
    id: "top",
    name: "Soft ivory shirt",
    category: "Top",
    occasion: "Everyday",
    price: "$145",
    notes: "Relaxed fit, looks good half-tucked into denim.",
    imageUrl: "/img/item-top.jpg",
    favorite: true,
  },
  {
    id: "bottom",
    name: "Tailored denim",
    category: "Bottom",
    occasion: "Casual",
    price: "$165",
    notes: "Straight-leg, ankle length. Pairs with everything.",
    imageUrl: "/img/item-bottom.jpg",
    favorite: true,
  },
  {
    id: "outer",
    name: "Black cardigan jacket",
    category: "Outerwear",
    occasion: "Work",
    price: "$210",
    notes: "Structured knit that dresses up basics.",
    imageUrl: "/img/item-outer.jpg",
    favorite: false,
  },
  {
    id: "shoes",
    name: "Loafers & mini bag",
    category: "Shoes & accessories",
    occasion: "Dinner",
    price: "$320",
    notes: "Low-effort way to make jeans feel finished.",
    imageUrl: "/img/item-shoes.jpg",
    favorite: false,
  },
];

export default function Closet() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [occasion, setOccasion] = useState("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.notes.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesOccasion =
        occasion === "All" || item.occasion === occasion;

      const matchesFavorite = !favoritesOnly || item.favorite;

      return (
        matchesSearch && matchesCategory && matchesOccasion && matchesFavorite
      );
    });
  }, [items, search, category, occasion, favoritesOnly]);

  function toggleFavorite(id) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  }

  return (
    <>
      {/* Hero section with the rack image */}
      <section className="capsule-hero">
        <figure className="capsule-hero-media">
          <img src="/img/closet-hero.jpg" alt="Neutral capsule wardrobe on a clothing rack" />
          <figcaption className="capsule-hero-overlay">
            <p className="capsule-hero-eyebrow">Wardrobe planning studio</p>
            <h1 className="capsule-hero-title">
              Build a capsule that actually fits your real life
            </h1>
            <p className="capsule-hero-subtitle">
              Calm neutral pieces, intentional outfits, and a closet that feels
              like your own editorial rack instead of chaos.
            </p>
          </figcaption>
        </figure>
      </section>

      {/* Main closet content */}
      <section className="capsule-section">
        <header className="capsule-section-header">
          <h2 className="capsule-section-title">Closet</h2>
          <p className="capsule-section-copy">
            Browse your capsule wardrobe, filter by category or occasion, and
            star the pieces you reach for the most.
          </p>
        </header>

        {/* Filters */}
        <div className="capsule-filters card">
          <div className="capsule-filter-field">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="e.g. cream knit, black trousers"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="capsule-filter-row">
            <div className="capsule-filter-field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>Top</option>
                <option>Bottom</option>
                <option>Outerwear</option>
                <option>Shoes & accessories</option>
              </select>
            </div>

            <div className="capsule-filter-field">
              <label htmlFor="occasion">Occasion</label>
              <select
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              >
                <option>All</option>
                <option>Everyday</option>
                <option>Casual</option>
                <option>Work</option>
                <option>Dinner</option>
              </select>
            </div>
          </div>

          <label className="capsule-checkbox">
            <input
              type="checkbox"
              checked={favoritesOnly}
              onChange={(e) => setFavoritesOnly(e.target.checked)}
            />
            <span>Favorites only</span>
          </label>
        </div>

        {/* Grid of capsule pieces */}
        <section className="capsule-items">
          <header className="capsule-items-header">
            <h3>Core pieces in your capsule</h3>
            <p>
              A tight edit of pieces that can be remixed across outfits: shirt,
              denim, outer layer, and finishing accessories.
            </p>
          </header>

          {filteredItems.length === 0 ? (
            <p className="capsule-empty">
              No pieces match this filter yet. Try clearing a filter or search
              term.
            </p>
          ) : (
            <div className="capsule-items-grid">
              {filteredItems.map((item) => (
                <article key={item.id} className="capsule-item-card">
                  <div className="capsule-item-media">
                    <img src={item.imageUrl} alt={item.name} />
                    <button
                      type="button"
                      className={
                        item.favorite
                          ? "capsule-fav-button capsule-fav-button--active"
                          : "capsule-fav-button"
                      }
                      onClick={() => toggleFavorite(item.id)}
                      aria-pressed={item.favorite}
                    >
                      {item.favorite ? "★" : "☆"}
                    </button>
                  </div>

                  <div className="capsule-item-body">
                    <h4>{item.name}</h4>
                    <p className="capsule-item-meta">
                      {item.category} · {item.occasion}
                    </p>
                    <p className="capsule-item-notes">{item.notes}</p>
                    <p className="capsule-item-price">{item.price}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </>
  );
}
