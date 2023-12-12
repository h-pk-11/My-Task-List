import { myData, html } from '../../data';
const todosApp = document.querySelector('#todosApp');

// for mode view
const appSideBar = todosApp.querySelector('.appSideBar');
const appSideBar__taskList = appSideBar.querySelector('.appSideBar__taskList');
const count_elements = appSideBar__taskList.querySelectorAll('.appSideBar__taskItem_badge-count');
const appSideBar__projectHeading = appSideBar.querySelector('.appSideBar__projectHeading');
const project_count_element = appSideBar__projectHeading.querySelector('.appSideBar__item_badge-count');

// for render project list view
const appSideBar__animation = appSideBar.querySelector('.appSideBar__animation');
const appSideBar__list = appSideBar__animation.querySelector('.appSideBar__list');

export function renderModeCount(){
    const myActiveTasks = myData.projects.map(project => project.tasks)
                                            .reduce((acc, c) => {
                                                return acc.concat(c);
                                            },[])
                                            .filter(myData.filters['isDone']);

    const myDayTaskNumber = myActiveTasks.filter(myData.filters['My day']).length;
    const next7DaysTaskNumber = myActiveTasks.filter(myData.filters['Next 7 days']).length;
    const allMyTasksNumber = myActiveTasks.length;

    myDayTaskNumber < 100 ? count_elements[0].textContent = myDayTaskNumber : count_elements[0].textContent = '+99';

    next7DaysTaskNumber < 100 ? count_elements[1].textContent = next7DaysTaskNumber : count_elements[1].textContent = '+99';

    allMyTasksNumber < 100 ? count_elements[2].textContent = allMyTasksNumber : count_elements[2].textContent = '+99';

    allMyTasksNumber < 100 ? project_count_element.textContent = allMyTasksNumber : project_count_element.textContent = '+99';
}

// class="appSideBar__item ${myData.navBarSelected[1] === project.id && 'appSideBar__item--selected'}" 

export const renderProjectsList = ()=>{
    if(myData.projects.length > 0){
        appSideBar__list.innerHTML = myData.projects
            .map(project => {
                return html`
                    <li 
                        class="appSideBar__item appSideBar__item--projects ${myData.navBarSelected[1] === project.id && 'appSideBar__item--selected'}" 
                        data-project-id="${project.id}" 
                        data-view-mode="project"
                    >
                        <a href="#" class="appSideBar__item_link">
                            
                            <div class="appSideBar__item_title">
                                <div class="appSideBar__item_title-wrapper">${project.projectName}</div>
                            </div>

                            <div class="appSideBar__item_badge">
                                <div class="appSideBar__item_badge-wrapper">
                                    <div class="appSideBar__item_badge-count">${project.tasks.filter(myData.filters['isDone']).length}</div>
                                </div>
                            </div>

                        </a>

                        <button class="appSideBar__item_remove">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="X_frame">
                                    <path id="X_14x14" d="M1 1L11 11M1 11L11 1" stroke="black" stroke-linecap="round"/>
                                </g>
                            </svg>
                        </button>
                    </li>
                `;
            })
            .join('');

            
    }else{
        appSideBar__list.innerHTML = '';
    }
};
