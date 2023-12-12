import { myData } from './data.js';
import LocalStorage from "./LocalStorage/LocalStorage.js";

//from sidebar
import { renderModeCount, renderProjectsList } from './components/Sidebar/Sidebar.js';
import { addSidebarEvents, activeTabsEvent } from './components/Sidebar/SidebarEvents.js';

// from mainboard
import { setCurentTime } from './components/Mainboard/HeaderTaskEvent.js';
import { addTaskEvents } from './components/Mainboard/AddtaskEvents.js';
import { renderEntries } from './components/Mainboard/Entries.js';
import { entriesEvents } from './components/Mainboard/EntriesEvents.js';

// from backdropmodaldetail
import { informDetailModal, getDetailModalInfo, updateProjectInDetailModal, updatePriorityInDetailModal } from './components/Mainboard/BackdropModalDetail/BackdropModalDetail.js';

// from backdropmodallist
import { updateBackdropListModal } from './components/Mainboard/BackdropModalList/BackdropModalList.js';

// from backdropmodalpriority
import { updateBackdropPriorityModal } from './components/Mainboard/BackdropModalPriority/BackdropModalPriority.js';

// from mylistaddtaskmodal 
import { updateMylistAddTaskModal } from './components/Mainboard/MylistAddTaskModal/MylistAddTaskModal.js';

// from headertaskevents.js
import { formatDate } from './components/Mainboard/HeaderTaskEvent.js';


function generateId(arr){
    let number = Math.floor(Math.random() * 1000);
    if (number < 10){
        number = '00' + number;
    }else if(number >= 10 && number < 100){
        number = '0' + number;
    }else {
        number = String(number);
    }
    const characters = String.fromCodePoint( Math.floor(Math.random(26) + 97), Math.floor(Math.random(26) + 97), Math.floor(Math.random(26) + 97));

    const id = number + characters;
    for(let i = 0; i < arr.length; i++){
        if(arr.id === id){
            generateId(arr);
            break;
        }
    }

    return id;
}

function render(){
    renderModeCount();
    renderProjectsList();
    renderEntries();
}

export const viewController = (function(){
    const start = () => {
        inital();
    }

    const inital = ()=>{
        //render
        render();

        // add events (unchanged elements)
        addSidebarEvents();
        setCurentTime();
        setInterval(setCurentTime, 1000);
        addTaskEvents();
        
        // add event (changed elements)
        activeTabsEvent();
        entriesEvents();
    };

    return {
        start
    }

})();


