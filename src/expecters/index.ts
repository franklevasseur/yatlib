import _ from 'lodash'
import * as typings from '../typings'
import { ArrayExpecter } from './array'
import { BaseExpecter } from './base'
import { BooleanExpecter } from './boolean'
import { FunctionExpecter } from './function'
import { ObjectExpecter } from './object'
import { PromiseExpecter } from './promise'

export const expect: typings.ExpectFn = (<T>(x: T) => {
  if (_.isBoolean(x)) {
    return new BooleanExpecter(x)
  }

  if (_.isArray(x)) {
    return new ArrayExpecter(x)
  }

  if (x instanceof Promise) {
    return new PromiseExpecter(x)
  }

  if (_.isFunction(x)) {
    return new FunctionExpecter(x)
  }

  if (_.isObject(x)) {
    return new ObjectExpecter(x)
  }

  return new BaseExpecter(x)
}) as typings.ExpectFn
