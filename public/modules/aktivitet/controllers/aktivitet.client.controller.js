/**
 * Created by petersodborgchristensen on 08/05/2016.
 */

/*
        $scope.totalItems = 20;
        $scope.currentPage = 1;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            $scope.getAnnoncer();
        };
        $scope.getAktiviteter = function () {

            $http.get('/aktiviteter/' + $scope.currentPage).success(function (response) {
                $scope.aktiviteter = response;

            }).error(function (response) {
                $scope.error = response.message;
            });
        };
    }
]);
*/
'use strict';

// Talks controller
angular.module('aktiviteter').controller('AktivitetController', ['$scope', '$stateParams', '$location', 'Authentication', 'Aktiviteter',
    function($scope, $stateParams, $location, Authentication, Aktiviteter ) {
        $scope.authentication = Authentication;

        // Create new Talk
        $scope.create = function() {
            // Create new Talk object
            var aktivitet = new Aktiviteter ({
                Title: this.Title,
                TagCategoryID: this.TagCategoryID,
                aktivitetsniveau: this.aktivitetsniveau,
            });

            // Redirect after save
            aktivitet.$save(function(response) {
                $location.path('aktiviteter/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.Title = '';
            this.TagCategoryID = '';
            this.aktivitetsniveau = [{min:'lille', mellem: 'Mellem', stor: 'Stor'}];

        };

        // Remove existing Talk
        $scope.remove = function( talk ) {
            if ( talk ) { talk.$remove();

                for (var i in $scope.aktiviteter ) {
                    if ($scope.aktiviteter [i] === aktivitet ) {
                        $scope.aktiviteter.splice(i, 1);
                    }
                }
            } else {
                $scope.aktivitet.$remove(function() {
                    $location.path('aktiviteter');
                });
            }
        };

        // Update existing Talk
        $scope.update = function() {
            var aktivitet = $scope.aktivitet ;

            aktivitet.$update(function() {
                $location.path('aktiviteter/' + aktivitet._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Talks
        $scope.find = function() {
            $scope.aktiviteter = Aktiviteter.query();
        };

        // Find existing Talk
        $scope.findOne = function() {
            $scope.aktivitet = Aktiviteter.get({
                aktivitetId: $stateParams.aktivitetId
            });
        };
    }
]);
