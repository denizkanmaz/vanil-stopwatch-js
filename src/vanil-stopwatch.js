/**
 * Class representing a stopwatch.
 */
class Stopwatch {

    /**
     * Initializes a new instance of the StopWatch class.
     * @param {boolean} startImmediately The instance starts immediatelly 
     * if this field is true.
     */
    constructor(startImmediately) {
        if (startImmediately === true) {
            this.start();
        }
    }

    _timeStarted = null;
    _timeStoped = null;
    _running = false;
    _laps = [];

    /**
     * Collects the elapsed time with given title.
     */
    split = (title) => {
        this._laps.push({
            title: title || `Lap ${(this._laps.length + 1)}`,
            elapsedTime: this.elapsedTime
        })
    }

    /**
     * Gets the collected laps via split function.
     */
    get laps() {
        return this._laps;
    }

    /**
     * Gets whether the instance is running.
     */
    get isRunning(){
        return this._running;
    }

    /**
     * Starts measuring elapsed time.
     */
    start = () => {
        if (this._running === true) { return; }

        this._laps = [];
        this._timeStarted = new Date();
        this._running = true;
    }

    /**
     * Stops measuring elapsed time.
     */
    stop = () => {
        this._timeStoped = new Date();
        this._running = false;
    }

    /**
     * Stops time interval measurement and resets the elapsed time to zero.
     */
    reset = () => {
        this.stop();
        this._timeStarted = null;
        this._timeStoped = null;
        this._laps = [];
    }

    /**
     * Stops time interval measurement, resets the elapsed time to zero and
     * starts measuring elapsed time.
     */
    restart = () => {
        this.reset();
        this.start();
    }

    /**
     * Gets the total elapsed time, in milliseconds.
     */
    get elapsedMilliseconds() {

        if (this._timeStarted === null) {
            return 0;
        }

        if (this._running) {
            return (new Date() - this._timeStarted);
        }

        return (this._timeStoped - this._timeStarted);
    }

    /**
     * Gets the total elapsed time.
     */
    get elapsedTime() {
        return {
            milliseconds: this.elapsedMilliseconds,
            seconds: this.elapsedMilliseconds / 1000,
            minutes: (this.elapsedMilliseconds / 1000) / 60,
            hours: ((this.elapsedMilliseconds / 1000) / 60) / 60
        }
    }
}

module.exports = Stopwatch