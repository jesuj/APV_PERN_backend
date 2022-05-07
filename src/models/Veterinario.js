import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import {Paciente} from "./Paciente.js"
import generarId from '../helpers/generarId.js'
import bcrypt from 'bcrypt'

export const Veterinario = sequelize.define('Veterinario',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    web: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: generarId()
    },
    confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
},{
    tableName: 'Veterinarios',
    hooks : {
        beforeCreate : async (record, options) => {
            const salt = await bcrypt.genSalt(10);
            const {password} = record.dataValues;
            record.dataValues.password = await bcrypt.hash(password,salt);
        }, 
        beforeUpdate : async (record, options) => {
            if (record._changed.has('password')) {
                console.log('siu')
                const salt = await bcrypt.genSalt(10);
                const {password} = record.dataValues;
                record.dataValues.password = await bcrypt.hash(password,salt);
            }
        }
    }
})


Veterinario.prototype.comprobarPassword = async function(passwordFor){
    console.log(passwordFor,"Este es el this : " + this.password)
    return await bcrypt.compare(passwordFor, this.password);
}

Veterinario.hasMany(Paciente,{
    foreignKey: 'veterinarioId',
    sourceKey: 'id'
})

Paciente.belongsTo(Veterinario,{
    foreignKey: 'veterinarioId',
    targetId: 'id'
})