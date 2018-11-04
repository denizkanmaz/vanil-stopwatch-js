function DummyProcessor(duration) {

    this.process = function (callback) {
        setTimeout(function () {
            callback();
        }, duration)
    }
}

module.exports = DummyProcessor