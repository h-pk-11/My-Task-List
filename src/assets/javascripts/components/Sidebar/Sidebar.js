import { AddTask__message } from "../Mainboard/Mainboard";
import { myData, html } from "../../data";
import handler from "../../eventHandlers";

const rootElement = document.documentElement;
const todosApp = document.querySelector("#todosApp");
const appWrapper = todosApp.querySelector(".appWrapper");
const appSideBar = appWrapper.querySelector(".appSideBar");
const appSideBarTransition = appSideBar.querySelector(".appSideBar-transition");

// mode view
const appSideBar__taskList = appSideBar.querySelector(".appSideBar__taskList");
const count_elements = appSideBar__taskList.querySelectorAll(
  ".appSideBar__taskItem_badge-count",
);
const appSideBar__projectHeading = appSideBar.querySelector(
  ".appSideBar__projectHeading",
);
const project_count_element = appSideBar__projectHeading.querySelector(
  ".appSideBar__item_badge-count",
);

// render project list view
const appSideBar__animation = appSideBar.querySelector(
  ".appSideBar__animation",
);
const appSideBar__list =
  appSideBar__animation.querySelector(".appSideBar__list");

// newproject
const newProjectModal = appWrapper.querySelector(".appTask-modal__newproject");
const input = newProjectModal.querySelector(
  ".newproject-modal__textfield_input",
);
const newProjectModalWrapper = newProjectModal.querySelector(
  ".newproject-modal__wrapper",
);
const newprojectCloseBtn = newProjectModal.querySelector(
  ".newproject-modal__close",
);
const newprojectSubmitBtn = newProjectModal.querySelector(
  ".newproject-modal__button",
);

// render
export function renderModeCount() {
  const myActiveTasks = myData.projects
    .map((project) => project.tasks)
    .reduce((acc, c) => acc.concat(c), [])
    .filter(myData.filters.isDone);

  const myDayTaskNumber = myActiveTasks.filter(myData.filters["My day"]).length;
  const next7DaysTaskNumber = myActiveTasks.filter(
    myData.filters["Next 7 days"],
  ).length;
  const allMyTasksNumber = myActiveTasks.length;

  if (myDayTaskNumber < 100) {
    count_elements[0].textContent = myDayTaskNumber;
  } else {
    count_elements[0].textContent = "+99";
  }

  if (next7DaysTaskNumber < 100) {
    count_elements[1].textContent = next7DaysTaskNumber;
  } else {
    count_elements[1].textContent = "+99";
  }

  if (allMyTasksNumber < 100) {
    count_elements[2].textContent = allMyTasksNumber;
  } else {
    count_elements[2].textContent = "+99";
  }

  if (allMyTasksNumber < 100) {
    project_count_element.textContent = allMyTasksNumber;
  } else {
    project_count_element.textContent = "+99";
  }
}

export const renderProjectsList = () => {
  if (myData.projects.length > 0) {
    appSideBar__list.innerHTML = myData.projects
      .map(
        (project) => html`
          <li
            class="appSideBar__item appSideBar__item--projects 
            ${myData.navBarSelected[1] === project.id &&
            "appSideBar__item--selected"}"
            data-project-id="${project.id}"
            data-view-mode="project"
          >
            <a href="#" class="appSideBar__item_link">
              <div class="appSideBar__item_title">
                <div class="appSideBar__item_title-wrapper">
                  ${project.projectName}
                </div>
              </div>

              <div class="appSideBar__item_badge">
                <div class="appSideBar__item_badge-wrapper">
                  <div class="appSideBar__item_badge-count">
                    ${project.tasks.filter(myData.filters.isDone).length}
                  </div>
                </div>
              </div>
            </a>

            <button class="appSideBar__item_remove">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="X_frame">
                  <path
                    id="X_14x14"
                    d="M1 1L11 11M1 11L11 1"
                    stroke="black"
                    stroke-linecap="round"
                  />
                </g>
              </svg>
            </button>
          </li>
        `,
      )
      .join("");
  } else {
    appSideBar__list.innerHTML = "";
  }
};

