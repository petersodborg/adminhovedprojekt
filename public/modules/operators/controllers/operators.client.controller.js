/**
 * Created by peter on 07/04/2016.
 */

    angular.module('operators').controller('OperatorsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Operators',
    function($scope, $http, $stateParams, $location, Authentication, Operators) {
        $scope.authentication = Authentication;
        //$scope.land = LandeNavne;
        //$scope.filteredGreeting = reverseFilter($scope.aktiv);
        //Pagination
        $scope.totalItems = 20;
        $scope.currentPage = 1;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            $scope.getOperators();
        };




        $scope.create = function() {
            var operator = new Operators({
                operatorNavn: this.operatorNavn,
                aktiv: this.aktiv,
                innaktiv: this.innaktiv,
                operaKat: this.operaKat,
                addresse: this.addresse,
                postnr: this.postnr,
                city: this.city,
                PO: this.PO,
                land: this.land,
                telefon: this.telefon,
                email: this.email,
                web: this.web,
                fakturerinsKat: this.fakturerinsKat,
                pakke: this.pakke,
                pakkeExpiry: this.pakkeExpiry,
                budgetMax: this.budgetMax,
                priotet: this.priotet,
                microSiteID: this.microSiteID,
                beskrivelse: this.beskrivelse,
                engelskBeskrivelse: this.engelskBeskrivelse,
                logo: this.logo,
                andetBillede: this.andetBillede,
                landeNavn: this.landeNavn

            });

            operator.$save(function(response) {
                $location.path('operators/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            this.operatorNavn = '';
            this.aktiv = '';
            this.innaktiv = '';
            this.operaKat = '';
            this.addresse = '';
            this.postnr = '';
            this.city = '';
            this.PO = '';
            this.land = '';
            this.telefon = '';
            this.email = '';
            this.web = '';
            this.fakturerinsKat = '';
            this.pakke = '';
            this.pakkeExpiry = '';
            this.budgetMax = '';
            this.priotet = '';
            this.microSiteID = '';
            this.beskrivelse = '';
            this.engelskBeskrivelse = '';
            this.logo = '';
            this.andetBillede = '';
            this.landeNavn = '';

        };

        $scope.remove = function(operator) {
            if (operator) {
                operator.$remove();

                for (var i in $scope.operators) {
                    if ($scope.operators[i] === operator) {
                        $scope.operators.splice(i, 1);
                    }
                }
            } else {
                $scope.operator.$remove(function() {
                    $location.path('operators');
                });
            }
        };

        $scope.update = function() {
            var operator = $scope.operator;

            operator.$update(function() {
                $location.path('operators/' + operator._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.operators = Operators.query();
        };

        $scope.findOne = function() {
            $scope.operator = Operators.get({
                operatorId: $stateParams.operatorId
            });
        };
        $scope.getOperators = function () {

            $http.get('/operators/' + $scope.currentPage).success(function (response) {
                $scope.operators = response;

            }).error(function (response) {
                $scope.error = response.message;
            });
        };
    }
]);
