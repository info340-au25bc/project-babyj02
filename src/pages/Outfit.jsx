export default function Outfit() {
  return (
    <>
      <div className="page-head">
        <h1 className="h2">Outfit Detail</h1>
        <p className="muted">A saved outfit with stats and actions.</p>
      </div>

      <section className="outfit-grid">
        <div className="card outfit-hero">
          <img className="hero-img" src="/img/outfit-hero.jpg" alt="Neutral outfit flatlay" />
        </div>

        <aside className="card">
          <h2 className="h3">Stats</h2>
          <dl className="stats">
            <dt>Total</dt><dd>$420</dd>
            <dt>Pieces</dt><dd>4</dd>
            <dt>Palette</dt><dd>Ivory, Beige, Black, Blue</dd>
            <dt>Last worn</dt><dd>Oct 30, 2025</dd>
          </dl>
          <div className="form-actions">
            <button className="btn" type="button">Assign date</button>
            <button className="btn ghost" type="button">Duplicate</button>
            <button className="btn danger" type="button">Delete</button>
          </div>
        </aside>
      </section>
    </>
  );
}
