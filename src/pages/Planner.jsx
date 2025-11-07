export default function Planner() {
  return (
    <>
      <div className="page-head">
        <h1 className="h2">Weekly Planner</h1>
        <p className="muted">7-day grid with outfit chips.</p>
      </div>

      <section className="planner">
        <div className="week-grid">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
            <div className="day" key={d}>
              <h3 className="day-name">{d}</h3>
              <div className="slots"><span className="chip pill">Empty</span></div>
            </div>
          ))}
        </div>

        <div className="page-head">
          <h2 className="h3">Outfits</h2>
        </div>
        <div className="drawer-grid">
          <div className="mini-outfit"><img src="/img/outfit-hero.jpg" alt="Neutral outfit flatlay" /></div>
          <div className="mini-outfit"><img src="/img/item-top.jpg" alt="White poplin shirt" /></div>
          <div className="mini-outfit"><img src="/img/item-bottom.jpg" alt="Blue straight denim" /></div>
          <div className="mini-outfit"><img src="/img/item-outer.jpg" alt="Black cardigan" /></div>
        </div>
      </section>
    </>
  );
}
