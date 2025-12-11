import { useState } from "react";
import { ref, push, set } from "firebase/database";
import { db } from "../firebase.js";
import { CATEGORIES, OCCASIONS } from "../data.js";
import Spinner from "./Spinner.jsx";
import Alert from "./Alert.jsx";

// Curated default images per category
const CATEGORY_IMAGE_MAP = {
  Top: "/img/item-top.jpg",
  Bottom: "/img/item-bottom.jpg",
  Outerwear: "/img/item-outer.jpg",
  "Shoes & accessories": "/img/item-shoes.jpg",
};

export default function Add() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [occasion, setOccasion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);
    setSuccessMessage("");
    setIsSubmitting(true);

    const trimmedName = name.trim();

    if (!trimmedName) {
      setSubmitError("Please enter a name for this item.");
      setIsSubmitting(false);
      return;
    }

    try {
      const itemsRef = ref(db, "items");
      const newItemRef = push(itemsRef);

      const priceNumber = Number(price) || 0;

      const trimmedImageUrl = imageUrl.trim();
      const defaultImage =
        CATEGORY_IMAGE_MAP[category] || "/img/item-top.jpg";

      const itemData = {
        name: trimmedName,
        category,
        color: color.trim(),
        price: priceNumber,
        occasion,
        imageUrl: trimmedImageUrl || defaultImage,
        isFavorite: false,
        createdAt: Date.now(),
      };

      await set(newItemRef, itemData);

      // reset form
      setName("");
      setColor("");
      setPrice("");
      setOccasion("");
      setImageUrl("");
      setSuccessMessage("Item added to your closet.");
    } catch (err) {
      console.error(err);
      setSubmitError(
        "There was a problem saving your item. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="add-heading">
      <div className="page-header">
        <h2 id="add-heading" className="page-title">
          Add closet item
        </h2>
        <p className="page-description">
          Log a new piece into your capsule wardrobe with its category, color,
          and estimated price.
        </p>
      </div>

      {submitError && <Alert type="error" message={submitError} />}
      {successMessage && <Alert type="info" message={successMessage} />}

      <form className="card form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">Item name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Soft ivory shirt"
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="color">Color</label>
            <input
              id="color"
              type="text"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              placeholder="Warm ivory"
            />
          </div>

          <div className="form-field">
            <label htmlFor="price">Price (USD)</label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="120"
            />
          </div>

          <div className="form-field">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              value={occasion}
              onChange={(event) => setOccasion(event.target.value)}
            >
              <option value="">Any</option>
              {OCCASIONS.map((occ) => (
                <option value={occ} key={occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="imageUrl">
              Image URL <span className="label-optional">(optional)</span>
            </label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="Paste a direct image link, or leave blank to use a default look"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving…" : "Add item"}
          </button>
        </div>

        {isSubmitting && (
          <Spinner label="Saving your item to the capsule…" />
        )}
      </form>
    </section>
  );
}
