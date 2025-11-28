import BaseRepository from '../../src/Repositories/BaseRepository.js'
import VideogameService from '../../src/Services/'
import { Landing } from '../../src/Configs/database.js'
import * as info from '../helperTest/baseRep.js'
import * as fns from '../helperTest/generalFunctions.js'

class TestClass extends BaseRepository {
  constructor (Model) {
    super(Model)
  }
}
const testing = new TestClass(Landing)

// repository, fieldName(string), cache(boolean), parserFunction(function), useImage(boolean), deleteImages(function)
const serv = new GeneralService(testing, 'Landing', false, null, true, fns.deletFunctionFalse)
const servCache = new GeneralService(testing, 'Landing', true, info.cleanData, false, fns.deletFunctionTrue)
const servParse = new GeneralService(testing, 'Landing', false, info.cleanData, true, fns.deletFunctionTrue)
