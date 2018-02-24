import polyMap from 'poly-map'
import { extend } from './store'
import { collect } from './state'
import { sequential, parallel } from './transport'
import isObject from './utils/is-object'

const constant = x => extend(() => x)

const collection = items => sequential([
  parallel(polyMap(structure, items)),
  collect
])

const structure = predicate => {
  if (typeof predicate === 'function') {
    return predicate
  }

  if (isObject(predicate) || predicate instanceof Array) {
    return collection(predicate)
  }

  return constant(predicate)
}

export default structure
