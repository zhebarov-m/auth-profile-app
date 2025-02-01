import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiBase {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: BASE_API_URL,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

        this.client.interceptors.request.use((req) => {
            const isLogin = req.url?.includes('login');
            if (isLogin) return req;

            const token = localStorage.getItem('accessToken');
            if (token) {
                req.headers.authorization = `Bearer ${token}`;
            }

            return req;
        });

        this.client.interceptors.response.use(
            (res) => {
                return res;
            },

            async (e: AxiosError) => {
                if (e instanceof AxiosError && e.response?.status === 401) {
                    localStorage.clear();
                    window.location.replace(`/login`);
                }

                return Promise.reject(e);
            }
        );
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T>(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.post<T>(url, data, config);
        return response.data;
    }
}

export const apiService = new ApiBase();
