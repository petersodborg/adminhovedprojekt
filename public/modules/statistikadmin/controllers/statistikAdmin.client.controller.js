/**
 * Created by petersodborgchristensen on 09/05/2016.
 */

'use strict';

angular.module('statistikadmin').controller('statistikAdminController', ['$scope', '$stateParams', '$location', 'Authentication', 'StatistikAdmin',
    function($scope, $stateParams, $location, Authentication, StatistikAdmin) {
        $scope.authentication = Authentication;

        $scope.create = function() {
            var statadmin = new StatistikAdmin({
                updateStat: this.updateStat,
                sendBillingReport: this.sendBillingReport,
                sendAdReport: this.sendAdReport,
                leadsReport: this.leadsReport

            });
            statadmin.$save(function(response) {
                $location.path('statistikadmin/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            this.updateStat = '';
            this.sendBillingReport = '';
            this.sendAdReport = '';
            this.leadsReport = '';

        };

        $scope.remove = function(statadmin) {
            if (statadmin) {
                statadmin.$remove();

                for (var i in $scope.statistikkeradmin) {
                    if ($scope.statistik[i] === statistik) {
                        $scope.statistikkeradmin.splice(i, 1);
                    }
                }
            } else {
                $scope.statadmin.$remove(function() {
                    $location.path('statistikadmin');
                });
            }
        };

        $scope.update = function() {
            var statadmin = $scope.statadmin;

            statadmin.$update(function() {
                $location.path('statistikadmin/' + statadmin._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.statistikkeradmin = Statistikkeradmin.query();
        };

        $scope.findOne = function() {
            $scope.statistik = Statistikker.get({
                statadminId: $stateParams.statadminId
            });
        };
    }
]);