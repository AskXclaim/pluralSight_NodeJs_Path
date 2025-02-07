import {NextFunction, Request, Response} from "express";
import {ErrorDto} from "./models";

const env = process.env.NODE_ENV ?? 'development';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    let statusCode = 500;
    const message = err.message || "Oops something went wrong";
    const stack = env === "development" ? err.stack : {};
    console.error(stack);
    switch (err.name) {
        case "VehicleIdRequiredException":
        case "VehicleException":
            statusCode = 400;
            break;
        case "VehicleNotFoundException":
            statusCode = 404;
            break;
        default:
            break;
    }
    res.status(statusCode).json(new ErrorDto(false, statusCode, message, stack));
}

export {errorHandler};