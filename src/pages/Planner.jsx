import React, { useState } from "react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const OUTFIT_OPTIONS = [
  {
    id: "none",
    name: "No outfit planned",
    description: "Leave this day open or decide in the morning.",
  },
  {
    id: "office",
    name: "Office capsule",
    description: "Ivory shirt, denim or tailored trouser, cardigan jacket.",
  },
  {
    id: "coffee",
    name: "Coffee catch up",
    description: "Denim, loafers, and a simple shirt with sleeves rolled.",
  },
  {
    id: "dinner",
    name: "Dinner out",
    description: "Black knit, denim, loafers, structured bag.",
  },
];

export default function Planner() {
  const [plan, setPlan] = useState(() => {
    const initial = {};
    DAYS.forEach((day) => {
      initial[day] = "none";
    });
    return initial;
  });

  function handleChange(day, outfitId) {
    setPlan((current) => ({
      ...current,
      [day]: outfitId,
    }));
  }

  function outfitForId(id) {
    return OUTIFT_BY_ID[id] || OUTIFT_BY_ID["none"];
  }

  const OUTIFT_BY_ID = OUTIFT_BY_ID_MAP;

  return (
    <section className="capsule-section">
      <header className="capsule-section-header">
        <h2 className="capsule-section-title">Weekly planner</h2>
        <p className="capsule-section-copy">
          Assign outfits to days of the week so you are not choosing under
          pressure at 8am. This view is designed to feel like a simple
          editorial planning board.
        </p>
      </header>

      <section className="card capsule-planner-card">
        <div className="capsule-planner-grid">
          {DAYS.map((day) => {
            const selectedId = plan[day];
            const outfit = OUTIFT_BY_ID_MAP[selectedId] || OUTIFT_BY_ID_MAP["none"];

            return (
              <div key={day} className="capsule-planner-day">
                <h3>{day}</h3>
                <select
                  value={selectedId}
                  onChange={(e) => handleChange(day, e.target.value)}
                >
                  {OUTFIT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
                <p className="capsule-planner-description">
                  {outfit.description}
                </p>
              </div>
            );
          })}
        </div>

        <footer className="capsule-planner-footer">
          <p>
            Tip: keep repeating outfits across the week. A true capsule is about
            rewearing your best pieces, not filling the grid with something
            different every single day.
          </p>
        </footer>
      </section>
    </section>
  );
}

// Build a simple lookup so the JSX stays tidy
const OUTIFT_BY_ID_MAP = OUTIFT_BY_ID_MAP_BUILDER();

function OUTIFT_BY_ID_MAP_BUILDER() {
  const map = {};
  OUTFIT_OPTIONS.forEach((opt) => {
    map[opt.id] = opt;
  });
  return map;
}
