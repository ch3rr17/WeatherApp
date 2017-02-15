(function() {
    'use strict';

    angular
        .module('weatherApp')
        .factory('WeatherFactory', WeatherFactory);

    WeatherFactory.$inject = ['$http', '$q', '$log', 'toastr'];

    /* @ngInject */
    function WeatherFactory($http, $q, $log, toastr) {
        var service = {
            grabWeather: grabWeather
        };

        return service;



        function grabWeather(city) {
          var url = 'http://api.openweathermap.org/data/2.5/weather';

            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: url,
                    params: {
                      q: city,
                      mode: 'json',
                      units: 'imperial',
                      appid: '449e9e8cb9237caf839de0f795054053'
                    }
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        toastr.success("We've got weather!");
                    },
                    function(error) {
                        defer.reject(error.data);
                        toastr.warning("No weather found!");
                    }
                );

            return defer.promise;
        }


    }
})();
