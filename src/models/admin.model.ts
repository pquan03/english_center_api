import { DataTypes } from "sequelize";
import sequelize from "../config/db";

// CREATE TABLE IF NOT EXISTS Admin (
//     id CHAR(50) PRIMARY KEY,
//     user_name VARCHAR(50) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL
// );


const Admin = sequelize.define('admin', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    user_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { 
    tableName: 'admin',
    timestamps: false
});


export default Admin;