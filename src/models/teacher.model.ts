import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Teacher = sequelize.define('Teacher', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    user_name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20),
    },
}, {
    tableName: 'Teacher',
    timestamps: false
});

export default Teacher;