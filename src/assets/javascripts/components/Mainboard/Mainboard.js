import formatDate from "../../date";
import { myData, html } from "../../data";
import handler from "../../eventHandlers";

const rootElement = document.documentElement;
const todosApp = document.querySelector("#todosApp");

// header
const appWrapper = todosApp.querySelector(".appWrapper");
const myDayRoute__title = appWrapper.querySelector(".myDayRoute__title");
const weekday = myDayRoute__title.querySelector(
  ".myDayRouteTitle__calendar-weekday",
);
const day = myDayRoute__title.querySelector(".myDayRouteTitle__calendar-day");
const month = myDayRoute__title.querySelector(
  ".myDayRouteTitle__calendar-month",
);
const myDayRouteTitle__greeting = myDayRoute__title.querySelector(
  ".myDayRouteTitle__greeting",
);
const myDayRouteTitle_subtitle = myDayRoute__title.querySelector(
  ".myDayRouteTitle_subtitle",
);

// entries
const myDayRoute__entries = appWrapper.querySelector(".myDayRoute__entries");
const myDayRoute__topshadow__shadow = myDayRoute__entries.querySelector(
  ".myDayRoute__topshadow__shadow",
);
const myDayRoute__bottomshadow__shadow = myDayRoute__entries.querySelector(
  ".myDayRoute__bottomshadow__shadow",
);
const myDayRouteEntries__content = myDayRoute__entries.querySelector(
  ".myDayRouteEntries__content",
);
const myDayRouteEntries__list = myDayRouteEntries__content.querySelector(
  ".myDayRouteEntries__list",
);

// backdropModal-menu
const appTask_modal__taskDropdrownMenu = appWrapper.querySelector(
  ".appTask-modal__taskDropdrownMenu",
);
const taskDropdrownMenu_list = appTask_modal__taskDropdrownMenu.querySelector(
  ".taskDropdrownMenu_list",
);
const listDetailBtn = taskDropdrownMenu_list.querySelector(
  ".taskDropdrownMenu_item--list",
);
const priorityDetailBtn = taskDropdrownMenu_list.querySelector(
  ".taskDropdrownMenu_item--priority",
);

// backdropModal-list
const backdropModal_list = appWrapper.querySelector(".backdropModal_list");
const backdropModal_tab_list = backdropModal_list.querySelector(
  ".backdropModal_tab-list",
);

// backdropModal-priority
const backdropModal_priority = appWrapper.querySelector(
  ".backdropModal_priority",
);
const backdropModal_tab_priority_list = backdropModal_priority.querySelector(
  ".backdropModal_tab-list",
);

// backdropModal-detail
const appTask_modal__taskDetail = appWrapper.querySelector(
  ".appTask-modal__taskDetail",
);
const taskDetail__close_btn = appTask_modal__taskDetail.querySelector(
  ".taskDetail__close-icon",
);
const taskDetail_modal =
  appTask_modal__taskDetail.querySelector(".taskDetail_modal");
const taskDetail_mylist_button = taskDetail_modal.querySelector(
  ".project .taskDetail_button",
);
const taskDetail_priority_button = taskDetail_modal.querySelector(
  ".priority .taskDetail_button",
);
const taskDetail_check = taskDetail_modal.querySelector(".checkedTask");
const taskDetail_check_button = taskDetail_check.querySelector(".iconButton");
const textAreaTaskContent = taskDetail_modal.querySelector(
  ".taskDetail__taskContent .textArea",
);
const textAreaNotes = taskDetail_modal.querySelector(
  ".taskDetail__editNotes .textAreaNotes",
);

// addtask
const myDayRoute_addTask = appWrapper.querySelector(".myDayRoute_addTask");
const myDayAddTask = myDayRoute_addTask.querySelector(".myDayAddTask");
const textAeraWrapper = myDayAddTask.querySelector(".textAeraWrapper");
const textareaHeight = rootElement.style.getPropertyValue("--add-card-height");
const textarea = textAeraWrapper.querySelector("#dynamicTextArea");
const myDayAddTask_enter = myDayAddTask.querySelector(".myDayAddTask_enter");
const enterBtn = myDayAddTask_enter.querySelector(".iconButton");
const iconWrapper = textAeraWrapper.querySelector(".iconWrapper");
const myListBtn = iconWrapper.querySelector(".iconButton");
export const AddTask__message = myDayAddTask.querySelector(
  ".myDayAddTask__message",
);
const appTask_modal_mylist = appWrapper.querySelector(".appTask-modal_mylist");

