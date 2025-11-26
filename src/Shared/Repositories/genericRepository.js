import eh from '../Configs/errorHandlers.js'

const genericRepository = (model, model2 = null) => {
  return {
    async create (data) {
      return await model.create({
        data
      })
    },

    async getAll () {
      return await model.findMany()
    },
    async getPages ({ search, filters = {}, sortBy = 'id', order = 'desc', page = 1, limit = 10 }) {
      const offset = (page - 1) * limit

      // Construimos el filtro de búsqueda
      const searchFilter = search ? { name: { contains: search, mode: 'insensitive' } } : {}

      // Combinamos filtros personalizados con búsqueda
      const where = { ...searchFilter, ...filters }

      // Ejecutamos la consulta dinámica
      const data = await prisma[model].findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: offset,
        take: limit
      })

      // Contamos el total de registros
      const total = await prisma[model].count({ where })

      return {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        data
      }
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
    async getWithItems () {
      return await model.findMany({
        include: {
          author: {
            select: {
              nickname: true
            }
          }
        }
      })
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

export default genericRepository
