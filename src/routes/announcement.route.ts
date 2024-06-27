

import express from 'express';
import announcementController from '../controllers/announcement.controller';
const router = express.Router();


router.route('/')
    .get(announcementController.getAnnouncements)
    .post(announcementController.createAnnouncement)
    .put(announcementController.updateAnnouncement)



export default router;