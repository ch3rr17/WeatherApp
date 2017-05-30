"use strict";

//describe the behavior we are testing

describe("weather api factory", function(){
	var WeatherFactory, httpBackend;

	//the top level module
	beforeEach(module("weatherApp"));

	//inject the factory and httpbackend
	beforeEach(inject(function(_WeatherFactory_, $httpBackend){
		WeatherFactory = _WeatherFactory_
		httpBackend = $httpBackend;
	}));

	//clear and make sure there are no outstanding requests
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});




it("should have a grabWeather method", function(){
	expect(angular.isFunction(WeatherFactory.grabWeather)).toBe(true);
});

//verify a success api call
it("should work", function(){
	httpBackend
		.whenGET("http://api.openweathermap.org/data/2.5/weather?appid=449e9e8cb9237caf839de0f795054053&mode=json&q=Tokyo&units=imperial")
		.respond({city:"Tokyo"});

	WeatherFactory.grabWeather("Tokyo")

	// test the response
	.then(function(response){
		console.log('SPEC',response.data);
		expect(response.data.city).toBe("Tokyo");
		expect(response.status).toEqual(200);
	});

	httpBackend.flush();
	
	});




// verify the error handler is working
it("should throw an error on a server expection", function(){
		var result, error

		//setup http backend
		httpBackend
		.expectGET("http://api.openweathermap.org/data/2.5/weather?appid=449e9e8cb9237caf839de0f795054053&mode=json&q=Tokyo&units=imperial")
		.respond(500);

		var promise = WeatherFactory.grabWeather("Tokyo");

		promise.then(function(data){
			result = data;
		}, function(data){
			error = data;
		});

		httpBackend.flush();

		//test the response
		expect(result).toBeUndefined();
        console.log('I CAN BE AN ERROR', error);
		expect(error.status).toEqual(500);
	});
});

