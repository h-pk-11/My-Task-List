import { myData, html } from "../../../data";

const appWrapper = document.querySelector(".appWrapper");
const backdropModal_list = appWrapper.querySelector(".backdropModal_list");
const backdropModal_tab_list = backdropModal_list.querySelector(
  ".backdropModal_tab-list",
);

export default function updateBackdropListModal() {
  const { currentProjectIndex } = myData;
  backdropModal_tab_list.innerHTML = myData.projects
    .map(
      (project, index) => html`
        <div class="backdropModal_tab-item">
          <button type="button" class="iconButton" data-index="${index}">
            <div class="backdropModal_tab-item-content">
              <div class="backdropModal_tab-item-title">
                ${project.projectName}
              </div>
              <div class="backdropModal_tab-item-icon">
                ${index === currentProjectIndex &&
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
