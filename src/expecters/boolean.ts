import { Expecter } from 'src/typings'
import { BaseExpecter } from './base'

export class BooleanExpecter extends BaseExpecter<boolean> implements Expecter<boolean> {
  public get not(): this {
    this.invert()
    return this
  }

  public toBeTrue() {
    this.assert(this.x, { subject: `${this.x}`, predicate: 'be true' })
  }

  public toBeFalse() {
    this.assert(!this.x, { subject: `${this.x}`, predicate: 'be false' })
  }
}
