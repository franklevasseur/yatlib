import { Expecter } from '../typings'
import { BaseExpecter } from './base'

export class PromiseExpecter<Q> extends BaseExpecter<Promise<Q>> implements Expecter<Promise<Q>> {
  public get not(): this {
    this.invert()
    return this
  }

  public async toReject(): Promise<void> {
    let err
    try {
      await this.x
    } catch (e) {
      err = e
    }

    this.assert(!!err, { subject: 'promise', predicate: 'reject' })
  }

  public async toResolve(): Promise<void> {
    let err
    try {
      await this.x
    } catch (e) {
      err = e
    }

    this.assert(!err, { subject: 'promise', predicate: 'resolve' })
  }

  public async toRejectWith(expected: any): Promise<void> {
    let actual
    try {
      await this.x
    } catch (e) {
      actual = e
    }

    this.assert(!!actual, { subject: 'promise', predicate: 'reject' })
    this.assert(actual === expected, { subject: `${actual}`, predicate: `be ${expected}` })
  }

  public async toResolveWith(q: Q): Promise<void> {
    let err
    let y: Q | undefined
    try {
      y = await this.x
    } catch (e) {
      err = e
    }

    this.assert(!err, { subject: 'promise', predicate: 'resolve' })
    this.assert(y === q, { subject: `${y}`, predicate: `be ${q}` })
  }

  public async toRejectAccordingTo(p: (err: any) => boolean): Promise<void> {
    let actual
    try {
      await this.x
    } catch (e) {
      actual = e
    }

    this.assert(!!actual, { subject: 'promise', predicate: 'reject' })
    this.assert(p(actual), { subject: `${actual}`, predicate: 'accord with predicate' })
  }

  public async toResolveAccordingTo(p: (q: Q) => boolean): Promise<void> {
    let err
    let y: Q | undefined
    try {
      y = await this.x
    } catch (e) {
      err = e
    }

    this.assert(!err, { subject: 'promise', predicate: 'resolve' })
    this.assert(p(y as Q), { subject: `${y}`, predicate: 'accord with predicate' })
  }
}