// for render Entries view
export function findProjectIndex(projectId) {
  let i = 0;
  for (; i < myData.projects.length; i++) {
    if (myData.projects[i].id === projectId) {
      return i;
    }
  }

  return undefined;
}

function getParentElement(element, selector) {
  while (element.parentElement) {
    if (element.parentElement.matches(selector)) {
      return element.parentElement;
    }
    element = element.parentElement;
  }
}

// render entries
export function findTaskIndex(projectId, taskId) {
  const projectIndex = findProjectIndex(projectId);
  let j = 0;
  if (!Number.isNaN(projectIndex)) {
    for (; j < myData.projects[projectIndex].tasks.length; j++) {
      if (myData.projects[projectIndex].tasks[j].id === taskId) {
        return j;
      }
    }
    return undefined;
  }
  return undefined;
}

export const renderEntries = () => {
  if (myData.projects.length > 0) {
    myDayRouteEntries__list.innerHTML = myData.projects
      .map((project) =>
        project.tasks.map((task) => {
          task.projectId = project.id;
          return task;
        }),
      )
      .reduce((acc, c) => acc.concat(c), [])
      .filter(myData.filters[myData.navBarSelected[0]])
      .sort(myData.sorts.date)
      .sort(myData.sorts.isPin)
      .sort(myData.sorts.isDone)
      .map(
        (task) => html`
          <div
            class="myDayRouteEntries__item ${(task.priority === "High" &&
              "myDayRouteEntries__item--high") ||
            (task.priority === "Medium" && "myDayRouteEntries__item--medium") ||
            (task.priority === "Low" &&
              "myDayRouteEntries__item--low")} ${task.isDone &&
            "myDayRouteEntries__item--checked"}"
            data-project-index="${findProjectIndex(task.projectId)}"
            data-task-index="${findTaskIndex(task.projectId, task.id)}"
          >
            <div class="myDayRouteEntries__item-wrapper">
              <div class="myDayRouteEntries__item-checkbox">
                <button class="myDayRouteEntries__itemcheckbox" type="button">
                  <div class="myDayRouteEntries__itemButton-checkbox">
                    <svg width="10" height="10" viewBox="0 0 14 12">
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        stroke="currentColor"
                        stroke-width=".6"
                        d="M4.959 9.263l6.792-8.015a.71.71 0 0 1 .995-.082c.3.249.34.69.09.984l-7.29 8.602a.706.706 0 0 1-.708.228.706.706 0 0 1-.483-.248L1.165 6.97a.694.694 0 0 1 .09-.987.712.712 0 0 1 .996.085l2.708 3.195z"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>

              <div class="myDayRouteEntries__item-content">
                <div class="myDayRouteEntries__item-origin">
                  <span class="myDayRouteEntries__item-origin--duedate">
                    ${formatDate(new Date(task.dueDate), "EEEE, dd/LL/yyyy")}
                  </span>
                  <span> - My List > </span>
                  <span class="myDayRouteEntries__item-origin--project">
                    <strong>${task.projectName}</strong>
                  </span>
                </div>

                <div class="myDayRouteEntries__item-taskName">
                  <span class="myDayRouteEntries__item-taskName--name">
                    <strong>${task.taskTitle}</strong>
                  </span>
                </div>
              </div>

              <div
                class="myDayRouteEntries__item-modify ${task.isPin &&
                "myDayRouteEntries__item-modify--pinactive"}"
              >
                <div class="myDayRouteEntries__item-modify-wrapper">
                  <button class="modifyButton modifyButton_pin" type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="m14.873 16.032 4.87-4.468.19.19a.8.8 0 0 0 1.13-1.131l-.14-.142L13.85 3.41l-.141-.141a.8.8 0 0 0-1.132 1.13l.196.196-4.446 4.892-3.551 1.188a1 1 0 0 0-.39 1.656l3.1 3.1-3.677 3.677a.8.8 0 0 0 1.131 1.131l3.677-3.677 3.392 3.391a1 1 0 0 0 1.653-.383l1.21-3.538Zm-.967-10.304 4.703 4.703-5.118 4.697-1.03 3.013-6.258-6.257 3.029-1.012 4.674-5.144Z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>

                  <button
                    class="modifyButton modifyButton_modify"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-more-vertical"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </button>

                  <button
                    class="modifyButton modifyButton_remove"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-x"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `,
      )
      .join("");
  } else {
    myDayRouteEntries__list.innerHTML = "";
  }
};

