const STORAGE_KEY = "MYTODOS";

const myDefaultTodos = [
  {
    id: "000aaa",
    projectName: "Personal",
    tasks: [
      {
        id: "000abc",
        projectName: "Personal",
        taskTitle: "Water plants",
        dueDate: "2023-11-20",
        priority: "Medium",
        notes: "Dont forget to water plants behind the house",
        isDone: false,
        isPin: false,
      },

      {
        id: "000def",
        projectName: "Personal",
        taskTitle: "Go to the dental clinic",
        dueDate: "2023-12-15",
        priority: "High",
        notes: "Prepare 400$ to pay for the medicine",
        isDone: true,
        isPin: true,
      },
    ],
  },

  {
    id: "000bbb",
    projectName: "Work",
    tasks: [
      {
        id: "000ghk",
        projectName: "Work",
        taskTitle: "Check Huong's drawings",
        dueDate: "2023-12-19",
        priority: "Low",
        notes: "respond to her as soon as possible",
        isDone: true,
        isPin: false,
      },

      {
        id: "000lmn",
        projectName: "Work",
        taskTitle: "Join team meeting",
        dueDate: "2023-12-20",
        priority: "High",
        notes: "",
        isDone: false,
        isPin: true,
      },
    ],
  },

  {
    id: "000ccc",
    projectName: "Hobbies",
    tasks: [
      {
        id: "000opt",
        projectName: "Hobbies",
        taskTitle: "Watch KUWTK with my BFF",
        dueDate: "2023-12-22",
        priority: "Medium",
        notes: "8pm, prepare snacks",
        isDone: false,
        isPin: false,
      },

      {
        id: "000ost",
        projectName: "Hobbies",
        taskTitle: "Cycling",
        dueDate: "2023-12-16",
        priority: "Low",
        notes: "7.30 am. central park",
        isDone: false,
        isPin: false,
      },
    ],
  },

  {
    id: "020ksl",
    projectName: "Family",
    tasks: [
      {
        id: "054opt",
        projectName: "Family",
        taskTitle: "House cleansing",
        dueDate: "2023-12-17",
        priority: "Medium",
        notes: "8.30 am",
        isDone: false,
        isPin: false,
      },

      {
        id: "096ost",
        projectName: "Family",
        taskTitle: "Cycling",
        dueDate: "2023-12-16",
        priority: "Low",
        notes: "7.30 am. central park",
        isDone: false,
        isPin: false,
      },
    ],
  },

  {
    id: "020hhh",
    projectName: "Games",
    tasks: [
      {
        id: "123opt",
        projectName: "Games",
        taskTitle: "Fifa",
        dueDate: "2023-12-15",
        priority: "High",
        notes: "9pm",
        isDone: false,
        isPin: true,
      },

      {
        id: "100oat",
        projectName: "Games",
        taskTitle: "Call of Duty",
        dueDate: "2023-12-14",
        priority: "Medium",
        notes: "at Le'House",
        isDone: false,
        isPin: false,
      },
    ],
  },

  {
    id: "026hfh",
    projectName: "Camping",
    tasks: [
      {
        id: "113tst",
        projectName: "Camping",
        taskTitle: "Buy a raincoat",
        dueDate: "2023-12-23",
        priority: "High",
        notes: "",
        isDone: false,
        isPin: false,
      },

      {
        id: "1090tht",
        projectName: "Camping",
        taskTitle: "Bring lunch boxes",
        dueDate: "2023-12-14",
        priority: "High",
        notes: "",
        isDone: false,
        isPin: false,
      },
    ],
  },
];

export default {
  get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || myDefaultTodos;
  },

  set(myTodos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(myTodos));
  },
};
