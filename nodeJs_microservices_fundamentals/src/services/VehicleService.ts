import {VehicleModel} from "../models";
import {VehicleException} from "../exceptions";
import {SeedData} from "../data";

export class VehicleService {
    private readonly vehicles: VehicleModel[] = [];

    constructor() {
        this.vehicles.push(...SeedData.seedData());
    }

    public async getAllVehicles(): Promise<VehicleModel[]> {
        return this.vehicles;
    }

    public async getVehicleById(id: string): Promise<VehicleModel | undefined> {
        return this.findVehicleById(id);
    }

    public async createVehicle(vehicle: VehicleModel): Promise<VehicleModel> {
        const doesVehicleExist = this.doesVehicleExist(vehicle.id);
        if (doesVehicleExist) {
            throw new VehicleException("Vehicle already exists");
        }
        this.vehicles.push(vehicle);
        return vehicle;
    }

    public async updateVehicle(vehicle: VehicleModel): Promise<VehicleModel> {
        const vehicleForUpdate: VehicleModel | undefined = this.findVehicleById(vehicle.id);
        if (!vehicleForUpdate) {
            throw new VehicleException("Vehicle to update not found");
        }
        const vehicleIndex = this.getVehicleIndex(vehicle.id);
        this.vehicles.splice(vehicleIndex, 1, vehicle);
        return vehicle;
    }

    public async deleteVehicle(id: string): Promise<boolean> {
        const vehicleToDeleteIndex = this.getVehicleIndex(id);
        if (vehicleToDeleteIndex === -1) {
            throw new VehicleException("Vehicle does not exist. Please check the id provided");
        }

        this.vehicles.splice(vehicleToDeleteIndex, 1);

        return true;
    }

    private findVehicleById(id: string): VehicleModel | undefined {
        return this.vehicles.find((vehicle) => vehicle.id === id);
    }

    private doesVehicleExist(id: string): boolean {
        return this.vehicles.some((vehicle): boolean => vehicle.id === id);
    }

    private getVehicleIndex(id: string): number {
        return this.vehicles.findIndex(vehicle => vehicle.id === id);
    }
}