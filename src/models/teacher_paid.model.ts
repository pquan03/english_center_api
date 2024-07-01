


// create table if not exists teacher_paid(
//     id char(50) primary key,
//     teacher_id char(50),
//     paid_date date,
//     amount decimal(10,2),
//     foreign key (teacher_id) references Teacher(id)
// );

import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import Teacher from "./teacher.model";

const TeacherPaid = sequelize.define('teacher_paid', {
    id: {
        type: DataTypes.CHAR(50),
        primaryKey: true
    },
    teacher_id: {
        type: DataTypes.CHAR(50),
        references: {
            model: Teacher,
            key: 'id'
        }
    },
    paid_date: {
        type: DataTypes.DATE
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2)
    }
}, {
    tableName: 'teacher_paid',
    timestamps: false
});

TeacherPaid.belongsTo(Teacher, { foreignKey: 'teacher_id' });
Teacher.hasMany(TeacherPaid, { foreignKey: 'teacher_id' });

export default TeacherPaid;