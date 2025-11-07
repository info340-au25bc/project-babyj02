export default function Builder() {
  return (
    <>
      <div className="page-head">
        <h1 className="h2">Outfit Builder</h1>
        <p className="muted">Palette of items and empty canvas zones. All static for now.</p>
      </div>

      <section className="builder">
        <aside className="card palette">
          <h2 className="h3">Palette</h2>
          <div className="form-grid micro">
            <div className="form-control">
              <label htmlFor="search2">Search</label>
              <input id="search2" type="search" placeholder="Search pieces" />
            </div>
            <div className="form-control">
              <label htmlFor="cat2">Category</label>
              <select id="cat2"><option>All</option></select>
            </div>
          </div>
          <div className="thumbs">
            <figure className="thumb"><img src="/img/item-top.jpg" alt="White poplin shirt" /><figcaption>Top</figcaption></figure>
            <figure className="thumb"><img src="/img/item-bottom.jpg" alt="Blue straight denim" /><figcaption>Bottom</figcaption></figure>
            <figure className="thumb"><img src="/img/item-outer.jpg" alt="Black cardigan" /><figcaption>Outer</figcaption></figure>
            <figure className="thumb"><img src="/img/item-shoes.jpg" alt="Black loafers" /><figcaption>Shoes</figcaption></figure>
          </div>
        </aside>

        <section className="card canvas-area">
          <h2 className="h3">Canvas</h2>
          <div className="dropzones">
            <div className="dropzone"><span>Top</span></div>
            <div className="dropzone"><span>Bottom</span></div>
            <div className="dropzone"><span>Outer</span></div>
            <div className="dropzone"><span>Shoes</span></div>
          </div>

          <div className="sliders">
            <div className="form-control">
              <label htmlFor="formality">Formality</label>
              <input id="formality" type="range" min="0" max="100" defaultValue="40" />
            </div>
            <div className="form-control">
              <label htmlFor="warmth">Warmth</label>
              <input id="warmth" type="range" min="0" max="100" defaultValue="60" />
            </div>
          </div>

          <div className="palette-chips">
            <span className="chip">Ivory</span>
            <span className="chip">Beige</span>
            <span className="chip">Black</span>
            <span className="chip">Blue</span>
          </div>

          <div className="form-actions">
            <button className="btn" type="button">Save Outfit</button>
          </div>
        </section>
      </section>
    </>
  );
}
