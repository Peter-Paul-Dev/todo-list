const allTodos = [];
allTodos.title = "All Tasks";

const allProjects = [allTodos];

function findMatch(target, arr) {
    if (!arr || arr.length === 0) {
       console.warn(`findMatch failed: Array for "${target}" is empty or undefined.`);
   }
   
   const match = arr.find((item) => item.title == target);

   if (!match) {
       console.warn(`findMatch failed: No object found with title "${target}".`);
   }

   return match;
}

allTodos.deleteTodo = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, allTodos);
      const todoIndex = allTodos.findIndex((item) => item.title == targetTodo.title);

      targetTodo.removeFromParents();
      targetTodo.parentProjects = [];
      allTodos.splice(todoIndex, 1);
}

allProjects.removeProject = function(targetTitle) {
      const targetProject = findMatch(targetTitle, allProjects);
      const projIndex = allProjects.findIndex((arr) => arr.title == targetProject);

      if (targetProject == "All Tasks") {
         console.warn("You can't delete that")
      } 
      
      else {
         allProjects.splice(projIndex, 1);
      }
}  

function createTodo(title, description, dueDate, priority, notes) {
   const todo = {
      title: title,
      dueDate: dueDate,
      description: description,
      priority: priority,
      notes: notes,
      parentProjects: ["allTodos"],
      isComplete: false,
   };

   todo.changePriority = function() {
      if (todo.priority == "Not urgent") {
         return todo.priority = "Urgent"
      } 
      
      else if (todo.priority == "Urgent") {
         return todo.priority = "Not urgent"
      }
   }

   todo.markComplete = function(newStatus) {
      return todo.isComplete = newStatus;
   }

   todo.removeFromParents = function() {
      const projectsBesidesAllTodos = allProjects.slice(1);

      projectsBesidesAllTodos.forEach(arr => {
         const targetParentProj = arr.title;
         const todoParentProjs = todo.parentProjects;
         
         if (todoParentProjs.includes(targetParentProj) == true) {
           return arr.removeTodoFromProject(todo.title);
         }
      });
   }

   allTodos.push(todo);
   return todo;
}

function createNewProject(newProj) {
   const proj = [];
   proj.title = newProj;

   proj.removeTodoFromProject = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, proj);
      const todoIndex = proj.findIndex((item) => item == targetTodo);

      const todoParentProjs = targetTodo.parentProjects;
      const parentProjIndex = todoParentProjs.findIndex((item) => item == proj.title);   

      proj.splice(todoIndex, 1);
      todoParentProjs.splice(parentProjIndex, 1);
   }  

   proj.addToProject = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, allTodos);
      proj.push(targetTodo);
      targetTodo.parentProjects.push(proj.title);
   }

   allProjects.push(proj);
   return proj;
}   

export { allTodos, allProjects, findMatch, createTodo, createNewProject };