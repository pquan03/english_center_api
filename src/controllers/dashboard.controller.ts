import { Request, Response } from "express";
import Student from "../models/student.model";
import Teacher from "../models/teacher.model";
import Class from "../models/class.model";
import sequelize from "sequelize";
import PaymentHistory from "../models/payment_history.model";
import TeacherPaid from "../models/teacher_paid.model";
import ClassCompletedLesson from "../models/class_lesson.model";
import Enrollment from "../models/enrollment.model";
import { randomInt } from "crypto";


export default  {
    getDashboard: async (req: Request, res: Response) => {
        try {
            const totalStudents = await Student.count();
            const totalTeachers = await Teacher.count();
            const totalStudentsJoinedByMonth = await Student.findAll({
                attributes: [
                    [sequelize.fn('MONTH', sequelize.col('date_joined')), 'date'],
                    [sequelize.fn('COUNT', sequelize.col('id')), 'value']
                ],
                group: ['date'],
                raw: true
            });

            // Get the change of students joined by quarter
            const totalStudentsJoinedByQuarter = await Student.findAll({
                attributes: [
                    [sequelize.fn('QUARTER', sequelize.col('date_joined')), 'date'],
                    [sequelize.fn('COUNT', sequelize.col('id')), 'value']
                ],
                group: ['date'],
                raw: true
            });

            // Get the change of students joined by year
            const totalStudentsJoinedByYear = await Student.findAll({
                attributes: [
                    [sequelize.fn('YEAR', sequelize.col('date_joined')), 'date'],
                    [sequelize.fn('COUNT', sequelize.col('id')), 'value']
                ],
                group: ['date'],
                raw: true
            });
            

            

            res.status(200).json({
                totalStudents,
                totalTeachers,
                totalStudentsJoinedByMonth,
                totalStudentsJoinedByQuarter,
                totalStudentsJoinedByYear,
            });
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    }, 
    getMoneyChartByRange: async (req: Request, res: Response) => {
        const { startDate, endDate } = req.query;
        console.log('startDate', startDate);
        console.log('endDate', endDate);
        try {

            // Generate list dates 10 each one from start date to end date have month and year
            const listDates = [];
            let currentDate = new Date(startDate as string);
            const end = new Date(endDate as string);
            while (currentDate <= end) {
                listDates.push({
                    month: currentDate.getMonth() + 1,
                    year: currentDate.getFullYear()
                });
                currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
            }


            // Get total money pay for teachers by range
            const totalPaidSalary = await TeacherPaid.findAll({
                attributes: [
                    [sequelize.fn('MONTH', sequelize.col('paid_date')), 'month'],
                    [sequelize.fn('YEAR', sequelize.col('paid_date')), 'year'],
                    [sequelize.fn('SUM', sequelize.col('amount')), 'value']
                ],
                where: {
                    paid_date: {
                        [sequelize.Op.gte]: startDate,
                        [sequelize.Op.lte]: endDate
                    }
                },
                group: ['month', 'year'],
                raw: true,
            });


            // Get total money collected from students by range
            const totalMoneyCollected = await PaymentHistory.findAll({
                attributes: [
                    [sequelize.fn('MONTH', sequelize.col('payment_date')), 'month'],
                    [sequelize.fn('YEAR', sequelize.col('payment_date')), 'year'],
                    [sequelize.fn('SUM', sequelize.col('amount')), 'value']
                ],
                where: {
                    payment_date: {
                        [sequelize.Op.gte]: startDate,
                        [sequelize.Op.lte]: endDate
                    }
                },
                group: ['month', 'year'],
                raw: true
            });

            // Get expected money from students by range
            const expectedMoney = await Class.findAll({
                attributes: ['id', 'class_name', 'monthly_tuition_fee', [sequelize.fn('COUNT', sequelize.col('students.id')), 'total_students']],
                include: [{
                    model: Student,
                    attributes: [],
                    duplicating: false
                }],
                group: ['class.id'],
                raw: true
            });


            const totalExpectedMoney = expectedMoney.reduce((acc: any, item: any) => {
                return acc + (item.monthly_tuition_fee * item.total_students);
            }, 0);

            const findValue = (arr: any, month: any, year: any) => {
                const found = arr.find((item: any) => item.month === month && item.year === year);
                return found ? found.value : 0;
            };
            
            // Combine the data into a single array
            const combinedData = listDates.map(({ month, year }) => ({
                date: `${month}/${year}`,
                totalPaidSalary: findValue(totalPaidSalary, month, year),
                totalMoneyCollected: findValue(totalMoneyCollected, month, year), 
                totalExpectedMoney: totalExpectedMoney - (randomInt(0, 100) * 1000)
            }));

            res.status(200).json(combinedData);
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    }
}