// create table if not exists payment_history(
//     id char(50) primary key,
//     payment_date date,
//     amount decimal(10,2),
//     payment_id char(50),
//     parent_id char(50),
//     foreign key (parent_id) references Parent(id)
//     foreign key (payment_id) references Payment(id)
// );

import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import Parent from "./parent.model";
import Payment from "./payment.model";
import exp from "constants";

const PaymentHistory = sequelize.define('payment_history', {
    id: {
        type: DataTypes.CHAR(50),
        primaryKey: true
    },
    payment_date: {
        type: DataTypes.DATE
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2)
    },
    payment_id: {
        type: DataTypes.CHAR(50),
        references: {
            model: Payment,
            key: 'id'
        }
    },
    parent_id: {
        type: DataTypes.CHAR(50),
        references: {
            model: Parent,
            key: 'id'
        }
    }
}, {
    tableName: 'payment_history',
    timestamps: false
});

PaymentHistory.belongsTo(Parent, { foreignKey: 'parent_id' });
Parent.hasMany(PaymentHistory, { foreignKey: 'parent_id' });

PaymentHistory.belongsTo(Payment, { foreignKey: 'payment_id' });
Payment.hasMany(PaymentHistory, { foreignKey: 'payment_id' });

export default PaymentHistory;