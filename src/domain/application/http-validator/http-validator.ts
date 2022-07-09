import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const httpValidatorInterceptor = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

export const validate = (fields: string[], validators: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if(!fields.length){
            fields = [ ...Object.keys(req.params), ...Object.keys(req.body)];
        } else {
            Object.keys(req.body).forEach((element: string) => {
                if(fields.indexOf(element) === -1) fields.push(element);
            });
        }
        
        
        await Promise.all(
            fields.map((element: string) => {
                return validators[element]().run(req);
            })
        );

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    };
};