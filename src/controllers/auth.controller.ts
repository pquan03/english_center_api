import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken } from '../config/generate_token';
import bcrypt from 'bcrypt';
import Student from '../models/student.model';
import Admin from '../models/admin.model';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken'
import { IDecoded, IReqAuth } from '../utils/interface';
import Account from '../models/account.model';


export default {
    register: async (req: Request, res: Response) => {
        const { user_name,  password } = req.body;
        try {
            const id = uuidv4().toString();
            // const hashedPassword = await bcrypt.hash(password, 10);
            await Admin.create({id, user_name, password: password });
            res.status(200).json({ message: 'Admin created' });
        } catch(e: any) {
            console.log(e)
            res.status(500).json({ message: e.message })
        }
    }, 
    login: async (req: Request, res: Response) => {
        const { user_name, password } = req.body;
        console.log(req.body)
        try {
            const user = await Account.findOne({ where: { user_name } });
            if(!user) return res.status(400).json({ message: user_name + ' not found' }); 
            
            const isMatch = user.dataValues['password'] === password;
            if(!isMatch) return res.status(400).json({ message: 'Incorrect password' });

            const accessToken = generateAccessToken({
                id: user.dataValues['id'],
            });
            const refreshToken = generateRefreshToken({
                id: user.dataValues['id'],
            }, res);

            res.status(200).json({ message: 'Login successful', accessToken, refreshToken, user: user});
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }
    },
    logout: async (req: IReqAuth, res: Response) => {
        if(!req.user) return res.status(400).json({ message: 'Invalid Authentication' });
        try {res.clearCookie('refreshtoken', { 
            path: '/api/auth/refresh_token' });
            res.status(200).json({ message: 'Logout successful' });
        } catch(e: any) {
            res.status(500).json({ message: e.message });
        }   
    },
    refreshToken: async (req: Request, res: Response) => {
        console.log(req.cookies)
        try {
            const refreshToken = req.cookies.refreshtoken;
            if(!refreshToken) return res.status(400).json({ message: 'Refresh token not found' });
            const decoded = <IDecoded>jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`);
            if(!decoded.id) return res.status(400).json({ message: 'Invalid refresh token' });
            const admin = await Admin.findOne({ where: { id: decoded.id } });
            if(!admin) return res.status(400).json({ message: 'Admin not found' });
            const accessToken = generateAccessToken({ id: decoded.id });
            const newRefreshToken = generateRefreshToken({ id: decoded.id }, res);
            res.status(200).json({ message: 'Refresh token successful', accessToken, refreshToken: newRefreshToken, user: admin });
        } catch(e: any) {
            // console.log(e)s
            res.status(500).json({ message: e.message });
        }
    }
}