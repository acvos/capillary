import util from 'util'
import { fragment, resolve } from '../src/continuation'

const log = x => console.log(util.inspect(x, false, null, true))


const uppercase = fragment(x => String(x).toUpperCase())
const split = fragment(xs => xs.split(''))

const test1 = split(uppercase())
const test2 = split(uppercase)
const test3 = split('wow')

const doge = 'doge'

log(resolve(doge, test1))
log(resolve(doge, test2))
log(resolve(doge, test3))
