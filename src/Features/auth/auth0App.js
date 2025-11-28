import { auth } from 'express-oauth2-jwt-bearer'
import envConfig from '../../Configs/envConfig.js'

export const jwtAuth0Check = auth({
  audience: envConfig.Auth0Audience,
  issuerBaseURL: envConfig.Auth0IssuerBaseUrl,
  tokenSigningAlg: 'RS256'
})
