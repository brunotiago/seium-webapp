(function () {
    var EventListController = function (httpService, socketService) {
      var me = this;

      var onEventsSuccess = function (data) {
          me.events = data;
      };

      var onEventsError = function (reason) {
          me.events = [];
      };

      httpService.getEventsList().then(onEventsSuccess, onEventsError);
    };

    var app = angular.module('seium-webapp');
    app.controller('EventListController', ['httpService', 'socketService', EventListController]);
} ());
