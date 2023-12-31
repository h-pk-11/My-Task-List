import handler from "./eventHandlers";
import actions from "./actions";
import {
  addSidebarEvents,
  activeTabsEvent,
  renderModeCount,
  renderProjectsList,
} from "./components/Sidebar/Sidebar";
import {
  setCurentTime,
  renderEntries,
  addTaskEvents,
  entriesEvents,
} from "./components/Mainboard/Mainboard";

function render() {
  renderModeCount();
  renderProjectsList();
  renderEntries();
}

function activeEvents() {
  activeTabsEvent();
  entriesEvents();
}

function intialEvents() {
  setCurentTime();
  setInterval(setCurentTime, 1000);
  addSidebarEvents();
  addTaskEvents();
}

export default (function () {
  const start = () => {
    render();
    intialEvents();
    activeEvents();
  };

  return {
    start,
  };
})();

const actionKeys = Object.keys(actions);

for (let i = 0; i < actionKeys.length; i++) {
  handler.on(`${actionKeys[i]}`, render, "renders");
  handler.on(`${actionKeys[i]}`, activeEvents, "events");
}