// headertask events
const time = {};
export function setCurentTime() {
  const today = new Date();
  time.year = formatDate(today, "y");
  time.month = formatDate(today, "MMMM");
  time.weekday = formatDate(today, "E");
  time.day = formatDate(today, "d");
  time.hour = formatDate(today, "H");
  time.minute = formatDate(today, "m");
  time.second = formatDate(today, "s");
  weekday.textContent = time.weekday;
  day.textContent = time.day;
  month.textContent = time.month;

  if (+time.hour < 5 || +time.hour >= 22) {
    myDayRouteTitle__greeting.textContent = "Good night";
    myDayRouteTitle_subtitle.textContent = "Throw off your worries";
  } else if (+time.hour >= 5 && +time.hour < 12) {
    myDayRouteTitle__greeting.textContent = "Good morning";
    myDayRouteTitle_subtitle.textContent = "Remove doubts with action";
  } else if (+time.hour >= 12 && +time.hour < 18) {
    myDayRouteTitle__greeting.textContent = "Good afternoon";
    myDayRouteTitle_subtitle.textContent = "Enjoy your day";
  } else {
    myDayRouteTitle__greeting.textContent = "Good evening";
    myDayRouteTitle_subtitle.textContent = "Your life is beyond sunset";
  }
}

// entries events
export function entriesEvents() {
  const myDayRouteEntries__items = myDayRouteEntries__list.querySelectorAll(
    ".myDayRouteEntries__item",
  );

  function getDetailCard() {
    if (
      !appTask_modal__taskDetail.classList.contains(
        "appTask-modal__taskDetail--active",
      )
    ) {
      appTask_modal__taskDetail.classList.add(
        "appTask-modal__taskDetail--active",
      );
    }
  }

  function clickEntryEvent() {
    myDayRouteEntries__items.forEach((entryItem) => {
      entryItem.onclick = function (e) {
        if (!e.target.closest("button")) {
          const taskItem = getParentElement(
            e.target,
            ".myDayRouteEntries__item",
          );
          const projectIndex = +taskItem.dataset.projectIndex;
          const taskIndex = +taskItem.dataset.taskIndex;
          handler.trigger("inform detail modal", projectIndex, taskIndex);
          handler.trigger("update current indexes", projectIndex, taskIndex);
          getDetailCard();
        }
      };
    });
  }

  function changeTaskTitleTextareaHeightEvent(textAreaEle, styleProperty) {
    const intialTextareaHeight = rootElement.style.getPropertyValue(
      `${styleProperty}`,
    );
    textAreaEle.style.height = intialTextareaHeight;
    let scHeight = textAreaEle.scrollHeight;
    textAreaEle.style.height = `${scHeight}px`;

    textAreaEle.onkeyup = (e) => {
      textAreaEle.style.height = intialTextareaHeight;
      scHeight = e.target.scrollHeight;
      textAreaEle.style.height = `${scHeight}px`;
    };
  }

  function clickDetailBtnEvents() {
    taskDetail_mylist_button.onclick = openBackdropModalListEvent;
    taskDetail_priority_button.onclick = openBackdropModalPriorityEvent;

    taskDetail_check_button.onclick = function () {
      taskDetail_check_button.classList.toggle("iconButton--checked");
    };
  }

  function hideEntryEvents() {
    taskDetail__close_btn.onclick = hideEntry;
    appTask_modal__taskDetail.onclick = function (e) {
      if (
        !e.target.closest(".taskDetail_modal") &&
        !e.target.closest(".taskDetail__close-icon")
      ) {
        hideEntry();
      }
    };
  }

  function hideEntry() {
    handler.trigger("save detail info");
    if (
      appTask_modal__taskDetail.classList.contains(
        "appTask-modal__taskDetail--active",
      )
    ) {
      appTask_modal__taskDetail.classList.remove(
        "appTask-modal__taskDetail--active",
      );
    }
  }

  function clickCheckboxEntryEvent() {
    myDayRouteEntries__items.forEach((entryItem) => {
      const checkboxEle = entryItem.querySelector(
        ".myDayRouteEntries__itemcheckbox",
      );
      checkboxEle.onclick = checkEntry;
    });

    function checkEntry(e) {
      const taskItem = getParentElement(e.target, ".myDayRouteEntries__item");
      const projectIndex = +taskItem.dataset.projectIndex;
      const taskIndex = +taskItem.dataset.taskIndex;
      taskItem.classList.toggle("myDayRouteEntries__item--checked");
      setTimeout(() => {
        handler.trigger("toggle task checkbox", projectIndex, taskIndex);
      }, 900);
    }
  }

  function clickPinEntryEvent() {
    myDayRouteEntries__items.forEach((entryItem) => {
      const pinEle = entryItem.querySelector(".modifyButton_pin");
      pinEle.onclick = pinEntry;
    });

    function pinEntry(e) {
      const myDayRouteEntries__item_modify = e.target.closest(
        ".myDayRouteEntries__item-modify",
      );
      myDayRouteEntries__item_modify.classList.toggle(
        "myDayRouteEntries__item-modify--pinactive",
      );
      const taskItem = getParentElement(e.target, ".myDayRouteEntries__item");
      const projectIndex = +taskItem.dataset.projectIndex;
      const taskIndex = +taskItem.dataset.taskIndex;
      setTimeout(() => {
        handler.trigger("toggle task pin", projectIndex, taskIndex);
      }, 900);
    }
  }

  function clickRemoveEntryEvent() {
    myDayRouteEntries__items.forEach((entryItem) => {
      const removeEle = entryItem.querySelector(".modifyButton_remove");
      removeEle.onclick = removeEntry;
    });

    function removeEntry(e) {
      const taskItem = getParentElement(e.target, ".myDayRouteEntries__item");
      const projectIndex = +taskItem.dataset.projectIndex;
      const taskIndex = +taskItem.dataset.taskIndex;
      taskItem.style.cssText = "opacity: 0; transform: translateY(-50%);";
      setTimeout(() => {
        handler.trigger("remove task", projectIndex, taskIndex);
      }, 900);
    }
  }

  function clickDetailEntryEvent() {
    myDayRouteEntries__items.forEach((entryItem) => {
      const modifyEle = entryItem.querySelector(".modifyButton_modify");
      modifyEle.onclick = openDropdownModalEvent;
    });

    listDetailBtn.onclick = openBackdropModalListEvent;
    priorityDetailBtn.onclick = openBackdropModalPriorityEvent;
  }

  function openDropdownModalEvent(e) {
    const isActive = taskDropdrownMenu_list.classList.contains(
      "taskDropdrownMenu_list--active",
    );
    if (isActive) {
      taskDropdrownMenu_list.classList.remove("taskDropdrownMenu_list--active");
    } else {
      const rect = this.getBoundingClientRect();
      taskDropdrownMenu_list.style.cssText = `top: ${`${rect.bottom}px`}; left: ${`${
        rect.right - 116
      }px`}`;
      taskDropdrownMenu_list.classList.add("taskDropdrownMenu_list--active");

      const taskItem = getParentElement(e.target, ".myDayRouteEntries__item");
      const projectIndex = +taskItem.dataset.projectIndex;
      const taskIndex = +taskItem.dataset.taskIndex;

      handler.trigger("update current indexes", projectIndex, taskIndex);

      hideDropdownModalEvent();
    }
  }

  function hideDropdownModalEvent() {
    appWrapper.addEventListener("click", (e) => {
      if (!e.target.closest(".modifyButton_modify")) {
        hideDropdownModal();
      }
    });
  }

  function hideDropdownModal() {
    const isActive = taskDropdrownMenu_list.classList.contains(
      "taskDropdrownMenu_list--active",
    );
    if (isActive) {
      taskDropdrownMenu_list.classList.remove("taskDropdrownMenu_list--active");
    }
  }

  // mylist dropdown events
  function openBackdropModalListEvent() {
    if (
      !backdropModal_list.classList.contains(
        "appTask-modal__backdropModal--active",
      )
    ) {
      handler.trigger("update backdrop list modal");

      backdropModal_list.classList.add("appTask-modal__backdropModal--active");

      hideBackdropModalListEvent();
      clickBackdropModalTabItemEvent();
    }
  }

  function hideBackdropModalListEvent() {
    backdropModal_list.onclick = hideBackdropModalList;
  }

  function hideBackdropModalList(e) {
    if (!e.target.closest(".backdrop-modal")) {
      if (
        backdropModal_list.classList.contains(
          "appTask-modal__backdropModal--active",
        )
      ) {
        backdropModal_list.classList.remove(
          "appTask-modal__backdropModal--active",
        );
      }
    }
  }

  function clickBackdropModalTabItemEvent() {
    const backdropModal_tab_items = backdropModal_tab_list.querySelectorAll(
      ".backdropModal_tab-item",
    );

    const backdropModal_tab_item_btns = Array.from(backdropModal_tab_items).map(
      (item) => item.querySelector("button"),
    );

    backdropModal_tab_item_btns.forEach((btn) => {
      btn.onclick = changeCurrentProject;
    });

    function changeCurrentProject() {
      const selectedIndex = backdropModal_tab_item_btns.reduce((p, c) => {
        if (c.querySelector("svg")) {
          p = c.dataset.index;
        }
        return p;
      }, 0);

      const selectedBtn = backdropModal_tab_item_btns[selectedIndex];
      const newSelectedIndex = +this.dataset.index;

      if (newSelectedIndex !== selectedIndex) {
        selectedBtn.querySelector("svg").remove();
        this.querySelector(".backdropModal_tab-item-icon").innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24">
            
                        <g fill="none" fill-rule="evenodd">
                            <path fill="currentColor" d="M9.629 15.437l6.226-7.213a.658.658 0 0 1 .912-.075c.275.224.312.62.083.886l-6.683 7.741a.654.654 0 0 1-.648.206.651.651 0 0 1-.444-.223l-2.923-3.386a.617.617 0 0 1 .08-.888.661.661 0 0 1 .915.076l2.482 2.876z"></path>
                        </g>
    
                    </svg>
                `;
      }

      const newTaskIndex = handler.trigger(
        "update project of the task",
        newSelectedIndex,
      );

      const isDetailModalOpened = appTask_modal__taskDetail.classList.contains(
        "appTask-modal__taskDetail--active",
      );
      if (!isDetailModalOpened) {
        handler.trigger("update current indexes", undefined, undefined);
        handler.trigger("update current project to view mode");
      } else {
        handler.trigger("update project in detail modal", newSelectedIndex);
        handler.trigger(
          "update current indexes",
          newSelectedIndex,
          newTaskIndex,
        );
      }

      setTimeout(() => {
        backdropModal_list.classList.remove(
          "appTask-modal__backdropModal--active",
        );
      }, 300);
    }
  }

  // priority dropdown events
  function hideBackdropModalPriority(e) {
    if (!e.target.closest(".backdrop-modal")) {
      if (
        backdropModal_priority.classList.contains(
          "appTask-modal__backdropModal--active",
        )
      ) {
        backdropModal_priority.classList.remove(
          "appTask-modal__backdropModal--active",
        );
      }
    }
  }

  function hideBackdropModalPriorityEvent() {
    backdropModal_priority.addEventListener("click", hideBackdropModalPriority);
  }

  function clickBackdropModalTabPriorityItemEvent() {
    const backdropModal_tab_priority_items =
      backdropModal_tab_priority_list.querySelectorAll(
        ".backdropModal_tab-item",
      );

    const backdropModal_tab_priority_item_btns = Array.from(
      backdropModal_tab_priority_items,
    ).map((item) => item.querySelector("button"));

    backdropModal_tab_priority_item_btns.forEach((btn) => {
      btn.onclick = changeCurrentPriority;
    });

    function changeCurrentPriority() {
      const selectedIndex = backdropModal_tab_priority_item_btns.reduce(
        (p, c) => {
          if (c.querySelector("svg")) {
            p = c.dataset.index;
          }
          return p;
        },
        0,
      );

      const selectedBtn = backdropModal_tab_priority_item_btns[selectedIndex];
      const newSelectedIndex = +this.dataset.index;

      if (this.dataset.index !== selectedIndex) {
        selectedBtn.querySelector("svg").remove();
        this.querySelector(".backdropModal_tab-item-icon").innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24">
            
                        <g fill="none" fill-rule="evenodd">
                            <path fill="currentColor" d="M9.629 15.437l6.226-7.213a.658.658 0 0 1 .912-.075c.275.224.312.62.083.886l-6.683 7.741a.654.654 0 0 1-.648.206.651.651 0 0 1-.444-.223l-2.923-3.386a.617.617 0 0 1 .08-.888.661.661 0 0 1 .915.076l2.482 2.876z"></path>
                        </g>
    
                    </svg>
                `;
      }

      handler.trigger("update priority of the task", newSelectedIndex);

      const isDetailModalOpened = appTask_modal__taskDetail.classList.contains(
        "appTask-modal__taskDetail--active",
      );

      if (!isDetailModalOpened) {
        handler.trigger("update current indexes", undefined, undefined);
      } else {
        handler.trigger("update priority in detail modal", newSelectedIndex);
      }

      setTimeout(() => {
        backdropModal_priority.classList.remove(
          "appTask-modal__backdropModal--active",
        );
      }, 300);
    }
  }

  function openBackdropModalPriorityEvent() {
    if (
      !backdropModal_priority.classList.contains(
        "appTask-modal__backdropModal--active",
      )
    ) {
      handler.trigger("update backdrop priority modal");

      backdropModal_priority.classList.add(
        "appTask-modal__backdropModal--active",
      );

      hideBackdropModalPriorityEvent();
      clickBackdropModalTabPriorityItemEvent();
    }
  }

  // top and bottom shadow checks
  function initialCheckBottomShadow() {
    const { clientHeight: listHeight } = myDayRouteEntries__list;
    const {
      scrollTop,
      clientHeight: contentHeight,
      scrollHeight,
    } = myDayRouteEntries__content;
    const isBottomShadowActive =
      myDayRoute__bottomshadow__shadow.classList.contains(
        "myDayRoute__bottomshadow__shadow--active",
      );
    console.log(listHeight, contentHeight);
    if (listHeight >= contentHeight) {
      if (Math.ceil(scrollTop + contentHeight) === scrollHeight) return;
      if (!isBottomShadowActive) {
        myDayRoute__bottomshadow__shadow.classList.add(
          "myDayRoute__bottomshadow__shadow--active",
        );
      }
    } else if (isBottomShadowActive) {
      myDayRoute__bottomshadow__shadow.classList.remove(
        "myDayRoute__bottomshadow__shadow--active",
      );
    }
  }

  function scrollEntriesEvent() {
    myDayRouteEntries__content.addEventListener("scroll", () => {
      hideDropdownModal();
      const { scrollTop, clientHeight, scrollHeight } =
        myDayRouteEntries__content;

      const isTopShadowActive =
        myDayRoute__topshadow__shadow.classList.contains(
          "myDayRoute__topshadow__shadow--active",
        );
      const isBottomShadowActive =
        myDayRoute__bottomshadow__shadow.classList.contains(
          "myDayRoute__bottomshadow__shadow--active",
        );

      if (scrollTop === 0) {
        if (isTopShadowActive) {
          myDayRoute__topshadow__shadow.classList.remove(
            "myDayRoute__topshadow__shadow--active",
          );
        }
      } else if (!isTopShadowActive) {
        myDayRoute__topshadow__shadow.classList.add(
          "myDayRoute__topshadow__shadow--active",
        );
      }

      if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
        if (isBottomShadowActive) {
          myDayRoute__bottomshadow__shadow.classList.remove(
            "myDayRoute__bottomshadow__shadow--active",
          );
        }
      } else if (!isBottomShadowActive) {
        myDayRoute__bottomshadow__shadow.classList.add(
          "myDayRoute__bottomshadow__shadow--active",
        );
      }
    });
  }

  initialCheckBottomShadow();
  scrollEntriesEvent();

  clickCheckboxEntryEvent();
  clickPinEntryEvent();
  clickRemoveEntryEvent();
  clickDetailEntryEvent();

  clickEntryEvent();
  changeTaskTitleTextareaHeightEvent(
    textAreaTaskContent,
    "--detailtask-textarea-height",
  );
  clickDetailBtnEvents();
  changeTaskTitleTextareaHeightEvent(
    textAreaNotes,
    "--detailtask-textareaNotes-height",
  );
  hideEntryEvents();
}

