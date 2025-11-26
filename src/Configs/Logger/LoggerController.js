
export class LoggerController {
  constructor (
    service
  ) {
    this.service = service
  }

  getAll = async (req, res) => {
    const query = req?.context?.query
    const { info, results } = await this.service.getAll(query)
    res.status(200).json({ info, results })
  }

  getById = async (req, res) => {
    const { id } = req.params
    const results = await this.service.getById(Number(id))
    res.status(200).json(results)
  }

  update = async (req, res) => {
    const { id } = req.params
    const data = req.body
    const { message, results } = await this.service.update(Number(id), data)
    res.status(200).json({ message, results })
  }

  delete = async (req, res) => {
    const { id } = req.params
    const results = await this.service.delete(Number(id))
    res.status(200).json(results)
  }

  deleteAll = async (req, res) => {
    const response = await this.service.deleteAll()
    res.status(200).json(response)
  }
}
