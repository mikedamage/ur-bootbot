const EventEmitter = require('events');
const moment = require('moment');

class CountdownTimer extends EventEmitter {
  static get defaults() {
    return {
      units: 'seconds',
      resolution: 1000,
    };
  }

  constructor(duration, options = {}) {
    super();
    this.options = Object.assign({}, this.constructor.defaults, options);
    this._duration = moment.duration(parseInt(duration, 10), this.options.units);
    this._remaining = this.milliseconds;
    this.timer = null;
  }

  get duration() {
    return this._duration;
  }

  set duration(num) {
    this._duration = moment.duration(num, options.units);
  }

  get milliseconds() {
    return this.duration.as('milliseconds');
  }

  get remaining() {
    return moment.duration(this._remaining, 'milliseconds');
  }

  start() {
    this.emit('start', this.duration, this.remaining);
    this.timer = setInterval(this.tick.bind(this), this.options.resolution);
  }

  stop() {
    this.emit('stop');
    this._clearTimer();
    this._remaining = 0;
  }

  pause() {
    this._clearTimer();
    this.emit('pause', this.duration, this.remaining);
  }

  reset() {
    this._clearTimer();
    this.remaining = this.milliseconds;
    this.emit('reset');
  }

  tick() {
    this._remaining -= this.options.resolution;

    if (this._remaining <= 0) {
      this.stop();
      this.emit('done');
    }

    this.emit('tick', this.remaining);
  }

  _clearTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }
}

module.exports = CountdownTimer;
