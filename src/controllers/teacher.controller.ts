import { Request, Response } from 'express';
import Teacher from '../models/teacher.model';
import { v4 as uuidv4 } from 'uuid';

export default {
    createTeacher: async (req: Request, res: Response) => {
        const { full_name,  phone, user_name, password } = req.body;
        try { 
            const id = uuidv4().toString();
            await Teacher.create({ id, full_name, phone, user_name, password });
            res.status(200).json({ message: 'Teacher created' });
        } catch(e: any) {
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
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    getTeacherById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const teacher = await Teacher.findByPk(id);
            res.status(200).json(teacher);
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    updateTeacher: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { full_name, phone, user_name, password } = req.body;
        try {
            const teacher = await Teacher.findByPk(id);
            if(!teacher) return res.status(400).json({ message: 'Teacher not found' });
            await teacher.update({ full_name, phone, user_name, password });
            res.status(200).json({ message: 'Teacher updated' });
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    deleteTeacher: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await Teacher.destroy({ where: { id } });
            res.status(200).json({ message: 'Teacher deleted' });
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    }
}