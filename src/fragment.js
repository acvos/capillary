import uuid from 'uuid'
import { isInstance as isStore, trace } from './store'
import structure from './structure'
import { sequential } from './transport'

const descriptor = (config = {}) => {
  if (typeof config === 'string') {
    return ({ name: config, paramsters: [] })
  }

  return ({
    name: config.name || uuid.v4(),
    paramsters: config.parameters || []
  })
}

const fragment = (func, config) => {
  const { name, parameters } = descriptor(config)

  const Fragment = (...args) => {
    const args_resolved = args
      .map(structure)
      .map(f => (f.$class === 'Fragment' ? f() : f))

    const handler = func(...args_resolved)
    const Flow = sequential([handler, trace(name)])

    return (isStore(args[0]) ? Flow(args[0]) : Flow)
  }

  Fragment.$class = 'Fragment'

  return Fragment
}

export default fragment;
