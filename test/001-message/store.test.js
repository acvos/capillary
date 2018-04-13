import expect from 'expect'
import pipe from 'function-pipe'
import { message, get, set } from '../../src'

describe('Stote comonad: set & get', function () {
  let test = message()

  it('Empty message contains undefined data', () => {
    expect(message.extract(test)).toEqual(undefined)
  })

  it('set() does not affect the top layer', () => {
    test = message.set('doge', 'wow!', test)
    expect(message.extract(test)).toEqual(undefined)
  })

  it('get() adds a new top layer', () => {
    test = message.get('doge', test)
    expect(message.extract(test)).toEqual('wow!')
  })

  it('Deep set() and get()', () => {
    test = message.set('such.much.very', 'doge', test)
    expect(message.extract(test)).toEqual('wow!')

    test = message.get('such.much.very', test)
    expect(message.extract(test)).toEqual('doge')
  })

  it('get() from different layers', () => {
    test = message.get('doge', test)
    expect(message.extract(test)).toEqual('wow!')
  })
})
