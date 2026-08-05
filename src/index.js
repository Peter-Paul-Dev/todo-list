import "./style.css";
import { allTodos, createTodo, findMatch, createNewProject, allProjects } from "./todo-logic.js";
import { displaySection, displayTodo, displayTodoInProjects, createProjectList } from "./manipulate-dom.js";

const myTask = createTodo("Finish Project", "Finish the project I'm working on", "Whenever", "Not urgent", "None");

const newArr = createNewProject("My New Project List");

const newTask = createTodo("Test stuff", "Finish testing stuff", "When I feel like it", "Not urgent", "None");
const newerTask = createTodo("Buy food", "Buy food for tomorrow", "Tonight", "Urgent", "Remeber to buy mayo");

newArr.addToProject("Test stuff");
newArr.addToProject("Buy food");

createTodo("Feed the cat", "Feed my cats their dinner", "7:00 PM", "Urgent", "None");

createNewProject("New stuff");

findMatch("New stuff", allProjects).addToProject("Feed the cat");

createProjectList(allProjects);

displayTodoInProjects("All Tasks", allProjects);

console.log(allProjects);
console.log(allTodos);
console.log(newArr);