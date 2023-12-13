import { transform } from '../../actions.js';
const rootElement = document.documentElement;
const appWrapper = document.querySelector('.appWrapper');
const myDayRoute__entries = appWrapper.querySelector('.myDayRoute__entries');

const myDayRoute__topshadow__shadow = myDayRoute__entries.querySelector('.myDayRoute__topshadow__shadow');
const myDayRoute__bottomshadow__shadow = myDayRoute__entries.querySelector('.myDayRoute__bottomshadow__shadow');
const myDayRouteEntries__content = myDayRoute__entries.querySelector('.myDayRouteEntries__content');

const myDayRouteEntries__list = myDayRouteEntries__content.querySelector('.myDayRouteEntries__list');


//backdropModal-menu
const appTask_modal__taskDropdrownMenu = appWrapper.querySelector('.appTask-modal__taskDropdrownMenu');

const taskDropdrownMenu_list = appTask_modal__taskDropdrownMenu.querySelector('.taskDropdrownMenu_list');

const listDetailBtn = taskDropdrownMenu_list.querySelector('.taskDropdrownMenu_item--list');

const priorityDetailBtn = taskDropdrownMenu_list.querySelector('.taskDropdrownMenu_item--priority');

// backdropModal-list
const backdropModal_list = appWrapper.querySelector('.backdropModal_list');

const backdropModal_tab_list = backdropModal_list.querySelector('.backdropModal_tab-list');

// backdropModal-priority
const backdropModal_priority = appWrapper.querySelector('.backdropModal_priority');

const backdropModal_tab_priority_list = backdropModal_priority.querySelector('.backdropModal_tab-list');

// backdropModal-detail
const appTask_modal__taskDetail = appWrapper.querySelector('.appTask-modal__taskDetail');

const taskDetail__close_btn = appTask_modal__taskDetail.querySelector('.taskDetail__close-icon');

const taskDetail_modal = appTask_modal__taskDetail.querySelector('.taskDetail_modal');

const taskDetail_mylist_button = taskDetail_modal.querySelector('.project .taskDetail_button');

const taskDetail_priority_button = taskDetail_modal.querySelector('.priority .taskDetail_button');

const taskDetail_check = taskDetail_modal.querySelector('.checkedTask');

const taskDetail_check_button = taskDetail_check.querySelector('.iconButton');

const textArea = taskDetail_modal.querySelector('.taskDetail__taskContent .textArea');

const textAreaNotes = taskDetail_modal.querySelector('.taskDetail__editNotes .textAreaNotes');


