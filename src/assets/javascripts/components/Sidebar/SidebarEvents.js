import { addNewProject, editProjectName } from './NewprojectEvents.js';
import { transform } from '../../actions.js';

const rootElement = document.documentElement;
const appSideBar = document.querySelector('.appSideBar');
const appSideBarTransition = appSideBar.querySelector('.appSideBar-transition');

export let isProjectNameEditMode = false;

export function addSidebarEvents(){
    scrollNavbarEvent();
    toggleMyList();
    pinNavbarEvent();
    activeTabsEvent();

    function scrollNavbarEvent(){
        const appSideBarWrapper = appSideBarTransition.querySelector('.appSideBar-wrapper');
    
        const appSideBarScrollShadow = appSideBarTransition.querySelector('.appSideBar-scrollShadow');
    
        const appSideBarScrollShadow_shadow = appSideBarScrollShadow.querySelector('.appSideBar-scrollShadow_shadow');
    
        appSideBarWrapper.addEventListener('scroll', function(){
    
            const scrollTop = appSideBarWrapper.scrollTop;
            
            const isContained = appSideBarScrollShadow_shadow.classList.contains('appSideBar-scrollShadow_shadow--active');
    
            if(scrollTop === 0){ 
    
                if(isContained){
                    appSideBarScrollShadow_shadow.classList.remove('appSideBar-scrollShadow_shadow--active');
                }
    
            }else{
    
                if(!isContained){
                    appSideBarScrollShadow_shadow.classList.add('appSideBar-scrollShadow_shadow--active');
                }
                
            }
    
        });
    }

    function toggleMyList(){
        const projectHeading = appSideBar.querySelector('.appSideBar__projectHeading');
        const addProjectBtn = projectHeading.querySelector('.appSideBar__item-button');
        const myListBadge = projectHeading.querySelector('.appSideBar__item_badge');
        const appSideBarAnimation = appSideBar.querySelector('.appSideBar__animation');
        const projectList = appSideBarAnimation.querySelector('.appSideBar__list');
        
        projectHeading.onclick = function(e){
            const clickedItem = e.target.closest('.appSideBar__item-button');
    
            if(!clickedItem){
                
                const numberOfProject = Array.from(projectList.querySelectorAll('.appSideBar__item')).length;
                const heightOfProjectList = numberOfProject * 40 + 'px';
    
                const isClosed = projectHeading.classList.contains('appSideBar__projectHeading--closed');
                 
                if(isClosed){
                    projectHeading.classList.remove('appSideBar__projectHeading--closed');
                    projectList.style.height = `${heightOfProjectList}`;
    
                    addProjectBtn.classList.add('appSideBar__item-button--active');
                    myListBadge.classList.remove('appSideBar__item_badge--avtive');
                }else{
                    projectHeading.classList.add('appSideBar__projectHeading--closed');
                    projectList.style.height = '0px';
    
                    addProjectBtn.classList.remove('appSideBar__item-button--active');
                    myListBadge.classList.add('appSideBar__item_badge--avtive');
                }
    
            }else{
                
                isProjectNameEditMode = false;
                addNewProject();
            }
    
        };
        
    }

    function pinNavbarEvent(){
        const headerIconButton = appSideBarTransition.querySelector('.headerIconButton');

        headerIconButton.onclick = function(e){
            if(!headerIconButton.matches('.headerIconButton--active')){
                headerIconButton.classList.add('headerIconButton--active');
                appSideBar.removeEventListener('mouseout', slideOutNavbar);
                appSideBar.removeEventListener('mouseover', slideInNavbar);

            }else{
                headerIconButton.classList.remove('headerIconButton--active');
                appSideBar.addEventListener('mouseout', slideOutNavbar);
                appSideBar.addEventListener('mouseover', slideInNavbar);
            }
        };

        function slideInNavbar(){
            rootElement.style.setProperty('--app-sizebar-translateX', '0px');
            appSideBar.style.cssText ="opacity: 1; transform: translateX(0px);";
        }

        function slideOutNavbar(){
            rootElement.style.setProperty('--app-sizebar-translateX', '-210px');
            appSideBar.style.cssText ="opacity: 0; transform: translateX(-210px);";
        }
    }

}

export function activeTabsEvent(){
    const appSideBar__taskList = appSideBar.querySelector('.appSideBar__taskList');
    const appSideBar__animation = appSideBar.querySelector('.appSideBar__animation');
    const appSideBar__taskItems = appSideBar__taskList.querySelectorAll('.appSideBar__taskItem');
    const appSideBar__items = appSideBar__animation.querySelectorAll('.appSideBar__item');
    
    for(let i = 0; i < 3; i++){
        appSideBar__taskItems[i].onclick = function(){
            setTimeout(()=>{
                transform("change view mode", appSideBar__taskItems[i].dataset.viewMode);
                
                appSideBar__taskItems.forEach(item => {
                    if(item.classList.contains('appSideBar__taskItem--selected')){
                        item.classList.remove('appSideBar__taskItem--selected');
                    }
                });

                appSideBar__items.forEach(item => {
                    if(item.classList.contains('appSideBar__item--selected')){
                        item.classList.remove('appSideBar__item--selected');
                    }
                });

                appSideBar__taskItems[i].classList.add('appSideBar__taskItem--selected');
            },200);
        };
    }

    appSideBar__items.forEach(item => {
        item.onclick = function(){
            isProjectNameEditMode = false;
            setTimeout(()=>{
                if(!isProjectNameEditMode){
                    appSideBar__taskItems.forEach(item => {
                        if(item.classList.contains('appSideBar__taskItem--selected')){
                            item.classList.remove('appSideBar__taskItem--selected');
                        }
                    });
                    
                    transform("change view mode", item.dataset.viewMode, item.dataset.projectId);
        
                    appSideBar__items.forEach(item => {
                        if(item.classList.contains('appSideBar__item--selected')){
                            item.classList.remove('appSideBar__item--selected');
                        }
                    });
        
                    item.classList.add('appSideBar__item--selected');
                }else{

                }
            },200);

        };
    });

    appSideBar__items.forEach(item => {
        item.ondblclick = function(e){
            isProjectNameEditMode = true;
            editProjectName(e);
        }
    });

    appSideBar__items.forEach(item => {
        const removeBtn = item.querySelector('button');
        if(removeBtn){
            removeBtn.onclick = function(e){
                e.stopPropagation();

                let numberOfProjects = transform("delete project", item.dataset.projectId);

                if(numberOfProjects === 0){
                    let isViewModeOn = false;
                    appSideBar__taskItems.forEach(item => {
                        if(item.classList.contains('appSideBar__taskItem--selected')){
                            isViewModeOn = true;
                        }
                    });

                    if(!isViewModeOn){
                        appSideBar__taskItems[2].classList.add('appSideBar__taskItem--selected');
                    }
                }
            };
        }
    });

}