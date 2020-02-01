import { databaseTest } from './unit/database'
import { index } from './unit/index'

describe('Init', () => {
  databaseTest()
  index()
})
