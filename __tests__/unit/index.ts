import { database } from './database'

export const index = () => describe('Api test', () => {
  test('Test Deployment', async (done) => {
    try {
      done()
    } catch (error) {
      done(error)
    }
  })
})
