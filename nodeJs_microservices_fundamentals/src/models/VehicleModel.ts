import {VehicleException} from "../exceptions";
import {nanoid} from "nanoid"; //use to generate unique Id

export class VehicleModel {
    readonly #firstCarBuildYear = 1885;
    readonly #minLowestCarPrice = 0;
    #id:string;
    constructor( make: string, model: string, registration: string | null, year: number, price: number) {
        this.make = make;
        this.model = model;
        this.registration = registration;
        this.year = year;
        this.price = price;
        this.#id = nanoid(10);
    }

    set make(value: string) {
        if (!this.#isStringValueValid(value)) {
            throw new VehicleException("make cannot be an empty string");
        }
        this.make = value;
    }

    set model(value: string) {
        if (!this.#isStringValueValid(value)) {
            throw new VehicleException("model cannot be an empty string");
        }
        this.model = value;
    }

    set registration(value: string | null) {
        if (value && !this.#isStringValueValid(value)) {
            throw new VehicleException("registration cannot be an empty string");
        }
        this.registration = value;
    }

    set year(value: number) {
        const currentYear = new Date().getFullYear();
        if (value < this.#firstCarBuildYear || value > currentYear) {
            throw new VehicleException(`year cannot be an before ${this.#firstCarBuildYear} or after ${currentYear}`);
        }
        this.year = value;
    }

    set price(value: number) {
        if (value < this.#minLowestCarPrice) {
            throw new VehicleException(`price cannot be lower than ${this.#minLowestCarPrice}`);
        }
        this.price = value;
    }

    get id() {
        return this.#id;
    }
    #isStringValueValid = (value: string): boolean => !!(value && !parseInt(value));
}
