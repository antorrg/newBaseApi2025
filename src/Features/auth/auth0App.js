import { auth } from 'express-oauth2-jwt-bearer'

export const jwtAuth0Check = auth({
  audience: 'apiAuth0',
  issuerBaseURL: 'https://dev-mg7v1nvcxu1guo4c.us.auth0.com/',
  tokenSigningAlg: 'RS256'
})
