// create table if not exists account(
//     id char(50) primary key,
//     user_name varchar(50) unique not null,
//     password varchar(255) not null,
//     user_type varchar(50) not null
// )

import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import Parent from "./parent.model";
import Student from "./student.model";
import Teacher from "./teacher.model";


const Account = sequelize.define('account', {
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
    }, 
    user_type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { 
    tableName: 'account',
    timestamps: false
});


Account.hasOne(Student, { foreignKey: 'account_id' });
Student.belongsTo(Account, { foreignKey: 'account_id' });

Account.hasOne(Parent, { foreignKey: 'account_id' });
Parent.belongsTo(Account, { foreignKey: 'account_id' });

Account.hasOne(Teacher, { foreignKey: 'account_id' });
Teacher.belongsTo(Account, { foreignKey: 'account_id' });




export default Account;