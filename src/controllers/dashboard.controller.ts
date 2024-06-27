import { Request, Response } from "express";
import Student from "../models/student.model";
import Teacher from "../models/teacher.model";
import Class from "../models/class.model";
import sequelize from "sequelize";


export default  {
    getDashboard: async (req: Request, res: Response) => {
        try {
            // Get total students
            const totalStudents = await Student.count();
            // Get total teachers 
            const totalTeachers = await Teacher.count();
            // Get total paid salary for teachers
            const totalPaidSalary = await Teacher.sum('monthly_salary');
            // Get expected money collected from students
            // formula: total sum of monthly fee eache class * number of students in each class
            const expectedMoney = await Class.findAll({
                attributes: ['id', 'class_name', 'monthly_tuition_fee', [sequelize.fn('COUNT', sequelize.col('students.id')), 'total_students']],
                include: [{
                    model: Student,
                    attributes: [],
                    duplicating: false
                }],
                group: ['class.id'],
                raw: true
            });

            const totalExpectedMoney = expectedMoney.reduce((acc: any, item: any) => {
                return acc + (item.monthly_tuition_fee * item.total_students);
            }, 0);
            
            // Get number of students each class
            const studentsPerClass = await Class.findAll({
                attributes: ['id', 'class_name', [sequelize.fn('COUNT', sequelize.col('students.id')), 'total_students']],
                include: [{
                    model: Student,
                    attributes: [],
                    duplicating: false
                }],
                group: ['class.id']
            });
            res.status(200).json({
                totalStudents,
                totalTeachers,
                totalCollectedMoney: 112774500,
                totalExpectedMoney,
                totalPaidSalary,
                studentsPerClass});
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    }
}