// addtask events
export function addTaskEvents() {
  activateAddTaskEvent();
  activateMylistBtnEvent();
  activateSendBtnEvent();
  sendDataEvent();
  deactivateAddTaskEvent();
  changeAddTaskHeightEvent();
}

function activateAddTaskEvent() {
  myDayAddTask.onclick = function () {
    myDayAddTask.classList.add("myDayAddTask--active");

    if (enterBtn.classList.contains("iconButton--inactive")) {
      enterBtn.classList.remove("iconButton--inactive");
      enterBtn.disabled = false;
    }

    if (textarea.classList.contains("dynamicTextArea--inactive")) {
      textarea.classList.remove("dynamicTextArea--inactive");
    }
    textarea.focus();
  };
}

function deactivateAddTaskEvent() {
  appWrapper.addEventListener("click", (e) => {
    const isAddTaskActive = myDayAddTask.classList.contains(
      "myDayAddTask--active",
    );

    const isMylistActive = appTask_modal_mylist.classList.contains(
      "appTask-modal_mylist--active",
    );

    if (!isAddTaskActive) return;

    if (e.target.closest(".myDayAddTask")) return;

    if (isMylistActive) {
      if (!e.target.closest(".mylist-modal")) {
        appTask_modal_mylist.classList.remove("appTask-modal_mylist--active");

        setTimeout(() => {
          textarea.focus();
        }, 200);

        return;
      }

      if (!e.target.closest(".mylist__item-btn")) return;

      const myList_modalBtns =
        appTask_modal_mylist.querySelectorAll(".mylist__item-btn");
      const selectedBtn = e.target.closest(".mylist__item-btn");

      const selectedIndex = +selectedBtn.dataset.index;
      let oldBtnIndex;
      let oldBtnIcon;
      for (let i = 0; i < myList_modalBtns.length; ++i) {
        if (myList_modalBtns[i].querySelector(".mylist__item-icon svg")) {
          oldBtnIndex = +myList_modalBtns[i].dataset.index;
          oldBtnIcon = myList_modalBtns[i].querySelector(".mylist__item-icon");
          break;
        }
      }

      if (oldBtnIndex !== selectedIndex) {
        oldBtnIcon.innerHTML = "";
        const selectedBtn_icon =
          selectedBtn.querySelector(".mylist__item-icon");
        selectedBtn_icon.innerHTML = `
                                    <svg width="24" height="24" viewBox="0 0 24 24">
        
                                        <g fill="none" fill-rule="evenodd">
                                            <path fill="currentColor" d="M9.629 15.437l6.226-7.213a.658.658 0 0 1 .912-.075c.275.224.312.62.083.886l-6.683 7.741a.654.654 0 0 1-.648.206.651.651 0 0 1-.444-.223l-2.923-3.386a.617.617 0 0 1 .08-.888.661.661 0 0 1 .915.076l2.482 2.876z"></path>
                                        </g>

                                    </svg>
                                `;

        handler.trigger("update current indexes", selectedIndex, undefined);
      }

      appTask_modal_mylist.classList.remove("appTask-modal_mylist--active");

      setTimeout(() => {
        textarea.focus();
      }, 200);

      myListBtn.classList.add("mylistButton--selected");

      return;
    }

    // trim input data before exit addtask
    if (!textarea.value.trim()) {
      textarea.value = "";
      textarea.style.height = textareaHeight;
      rootElement.style.setProperty(
        "--add-card-dynamic-height",
        `${textareaHeight}`,
      );
      myDayAddTask.classList.remove("myDayAddTask--active");
    } else {
      textarea.value = textarea.value.trim();
      textarea.style.height = textareaHeight;
      const scHeight = textarea.scrollHeight;
      textarea.style.height = `${scHeight}px`;
      rootElement.style.setProperty(
        "--add-card-dynamic-height",
        `${scHeight}px`,
      );
    }

    // change to default properties
    textarea.classList.add("dynamicTextArea--inactive");
    enterBtn.classList.add("iconButton--inactive");
    enterBtn.disabled = true;

    if (myListBtn.classList.contains("mylistButton--selected")) {
      myListBtn.classList.remove("mylistButton--selected");
    }

    setTimeout(() => {
      textarea.blur();
    }, 200);
  });
}

