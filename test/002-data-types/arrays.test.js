import { verify } from '../helpers'
import { anything, arrays, strings, objects } from '../samples'

import { all, values, chain, keys } from '../../src'

const st = (strings, ...args) => strings.reduce((acc, next, i) => acc + next + JSON.stringify(args[i]), '')

describe('Array construction from constants', () => {
  describe('values(x) - create array from single fragment output', () => {
    const test = (i, o) => {
      it(st`* -> values(${i}) -> ${o}`, verify(anything, values(i), o))
      it(st`* -> chain(values(${i})) -> ${o}`, verify(anything, chain(values(i)), o))
    }

    arrays.forEach(xs => test(xs, xs))
    strings.forEach(xs => test(xs, Object.values(xs)))
    objects.forEach(xs => test(xs, Object.values(xs)))
  })

  describe('all(x, y, z...) - create array from fragment outputs', () => {
    arrays.forEach(xs => {
      it(st`* -> all(${xs}) -> ${xs}`, verify(anything, all(...xs), xs))
      it(st`* -> chain(all(${xs})) -> ${xs}`, verify(anything, chain(all(...xs)), xs))
      it(st`* -> values(all(${xs})) -> ${xs}`, verify(anything, values(all(...xs)), xs))
      it(st`* -> chain(all(${xs}), values) -> ${xs}`, verify(anything, chain(all(...xs), values), xs))
    })
  })

  describe('all(x) -> [x]', () => {
    anything.forEach(xs => {
      it(st`* -> all(${xs}) -> ${xs}`, verify(anything, all(xs), [xs]))
      it(st`* -> chain(all(${xs})) -> ${xs}`, verify(anything, chain(all(xs)), [xs]))
    })
  })
})

describe('Array construction from inputs', () => {
  const test = (i, o) => {
    it(st`${i} -> values -> ${o}`, verify(i, values, o))
    it(st`${i}  -> chain(values) -> ${o}`, verify(i, chain(values), o))
  }

  arrays.forEach(xs => test(xs, xs))
  strings.forEach(xs => test(xs, Object.values(xs)))
  objects.forEach(xs => test(xs, Object.values(xs)))
})

describe('Array construction from object keys', () => {
  const test = (i, o) => {
    it(st`${i} -> keys -> ${o}`, verify(i, keys, o))
    it(st`${i}  -> chain(keys) -> ${o}`, verify(i, chain(keys), o))
  }

  objects.forEach(xs => test(xs, Object.keys(xs)))
})
