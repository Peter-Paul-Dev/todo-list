function saveToLocalStorage (target) {
   localStorage.setItem(target.key, JSON.stringify(target));
}

function removeFromLocalStorage(target) {
   localStorage.removeItem(target.key);
}

function getFromLocalStorage(target) {
   const jsonString = localStorage.getItem(target.key);

   if (jsonString) {
      const parsedString = JSON.parse(jsonString);

      return parsedString;
   } 
   
   else {
      console.warn("No object found with that key")
   }
}

function findMatch(target, arr) {
    if (!arr || arr.list.length === 0) {
       console.warn(`findMatch failed: Array for "${target}" is empty or undefined.`);
   }
   
   const match = arr.list.find((item) => item.title || item.key == target);

   if (!match) {
       console.warn(`findMatch failed: No object found with title "${target}".`);
   }

   return match;
}

//also find a way to reattach the appropriate methods to all objects retrieved from localStorage

const allTodos = (function () {
   const hardCodedAllTodos = {
      key: "All Tasks",
      list: [],
   }

   const insideLocalStorageTodos = getFromLocalStorage(hardCodedAllTodos);

   if (insideLocalStorageTodos == hardCodedAllTodos) {
      return hardCodedAllTodos;
   } 
   
   else {
      return insideLocalStorageTodos;
   }
})();
saveToLocalStorage(allTodos);

//to: myself,
//consider making the restored arrays the working arrays
//do this by making the arrays saved in localStorage "blueprints" where you save the data needed to make functioning objects with the factory function
//this way you are essentially (re)building objects using instructions found in localStorage 
//as opposed to trying finding a way to resurrect them to attach them to their methods
//essentially, this is like building a house with a set of blueprints that gets modified whenever something in the house changes

//you most likely need to give the working arrays a title property
//it's probably best to just use the same title properties as the blueprints but that will definitely cause problems with findMatch() so you'll need to fix this
//your best option is probably to rename the "title" property on the blueprint arrays to something else
//I think "key" is a good name since that's what's used in localStorage
//then use that property strictly for methods involving localStorage
//keep "title" for the working arrays
//this is the probably the best and quickest fix

//the working arrays themselves should NOT be saved to localStorage
//instead, whenever you "save" them, you're really just modifying the contents of the blueprints
//so that when the app is closed or refreshed, the changes made to the working arrays will reflect on the blueprints

//saving the todos and projects individually to localStorage may also be unnecessary
//you're essentially using allTodos and allProjects to reconstruct everything
//everything besides that that's saved may not be doing anything but take up unnecessary space but I'm still unsure if that's truly the case
//still, try to find a way to make it so that allTodos and allProjects is all you need to rebuild everything 

//while you're at it, try to see if you can refactor everything to use immutable methods instead of mutable ones
//this will decrease bugs and unexpected behavior

//this will no doubt take a lot of time and patience but it's possible
//good luck. 

const workingTodoList = {
   title: "All Tasks",
   list: allTodos.list.map(
   item => createTodo(item.title, item.description, item.dueDate, item.priority, item.notes, item.isComplete)
   ),
}
console.log(workingTodoList);

const allProjects = (function() {
   const hardCodedAllProjects = {
   key: "All Projects",
   list: [allTodos],
   }

   const insideLocalStorageProjs = getFromLocalStorage(hardCodedAllProjects);

   if (insideLocalStorageProjs == hardCodedAllProjects) {
   return hardCodedAllProjects;
   } 

   else {
   return insideLocalStorageProjs;
   } 
})();
saveToLocalStorage(allProjects);

const workingProjectList = {
   title: "All Projects",
   list: [workingTodoList, ...allProjects.list.slice(1).map((item) => createNewProject(item))],
}
console.log(workingProjectList);

allTodos.deleteTodo = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, allTodos);
      const todoIndex = allTodos.list.findIndex((item) => item.title == targetTodo.title);

      targetTodo.removeFromParents();
      targetTodo.parentProjects = [];
      allTodos.list.splice(todoIndex, 1);
      removeFromLocalStorage(targetTodo);
}

allProjects.deleteProject = function(targetTitle) {
      const targetProject = findMatch(targetTitle, allProjects);
      const projIndex = allProjects.list.findIndex((arr) => arr.title == targetProject.title);

      if (targetProject.title == "All Tasks") {
         console.warn("You can't delete that");
      } 
      
      else {
         allProjects.list.splice(projIndex, 1);
         saveToLocalStorage(allProjects);
         removeFromLocalStorage(targetProject);
      }
}  

function createTodo(title, description, dueDate, priority, notes, isComplete) {
   const todo = {
      title: title,
      dueDate: dueDate,
      description: description,
      priority: priority,
      notes: notes,
      parentProjects: ["allTodos"],
      isComplete: isComplete,
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
   
   return todo;
}

function createNewProject(newProj) {
   if (newProj == "All Tasks") {
      return;
   }

   if (allProjects.list.some(elem => elem.title == newProj)) {
      return;
   } 

   const proj = {
      title: newProj,
      list: [],
   }

   proj.removeTodoFromProject = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, proj);
      const todoIndex = proj.list.findIndex((item) => item == targetTodo);

      const todoParentProjs = targetTodo.parentProjects;
      const parentProjIndex = todoParentProjs.findIndex((item) => item == proj.title);   

      proj.list.splice(todoIndex, 1);
      todoParentProjs.splice(parentProjIndex, 1);
      saveToLocalStorage(allProjects);
      removeFromLocalStorage(proj);
   }  

   proj.addToProject = function(targetTitle) {
      const targetTodo = findMatch(targetTitle, allTodos);
      proj.list.push(targetTodo);
      targetTodo.parentProjects.push(proj.title);
   }

   return proj;
}   

export { allTodos, allProjects, saveToLocalStorage, removeFromLocalStorage, getFromLocalStorage, findMatch, createTodo, createNewProject };