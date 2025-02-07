// import http from "http";
import {VehicleService, VehicleServiceAdaptor} from "./services";
import {VehicleDto} from "./dtos";
import {errorHandler} from "./middlewares";
import express, {NextFunction, Request, Response} from "express";

const port = parseInt(process.env.PORT ?? "3000");
const vehicleServiceAdaptor = new VehicleServiceAdaptor(new VehicleService());
const apiRoute = "/api";
const vehicleRoute = `${apiRoute}/vehicle`;
const vehicleIdRoute = `${vehicleRoute}/:id`;
const expressApp = express();
expressApp.use(express.json());

// const hostName = process.env.HOST ?? "127.0.0.1";
// const server =
//     http.createServer((req, res) => {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "text/plain");
//         res.end("Hello World\n");
//     });
//
// server.listen(port, hostName, () => {
//     console.log(`Server started and running on http://${hostName}:${port}/`);
// });


//http://localhost:3000/vehicleHealthCheck

expressApp.get(`${apiRoute}`, (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(301).redirect("vehicleHealthCheck");
    } catch (err: any) {
        next(err);
    }
})
expressApp.get(`${apiRoute}/vehicleHealthCheck`, (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.send("Health check --- Vehicle service is healthy");
    } catch (err: any) {
        next(err);
    }
});

expressApp.get(`${apiRoute}/vehicles`, async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const vehicles: VehicleDto[] = await vehicleServiceAdaptor.getAllVehicles();
        res.status(200).send(vehicles);
    } catch (err: any) {
        next(err);
    }
});

expressApp.get(`${vehicleIdRoute}`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requiredVehicle = await vehicleServiceAdaptor.getVehicleById(req);
        res.status(200).json(requiredVehicle);
    } catch (err: any) {
        next(err);
    }
})
expressApp.post(`${vehicleRoute}`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdVehicle = await vehicleServiceAdaptor.createVehicle(req);
        res.status(201).json(createdVehicle);
    } catch (err: any) {
        next(err);
    }
});
expressApp.put(`${vehicleIdRoute}`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedVehicle = await vehicleServiceAdaptor.updateVehicle(req);
        res.status(200).json(updatedVehicle);
    } catch (err: any) {
        next(err);
    }
});

expressApp.delete(`${vehicleIdRoute}`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await vehicleServiceAdaptor.deleteVehicle(req);
        res.status(204).end();
    } catch (err: any) {
        next(err);
    }
});

expressApp.get("*", (_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).json("Route Not Found");
})

expressApp.use(errorHandler);

expressApp.listen(port, () => {
    console.log(`Express App server is listening on port ${port}`);
});
