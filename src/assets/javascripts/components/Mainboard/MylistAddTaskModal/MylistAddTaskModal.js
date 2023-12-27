import { myData, html } from "../../../data";

const appWrapper = document.querySelector(".appWrapper");
const appTask_modal_mylist = appWrapper.querySelector(".appTask-modal_mylist");
const mylist__list_items = appTask_modal_mylist.querySelector(
  ".mylist__list_items",
);

export default function updateMylistAddTaskModal() {
  const viewMode = myData.navBarSelected[0];
  const id = myData.navBarSelected[1];
  const { currentProjectIndex } = myData;
  let curProjectIndex;
  if (viewMode === "project") {
    let i = 0;
    for (; i < myData.projects.length; i++) {
      if (myData.projects[i].id === id) {
        break;
      }
    }
    curProjectIndex = i;
    if (
      !Number.isNaN(currentProjectIndex) &&
      currentProjectIndex !== curProjectIndex
    ) {
      curProjectIndex = currentProjectIndex;
    }
  } else if (myData.projects.length >= 1) {
    if (currentProjectIndex) {
      curProjectIndex = currentProjectIndex;
    } else {
      curProjectIndex = 0;
      myData.currentProjectIndex = 0;
    }
  } else {
    curProjectIndex = undefined;
  }

  mylist__list_items.innerHTML = myData.projects
    .map(
      (project, index) => html`
        <div class="mylist__item">
          <button data-index="${index}" class="mylist__item-btn">
            <div class="mylist__item-content">
              <div class="mylist__item-title">${project.projectName}</div>

              <div class="mylist__item-icon">
                ${index === curProjectIndex &&
                `
                                        <svg width="24" height="24" viewBox="0 0 24 24">

                                            <g fill="none" fill-rule="evenodd">
                                                <path fill="currentColor" d="M9.629 15.437l6.226-7.213a.658.658 0 0 1 .912-.075c.275.224.312.62.083.886l-6.683 7.741a.654.654 0 0 1-.648.206.651.651 0 0 1-.444-.223l-2.923-3.386a.617.617 0 0 1 .08-.888.661.661 0 0 1 .915.076l2.482 2.876z"></path>
                                            </g>

                                        </svg>
                                    `}
              </div>
            </div>
          </button>
        </div>
      `,
    )
    .join("");
}
