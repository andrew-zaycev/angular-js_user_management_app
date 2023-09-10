angular.module('userManagementApp').directive('uniqueUsername', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.uniqueUsername = function(modelValue, viewValue) {
                var users = scope.users;

                if (!modelValue) {
                    return Promise.resolve();
                }

                var isUnique = true;

                for (var i = 0; i < users.length; i++) {
                    if (users[i].username.toLowerCase() === modelValue.toLowerCase() && users[i].id !== scope.selectedUser.id) {
                        isUnique = false;
                        break;
                    }
                }

                if (isUnique) {
                    return Promise.resolve();
                } else {
                    return Promise.reject('Это имя пользователя уже занято.');
                }
            };
        }
    };
});
