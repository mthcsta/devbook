const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const FriendController = require('./controllers/FriendController')


routes.get('/', (request, response)=>{
    return response.json({titulo: 'DevBook', 'descrição':'Projeto de facebook para developers'})
})



routes.get('/user', UserController.index)
routes.post('/user', UserController.create)

routes.get('/post', PostController.index)
routes.post('/post', PostController.create)
routes.put('/post/:id', PostController.put)
routes.delete('/post/:id', PostController.delete)

routes.get('/friend/:id', FriendController.index)
routes.post('/friend', FriendController.request)
routes.put('/friend/:id', FriendController.response)
routes.delete('/friend/:id', FriendController.delete)







module.exports = routes
