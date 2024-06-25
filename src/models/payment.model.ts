import { DataTypes } from "sequelize";
import sequelize from "../config/db";


const Payment = sequelize.define('payment', {
    id: {
        type: DataTypes.CHAR(50),
        primaryKey: true
    },
    enrollment_id: {
        type: DataTypes.CHAR(50),
        references: {
            model: 'enrollment',
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_date: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'payment',
    timestamps: false
});

export default Payment;