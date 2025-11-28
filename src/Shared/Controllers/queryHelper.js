// const {searchField = '', search = null, filters = {}, sortBy = 'id', order = 'DESC', page = 1, limit = 10
export function queryHelper (queries) {
  const { page, limit, orderBy, order, searchField, search } = queries
  // Este es un ejemplo generico a fin de levantar la app.
  const parseSearch = (str) => {
    if (str === 'null' || str === '') return null
    return str
  }

  return {
    searchField,
    search: parseSearch(search),
    sortBy: orderBy,
    order,
    page,
    limit
  }
}
