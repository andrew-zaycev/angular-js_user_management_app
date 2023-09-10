angular.module('userManagementApp').directive('notificationPopup', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            showPopup: '=',
            successMessage: '=',
            popupClass: '='
        },
        templateUrl: '../../directives-templates/notificationPopup.directive.html',

        link: function (scope) {
            var hidePopupTimeout;

            scope.closePopup = function () {
                scope.showPopup = false;
            };

            scope.$watch('showPopup', function (newValue) {
                if (newValue) {
                    hidePopupTimeout = $timeout(function () {
                        scope.closePopup();
                    }, 5000);
                } else {
                    if (hidePopupTimeout) {
                        $timeout.cancel(hidePopupTimeout);
                    }
                }
            });
        }
    };
}]);
