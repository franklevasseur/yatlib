import chalk from 'chalk'

const DEBUG_PREFIX = chalk.blue('DEBUG')
const INFO_PREFIX = chalk.green('INFO')
const WARN_PREFIX = chalk.yellow('WARN')
const ERROR_PREFIX = chalk.red('ERROR')

const PASS_PREFIX = chalk.green('PASS')
const FAIL_PREFIX = chalk.red('FAIL')

export class Logger {
  public static get prefix() {
    return {
      debug: DEBUG_PREFIX,
      info: INFO_PREFIX,
      warn: WARN_PREFIX,
      error: ERROR_PREFIX,
      pass: PASS_PREFIX,
      fail: FAIL_PREFIX
    }
  }

  constructor(private err?: Error) {}

  public attachError(err: Error) {
    return new Logger(err)
  }

  public debug(...msg: string[]) {
    this.log(DEBUG_PREFIX, ...msg)
  }

  public info(...msg: string[]) {
    this.log(INFO_PREFIX, ...msg)
  }

  public warning(...msg: string[]) {
    this.log(WARN_PREFIX, ...msg)
  }

  public error(...msg: string[]) {
    this.log(ERROR_PREFIX, ...msg)
  }

  public log(prefix: string, ...msg: string[]) {
    const text = msg.join(' ')
    if (!this.err) {
      // eslint-disable-next-line no-console
      console.log(`[${prefix}]: ${text}`)
      return
    }
    // eslint-disable-next-line no-console
    console.log(`[${prefix}]: ${text}: ${this.err}\n${this.err.stack}`)
  }
}
