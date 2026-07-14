const allTodos = [];
const allProjects = [allTodos];

allTodos.removeTodo = function(obj) {
      const matchedTodo = allTodos.findIndex(obj => obj.title == allTodos.map(item => item.title));

      allTodos.splice(matchedTodo, 1);
   }

allProjects.removeProject = function (arr) {
      const matchedProj = allProjects.findIndex(arr => arr.title == allProjects.map(item => item.title));

      allProjects.splice(matchedProj, 1);
}  

function createTodo(title, description, dueDate, priority, doneStatus, notes) {
   const todo = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      doneStatus: doneStatus,
      notes: notes,
   };

   todo.changePriority = function(newPrio) {
      todo.priority = newPrio;
   }

   todo.markComplete = function(newStatus) {
      todo.doneStatus = newStatus;
   }

   allTodos.push(todo);
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

   allProjects.push(newProj);
   return newProj;
}   

export { allTodos, allProjects, createTodo, createNewProject };