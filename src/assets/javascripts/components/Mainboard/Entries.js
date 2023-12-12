import { myData, html } from '../../data.js';
import { formatDate } from './HeaderTaskEvent.js';
const todosApp = document.querySelector('#todosApp');

// for render Entries view
const appMainBoard = todosApp.querySelector('.appMainBoard');
const myDayRouteEntries__list = appMainBoard.querySelector('.myDayRouteEntries__list');

export function findProjectIndex(projectId){
    let i = 0;
    for( ; i < myData.projects.length; i++){
        if(myData.projects[i].id === projectId){
            return i;
        }
    }

    return undefined;
}

export function findTaskIndex(projectId, taskId){
    const projectIndex = findProjectIndex(projectId);
    let j = 0;
    if(!Number.isNaN(projectIndex)){
        for(; j < myData.projects[projectIndex].tasks.length; j++){
            if(myData.projects[projectIndex].tasks[j].id === taskId){
                return j;
            }
        }
        return undefined;
    }
    return undefined;
}

export const renderEntries = ()=>{
    if(myData.projects.length > 0){
        myDayRouteEntries__list.innerHTML = myData.projects
            .map((project) => project.tasks.map(task => {
                task.projectId = project.id;
                return task;
            }))
            .reduce((acc, c)=>{
                return acc.concat(c);
            }, [])
            .filter(myData.filters[myData.navBarSelected[0]])
            .sort(myData.sorts.date)
            .sort(myData.sorts.isPin)
            .sort(myData.sorts.isDone)
            .map((task) => {
                return html`
                    <div 
                        class="myDayRouteEntries__item ${
                            (task.priority === 'High' && 'myDayRouteEntries__item--high') || 
                            (task.priority === 'Medium' && 'myDayRouteEntries__item--medium') || 
                            (task.priority === 'Low' && 'myDayRouteEntries__item--low')
                        } ${task.isDone && 'myDayRouteEntries__item--checked'}" 
                        data-project-index="${findProjectIndex(task.projectId)}" 
                        data-task-index="${findTaskIndex(task.projectId, task.id)}"
                    >
    
                        <div class="myDayRouteEntries__item-wrapper">

                            <div class="myDayRouteEntries__item-checkbox">

                                <button class="myDayRouteEntries__itemcheckbox" type="button">

                                    <div class="myDayRouteEntries__itemButton-checkbox">

                                        <svg
                                            width="10"
                                            height="10"
                                            viewBox="0 0 14 12"
                                        >
                                            <path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-width=".6" d="M4.959 9.263l6.792-8.015a.71.71 0 0 1 .995-.082c.3.249.34.69.09.984l-7.29 8.602a.706.706 0 0 1-.708.228.706.706 0 0 1-.483-.248L1.165 6.97a.694.694 0 0 1 .09-.987.712.712 0 0 1 .996.085l2.708 3.195z"></path>
                                        </svg>

                                    </div>

                                </button>

                            </div>

                            <div class="myDayRouteEntries__item-content">

                                <div class="myDayRouteEntries__item-origin">
                                    <span class="myDayRouteEntries__item-origin--duedate">
                                        ${formatDate(new Date(task.dueDate), 'EEEE, dd\/LL\/yyyy')}
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

                            <div class="myDayRouteEntries__item-modify ${task.isPin && 'myDayRouteEntries__item-modify--pinactive'}">
                                <div class="myDayRouteEntries__item-modify-wrapper">

                                    <button class="modifyButton modifyButton_pin" type="button">

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path fill="currentColor" fill-rule="evenodd" d="m14.873 16.032 4.87-4.468.19.19a.8.8 0 0 0 1.13-1.131l-.14-.142L13.85 3.41l-.141-.141a.8.8 0 0 0-1.132 1.13l.196.196-4.446 4.892-3.551 1.188a1 1 0 0 0-.39 1.656l3.1 3.1-3.677 3.677a.8.8 0 0 0 1.131 1.131l3.677-3.677 3.392 3.391a1 1 0 0 0 1.653-.383l1.21-3.538Zm-.967-10.304 4.703 4.703-5.118 4.697-1.03 3.013-6.258-6.257 3.029-1.012 4.674-5.144Z" clip-rule="evenodd"></path>
                                        </svg>

                                    </button>

                                    <button class="modifyButton modifyButton_modify" type="button">

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

                                    <button class="modifyButton modifyButton_remove" type="button">

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
                `;
            })
            .join('');
    
    }else{
        myDayRouteEntries__list.innerHTML = '';
    }
}