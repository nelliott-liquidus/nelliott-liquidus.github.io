export default class ExecutionTime {
  start() {
    this.hrstart = process.hrtime()
  }
  stop() {
    var diff = process.hrtime(this.hrstart)
    const nanoseconds = (diff[0] * 1e9) + diff[1];
    const milliseconds = nanoseconds / 1e6;
    const seconds = nanoseconds / 1e9;

  	return {
  		seconds,
  		milliseconds,
  		nanoseconds
  	}
  }
}
