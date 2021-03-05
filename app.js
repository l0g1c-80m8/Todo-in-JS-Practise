import { TaskList } from "./task_list.js";

function TodoApp() {
  var defaultTasks = [
    { caption: "Default todo 1", status: false },
    {
      caption:
        "Create a new object to reflect changes, rather than changing the same object",
      status: true,
    },
    {
      caption:
        "Create two different types of lists that inherit the behavious of the task list with few extra behaviours.",
      status: false,
    },
    {
      caption: "Try to run the app from a single runApp() function",
      status: true,
    },
    { caption: "Default todo 5", status: false },
    { caption: "Default todo 6", status: false },
    { caption: "Make list items draggable and droppable", status: true },
  ];

  // RemainingTaskList.prototype = Object.create(TaskList.prototype);
  // var remainingTaskList = new RemainingTaskList(defaultTasks);
  var remainingTaskList, completedTaskList;

  function initPageElements() {
    //Add input for new tasks
    var addSecDiv = document.getElementById("remaining_add_section");
    var addTaskBtn = document.createElement("input");
    addTaskBtn.setAttribute("id", "add_btn");
    addTaskBtn.setAttribute("type", "button");
    addTaskBtn.setAttribute("value", "Add");
    addTaskBtn.setAttribute("style", "padding: 2px; margin: 5px;");
    addTaskBtn.addEventListener("click", function () {
      addTaskToList(document.getElementById("add_caption"));
    });
    var textInp = document.createElement("input");
    textInp.setAttribute("type", "text");
    textInp.setAttribute("id", "add_caption");
    textInp.setAttribute("placeholder", "enter new todo");
    textInp.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        addTaskToList(document.getElementById("add_caption"));
      }
    });

    addSecDiv.appendChild(addTaskBtn);
    addSecDiv.appendChild(textInp);

    //Add buttons for modification
    var modSecDiv = document.getElementById("remaining_modify_section");
    var clearBtn = document.createElement("INPUT");
    clearBtn.setAttribute("type", "button");
    clearBtn.setAttribute("id", "clear_remaining");
    clearBtn.setAttribute("value", "Clear");
    clearBtn.setAttribute("style", "padding: 2px; margin: 5px;");
    clearBtn.addEventListener("click", function () {
      clearTasksFromList("remaining_task_list");
    });

    modSecDiv.appendChild(clearBtn);
    // modSecDiv.appendChild(refreshBtn);

    //Add buttons for modify section of completed tasks list
    var modSecDiv = document.getElementById("completed_modify_section");
    clearBtn = document.createElement("INPUT");
    clearBtn.setAttribute("type", "button");
    clearBtn.setAttribute("id", "clear_completed");
    clearBtn.setAttribute("value", "Clear");
    clearBtn.setAttribute("style", "padding: 2px; margin: 5px;");
    clearBtn.addEventListener("click", function () {
      clearTasksFromList("completed_task_list");
    });

    modSecDiv.appendChild(clearBtn);
    // modSecDiv.appendChild(refreshBtn);
  }

  function addTaskToList(textBox) {
    remainingTaskList.addNewTask(textBox.value, false);
    textBox.value = "";
    return;
  }

  function handOff(task) {
    if (task.getStatus()) {
      remainingTaskList.addNewTask(task.getCaption(), !task.getStatus());
    } else {
      completedTaskList.addNewTask(task.getCaption(), !task.getStatus());
    }
    return;
  }

  function clearTasksFromList(listId) {
    if (listId === "remaining_task_list") {
      remainingTaskList.clearTasks(listId);
    }
    if (listId === "completed_task_list") {
      completedTaskList.clearTasks(listId);
    }
    return;
  }

  this.runApp = function runApp() {
    initPageElements();
    (remainingTaskList = new TaskList({
      listId: "remaining_task_list",
      defaultTasksList: defaultTasks,
      reqStatus: false,
      handOff: handOff,
    })),
      (completedTaskList = new TaskList({
        listId: "completed_task_list",
        defaultTasksList: defaultTasks,
        reqStatus: true,
        handOff: handOff,
      }));
  };

  return;
}

new TodoApp().runApp();
