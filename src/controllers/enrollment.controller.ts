import { Request, Response } from 'express';
import Enrollment from '../models/enrollment.model';
import { create } from 'domain';

export default {
    createEnrollment: async (req: Request, res: Response) => {
        const { student_id, class_id } = req.body;
        try {
            const newEnrollment = await Enrollment.create({ student_id, class_id });
            res.status(201).json(newEnrollment);
        } catch(error: any) {
            res.status(500).json({ message: error.message });
        }
    },
    getEnrollment: async (req: Request, res: Response) => {
        const { student_id, class_id } = req.body;
        try {
            const enrollment = await Enrollment.findOne({ where: { student_id, class_id } });
            res.status(200).json(enrollment);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
}