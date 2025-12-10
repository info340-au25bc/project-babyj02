export default function Alert({ type = "error", message }) {
  if (!message) {
    return null;
  }

  const className =
    type === "error" ? "alert alert--error" : "alert alert--info";

  return (
    <div className={className} role="alert">
      {message}
    </div>
  );
}
