export const createData = {
  title: 'Titulo de la landing',
  infoHeader: 'titulo para el seo',
  infoBody: 'Descripcion de la landing',
  picture: 'https://picture.com.ar'
}
export const createSecondData = {
  title: 'Titulo de la landing2',
  infoHeader: 'titulo para el seo',
  infoBody: 'Descripcion de la landing',
  picture: 'https://picture.com.ar'
}

export const cleanData = (data) => {
  return {
    id: data.id,
    title: data.title,
    infoHeader: data.infoHeader,
    infoBody: data.infoBody,
    picture: data.picture,
    enable: data.enable,
    deletedAt: data.deletedAt
  }
}
export const responseData = {
  id: 1,
  title: 'Titulo de la landing',
  infoHeader: 'titulo para el seo',
  infoBody: 'Descripcion de la landing',
  picture: 'https://picture.com.ar',
  enable: true,
  deletedAt: null
}
export const responseData2 = [{
  id: 1,
  title: 'Titulo de la landing',
  infoHeader: 'titulo para el seo',
  infoBody: 'Descripcion de la landing',
  picture: 'https://picture.com.ar',
  enable: true,
  deletedAt: null
},
{
  id: 2,
  title: 'Titulo de la landing2',
  infoHeader: 'titulo para el seo',
  infoBody: 'Descripcion de la landing',
  picture: 'https://picture.com.ar',
  enable: true,
  deletedAt: null
}]
export const responseData3 = {
  id: 2,
  name: 'landing2',
  title: 'Titulo de la landing',
  description: 'Descripcion de la landing',
  picture: 'https://picture.com.ar',
  metaTitle: 'titulo para el seo',
  metaDescription: 'descripcion para el seo',
  metaKeywords: 'palabras clave',
  logo: 'https://metalogo.com.ar',
  enable: false
}
export const responseDataImg = {
  id: 1,
  name: 'landing1',
  title: 'Titulo de la landing',
  description: 'Descripcion de la landing',
  picture: 'https://imagen.com.ar',
  metaTitle: 'titulo para el seo',
  metaDescription: 'descripcion para el seo',
  metaKeywords: 'palabras clave',
  logo: 'https://metalogo.com.ar',
  enable: true
}
export const responseUpdData = {
  id: 1,
  title: 'landing3',
  infoHeader: 'titulo para el seo',
  infoBody: 'Descripcion de la landing',
  picture: 'https://picture.com.ar',
  enable: true,
  deletedAt: null
}
export const dataEmpty = {
  id: 1,
  title: 'Titulo de la landing',
  infoHeader: 'titulo para el seo',
  infoBody: 'Descripcion de la landing',
  picture: 'https://picture.com.ar',
  enable: true,
  deletedAt: null
}
