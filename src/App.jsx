import { NavLink, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <header className="site-header">
        <div className="container header-bar">
          <a className="brand" href="/">The Capsule</a>
          <nav aria-label="Primary">
            <ul className="nav">
              <li><NavLink to="/" end>Closet</NavLink></li>
              <li><NavLink to="/add">Add Item</NavLink></li>
              <li><NavLink to="/builder">Builder</NavLink></li>
              <li><NavLink to="/outfit">Outfit</NavLink></li>
              <li><NavLink to="/planner">Planner</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-bar">
          <small>© 2025 Jackie Tran • <a href="mailto:jackie28@uw.edu">Contact</a></small>
        </div>
      </footer>
    </>
  );
}
