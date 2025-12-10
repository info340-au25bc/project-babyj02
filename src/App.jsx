import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Closet from "./pages/Closet.jsx";
import Add from "./pages/Add.jsx";
import Builder from "./pages/Builder.jsx";
import Outfit from "./pages/Outfit.jsx";
import OutfitDetail from "./pages/OutfitDetail.jsx";
import Planner from "./pages/Planner.jsx";
import PriceChart from "./pages/PriceChart.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

function AppLayout({ children }) {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-left">
          <img
            src="/img/closet-hero.jpg"
            alt="Neatly organized neutral capsule closet"
            className="app-logo"
          />
          <div>
            <h1 className="app-title">The Capsule Closet</h1>
            <p className="app-subtitle">Curate, build outfits, and plan your week.</p>
          </div>
        </div>

        <nav aria-label="Main navigation" className="app-nav">
          <NavLink to="/" end className="nav-link">
            Closet
          </NavLink>
          <NavLink to="/add" className="nav-link">
            Add Item
          </NavLink>
          <NavLink to="/builder" className="nav-link">
            Outfit Builder
          </NavLink>
          <NavLink to="/outfits" className="nav-link">
            Saved Outfits
          </NavLink>
          <NavLink to="/planner" className="nav-link">
            Planner
          </NavLink>
          <NavLink to="/price-chart" className="nav-link">
            Price Chart
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </nav>
      </header>

      <main className="app-main" id="main-content">
        {children}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Jackie Tran · Capsule Closet</p>
        <p>
          Contact:{" "}
          <a href="mailto:jackie28@uw.edu" className="footer-link">
            jackie28@uw.edu
          </a>
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Closet />} />
          <Route path="/add" element={<Add />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/outfits" element={<Outfit />} />
          <Route path="/outfits/:outfitId" element={<OutfitDetail />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/price-chart" element={<PriceChart />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}
