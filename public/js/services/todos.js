angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/food');
			},
			create : function(todoData) {
				return $http.post('/api/food', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/food/' + id);
			},
                        get_total: function(){
                                return $http.get('/api/total');
                        }
		}
	}]);