let isProjectNameEditMode = false;
export function addSidebarEvents() {
  scrollNavbarEvent();
  toggleMyList();
  pinNavbarEvent();
  activeTabsEvent();

  function scrollNavbarEvent() {
    const appSideBarWrapper = appSideBarTransition.querySelector(
      ".appSideBar-wrapper",
    );

    const appSideBarScrollShadow = appSideBarTransition.querySelector(
      ".appSideBar-scrollShadow",
    );

    const appSideBarScrollShadow_shadow = appSideBarScrollShadow.querySelector(
      ".appSideBar-scrollShadow_shadow",
    );

    appSideBarWrapper.addEventListener("scroll", () => {
      const { scrollTop } = appSideBarWrapper;

      const isContained = appSideBarScrollShadow_shadow.classList.contains(
        "appSideBar-scrollShadow_shadow--active",
      );

      if (scrollTop === 0) {
        if (isContained) {
          appSideBarScrollShadow_shadow.classList.remove(
            "appSideBar-scrollShadow_shadow--active",
          );
        }
      } else if (!isContained) {
        appSideBarScrollShadow_shadow.classList.add(
          "appSideBar-scrollShadow_shadow--active",
        );
      }
    });
  }

  function toggleMyList() {
    const projectHeading = appSideBar.querySelector(
      ".appSideBar__projectHeading",
    );
    const addProjectBtn = projectHeading.querySelector(
      ".appSideBar__item-button",
    );
    const myListBadge = projectHeading.querySelector(".appSideBar__item_badge");
    const appSideBarAnimation = appSideBar.querySelector(
      ".appSideBar__animation",
    );
    const projectList = appSideBarAnimation.querySelector(".appSideBar__list");

    projectHeading.onclick = function (e) {
      const clickedItem = e.target.closest(".appSideBar__item-button");

      if (!clickedItem) {
        const numberOfProject = Array.from(
          projectList.querySelectorAll(".appSideBar__item"),
        ).length;
        const heightOfProjectList = `${numberOfProject * 40}px`;

        const isClosed = projectHeading.classList.contains(
          "appSideBar__projectHeading--closed",
        );

        if (isClosed) {
          projectHeading.classList.remove("appSideBar__projectHeading--closed");
          projectList.style.height = `${heightOfProjectList}`;

          addProjectBtn.classList.add("appSideBar__item-button--active");
          myListBadge.classList.remove("appSideBar__item_badge--avtive");
        } else {
          projectHeading.classList.add("appSideBar__projectHeading--closed");
          projectList.style.height = "0px";

          addProjectBtn.classList.remove("appSideBar__item-button--active");
          myListBadge.classList.add("appSideBar__item_badge--avtive");
        }
      } else {
        isProjectNameEditMode = false;
        addNewProject();
      }
    };
  }

  function pinNavbarEvent() {
    const headerIconButton =
      appSideBarTransition.querySelector(".headerIconButton");

    headerIconButton.onclick = function () {
      if (!headerIconButton.matches(".headerIconButton--active")) {
        headerIconButton.classList.add("headerIconButton--active");
        appSideBar.removeEventListener("mouseout", slideOutNavbar);
        appSideBar.removeEventListener("mouseover", slideInNavbar);
      } else {
        headerIconButton.classList.remove("headerIconButton--active");
        appSideBar.addEventListener("mouseout", slideOutNavbar);
        appSideBar.addEventListener("mouseover", slideInNavbar);
      }
    };

    function slideInNavbar() {
      rootElement.style.setProperty("--app-sizebar-translateX", "0px");
      appSideBar.style.cssText = "opacity: 1; transform: translateX(0px);";
    }

    function slideOutNavbar() {
      rootElement.style.setProperty("--app-sizebar-translateX", "-210px");
      appSideBar.style.cssText = "opacity: 0; transform: translateX(-210px);";
    }
  }
}

