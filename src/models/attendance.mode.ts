import { DataTypes } from "sequelize";
import sequelize from "../config/db";


// CREATE TABLE IF NOT EXISTS Attendance (
//     id CHAR(50) PRIMARY KEY,
//     enrollment_id CHAR(50),
//     attendance_date DATE,
//     is_present BOOLEAN DEFAULT 1,
//     FOREIGN KEY (enrollment_id) REFERENCES Enrollment(id)
// );

const Attendance = sequelize.define('attendance', {
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
      attendance_date: {
        type: DataTypes.DATE
      },
      is_present: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
}, {
    tableName: 'attendance',
    timestamps: false
});


export default Attendance;