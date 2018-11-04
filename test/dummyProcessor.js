//  Copyright (c) 2018-present, Deniz Kanmaz. All rights reserved.
//  This source code is licensed under the MIT Licence.
//  Use of this source code is governed by a license
//  that can be found in the LICENSE file.

//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  LICENSE file for more details.

/**
 * Initializes a new instance of the DummyProcessor class.
 * @param {number} duration Timeout duration for the process.
 */
function DummyProcessor(duration) {

    /**
     * Starts a dummy process.
     * @param {function} callback Function to call after the process end.
     */
    this.process = function (callback) {
        setTimeout(function () {
            callback();
        }, duration)
    }
}

module.exports = DummyProcessor