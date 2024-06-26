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

    public async delete(languageId: string): Promise<IApiResponse> {
        try {
            const response = await api.delete(`/api/language/remove/${languageId}`);

            return { statusCode: response.status, data: response.data };
        } catch (error) {
            return this.appError.handleErrorResponse(error);
        }
    }

    public async import(languages: { name: string, icon: string, slug: string }[]): Promise<IApiResponse> {
        try {
            const response = await api.post(`/api/language/import`, { languages })

            return { statusCode: response.status, data: response.data };
        } catch (error) {
            return this.appError.handleErrorResponse(error);
        }
    }

}
