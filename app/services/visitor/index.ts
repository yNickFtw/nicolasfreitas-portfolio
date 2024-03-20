import { IApiResponse } from "@/app/interfaces/IApiResponse";
import { IVisitor } from "@/app/interfaces/models/IVisitor";
import AppError from "@/app/shared/helpers/AppError";
import { api } from "@/app/shared/helpers/api";

export default class VisitorService extends AppError {
    private appError: AppError

    constructor() {
        super()
        this.appError = new AppError();
    }

    public async create(): Promise<IApiResponse> {
        try {
            const response = await api.post(`/api/visitor/create`, null) 

            return { statusCode: response.status, data: response.data };
        } catch (error) {
            return this.appError.handleErrorResponse(error);
        }
    }

}