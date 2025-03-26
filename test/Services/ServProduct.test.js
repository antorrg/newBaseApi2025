import ProductRepository from '../../src/Repositories/ProductRepository.js'
import ProductService from '../../src/Services/ProductService.js'
import { deletFunctionTrue } from '../helperTest/generalFunctions.js'

const rep = new ProductRepository()

const serv = new ProductService(rep, 'name', false, null, true, deletFunctionTrue)

// Repository, fieldName, useCache= false, parserFunction=null, useImage= false, deleteImages = null
describe('Clase ProductService. Test de metodos update, specialUpdate, delete.', () => {
  describe('Metodos update, specialUpdate. Borrado de multiples imagenes (array).', () => { second })
})
