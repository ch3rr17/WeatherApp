(function() {
    'use strict';

    angular
        .module('weatherApp')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['WeatherFactory', '$log'];

    /* @ngInject */
    function WeatherController(WeatherFactory, $log) {
        var vm = this;

        vm.search = [];

        vm.getWeather = function(city){
          WeatherFactory.grabWeather(city)
                        .then(
                          function(response){
                            vm.weather = response.data;
                            vm.city = {name: city};
                            vm.city.time = moment().format('MMMM Do YYYY, h:mm:ss a');
                            vm.search.push({
                              'city': vm.city.name,
                              'time': vm.city.time
                            });
                            vm.city.name = ''; //empty input box once done with city search
                          },
                          function(error){
                            $log.error(error);
                          }
                        );
        }
        vm.getWeather('San Diego');


    }
})();
