(function(){
	
angular
	.module('TodoApp', [])


	/* services */
	.factory('todoData', function(){

		// saved to a temporary cache variable
		var temp_todos = window.localStorage.getItem('todos');

		// set todos variable with the cache variable
		var todos = (window.localStorage.getItem('todos') !== null) ? JSON.parse(temp_todos) : [{name: "Learn AngularJS",added: Date.now(),done: false, eitable:false},{	name: "Learn NodeJs",added: Date.now(),	done: false, eitable:false	},{name: "Learn Web Services",added: Date.now(),done: false, eitable:false}];
		
		// saved to a local storage
		window.localStorage.setItem('todos', JSON.stringify(todos));

		// return the data
		return { data: todos }

	})

	/* controller */
	.controller('TodoController', ['$scope', 'todoData', function($scope, todoData){
		$scope.header_title = "Jhan Mateo's ToDo Application";
		$scope.short_description = "This is a simple To-Do list application using AngularJS.";
		
		// set todos variable with the cache variable
		$scope.todos = todoData.data;
		
		
		// add new todo list		
		$scope.addTodo = function(){
			if((event.keyCode == 13 || event.which == 13) && $scope.newTodo.length){
				$scope.todos.push({name: $scope.newTodo,added: Date.now(),	done: false	});
				$scope.newTodo = '';
				window.localStorage.setItem('todos', JSON.stringify($scope.todos));
			}

				
		};
		
		// delete todo
		$scope.deleteTodo = function($index){
			$scope.todos.splice($index,1);
			window.localStorage.removeItem('todos');
			window.localStorage.setItem('todos', JSON.stringify($scope.todos));
		}
		
		$scope.updateTodo = function($index){
			if((event.keyCode == 13 || event.which == 13) && $scope.todos[$index].name.length > 0){
				$scope.todos[$index].editable = !$scope.todos[$index].editable;
				
				window.localStorage.removeItem('todos');
				window.localStorage.setItem('todos', JSON.stringify($scope.todos));
			}
		}
		
		$scope.editMode = function($index){
			$scope.todos[$index].editable = !$scope.todos[$index].editable;
		}
		
		
		$scope.hasTodos = function(){
			return ($scope.todos.length) ? true : false;
		}

		//count number of todos
		$scope.countTodos = function(){
			return $scope.todos.length;
		}
		
	}]);
	
})();
