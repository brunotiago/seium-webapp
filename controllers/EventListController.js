(function () {
    var EventListController = function (socketService) {
      this.events = [{
        eventId: 123,
        homeTeamName: 'FC Porto',
        awayTeamName: 'Sporting CP',
        homeTeamScore: 1,
        awayTeamScore: 0,
        startTime: '19:00',
        isInplay: true,
        markets: [{
          marketTitle: "Win-Draw-Win",
          outcomes: [{
            outcomeTitle: "",
            oddDecimal: 1.20
          },
          {
            outcomeTitle: "",
            oddDecimal: 2.00
          },
          {
            outcomeTitle: "",
            oddDecimal: 1.80
          }]
        }]
      },
      {
        eventId: 124,
        homeTeamName: 'FC Porto',
        awayTeamName: 'Sporting CP',
        homeTeamScore: 0,
        awayTeamScore: 1,
        startTime: '19:00',
        isInplay: false,
        markets: [{
          marketTitle: "Win-Draw-Win",
          outcomes: [{
            outcomeTitle: "",
            oddDecimal: 1.20
          },
          {
            outcomeTitle: "",
            oddDecimal: 2.00
          },
          {
            outcomeTitle: "",
            oddDecimal: 1.80
          }]
        }]
      }];


      socketService.on('event update', function (data) {
          console.log(data);
      });

      socketService.emit('subscribe event', {
            eventId: 'angular'
        });
    };

    var app = angular.module('seium-webapp');
    app.controller('EventListController', ['socketService', EventListController]);
} ());
