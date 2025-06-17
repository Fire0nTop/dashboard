import {
    ApiResponse, BambuProfile,
    Device, DeviceVersionInfo,
    LoginRequest,
    LoginResponse, MessageHit, NotificationResponse,
    Project, SlicerResource,
    SlicerSetting,
    Task, TaskResponse,
    TTCodeResponse,
    UserPreferences
} from "@/types";

class BambuLabApiService {
    private baseUrl = 'https://api.bambulab.com';
    private accessToken: string | null = null;

    constructor() {
        // Initialize token from localStorage if available (client-side only)
        if (typeof window !== 'undefined') {
            this.accessToken = localStorage.getItem('bambu_access_token');
        }
    }

    private async makeRequest<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string> || {}),
        };

        // Add authorization header if token exists and not login endpoint
        if (this.accessToken && !endpoint.includes('/login') && !endpoint.includes('/refreshtoken')) {
            headers['Authorization'] = `Bearer ${this.accessToken}`;
        }

        const config: RequestInit = {
            ...options,
            headers,
        };

        // Ensure GET requests have empty body
        if (options.method === 'GET' || !options.method) {
            delete config.body;
        }

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json() as T;
        } catch (error) {
            console.error(`API request failed for ${endpoint}:`, error);
            throw error;
        }
    }

    // Authentication methods
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await this.makeRequest<LoginResponse>(
            '/v1/user-service/user/login',
            {
                method: 'POST',
                body: JSON.stringify(credentials),
            }
        );

        // Store token for subsequent requests
        this.accessToken = response.accessToken;
        if (typeof window !== 'undefined') {
            localStorage.setItem('bambu_access_token', response.accessToken);
            localStorage.setItem('bambu_refresh_token', response.refreshToken);
        }

        return response;
    }

    async refreshToken(refreshToken: string): Promise<LoginResponse> {
        const response = await this.makeRequest<LoginResponse>(
            '/v1/user-service/user/refreshtoken',
            {
                method: 'POST',
                body: JSON.stringify({ refreshToken }),
            }
        );

        this.accessToken = response.accessToken;
        if (typeof window !== 'undefined') {
            localStorage.setItem('bambu_access_token', response.accessToken);
            localStorage.setItem('bambu_refresh_token', response.refreshToken);
        }

        return response;
    }

    logout(): void {
        this.accessToken = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('bambu_access_token');
            localStorage.removeItem('bambu_refresh_token');
        }
    }

    isAuthenticated(): boolean {
        return !!this.accessToken;
    }

    // User service methods
    async getMessages(params?: {
        type?: string;
        after?: string;
        limit?: number;
    }): Promise<{ hits: MessageHit[] }> {
        const queryParams = new URLSearchParams();
        if (params?.type) queryParams.append('type', params.type);
        if (params?.after) queryParams.append('after', params.after);
        if (params?.limit) queryParams.append('limit', params.limit.toString());

        const endpoint = `/v1/user-service/my/messages${
            queryParams.toString() ? `?${queryParams.toString()}` : ''
        }`;

        return this.makeRequest<{ hits: MessageHit[] }>(endpoint);
    }

    async getTasks(params?: {
        deviceId?: string;
        after?: string;
        limit?: number;
    }): Promise<{ total: number; hits: TaskResponse[] }> {
        const queryParams = new URLSearchParams();
        if (params?.deviceId) queryParams.append('deviceId', params.deviceId);
        if (params?.after) queryParams.append('after', params.after);
        if (params?.limit) queryParams.append('limit', params.limit.toString());

        const endpoint = `/v1/user-service/my/tasks${
            queryParams.toString() ? `?${queryParams.toString()}` : ''
        }`;

        return this.makeRequest<{ total: number; hits: TaskResponse[] }>(endpoint);
    }

    async createTask(task: Partial<Task>): Promise<ApiResponse> {
        return this.makeRequest<ApiResponse>('/v1/user-service/my/task', {
            method: 'POST',
            body: JSON.stringify(task),
        });
    }

    async getUserPreferences(): Promise<UserPreferences> {
        return this.makeRequest<UserPreferences>(
            '/v1/design-user-service/my/preference'
        );
    }

    // Device management methods
    async getDevices(): Promise<{ devices: Device[] }> {
        const response = await this.makeRequest<ApiResponse<{ devices: Device[] }>>(
            '/v1/iot-service/api/user/bind'
        );
        return { devices: response.data?.devices || [] };
    }

    async updateDeviceInfo(deviceId: string, updates: Partial<Device>): Promise<ApiResponse> {
        return this.makeRequest<ApiResponse>('/v1/iot-service/api/user/device/info', {
            method: 'PATCH',
            body: JSON.stringify({
                dev_id: deviceId,
                ...updates,
            }),
        });
    }

    async getDeviceVersion(deviceId: string): Promise<{ devices: DeviceVersionInfo[] }> {
        return this.makeRequest<{ devices: DeviceVersionInfo[] }>(
            `/v1/iot-service/api/user/device/version?dev_id=${deviceId}`
        );
    }

    async getPrintStatus(force = true): Promise<{ devices: Device[] }> {
        const endpoint = `/v1/iot-service/api/user/print${force ? '?force=true' : ''}`;
        const response = await this.makeRequest<ApiResponse<{ devices: Device[] }>>(endpoint);
        return { devices: response.data?.devices || [] };
    }

    async getTTCode(deviceId: string): Promise<TTCodeResponse> {
        const response = await this.makeRequest<ApiResponse<TTCodeResponse>>(
            '/v1/iot-service/api/user/ttcode',
            {
                method: 'POST',
                body: JSON.stringify({ dev_id: deviceId }),
            }
        );
        return {
            ttcode: response.data?.ttcode || '',
            passwd: response.data?.passwd || '',
            authkey: response.data?.authkey || '',
        };
    }

    // Project management methods
    async getProjects(): Promise<{ projects: Project[] }> {
        const response = await this.makeRequest<ApiResponse<{ projects: Project[] }>>(
            '/v1/iot-service/api/user/project'
        );
        return { projects: response.data?.projects || [] };
    }

    async getProject(projectId: string): Promise<Project> {
        return this.makeRequest<Project>(
            `/v1/iot-service/api/user/project/${projectId}`
        );
    }

    async getProfile(profileId: string, modelId: string): Promise<BambuProfile> {
        return this.makeRequest<BambuProfile>(
            `/v1/iot-service/api/user/profile/${profileId}?model_id=${modelId}`
        );
    }

    // Slicer methods
    async getSlicerResources(typeVersionPairs?: Record<string, string>): Promise<{
        software: SlicerResource;
        guide: SlicerResource;
        resources: SlicerResource[];
    }> {
        const queryParams = new URLSearchParams();
        if (typeVersionPairs) {
            Object.entries(typeVersionPairs).forEach(([type, version]) => {
                queryParams.append(type, version);
            });
        }

        const endpoint = `/v1/iot-service/api/slicer/resource${
            queryParams.toString() ? `?${queryParams.toString()}` : ''
        }`;

        const response = await this.makeRequest<ApiResponse<{
            software: SlicerResource;
            guide: SlicerResource;
            resources: SlicerResource[];
        }>>(endpoint);

        return {
            software: response.data?.software || {} as SlicerResource,
            guide: response.data?.guide || {} as SlicerResource,
            resources: response.data?.resources || [],
        };
    }

    async getSlicerSettings(version: string): Promise<{
        print: { public: SlicerSetting[]; private: SlicerSetting[] };
        printer: { public: SlicerSetting[]; private: SlicerSetting[] };
        filament: { public: SlicerSetting[]; private: SlicerSetting[] };
    }> {
        const response = await this.makeRequest<ApiResponse<{
            print: { public: SlicerSetting[]; private: SlicerSetting[] };
            printer: { public: SlicerSetting[]; private: SlicerSetting[] };
            filament: { public: SlicerSetting[]; private: SlicerSetting[] };
        }>>(`/v1/iot-service/api/slicer/setting?version=${version}`);

        return {
            print: response.data?.print || { public: [], private: [] },
            printer: response.data?.printer || { public: [], private: [] },
            filament: response.data?.filament || { public: [], private: [] },
        };
    }

    async getSlicerSetting(settingId: string): Promise<{
        public: boolean;
        version: string;
        type: string;
        name: string;
        nickname: string | null;
        base_id: string | null;
        setting: Record<string, unknown>;
        filament_id: string | null;
    }> {
        return this.makeRequest<{
            public: boolean;
            version: string;
            type: string;
            name: string;
            nickname: string | null;
            base_id: string | null;
            setting: Record<string, unknown>;
            filament_id: string | null;
        }>(`/v1/iot-service/api/slicer/setting/${settingId}`);
    }

    // Notification methods
    async getNotification(action: 'upload' | 'import_mesh', ticketId: string): Promise<NotificationResponse> {
        return this.makeRequest<NotificationResponse>(
            `/v1/iot-service/api/user/notification?action=${action}&ticket=${ticketId}`
        );
    }
}

// Create singleton instance
export const bambuApi = new BambuLabApiService();