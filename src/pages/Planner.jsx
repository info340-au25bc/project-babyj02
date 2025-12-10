import { useState, useEffect } from "react";
import useFirebaseList from "../hooks/useFirebaseList.js";
import { DAYS_OF_WEEK } from "../data.js";
import Spinner from "./Spinner.jsx";
import Alert from "./Alert.jsx";
import { db } from "../firebase.js";
import { ref, onValue, set } from "firebase/database";

export default function Planner() {
  const { data: outfits, loading: outfitsLoading, error: outfitsError } =
    useFirebaseList("outfits");

  const [planner, setPlanner] = useState({});
  const [loadingPlanner, setLoadingPlanner] = useState(true);
  const [plannerError, setPlannerError] = useState(null);

  useEffect(() => {
    const plannerRef = ref(db, "planner");
    const unsubscribe = onValue(
      plannerRef,
      (snapshot) => {
        const value = snapshot.val();
        setPlanner(value || {});
        setLoadingPlanner(false);
      },
      (err) => {
        console.error(err);
        setPlannerError(
          "There was a problem loading your weekly planner configuration."
        );
        setLoadingPlanner(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChangeDay = async (day, outfitId) => {
    try {
      const plannerRef = ref(db, `planner/${day}`);
      await set(plannerRef, outfitId || null);
    } catch (err) {
      console.error(err);
      setPlannerError("There was a problem updating your planner.");
    }
  };

  const outfitOptions = outfits.map((outfit) => (
    <option value={outfit.id} key={outfit.id}>
      {outfit.name}
    </option>
  ));

  const rows = DAYS_OF_WEEK.map((day) => {
    const assignedId = planner[day] || "";
    const outfitName =
      outfits.find((o) => o.id === assignedId)?.name || "No outfit selected";

    return (
      <tr key={day}>
        <th scope="row">{day}</th>
        <td>
          <select
            value={assignedId}
            onChange={(event) => handleChangeDay(day, event.target.value)}
            aria-label={`Outfit for ${day}`}
          >
            <option value="">None</option>
            {outfitOptions}
          </select>
        </td>
        <td className="planner-outfit-name">{outfitName}</td>
      </tr>
    );
  });

  const loading = outfitsLoading || loadingPlanner;
  const error = outfitsError || plannerError;

  return (
    <section aria-labelledby="planner-heading">
      <div className="page-header">
        <h2 id="planner-heading" className="page-title">
          Weekly Planner
        </h2>
        <p className="page-description">
          Assign saved outfits to days of the week to pre-plan your capsule
          looks.
        </p>
      </div>

      {loading && <Spinner label="Loading outfits and planner..." />}
      {error && <Alert type="error" message={error} />}

      {!loading && !error && outfits.length === 0 && (
        <p className="empty-state">
          You have no saved outfits yet. Save some outfits first, then return
          to the planner.
        </p>
      )}

      {!loading && !error && outfits.length > 0 && (
        <div className="card planner-card">
          <table className="planner-table">
            <caption className="visually-hidden">
              Weekly outfit planner table
            </caption>
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Select outfit</th>
                <th scope="col">Current selection</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}
