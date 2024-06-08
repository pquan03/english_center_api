import { Request, Response } from 'express';
import Payment from '../models/payment.model';

export default {
    createPayment: async (req: Request, res: Response) => {
        const { enrollment_id, amount, payment_date } = req.body;
        try {
            const newPayment = await Payment.create({ enrollment_id, amount, payment_date });
            res.status(201).json(newPayment);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },
}