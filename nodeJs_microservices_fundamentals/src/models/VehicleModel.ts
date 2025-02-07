import {VehicleException} from "../exceptions";
import {nanoid} from "nanoid";
import {AutoMap} from "@automapper/classes";
import {VehicleDto} from "../dtos"; //use to generate unique Id

export class VehicleModel {
    readonly #firstCarBuildYear = 1885;
    readonly #minLowestCarPrice = 0;
    #id: string = "";
    #modelMake: string = "";
    #model: string = "";
    #registration: string | null = null;
    #year: number | null = null;
    #price: number | null = null;

    constructor(make: string, model: string, registration: string | null, year: number, price: number, id: string = "") {
        this.make = make;
        this.model = model;
        this.registration = registration;
        this.year = year;
        this.price = price;
        this.id = id;
    }

    set make(value: string) {
        if (!this.#isStringValueValid(value)) {
            throw new VehicleException("make cannot be an empty string");
        }
        this.#modelMake = value;
    }

    get make(): string {
        return this.#modelMake;
    }

    set model(value: string) {
        if (!this.#isStringValueValid(value)) {
            throw new VehicleException("model cannot be an empty string");
        }
        this.#model = value;
    }

    get model(): string {
        return this.#model;
    }

    set registration(value: string | null) {
        if (value && !this.#isStringValueValid(value)) {
            throw new VehicleException("registration cannot be an empty string");
        }
        this.#registration = value;
    }

    get registration(): string | null {
        return this.#registration;
    }

    set year(value: number) {
        const currentYear = new Date().getFullYear();
        if (value < this.#firstCarBuildYear || value > currentYear) {
            throw new VehicleException(`year cannot be a year before ${this.#firstCarBuildYear} or after ${currentYear}`);
        }
        this.#year = value;
    }

    get year(): number | null {
        return this.#year;
    }

    set price(value: number) {
        if (value < this.#minLowestCarPrice) {
            throw new VehicleException(`price cannot be lower than ${this.#minLowestCarPrice}`);
        }
        this.#price = value;
    }

    get price(): number | null {
        return this.#price;
    }

    set id(value: string) {
        this.#id = value === null || value === undefined || value.trim().length === 0 ? nanoid(10) : value.trim();
    }

    get id() {
        return this.#id;
    }

    #isStringValueValid = (value: string): boolean => !!(value && !parseInt(value));

    public convertToVehicleDto = (): VehicleDto =>
        new VehicleDto(this.id, this.model, this.make,
            this.registration, this.year, this.price);

}
