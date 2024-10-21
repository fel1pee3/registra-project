import mysql from 'mysql2/promise'

let connection;

export const connectToDatabase = async () => {
    if(!connection) {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "12022006",
            database: "registra",
        })

        return connection

    }
}