import { read, write } from '../path'
import isObject from '../utils/is-object'

function Message(layers) {
  this.layers = layers || []
}

const normalize = args => isObject(args) ? args : ({ $$data: args })
const denormalize = layer => layer.hasOwnProperty('$$data') ? layer.$$data : layer

export const isInstance = data => data instanceof Message

export const construct = (data, ...scopes) => isInstance(data)
  ? data
  : new Message([normalize(data), ...scopes])

export const extract = input => isInstance(input)
  ? denormalize(input.layers[0])
  : input

export const collapse = input => isInstance(input)
  ? ({
    data: extract(input),
    scope: input.layers.slice(1).reduce((acc, next) => ({ ...acc, ...next }), {})
  })
  : ({ data: input, scope: {} })

export const combine = (input, output) =>
  construct(output.layers[0], ...output.layers.slice(1).concat(input.layers))

export const extend = func => input =>
  construct(func(construct(input)), ...construct(input).layers.slice(1))

export const get = (location, input) => {
  const path = extract(location)
  if (path === '') {
    return input
  }

  let i, value
  for (i in input.layers) {
    value = read(path, input.layers[i])
    if (value !== undefined) break
  }

  return construct(value, ...input.layers)
}

export const set = (location, value, input) =>
  construct(
    input.layers[0],
    write(extract(location), extract(value), {}),
    ...input.layers.slice(1)
  )
