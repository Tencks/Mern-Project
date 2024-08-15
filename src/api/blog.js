import { ENV } from "../Utils";

export class Post {
    baseApi = ENV.BASE_API;

    async getPost(page = 1, limit = 10){
        try {
            const pageFilter= `page=${page}`;
            const limitFilter = `limit=${limit}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.POST}?${pageFilter}&${limitFilter}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }
}