import { Expecter } from 'src/typings'
import { BaseExpecter } from './base'

export class ArrayExpecter<Q> extends BaseExpecter<Q[]> implements Expecter<Q[]> {
  public get not(): this {
    this.invert()
    return this
  }

  public toHaveLength(n: number): void {
    const res = this.x.length === n
    this.assert(res, { subject: 'array', predicate: `have length ${n}` })
  }

  public toInclude(q: Q): void {
    const res = this.x.includes(q)
    this.assert(res, { subject: 'array', predicate: `include ${q}` })
  }

  public some(predicate: (q: Q) => boolean): void {
    const res = this.x.some(predicate)
    this.assert(res, { subject: 'array', predicate: 'have some elements conforming to predicate' })
  }

  public none(predicate: (q: Q) => boolean): void {
    const res = !this.x.some(predicate)
    this.assert(res, { subject: 'array', predicate: 'have no elements conforming to predicate' })
  }

  public every(predicate: (q: Q) => boolean): void {
    const res = this.x.every(predicate)
    this.assert(res, { subject: 'array', predicate: 'have every elements conforming to predicate' })
  }
}
