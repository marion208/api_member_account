const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("db-member-account", "root", "", {
    dialect: "mysql",
    host: "localhost"
});

const DataMember = sequelize.define('DataMember', {
    id_data_member: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_join_member: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address_line_1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address_line_2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        field: 'createdAt',
        type: Sequelize.DATE,
    },
    updated_at: {
        field: 'updatedAt',
        type: Sequelize.DATE,
    }
}, {
    tableName: 'data_member'
})

module.exports = sequelize.models.DataMember;