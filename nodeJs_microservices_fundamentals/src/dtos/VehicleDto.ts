export class VehicleDto {
    constructor(public id: string, public make: string, public model: string,
                public registration: string | null, public year: number | null, public price: number | null) {
    }

}