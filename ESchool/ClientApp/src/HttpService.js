import authService from '../src/components/api-authorization/AuthorizeService'

export class HttpService {
    async postToServer(url, callback, params, isAuth = true) {
        let headers = {};
        if (isAuth) {
            let token = await authService.getAccessToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }
        headers['Content-Type'] = 'application/json';
        let response = await fetch(url, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(params)
        });
        callback(await response.json());
    }
}

const httpService = new HttpService();

export default httpService;