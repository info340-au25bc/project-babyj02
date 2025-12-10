import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
} from "react-router-dom";

import Closet from "./pages/Closet.jsx";
import Add from "./pages/Add.jsx";
import Builder from "./pages/Builder.jsx";
import Outfit from "./pages/Outfit.jsx";
import OutfitDetail from "./pages/OutfitDetail.jsx";
import Planner from "./pages/Planner.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

function ShellLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-bar">
          <span className="brand">The Capsule</span>
          <nav aria-label="Primary">
            <ul className="nav">
              <li>
                <NavLink to="/" end>
                  Closet
                </NavLink>
              </li>
              <li>
                <NavLink to="/add">Add item</NavLink>
              </li>
              <li>
                <NavLink to="/builder">Outfit builder</NavLink>
              </li>
              <li>
                <NavLink to="/planner">Weekly planner</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-bar">
          <p>© 2025 The Capsule</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShellLayout />}>
          <Route index element={<Closet />} />
          <Route path="add" element={<Add />} />
          <Route path="builder" element={<Builder />} />
          <Route path="outfits" element={<Outfit />} />
          <Route path="outfits/:id" element={<OutfitDetail />} />
          <Route path="planner" element={<Planner />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Fallback for anything unknown */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
