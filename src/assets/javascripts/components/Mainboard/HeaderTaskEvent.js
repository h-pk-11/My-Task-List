import { format } from "date-fns";

const appWrapper = document.querySelector('.appWrapper');
const myDayRoute__title = appWrapper.querySelector('.myDayRoute__title');
const weekday = myDayRoute__title.querySelector('.myDayRouteTitle__calendar-weekday');
const day = myDayRoute__title.querySelector('.myDayRouteTitle__calendar-day');
const month = myDayRoute__title.querySelector('.myDayRouteTitle__calendar-month');
const myDayRouteTitle__greeting = myDayRoute__title.querySelector('.myDayRouteTitle__greeting');
const myDayRouteTitle_subtitle = myDayRoute__title.querySelector('.myDayRouteTitle_subtitle'); 

let time = {};

export function setCurentTime(){
    let today = new Date();
    time.year = format(today, 'y');
    time.month = format(today, 'MMMM');
    time.weekday = format(today, 'E');
    time.day = format(today, 'd');
    time.hour = format(today, 'H');
    time.minute = format(today, 'm');
    time.second = format(today, 's');
    weekday.textContent = time.weekday;
    day.textContent = time.day;
    month.textContent = time.month;

    if(+time.hour < 5 || +time.hour >= 22){
        myDayRouteTitle__greeting.textContent = 'Good night';
        myDayRouteTitle_subtitle.textContent = 'Throw off your worries';
    }else if(+time.hour >=5 && +time.hour < 12){
        myDayRouteTitle__greeting.textContent = 'Good morning';
        myDayRouteTitle_subtitle.textContent = 'Remove doubts with action';
    }else if(+time.hour >= 12 && +time.hour < 18){
        myDayRouteTitle__greeting.textContent = 'Good afternoon';
        myDayRouteTitle_subtitle.textContent = 'Enjoy your day';
    }else {
        myDayRouteTitle__greeting.textContent = 'Good evening';
        myDayRouteTitle_subtitle.textContent = 'Your life is beyond sunset';
    }
}

export function formatDate(date, form){
    return format(date, form);
}