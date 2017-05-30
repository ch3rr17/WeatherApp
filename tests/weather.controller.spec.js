describe('weather controller tests', function() {
    beforeEach(module('weatherApp'));
    var $scope;
    var $controller;
    var $q;
    var deferred;
    var vm;

    describe('with mock of weather factory', function() {
        beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, WeatherFactory) {
            $scope = _$rootScope_.$new();
            $controller = _$controller_;
            $q = _$q_;
            deferred = _$q_.defer();

            // Jasmine Spy to return the deferred object for the weatherSearch method
            spyOn(WeatherFactory, 'grabWeather').and.returnValue(deferred.promise);

            // init controller, passing our spy service instance
            vm = $controller('WeatherController', {
                $scope: $scope,
                weatherFactory: WeatherFactory
            });
        }));

        it('should return a promise with the City Name: Tokyo', function() {
            deferred.resolve([{ city: 'Tokyo' }]);

            $scope.$apply();

            // expect(vm.title).toBe('WeatherController');
            expect(vm.city).not.toBe(undefined);
            expect(vm.error).toBe(undefined);
            expect(vm.city.name).toBe('Tokyo');
        });

        it('should reject promise', function() {
            // this will call the catch method in the controller
            deferred.reject();

            // We have to call apply for this to work
            $scope.$apply();

            expect(vm.weather).toBe(undefined);
            //expect(vm.error).toBe('There has been an error!');
        });
    });
});
