import util from 'util'
import { lift, uppercase, split, all, chain, get, set, map, filter, eq, object } from '../src'

const state = {
  users: [
    { id: 1, first_name: 'Waylon', last_name: 'Dalton', email: 'wdalton@test.com' },
    { id: 2, first_name: 'Justine', last_name: 'Henderson', email: 'jhenderson@test.com' },
    { id: 3, first_name: 'Abdullah', last_name: 'Lang', email: 'alang@test.com' },
    { id: 4, first_name: 'Marcus', last_name: 'Cruz', email: 'mcruz@test.com' },
    { id: 5, first_name: 'Thalia', last_name: 'Cobb', email: 'tcobb@test.com' },
    { id: 6, first_name: 'Mathias', last_name: 'Little', email: 'mlittle@test.com' },
    { id: 7, first_name: 'Eddie', last_name: 'Randolph', email: 'erandolph@test.com' },
    { id: 8, first_name: 'Angela', last_name: 'Walker', email: 'awalker@test.com' },
  ],
  messages: [
    { id: 1, user: 1, timestamp: '2018-02-11 10:00', text: 'Some text' },
    { id: 2, user: 2, timestamp: '2018-02-11 10:10', text: 'Hello' },
    { id: 3, user: 3, timestamp: '2018-02-11 10:15', text: 'Wow' },
    { id: 4, user: 4, timestamp: '2018-02-11 10:10', text: 'Much message' },
    { id: 5, user: 5, timestamp: '2018-02-11 10:20', text: 'What\'s your name?' },
    { id: 6, user: 6, timestamp: '2018-02-11 10:23', text: 'Doge' },
    { id: 7, user: 7, timestamp: '2018-02-11 10:18', text: 'Wow wow' },
    { id: 8, user: 8, timestamp: '2018-02-11 09:50', text: 'It rains outside' },
    { id: 9, user: 1, timestamp: '2018-02-11 11:00', text: 'Some other text' },
    { id: 10, user: 2, timestamp: '2018-02-10 22:55', text: 'Testing test' },
    { id: 11, user: 3, timestamp: '2018-02-10 22:42', text: 'This testing is boring' },
    { id: 12, user: 4, timestamp: '2018-02-10 22:41', text: 'Such wow' },
    { id: 13, user: 5, timestamp: '2018-02-10 22:15', text: 'Very test' },
    { id: 14, user: 6, timestamp: '2018-02-10 22:30', text: 'Doge Approve' },
    { id: 15, user: 7, timestamp: '2018-02-10 22:02', text: 'I forgot timestamps' },
    { id: 16, user: 8, timestamp: '2018-02-10 22:17', text: 'Almost there' },
    { id: 17, user: 2, timestamp: '2018-02-10 22:50', text: 'I am a random number generator' },
    { id: 18, user: 4, timestamp: '2018-02-10 22:33', text: 'Break the doge convention' },
    { id: 19, user: 5, timestamp: '2018-02-10 22:22', text: 'Something to remember' },
    { id: 20, user: 7, timestamp: '2018-02-10 22:11', text: 'The end' }
  ],
}

const flow = all(uppercase(get('x')), split(get('divider')))

const log = x => Promise.resolve(x).then(d =>
  console.log(util.inspect(d, {showHidden: false, depth: null}))
)


log(flow({ x: 'doge-such-much', divider: '-' }))
