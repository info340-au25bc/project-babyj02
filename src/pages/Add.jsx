export default function Add() {
  return (
    <>
      <div className="page-head">
        <h1 className="h2">Add Item</h1>
        <p className="muted">Static form for now; will become controlled in final.</p>
      </div>

      <section className="card narrow">
        <form className="stack" onSubmit={e => e.preventDefault()}>
          <div className="form-grid">
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="e.g., White poplin shirt" />
            </div>
            <div className="form-control">
              <label htmlFor="category">Category</label>
              <select id="category">
                <option>Top</option><option>Bottom</option><option>Outer</option><option>Shoes</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input id="price" type="number" placeholder="120" />
              <div className="hint"><small className="muted">USD only</small></div>
            </div>
          </div>

          <fieldset className="stack">
            <legend>Color</legend>
            <div className="swatches">
              <label><input type="radio" name="c" /><span className="swatch sw-ivory" aria-hidden /></label>
              <label><input type="radio" name="c" /><span className="swatch sw-beige" aria-hidden /></label>
              <label><input type="radio" name="c" /><span className="swatch sw-black" aria-hidden /></label>
              <label><input type="radio" name="c" /><span className="swatch sw-blue" aria-hidden /></label>
            </div>
          </fieldset>

          <div className="form-control">
            <label htmlFor="photo">Photo</label>
            <div id="photo" className="dropzone"><span>Drop an image here</span></div>
          </div>

          <div className="form-actions">
            <button className="btn" type="submit">Save</button>
            <a className="btn ghost" href="/">Cancel</a>
          </div>
        </form>
      </section>
    </>
  );
}
