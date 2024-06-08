import { Request, Response, NextFunction } from 'express';
import Admin from '../models/admin.model';
import jwt from 'jsonwebtoken';
import { IDecoded, IReqAuth } from '../utils/interface';

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
   try {
      const token = req.header('Authorization')
      if (!token) return res.status(400).json({ msg: 'Invalid Authentication' })
      const decode = <IDecoded>jwt.verify(token, `${process.env.ACCESS_TOKEN_SERECT}`)
      if (!decode) return res.status(400).json({ msg: 'Invalid Authentication' })
        const user = await Admin.findOne({ where: { id: decode.id } })
      if (!user) return res.status(400).json({ msg: 'The user does not exist' })
      req.user = user.dataValues;
      next();
   }
   catch (err: any) {
      return res.status(500).json({ msg: err.message })
   }
}



export default auth;
