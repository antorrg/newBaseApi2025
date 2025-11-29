import { middError } from '../../Configs/errorHandlers.js'

export const allowedQueryValuesByRules = (
  rules
) => {
  return (req, res, next) => {
    const query = req.context?.query ?? {}

    for (const field in rules) {
      const allowed = rules[field]
      const value = query[field]

      if (value !== undefined && !allowed.includes(String(value))) {
        return next(middError(`Invalid value for '${field}'`, 400))
      }
    }

    next()
  }
}
export const allowedBodyValuesByRules = (
  rules
) => {
  return (req, res, next) => {
    const body = req.body ?? {}

    for (const field in rules) {
      const allowed = rules[field]
      const value = body[field]

      if (value !== undefined && !allowed.includes(String(value))) {
        return next(middError(`Invalid value for '${field}'`, 400))
      }
    }

    next()
  }
}
/* Uso:
router.get('/items',
  allowedQueryValues({
    sort: ['asc', 'desc'],
    search: ['title', 'name', 'category']
  }),
  controller.getAll
);
*/
