import { throwError } from '../src/Configs/errorHandlers.js'

export async function mockDeleteFunction (url, result) {
  if (result) {
    await new Promise(resolve => setTimeout(resolve, 1500))
    return {
      success: true,
      message: `ImageUrl ${url} deleted succesfully`
    }
  } else {
    await new Promise(reject => setTimeout(reject, 1500))
    throwError(`Error processing ImageUrl ${url}`, 500)
    throw new Error()
  }
}
export const deletFunctionTrue = async (url, result) => {
  // console.log('probando deleteFunction: ', url);
  return {
    success: true,
    message: `ImageUrl ${url} deleted succesfully`
  }
}
export const deletFunctionFalse = async (url, result) => {
  // console.log('probando deleteErrorFunction: ', url);
  throwError(`Error processing ImageUrl: ${url}`, 500)
  throw new Error()
}
