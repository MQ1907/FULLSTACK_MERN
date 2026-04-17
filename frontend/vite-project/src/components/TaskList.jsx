import React from "react";
import TaskEmptyStates from "./TaskEmptyStates";
import TaskCard from "./TaskCard";

const TaskList = ({ filteredTasks, filter, handleTaskChanged }) => {
  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyStates filter={filter} />;
  }
  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskCard
          key={task._id ?? index}
          task={task}
          index={index}
          handleTaskChanged={handleTaskChanged}
        />
      ))}
    </div>
  );
};

export default TaskList;
