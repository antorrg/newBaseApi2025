import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('RefreshToken',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      tokenHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      revoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: true
    }
  )
}
