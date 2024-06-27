import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Announcement = sequelize.define('announcement', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false
    },
    course_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    day_of_the_week: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    start_time: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    end_time: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    start_date: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'announcement',
    timestamps: false
});

export default Announcement;