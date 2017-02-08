(function () {
	var EventDetailsController = function ($location, $routeParams, $timeout, httpService, socketService) {
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

		var triggerOutcomesState = function (eventData, updatedEventData) {
			if (eventData) {
				Object.keys(updatedEventData.markets).forEach(function (marketId) {
					if (eventData.markets[marketId]) {
						Object.keys(updatedEventData.markets[marketId].outcomes).forEach(function (outcomeId) {
							if (eventData.markets[marketId].outcomes[outcomeId]) {
								//Compare actual and updated prices and reset button state after 2 sec
								if (eventData.markets[marketId].outcomes[outcomeId].oddDecimal > updatedEventData.markets[marketId].outcomes[outcomeId].oddDecimal) {
									updatedEventData.markets[marketId].outcomes[outcomeId].oddLowered = true;
									$timeout(resetBetButtonState.bind(null, marketId, outcomeId), 2000);
								} else if (eventData.markets[marketId].outcomes[outcomeId].oddDecimal < updatedEventData.markets[marketId].outcomes[outcomeId].oddDecimal) {
									updatedEventData.markets[marketId].outcomes[outcomeId].oddRaised = true;
									$timeout(resetBetButtonState.bind(null, marketId, outcomeId), 2000);
								}
							}
						});
					}
				});
			}
			return updatedEventData;
		}

		var resetBetButtonState = function (marketId, outcomeId) {
			me.event.markets[marketId].outcomes[outcomeId].oddLowered = false;
			me.event.markets[marketId].outcomes[outcomeId].oddRaised = false;
		}

		httpService.getEventDetail($routeParams.eventId).then(onEventDetailSuccess, onEventDetailError);

		socketService.emit('SUBSCRIBE_EVENT', {
			eventId: $routeParams.eventId
		});

		socketService.on('EVENT_UPDATE', function (updatedEventData) {
			me.event = triggerOutcomesState(me.event, updatedEventData);
		});
	};

	var app = angular.module('seium-webapp');
	app.controller('EventDetailsController', ['$location', '$routeParams', '$timeout', 'httpService', 'socketService', EventDetailsController]);
}());
