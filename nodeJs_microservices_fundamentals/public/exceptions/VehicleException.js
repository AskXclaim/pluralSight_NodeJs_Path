"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleException = void 0;
class VehicleException extends Error {
    constructor(message) {
        super(message);
        this.name = 'VehicleException';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, VehicleException);
        }
    }
}
exports.VehicleException = VehicleException;
