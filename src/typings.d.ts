export type Predicate<Q> = (q: Q) => boolean
export type BaseExpecter<T> = {
  toBe(y: T): void
  toAccordWith(p: Predicate<T>): void
  toBeTruthy(): void
  toBeFalsy(): void
}

export type Expecter<T> = BaseExpecter<T> & { not: Expecter<T> } & (T extends boolean
    ? {
        toBeTrue(): void
        toBeFalse(): void
      }
    : T extends (infer Q)[]
    ? {
        toHaveLength(n: number): void
        toInclude(q: Q): void
        some(p: Predicate<Q>): void
        none(p: Predicate<Q>): void
        every(p: Predicate<Q>): void
      }
    : T extends Promise<infer Q>
    ? {
        toReject(): Promise<void>
        toResolve(): Promise<void>
        toRejectWith(err: any): Promise<void>
        toResolveWith(q: Q): Promise<void>
        toRejectAccordingTo(p: Predicate<any>): Promise<void>
        toResolveAccordingTo(p: Predicate<Q>): Promise<void>
      }
    : T extends () => infer Q
    ? {
        toThrow(): void
        toReturn(): void
        toThrowWith(err: any): void
        toReturnWith(q: Q): void
        toThrowAccordingTo(p: Predicate<any>): void
        toReturnAccordingTo(p: Predicate<Q>): void
      }
    : T extends Object
    ? {
        toHaveKey(k: keyof T): void
        toHaveEntry<K extends keyof T>(k: K, v: T[K]): void
      }
    : {})

export type ExpectFn = <T>(x: T) => Expecter<T>

export type TestDef = {
  name: string
  handler: () => Promise<Void>
}

export type TestEntry = TestDef & {
  success: boolean
}

export type YATLIB = {
  tests: TestEntry[]
  test: (t: TestDef<V>) => Promise<Void>
  expect: ExpectFn
}

const yatlib: YATLIB
export default yatlib
