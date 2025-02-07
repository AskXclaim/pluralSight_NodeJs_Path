export class VehicleException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'VehicleException';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, VehicleException);
        }
    }
}

export class VehicleIdRequiredException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'VehicleIdRequiredException';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, VehicleIdRequiredException);
        }
    }
}

export class VehicleNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'VehicleNotFoundException';
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, VehicleNotFoundException);
        }
    }
}