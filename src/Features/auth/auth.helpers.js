export const parser = (u) => {
  return {
    id: u.id,
    tokenHash: u.tokenHash,
    UserId: u.UserId,
    expiresAt: u.expiresAt.toISOString(),
    revoked: u.revoked
  }
}
