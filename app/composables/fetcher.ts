export function Fetcher() {
    const config = useRuntimeConfig()
    let baseUrl = config.public.apiBase;
    let defaultHeaders: HeadersInit = {

    };
    const handleError = (response: Response) => {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    };
    const withBaseUrl = (url: string) => {
        baseUrl = url;
        return self;
    };
    const withHeader = (header: HeadersInit) => {
        defaultHeaders=header;
        return self;
    };
    const request = async <T>(
        method: string,
        endpoint: string,
        data?: unknown
    ): Promise<T> => {
        const isFormData = data instanceof FormData;
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
        });

        if (!response.ok) handleError(response);
        return await response.json() as Promise<T>;
    };
    const get = async <T>(endpoint: string): Promise<T> => request<T>("GET", endpoint);
    const post = async <T>(endpoint: string, data: unknown): Promise<T> => request<T>("POST", endpoint, data);
    const put = async <T>(endpoint: string, data: unknown): Promise<T> => request<T>("PUT", endpoint, data);
    const deleteRequest = async <T>(endpoint: string, data: unknown): Promise<T> => request<T>("DELETE", endpoint,data);
    const self = {
        withHeader,
        withBaseUrl,
        get,
        post,
        put,
        delete: deleteRequest
    };
    return self;
}