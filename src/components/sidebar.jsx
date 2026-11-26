import "./sidebar.css";

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Taskly</h2>
      </div>

      <nav className="sidebar-menu">
        <p className="menu-label">MENU</p>
        <button
          className={`menu-item ${activePage === "Dashboard" ? "active" : ""}`}
          onClick={() => setActivePage("Dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`menu-item ${activePage === "My Task" ? "active" : ""}`}
          onClick={() => setActivePage("My Task")}
        >
          My Task
        </button>
        <button
          className={`menu-item ${activePage === "Completed" ? "active" : ""}`}
          onClick={() => setActivePage("Completed")}
        >
          Completed
        </button>
        <button
          className={`menu-item ${activePage === "Settings" ? "active" : ""}`}
          onClick={() => setActivePage("Settings")}
        >
          Settings
        </button>
      </nav>
    </aside>
  );
}
