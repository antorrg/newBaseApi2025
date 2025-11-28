import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Log', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    levelName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    levelCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stack: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contexts: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    hostname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    keep: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true
  }
  )
}
