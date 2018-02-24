const isObject = x => (
  x !== null &&
  x !== undefined &&
  x.constructor &&
  x.constructor.name === 'Object'
)

export default isObject
