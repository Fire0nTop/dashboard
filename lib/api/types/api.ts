export interface LoginRequest {
    account: string;
    password?: string;
    code?: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    loginType: string;
    expiresIn: number;
}

export interface ApiResponse<T = unknown> {
    message?: string;
    code?: number | null;
    error?: string | null;
    data?: T;
}

export interface Device {
    dev_id: string;
    name?: string;
    dev_name?: string;
    online: boolean;
    print_status?: string;
    dev_model_name: string;
    dev_product_name: string;
    dev_access_code: string;
    task_id?: string | null;
    task_name?: string | null;
    task_status?: string | null;
    model_id?: string | null;
    project_id?: string | null;
    profile_id?: string | null;
    start_time?: string | null;
    prediction?: number | null;
    progress?: number | null;
    thumbnail?: string | null;
}

export interface AmsDetailMapping {
    slot?: number;
    color?: string;
    material?: string;
    brand?: string;
}

export interface Task {
    id: number;
    designId: number;
    modelId: string;
    title: string;
    cover: string;
    status: number;
    feedbackStatus: number;
    startTime: string;
    endTime: string;
    weight: number;
    costTime: number;
    profileId: number;
    plateIndex: number;
    deviceId: string;
    amsDetailMapping: AmsDetailMapping[];
    mode: string;
}

export interface Project {
    project_id: string;
    user_id: string;
    model_id: string;
    status: string;
    name: string;
    content: string;
    create_time: string;
    update_time: string;
    profiles?: Profile[];
    download_url?: string | null;
    download_md5?: string | null;
    keystore_xml?: string | null;
    upload_url?: string | null;
    upload_ticket?: string | null;
}

export interface Profile {
    profile_id: string;
    model_id: string;
    status: string;
    name: string;
    content: string;
    create_time: string;
    update_time: string;
    context?: {
        compatibility: {
            dev_model_name: string;
            dev_product_name: string;
            nozzle_diameter: number;
        };
        plates: Array<{
            index: number;
            thumbnail: {
                name: string;
                dir: string;
                url: string;
            };
            prediction: number;
            weight: number;
            gcode: {
                name: string | null;
                dir: string | null;
                url: string | null;
            };
            filaments: Array<{
                id: string;
                type: string;
                color: string;
                used_m: string;
                used_g: string;
            }>;
        }>;
        materials: Array<{
            color: string;
            material: string;
        }>;
    };
    filename?: string;
    url?: string;
    md5?: string;
}

export interface UserPreferences {
    uid: number;
    name: string;
    handle: string;
    avatar: string;
    bio: string;
    links: string[];
    backgroundUrl: string;
}

export interface SlicerSetting {
    setting_id: string;
    version: string;
    name: string;
    nickname: string | null;
    filament_id: string | null;
}

export interface TTCodeResponse {
    ttcode: string;
    passwd: string;
    authkey: string;
}

export interface MessageHit {
    id?: string;
    type?: string;
    content?: string;
    timestamp?: string;
}

export interface DeviceVersionInfo {
    version?: string;
    dev_id?: string;
    model?: string;
}

export interface SlicerResource {
    name?: string;
    version?: string;
    url?: string;
    type?: string;
}

export interface NotificationResponse {
    status?: string;
    message?: string;
    data?: Record<string, unknown>;
}

export interface TaskResponse extends Omit<Task, 'amsDetailMapping'> {
    amsDetailMapping: AmsDetailMapping[];
}