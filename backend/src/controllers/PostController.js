const connection = require('../database/connection')
const {pick} = require('lodash')

module.exports = {
    async index(request, response){
        const LIMIT_POST = 5

        const { page = 1 } = request.body

        const conditions = pick(request.body, ['user_id'])

        const data = await connection('posts')
            .limit(LIMIT_POST)
            .offset((page-1)*LIMIT_POST)
            .select('*')
            .where(conditions)

        return response.json(data)
    },
    async create(request, response){
        const { content } = request.body

        const user_id = request.headers.authorization

        const data = await connection('posts').insert({
            user_id,
            content
        })

        return response.json(data)
    },
    async put(request, response){
        const { id } = request.params
        const { content } = request.body
        const user_id = request.headers.authorization

        const postUpdated = await connection('posts')
            .where({ id, user_id })
            .update({ content, updated_at: connection.fn.now()})
            
        return postUpdated ?
            response.json(postUpdated)
        :
            response.status(417).json({error: 'Expectation Failed'})
    },
    async delete(request, response){
        const { id } = request.params
        const user_id = request.headers.authorization
        const postDeleted = await connection('posts')
            .where({ id, user_id})
            .first()
            .delete()
        return postDeleted ? 
            response.json(postDeleted) 
        : 
            response.status(417).json({error: 'Expectation Failed'})
    }
}