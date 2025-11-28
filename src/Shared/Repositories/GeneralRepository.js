import BaseRepository from './BaseRepository.js'

export class GeneralRepository extends BaseRepository {
  constructor (Model, parser, dataEmpty = null) {
    super(Model, parser, dataEmpty)
  }
}
