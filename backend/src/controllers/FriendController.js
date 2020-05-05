const connection = require('../database/connection')

module.exports = {
    async index(request, response){

        const LIMIT_PER_PAGE = 5

        const { page = 1, status = 'accepted' }  = request.body

        const { id:user_id } = request.params

        const data = await connection('friends')
            .limit(LIMIT_PER_PAGE)
            .offset((page-1)*LIMIT_PER_PAGE)
            .where({ user_id, status }).orWhere({ friend_id: user_id, status })
            .select('*')

        return response.json(data)
    },
    async request(request, response){
        const { friend_id } = request.body
        const user_id = request.headers.authorization
        const status = 'request'
        const checkHasFriend = (await connection('friends').where({
            user_id,
            friend_id
        }).count())[0]["count(*)"]

        if(checkHasFriend){
            return response.status(417).json({error: "não autorizado."})
        }
        
        const data = await connection('friends').insert({
            user_id, 
            friend_id, 
            status
        })

        return response.json(data)
    },
    async response(request, response){
        const { id:user_id } = request.params 

        const { chosen } = request.body

        const friend_id = request.headers.authorization

        const status = (chosen == 'declined') ? 'declined' : 'accepted'

        const data = await connection('friends')
            .where({ user_id, friend_id, status: 'request' })
            .first()
            .update({ status, updated_at: connection.fn.now()})

        return data ? 
            response.json(data)
        :
            response.status(417).json({error: 'Expectation Failed'})
    },
    async delete(request, response){
        const { id:friend_id } = request.params
        const user_id = request.headers.authorization
        const friendDeleted = await connection('friends')
            .where({ friend_id, user_id, status: 'accepted' })
            .orWhere({ user_id: friend_id, friend_id: user_id, status: 'accepted' })
            .first()
            .delete()

        return friendDeleted ?
            response.json({success: true})
        : 
            response.status(417).json({error: 'Expectation Failed'})
    }
}