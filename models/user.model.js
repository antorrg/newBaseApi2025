import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    sub: { type: DataTypes.STRING, allowNull: true },
    nickname: { type: DataTypes.STRING, allowNull: true },
    given_name: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.ENUM, values: ['SuperAdmin', 'Admin', 'User'], defaultValue: 'User' },
    picture: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: true },
    email_verify: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null }
  }, {
    timestamps: true
  })
}
