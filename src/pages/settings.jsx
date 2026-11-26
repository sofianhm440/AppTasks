import "./settings.css";

export default function Settings({ setTheme }) {
  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <div className="theme-settings">
        <h3>Appearance</h3>
        <p>Choose your preferred theme</p>

        <button onClick={() => setTheme("light")}>Light Mode</button>

        <button onClick={() => setTheme("dark")}>Dark Mode</button>
      </div>
    </div>
  );
}
