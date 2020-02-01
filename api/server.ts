import App from './App'
import Docker from './controllers/Docker'
const app = new App()

// app.server().listen(app.apiPort(), () => {
//   console.log(`Running Api in ${app.apiPort()}`)
// })

Docker.deploy('testeteste')
