(function() {
    'use strict';

    angular
        .module('weatherApp')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['WeatherFactory', '$log'];

    /* @ngInject */
    function WeatherController(WeatherFactory, $log) {
        var vm = this;

        //array to hold search input
        vm.search = [];

        vm.showTempC = false;

        //Convert current temp from F to C
        vm.convertToC = function(temp) {
            var c = ((temp - 32) * (5 / 9)).toFixed(2);
            return c;
        }

        //Convert all temperature for main, max, and min temps
        vm.convertAllToC = function() {
            vm.weather.main.temp = vm.convertToC(vm.weather.main.temp);
            vm.weather.main.temp_max = vm.convertToC(vm.weather.main.temp_max);
            vm.weather.main.temp_min = vm.convertToC(vm.weather.main.temp_min);
        }

        //Gets weather info based on city name
        vm.getWeather = function(city) {
            WeatherFactory.grabWeather(city)
                .then(
                    function(response) {
                        vm.weather = response.data;
                        vm.city = {
                            name: city
                        };
                        vm.city.time = moment().format('MMMM Do YYYY, h:mm:ss a');
                        vm.search.push({
                            'city': vm.city.name,
                            'time': vm.city.time
                        });
                        vm.city.name = ''; //empty input box once done with city search
                    },
                    function(error) {
                        $log.error(error);
                    }
                );
        }
        vm.getWeather('San Diego'); //Default weather as San Diego

    }
})();
