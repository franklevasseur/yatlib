import { Expecter } from 'src/typings'
import { BaseExpecter } from './base'

export class ObjectExpecter<T extends Object> extends BaseExpecter<T> implements Expecter<Object> {
  public get not(): this {
    this.invert()
    return this
  }

  public toHaveKey(k: keyof Object): void {
    const res = this.x[k] !== undefined
    this.assert(res, { subject: `${JSON.stringify(this.x)}`, predicate: `have key "${k}"` })
  }

  public toHaveEntry<K extends keyof Object>(k: K, v: T[K]): void {
    const res = this.x[k] === v
    this.assert(res, { subject: `${JSON.stringify(this.x)}`, predicate: `have entry "${JSON.stringify({ [k]: v })}"` })
  }
}