export function activeTabsEvent() {
  const appSideBar__taskItems = appSideBar__taskList.querySelectorAll(
    ".appSideBar__taskItem",
  );
  const appSideBar__items =
    appSideBar__animation.querySelectorAll(".appSideBar__item");

  for (let i = 0; i < 3; i++) {
    appSideBar__taskItems[i].onclick = function () {
      setTimeout(() => {
        handler.trigger(
          "change view mode",
          appSideBar__taskItems[i].dataset.viewMode,
        );

        appSideBar__taskItems.forEach((item) => {
          if (item.classList.contains("appSideBar__taskItem--selected")) {
            item.classList.remove("appSideBar__taskItem--selected");
          }
        });

        appSideBar__items.forEach((item) => {
          if (item.classList.contains("appSideBar__item--selected")) {
            item.classList.remove("appSideBar__item--selected");
          }
        });

        appSideBar__taskItems[i].classList.add(
          "appSideBar__taskItem--selected",
        );
      }, 200);
    };
  }

  appSideBar__items.forEach((item) => {
    item.onclick = function () {
      isProjectNameEditMode = false;
      setTimeout(() => {
        if (!isProjectNameEditMode) {
          appSideBar__taskItems.forEach((ele) => {
            if (ele.classList.contains("appSideBar__taskItem--selected")) {
              ele.classList.remove("appSideBar__taskItem--selected");
            }
          });

          handler.trigger(
            "change view mode",
            item.dataset.viewMode,
            item.dataset.projectId,
          );

          appSideBar__items.forEach((ele) => {
            if (ele.classList.contains("appSideBar__item--selected")) {
              ele.classList.remove("appSideBar__item--selected");
            }
          });

          item.classList.add("appSideBar__item--selected");
        }
      }, 200);
    };
  });

  appSideBar__items.forEach((item) => {
    item.ondblclick = function (e) {
      isProjectNameEditMode = true;
      editProjectName(e);
    };
  });

  appSideBar__items.forEach((item) => {
    const removeBtn = item.querySelector("button");
    if (removeBtn) {
      removeBtn.onclick = function (e) {
        e.stopPropagation();

        const numberOfProjects = handler.trigger(
          "delete project",
          item.dataset.projectId,
        );

        if (numberOfProjects !== 0) return;

        let isViewModeOn = false;
        appSideBar__taskItems.forEach((ele) => {
          if (ele.classList.contains("appSideBar__taskItem--selected")) {
            isViewModeOn = true;
          }
        });

        if (!isViewModeOn) {
          appSideBar__taskItems[2].classList.add(
            "appSideBar__taskItem--selected",
          );
        }
      };
    }
  });
}

export function addNewProject() {
  showNewProjectModal();

  newprojectCloseBtn.onclick = hideNewProjectModal;
  newProjectModal.onclick = hideNewProjectModal;
  newProjectModalWrapper.onclick = function (e) {
    e.stopPropagation();
  };

  activateSubmitBtn();
  input.oninput = activateSubmitBtn;
  const id = undefined;
  newprojectSubmitBtn.onclick = function () {
    const projectName = input.value.trim();
    if (!isProjectNameEditMode) {
      handler.trigger("create a project", projectName);
    } else {
      handler.trigger("change project name", projectName, id);
    }
    hideNewProjectModal();
    input.value = "";

    const appSideBar__items =
      appSideBar__animation.querySelectorAll(".appSideBar__item");
    if (appSideBar__items.length === 1) {
      if (
        AddTask__message.classList.contains("myDayAddTask__message--active")
      ) {
        AddTask__message.classList.remove("myDayAddTask__message--active");
      }
    }
  };
}

export function editProjectName(e) {
  const id = showProjectModal(e);

  newprojectCloseBtn.onclick = hideNewProjectModal;
  newProjectModal.onclick = hideNewProjectModal;
  newProjectModalWrapper.onclick = function (event) {
    event.stopPropagation();
  };

  activateSubmitBtn();
  input.oninput = activateSubmitBtn;

  newprojectSubmitBtn.onclick = function () {
    const projectName = input.value.trim();
    if (!isProjectNameEditMode) {
      handler.trigger("create a project", projectName);
    } else {
      handler.trigger("change project name", projectName, id);
    }
    hideNewProjectModal();
    input.value = "";
  };
}

function showProjectModal(e) {
  const item = e.target.closest(".appSideBar__item");
  let id;
  if (item) {
    id = item.dataset.projectId;

    const appSideBar__items =
      appSideBar__animation.querySelectorAll(".appSideBar__item");

    let i = 0;
    for (; i < appSideBar__items.length; i++) {
      if (appSideBar__items[i].dataset.projectId === id) {
        break;
      }
    }
    const appSideBar__item_title_wrapper = appSideBar__items[i].querySelector(
      ".appSideBar__item_title-wrapper",
    );

    newProjectModal.classList.add("appTask-modal__newproject--active");
    const projectName = appSideBar__item_title_wrapper.innerText;
    input.value = projectName;

    const end = projectName.length;
    setTimeout(() => {
      input.setSelectionRange(end, end);
      input.focus();
    }, 300);
  }

  return id;
}

function showNewProjectModal() {
  newProjectModal.classList.add("appTask-modal__newproject--active");

  input.value = "";
  const end = input.value.length;
  setTimeout(() => {
    input.setSelectionRange(end, end);
    input.focus();
  }, 300);
}

function hideNewProjectModal() {
  newProjectModal.classList.remove("appTask-modal__newproject--active");
  input.blur();
}

function activateSubmitBtn() {
  newprojectSubmitBtn.disabled = true;
  if (input.value.trim() !== "") {
    newprojectSubmitBtn.disabled = false;
  }
}
