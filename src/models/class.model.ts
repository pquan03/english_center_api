import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import Teacher from "../models/teacher.model";
import Student from "../models/student.model";


// CREATE TABLE IF NOT EXISTS Class (
//     id CHAR(50) PRIMARY KEY,
//     class_name VARCHAR(50) NOT NULL,
//     year INT NOT NULL,
//     teacher_id CHAR(50),
//     FOREIGN KEY (teacher_id) REFERENCES Teacher(id)
// );

const Class = sequelize.define('Class', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    class_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    monthly_tuition_fee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expected_lessons: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teacher_id: {
        type: DataTypes.STRING,
        references: {
            model: 'teacher',
            key: 'id'
        }
    },
}, {
    tableName: 'Class',
    timestamps: false
});



Teacher.hasMany(Class, { foreignKey: 'teacher_id' });
Class.belongsTo(Teacher, { foreignKey: 'teacher_id' });

Class.hasMany(Student, { foreignKey: 'class_id' });
Student.belongsTo(Class, { foreignKey: 'class_id' });

export default Class;