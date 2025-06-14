import { useState, useEffect, useCallback } from 'react';
import { bambuApi } from '@/lib/api/services/bambuApi';
import type { Device, Project, UserPreferences, TaskResponse } from '@/types/api';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsAuthenticated(bambuApi.isAuthenticated());
        setLoading(false);
    }, []);

    const login = useCallback(async (credentials: { account: string; password?: string; code?: string }) => {
        try {
            await bambuApi.login(credentials);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
        }
    }, []);

    const logout = useCallback(() => {
        bambuApi.logout();
        setIsAuthenticated(false);
    }, []);

    return {
        isAuthenticated,
        loading,
        login,
        logout,
    };
}

export function useDevices() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDevices = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { devices } = await bambuApi.getDevices();
            setDevices(devices);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch devices');
        } finally {
            setLoading(false);
        }
    }, []);

    const updateDevice = useCallback(async (deviceId: string, updates: Partial<Device>) => {
        try {
            await bambuApi.updateDeviceInfo(deviceId, updates);
            await fetchDevices(); // Refresh the list
            return { success: true };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Update failed' };
        }
    }, [fetchDevices]);

    useEffect(() => {
        if (bambuApi.isAuthenticated()) {
            fetchDevices();
        }
    }, [fetchDevices]);

    return {
        devices,
        loading,
        error,
        refetch: fetchDevices,
        updateDevice,
    };
}

export function useTasks(deviceId?: string) {
    const [tasks, setTasks] = useState<TaskResponse[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await bambuApi.getTasks({ deviceId });
            setTasks(response.hits);
            setTotal(response.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, [deviceId]);

    useEffect(() => {
        if (bambuApi.isAuthenticated()) {
            fetchTasks();
        }
    }, [fetchTasks]);

    return {
        tasks,
        total,
        loading,
        error,
        refetch: fetchTasks,
    };
}

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { projects } = await bambuApi.getProjects();
            setProjects(projects);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (bambuApi.isAuthenticated()) {
            fetchProjects();
        }
    }, [fetchProjects]);

    return {
        projects,
        loading,
        error,
        refetch: fetchProjects,
    };
}

export function useUserPreferences() {
    const [preferences, setPreferences] = useState<UserPreferences | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPreferences() {
            if (!bambuApi.isAuthenticated()) return;

            try {
                setLoading(true);
                setError(null);
                const prefs = await bambuApi.getUserPreferences();
                setPreferences(prefs);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch preferences');
            } finally {
                setLoading(false);
            }
        }

        fetchPreferences();
    }, []);

    return {
        preferences,
        loading,
        error,
    };
}