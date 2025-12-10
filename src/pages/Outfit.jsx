import { Link } from "react-router-dom";
import useFirebaseList from "../hooks/useFirebaseList.js";
import Spinner from "./Spinner.jsx";
import Alert from "./Alert.jsx";

export default function Outfit() {
  const { data: outfits, loading, error } = useFirebaseList("outfits");

  const outfitCards = outfits
    .slice()
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .map((outfit) => (
      <article className="item-card" key={outfit.id}>
        <div className="item-image-wrapper">
          <img
            src="/img/outfit-hero.jpg"
            alt={`Outfit called ${outfit.name}`}
            className="item-image"
          />
        </div>
        <div className="item-body">
          <h3 className="item-title">{outfit.name}</h3>
          <p className="item-meta">
            Saved on{" "}
            {outfit.createdAt
              ? new Date(outfit.createdAt).toLocaleDateString()
              : "Unknown date"}
          </p>
          <p className="item-price">
            Est. total: $
            {Number(outfit.estimatedPrice || 0).toFixed(2)}
          </p>
          <div className="item-actions">
            <Link
              to={`/outfits/${outfit.id}`}
              className="primary-button primary-button--small"
            >
              View details
            </Link>
          </div>
        </div>
      </article>
    ));

  return (
    <section aria-labelledby="outfits-heading">
      <div className="page-header">
        <h2 id="outfits-heading" className="page-title">
          Saved Outfits
        </h2>
        <p className="page-description">
          Review outfits you saved from the builder and open them for details.
        </p>
      </div>

      {loading && <Spinner label="Loading saved outfits..." />}
      {error && (
        <Alert
          type="error"
          message="There was a problem loading outfits. Please refresh and try again."
        />
      )}

      {!loading && !error && outfits.length === 0 && (
        <p className="empty-state">
          You have not saved any outfits yet. Build one in the Outfit Builder.
        </p>
      )}

      {!loading && !error && outfits.length > 0 && (
        <div className="grid grid--items">{outfitCards}</div>
      )}
    </section>
  );
}
