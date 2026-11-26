import "./header.css";

export default function Header({ search, setSearch }) {
  return (
    <header className="header">
      <div className="title">
        <h2>Dashboard</h2>
        <p>Manage your tasks efficiently</p>
      </div>

      <div className="actions">
        <input
          type="text"
          placeholder="Search your tasks!"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Notification</button>
        <div className="profile">
          <span>F</span>
        </div>
      </div>
    </header>
  );
}
