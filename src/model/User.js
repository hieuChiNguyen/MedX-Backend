'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connectDB');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    is: /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
                    msg: 'Invalid phone number !'
                }
            }
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        positionId: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        roleId: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        sequelize,
        modelName: 'User'
    }
);

module.exports = User;
