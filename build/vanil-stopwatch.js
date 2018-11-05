"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//  Copyright (c) 2018-present, Deniz Kanmaz. All rights reserved.
//  This source code is licensed under the MIT Licence.
//  Use of this source code is governed by a license
//  that can be found in the LICENSE file.
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  LICENSE file for more details.
//  vanil-stopwatch-js v1.0.0-beta1

/**
 * Class representing a stopwatch.
 */
var Stopwatch =
/*#__PURE__*/
function () {
  /**
   * Initializes a new instance of the StopWatch class.
   * @param {boolean} startImmediately The instance starts immediatelly 
   * if this field is true.
   */
  function Stopwatch(startImmediately) {
    var _this = this;

    _classCallCheck(this, Stopwatch);

    _defineProperty(this, "_timeStarted", null);

    _defineProperty(this, "_timeStoped", null);

    _defineProperty(this, "_running", false);

    _defineProperty(this, "_laps", []);

    _defineProperty(this, "split", function (title) {
      _this._laps.push({
        title: title || "Lap ".concat(_this._laps.length + 1),
        elapsedTime: _this.elapsedTime
      });
    });

    _defineProperty(this, "start", function () {
      if (_this._running === true) {
        return;
      }

      _this._laps = [];
      _this._timeStarted = new Date();
      _this._running = true;
    });

    _defineProperty(this, "stop", function () {
      _this._timeStoped = new Date();
      _this._running = false;
    });

    _defineProperty(this, "reset", function () {
      _this.stop();

      _this._timeStarted = null;
      _this._timeStoped = null;
      _this._laps = [];
    });

    _defineProperty(this, "restart", function () {
      _this.reset();

      _this.start();
    });

    if (startImmediately === true) {
      this.start();
    }
  }

  _createClass(Stopwatch, [{
    key: "laps",

    /**
     * Gets the collected laps via split function.
     */
    get: function get() {
      return this._laps;
    }
    /**
     * Gets whether the instance is running.
     */

  }, {
    key: "isRunning",
    get: function get() {
      return this._running;
    }
    /**
     * Starts measuring elapsed time.
     */

  }, {
    key: "elapsedMilliseconds",

    /**
     * Gets the total elapsed time, in milliseconds.
     */
    get: function get() {
      if (this._timeStarted === null) {
        return 0;
      }

      if (this._running) {
        return new Date() - this._timeStarted;
      }

      return this._timeStoped - this._timeStarted;
    }
    /**
     * Gets the total elapsed time.
     */

  }, {
    key: "elapsedTime",
    get: function get() {
      return {
        milliseconds: this.elapsedMilliseconds,
        seconds: this.elapsedMilliseconds / 1000,
        minutes: this.elapsedMilliseconds / 1000 / 60,
        hours: this.elapsedMilliseconds / 1000 / 60 / 60
      };
    }
  }]);

  return Stopwatch;
}();

module.exports = Stopwatch;