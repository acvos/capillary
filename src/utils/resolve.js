import { message } from '../store'

const resolve = flow => Promise
  .resolve(typeof flow === 'function' ? flow(message()) : flow)
  .then(message.extract)

export default resolve
