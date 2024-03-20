import AppError from "@/app/shared/helpers/AppError";
import { IApiResponse } from "@/app/interfaces/IApiResponse";
import { api } from "@/app/shared/helpers/api";
import { IProject } from "@/app/interfaces/models/IProject";

export default class ProjectService extends AppError {
    private appError: AppError

    constructor() {
        super()
        this.appError = new AppError();
    }

    public async create(project: IProject): Promise<IApiResponse> {
        try {
            const response = await api.post('/api/project/create', project)

            return { statusCode: response.status, data: response.data };
        } catch (error: any) {
            return this.appError.handleErrorResponse(error);
        }
    }

    public async addImage(image: { imageUrl: string, description: string, filename: string, projectId: string }): Promise<IApiResponse> {
        try {
            const response = await api.post(`/api/project/add/image`, image);

            return { statusCode: response.status, data: response.data };
        } catch (error) {
            return this.appError.handleErrorResponse(error);
        }
    }

}
