import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Teacher = sequelize.define('teacher', {
    id: {
        type: DataTypes.CHAR(50),
        primaryKey: true,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    mobile_phone: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    monthly_salary: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: true
    },
    home_address: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    account_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    full_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true
    },
    employee_role: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    account_id: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        references: {
            model: 'account',
            key: 'id'
        }
    
    }
}, {
    tableName: 'teacher',
    timestamps: false
});

export default Teacher;
