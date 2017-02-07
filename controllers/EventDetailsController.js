(function () {
    var EventDetailsController = function ($location, $routeParams, httpService, socketService) {
      var me = this;

      me.goBack = function () {
        $location.url('/');
      };

      var onEventDetailSuccess = function (data) {
          me.event = data;
      };

      var onEventDetailError = function (reason) {
          me.event = {};
      };

      httpService.getEventDetail($routeParams.eventId).then(onEventDetailSuccess, onEventDetailError);

      socketService.emit('SUBSCRIBE_EVENT', {
            eventId: $routeParams.eventId
        });

      socketService.on('EVENT_UPDATE', function (data) {
          me.event = data;
      });
    };

    var app = angular.module('seium-webapp');
    app.controller('EventDetailsController', ['$location', '$routeParams', 'httpService', 'socketService', EventDetailsController]);
} ());
