const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("db-member-account", "root", "", {
    dialect: "mysql",
    host: "localhost"
});

const Member = sequelize.define('Member', {
    id_member: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_creation: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
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
    tableName: 'member'
})

module.exports = sequelize.models.Member;