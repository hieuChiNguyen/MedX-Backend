'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connectDB');

class Schedule extends Model {}

Schedule.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        currentNumber: {},
        maxNumber: {},
        date: {},
        timeType: {},
        doctorId: {}
    },
    {
        sequelize,
        modelName: 'Schedule'
    }
);

module.exports = Schedule;
