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
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
      },
      date_joined: {
        type: DataTypes.DATE,
        allowNull: false
      },
      account_id: {
        type: DataTypes.CHAR(50),
        references: {
          model: 'account',
          key: 'id'
        }
      },
      class_id: {
        type: DataTypes.CHAR(50),
        references: {
          model: 'class',
          key: 'id'
        }
      }, 
}, {
    tableName: 'student',
    timestamps: false
});

Student.hasOne(Parent, { foreignKey: 'student_id' });
Parent.belongsTo(Student, { foreignKey: 'student_id' });

export default Student;