
// create table if not exists class_completed_lesson(
//     id char(50) primary key,
//     class_id char(50),
//     lesson_number int,
//     foreign key (class_id) references Class(id)
// );

import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import Class from "./class.model";

const ClassCompletedLesson = sequelize.define('class_completed_lesson', { 
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    class_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    lesson_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'class_completed_lesson',
    timestamps: false
});


ClassCompletedLesson.belongsTo(Class, { foreignKey: 'class_id' });

Class.hasOne(ClassCompletedLesson, { foreignKey: 'class_id' });

export default ClassCompletedLesson;