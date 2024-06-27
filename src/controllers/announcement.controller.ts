import { Request, Response } from "express";
import sequelize from "sequelize";
import Announcement from "../models/announcement.model";


export default  {

    createAnnouncement: async (req: Request, res: Response) => {
        const { id, course_name, day_of_the_week, start_time, end_time, start_date } = req.body;
        try {
            const announcement = await Announcement.create({ id, course_name, day_of_the_week, start_time, end_time, start_date });
            res.status(201).json(announcement);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create announcement' });
        }
    },
    getAnnouncements: async (req: Request, res: Response) => {
        try {
            const announcements = await Announcement.findByPk('1');
            res.status(200).json(announcements);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to get announcements' });
        }
    },
    updateAnnouncement: async (req: Request, res: Response) => {
        const { course_name, day_of_the_week, start_time, end_time, start_date } = req.body;
        try {
            const [updated] = await Announcement.update({ course_name, day_of_the_week, start_time, end_time, start_date }, {
                where: { id: 1 }
            });
            if (updated) {
                const updatedAnnouncement = await Announcement.findByPk('1');
                res.status(200).json(updatedAnnouncement);
            } else {
                res.status(404).json({ error: 'Announcement not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update announcement' });
        }
    }
}