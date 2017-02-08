(function () {
	var EventListController = function (httpService) {
		var me = this;

		//Sets the service response to the controller's event property that is binded to the view
		var onEventsSuccess = function (data) {
			me.events = data;
		};

		var onEventsError = function () {
			me.events = [];
		};

		//Fetch the event list from server
		httpService.getEventsList().then(onEventsSuccess, onEventsError);
	};

	var app = angular.module('seium-webapp');
	app.controller('EventListController', ['httpService', EventListController]);
}());
