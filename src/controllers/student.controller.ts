import Parent from '../models/parent.model';
import Student from '../models/student.model';
import { Request, Response } from 'express';

export default  {
    createStudent: async(req: Request, res: Response) => {
        const { first_name, last_name, birth_date, parent_id } = req.body;
        try {
            const newStudent = await Student.create({ first_name, last_name, birth_date, parent_id });
            res.status(201).json(newStudent);
        } catch(error: any) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllStudents: async(req: Request, res: Response) => {
        try {
            const students = await Student.findAll();
            res.json(students);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    getStudentById: async(req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const student = await Student.findOne({
                where: { id },
                include: [
                    { 
                        model: Parent,
                        attributes: ['full_name', 'email', 'phone']
                    }
                ]
            })
            res.json(student);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    updateStudent: async(req: Request, res: Response) => {
        const { id } = req.params;
        const { first_name, last_name, birth_date, parent_id } = req.body;
        try {
            const student = await Student.findByPk(id);
            if(!student) return res.status(400).json({ message: 'Student not found' });
            await student.update({ first_name, last_name, birth_date, parent_id });
            res.json({ message: 'Student updated' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteStudent: async(req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await Student.destroy({ where: { id } });
            res.json({ message: 'Student deleted' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}