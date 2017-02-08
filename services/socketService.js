(function () {
	var socketService = function (socketFactory) {
		var serverBaseUrl = 'http://localhost:2015';

		//Connect to WS
		var myIoSocket = io.connect(serverBaseUrl, {
			upgrade: false,
			transports: ['websocket']
		});

		var socket = socketFactory({
			ioSocket: myIoSocket
		});

		return socket;
	};

	var module = angular.module('seium-webapp');
	module.factory('socketService', socketService);
}());
