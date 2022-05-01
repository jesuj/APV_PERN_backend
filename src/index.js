import {} from 'dotenv/config'
import app from './app.js';
import { sequelize } from './config/db.js'


const PORT = process.env.PORT || 4000;

async function main() {
    try {
        // await sequelize.sync({ force: true });
        await sequelize.sync();
        console.log('DB connect')
        app.listen(PORT, () => {
            console.log(`Server port= ${PORT}`)
        });
    } catch (error) {
        console.log('Error Server',error)
    }
}

main();


