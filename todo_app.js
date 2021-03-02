// import { RemainingTaskList } from "./remaining_task_list.js";
import { TaskList } from "./task_list.js";
import { composeListItem } from "./helpers.js";

function TodoApp() {
  var defaultTasks = [
    { caption: "Default todo 1", status: true },
    {
      caption:
        "Create a new object to reflect changes, rather than changing the same object",
      status: true,
    },
    {
      caption:
        "Create two different lists that inherit the behavious of the task list with few extra behaviours.",
      status: false,
    },
    {
      caption: "Try to run the app from a single runApp() function",
      status: false,
    },
    { caption: "Default todo 5", status: true },
    { caption: "Default todo 6", status: false },
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
    var modifiedListItem;
    if (status) {
      modifiedListItem = completedTaskList.editCaption(id, caption, status);
    } else {
      modifiedListItem = remainingTaskList.editCaption(id, caption, status);
    }
    document
      .getElementById(id)
      .parentNode.replaceChild(modifiedListItem, document.getElementById(id));
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
