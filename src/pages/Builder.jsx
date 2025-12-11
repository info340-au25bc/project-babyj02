import React, { useMemo, useState } from "react";

// Curated capsule items for the builder
const CAPSULE_ITEMS = [
  {
    id: "top",
    name: "Soft ivory shirt",
    category: "Top",
    price: 145,
    imageUrl: "/img/item-top.jpg",
  },
  {
    id: "bottom",
    name: "Tailored denim",
    category: "Bottom",
    price: 165,
    imageUrl: "/img/item-bottom.jpg",
  },
  {
    id: "outer",
    name: "Black cardigan jacket",
    category: "Outerwear",
    price: 210,
    imageUrl: "/img/item-outer.jpg",
  },
  {
    id: "shoes",
    name: "Loafers & mini bag",
    category: "Shoes & accessories",
    price: 320,
    imageUrl: "/img/item-shoes.jpg",
  },
];

function itemsForCategory(category) {
  return CAPSULE_ITEMS.filter((item) => item.category === category);
}

export default function Builder() {
  const [selectedIds, setSelectedIds] = useState({
    Top: "top",
    Bottom: "bottom",
    Outerwear: "outer",
    "Shoes & accessories": "shoes",
  });

  const selectedItems = useMemo(() => {
    return Object.values(selectedIds)
      .map((id) => CAPSULE_ITEMS.find((item) => item.id === id))
      .filter(Boolean);
  }, [selectedIds]);

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  function handleChange(role, id) {
    setSelectedIds((current) => ({
      ...current,
      [role]: id,
    }));
  }

  return (
    <section className="capsule-section">
      <header className="capsule-section-header">
        <h2 className="capsule-section-title">Outfit builder</h2>
        <p className="capsule-section-copy">
          Mix and match your core pieces to design a full look and see the
          estimated total at a glance.
        </p>
      </header>

      <div className="capsule-builder-layout">
        {/* Left side: selectors */}
        <section className="card capsule-builder-card">
          <h3 className="capsule-builder-heading">Select your pieces</h3>

          <div className="capsule-builder-fields">
            <BuilderSelect
              label="Top"
              items={itemsForCategory("Top")}
              value={selectedIds["Top"]}
              onChange={(id) => handleChange("Top", id)}
            />
            <BuilderSelect
              label="Bottom"
              items={itemsForCategory("Bottom")}
              value={selectedIds["Bottom"]}
              onChange={(id) => handleChange("Bottom", id)}
            />
            <BuilderSelect
              label="Outerwear"
              items={itemsForCategory("Outerwear")}
              value={selectedIds["Outerwear"]}
              onChange={(id) => handleChange("Outerwear", id)}
            />
            <BuilderSelect
              label="Shoes & accessories"
              items={itemsForCategory("Shoes & accessories")}
              value={selectedIds["Shoes & accessories"]}
              onChange={(id) => handleChange("Shoes & accessories", id)}
            />
          </div>

          <div className="capsule-builder-total">
            <span className="capsule-builder-total-label">Estimated total</span>
            <span className="capsule-builder-total-value">
              ${totalPrice.toLocaleString()}
            </span>
          </div>
        </section>

        {/* Right side: visual summary */}
        <section className="card capsule-builder-summary">
          <div className="capsule-builder-image">
            <img
              src="/img/outfit-hero.jpg"
              alt="Neutral outfit with bag, belt, and sunglasses"
            />
          </div>

          <div className="capsule-builder-summary-body">
            <h3 className="capsule-builder-heading">Outfit summary</h3>
            <ul className="capsule-builder-list">
              {selectedItems.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
            <p className="capsule-builder-note">
              This builder shows one possible combination of your capsule.
              Swap pieces above to explore different looks while keeping the
              same calm, neutral palette.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}

function BuilderSelect({ label, items, value, onChange }) {
  return (
    <div className="capsule-filter-field">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
