import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="centered" aria-labelledby="not-found-heading">
      <h2 id="not-found-heading" className="page-title">
        Page not found
      </h2>
      <p className="page-description">
        The page you requested does not exist. It might have been moved or
        deleted.
      </p>
      <Link to="/" className="primary-button">
        Go back to Closet
      </Link>
    </section>
  );
}
