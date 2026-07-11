import "./style.css";
import { Todo } from "./todo-logic.js";

console.log("Hello World")

const finishProject = new Todo("Finish Project", "Finish the project I'm working on", "Whenever", "Not urgent", "Not done", "None");

console.log(finishProject);

finishProject.changePriority("Urgent");

console.log(finishProject)

finishProject.markComplete("Done");

console.log(finishProject);