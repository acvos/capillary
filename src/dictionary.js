import pipe from 'function-pipe'
import fragment from './fragment'
import * as flow from './flow'
import * as state from './state'
import * as essentials from './essentials'

// The lift
export const lift = (func, config) =>
  fragment(flow.functionCall(state.lift(func)), config)

export const call = (func, config) =>
  fragment(flow.functionCall(func), config)

// Lenses
export const get = call(state.get, 'get')
export const set = call(state.set, 'set')

export const lens = location => {
  const Lens = get(location)
  Lens.get = get(location)
  Lens.set = value => set(location, value)

  return Lens
}

export const data = x => lens('')(x)
export const id   = x => get('')(x)
export const end  = lift(() => undefined)

// Transformer fragments
export const not         = lift(essentials.not, 'not')
export const and         = lift(essentials.and, 'and')
export const or          = lift(essentials.or, 'or')
export const xor         = lift(essentials.xor, 'xor')
export const add         = lift(essentials.add, 'add')
export const subtract    = lift(essentials.subtract, 'subtract')
export const multiply    = lift(essentials.multiply, 'multiply')
export const divide      = lift(essentials.divide, 'divide')
export const uppercase   = lift(essentials.uppercase, 'uppercase')
export const lowercase   = lift(essentials.lowercase, 'lowercase')
export const join        = lift(essentials.join, 'join')
export const split       = lift(essentials.split, 'split')
export const eq          = lift(essentials.eq, 'eq')
export const neq         = lift(essentials.neq, 'neq')
export const gt          = lift(essentials.gt, 'gt')
export const lt          = lift(essentials.lt, 'lt')
export const gte         = lift(essentials.gte, 'gte')
export const lte         = lift(essentials.lte, 'lte')
export const isDefined   = lift(essentials.isDefined, 'isDefined')
export const isUndefined = lift(essentials.isUndefined, 'isUndefined')
export const array       = lift(essentials.array, 'array')
export const values      = lift(essentials.values, 'values')
export const keys        = lift(essentials.keys, 'keys')
export const head        = lift(essentials.head, 'head')
export const tail        = lift(essentials.tail, 'tail')
export const count       = lift(essentials.count, 'count')
export const zip         = lift(essentials.zip, 'zip')
export const concat      = lift(essentials.concat, 'concat')
export const push        = lift(essentials.push, 'push')
export const select      = lift(essentials.select, 'select')
export const exclude     = lift(essentials.exclude, 'exclude')
export const merge       = lift(essentials.merge, 'merge')
export const slice       = lift(essentials.slice, 'slice')

// Base control flow fragments
export const chain  = fragment(flow.chain, 'chain')
export const all    = fragment(flow.all, 'all')
export const when   = fragment(flow.when, 'when')
export const either = fragment(flow.either, 'either')
export const map    = fragment(flow.map, 'map')
export const filter = fragment(flow.filter, 'filter')
