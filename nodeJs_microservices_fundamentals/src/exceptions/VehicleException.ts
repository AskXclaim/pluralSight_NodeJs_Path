export class VehicleException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'VehicleException';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, VehicleException);
        }
    }
}