const actions = {
    "change view mode": function(viewMode, id){
        if(viewMode !== "project"){
            myData.navBarSelected = [viewMode, ''];
            renderEntries();
            activeTabsEvent();
            entriesEvents();

        }else{
            myData.navBarSelected = [viewMode, id];
            let i = 0
            for(; i < myData.projects.length; i++){
                if(myData.projects[i].id === id){
                    break;
                }
            }
            myData.currentProjectIndex = i;
            renderEntries();
            activeTabsEvent();
            entriesEvents();
        }
    },

    "create a project": function(projectName){
        const id = generateId(myData.projects);
        myData.projects.push({
            id,
            projectName,
            tasks: [],
        });
        renderProjectsList();
        activeTabsEvent();

        LocalStorage.set(myData.projects);
    },

    "change project name": function(projectName, id){
        let i = 0
        for(; i < myData.projects.length; i++){
            if(myData.projects[i].id === id){
                break;
            }
        }

        myData.projects[i].projectName = projectName;
        myData.projects[i].tasks.forEach(task => {
            task.projectName = projectName;
        });
        renderModeCount();
        renderProjectsList();
        activeTabsEvent();
        renderEntries();
        entriesEvents();

        LocalStorage.set(myData.projects);
    },

    "delete project": function(id){
        let i = 0;
        for(; i < myData.projects.length; i++){
            if(myData.projects[i].id === id){
                break;
            }
        }
        if(myData.navBarSelected[1] === id){
            if(i - 1 >= 0){
                myData.navBarSelected = ['project', myData.projects[i - 1].id];
                myData.currentProjectIndex = i - 1;
            }else if(i + 1 < myData.projects.length){
                myData.navBarSelected = ['project', myData.projects[i + 1].id];
                myData.currentProjectIndex = i + 1;
            }else if(i === 0){
                myData.navBarSelected = ["All my tasks", ''];
                myData.currentProjectIndex = undefined;
            }
        }
        myData.projects.splice(i, 1);
        renderModeCount();
        renderProjectsList();
        activeTabsEvent();
        renderEntries();
        entriesEvents();

        LocalStorage.set(myData.projects);

        return myData.projects.length;
    },

    "toggle task checkbox": function(projectIndex, taskIndex){
        myData.projects[projectIndex].tasks[taskIndex].isDone = !myData.projects[projectIndex].tasks[taskIndex].isDone;
        renderModeCount();
        renderProjectsList();
        activeTabsEvent();
        renderEntries();
        entriesEvents();

        LocalStorage.set(myData.projects);
    },

    "toggle task pin": function(projectIndex, taskIndex){
        myData.projects[projectIndex].tasks[taskIndex].isPin = !myData.projects[projectIndex].tasks[taskIndex].isPin;
        renderModeCount();
        renderProjectsList();
        activeTabsEvent();
        renderEntries();
        entriesEvents();

        LocalStorage.set(myData.projects);
    },

    "remove task": function(projectIndex, taskIndex){
        myData.projects[projectIndex].tasks.splice(taskIndex, 1);
        renderModeCount();
        renderProjectsList();
        activeTabsEvent();
        renderEntries();
        entriesEvents();

        LocalStorage.set(myData.projects);
    },

    "inform detail modal": function(projectIndex, taskIndex){
        const projectName = myData.projects[projectIndex].projectName;
        const task = myData.projects[projectIndex].tasks[taskIndex];
        const taskTitle = task.taskTitle;
        const duadate = task.dueDate;
        const isDone = task.isDone;
        const priority = task.priority;
        const notes = task.notes;
        informDetailModal(projectName, taskTitle, duadate, isDone, priority, notes);
    },

    "save detail info": function(){
        const change = getDetailModalInfo();
        const project = myData.projects[myData.currentProjectIndex];
        const task = project.tasks[myData.currentTaskIndex];
        if(task){
            task.projectName = change.projectName || task.projectName;
            task.taskTitle = change.taskTitle || task.taskTitle;
            task.dueDate = change.dueDate;
            task.priority = change.priority;
            task.notes = change.notes;
            task.isDone = change.isDone;
        }
        myData.currentProjectIndex = undefined;
        myData.currentTaskIndex = undefined;
        renderModeCount();
        renderProjectsList();
        activeTabsEvent();
        renderEntries();
        entriesEvents();

        LocalStorage.set(myData.projects);
    },

    "update current indexes": function(projectIndex, taskIndex){
        myData.currentProjectIndex = projectIndex;
        myData.currentTaskIndex = taskIndex;
    },

    "update current project to view mode": function(){
        let projectIndex;
        const viewMode = myData.navBarSelected[0];
        if(viewMode !== 'project'){
            projectIndex = 0;
        }else{
            let i = 0;
            for(;i < myData.projects.length; ++i){
                if(myData.projects[i].id === myData.navBarSelected[1]){
                    break;
                }
            }
            projectIndex = i;
        }
        myData.currentProjectIndex = projectIndex;
    },

    "update backdrop list modal": function(){
        updateBackdropListModal();
    },

    "update project of the task": function(newProjectIndex){
        const currentProjectIndex = myData.currentProjectIndex;
        const currentTaskIndex = myData.currentTaskIndex;

        const tasks = myData.projects[currentProjectIndex].tasks;
        const task = tasks[currentTaskIndex];
        tasks.splice(currentTaskIndex, 1);

        const newId = generateId(myData.projects[newProjectIndex].tasks);
        task.id = newId;
        task.projectName = myData.projects[newProjectIndex].projectName;

        myData.projects[newProjectIndex].tasks.push(task);
        renderModeCount();
        renderProjectsList();
        activeTabsEvent();
        renderEntries();
        entriesEvents();

        const newTaskIndex = myData.projects[newProjectIndex].tasks.length - 1;

        LocalStorage.set(myData.projects);

        return newTaskIndex;
    },

    "update backdrop priority modal": function(){
        updateBackdropPriorityModal();
    },

    "update priority of the task": function(index){
        const currentProjectIndex = myData.currentProjectIndex;
        const currentTaskIndex = myData.currentTaskIndex;

        const task = myData.projects[currentProjectIndex].tasks[currentTaskIndex];

        switch(index){
            case 0: {
                task.priority = "High";
                break;
            }

            case 1: {
                task.priority = "Medium";
                break;
            }

            case 2: {
                task.priority = "Low";
                break;
            }
        }

        renderModeCount();
        renderProjectsList();
        activeTabsEvent();
        renderEntries();
        entriesEvents();

        LocalStorage.set(myData.projects);
    },

    "update project in detail modal": function(newSelectedIndex){
        const projectName = myData.projects[newSelectedIndex].projectName;
        updateProjectInDetailModal(projectName);
    },

    "update priority in detail modal": function(newSelectedIndex){
        let priority;
        switch(newSelectedIndex){
            case 0: {
                priority = "High";
                break;
            }

            case 1: {
                priority = "Medium";
                break;
            }

            case 2: {
                priority = "Low";
                break;
            }
        }

        updatePriorityInDetailModal(priority);
    },

    "update my list addtask modal": function(){
        updateMylistAddTaskModal();
    },

    "create a new task": function(taskTitle){
        const currentProjectIndex = myData.currentProjectIndex;
        const project = myData.projects[currentProjectIndex];
        const id = generateId(project.tasks);
        const projectName = project.projectName;
        const dueDate = formatDate(new Date(), 'yyyy-LL-dd');
        const priority = 'Medium';
        const notes = '';
        const isDone = false;
        const isPin = false;
        const newTask = {
            id,
            projectName,
            taskTitle,
            dueDate,
            priority,
            notes,
            isDone,
            isPin,
        };
        project.tasks.push(newTask);

        renderModeCount();
        renderProjectsList();
        activeTabsEvent();
        renderEntries();
        entriesEvents();

        LocalStorage.set(myData.projects);
    },

}

export function transform(actionName, ...args){
    let result = actions[actionName] && actions[actionName](...args);
    return result;
}