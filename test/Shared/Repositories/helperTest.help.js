import { expect } from 'vitest'
export const createData = {
  email: 'usuario@gmail.com',
  password: 'L1234567',
  picture: 'https://picture.com'
}
export const responseData = {
  id: expect.any(String),
  email: 'usuario@gmail.com',
  role: 'User',
  picture: 'https://picture.com',
  given_name: null,
  enabled: true,
  createdAt: expect.any(String)
}
export const dataEmpty = {
  id: 'none',
  email: 'no data yet',
  given_name: 'no data yet',
  password: 'no data yet',
  role: 'no data yet',
  picture: 'no data yet',
  enabled: true,
  createdAt: 'no data yet'
}

export const responseUpdData = {
  id: expect.any(String),
  email: 'perico@gmail.com',
  role: 'User',
  picture: 'https://picture.com',
  given_name: 'Perico de los palotes',
  enabled: false,
  createdAt: expect.any(String)
}
export function cleanData (d) {
  return {
    id: d.id,
    email: d.email,
    role: d.role,
    picture: d.picture,
    given_name: d.given_name,
    enabled: d.enabled,
    createdAt: d.createdAt.toISOString()
  }
}
