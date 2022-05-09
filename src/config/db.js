import Sequelize from 'sequelize'

export const sequelize = new Sequelize(process.env.DB_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// export const sequelize = new Sequelize(
//     process.env.DB_DATABASE,
//     process.env.DB_USERNAME,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_CONNECTION,
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// )