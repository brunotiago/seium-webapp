(function () {
	var EventDetailsController = function ($location, $routeParams, $timeout, httpService, socketService) {
		var me = this;

		//Redirect to homepage
		me.goBack = function () {
			$location.url('/');
		};

		//Sets the service response to the controller's event property that is binded to the view
		var onEventDetailSuccess = function (data) {
			me.event = data;
		};

		var onEventDetailError = function () {
			me.event = {};
		};

		//Loops through the all the odds and triggers the lowered and raised state
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

		//Resets the odds state
		var resetBetButtonState = function (marketId, outcomeId) {
			me.event.markets[marketId].outcomes[outcomeId].oddLowered = false;
			me.event.markets[marketId].outcomes[outcomeId].oddRaised = false;
		}

		httpService.getEventDetail($routeParams.eventId).then(onEventDetailSuccess, onEventDetailError);

		//Subscribe to the event topic on Web Socket
		socketService.emit('SUBSCRIBE_EVENT', {
			eventId: $routeParams.eventId
		});

		//Callback to update the controller's event property on Web Socket update
		socketService.on('EVENT_UPDATE', function (updatedEventData) {
			me.event = triggerOutcomesState(me.event, updatedEventData);
		});
	};

	var app = angular.module('seium-webapp');
	app.controller('EventDetailsController', ['$location', '$routeParams', '$timeout', 'httpService', 'socketService', EventDetailsController]);
}());
