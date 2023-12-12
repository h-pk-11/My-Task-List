import { transform } from '../../actions.js';
const rootElement = document.documentElement;
const appWrapper = document.querySelector('.appWrapper');
const myDayRoute_addTask = appWrapper.querySelector('.myDayRoute_addTask');
const myDayAddTask = myDayRoute_addTask.querySelector('.myDayAddTask');
const textAeraWrapper = myDayAddTask.querySelector('.textAeraWrapper'); 
// const textareaEle = textAeraWrapper.querySelector('.dynamicTextArea');
const textareaHeight = rootElement.style.getPropertyValue('--add-card-height');
const textarea = document.getElementById('dynamicTextArea');
const myDayAddTask_enter = myDayAddTask.querySelector('.myDayAddTask_enter');
const enterBtn = myDayAddTask_enter.querySelector('.iconButton');
const iconWrapper = textAeraWrapper.querySelector('.iconWrapper');
const myListBtn = iconWrapper.querySelector('.iconButton');
export const AddTask__message = myDayAddTask.querySelector('.myDayAddTask__message');

const appTask_modal_mylist = appWrapper.querySelector('.appTask-modal_mylist');


export function addTaskEvents(){
    activateAddTaskEvent();
    activateMylistBtnEvent();
    activateSendBtnEvent();
    sendDataEvent();
    deactivateAddTaskEvent();
    changeAddTaskHeightEvent();
}

function activateAddTaskEvent(){
    transform("update my list addtask modal");
    // const myList_modalBtns = appTask_modal_mylist.querySelectorAll('.mylist__item-btn');

    myDayAddTask.onclick = function(e){
        // e.stopPropagation();
        myDayAddTask.classList.add('myDayAddTask--active');

        if(enterBtn.classList.contains('iconButton--inactive')){
            enterBtn.classList.remove('iconButton--inactive');
            enterBtn.disabled = false;
        }

        if(textarea.classList.contains('dynamicTextArea--inactive')){
            textarea.classList.remove('dynamicTextArea--inactive');
        }
        textarea.focus();
    };

}

function deactivateAddTaskEvent(){
    
    appWrapper.addEventListener('click', (e)=>{
        // e.stopPropagation();

        const isAddTaskActive = myDayAddTask.classList.contains('myDayAddTask--active');

        const isMylistActive = appTask_modal_mylist.classList.contains('appTask-modal_mylist--active');

        if(isAddTaskActive){

            if(!e.target.closest('.myDayAddTask')){

                if(isMylistActive){

                    if(e.target.closest('.mylist-modal')){

                        if(e.target.closest('.mylist__item-btn')){
                            const myList_modalBtns = appTask_modal_mylist.querySelectorAll('.mylist__item-btn');
                            // change selected mylist item (ui)
                            const selectedBtn = e.target.closest('.mylist__item-btn');

                            const selectedIndex = +selectedBtn.dataset.index;
                            let oldBtnIndex;
                            let oldBtnIcon;
                            for(let i = 0; i < myList_modalBtns.length; ++i){

                                if(myList_modalBtns[i].querySelector('.mylist__item-icon svg')){
                                    oldBtnIndex = +myList_modalBtns[i].dataset.index;
                                    oldBtnIcon = myList_modalBtns[i].querySelector('.mylist__item-icon')
                                    break;
                                }
                            }

                            if(oldBtnIndex !== selectedIndex){
                                oldBtnIcon.innerHTML = '';
                                const selectedBtn_icon = selectedBtn.querySelector('.mylist__item-icon');
                                selectedBtn_icon.innerHTML = `
                                    <svg width="24" height="24" viewBox="0 0 24 24">
        
                                        <g fill="none" fill-rule="evenodd">
                                            <path fill="currentColor" d="M9.629 15.437l6.226-7.213a.658.658 0 0 1 .912-.075c.275.224.312.62.083.886l-6.683 7.741a.654.654 0 0 1-.648.206.651.651 0 0 1-.444-.223l-2.923-3.386a.617.617 0 0 1 .08-.888.661.661 0 0 1 .915.076l2.482 2.876z"></path>
                                        </g>

                                    </svg>
                                `;

                                transform("update current indexes", selectedIndex, undefined);
                            }
                                 
                            // deactivate mylist-modal
                            appTask_modal_mylist.classList.remove('appTask-modal_mylist--active');

                            setTimeout(()=>{
                                textarea.focus(); 
                            },200);

                            // hightlight mylist icon
                            myListBtn.classList.add('mylistButton--selected');

                        }

                    }else{

                        appTask_modal_mylist.classList.remove('appTask-modal_mylist--active');

                        setTimeout(()=>{
                            textarea.focus(); 
                        },200);

                    }

                }else{
                    // trim input data before exit addtask
                    if(!textarea.value.trim()){
                        textarea.value = '';
                        textarea.style.height = textareaHeight;
                        rootElement.style.setProperty('--add-card-dynamic-height', `${textareaHeight}`);
                        myDayAddTask.classList.remove('myDayAddTask--active');
                    }else{
                        textarea.value = textarea.value.trim();
                        textarea.style.height = textareaHeight;
                        let scHeight = textareaEle.scrollHeight;
                        textarea.style.height = `${scHeight}px`;
                        rootElement.style.setProperty('--add-card-dynamic-height', `${scHeight}px`);
                    }

                    // change to defaut properties
                    textarea.classList.add('dynamicTextArea--inactive');
                    enterBtn.classList.add('iconButton--inactive');
                    enterBtn.disabled = true;

                    if(myListBtn.classList.contains('mylistButton--selected')){
                        myListBtn.classList.remove('mylistButton--selected');
                    }
                
                    setTimeout(()=>{
                        textarea.blur(); 
                    },200);

                }
            }
            
        }

    });
}

