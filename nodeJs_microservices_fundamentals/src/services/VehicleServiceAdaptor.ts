import {VehicleService} from "./VehicleService";
import {VehicleModel} from "../models";
import {VehicleException, VehicleIdRequiredException, VehicleNotFoundException} from "../exceptions";
import {Request} from "express";
import {VehicleDto} from "../dtos";

export class VehicleServiceAdaptor {
    constructor(private readonly service: VehicleService) {
    }

    public async getAllVehicles(): Promise<VehicleDto[]> {
        const vehicles = await this.service.getAllVehicles();
        return vehicles.map(vehicle => vehicle.convertToVehicleDto());
    };

    public async getVehicleById(req: Request): Promise<VehicleDto> {
        const id: any = req.params?.id;
        if (id === undefined || id === null) {
            throw new VehicleIdRequiredException("vehicle id is required");
        }
        const vehicle: VehicleModel | undefined = await this.service.getVehicleById(id);
        if (vehicle === undefined || vehicle === null) {
            throw new VehicleNotFoundException(`Did not find a vehicle with id:${id}`);
        }
        return vehicle.convertToVehicleDto();
    }

    public async createVehicle(req: Request): Promise<VehicleDto> {
        const data = req.body;
        if (data === undefined || data === null) {
            throw new VehicleException("vehicle data is required");
        }
        const vehicle = new VehicleModel(data.make, data.model, data.registration, data.year, data.price);

        const createdVehicle = await this.service.createVehicle(vehicle);
        return createdVehicle.convertToVehicleDto();
    }

    public async updateVehicle(req: Request): Promise<VehicleDto> {
        const vehicleId = req.params?.id;
        const vehicleDetails = req.body;

        if (vehicleId === undefined || vehicleId === null) {
            throw new VehicleIdRequiredException("vehicle id is required");
        }

        if (vehicleDetails === undefined || vehicleDetails === null) {
            throw new VehicleException("vehicle data is required");
        }
        const vehicleToUpdate = new VehicleModel
        (vehicleDetails.make, vehicleDetails.model, vehicleDetails.registration, vehicleDetails.year, vehicleDetails.price, vehicleId);
        const updatedVehicle = await this.service.updateVehicle(vehicleToUpdate);
        return updatedVehicle.convertToVehicleDto();
    }

    public async deleteVehicle(req: Request): Promise<boolean> {
        const vehicleId = req.params?.id;
        if (vehicleId === undefined || vehicleId === null) {
            throw new VehicleIdRequiredException("vehicle id is required");
        }
        return await this.service.deleteVehicle(vehicleId);
    }
}