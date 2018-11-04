// Importing the dependent modules.
var Stopwatch = require('../build/vanil-stopwatch');
var DummyProcessor = require('./dummyProcessor');

// Duration in milliseconds for the dummy process.
var __processTime = 100;

// Field for an instance of the DummyProcessor.
var _dummyProcessor = null;

// Prepare the environent, before every 'test'.
beforeEach(function () {
    _dummyProcessor = new DummyProcessor(__processTime);
})

/**
 * Validates the given actual duration with given expected duration by 
 * considering the deviation value.
 * @param {number} actual Actual elapsed duration in milliseconds.
 * @param {number} expected Expected elapsed duration in milliseconds.
 */
var validateDuration = function (actual, expected) {
    var deviation = 10;

    expect(actual).toBeGreaterThanOrEqual(expected - deviation); // Min
    expect(actual).toBeLessThanOrEqual(expected + deviation); // Max
}

// Test cases
describe('constructor', function () {

    test('initializes an instance', function () {

        var sw = new Stopwatch();
        expect(sw).toBeTruthy();
    })

    test('initializes an instance and runs immediately', function () {

        var sw = new Stopwatch(true);
        expect(sw.isRunning).toBeTruthy();
    })

    test('initializes an instance but does not run immediately', function () {

        var sw = new Stopwatch(false);
        expect(sw.isRunning).not.toBeTruthy();

        sw = new Stopwatch();
        expect(sw.isRunning).not.toBeTruthy();
    })
});

describe('Stopwatch instance', function () {

    test('gives the elapsed time as zero before it starts', function () {

        var sw = new Stopwatch();
        expect(sw.elapsedMilliseconds).toBe(0);
    })

    test('starts', function () {

        var sw = new Stopwatch();
        sw.start();

        expect(sw.isRunning).toBeTruthy();
    })

    test('stops', function () {

        var sw = new Stopwatch();
        sw.start();
        sw.stop();

        expect(sw.isRunning).not.toBeTruthy();
    })

    test('gives the right elapsed time while it runs', function (done) {

        var sw = new Stopwatch();
        sw.start();

        _dummyProcessor.process(function () {
            validateDuration(sw.elapsedMilliseconds, __processTime);
            done();
        })
    })

    test('gives the right elapsed time in milliseconds after it stops',
        function (done) {

            var sw = new Stopwatch();
            sw.start();

            _dummyProcessor.process(function () {
                sw.stop();

                // Validate it after awhile.
                setTimeout(function () {
                    validateDuration(sw.elapsedMilliseconds, __processTime);
                    done();
                }, 100)
            })
        })

    test('gives the right elapsed time in different time unit', function (done) {

        var sw = new Stopwatch();
        sw.start();

        _dummyProcessor.process(function () {
            sw.stop();

            var expectedMilliseconds = sw.elapsedMilliseconds;
            var expectedSeconds = sw.elapsedMilliseconds / 1000;
            var expectedMinutes = (sw.elapsedMilliseconds / 1000) / 60;
            var expectedHours = ((sw.elapsedMilliseconds / 1000) / 60) / 60;

            expect(sw.elapsedTime.milliseconds).toEqual(expectedMilliseconds);
            expect(sw.elapsedTime.seconds).toEqual(expectedSeconds);
            expect(sw.elapsedTime.minutes).toEqual(expectedMinutes);
            expect(sw.elapsedTime.hours).toEqual(expectedHours);

            done();
        })

    })

    test('resets the measurement while it runs', function (done) {

        var sw = new Stopwatch();
        sw.start();

        _dummyProcessor.process(function () {
            sw.reset();
            expect(sw.elapsedMilliseconds).toBe(0);
            done();
        })
    })

    test('resets the measurement after it stops', function (done) {

        var sw = new Stopwatch();
        sw.start();

        _dummyProcessor.process(function () {
            sw.stop();
            sw.reset();
            expect(sw.elapsedMilliseconds).toBe(0);
            done();
        })
    })

    test('restarts the measurement while it runs', function (done) {

        var sw = new Stopwatch();
        sw.start();

        _dummyProcessor.process(function () {
            sw.restart();
            _dummyProcessor.process(function () {
                sw.stop();
                validateDuration(sw.elapsedMilliseconds, __processTime);
                done();
            })
        })
    })

    test('restarts the measurement after it stops', function (done) {

        var sw = new Stopwatch();
        sw.start();

        _dummyProcessor.process(function () {
            sw.stop();
            sw.restart();
            _dummyProcessor.process(function () {
                sw.stop();
                validateDuration(sw.elapsedMilliseconds, __processTime);
                done();
            })
        })
    })

    test('splits the measurement', function (done) {

        var sw = new Stopwatch();
        sw.start();

        _dummyProcessor.process(function () {
            sw.split();

            _dummyProcessor.process(function () {
                sw.split();
                sw.stop();

                expect(sw.laps.length).toBeGreaterThan(0);

                // Validation of the step #1
                validateDuration(sw.laps[0].elapsedTime.milliseconds,
                    __processTime);

                // Validation of the step #2
                validateDuration(sw.laps[1].elapsedTime.milliseconds,
                    (__processTime * 2));

                done();
            })
        })
    })

    test('splits the measurement with given titles', function (done) {

        var sw = new Stopwatch();
        sw.start();

        _dummyProcessor.process(function () {
            var step1SplitMessage = 'Process Step #1 has done';
            var step2SplitMessage = 'Process Step #2 has done'
            sw.split(step1SplitMessage);

            _dummyProcessor.process(function () {
                sw.split(step2SplitMessage);
                sw.stop();

                // Validation of the step #1
                expect(sw.laps[0].title).toEqual(step1SplitMessage);

                // Validation of the step #2
                expect(sw.laps[1].title).toEqual(step2SplitMessage);

                done();
            })
        })
    })

    test('splits the measurement with default title', function (done) {

        var sw = new Stopwatch();
        sw.start();

        _dummyProcessor.process(function () {
            sw.split();

            _dummyProcessor.process(function () {
                sw.split();
                sw.stop();

                // Validation of the step #1
                expect(sw.laps[0].title).toEqual('Lap 1');

                // Validation of the step #2
                expect(sw.laps[1].title).toEqual('Lap 2');

                done();
            })
        })
    })

    test('reset functionality clears the splitted laps', function (done) {

        var sw = new Stopwatch();
        sw.start();

        _dummyProcessor.process(function () {
            sw.split();

            _dummyProcessor.process(function () {
                sw.split();
                sw.reset();

                sw.reset();

                expect(sw.laps.length).toEqual(0);

                done();
            })
        })
    })

    test('restart functionality clears the splitted laps', function (done) {

        var sw = new Stopwatch();
        sw.start();

        _dummyProcessor.process(function () {
            sw.split();

            _dummyProcessor.process(function () {
                sw.split();
                sw.restart();

                expect(sw.laps.length).toEqual(0);

                done();
            })
        })
    })
})