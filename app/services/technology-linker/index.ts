import { api } from "@/app/shared/helpers/api";
import { IApiResponse } from "@/app/interfaces/IApiResponse";
import AppError from "@/app/shared/helpers/AppError";

export default class TechnologyService extends AppError {
    private appError: AppError

    constructor() {
        super()
        this.appError = new AppError();
    }

    public async addTechToProject(languages: string[], projectId: string): Promise<IApiResponse> {
        try {
            const response = await api.post('/api/language/add/to/project', { languages: languages, projectId : projectId})

            return { statusCode: response.status, data: response.data }
        } catch (error: any) {
            return this.appError.handleErrorResponse(error);
        }
    }

    public async removeTechFromTechLinkerId(technologyLinkerId: string): Promise<IApiResponse> {
        try {
            const response = await api.delete(`/api/language/remove/from/project/${technologyLinkerId}`)

            return { statusCode: response.status, data: response.data };
        } catch (error) {
            return this.appError.handleErrorResponse(error);
        }
    }

}