/**
 * Created by peter on 07/04/2016.
 */
'use strict';

angular.module('statistik').controller('statistikController', ['$scope', '$stateParams', '$location', 'Authentication', 'Statistikker',
    function($scope, $stateParams, $location, Authentication, Statistikker) {
        $scope.authentication = Authentication;

        $scope.create = function() {
            var statistik = new Statistikker({
                year: this.year,
                month: this.month,
                visninger: this.visninger,
                klik_tilbud: this.klik_tilbud,
                klik_microsite: this.klik_microsite,
                klik_hjemmeside: this.klik_hjemmeside

            });
            statistik.$save(function(response) {
                $location.path('statistik/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            this.year = '';
            this.month = '';
            this.visninger = '';
            this.klik_tilbud = '';
            this.klik_microsite = '';
            this.klik_hjemmeside = '';

        };

        $scope.remove = function(statistik) {
            if (statistik) {
                statistik.$remove();

                for (var i in $scope.statistikker) {
                    if ($scope.statistik[i] === statistik) {
                        $scope.statistikker.splice(i, 1);
                    }
                }
            } else {
                $scope.statistik.$remove(function() {
                    $location.path('statistik');
                });
            }
        };

        $scope.update = function() {
            var statistik = $scope.statistik;

            statistik.$update(function() {
                $location.path('statistik/' + statistik._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.statistikker = Statistikker.query();
        };

        $scope.findOne = function() {
            $scope.statistik = Statistikker.get({
                statId: $stateParams.statId
            });
        };
    }
]);