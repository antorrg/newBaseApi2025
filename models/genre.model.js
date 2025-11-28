import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null
    }
  },
  { timestamps: true }
  )
}
