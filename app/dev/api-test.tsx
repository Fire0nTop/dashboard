"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/custom/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import {LoginRequest} from "@/lib/api/types/api";
import {bambuApi} from "@/lib/api/services/bambuApi";

export default function BambuApiTestPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState<Record<string, boolean>>({});
    const [results, setResults] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [credentials, setCredentials] = useState<LoginRequest>({
        account: '',
        password: '',
        code: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        setIsAuthenticated(bambuApi.isAuthenticated());
    }, []);

    const setLoadingState = (key: string, value: boolean) => {
        setLoading(prev => ({ ...prev, [key]: value }));
    };

    const setResult = (key: string, value: any) => {
        setResults(prev => ({ ...prev, [key]: value }));
        setErrors(prev => ({ ...prev, [key]: '' }));
    };

    const setError = (key: string, error: string) => {
        setErrors(prev => ({ ...prev, [key]: error }));
        setResults(prev => ({ ...prev, [key]: null }));
    };

    const handleApiCall = async (key: string, apiCall: () => Promise<any>) => {
        setLoadingState(key, true);
        try {
            const result = await apiCall();
            setResult(key, result);
        } catch (error: any) {
            setError(key, error.message || 'An error occurred');
        } finally {
            setLoadingState(key, false);
        }
    };

    const handleLogin = async () => {
        if (!credentials.account || (!credentials.password && !credentials.code)) {
            setError('login', 'Please provide account and either password or verification code');
            return;
        }

        setLoadingState('login', true);
        try {
            const result = await bambuApi.login(credentials);
            setResult('login', result);
            setIsAuthenticated(true);
        } catch (error: any) {
            setError('login', error.message || 'Login failed');
        } finally {
            setLoadingState('login', false);
        }
    };

    const handleLogout = () => {
        bambuApi.logout();
        setIsAuthenticated(false);
        setResults({});
        setErrors({});
    };

    const handleRefreshToken = async () => {
        setLoadingState('refresh', true);
        try {
            const refreshToken = localStorage.getItem('bambu_refresh_token');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }
            const result = await bambuApi.refreshToken(refreshToken);
            setResult('refresh', result);
        } catch (error: any) {
            setError('refresh', error.message || 'Refresh token failed');
        } finally {
            setLoadingState('refresh', false);
        }
    };

    const ResultDisplay = ({ data, error, loading, title }: {
        data: any,
        error: string,
        loading: boolean,
        title: string
    }) => (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <h4 className="font-medium">{title}</h4>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {!loading && data && <CheckCircle className="h-4 w-4 text-green-500" />}
                {!loading && error && <XCircle className="h-4 w-4 text-red-500" />}
            </div>

            {error && (
                <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
            )}

            {data && (
                <div className="bg-gray-50 p-3 rounded-md">
                    <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );

    const ActionButton = ({
                              onClick,
                              loading,
                              children,
                              disabled = false
                          }: {
        onClick: () => void,
        loading: boolean,
        children: React.ReactNode,
        disabled?: boolean
    }) => (
        <Button
            onClick={onClick}
            disabled={loading || disabled}
            className="w-full"
        >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {children}
        </Button>
    );

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Bambu Lab API Test Page</h1>
                <p className="text-gray-600">Test all API endpoints and functionality</p>
                <div className="flex justify-center">
                    <Badge variant={isAuthenticated ? "default" : "secondary"}>
                        {isAuthenticated ? "Authenticated" : "Not Authenticated"}
                    </Badge>
                </div>
            </div>

            <Tabs defaultValue="auth" className="space-y-4">
                <TabsList className="grid w-full grid-cols-7">
                    <TabsTrigger value="auth">Auth</TabsTrigger>
                    <TabsTrigger value="devices">Devices</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="user">User</TabsTrigger>
                    <TabsTrigger value="slicer">Slicer</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>

                <TabsContent value="auth">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Authentication</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {!isAuthenticated ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <Label htmlFor="account">Email/Account</Label>
                                            <Input
                                                id="account"
                                                type="email"
                                                value={credentials.account}
                                                onChange={(e) => setCredentials(prev => ({ ...prev, account: e.target.value }))}
                                                placeholder="Enter your email address"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="password">Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={credentials.password}
                                                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                                                    placeholder="Enter password"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="code">Verification Code (optional)</Label>
                                            <Input
                                                id="code"
                                                value={credentials.code}
                                                onChange={(e) => setCredentials(prev => ({ ...prev, code: e.target.value }))}
                                                placeholder="Enter verification code if required"
                                            />
                                        </div>
                                    </div>
                                    <ActionButton onClick={handleLogin} loading={loading.login}>
                                        Login
                                    </ActionButton>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Alert className="border-green-200 bg-green-50">
                                        <CheckCircle className="h-4 w-4" />
                                        <AlertDescription className="text-green-700">
                                            Successfully authenticated!
                                        </AlertDescription>
                                    </Alert>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <ActionButton
                                            onClick={handleRefreshToken}
                                            loading={loading.refresh}
                                        >
                                            Refresh Token
                                        </ActionButton>
                                        <Button onClick={handleLogout} variant="outline">
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <ResultDisplay
                                data={results.login}
                                error={errors.login || ''}
                                loading={loading.login}
                                title="Login Response"
                            />

                            <ResultDisplay
                                data={results.refresh}
                                error={errors.refresh || ''}
                                loading={loading.refresh}
                                title="Refresh Token Response"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="devices">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Device Management</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <ActionButton
                                    onClick={() => handleApiCall('devices', () => bambuApi.getDevices())}
                                    loading={loading.devices}
                                    disabled={!isAuthenticated}
                                >
                                    Get Devices
                                </ActionButton>

                                <ActionButton
                                    onClick={() => handleApiCall('printStatus', () => bambuApi.getPrintStatus())}
                                    loading={loading.printStatus}
                                    disabled={!isAuthenticated}
                                >
                                    Get Print Status
                                </ActionButton>
                            </div>

                            <ActionButton
                                onClick={() => handleApiCall('ttcode', () => bambuApi.getTTCode('00M00A280102436'))}
                                loading={loading.ttcode}
                                disabled={!isAuthenticated}
                            >
                                Get TTCode (Sample Device ID)
                            </ActionButton>

                            <ResultDisplay
                                data={results.devices}
                                error={errors.devices || ''}
                                loading={loading.devices}
                                title="Devices Response"
                            />

                            <ResultDisplay
                                data={results.printStatus}
                                error={errors.printStatus || ''}
                                loading={loading.printStatus}
                                title="Print Status Response"
                            />

                            <ResultDisplay
                                data={results.ttcode}
                                error={errors.ttcode || ''}
                                loading={loading.ttcode}
                                title="TTCode Response"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tasks">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Task Management</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ActionButton
                                onClick={() => handleApiCall('tasks', () => bambuApi.getTasks())}
                                loading={loading.tasks}
                                disabled={!isAuthenticated}
                            >
                                Get Tasks
                            </ActionButton>

                            <ResultDisplay
                                data={results.tasks}
                                error={errors.tasks || ''}
                                loading={loading.tasks}
                                title="Tasks Response"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="projects">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Project Management</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ActionButton
                                onClick={() => handleApiCall('projects', () => bambuApi.getProjects())}
                                loading={loading.projects}
                                disabled={!isAuthenticated}
                            >
                                Get Projects
                            </ActionButton>

                            <ResultDisplay
                                data={results.projects}
                                error={errors.projects || ''}
                                loading={loading.projects}
                                title="Projects Response"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="user">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">User Information</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ActionButton
                                onClick={() => handleApiCall('preferences', () => bambuApi.getUserPreferences())}
                                loading={loading.preferences}
                                disabled={!isAuthenticated}
                            >
                                Get User Preferences
                            </ActionButton>

                            <ResultDisplay
                                data={results.preferences}
                                error={errors.preferences || ''}
                                loading={loading.preferences}
                                title="User Preferences Response"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="slicer">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Slicer Settings & Resources</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <ActionButton
                                    onClick={() => handleApiCall('slicerSettings', () => bambuApi.getSlicerSettings('01.03.00.25'))}
                                    loading={loading.slicerSettings}
                                    disabled={!isAuthenticated}
                                >
                                    Get Slicer Settings
                                </ActionButton>

                                <ActionButton
                                    onClick={() => handleApiCall('slicerResources', () => bambuApi.getSlicerResources())}
                                    loading={loading.slicerResources}
                                    disabled={!isAuthenticated}
                                >
                                    Get Slicer Resources
                                </ActionButton>
                            </div>

                            <ResultDisplay
                                data={results.slicerSettings}
                                error={errors.slicerSettings || ''}
                                loading={loading.slicerSettings}
                                title="Slicer Settings Response"
                            />

                            <ResultDisplay
                                data={results.slicerResources}
                                error={errors.slicerResources || ''}
                                loading={loading.slicerResources}
                                title="Slicer Resources Response"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="messages">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Messages</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ActionButton
                                onClick={() => handleApiCall('messages', () => bambuApi.getMessages({ limit: 10 }))}
                                loading={loading.messages}
                                disabled={!isAuthenticated}
                            >
                                Get Messages
                            </ActionButton>

                            <ResultDisplay
                                data={results.messages}
                                error={errors.messages || ''}
                                loading={loading.messages}
                                title="Messages Response"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">API Status Overview</h2>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className={`text-2xl font-bold ${isAuthenticated ? 'text-green-500' : 'text-gray-400'}`}>
                                {isAuthenticated ? '✓' : '✗'}
                            </div>
                            <div className="text-sm text-gray-600">Authentication</div>
                        </div>
                        <div className="text-center">
                            <div className={`text-2xl font-bold ${results.devices ? 'text-green-500' : 'text-gray-400'}`}>
                                {results.devices ? results.devices.devices?.length || 0 : '–'}
                            </div>
                            <div className="text-sm text-gray-600">Devices</div>
                        </div>
                        <div className="text-center">
                            <div className={`text-2xl font-bold ${results.tasks ? 'text-green-500' : 'text-gray-400'}`}>
                                {results.tasks ? results.tasks.total || results.tasks.hits?.length || 0 : '–'}
                            </div>
                            <div className="text-sm text-gray-600">Tasks</div>
                        </div>
                        <div className="text-center">
                            <div className={`text-2xl font-bold ${results.projects ? 'text-green-500' : 'text-gray-400'}`}>
                                {results.projects ? results.projects.projects?.length || 0 : '–'}
                            </div>
                            <div className="text-sm text-gray-600">Projects</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}