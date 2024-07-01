import { Request, Response } from 'express';
import Teacher from '../models/teacher.model';
import { v4 as uuidv4 } from 'uuid';
import Class from '../models/class.model';
import Student from '../models/student.model';
import Attendance from '../models/attendance.mode';
import Enrollment from '../models/enrollment.model';

export default {
    createTeacher: async (req: Request, res: Response) => {
        console.log(req.body);
        try {
            const id = uuidv4().toString();
            const { gender, mobile_phone, monthly_salary, home_address, account_status, full_name, date_of_birth, email, employee_role, user_name, password } = req.body;
            await Teacher.create({ id, gender, mobile_phone, monthly_salary, home_address, account_status, full_name, date_of_birth, email, employee_role, user_name, password });
            res.status(200).json({ message: 'Teacher created' });
        } catch (e: any) {
            console.log(e);
            res.status(500).json({ message: e.message });
        }
    },
    getTeachers: async (req: Request, res: Response) => {
        try {
            // count the number of teachers
            const count = await Teacher.count();
            const teachers = await Teacher.findAll();
            res.status(200).json({
                count,
                teachers
            });
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    getTeachersName: async (req: Request, res: Response) => {
        try {
            const teachers = await Teacher.findAll({ attributes: ['id', 'full_name'] });
            res.status(200).json(teachers);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    getTeacherById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const teacher = await Teacher.findByPk(id);
            res.status(200).json(teacher);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    updateTeacher: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { gender,  mobile_phone, monthly_salary, home_address, account_status, full_name, date_of_birth, email, employee_role, user_name, password } = req.body;
            const [updated] = await Teacher.update({ gender, mobile_phone, monthly_salary, home_address, account_status, full_name, date_of_birth, email, employee_role, user_name, password }, {
                where: { id }
            });
            if (updated) {
                const updatedTeacher = await Teacher.findByPk(id);
                res.status(200).json(updatedTeacher);
            } else {
                res.status(404).json({ message: "Teacher not found" });
            }
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    deleteTeacher: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await Teacher.destroy({ where: { id } });
            res.status(200).json({ message: 'Teacher deleted' });
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }, 
    getClassByTeacher: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const teacher = await Teacher.findByPk(id, { attributes: ['full_name'] });
            if (!teacher) {
                res.status(404).json({ message: 'Teacher not found' });
            }
            const classes = await Class.findAll({ where: { teacher_id: id } });
            const classesWithStudents =  await Promise.all(classes.map(async (item) => {
                const students = await Student.findAll({ where: { class_id: item.dataValues['id'] } });
                const enrollment = await Enrollment.findAll({ where: { class_id: item.dataValues['id'] } });
                return {
                    ...item.dataValues,
                    students: students, 
                    // attendance: attendance
                };
            }));
            res.status(200).json({
                teacherName: (teacher as any).dataValues['full_name'],
                classes: classesWithStudents
            });
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }, 
    getStudentsByClasses: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const classes = await Class.findAll({ where: { teacher_id: id } });
            classes.map(async (item) => {
                const students = await Student.findAll({ where: { class_id: item.dataValues['id'] } });   
                console.log(students);
            });
            res.status(200).json(classes);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }
}