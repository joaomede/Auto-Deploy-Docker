import App from '../../api/App'
const app = new App()

app.server().listen(app.apiPort(), () => {
  console.log(`Running Api in ${app.apiPort()}`)
})

export const index = () => describe('Api test', () => {
  test('Auth Test', async (done) => {
    try {
      done()
    } catch (error) {
      done(error)
    }
  })
})
