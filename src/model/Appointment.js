'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connectDB');

class Appointment extends Model {}

Appointment.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        // This is key field in table Allcode
        statusId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        patientId: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        doctorId: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        date: {
            type: DataTypes.DATE
        },
        timeType: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: 'Appointment'
    }
);

module.exports = Appointment;
