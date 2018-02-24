import * as transport from './transport'
import fragment from './fragment'
import * as store from './store'
import log from './utils/log'
import resolve from './utils/resolve'

const message = store.message

export const configure = (config) => {
  transport.setTransport(config)
  store.setStore(config)
}

configure({
  transport: 'async',
  store: 'message'
})

export { message, transport, fragment, log, resolve }
export * from './dictionary'