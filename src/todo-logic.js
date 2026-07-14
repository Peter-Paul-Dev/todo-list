const allTodos = [];
const allProjects = [allTodos];

function createTodo(title, description, dueDate, priority, doneStatus, notes) {
   const todo = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      doneStatus: doneStatus,
      notes: notes,
   };

   allTodos.push(todo);

   todo.changePriority = function(newPrio) {
      todo.priority = newPrio;
   }

   todo.markComplete = function(newStatus) {
      todo.doneStatus = newStatus;
   }

   return todo;
}

function createNewProject(newProj) {
   newProj = [];

   newProj.removeTodo = function () {
      const matchedTodo = newProj.findIndex(obj => obj.title == newProj.map(item => item.title));

      newProj.splice(matchedTodo, 1);
   }  

   newProj.addToProject = function(obj) {
      newProj.push(obj);
   }

   return newProj;
}   

export { allTodos, allProjects, createTodo, createNewProject };