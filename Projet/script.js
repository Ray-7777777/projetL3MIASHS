angular.module('myApp', [])
      .controller('AppController', function($scope, $sce) {
        var ctrl = this;
        ctrl.equation = '';

        ctrl.renderEquation = function() {
          var tex = ctrl.equation;
          // Use MathJax to validate the LaTeX equation
          try {
            var tempElement = document.createElement('div');
            MathJax.texReset(); // Clear previous rendering
            tempElement.innerHTML = '$$' + tex + '$$';
            MathJax.typeset([tempElement]); // Attempt to render the equation
            // If the equation is valid, set the rendered equation to the input
            $scope.renderedEquation = $sce.trustAsHtml(tempElement.innerHTML);
          } catch (err) {
            // If there's an error, display an error message
            $scope.renderedEquation = $sce.trustAsHtml('<span class="error-message">Invalid LaTeX equation</span>');
          }
        };
      });