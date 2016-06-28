/**
 * Created by petersodborgchristensen on 05/05/2016.
 */
angular.module('brugere').controller('BrugerController', ['$scope', '$stateParams', '$location', 'Authentication','Brugere',
    function($scope, $stateParams, $location, Authentication, Brugere) {
        $scope.authentication = Authentication;
        //$scope.filteredGreeting = reverseFilter($scope.aktiv);

        $scope.find = function() {
            $scope.brugere = Brugere.query();
        };


        $scope.update = function() {
            var user = $scope.user;

            user.$update(function() {
                $location.path('brugere/' + user._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.findOne = function() {
            $scope.user = Users.get({
                userId: $stateParams.userId
            });
        };
        // Change user password
        $scope.changeUserPassword = function() {
            $scope.success = $scope.error = null;

            $http.post('/users/password', $scope.passwordDetails).success(function(response) {
                // If successful show success message and clear form
                $scope.success = true;
                $scope.passwordDetails = null;
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
        $scope.signup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;

                //And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
        $scope.signin = function() {
            $http.post('/auth/signin', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;

                //And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);
