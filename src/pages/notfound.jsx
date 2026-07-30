import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1>404 Page Not Found</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default NotFound;
