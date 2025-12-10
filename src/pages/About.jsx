import React from "react";

export default function About() {
  return (
    <div className="page-head">
      <h1>About The Capsule Closet</h1>
      <p className="screen-note">
        A focused wardrobe planner for people who want a calm, intentional
        closet instead of endless “nothing to wear” days.
      </p>

      <section className="card narrow" style={{ marginTop: "24px" }}>
        <h2 className="h3">What this app is for</h2>
        <p>
          The Capsule Closet is designed to help you curate a small, considered
          collection of outfits that actually fit your real life. Instead of
          scrolling through inspiration forever, you work with pieces you
          already own and new items you plan intentionally.
        </p>
        <ul>
          <li>Add clothing items with names, categories, colors, prices, and photos.</li>
          <li>Filter and favorite items in your closet to see what you truly wear.</li>
          <li>Build complete outfits and save them with estimated totals.</li>
          <li>Assign outfits to days in a weekly planner so your week is styled in advance.</li>
          <li>Review spending by category in a simple, readable price chart.</li>
        </ul>

        <h2 className="h3" style={{ marginTop: "24px" }}>
          Design and experience
        </h2>
        <p>
          The interface follows a neutral, editorial wardrobe aesthetic: soft
          ivory backgrounds, warm light and minimal chrome so the focus stays on
          your clothes. The goal is to feel like a modern brand’s internal tool
          rather than a generic template.
        </p>
        <ul>
          <li>Hero imagery that reflects a curated capsule wardrobe.</li>
          <li>Consistent spacing and serif typography across all pages.</li>
          <li>Clear navigation between Closet, Add item, Outfit builder, Planner and About.</li>
          <li>Accessible color contrast and keyboard-focusable controls where possible.</li>
        </ul>

        <h2 className="h3" style={{ marginTop: "24px" }}>
          How people might use it
        </h2>
        <p>
          The Capsule Closet can support seasonal closet edits, travel packing,
          budget planning or simply getting dressed for class and work without
          overthinking. It is meant to be a quiet space where a small number of
          pieces are styled thoughtfully and reused often.
        </p>
      </section>
    </div>
  );
}
