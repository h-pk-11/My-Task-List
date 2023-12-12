import { transform } from '../../actions';
import { isProjectNameEditMode } from './SidebarEvents.js';
import { AddTask__message } from '../Mainboard/AddtaskEvents.js';

const appWrapper = document.querySelector('.appWrapper');
const newProjectModal = appWrapper.querySelector('.appTask-modal__newproject');
const input = newProjectModal.querySelector('.newproject-modal__textfield_input');
const newProjectModalWrapper = newProjectModal.querySelector('.newproject-modal__wrapper');
const newprojectCloseBtn = newProjectModal.querySelector('.newproject-modal__close');
const newprojectSubmitBtn = newProjectModal.querySelector('.newproject-modal__button');

const appSideBar = appWrapper.querySelector('.appSideBar');
const appSideBar__animation = appSideBar.querySelector('.appSideBar__animation');


export function addNewProject(){
    showNewProjectModal();

    //add event listeners
    newprojectCloseBtn.onclick = hideNewProjectModal;

    newProjectModal.onclick = hideNewProjectModal;

    newProjectModalWrapper.onclick = function(e){
        e.stopPropagation();
    };

    activateSubmitBtn();
    input.oninput = activateSubmitBtn;

    newprojectSubmitBtn.onclick = function(){
        const projectName = input.value.trim();
        if(!isProjectNameEditMode){
            transform("create a project", projectName);
            
        }else{
            transform("change project name", projectName, id);
        }
        hideNewProjectModal();
        input.value = '';

        const appSideBar__items = appSideBar__animation.querySelectorAll('.appSideBar__item');
        if(appSideBar__items.length === 1){

            if(AddTask__message.classList.contains('myDayAddTask__message--active')){
                AddTask__message.classList.remove('myDayAddTask__message--active');
            }
        }
    }
}

export function editProjectName(e){
    const id = showProjectModal(e);

    //add event listeners
    newprojectCloseBtn.onclick = hideNewProjectModal;

    newProjectModal.onclick = hideNewProjectModal;

    newProjectModalWrapper.onclick = function(e){
        e.stopPropagation();
    };

    activateSubmitBtn();
    input.oninput = activateSubmitBtn;

    newprojectSubmitBtn.onclick = function(){
        const projectName = input.value.trim();
        if(!isProjectNameEditMode){
            transform("create a project", projectName);
            
        }else{
            transform("change project name", projectName, id);
        }
        hideNewProjectModal();
        input.value = '';
    }
}


function showProjectModal(e){
    const item = e.target.closest('.appSideBar__item');
    let id;
    if(item){
        id = item.dataset.projectId;

        const appSideBar__items = appSideBar__animation.querySelectorAll('.appSideBar__item');

        let i = 0
        for(; i < appSideBar__items.length; i++){
            if(appSideBar__items[i].dataset.projectId === id){
                break;
            }
        }
        const appSideBar__item_title_wrapper = appSideBar__items[i].querySelector('.appSideBar__item_title-wrapper');

        newProjectModal.classList.add('appTask-modal__newproject--active');
        const projectName = appSideBar__item_title_wrapper.textContent;
        input.value = projectName

        const end = projectName.length;
        setTimeout(() => {
            input.setSelectionRange(end, end);
            input.focus();
        }, 300);
    }

    return id;
}

function showNewProjectModal(){
    newProjectModal.classList.add('appTask-modal__newproject--active');

    input.value = '';
    const end = input.value.length;
    setTimeout(() => {
        input.setSelectionRange(end, end);
        input.focus();
    }, 300);
    
}

function hideNewProjectModal(){
    newProjectModal.classList.remove('appTask-modal__newproject--active');
    input.blur();
}

function activateSubmitBtn(){
    newprojectSubmitBtn.disabled = true;
    if(input.value.trim() !== ''){
        newprojectSubmitBtn.disabled = false;
    }
}


