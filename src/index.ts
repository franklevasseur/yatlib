import { expect } from './expecters'
import { Logger } from './logger'
import * as typings from './typings'

class YATLIB implements typings.YATLIB {
  private _logger = new Logger()
  private _tests: typings.TestEntry[] = []

  constructor() {}

  public get tests() {
    return [...this._tests]
  }

  public expect: typings.ExpectFn = expect.bind(this)

  public test = async (t: typings.TestDef): Promise<void> => {
    let success: boolean
    try {
      await t.handler()
      this._logger.log(Logger.prefix.pass, t.name)
      success = true
    } catch (thrown) {
      const err = thrown instanceof Error ? thrown : new Error(`${thrown}`)
      this._logger.log(Logger.prefix.fail, t.name, '->', err.message)
      success = false
    }

    this._tests.push({
      ...t,
      success
    })
  }
}

export default new YATLIB()
