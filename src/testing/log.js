import { extract } from '../store'

const log = input => {
  if (input instanceof Promise) {
    return input.then(log)
  }

  console.log(extract(input))

  return input
}

export default log
