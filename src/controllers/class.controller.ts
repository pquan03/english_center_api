import { Request, Response } from "express";
import Class from "../models/class.model";
import { v4 as uuidv4 } from 'uuid';
import student from "../models/student.model";
import teacher from "../models/teacher.model";
import sequelize from "sequelize";


export default {
    createClass:  async (req: Request, res: Response) => {
        console.log(req.body);
        try {
            const { class_name, monthly_tuition_fee, expected_lessons, teacher_id } = req.body;
            const id = uuidv4().toString();
            const newClass = await Class.create({ id, class_name, year: 2024, monthly_tuition_fee, expected_lessons, teacher_id });
            res.status(201).json(newClass);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    getClasses: async (req: Request, res: Response) => {
        try {
            // Get all classes with teacher and number of students
            const classes = await Class.findAll({
                attributes: {
                    include: [
                        [sequelize.fn('COUNT', sequelize.col('students.id')), 'student_count']
                    ]
                },
                include: [
                    { 
                        model: teacher, 
                        attributes: ['full_name'],
                     },
                    { 
                        model: student, 
                        attributes: [], 
                        required: false,
                     }
                ],
                group: ['Class.id', 'teacher.id'],
            });
            res.status(200).json(classes);
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    getClassById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const classInstance = await Class.findByPk(id, {
                attributes: {
                    include: [
                        [sequelize.fn('COUNT', sequelize.col('students.id')), 'student_count']
                    ]
                },
                include: [
                    { 
                        model: teacher, 
                        attributes: ['full_name'],
                     },
                    { 
                        model: student, 
                        attributes: [], 
                        required: false,
                     }
                ],
                group: ['Class.id', 'teacher.id'],
            });
            res.status(200).json(classInstance);
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    updateClass: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { class_name, year, monthly_tuition_fee, expected_lessons, teacher_id } = req.body;
            const [updated] = await Class.update({ class_name, year, monthly_tuition_fee, expected_lessons, teacher_id }, {
                where: { id }
            });
            if (updated) {
                const updatedClass = await Class.findByPk(id);
                res.status(200).json(updatedClass);
            } else {
                res.status(404).json({ message: "Class not found" });
            }
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    }, 
    deleteClass: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deleted = await Class.destroy({
                where: { id }
            });
            if (deleted) {
                res.status(204).json({ message: "Class deleted" });
            } else {
                res.status(404).json({ message: "Class not found" });
            }
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    }, 
}

