import eh from '../Configs/errorHandlers.js'

const genericRepository = (model, model2=null) => {

    return {
      async create (data) {
        return await model.create({
          data
        })
      },
  
      async getAll () {
        return await model.findMany()
      },
  
      async getFilters (queryObject) {
        const { field, value } = queryObject
        return await model.findMany({
          where: {
            [field]:
                         { startsWith: value }
          }
        })
      },
  
      async getNumbersFilters (fieldObject) {
        const [[field, value]] = Object.entries(fieldObject)
        return await model.findMany({
          where: { [field]: parseInt(value) }
        })
      },
      async getWithItems() {
        return await model.findMany({
          include: {
            author: {
              select: {
                nickname: true
              }
            }
          }
        });
      },
      
      async getById (id) {
        return await model.findUnique({
          where: { id: parseInt(id) }
        })
      },
  
      async getOne (field, value) {
        return await model.findUnique({
          where: { [field]: value }
        })
      },
  
      async update (id, data) {
        return await model.update({
          where: { id: parseInt(id) },
          data
        })
      },
  
      async delete (id) {
        return await model.delete({
          where: { id: parseInt(id) }
        })
      }
}
}


export default genericRepository;