function activateMylistBtnEvent(){
    myListBtn.onclick = function(){
        transform("update my list addtask modal");

        const isActive = appTask_modal_mylist.classList.contains('appTask-modal_mylist--active');
        if(!isActive){
            appTask_modal_mylist.classList.add('appTask-modal_mylist--active');
        }

        setTimeout(()=>{
            textarea.blur();
        },200);
        
    };
}

function activateSendBtnEvent(){
    textarea.oninput = function(e){
        const isValid = !!e.target.value.trim();
        const isContained = enterBtn.classList.contains('iconButton--valid');
        if(isValid){
            if(!isContained){
                enterBtn.classList.add('iconButton--valid');
                enterBtn.disabled = false;
            }
        }else{
            if(isContained){
                enterBtn.classList.remove('iconButton--valid');
                enterBtn.disabled = true;
            }
        }
    };
}

function sendDataEvent(){

    enterBtn.onclick = function(e){
        // valid?
        const isValid = enterBtn.classList.contains('iconButton--valid');
        if(isValid){
            enterBtn.classList.remove('iconButton--valid');
            enterBtn.disabled = true;

            transform("update my list addtask modal");

            const myList_modalBtns = appTask_modal_mylist.querySelectorAll('.mylist__item-btn');
            
            // collect data action
            // 1. check having at least 1 project
            if(myList_modalBtns.length === 0){
                if(!AddTask__message.classList.contains('myDayAddTask__message--active')){
                    AddTask__message.classList.add('myDayAddTask__message--active');
                }
            }else{
                const taskName = textarea.value.trim();
                transform("create a new task", taskName);
            }
            
            // ...then clear textarea element
            textarea.value = '';

            if(myListBtn.classList.contains('mylistButton--selected')){
                myListBtn.classList.remove('mylistButton--selected');
            }

            if(appTask_modal_mylist.classList.contains('appTask-modal_mylist--active')){
                appTask_modal_mylist.classList.remove('appTask-modal_mylist--active');
            }

            textarea.style.height = textareaHeight;
            rootElement.style.setProperty('--add-card-dynamic-height', `${textareaHeight}`);
        }  

    };
}

function changeAddTaskHeightEvent(){
    textarea.onkeyup = function(e){
        textarea.style.height = textareaHeight;
        let scHeight = e.target.scrollHeight;
        textarea.style.height = `${scHeight}px`;
        rootElement.style.setProperty('--add-card-dynamic-height', `${scHeight}px`);
    };
}