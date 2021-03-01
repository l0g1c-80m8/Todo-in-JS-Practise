// import { RemainingTaskList } from "./remaining_task_list.js";
import { TaskList } from "./task_list.js";

function TodoApp() {
  var defaultTasks = [
    { caption: "Default todo 1", status: true },
    { caption: "Default todo 2", status: false },
    { caption: "Default todo 3", status: false },
    { caption: "Default todo 4", status: false },
    { caption: "Default todo 5", status: true },
  ];

  var remainingTaskList = new TaskList(
      "remaining_task_list",
      defaultTasks,
      false
    ),
    completedTaskList = new TaskList("completed_task_list", defaultTasks, true);

  this.handOff = function handOff(id) {
    var status = document.getElementById(id + "_checkbox").checked;
    var task;
    if (status) {
      task = remainingTaskList.removeTask(id)[0];
      completedTaskList.addNewTask(task.getCaption(), status);
    } else {
      task = completedTaskList.removeTask(id)[0];
      remainingTaskList.addNewTask(task.getCaption(), status);
    }
    document.getElementById(id).remove();
    return;
  };

  this.removeTask = function removeTask(id) {
    if (document.getElementById(id + "_checkbox")) {
      completedTaskList.removeTask(id);
    } else {
      remainingTaskList.removeTask(id);
    }
    return;
  };

  this.addTask = function addTask(caption) {
    remainingTaskList.addNewTask(caption, false);
    return;
  };

  this.clearList = function clearList(listId) {
    if (listId === "remaining_task_list") {
      remainingTaskList.clearTasks();
    }
    if (listId === "completed_task_list") {
      completedTaskList.clearTasks();
    }
    return;
  };

  this.modifyTaskCaption = function modifyTaskCaption(id) {
    var status = document.getElementById(id + "_checkbox").checked;
    var caption = document.getElementById(id + "_span").textContent;
    if (status) {
      completedTaskList.editCaption(id, caption);
    } else {
      remainingTaskList.editCaption(id, caption);
    }
    return;
  };

  // this.runApp = function runApp() {
  //   RemainingTaskList.prototype = Object.create(TaskList.prototype);
  //   Object.defineProperty(RemainingTaskList.prototype, "constructor", {
  //     value: RemainingTaskList,
  //     enumerable: false,
  //     writable: true,
  //   });
  //   var remainingTaskList = new RemainingTaskList(defaultTasks);
  //   console.log(remainingTaskList);
  // };

  return;
}

export { TodoApp };
