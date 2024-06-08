import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db";

// CREATE TABLE IF NOT EXISTS Enrollment (
//     id CHAR(50) PRIMARY KEY,
//     student_id CHAR(50),
//     class_id CHAR(50),
//     enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (student_id) REFERENCES Student(id),
//     FOREIGN KEY (class_id) REFERENCES Class(id)
// );


const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.CHAR(50),
        primaryKey: true
      },
      student_id: {
        type: DataTypes.CHAR(50),
        references: {
          model: 'Student',
          key: 'id'
        }
      },
      class_id: {
        type: DataTypes.CHAR(50),
        references: {
          model: 'Class',
          key: 'id'
        }
      },
      enrollment_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
}, {
    tableName: 'Enrollment',
    timestamps: false
});

export default Enrollment;