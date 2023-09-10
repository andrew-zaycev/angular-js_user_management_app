angular.module('userManagementApp').directive('passwordValidation', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$validators.passwordValidation = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                var isValid = false;

                var hasDigit = /[0-9]/.test(value);
                var hasLetter = /[a-zA-Z]/.test(value);

                if (hasDigit && hasLetter && value.length >= 8) {
                    isValid = true;
                }

                return isValid;
            };
        }
    };
});
