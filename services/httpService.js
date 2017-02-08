(function () {
	var httpService = function ($http) {
		var baseUrl = 'http://localhost:2015';

		//Fetch events list
		var getEventsList = function () {
			return $http.get(baseUrl + '/events')
			.then(function (response) {
				return response.data;
			});
		};

		//Fetch event details by id
		var getEventDetail = function (eventId) {
			return $http.get(baseUrl + '/events/' + eventId)
			.then(function (response) {
				return response.data;
			});
		};

		return {
			getEventsList: getEventsList,
			getEventDetail: getEventDetail
		};

	};

	var module = angular.module('seium-webapp');
	module.factory('httpService', ['$http', httpService]);
}());
