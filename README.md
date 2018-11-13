# vanil-stopwatch-js v1.0.1

"vanil-stopwatch-js" is a simple (Similar to dotnet's) stopwatch library for monitoring performance. Both node.js and browser compatible.

You can get the latest release from the official [npmjs.com feed](https://www.npmjs.com/package/vanil-stopwatch-js) or from the [github releases page](https://github.com/denizkanmaz/vanil-stopwatch-js/releases).

[![Build Status](https://travis-ci.com/denizkanmaz/vanil-stopwatch-js.svg?branch=master)](https://travis-ci.com/denizkanmaz/vanil-stopwatch-js)

## Getting Started

### Importing the module
#### Node.js:
```javascript
// Import the module.
var Stopwatch = require('vanil-stopwatch-js');
```
#### Browser:
```html
<!-- Import the script file (Prefer the minimized version of the module) -->
<script src="vanil-stopwatch.min.js"></script>
```

### Initialization and starting the measurement
#### Option 1:
```javascript
// Import the module.
var Stopwatch = require('vanil-stopwatch-js');

// Initialize an instance.
var sw = new Stopwatch();

// Start the measurement.
sw.start();
```
#### Option 2:
```javascript
// Import the module.
var Stopwatch = require('vanil-stopwatch-js');

// Initialize an instance and start it immediately.
var sw = new Stopwatch(true);
```
### Getting the elapsed time
```javascript
// Import the module.
var Stopwatch = require('vanil-stopwatch-js');

// Initialize an instance and start it immediately.
var sw = new Stopwatch(true);

// Do an async process.
setTimeout(function(){
    // Stop the current measurement
    sw.stop();

    // Printout the elapsed time in milliseconds.
    console.log(sw.elapsedMilliseconds)

    // Printout the elapsed time in seconds.
    console.log(sw.elapsedTime.seconds)

    // Printout the elapsed time in minutes.
    console.log(sw.elapsedTime.minutes)

    // Printout the elapsed time in hours.
    console.log(sw.elapsedTime.hours)
}, 200)
```
  
### Splitting the measurement
You can split the measurement to laps while it runs.
```javascript
// Import the module.
var Stopwatch = require('vanil-stopwatch-js');

// Initialize an instance and start it immediately.
var sw = new Stopwatch(true);

// Do two different process sequentially.

// Process #1
setTimeout(function(){

    // Split the measurement.
    sw.split('Process #1 done.');

    // Process #2
    setTimeout(function(){

        // Split the measurement.
        sw.split('Process #2 done.')

        // Stop the measurement.
        sw.stop();

        // Printout the measurement in milliseconds.
        console.log(sw.elapsedMilliseconds)

        // Printout the splitted measurement.
        console.log(sw.laps);

    }, 200)
}, 200)
```
## Versioning

Used [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/denizkanmaz/vanil-stopwatch-js/tags). 

## Authors

* **[Deniz Kanmaz (denizkanmaz@gmail.com)](https://github.com/denizkanmaz)** - *Initial work*

## License

This project is licensed under the MIT Licece - see the [LICENSE.md](LICENSE.md) file for details.

NOTICE: This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
