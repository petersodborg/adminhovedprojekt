/**
 * Created by petersodborgchristensen on 07/05/2016.
 */
/**
 * Created by peter on 07/04/2016.
 */


angular.module('priser').controller('PrisController', ['$scope', '$stateParams', '$location', 'Authentication','Priser',
    function($scope, $stateParams, $location, Authentication, Priser) {
        $scope.authentication = Authentication;
        //$scope.filteredGreeting = reverseFilter($scope.aktiv);





        $scope.create = function() {
            var pris = new Priser({
                kategori: this.kategori,
                pakke: this.pakke,
                pristilbud: this.pristilbud,
                prismicrosite: this.prismicrosite,
                prisklikhjemmeside: this.prisklikhjemmeside,
                budget: this.budget


            });

            pris.$save(function(response) {
                $location.path('priser/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            this.kategori = '';
            this.pakke = '';
            this.pristilbud = '';
            this.prismicrosite = '';
            this.prisklikhjemmeside = '';
            this.budget = '';


        };

        $scope.remove = function(pris) {
            if (pris) {
                pris.$remove();

                for (var i in $scope.priser) {
                    if ($scope.priser[i] === pris) {
                        $scope.priser.splice(i, 1);
                    }
                }
            } else {
                $scope.pris.$remove(function() {
                    $location.path('priser');
                });
            }
        };

        $scope.update = function() {
            var pris = $scope.pris;

            pris.$update(function() {
                $location.path('priser/' + pris._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.priser = Priser.query();
        };

        $scope.findOne = function() {
            $scope.pris = Priser.get({
                prisId: $stateParams.prisId
            });
        };
    }
]);