function getParentElement(element, selector){
    while(element.parentElement){
        if(element.parentElement.matches(selector)){
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

export function entriesEvents(){
    const myDayRouteEntries__items = myDayRouteEntries__list.querySelectorAll('.myDayRouteEntries__item');

    scrollEntriesEvent();

    clickCheckboxEntryEvent();
    clickPinEntryEvent();
    clickRemoveEntryEvent();
    clickDetailEntryEvent();

    clickEntryEvent();
    changeTaskTitleTextareaHeightEvent(textArea, '--detailtask-textarea-height');
    clickDetailBtnEvents();
    changeTaskTitleTextareaHeightEvent(textAreaNotes, '--detailtask-textareaNotes-height');
    hideEntryEvents();

    /////// click on an entry event - detail backbrop modal ////////
    function clickEntryEvent(){
    
        myDayRouteEntries__items.forEach(entryItem => {
            entryItem.onclick = function(e){
                if(!e.target.closest('button')){
                    //get detail action...
                    const taskItem = getParentElement(e.target, '.myDayRouteEntries__item');
                    const projectIndex = +taskItem.dataset.projectIndex;
                    const taskIndex = +taskItem.dataset.taskIndex;
                    transform("inform detail modal", projectIndex, taskIndex);
                    transform("update current indexes", projectIndex, taskIndex);
                    getDetailCard();
                }
            };
        });
    }

    function getDetailCard(){
        if(!appTask_modal__taskDetail.classList.contains('appTask-modal__taskDetail--active')){
            appTask_modal__taskDetail.classList.add('appTask-modal__taskDetail--active');
        }
    }

    function changeTaskTitleTextareaHeightEvent(textArea, styleProperty){
        const intialTextareaHeight = rootElement.style.getPropertyValue(`${styleProperty}`);
        textArea.style.height = intialTextareaHeight;
        let scHeight = textArea.scrollHeight;
        textArea.style.height = `${scHeight}px`;

        textArea.onkeyup = function(e){
            textArea.style.height = intialTextareaHeight;
            scHeight = e.target.scrollHeight;
            textArea.style.height = `${scHeight}px`;
        };
    }

    function clickDetailBtnEvents(){
        taskDetail_mylist_button.onclick = openBackdropModalListEvent;
        taskDetail_priority_button.onclick = openBackdropModalPriorityEvent;
        
        taskDetail_check_button.onclick = function(){
            taskDetail_check_button.classList.toggle('iconButton--checked');
        };
    }

    function hideEntryEvents(){
        taskDetail__close_btn.onclick = hideEntry;
        appTask_modal__taskDetail.onclick = function(e){   
            if(!e.target.closest('.taskDetail_modal') && !e.target.closest('.taskDetail__close-icon')){
                hideEntry();
            }
            
        };
    }

    function hideEntry(){
        transform("save detail info");
        if(appTask_modal__taskDetail.classList.contains('appTask-modal__taskDetail--active')){
            appTask_modal__taskDetail.classList.remove('appTask-modal__taskDetail--active');
        }
    }

    //////////// click on checkbox of an entry ///////////////
    function clickCheckboxEntryEvent(){
        myDayRouteEntries__items.forEach(entryItem => {
            const checkboxEle = entryItem.querySelector('.myDayRouteEntries__itemcheckbox');
            checkboxEle.onclick = checkEntry;
        });

        function checkEntry(e){
            const taskItem = getParentElement(e.target, '.myDayRouteEntries__item');
            const projectIndex = +taskItem.dataset.projectIndex;
            const taskIndex = +taskItem.dataset.taskIndex;
            taskItem.classList.toggle('myDayRouteEntries__item--checked');
            setTimeout(()=>{
                transform("toggle task checkbox", projectIndex, taskIndex);
            },900);
        }
    }

    //////////// click on pin of an entry ///////////////
    function clickPinEntryEvent(){
        myDayRouteEntries__items.forEach(entryItem => {
            const pinEle = entryItem.querySelector('.modifyButton_pin');
            pinEle.onclick = pinEntry;
        });

        function pinEntry(e){
            const myDayRouteEntries__item_modify = e.target.closest('.myDayRouteEntries__item-modify');
            myDayRouteEntries__item_modify.classList.toggle('myDayRouteEntries__item-modify--pinactive');
            const taskItem = getParentElement(e.target, '.myDayRouteEntries__item');
            const projectIndex = +taskItem.dataset.projectIndex;
            const taskIndex = +taskItem.dataset.taskIndex;
            setTimeout(()=>{
                transform("toggle task pin", projectIndex, taskIndex);
            },900);
        }
    }

    //////////// click on remove button of an entry ///////////////
    function clickRemoveEntryEvent(){
        myDayRouteEntries__items.forEach(entryItem => {
            const removeEle = entryItem.querySelector('.modifyButton_remove');
            removeEle.onclick = removeEntry;
        });

        function removeEntry(e){
            const taskItem = getParentElement(e.target, '.myDayRouteEntries__item');
            const projectIndex = +taskItem.dataset.projectIndex;
            const taskIndex = +taskItem.dataset.taskIndex;
            taskItem.style.cssText = "opacity: 0; transform: translateY(-50%);";
            setTimeout(()=>{
                transform("remove task", projectIndex, taskIndex);
            }, 900);
        }
    }

    //////////// click on detail button of an entry ///////////////
    function clickDetailEntryEvent(){
        myDayRouteEntries__items.forEach(entryItem => {
            const modifyEle = entryItem.querySelector('.modifyButton_modify');
            modifyEle.onclick = openDropdownModalEvent;
        });

        // click detail button events
        // click mylist button
        listDetailBtn.onclick = openBackdropModalListEvent;

        // click priority button
        priorityDetailBtn.onclick = openBackdropModalPriorityEvent;
    }

    function openDropdownModalEvent(e){
        const isActive = taskDropdrownMenu_list.classList.contains('taskDropdrownMenu_list--active');
        if(isActive){
            taskDropdrownMenu_list.classList.remove('taskDropdrownMenu_list--active');
        }else{
            const rect = this.getBoundingClientRect();
            taskDropdrownMenu_list.style.cssText = `top: ${rect.bottom +  'px'}; left: ${rect.right - 116 + 'px'}`;
            taskDropdrownMenu_list.classList.add('taskDropdrownMenu_list--active');

            const taskItem = getParentElement(e.target, '.myDayRouteEntries__item');
            const projectIndex = +taskItem.dataset.projectIndex;
            const taskIndex = +taskItem.dataset.taskIndex;

            transform("update current indexes", projectIndex, taskIndex);

            hideDropdownModalEvent();
        }
    }

    function hideDropdownModalEvent(){
        appWrapper.addEventListener('click', (e)=>{
            if(!e.target.closest('.modifyButton_modify')){
                hideDropdownModal();
            }
        })
    }

    function hideDropdownModal() {
        const isActive = taskDropdrownMenu_list.classList.contains('taskDropdrownMenu_list--active');
        if(isActive){
            taskDropdrownMenu_list.classList.remove('taskDropdrownMenu_list--active');
        }
    }

    // mylist dropdown event definition
    function openBackdropModalListEvent(){
        if(!backdropModal_list.classList.contains('appTask-modal__backdropModal--active')){
            transform("update backdrop list modal");

            backdropModal_list.classList.add('appTask-modal__backdropModal--active');

            hideBackdropModalListEvent();
            clickBackdropModalTabItemEvent();
        }
    }

    function hideBackdropModalListEvent(){
        backdropModal_list.onclick = hideBackdropModalList;
    }

    function hideBackdropModalList(e){
        if(!e.target.closest('.backdrop-modal')){
            if(backdropModal_list.classList.contains('appTask-modal__backdropModal--active')){
                backdropModal_list.classList.remove('appTask-modal__backdropModal--active');
            }
        }
    }

    function clickBackdropModalTabItemEvent(){

        const backdropModal_tab_items = backdropModal_tab_list.querySelectorAll('.backdropModal_tab-item');
        
        const backdropModal_tab_item_btns = Array.from(backdropModal_tab_items).map(item => item.querySelector('button'));

        backdropModal_tab_item_btns.forEach(btn => {
            btn.onclick = changeCurrentProject;
        });

        function changeCurrentProject(){
            const selectedIndex = backdropModal_tab_item_btns.reduce((p, c) => {
                if(c.querySelector('svg')){
                    p = c.dataset.index;
                }
                return p;
            }, 0);
    
            const selectedBtn = backdropModal_tab_item_btns[selectedIndex];
            const newSelectedIndex = +this.dataset.index;

            if(newSelectedIndex !== selectedIndex){
                selectedBtn.querySelector('svg').remove();
                this.querySelector('.backdropModal_tab-item-icon').innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24">
            
                        <g fill="none" fill-rule="evenodd">
                            <path fill="currentColor" d="M9.629 15.437l6.226-7.213a.658.658 0 0 1 .912-.075c.275.224.312.62.083.886l-6.683 7.741a.654.654 0 0 1-.648.206.651.651 0 0 1-.444-.223l-2.923-3.386a.617.617 0 0 1 .08-.888.661.661 0 0 1 .915.076l2.482 2.876z"></path>
                        </g>
    
                    </svg>
                `;
            }

            const newTaskIndex = transform("update project of the task", newSelectedIndex);

            const isDetailModalOpened = appTask_modal__taskDetail.classList.contains('appTask-modal__taskDetail--active');
            if(!isDetailModalOpened){

                transform("update current indexes", undefined, undefined);
                transform("update current project to view mode");

            }else{

                transform("update project in detail modal", newSelectedIndex);
                transform("update current indexes", newSelectedIndex, newTaskIndex);

            }

            setTimeout(() => {
                backdropModal_list.classList.remove('appTask-modal__backdropModal--active');
            }, 300);
        }
    }

   
    // priority dropdown event definition
    function openBackdropModalPriorityEvent(){
        if(!backdropModal_priority.classList.contains('appTask-modal__backdropModal--active')){
            transform("update backdrop priority modal");

            backdropModal_priority.classList.add('appTask-modal__backdropModal--active');

            hideBackdropModalPriorityEvent();
            clickBackdropModalTabPriorityItemEvent();
        }
    }

    function hideBackdropModalPriorityEvent(){
        backdropModal_priority.addEventListener('click', hideBackdropModalPriority)
    }

    function hideBackdropModalPriority(e){
        if(!e.target.closest('.backdrop-modal')){
            if(backdropModal_priority.classList.contains('appTask-modal__backdropModal--active')){
                backdropModal_priority.classList.remove('appTask-modal__backdropModal--active');
            }
        }
    }

    function clickBackdropModalTabPriorityItemEvent(){
        const backdropModal_tab_priority_items = backdropModal_tab_priority_list.querySelectorAll('.backdropModal_tab-item');

        const backdropModal_tab_priority_item_btns = Array.from(backdropModal_tab_priority_items).map(item => item.querySelector('button'));

        backdropModal_tab_priority_item_btns.forEach(btn => {
            btn.onclick = changeCurrentPriority;
        });

        function changeCurrentPriority(){
            const selectedIndex = backdropModal_tab_priority_item_btns.reduce((p, c) => {
                if(c.querySelector('svg')){
                    p = c.dataset.index;
                }
                return p;
            }, 0);
    
            const selectedBtn = backdropModal_tab_priority_item_btns[selectedIndex];
            const newSelectedIndex = +this.dataset.index;
    
            if(this.dataset.index !== selectedIndex){
                selectedBtn.querySelector('svg').remove();
                this.querySelector('.backdropModal_tab-item-icon').innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24">
            
                        <g fill="none" fill-rule="evenodd">
                            <path fill="currentColor" d="M9.629 15.437l6.226-7.213a.658.658 0 0 1 .912-.075c.275.224.312.62.083.886l-6.683 7.741a.654.654 0 0 1-.648.206.651.651 0 0 1-.444-.223l-2.923-3.386a.617.617 0 0 1 .08-.888.661.661 0 0 1 .915.076l2.482 2.876z"></path>
                        </g>
    
                    </svg>
                `;
            }

            transform("update priority of the task", newSelectedIndex);

            const isDetailModalOpened = appTask_modal__taskDetail.classList.contains('appTask-modal__taskDetail--active');
            
            if(!isDetailModalOpened){
                transform("update current indexes", undefined, undefined);
            }else{
                transform("update priority in detail modal", newSelectedIndex);
            }

            setTimeout(() => {
                backdropModal_priority.classList.remove('appTask-modal__backdropModal--active');
            }, 300);
    
        }
    }

    function scrollEntriesEvent(){
        myDayRouteEntries__content.addEventListener('scroll', ()=>{
            hideDropdownModal();
            const scrollTop = myDayRouteEntries__content.scrollTop;
            const clientHeight = myDayRouteEntries__content.clientHeight;
            const scrollHeight = myDayRouteEntries__content.scrollHeight;
    
            const isTopShadowActive = myDayRoute__topshadow__shadow.classList.contains('myDayRoute__topshadow__shadow--active');
            const isBottomShadowActive = myDayRoute__bottomshadow__shadow.classList.contains('myDayRoute__bottomshadow__shadow--active');
    
            //check top shadow
            if(scrollTop === 0){
                if(isTopShadowActive){
                    myDayRoute__topshadow__shadow.classList.remove('myDayRoute__topshadow__shadow--active');
                }
            }else{
                if(!isTopShadowActive){
                    myDayRoute__topshadow__shadow.classList.add('myDayRoute__topshadow__shadow--active');
                }
            }
    
            //check bottom shadow
            if(scrollTop + clientHeight === scrollHeight){
                if(isBottomShadowActive){
                    myDayRoute__bottomshadow__shadow.classList.remove('myDayRoute__bottomshadow__shadow--active');
                }
            }else{
                if(!isBottomShadowActive){
                    myDayRoute__bottomshadow__shadow.classList.add('myDayRoute__bottomshadow__shadow--active');
                }
            }
        });
    }
    
}








