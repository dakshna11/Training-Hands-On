var app = angular.module('showApp',[])

app.controller('app', function($scope){
    $scope.show = 'msg1'
    $scope.toggle = function(){
        $scope.show = $scope.show == 'msg1' ? 'msg2' : 'msg1'
    }
})