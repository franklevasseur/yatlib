import { Expecter } from 'src/typings'
import { BaseExpecter } from './base'

export class FunctionExpecter<Q> extends BaseExpecter<() => Q> implements Expecter<() => Q> {
  public get not(): this {
    this.invert()
    return this
  }

  public toThrow(): void {
    let err
    try {
      this.x()
    } catch (e) {
      err = e
    }

    this.assert(!!err, { subject: 'function', predicate: 'throw' })
  }

  public toReturn(): void {
    let err
    try {
      this.x()
    } catch (e) {
      err = e
    }

    this.assert(!err, { subject: 'function', predicate: 'return' })
  }

  public toThrowWith(expected: any): void {
    let actual
    try {
      this.x()
    } catch (e) {
      actual = e
    }

    this.assert(!!actual, { subject: 'function', predicate: 'throw' })
    this.assert(actual === expected, { subject: `${actual}`, predicate: `be ${expected}` })
  }

  public toReturnWith(q: Q): void {
    let err
    let y: Q | undefined
    try {
      y = this.x()
    } catch (e) {
      err = e
    }

    this.assert(!err, { subject: 'function', predicate: 'return' })
    this.assert(y === q, { subject: `${y}`, predicate: `be ${q}` })
  }

  public async toThrowAccordingTo(p: (err: any) => boolean): Promise<void> {
    let actual
    try {
      this.x()
    } catch (e) {
      actual = e
    }

    this.assert(!!actual, { subject: 'function', predicate: 'throw' })
    this.assert(p(actual), { subject: `${actual}`, predicate: 'accord with predicate' })
  }

  public async toReturnAccordingTo(p: (q: Q) => boolean): Promise<void> {
    let err
    let y: Q | undefined
    try {
      y = this.x()
    } catch (e) {
      err = e
    }

    this.assert(!err, { subject: 'function', predicate: 'return' })
    this.assert(p(y as Q), { subject: `${y}`, predicate: 'accord with predicate' })
  }
}
