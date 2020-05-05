const connection = require('../database/connection')
const {pick} = require('lodash')

module.exports = {
  async index(request, response){
    const LIMIT_SELECT = 5

    const { page = 1 } = request.body

    const conditions = pick(request.query, ['name', 'surname'])

    const count = await connection('users').count()

    const data = await connection('users')
      .limit(LIMIT_SELECT)
      .offset((page-1)*LIMIT_SELECT)
      .select([
        //'name'
        '*'
      ])
      .where(conditions)

    response.header('X-Total-Count', count[0]["count(*)"])
    
    return response.json(data)
  },
  async create(request, response){
    const {name, surname, birth} = request.body
    
    const data = await connection('users').insert({
      name,
      surname,
      birth
    })
    
    return response.json(data)
  }
}