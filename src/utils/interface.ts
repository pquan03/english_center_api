import { Request } from 'express';



export interface IDecoded {
    id: string;
    iat: number;
    exp: number;
}

export interface IAdmin {
    id: string;
    user_name: string;
    password: string;
}

export interface IReqAuth extends Request { 
    user?: IAdmin;
}