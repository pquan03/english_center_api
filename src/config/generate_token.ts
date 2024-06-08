import jwt from 'jsonwebtoken'
import { Response } from 'express'

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '15m' })
}

export const generateRefreshToken = (payload: object, res: Response) => {
    const refresh_token = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '30d' })
    res.cookie('refreshtoken', refresh_token, { 
        // httpOnly: true, 
        // secure: true, 
        // sameSite: 'none', 
        path: '/api/auth/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
     })
     return refresh_token
}