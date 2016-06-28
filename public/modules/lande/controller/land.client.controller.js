/**
 * Created by petersodborgchristensen on 07/05/2016.
 */



angular.module('lande').controller('LandController', ['$scope', '$stateParams', '$location', 'Authentication','Lande',
    function($scope, $stateParams, $location, Authentication, Lande) {
        $scope.authentication = Authentication;
        //$scope.filteredGreeting = reverseFilter($scope.aktiv);
        //Pagination
        $scope.totalItems = 20;
        $scope.currentPage = 1;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            $scope.getLande();
        };




        $scope.create = function() {
            var land = new Lande({
                landeNavn: this.landeNavn,
                Region: this.Region


            });

            land.$save(function(response) {
                $location.path('lande/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            this.landeNavn = '';
            this.Region = '';


        };

        $scope.remove = function(land) {
            if (land) {
                land.$remove();

                for (var i in $scope.lande) {
                    if ($scope.lande[i] === land) {
                        $scope.lande.splice(i, 1);
                    }
                }
            } else {
                $scope.land.$remove(function() {
                    $location.path('lande');
                });
            }
        };

        $scope.update = function() {
            var land = $scope.land;

            land.$update(function() {
                $location.path('lande/' + land._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.lande = Lande.query();
        };

        $scope.findOne = function() {
            $scope.land = Lande.get({
                landId: $stateParams.landId
            });
        };
        $scope.getLande = function () {

            $http.get('/lande/' + $scope.currentPage).success(function (response) {
                $scope.lande = response;

            }).error(function (response) {
                $scope.error = response.message;
            });
        };
    }
]);
