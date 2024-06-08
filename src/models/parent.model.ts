import { DataTypes } from "sequelize";
import sequelize from "../config/db";


// CREATE TABLE IF NOT EXISTS Attendance (
//     id CHAR(50) PRIMARY KEY,
//     enrollment_id CHAR(50),
//     attendance_date DATE,
//     is_present BOOLEAN DEFAULT 1,
//     FOREIGN KEY (enrollment_id) REFERENCES Enrollment(id)
// );

const Parent = sequelize.define('Parent', {
    id: {
        type: DataTypes.CHAR(50),
        primaryKey: true
      },
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true
      },
      user_name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
      },
      student_id: {
        type: DataTypes.CHAR(50),
        references: {
          model: 'Student',
          key: 'id'
        }
      },
      phone: {
        type: DataTypes.STRING(20)
      }
}, {
    tableName: 'Parent',
    timestamps: false
});


export default Parent;