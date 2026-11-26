import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Statistics from "./components/statistics";
import Dashboard from "./pages/dashboard";
import Settings from "./pages/settings";
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState("Dashboard");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetch("https://app-tasks-omega.vercel.app/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className={`app ${theme}`}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        {activePage === "Dashboard" && (
          <>
            <Header search={search} setSearch={setSearch} />
            <Statistics tasks={tasks} />
            <Dashboard
              tasks={tasks}
              setTasks={setTasks}
              search={search}
              setSearch={setSearch}
            />
          </>
        )}

        {activePage === "My Task" && (
          <>
            <Dashboard
              tasks={tasks}
              setTasks={setTasks}
              search={search}
              setSearch={setSearch}
            />
          </>
        )}

        {activePage === "Completed" && (
          <>
            <h2>Completed Tasks</h2>
            <Dashboard
              tasks={tasks.filter((task) => task.status === "Completed")}
              setTasks={setTasks}
              search={search}
              setSearch={setSearch}
              showActions={false}
              showTitle={false}
            />
          </>
        )}

        {activePage === "Settings" && (
          <Settings theme={theme} setTheme={setTheme} />
        )}
      </main>
    </div>
  );
}
