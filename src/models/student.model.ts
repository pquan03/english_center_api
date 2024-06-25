import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import Parent from "./parent.model";




const Student = sequelize.define('student', {
    id: {
        type: DataTypes.CHAR(50),
        primaryKey: true
      },
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      user_name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      class_id: {
        type: DataTypes.CHAR(50),
        references: {
          model: 'class',
          key: 'id'
        }
      }
}, {
    tableName: 'student',
    timestamps: false
});

Student.hasOne(Parent, { foreignKey: 'student_id' });
Parent.belongsTo(Student, { foreignKey: 'student_id' });

export default Student;