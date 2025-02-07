export class ErrorDto {
    constructor(public isSuccess: boolean, public statusCode: number, public message: string, public stack: object) {
    }
}