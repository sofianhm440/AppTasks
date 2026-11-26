import Tasks from "./tasks";

export default function Dashboard({
  tasks,
  setTasks,
  search,
  setSearch,
  showActions = true,
  showTitle = true,
}) {
  return (
    <div>
      {showTitle && <h2>My Tasks</h2>}
      <Tasks
        search={search}
        setSearch={setSearch}
        tasks={tasks}
        setTasks={setTasks}
        showActions={showActions}
      />
    </div>
  );
}
