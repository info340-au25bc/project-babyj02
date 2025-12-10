export default function About() {
  return (
    <section aria-labelledby="about-heading">
      <div className="page-header">
        <h2 id="about-heading" className="page-title">
          About The Capsule Closet
        </h2>
        <p className="page-description">
          A responsive, data-driven wardrobe planner built for the INFO 340
          final project.
        </p>
      </div>

      <article className="card">
        <h3>What this app does</h3>
        <p>
          The Capsule Closet helps you curate a small, intentional wardrobe and
          actually use it. You can:
        </p>
        <ul>
          <li>Add real clothing items with categories, colors, and prices.</li>
          <li>Filter and favorite items in your closet view.</li>
          <li>Build complete outfits and save them with estimated totals.</li>
          <li>Assign outfits to days in a weekly planner.</li>
          <li>Visualize your spending by category in a price chart.</li>
        </ul>

        <h3>Implementation details</h3>
        <p>
          This app is a single-page React application created with Vite. It
          uses:
        </p>
        <ul>
          <li>React components and hooks for stateful interactivity.</li>
          <li>react-router for client-side routing across multiple views.</li>
          <li>Firebase Realtime Database for persistent storage.</li>
          <li>Recharts for data visualization.</li>
        </ul>
      </article>
    </section>
  );
}
