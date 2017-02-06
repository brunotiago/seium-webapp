(function () {
    var EventDetailsController = function ($routeParams) {
      this.eventId = $routeParams.eventId;
    };

    var app = angular.module('seium-webapp');
    app.controller('EventDetailsController', ['$routeParams', EventDetailsController]);
} ());
