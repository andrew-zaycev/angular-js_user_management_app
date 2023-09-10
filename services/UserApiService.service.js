angular.module('userManagementApp').service('UserApiService', ['$http', function ($http) {
        const baseUrl = 'https://jsonplaceholder.typicode.com';

        this.getUserList = function () {
            return $http.get(baseUrl + '/users');
        };

        this.addUser = function (user) {
            return $http.post(baseUrl + '/users', user);
        };

        this.updateUser = function (userId, user) {
            return $http.put(baseUrl + `/users/${userId}`, user);
        };

        this.deleteUser = function (userId) {
            return $http.delete(baseUrl + `/users/${userId}`);
        };
    }]);
