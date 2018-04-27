const constant = x => () => x

const isFunction = f => typeof f === 'function'
const isFragment = f => f.$$type === 'Fragment'

const fragment = (func, args = []) => {
  const handler = isFunction(func) ? func : constant(func)
  const arity = isFragment(handler) ? handler.$$arity : handler.length
  const bound = isFragment(handler) ? handler.$$args : []

  if (arity - bound.length < args.length) {
    throw new Error('[Fragment] Compile error: cannot bind more arguments than expected by the function')
  }

  const Fragment = (...xs) => fragment(handler, xs)
  Fragment.$$resolver = handler
  Fragment.$$type = 'Fragment'
  Fragment.$$arity = arity
  Fragment.$$args = [...bound, ...args.map(x => (isFragment(x) ? x : fragment(x)))]

  return Fragment
}

export default fragment
