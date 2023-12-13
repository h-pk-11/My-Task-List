import LocalStorage from "./LocalStorage/LocalStorage.js";

export const myData = {
    projects: LocalStorage.get(),

    currentProjectIndex: undefined,
    currentTaskIndex: undefined,
    navBarSelected: ['All my tasks', ''],
    
    filters: {
        "All my tasks": (task) => true,
        "My day": (task) => {
            let today = new Date();
            const duaDate = new Date(task.dueDate);
            return today.getFullYear() === duaDate.getFullYear() && today.getMonth() === duaDate.getMonth() && today.getDate() === duaDate.getDate();
        },
        "Next 7 days": (task) => {
            const today = new Date();
            const nextSevenDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 0, 0, 0);
            const duaDate = new Date(task.dueDate);
            return duaDate.getTime() < nextSevenDay.getTime() && duaDate.getTime() >= today.getTime();
        },
        'isDone': task => !task.isDone,
        'project': task => task.projectId === myData.navBarSelected[1],
    },
    sorts: {
        isPin: (taskA, taskB) => {
            if(taskA.isPin === true && taskB.isPin === false) return -1;
            if(taskA.isPin === taskB.isPin) return 0;
            if(taskA.isPin === false && taskB.isPin === true) return 1;
        },
        date: (taskA, taskB) => {
            const duaDateA = new Date(taskA.duaDate);
            const duaDateB = new Date(taskB.duaDate);
            return duaDateA.getTime() - duaDateB.getTime();
        },
        isDone: (taskA, taskB) => {
            if(taskA.isDone === true && taskB.isDone === false) return 1;
            if(taskA.isDone === taskB.isDone) return 0;
            if(taskA.isDone === false && taskB.isDone === true) return -1;
        },
    },

};

export function html([first, ...string], ...values){
    return values.reduce(
        (acc, cur) => acc.concat(cur, string.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0)
    .join('');
}

