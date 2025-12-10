import useFirebaseList from "../hooks/useFirebaseList.js";
import Spinner from "./Spinner.jsx";
import Alert from "./Alert.jsx";
import { CATEGORIES } from "../data.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function PriceChart() {
  const { data: items, loading, error } = useFirebaseList("items");

  const totalsByCategory = CATEGORIES.map((category) => {
    const total = items
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + Number(item.price || 0), 0);

    return {
      category,
      total: Number(total.toFixed(2))
    };
  });

  return (
    <section aria-labelledby="price-chart-heading">
      <div className="page-header">
        <h2 id="price-chart-heading" className="page-title">
          Price by Category
        </h2>
        <p className="page-description">
          See how your capsule budget breaks down across tops, bottoms,
          outerwear, shoes, and accessories.
        </p>
      </div>

      {loading && <Spinner label="Loading items for chart..." />}
      {error && (
        <Alert
          type="error"
          message="There was a problem loading data for the chart."
        />
      )}

      {!loading && !error && items.length === 0 && (
        <p className="empty-state">
          Add items to your closet to see your price breakdown.
        </p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="card chart-card">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={totalsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
