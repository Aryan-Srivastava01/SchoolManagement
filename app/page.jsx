import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-panel">
        <h1 className="home-title">School Management Panel</h1>

        <div className="card-container">
          
          {/* Add School */}
          <Link href="/addschool" className="card">
            <div className="card-icon icon-blue">+</div>
            <div className="card-title">Add School</div>
            <div className="card-sub">
              Enter school details and upload image
            </div>
          </Link>

          {/* Show Schools */}
          <Link href="/showschool" className="card">
            <div className="card-icon icon-green">🔍</div>
            <div className="card-title">Show Schools</div>
            <div className="card-sub">
              Browse schools in a clean card layout
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
