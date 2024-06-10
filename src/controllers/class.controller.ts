import { Request, Response } from "express";
import Class from "../models/class.model";
import { v4 as uuidv4 } from 'uuid';
import Student from "../models/student.model";
import Teacher from "../models/teacher.model";


export default {
    createClass: async (req: Request, res: Response) => {
        const { class_name, year } = req.body;
        try {
            const id = uuidv4().toString();
            await Class.create({ id, class_name, year });
            res.status(200).json({ message: 'Class created' });
        } catch(e: any) {
            res.status(500).json({ message: e.message });   
        }
    },
    getClasses: async (req: Request, res: Response) => {
        try {
            const classes = await Class.findAll({
                include: [
                    {
                        model: Teacher,
                        attributes: ['full_name'],
                    },
                    {
                        model: Student,
                        attributes: ['full_name'],
                    }
                ]
            });
            res.status(200).json(classes);
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    getClassById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const class_ = await Class.findOne({ 
                where: { id },
                include: [
                    {
                        model: Teacher,
                        attributes: ['full_name', 'phone'],
                    },
                    {
                        model: Student,
                        attributes: ['full_name'],
                    }
                ],
            })  
            res.status(200).json(class_);
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    updateClassToTeacher: async (req: Request, res: Response) => {
        const { class_id, teacher_id } = req.body;
        try {
            const class_ = await Class.findByPk(class_id);
            if(!class_) return res.status(400).json({ message: 'Class not found' });
            await class_.update({ teacher_id });
            res.status(200).json({ message: 'Class updated' });
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    }, 
    deleteClass: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await Class.destroy({ where: { id } });
            res.status(200).json({ message: 'Class deleted' });
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    }, 
}

