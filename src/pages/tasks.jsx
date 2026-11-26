import "./tasks.css";
import { useState } from "react";

export default function Tasks({ tasks, setTasks, search, showActions = true }) {
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure want to delete this task?",
    );
    if (isConfirmed) {
      fetch(`https://app-tasks-omega.vercel.app/api/tasks/${id}`, {
        method: "DELETE",
      }).then(() =>
        setTasks((prevTask) => prevTask.filter((task) => task.id !== id)),
      );
    }
  };

  const handleUpdate = (id, newStatus) => {
    fetch(`https://app-tasks-omega.vercel.app/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updateTask = data.task;

        setTasks((prevTask) =>
          prevTask.map((task) =>
            task.id === updateTask.id ? updateTask : task,
          ),
        );
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    if (title.trim().length > 30) {
      alert("Task tile maximum 30 characters!");
      return;
    }

    fetch("https://app-tasks-omega.vercel.app/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        priority: priority,
        deadline: deadline,
      }),
    })
      .then((response) => response.json())
      .then((newTask) => {
        setTasks((prevTask) => [...prevTask, newTask]);
        setTitle("");
        setPriority("Medium");
        setIsFormOpen(false);
        setDeadline("");
      });
  };

  const [filterStatus, setFilterStatus] = useState("All");

  const filteredTasks = tasks.filter(
    (task) =>
      (filterStatus === "All" || task.status === filterStatus) &&
      task.title.toLowerCase().includes(search.toLowerCase()),
  );

  const getDeadlineStatus = (deadline) => {
    if (!deadline) return "No deadline";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(deadline + "T00:00:00");

    if (dueDate < today) {
      return "Overdue";
    }

    if (dueDate.getTime() === today.getTime()) {
      return "Due Today";
    }

    return "Upcoming";
  };

  const [selectedTask, setSelectedTask] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  return (
    <div className="task-list">
      {showActions && (
        <div className="task-actions">
          <div className="toolbar">
            <button
              className="add-btn"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              {isFormOpen ? "Close Form" : "+ Add Task"}
            </button>

            <select
              className="filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Tasks</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {isFormOpen && (
            <form className="task-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />

              <button type="submit">Add Task</button>
            </form>
          )}
        </div>
      )}
      {tasks.length === 0 ? (
        <div className="empty">
          <h3>No tasks yet</h3>
          <p>Your tasks is empty. Start by creating your first task!</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="search-empty">
          <h3>No matching tasks found</h3>
          <p>Try another search keyword!</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>

            <p>
              Deadline:{" "}
              {task.deadline
                ? new Date(task.deadline + "T00:00:00").toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )
                : "No deadline"}
            </p>
            <div className="task-statuses">
              {task.deadline && (
                <span
                  className={`deadline-status ${getDeadlineStatus(task.deadline, task.status).toLowerCase().replace(" ", "-")}`}
                >
                  {getDeadlineStatus(task.deadline, task.status)}
                </span>
              )}

              <span
                className={`status-badge ${task.status === "Completed" ? "Completed" : task.status === "In Progress" ? "in-progress" : "todo"}`}
              >
                {task.status}
              </span>
            </div>
            <div className="task-priority">
              <span>Priority</span>
              <strong
                className={`priority-badge ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </strong>
              <button
                className="view-btn"
                onClick={() => {
                  if (selectedTask?.id === task.id) {
                    setIsClosing(true);
                    setTimeout(() => {
                      setSelectedTask(null);
                      setIsClosing(false);
                    }, 300);
                  } else {
                    setSelectedTask(task);
                    setIsClosing(false);
                  }
                }}
              >
                {selectedTask?.id === task.id
                  ? "Close Details"
                  : "View Details"}
              </button>

              <select
                value={task.status}
                onChange={(e) => handleUpdate(task.id, e.target.value)}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                className="delete-btn"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {selectedTask && (
        <div className={`task-detail ${isClosing ? "closing" : ""}`}>
          <h3>{selectedTask.title}</h3>
          <div className="detail-info">
            <div>
              <span>Status</span>
              <strong>{selectedTask.status}</strong>
            </div>

            <div>
              <span>Priority</span>
              <strong>{selectedTask.priority}</strong>
            </div>

            <div>
              <span>Deadline</span>
              <strong>
                {selectedTask.deadline
                  ? new Date(
                      selectedTask.deadline + "T00:00:00",
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "No deadline"}
              </strong>
            </div>

            <div>
              <span>Deadline Status</span>
              <strong>
                {getDeadlineStatus(selectedTask.deadline, selectedTask.status)}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
