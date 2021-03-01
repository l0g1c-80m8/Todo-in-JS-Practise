import { addListItem, removeAllItems } from "./script.js";

function initPageElements() {
  //Add input for new tasks
  var addSecDiv = document.getElementById("remaining_add_section");
  var addTaskBtn = document.createElement("input");
  addTaskBtn.setAttribute("id", "add_btn");
  addTaskBtn.setAttribute("type", "button");
  addTaskBtn.setAttribute("value", "Add");
  addTaskBtn.setAttribute("style", "padding: 2px; margin: 5px;");
  addTaskBtn.addEventListener("click", function () {
    addListItem();
  });
  var textInp = document.createElement("input");
  textInp.setAttribute("type", "text");
  textInp.setAttribute("id", "add_caption");
  textInp.setAttribute("placeholder", "enter new todo");
  textInp.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addListItem();
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
    removeAllItems("remaining_task_list");
  });
  // var refreshBtn = document.createElement("INPUT");
  // refreshBtn.setAttribute("type", "button");
  // refreshBtn.setAttribute("id", "refresh_remaining");
  // refreshBtn.setAttribute("value", "Refresh");
  // refreshBtn.setAttribute("style", "padding: 2px; margin: 5px;");

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
    removeAllItems("completed_task_list");
  });
  // var refreshBtn = document.createElement("INPUT");
  // refreshBtn.setAttribute("type", "button");
  // refreshBtn.setAttribute("id", "refresh_completed");
  // refreshBtn.setAttribute("value", "Refresh");
  // refreshBtn.setAttribute("style", "padding: 2px; margin: 5px;");

  modSecDiv.appendChild(clearBtn);
  // modSecDiv.appendChild(refreshBtn);
}

export { initPageElements };
