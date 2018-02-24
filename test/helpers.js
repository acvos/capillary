import expect from 'expect'
import { message, resolve } from '../src'
import { anything } from './samples'

const wrap = values => [
  ...values.map(message),
  ...values.reduce((acc, layer1) => acc.concat(
    [...anything].map(layer2 => message(layer1, layer2))
  ), [])
]

const forceSet = xs => (xs instanceof Set ? [...xs] : [xs])
const forceArray = xs => (xs instanceof Array ? xs : [xs])

const permutations = (inputs, flows) => wrap(forceSet(inputs))
  .reduce((acc, x) => acc.concat(forceArray(flows).map(f => f(x))), [])

export const verify = (given, flows, expected) => () => Promise
  .all(permutations(given, flows).map(resolve))
  .then(xs => xs.forEach(x => expect(x).toEqual(expected)))
