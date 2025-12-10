import { useMemo, useState } from "react";
import { CATEGORIES, OCCASIONS } from "../data.js";
import useFirebaseList from "../hooks/useFirebaseList.js";
import ItemCard from "../components/ItemCard.jsx";
import Spinner from "./Spinner.jsx";
import Alert from "./Alert.jsx";
import { db } from "../firebase.js";
import { ref, update } from "firebase/database";

export default function Closet() {
  const { data: items, loading, error } = useFirebaseList("items");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [occasion, setOccasion] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filteredItems = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesQuery =
        !lowerQuery ||
        (item.name && item.name.toLowerCase().includes(lowerQuery)) ||
        (item.color && item.color.toLowerCase().includes(lowerQuery));

      const matchesCategory = !category || item.category === category;
      const matchesOccasion = !occasion || item.occasion === occasion;
      const matchesFavorite = !favoritesOnly || item.isFavorite;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesOccasion &&
        matchesFavorite
      );
    });
  }, [items, query, category, occasion, favoritesOnly]);

  const itemCards = filteredItems.map((item) => {
    const handleToggleFavorite = async () => {
      if (!item.id) return;

      try {
        const itemRef = ref(db, `items/${item.id}`);
        await update(itemRef, { isFavorite: !item.isFavorite });
      } catch (err) {
        // We rely on Firebase error handling elsewhere. No alert() allowed.
        console.error("Error updating favorite:", err);
      }
    };

    return (
      <ItemCard
        key={item.id}
        item={item}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  });

  return (
    <section aria-labelledby="closet-heading">
      <div className="page-header">
        <h2 id="closet-heading" className="page-title">
          Closet
        </h2>
        <p className="page-description">
          Browse your capsule wardrobe, filter by category or occasion, and
          favorite pieces you love most.
        </p>
      </div>

      <form className="filter-form" aria-label="Filter closet items">
        <div className="filter-row">
          <div className="filter-field">
            <label htmlFor="query">Search</label>
            <input
              id="query"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or color"
            />
          </div>

          <div className="filter-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">All</option>
              {CATEGORIES.map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              value={occasion}
              onChange={(event) => setOccasion(event.target.value)}
            >
              <option value="">All</option>
              {OCCASIONS.map((occ) => (
                <option value={occ} key={occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-checkbox">
            <input
              id="favorites-only"
              type="checkbox"
              checked={favoritesOnly}
              onChange={(event) => setFavoritesOnly(event.target.checked)}
            />
            <label htmlFor="favorites-only">Favorites only</label>
          </div>
        </div>
      </form>

      {loading && <Spinner label="Loading items from your closet..." />}
      {error && (
        <Alert
          type="error"
          message="There was a problem loading closet items. Please refresh and try again."
        />
      )}

      {!loading && !error && filteredItems.length === 0 && (
        <p className="empty-state">
          No items match your filters yet. Try clearing filters or add new
          pieces to your closet.
        </p>
      )}

      {!loading && !error && filteredItems.length > 0 && (
        <div className="grid grid--items" aria-live="polite">
          {itemCards}
        </div>
      )}
    </section>
  );
}
