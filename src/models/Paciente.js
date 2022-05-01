import {DataTypes} from 'sequelize'
import {sequelize} from '../config/db.js'

export const Paciente = sequelize.define('Paciente',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    propietario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
        allowNull: false
    },
    sintomas: {
        type: DataTypes.STRING,
        allowNull: false
    },
})