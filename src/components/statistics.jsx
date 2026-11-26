import "./statistics.css";

export default function Statistics({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "Todo").length;

  return (
    <div className="statistics">
      <div className="card">
        <p>Total Tasks</p>
        <h2>{totalTasks}</h2>
        <span>All your tasks</span>
      </div>
      <div className="card">
        <p>In Progress</p>
        <h2>{inProgress}</h2>
        <span>Currently working</span>
      </div>
      <div className="card">
        <p>Completed</p>
        <h2>{completedTasks}</h2>
        <span>Successfully done</span>
      </div>
      <div className="card">
        <p>Pending</p>
        <h2>{pendingTasks}</h2>
        <span>Waiting to start</span>
      </div>
    </div>
  );
}
