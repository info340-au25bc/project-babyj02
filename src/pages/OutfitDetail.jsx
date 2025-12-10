import { useParams } from "react-router-dom";
import useFirebaseList from "../hooks/useFirebaseList.js";
import Spinner from "./Spinner.jsx";
import Alert from "./Alert.jsx";

export default function OutfitDetail() {
  const { outfitId } = useParams();
  const { data: outfits, loading: outfitsLoading, error: outfitsError } =
    useFirebaseList("outfits");
  const { data: items, loading: itemsLoading, error: itemsError } =
    useFirebaseList("items");

  const loading = outfitsLoading || itemsLoading;
  const error = outfitsError || itemsError;

  const outfit = outfits.find((o) => o.id === outfitId);

  const findItemName = (id) => {
    if (!id) return "None";
    const item = items.find((i) => i.id === id);
    return item ? item.name : "Unknown item";
  };

  return (
    <section aria-labelledby="outfit-detail-heading">
      <div className="page-header">
        <h2 id="outfit-detail-heading" className="page-title">
          Outfit Details
        </h2>
      </div>

      {loading && <Spinner label="Loading outfit details..." />}
      {error && (
        <Alert
          type="error"
          message="There was a problem loading this outfit. Please go back and try again."
        />
      )}

      {!loading && !error && !outfit && (
        <p className="empty-state">
          This outfit could not be found. It may have been deleted.
        </p>
      )}

      {!loading && !error && outfit && (
        <article className="card detail-card">
          <header className="detail-card-header">
            <img
              src="/img/outfit-hero.jpg"
              alt={`Outfit called ${outfit.name}`}
              className="detail-image"
            />
            <div>
              <h3 className="detail-title">{outfit.name}</h3>
              <p className="detail-meta">
                Saved on{" "}
                {outfit.createdAt
                  ? new Date(outfit.createdAt).toLocaleString()
                  : "Unknown date"}
              </p>
              <p className="detail-meta">
                Estimated total: $
                {Number(outfit.estimatedPrice || 0).toFixed(2)}
              </p>
            </div>
          </header>

          <dl className="detail-list">
            <div className="detail-row">
              <dt>Top</dt>
              <dd>{findItemName(outfit.slots?.topId)}</dd>
            </div>
            <div className="detail-row">
              <dt>Bottom</dt>
              <dd>{findItemName(outfit.slots?.bottomId)}</dd>
            </div>
            <div className="detail-row">
              <dt>Outerwear</dt>
              <dd>{findItemName(outfit.slots?.outerId)}</dd>
            </div>
            <div className="detail-row">
              <dt>Shoes</dt>
              <dd>{findItemName(outfit.slots?.shoesId)}</dd>
            </div>
          </dl>
        </article>
      )}
    </section>
  );
}
