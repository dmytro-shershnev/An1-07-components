(function() {
    "use strict";

    angular
        .module("components")
        .component("simple", {
            // template: "Hello from component"
            templateUrl: "components/simple/simple.html",
            controllerAs: "$ctrl",
            controller: function() {
                let $ctrl = this;

                $ctrl.action = "Create Task";

                $ctrl.changeAction = function() {
                    $ctrl.action = "New Task";
                };
            }
        });
})();