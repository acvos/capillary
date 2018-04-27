import map from 'poly-map'
import curry from 'curry'

const resolve = curry((scope, f) => {
  const bound = map(resolve(scope), f.$$args)
  const unbound = new Array(f.$$arity - f.$$args.length)
  const args = bound.concat(unbound.fill(scope))

  return f.$$resolver.apply(undefined, args)
})

export default resolve
