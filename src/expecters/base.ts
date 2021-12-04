import { BaseExpecter as IBaseExpecter, Expecter, Predicate } from 'src/typings'
import { ExpectationError, FailureReason } from './expect-error'

export class BaseExpecter<T> implements IBaseExpecter<T> {
  private _inverted: boolean = false

  constructor(protected x: T) {}

  public get not(): this {
    this.invert()
    return this
  }

  public toBe(y: T): void {
    const res = this.x === y
    this.assert(res, { subject: `${this.x}`, predicate: `be ${y}` })
  }

  public toBeTruthy(): void {
    const res = !!this.x
    this.assert(res, { subject: `${this.x}`, predicate: 'be truthy' })
  }

  public toBeFalsy(): void {
    const res = !this.x
    this.assert(res, { subject: `${this.x}`, predicate: 'be falsy' })
  }

  public toAccordWith(p: Predicate<T>): void {
    const res = p(this.x)
    this.assert(res, { subject: `${this.x}`, predicate: 'accord with predicate' })
  }

  protected invert(): void {
    this._inverted = !this._inverted
  }

  protected assert(b: boolean, reason: FailureReason): void | never {
    if (this._inverted === b) {
      throw new ExpectationError(reason, this._inverted)
    }
  }
}
