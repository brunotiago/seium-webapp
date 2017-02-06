(function(){
    var config = function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/event-list.html',
                controller: 'EventListController',
                controllerAs: 'eventListCtrl'
            })
            .when('/event/:eventId', {
                templateUrl: 'views/event-details.html',
                controller: 'EventDetailsController',
                controllerAs: 'eventDetailsCtrl'
            })
            .otherwise({redirectTo:'/'});
    };

    var app = angular.module('seium-webapp', ['ngRoute', 'btford.socket-io']);
    app.config(['$routeProvider', config]);
}());
