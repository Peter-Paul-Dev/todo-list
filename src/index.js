import "./style.css";
import { allTodos, createTodo, findMatch, createNewProject, allProjects } from "./todo-logic.js";
import { displaySection, displayTodo, createTaskList, createProjectList } from "./manipulate-dom.js";

const myTask = createTodo("Finish Project", "Finish the project I'm working on", "Whenever", "Not urgent", "Not done", "None");

myTask.changePriority("Urgent");
myTask.markComplete("Done");

const newArr = createNewProject("My New Project List");

const newTask = createTodo("Test stuff", "Finish testing stuff", "When I feel like it", "Not urgent", "Not done", "None");
const newerTask = createTodo("Buy food", "Buy food for tomorrow", "Tonight", "Urgent", "Not done", "Remeber to buy mayo");

newArr.addToProject("Test stuff");
newArr.addToProject("Buy food");

createTodo("Feed the cat", "Feed my cats their dinner", "7:00 PM", "Urgent", "Not done", "None");

createNewProject("New stuff");

findMatch("New stuff", allProjects).addToProject("Feed the cat");

createTaskList(allTodos);
createProjectList(allProjects);

displayTodo("Feed the cat", allTodos);

console.log(allProjects);
console.log(allTodos);
console.log(newArr);