angular.module('userManagementApp').controller('UserController', function($scope, UserApiService) {
    $scope.users = [
        {username: 'Foxen', firstName: 'Hanna', lastName: 'Timohina', email: 'tim@gmail.com', type: 'Admin', password: 'daw2fds24', repeatPassword: 'daw2fds24', id: 1241241244124},
        {username: 'Grinch', firstName: 'Andrew', lastName: 'Zolotov', email: 'zolot@ukr.net', type: 'Driver', password: 'daw2fds24', repeatPassword: 'daw2fds24', id: 1241241244121},
        {username: 'Alexpo', firstName: 'King', lastName: 'Adams', email: 'adamsh@gmail.com', type: 'Admin', password: 'daw2fds24', repeatPassword: 'daw2fds24', id: 1241241244122},
        {username: 'LeoKing', firstName: 'Leonid', lastName: 'Ohrimovich', email: 'leoooo@ukr.net', type: 'Admin', password: 'daw2fds24', repeatPassword: 'daw2fds24', id: 1241241244120}
    ];
    $scope.isShowForm = false; // Flag to show/hide the form
    $scope.isCreateMode = true; // User creation mode
    $scope.isEditMode = false; // User Edit Mode
    $scope.selectedUser = {}; // Selected user
    $scope.showPopup = false;
    $scope.successMessage = '';

// Function to display the user creation form
    $scope.showCreateForm = function() {
        $scope.isShowForm = true;
        $scope.isCreateMode = true;
        $scope.isEditMode = false;
        $scope.selectedUser = {};
        $scope.userForm.$setPristine();
        $scope.userForm.$setUntouched();
    };

    // Function to display user edit form
    $scope.editUser = function(user) {
        $scope.isShowForm = true;
        $scope.isCreateMode = false;
        $scope.isEditMode = true;
        $scope.selectedUser = angular.copy(user);
    };

    $scope.getUsers = function() {
        UserApiService.getUserList()
            .then(function(response) {
                $scope.users = response.data;
            })
            .catch(function(error) {
                console.error('HTTP Error:', error);
            });
    };

    $scope.createUser = function() {
        // This code is an example of how data would be processed in a real project with a backend.

        // UserApiService.addUser($scope.selectedUser).then(function(response) {
        //     if (response.status >= 200 && response.status < 300) {
        //         $scope.showSuccessPopup('User successfully created')
        //         $scope.getUsers()
        //     }
        // }).catch(function (error) {
        //     $scope.showErrorPopup('Error creating user')
        //     console.error('HTTP Error:', error);
        // });

        $scope.selectedUser.id = $scope.generateUserId();
        $scope.users.push(angular.copy($scope.selectedUser));
        $scope.showSuccessPopup('User successfully created')

        $scope.closeForm()
    };

    $scope.updateUser = function() {
        // This code is an example of how data would be processed in a real project with a backend.

        // UserApiService.updateUser($scope.selectedUser.id, $scope.selectedUser)
        //     .then(function(response) {
        //         if (response.status >= 200 && response.status < 300) {
        //             $scope.showSuccessPopup('User successfully updated')
        //             $scope.getUsers()
        //         }
        //     }).catch(function (error) {
        //         $scope.showErrorPopup('Error creating user')
        //         console.error('HTTP Error:', error);
        //     });

        var index = $scope.users.findIndex(user => user.id === $scope.selectedUser.id);
        $scope.users[index] = angular.copy($scope.selectedUser);
        $scope.isEditMode = false;
        $scope.showSuccessPopup('User successfully updated')
        $scope.closeForm()
    };

    // Function for deleting a user
    $scope.deleteUser = function() {
        // This code is an example of how data would be processed in a real project with a backend.

        // UserApiService.deleteUser(userId)
        //     .then(function(response) {
        //         if (response.status >= 200 && response.status < 300) {
        //             $scope.showSuccessPopup('User successfully deleted')
        //             $scope.getUsers()
        //         }
        //     }).catch(function (error) {
        //         $scope.showErrorPopup('Error creating user')
        //         console.error('HTTP Error:', error);
        //     });

        var index = $scope.users.findIndex(user => user.id === $scope.selectedUser.id);
        if (index !== -1) {
            delete $scope.users[index].$$hashKey
            $scope.users.splice(index, 1);
        }

        $scope.showSuccessPopup('User successfully deleted')
        $scope.closeForm()
    };

    $scope.closeForm = function() {
        $scope.isShowForm = false;
        $scope.selectedUser = {};
        $scope.userForm.$setPristine();
        $scope.userForm.$setUntouched();
    };

    // Function for generating user id
    $scope.generateUserId = function() {
        // Get the current time in milliseconds
        var timestamp = new Date().getTime();

        // Generate a random number from 0 to 9999
        var random = Math.floor(Math.random() * 10000);

        // Combine time and random number to create a unique ID
        return timestamp.toString() + random.toString();
    }

    $scope.submitForm = function(form) {
        if (form.$invalid) {
            if ($scope.isCreateMode) {
                $scope.showErrorPopup('Error creating user, fill in all fields and try again')
            }

            form.$setSubmitted();
            return;
        }

        $scope.createUser()
    };

    $scope.showSuccessPopup = function (message) {
        $scope.showPopup = true;
        $scope.successMessage = message;
        $scope.popupClass = 'success-popup';
    }

    $scope.showErrorPopup = function (message) {
        $scope.showPopup = true;
        $scope.successMessage = message;
        $scope.popupClass = 'error-popup';
    }
});
