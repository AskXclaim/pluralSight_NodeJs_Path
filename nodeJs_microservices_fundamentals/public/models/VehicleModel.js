"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _VehicleModel_firstCarBuildYear, _VehicleModel_minLowestCarPrice, _VehicleModel_id, _VehicleModel_isStringValueValid;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleModel = void 0;
const exceptions_1 = require("../exceptions");
const nanoid_1 = require("nanoid"); //use to generate unique Id
class VehicleModel {
    constructor(make, model, registration, year, price) {
        _VehicleModel_firstCarBuildYear.set(this, 1885);
        _VehicleModel_minLowestCarPrice.set(this, 0);
        _VehicleModel_id.set(this, void 0);
        _VehicleModel_isStringValueValid.set(this, (value) => !!(value && !parseInt(value)));
        this.make = make;
        this.model = model;
        this.registration = registration;
        this.year = year;
        this.price = price;
        __classPrivateFieldSet(this, _VehicleModel_id, (0, nanoid_1.nanoid)(10), "f");
    }
    set make(value) {
        if (!__classPrivateFieldGet(this, _VehicleModel_isStringValueValid, "f").call(this, value)) {
            throw new exceptions_1.VehicleException("make cannot be an empty string");
        }
        this.make = value;
    }
    set model(value) {
        if (!__classPrivateFieldGet(this, _VehicleModel_isStringValueValid, "f").call(this, value)) {
            throw new exceptions_1.VehicleException("model cannot be an empty string");
        }
        this.model = value;
    }
    set registration(value) {
        if (value && !__classPrivateFieldGet(this, _VehicleModel_isStringValueValid, "f").call(this, value)) {
            throw new exceptions_1.VehicleException("registration cannot be an empty string");
        }
        this.registration = value;
    }
    set year(value) {
        const currentYear = new Date().getFullYear();
        if (value < __classPrivateFieldGet(this, _VehicleModel_firstCarBuildYear, "f") || value > currentYear) {
            throw new exceptions_1.VehicleException(`year cannot be an before ${__classPrivateFieldGet(this, _VehicleModel_firstCarBuildYear, "f")} or after ${currentYear}`);
        }
        this.year = value;
    }
    set price(value) {
        if (value < __classPrivateFieldGet(this, _VehicleModel_minLowestCarPrice, "f")) {
            throw new exceptions_1.VehicleException(`price cannot be lower than ${__classPrivateFieldGet(this, _VehicleModel_minLowestCarPrice, "f")}`);
        }
        this.price = value;
    }
    get id() {
        return __classPrivateFieldGet(this, _VehicleModel_id, "f");
    }
}
exports.VehicleModel = VehicleModel;
_VehicleModel_firstCarBuildYear = new WeakMap(), _VehicleModel_minLowestCarPrice = new WeakMap(), _VehicleModel_id = new WeakMap(), _VehicleModel_isStringValueValid = new WeakMap();
