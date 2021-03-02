import { Task } from "./task.js";
import { composeListItem } from "./helpers.js";

function TaskList(listId, newTasksList = [], reqStatus) {
  var tasks = [];
  initTaskList(newTasksList);

  function initTaskList(newTasksList) {
    if (Array.isArray(newTasksList)) {
      for (var i = 0; i < newTasksList.length; i++) {
        if (newTasksList[i].status === reqStatus) {
          var newTask = new Task(
            newTasksList[i].caption,
            newTasksList[i].status
          );
          tasks.push(newTask);
          document
            .getElementById(listId)
            .appendChild(composeListItem(tasks[tasks.length - 1]));
        }
      }
    }
  }

  this.addNewTask = function addNewTask(caption, set) {
    var newTask = new Task(caption, set);
    tasks.push(newTask);
    document.getElementById(listId).appendChild(composeListItem(newTask));
    return;
  };

  this.removeTask = function removeTask(id) {
    var index = -1;
    var removed;
    search: for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].getId() === id) {
        index = i;
        break search;
      }
    }
    if (~index) {
      removed = tasks.splice(index, 1);
    }
    return removed;
  };

  this.clearTasks = function clearTasks() {
    tasks = [];
    return;
  };

  this.editCaption = function editCaption(id, caption, status) {
    var modifiedTask = new Task(caption, status);
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].getId() === id) {
        tasks[i] = modifiedTask;
        return composeListItem(tasks[i]);
      }
    }
    return;
  };
}

export { TaskList };
