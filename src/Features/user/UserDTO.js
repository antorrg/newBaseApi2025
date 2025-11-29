export class UserDTO {
  static parser (d) {
    return {
      id: d.id,
      email: d.email,
      nickname: d.nickname,
      given_name: d.given_name,
      role: d.role,
      picture: d.picture,
      country: d.country,
      email_verify: d.email_verify,
      enabled: d.enabled,
      createdAt: d.createdAt ? d.createdAt.toString() : null,
      updatedAt: d.updatedAt ? d.updatedAt.toString() : null,
      deletedAt: d.deletedAt ? d.deletedAt.toString() : null
    }
  }
}
'id, email, sub, given_name, role, picture, country, email_verify, enabled, deletedAt'
export const dataEmpty = {
  id: 'none',
  email: 'no data yet',
  nickname: 'no data yet',
  given_name: 'no data yet',
  role: 'no data yet',
  picture: 'no data yet',
  country: 'no data yet',
  email_verify: 'no data yet',
  enabled: true,
  createdAt: 'no data yet'
}
