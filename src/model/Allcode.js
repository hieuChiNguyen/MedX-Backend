'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connectDB');

class AllCode extends Model {}

AllCode.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        type: {
            type: DataTypes.STRING
        },
        key: {
            type: DataTypes.STRING
        },
        valueEn: {
            type: DataTypes.STRING
        },
        valueVi: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: 'AllCode'
    }
);

module.exports = AllCode;
