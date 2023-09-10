angular.module('userManagementApp').directive('validEmail', function() {
    var EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$validators.validEmail = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                return EMAIL_REGEXP.test(viewValue);
            };
        }
    };
});
