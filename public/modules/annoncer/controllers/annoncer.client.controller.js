/**
 * Created by peter on 07/04/2016.
 */


angular.module('annoncer').controller('AnnonceController', ['$scope', '$stateParams', '$location', 'Authentication','Annoncer', 'Lande', 'Aktiviteter', 'Operators',
    function($scope, $stateParams, $location, Authentication, Annoncer, Lande, Aktiviteter, Operators) {
        $scope.authentication = Authentication;
           $scope.data = {
            singleSelect: null,
            option1: 'option-1',
   };
        //$scope.filteredGreeting = reverseFilter($scope.aktiv);
        //Pagination
        $scope.totalItems = 20;
        $scope.currentPage = 1;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            $scope.getAnnoncer();
        };

        $scope.create = function() {
            //var newlande = [];
            var annonce = new Annoncer({
                type: this.type,
                overskrift: this.overskrift,
                aktivFra: this.aktivFra,
                aktivTil: this.aktivTil,
                thumb: this.thumb,
                stortImage: this.stortImage,
                months: this.months,
                byer: this.byer,
                aktiviteter: this.aktiviteter,
                aktivitetsniveauer: this.aktivitetsniveauer,
                tekster: this.tekster,
                status: this.status,
                godkendt: this.godkendt,
                lande: this.lande,
                newland: this.newland,


            });

            annonce.$save(function(response) {
                $location.path('annoncer/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            this.type = '';
            this.overskrift = '';
            this.aktivFra = '';
            this.aktivTil = '';
            this.thumb = '';
            this.stortImage = '';
            this.months = '';
            this.byer = '';
            this.aktiviteter = '';
            this.aktivitetsniveauer = '';
            this.tekster = '';
            this.status = '';
            this.godkendt = '';
            this.lande = '';
            this.newland = '';

        };

                // Remove existing Annonce
        $scope.remove = function( annonce ) {
            if ( annonce ) { annonce.$remove();

                for (var i in $scope.annoncer ) {
                    if ($scope.annoncer [i] === annonce ) {
                        $scope.annoncer.splice(i, 1);
                    }
                }
            } else {
                $scope.annonce.$remove(function() {
                    $location.path('annoncer');
                });
            }
        };

        $scope.update = function() {
            var annonce = $scope.annonce;
            newland: this.newland,


            annonce.$update(function() {
                $location.path('annoncer/' + annonce._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
           this.newland = '';

        };

        $scope.find = function() {
            $scope.annoncer = Annoncer.query();
            $scope.lande = Lande.query();//liste fra landeliste
            $scope.aktiviteter = Aktiviteter.query();
            $scope.operators = Operators.query();

        };

        $scope.findOne = function() {
            $scope.annonce = Annoncer.get({
                annonceId: $stateParams.annonceId
            });
        };
        $scope.getAnnoncer = function () {

            $http.get('/annoncer/' + $scope.currentPage).success(function (response) {
                $scope.annoncer = response;

            }).error(function (response) {
                $scope.error = response.message;
            });
        };

    }
]);
