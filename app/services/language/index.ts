import AppError from "@/app/shared/helpers/AppError";
import { IApiResponse } from "@/app/interfaces/IApiResponse";
import { api } from "@/app/shared/helpers/api";

export default class LanguageService extends AppError {
    private appError: AppError;

    constructor() {
        super()
        this.appError = new AppError()
    }

    public async create(data: any): Promise<IApiResponse> {
        try {
            const response = await api.post('/api/language/create', data)

            return { statusCode: response.status, data: response.data };
        } catch (error: any) {
            return this.appError.handleErrorResponse(error);
        }
    }

}
