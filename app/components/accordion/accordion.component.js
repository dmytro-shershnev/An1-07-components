(function() {
    "use strict";

    angular
        .module("components")
        .component("accordion", {
            transclude: true,
            template: `<div class="panel-group" ng-transclude></div>`,
            controller: function() {
                let $ctrl = this;
                let panels = [];

                $ctrl.addPanel = function(panel) {
                    panels.push(panel);

                    if (panels.length) {
                        panels[0].turnOn();
                    }
                };

                $ctrl.selectPanel = function(panel) {
                    for (let p of panels) {
                        if (p === panel) {
                            p.turnOn();
                        } else {
                            p.turnOff();
                        }
                    }
                };
            }
        })
        .component("accordionPanel", {
            bindings: {
                header: "@"
            },
            require: {
                parent: "^accordion"
            },
            transclude: true,
            template: `
                <div class="panel panel-default">
                    <div class="panel-heading" ng-click="$ctrl.select()">
                        <h4 class="panel-title">{{$ctrl.header}}</h4>
                    </div>
                    <div ng-if="$ctrl.selected" class="panel-body" ng-transclude>

                    </div>
                </div>
            `,
            controller: function() {
                let $ctrl = this;
                $ctrl.selected = false;

                $ctrl.$onInit = function() {
                    $ctrl.parent.addPanel($ctrl);
                };

                $ctrl.$onChange = function(changes) {
                    console.log(changes);
                };

                $ctrl.turnOn = function() {
                    $ctrl.selected = true;
                };

                $ctrl.turnOff = function() {
                    $ctrl.selected = false;
                };

                $ctrl.select = function() {
                    $ctrl.parent.selectPanel($ctrl);
                };
            }
        });
})();