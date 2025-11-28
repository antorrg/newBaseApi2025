 
 ## Auth0 google
 ```bash

Swagger: View and test endpoints in http://localhost:3010/api-docs
OPTIONS /api/v1/auth/auth0-login 204 1.112 ms - 0
OPTIONS /api/v1/auth/auth0-login 204 0.236 ms - 0
data {
  given_name: 'Antonio',
  family_name: 'Rodriguez',
  nickname: 'antoniorodriguezgramajo',
  name: 'Antonio Rodriguez',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocIwaitgxr-gPcKrFYCNq7fqgsmLZ6csoaMgaAj44HCcGSQ=s96-c',
  locale: 'es',
  updated_at: '2025-11-27T17:23:45.996Z',
  email: 'antoniorodriguezgramajo@gmail.com',
  email_verified: true,
  sub: 'google-oauth2|115384070403748327896'
}
auth: {
  payload: {
    iss: 'https://dev-mg7v1nvcxu1guo4c.us.auth0.com/',
    sub: 'google-oauth2|115384070403748327896',
    aud: [
      'apiAuth0',
      'https://dev-mg7v1nvcxu1guo4c.us.auth0.com/userinfo'
    ],
    iat: 1764264227,
    exp: 1764350627,
    scope: 'openid profile email',
    azp: 'ZlQKPLPiSniMMSns3F1LfyR6GDTAT4G8'
  },
  header: { alg: 'RS256', typ: 'JWT', kid: 'sJmbT0EWZ6LzMT8v0C3D-' },
  token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNKbWJUMEVXWjZMek1UOHYwQzNELSJ9.eyJpc3MiOiJodHRwczovL2Rldi1tZzd2MW52Y3h1MWd1bzRjLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNTM4NDA3MDQwMzc0ODMyNzg5NiIsImF1ZCI6WyJhcGlBdXRoMCIsImh0dHBzOi8vZGV2LW1nN3YxbnZjeHUxZ3VvNGMudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTc2NDI2NDIyNywiZXhwIjoxNzY0MzUwNjI3LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiWmxRS1BMUGlTbmlNTVNuczNGMUxmeVI2R0RUQVQ0RzgifQ.SEzfiJSXOLScsxkzVjmzJvSBz8GauVQbNEZ8NP-cH2SfmQUBCbdkkbddOMvEL2b2nXFXuiLDOFm7xM1vHsoMdzPlg0KkyIUHHz7cwK1EFqF3PZpK7my6LBNEDGvtJ3fbUYBZ-NCWARvermUK31dNwyjBxmBkI85QuBqze4ikV8lLo10JQgBr1N48Kei_-lhW6DXDOu1jKsesFug_RRBLcyCzlrtaIGkCAZpGAoxhb6A3gMm9IBMdF0CRDL-lBISSI08xJr2cf0iwTL4cecA497zdXsAB08Y3k2l7iOQVU9qw-n1jKk718VO2RY3MXBB_7L91COiAlKtFavW084hMCw'
}
data {
  given_name: 'Antonio',
  family_name: 'Rodriguez',
  nickname: 'antoniorodriguezgramajo',
  name: 'Antonio Rodriguez',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocIwaitgxr-gPcKrFYCNq7fqgsmLZ6csoaMgaAj44HCcGSQ=s96-c',
  locale: 'es',
  updated_at: '2025-11-27T17:23:45.996Z',
  email: 'antoniorodriguezgramajo@gmail.com',
  email_verified: true,
  sub: 'google-oauth2|115384070403748327896'
}
auth: {
  payload: {
    iss: 'https://dev-mg7v1nvcxu1guo4c.us.auth0.com/',
    sub: 'google-oauth2|115384070403748327896',
    aud: [
      'apiAuth0',
      'https://dev-mg7v1nvcxu1guo4c.us.auth0.com/userinfo'
    ],
    iat: 1764264227,
    exp: 1764350627,
    scope: 'openid profile email',
    azp: 'ZlQKPLPiSniMMSns3F1LfyR6GDTAT4G8'
  },
  header: { alg: 'RS256', typ: 'JWT', kid: 'sJmbT0EWZ6LzMT8v0C3D-' },
  token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNKbWJUMEVXWjZMek1UOHYwQzNELSJ9.eyJpc3MiOiJodHRwczovL2Rldi1tZzd2MW52Y3h1MWd1bzRjLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNTM4NDA3MDQwMzc0ODMyNzg5NiIsImF1ZCI6WyJhcGlBdXRoMCIsImh0dHBzOi8vZGV2LW1nN3YxbnZjeHUxZ3VvNGMudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTc2NDI2NDIyNywiZXhwIjoxNzY0MzUwNjI3LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiWmxRS1BMUGlTbmlNTVNuczNGMUxmeVI2R0RUQVQ0RzgifQ.SEzfiJSXOLScsxkzVjmzJvSBz8GauVQbNEZ8NP-cH2SfmQUBCbdkkbddOMvEL2b2nXFXuiLDOFm7xM1vHsoMdzPlg0KkyIUHHz7cwK1EFqF3PZpK7my6LBNEDGvtJ3fbUYBZ-NCWARvermUK31dNwyjBxmBkI85QuBqze4ikV8lLo10JQgBr1N48Kei_-lhW6DXDOu1jKsesFug_RRBLcyCzlrtaIGkCAZpGAoxhb6A3gMm9IBMdF0CRDL-lBISSI08xJr2cf0iwTL4cecA497zdXsAB08Y3k2l7iOQVU9qw-n1jKk718VO2RY3MXBB_7L91COiAlKtFavW084hMCw'
}
```
## Auth0 personal
```bash
> cross-env NODE_ENV=development nodemon index.js

[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
[dotenv@17.2.3] injecting env (7) from .env.development -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops
Server running on http://localhost:3010
Server in development
Swagger: View and test endpoints in http://localhost:3010/api-docs
OPTIONS /api/v1/auth/auth0-login 204 1.937 ms - 0
OPTIONS /api/v1/auth/auth0-login 204 0.226 ms - 0
data {
  nickname: 'pepetukis',
  name: 'pepetukis@gmail.com',
  picture: 'https://s.gravatar.com/avatar/bc08955dd5c7d8396071809c0fe32b7f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpe.png',
  updated_at: '2025-11-27T23:28:01.473Z',
  email: 'pepetukis@gmail.com',
  email_verified: false,
  sub: 'auth0|6928de3967d04a529edf8420'
}
auth: {
  payload: {
    iss: 'https://dev-mg7v1nvcxu1guo4c.us.auth0.com/',
    sub: 'auth0|6928de3967d04a529edf8420',
    aud: [
      'apiAuth0',
      'https://dev-mg7v1nvcxu1guo4c.us.auth0.com/userinfo'
    ],
    iat: 1764286082,
    exp: 1764372482,
    scope: 'openid profile email',
    azp: 'ZlQKPLPiSniMMSns3F1LfyR6GDTAT4G8'
  },
  header: { alg: 'RS256', typ: 'JWT', kid: 'sJmbT0EWZ6LzMT8v0C3D-' },
  token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNKbWJUMEVXWjZMek1UOHYwQzNELSJ9.eyJpc3MiOiJodHRwczovL2Rldi1tZzd2MW52Y3h1MWd1bzRjLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2OTI4ZGUzOTY3ZDA0YTUyOWVkZjg0MjAiLCJhdWQiOlsiYXBpQXV0aDAiLCJodHRwczovL2Rldi1tZzd2MW52Y3h1MWd1bzRjLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NjQyODYwODIsImV4cCI6MTc2NDM3MjQ4Miwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6IlpsUUtQTFBpU25pTU1TbnMzRjFMZnlSNkdEVEFUNEc4In0.CYFOFJJR7omw0vZjl3z7zwbovC-u5CXhD-XGX2X2ps2HveHj93p5CvoNG-mhrrSbaTZPwf0UplzaigzUnApYS4C78N4KAWKEOwXQNAhdJvsUJqd2GvyeGkXzKuFTRIbzq-usFA4MiJQVUbDsykSYbXvba0qMebe-WnSGq0FujtJ6abdNkg1RWcbiwXFXhQiHvZde_JkrAEFmnhPkuafASOBPSTWEMGA3vu66wXtSeCMekGi8K0gyczFSx0TyBMW03kbajg1KEntvFEBXp_hBxATvugVix9183huJFW2-gQhzGIVSQRL8YOkP1RrXjxNwt2pbuJXBiyKXeRvBd6kKxA'
}
data {
  nickname: 'pepetukis',
  name: 'pepetukis@gmail.com',
  picture: 'https://s.gravatar.com/avatar/bc08955dd5c7d8396071809c0fe32b7f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpe.png',
  updated_at: '2025-11-27T23:28:01.473Z',
  email: 'pepetukis@gmail.com',
  email_verified: false,
  sub: 'auth0|6928de3967d04a529edf8420'
}
auth: {
  payload: {
    iss: 'https://dev-mg7v1nvcxu1guo4c.us.auth0.com/',
    sub: 'auth0|6928de3967d04a529edf8420',
    aud: [
      'apiAuth0',
      'https://dev-mg7v1nvcxu1guo4c.us.auth0.com/userinfo'
    ],
    iat: 1764286082,
    exp: 1764372482,
    scope: 'openid profile email',
    azp: 'ZlQKPLPiSniMMSns3F1LfyR6GDTAT4G8'
  },
  header: { alg: 'RS256', typ: 'JWT', kid: 'sJmbT0EWZ6LzMT8v0C3D-' },
  token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNKbWJUMEVXWjZMek1UOHYwQzNELSJ9.eyJpc3MiOiJodHRwczovL2Rldi1tZzd2MW52Y3h1MWd1bzRjLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2OTI4ZGUzOTY3ZDA0YTUyOWVkZjg0MjAiLCJhdWQiOlsiYXBpQXV0aDAiLCJodHRwczovL2Rldi1tZzd2MW52Y3h1MWd1bzRjLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NjQyODYwODIsImV4cCI6MTc2NDM3MjQ4Miwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6IlpsUUtQTFBpU25pTU1TbnMzRjFMZnlSNkdEVEFUNEc4In0.CYFOFJJR7omw0vZjl3z7zwbovC-u5CXhD-XGX2X2ps2HveHj93p5CvoNG-mhrrSbaTZPwf0UplzaigzUnApYS4C78N4KAWKEOwXQNAhdJvsUJqd2GvyeGkXzKuFTRIbzq-usFA4MiJQVUbDsykSYbXvba0qMebe-WnSGq0FujtJ6abdNkg1RWcbiwXFXhQiHvZde_JkrAEFmnhPkuafASOBPSTWEMGA3vu66wXtSeCMekGi8K0gyczFSx0TyBMW03kbajg1KEntvFEBXp_hBxATvugVix9183huJFW2-gQhzGIVSQRL8YOkP1RrXjxNwt2pbuJXBiyKXeRvBd6kKxA'
}
```