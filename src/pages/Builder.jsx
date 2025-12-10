import { useState, useMemo } from "react";
import useFirebaseList from "../hooks/useFirebaseList.js";
import Spinner from "./Spinner.jsx";
import Alert from "./Alert.jsx";
import { db } from "../firebase.js";
import { ref, push, set } from "firebase/database";

export default function Builder() {
  const { data: items, loading, error } = useFirebaseList("items");

  const [name, setName] = useState("");
  const [topId, setTopId] = useState("");
  const [bottomId, setBottomId] = useState("");
  const [outerId, setOuterId] = useState("");
  const [shoesId, setShoesId] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const tops = useMemo(
    () => items.filter((item) => item.category === "Top"),
    [items]
  );
  const bottoms = useMemo(
    () => items.filter((item) => item.category === "Bottom"),
    [items]
  );
  const outers = useMemo(
    () => items.filter((item) => item.category === "Outerwear"),
    [items]
  );
  const shoes = useMemo(
    () => items.filter((item) => item.category === "Shoes"),
    [items]
  );

  const selectedItems = useMemo(() => {
    const ids = [topId, bottomId, outerId, shoesId].filter(Boolean);
    return items.filter((item) => ids.includes(item.id));
  }, [items, topId, bottomId, outerId, shoesId]);

  const estimatedPrice = selectedItems.reduce(
    (total, item) => total + Number(item.price || 0),
    0
  );

  const handleSave = async (event) => {
    event.preventDefault();
    setSaveError(null);
    setSuccessMessage("");

    const trimmedName = name.trim();
    if (!trimmedName) {
      setSaveError("Please provide an outfit name.");
      return;
    }

    if (!topId && !bottomId && !outerId && !shoesId) {
      setSaveError("Select at least one item for your outfit.");
      return;
    }

    try {
      setSaving(true);
      const outfitsRef = ref(db, "outfits");
      const newOutfitRef = push(outfitsRef);

      const outfitData = {
        name: trimmedName,
        slots: {
          topId: topId || null,
          bottomId: bottomId || null,
          outerId: outerId || null,
          shoesId: shoesId || null
        },
        estimatedPrice,
        createdAt: Date.now()
      };

      await set(newOutfitRef, outfitData);

      setName("");
      setTopId("");
      setBottomId("");
      setOuterId("");
      setShoesId("");
      setSuccessMessage("Outfit saved.");
    } catch (err) {
      console.error(err);
      setSaveError("There was a problem saving your outfit. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const topOptions = tops.map((item) => (
    <option value={item.id} key={item.id}>
      {item.name || "Untitled top"}
    </option>
  ));
  const bottomOptions = bottoms.map((item) => (
    <option value={item.id} key={item.id}>
      {item.name || "Untitled bottom"}
    </option>
  ));
  const outerOptions = outers.map((item) => (
    <option value={item.id} key={item.id}>
      {item.name || "Untitled outerwear"}
    </option>
  ));
  const shoeOptions = shoes.map((item) => (
    <option value={item.id} key={item.id}>
      {item.name || "Untitled shoes"}
    </option>
  ));

  const selectedList = selectedItems.map((item) => (
    <li key={item.id} className="summary-list-item">
      <span>{item.name}</span>
      <span>${Number(item.price || 0).toFixed(2)}</span>
    </li>
  ));

  return (
    <section aria-labelledby="builder-heading">
      <div className="page-header">
        <h2 id="builder-heading" className="page-title">
          Outfit Builder
        </h2>
        <p className="page-description">
          Mix and match items from your closet to design a full outfit and
          estimate its total cost.
        </p>
      </div>

      {error && (
        <Alert
          type="error"
          message="There was a problem loading items. Please refresh the page."
        />
      )}
      {saveError && <Alert type="error" message={saveError} />}
      {successMessage && <Alert type="info" message={successMessage} />}

      {loading && <Spinner label="Loading closet items for builder..." />}

      {!loading && !error && items.length === 0 && (
        <p className="empty-state">
          You do not have any items in your closet yet. Add some items first
          before building an outfit.
        </p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="builder-layout">
          <form className="card form-card" onSubmit={handleSave}>
            <div className="form-field">
              <label htmlFor="outfit-name">Outfit name</label>
              <input
                id="outfit-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Neutral campus day"
                required
              />
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="top-select">Top</label>
                <select
                  id="top-select"
                  value={topId}
                  onChange={(event) => setTopId(event.target.value)}
                >
                  <option value="">None</option>
                  {topOptions}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="bottom-select">Bottom</label>
                <select
                  id="bottom-select"
                  value={bottomId}
                  onChange={(event) => setBottomId(event.target.value)}
                >
                  <option value="">None</option>
                  {bottomOptions}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="outer-select">Outerwear</label>
                <select
                  id="outer-select"
                  value={outerId}
                  onChange={(event) => setOuterId(event.target.value)}
                >
                  <option value="">None</option>
                  {outerOptions}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="shoes-select">Shoes</label>
                <select
                  id="shoes-select"
                  value={shoesId}
                  onChange={(event) => setShoesId(event.target.value)}
                >
                  <option value="">None</option>
                  {shoeOptions}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving ? "Saving outfit..." : "Save Outfit"}
              </button>
            </div>

            {saving && (
              <Spinner label="Saving this outfit to Firebase database..." />
            )}
          </form>

          <aside className="card summary-card" aria-label="Outfit summary">
            <h3 className="summary-title">Outfit summary</h3>
            {selectedItems.length === 0 ? (
              <p className="empty-state">
                Start selecting items on the left to preview this outfit.
              </p>
            ) : (
              <>
                <ul className="summary-list">{selectedList}</ul>
                <p className="summary-total">
                  Estimated total:{" "}
                  <strong>${estimatedPrice.toFixed(2)}</strong>
                </p>
              </>
            )}
          </aside>
        </div>
      )}
    </section>
  );
}
