(function() {

  var app = angular.module("validation", ["ngMessages"]);

  var RegistrationController = function() {
    var model = this;

    // model.message = "";

    model.user = {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: ""
    };

    model.submit = function(isValid) {
      console.log("h");
      if (isValid) {
        model.message = "Submitted " + model.user.email;
      } else {
        model.message = "There are still invalid fields below";
      }
    };

  };

  var compareTo = function() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  };

  app.directive("compareTo", compareTo);
  app.controller("RegistrationController", RegistrationController);

}());