function activateMylistBtnEvent() {
  myListBtn.onclick = function () {
    handler.trigger("update my list addtask modal");

    const isActive = appTask_modal_mylist.classList.contains(
      "appTask-modal_mylist--active",
    );
    if (!isActive) {
      appTask_modal_mylist.classList.add("appTask-modal_mylist--active");
    }

    setTimeout(() => {
      textarea.blur();
    }, 200);
  };
}

function activateSendBtnEvent() {
  textarea.oninput = function (e) {
    const isValid = !!e.target.value.trim();
    const isContained = enterBtn.classList.contains("iconButton--valid");
    if (isValid) {
      if (!isContained) {
        enterBtn.classList.add("iconButton--valid");
        enterBtn.disabled = false;
      }
    } else if (isContained) {
      enterBtn.classList.remove("iconButton--valid");
      enterBtn.disabled = true;
    }
  };
}

function sendDataEvent() {
  enterBtn.onclick = function () {
    const isValid = enterBtn.classList.contains("iconButton--valid");
    if (isValid) {
      enterBtn.classList.remove("iconButton--valid");
      enterBtn.disabled = true;

      handler.trigger("update my list addtask modal");

      const myList_modalBtns =
        appTask_modal_mylist.querySelectorAll(".mylist__item-btn");

      // collect data action includes
      // 1 - check having at least 1 project
      if (myList_modalBtns.length === 0) {
        if (
          !AddTask__message.classList.contains("myDayAddTask__message--active")
        ) {
          AddTask__message.classList.add("myDayAddTask__message--active");
        }
      } else {
        const taskName = textarea.value.trim();
        handler.trigger("create a new task", taskName);
      }

      // 2 - then clear textarea element
      textarea.value = "";

      if (myListBtn.classList.contains("mylistButton--selected")) {
        myListBtn.classList.remove("mylistButton--selected");
      }

      if (
        appTask_modal_mylist.classList.contains("appTask-modal_mylist--active")
      ) {
        appTask_modal_mylist.classList.remove("appTask-modal_mylist--active");
      }

      textarea.style.height = textareaHeight;
      rootElement.style.setProperty(
        "--add-card-dynamic-height",
        `${textareaHeight}`,
      );
    }
  };
}

function changeAddTaskHeightEvent() {
  textarea.onkeyup = function (e) {
    textarea.style.height = textareaHeight;
    const scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
    rootElement.style.setProperty("--add-card-dynamic-height", `${scHeight}px`);
  };
}
