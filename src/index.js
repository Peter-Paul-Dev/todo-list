import "./style.css";
import { defaultProjects, createTodo } from "./todo-logic.js";


const myTask = createTodo("Finish Project", "Finish the project I'm working on", "Whenever", "Not urgent", "Not done", "None");

myTask.changePriority("Urgent");
myTask.markComplete("Done");

console.log(defaultProjects);

