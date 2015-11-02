'use strict';

(function(){
	
angular
	.module('TodoApp', [])


	/* services */
	.factory('todoData', function(){

		return { 
				getData: function(){

					var defaul_todos = [{name: "Learn AngularJS",added: Date.now(),done: false, editable: false, eitable:false},{	name: "Learn NodeJs",added: Date.now(),	done: false, eitable:false	},{name: "Learn Web Services",added: Date.now(),done: false, editable:false}];

					// saved to a temporary cache variable
					var temp_todos = window.localStorage.getItem('todos');

					// set todos variable with the cache variable
					var todos = (temp_todos !== null) ? JSON.parse(temp_todos) : defaul_todos;
					
					// saved to a local storage
					window.localStorage.setItem('todos', JSON.stringify(todos));

					// return the data
					return todos;
				},
				add: function(newTodo, todos){
					if((event.keyCode == 13 || event.which == 13) && newTodo.length){
						todos.push({name: newTodo,added: Date.now(), done: false, editable:false	});
						newTodo = '';
						window.localStorage.setItem('todos', JSON.stringify(todos));
					}

				},
				update: function($index, todos){
					if((event.keyCode == 13 || event.which == 13) && todos[$index].name.length > 0){
						todos[$index].editable = !todos[$index].editable;
						window.localStorage.setItem('todos', JSON.stringify(todos));
					}
				},
				remove: function(index, todos){
					todos.splice(index,1);
					window.localStorage.setItem('todos', JSON.stringify(todos));
				}
		}

	})

	/* controller */
	.controller('TodoController', ['todoData', function(todoData){
		this.header_title = "Jhan Mateo's ToDo Application";
		this.short_description = "This is a simple To-Do list application using AngularJS.";
	
		// set todos variable with the cache variable
		this.todos = todoData.getData();
		
		
		// add new todo list		
		this.addTodo = function(){
			todoData.add(this.newTodo, this.todos);
		};
		
		// delete todo
		this.deleteTodo = function($index){
			todoData.remove($index, this.todos);
		}
		
		this.updateTodo = function($index){
			todoData.update($index, this.todos);
		}
		
		this.editMode = function($index){
			this.todos[$index].editable = !this.todos[$index].editable;
		}
		
		
		this.hasTodos = function(){
			return (this.todos.length) ? true : false;
		}

		//count number of todos
		this.countTodos = function(){
			if(this.todos===undefined || this.todos===null){
				this.todos = [];
			}
			return this.todos.length;
		}
	}]);
	
})();
