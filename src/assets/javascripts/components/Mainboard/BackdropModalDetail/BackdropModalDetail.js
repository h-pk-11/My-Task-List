const appWrapper = document.querySelector(".appWrapper");
const appTask_modal__taskDetail = appWrapper.querySelector(
  ".appTask-modal__taskDetail",
);
const projectNameEle = appTask_modal__taskDetail.querySelector(
  ".taskDetail__link-project",
);
const titleInputEle = appTask_modal__taskDetail.querySelector(".textArea");
const duadateEle = appTask_modal__taskDetail.querySelector("#task_duedate");
const projectBtn = appTask_modal__taskDetail.querySelector(
  ".project .iconButton.taskDetail_button",
);
const project_nameEle = projectBtn.querySelector(".project_name");
const priorityBtn = appTask_modal__taskDetail.querySelector(
  ".priority .iconButton.taskDetail_button",
);
const priority_levelEle = priorityBtn.querySelector(".priority_level");
const checkTaskBtn = appTask_modal__taskDetail.querySelector(
  ".checkedTask .iconButton",
);
const notesInputEle = appTask_modal__taskDetail.querySelector(".textAreaNotes");

export function informDetailModal(
  projectName,
  taskTitle,
  duadate,
  isDone,
  priority,
  notes,
) {
  projectNameEle.textContent = projectName;
  titleInputEle.value = taskTitle;
  duadateEle.value = duadate;
  project_nameEle.textContent = projectName;
  if (checkTaskBtn.classList.contains("iconButton--checked")) {
    checkTaskBtn.classList.remove("iconButton--checked");
  }
  if (isDone) {
    checkTaskBtn.classList.add("iconButton--checked");
  }
  priority_levelEle.textContent = priority;
  notesInputEle.value = notes;
}

export function getDetailModalInfo() {
  const projectName = projectNameEle.textContent.trim();
  const taskTitle = titleInputEle.value.trim();
  const dueDate = duadateEle.value;
  const priority = priority_levelEle.textContent.trim();
  const notes = notesInputEle.value.trim();
  const isDone = checkTaskBtn.classList.contains("iconButton--checked");
  return {
    projectName,
    taskTitle,
    dueDate,
    priority,
    notes,
    isDone,
  };
}

export function updateProjectInDetailModal(projectName) {
  projectNameEle.textContent = projectName;
  project_nameEle.textContent = projectName;
}

export function updatePriorityInDetailModal(priority) {
  priority_levelEle.textContent = priority;
}
