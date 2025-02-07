import {VehicleModel} from "../models";

export class SeedData {
    public static readonly seedData = (): VehicleModel[] => {
        return [
            new VehicleModel("Make1", "Model1", "Reg123", 1900, 1000),
            new VehicleModel("Make2", "Model2", "Reg456", 2024, 2000),
            new VehicleModel("Make3", "Model3", "Reg789", 2025, 3000),
        ];
    }
}