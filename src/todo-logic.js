function saveToLocalStorage (target) {
   localStorage.setItem(target.title, JSON.stringify(target));
}

function removeFromLocalStorage(target) {
   localStorage.removeItem(target.title);
}

function getFromLocalStorage(target) {
   localStorage.getItem(target.title);
}

function findMatch(target, arr) {
    if (!arr || arr.list.length === 0) {
       console.warn(`findMatch failed: Array for "${target}" is empty or undefined.`);
   }
   
   const match = arr.list.find((item) => item.title == target);

   if (!match) {
       console.warn(`findMatch failed: No object found with title "${target}".`);
   }

   return match;
}

const allTodos = {
   list: [],
   title: "All Tasks",
}
saveToLocalStorage(allTodos);

const allProjects = {
   list: [allTodos],
   title: "All Projects",
}
saveToLocalStorage(allProjects);

allTodos.deleteTodo = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, allTodos);
      const todoIndex = allTodos.list.findIndex((item) => item.title == targetTodo.title);
      console.log(todoIndex);

      targetTodo.removeFromParents();
      targetTodo.parentProjects = [];
      allTodos.list.splice(todoIndex, 1);
      removeFromLocalStorage(targetTodo);
}

allProjects.removeProject = function(targetTitle) {
      const targetProject = findMatch(targetTitle, allProjects);
      const projIndex = allProjects.findIndex((arr) => arr.title == targetProject.title);
      console.log(projIndex);

      if (targetProject.title == "All Tasks") {
         console.warn("You can't delete that");
      } 
      
      else {
         allProjects.splice(projIndex, 1);
         removeFromLocalStorage(targetProject);
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

   todo.changeCompleteStatus = function(newStatus) {
      return todo.isComplete = newStatus;
   }

   todo.removeFromParents = function() {
      const projectsBesidesAllTodos = allProjects.list.slice(1);

      projectsBesidesAllTodos.forEach(arr => {
         const targetParentProj = arr.title;
         const todoParentProjs = todo.parentProjects;
         
         if (todoParentProjs.includes(targetParentProj) == true) {
           return arr.removeTodoFromProject(todo.title);
         }
      });
   }

   allTodos.list.push(todo);
   saveToLocalStorage(todo);
   saveToLocalStorage(allTodos);
   return todo;
}

function createNewProject(newProj) {
   if (allProjects.list.some(elem => elem.title == newProj)) {
      return;
   } 

   const proj = {
      list: [],
      title: newProj,
   }

   proj.removeTodoFromProject = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, proj);
      const todoIndex = proj.list.findIndex((item) => item == targetTodo);

      const todoParentProjs = targetTodo.parentProjects;
      const parentProjIndex = todoParentProjs.findIndex((item) => item == proj.title);   

      proj.list.splice(todoIndex, 1);
      todoParentProjs.splice(parentProjIndex, 1);
   }  

   proj.addToProject = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, allTodos);
      proj.list.push(targetTodo);
      targetTodo.parentProjects.push(proj.title);
   }

   allProjects.list.push(proj);
   saveToLocalStorage(proj);
   saveToLocalStorage(allProjects);
   return proj;
}   

export { allTodos, allProjects, saveToLocalStorage, removeFromLocalStorage, getFromLocalStorage, findMatch, createTodo, createNewProject };