import { IApiResponse } from "@/app/interfaces/IApiResponse";
import AppError from "@/app/shared/helpers/AppError";
import { api } from "@/app/shared/helpers/api";

export default class VisitService extends AppError {
    private appError: AppError

    constructor() {
        super()
        this.appError = new AppError();
    }

    public async create(visitorId: string, userAgent: string, code: string | null): Promise<IApiResponse> {
        try {
            const response = await api.post(`/api/visit/${visitorId}/create`, { userAgent: userAgent, special_code: code }) 

            return { statusCode: response.status, data: response.data };
        } catch (error) {
            return this.appError.handleErrorResponse(error);
        }
    }

}