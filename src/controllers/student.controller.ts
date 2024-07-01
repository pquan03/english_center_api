import Parent from '../models/parent.model';
import Student from '../models/student.model';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export default  {
    createStudent: async(req: Request, res: Response) => {
        try {
            const { full_name, user_name, password, class_id, date_joined } = req.body;
            const id = uuidv4().toString();
            const newStudent = await Student.create({
                id,
                full_name,
                user_name,
                password,
                // class_id,
                date_joined
            });
            res.status(201).json(newStudent);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    getAllStudents: async(req: Request, res: Response) => {
        try {
            const students = await Student.findAll({
                include: Parent
            });
            res.status(200).json(students);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    getStudentById: async(req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const { id } = req.params;
            const student = await Student.findByPk(id, {
                include: Parent
            });
            if (!student) {
                return res.status(404).json({ error: "Student not found" });
            }
            res.status(200).json(student);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    updateStudent: async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { full_name, user_name, password, class_id, date_joined } = req.body;
            const student = await Student.findByPk(id);
            if (!student) {
                return res.status(404).json({ error: "Student not found" });
            }
            await student.update({ full_name, user_name, password, class_id, date_joined });
            res.status(200).json(student);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteStudent: async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const student = await Student.findByPk(id);
            if (!student) {
                return res.status(404).json({ error: "Student not found" });
            }
            // delete parent first
            const parent = await Parent.findOne({ where: { student_id: id } });
            
            await student.destroy();
            res.status(200).json({ message: "Student deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}