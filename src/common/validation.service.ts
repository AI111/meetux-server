/**
 * Created by sasha on 6/20/17.
 */
import {Request, Response, NextFunction} from 'express'
import {ObjectSchema, validate} from "joi";
export const validateReauest = (schema: ObjectSchema, key: string = "body") => {
    return function(req: Request, res: Response, next: NextFunction) {
        const result = validate(req[key], schema);
        if(!result.error) return next();
        return res.status(422).json(result.error.details);
    }
}