"use client"
import {useState, createContext, useContext} from 'react';
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {LoginForm} from "@/components/auth/login-form";
import {SignUpForm} from "@/components/auth/sign-up-form";
import {GalleryVerticalEnd} from "lucide-react";
import {BackgroundWrapper} from "@/components/custom-ui/background-wrapper";

type TabValue = "login" | "signup";

interface TabContextType {
    currentTab: TabValue;
    switchToTab: (tab: TabValue) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function useTabSwitcher() {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTabSwitcher must be used within a LoginComponent');
    }
    return context;
}

interface LoginComponentProps {
    defaultValue?: TabValue;
}

export function LoginComponent({defaultValue = "login"}: LoginComponentProps) {
    const [currentTab, setCurrentTab] = useState<TabValue>(defaultValue);

    const switchToTab = (tab: TabValue) => {
        setCurrentTab(tab);
    };

    const contextValue: TabContextType = {
        currentTab,
        switchToTab,
    };

    return (
        <TabContext.Provider value={contextValue}>
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <a href="#" className="flex items-center gap-2 font-medium">
                            <div
                                className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-4"/>
                            </div>
                            VoidTalk
                        </a>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <Tabs defaultValue="tab-1" value={currentTab} onValueChange={(value) => setCurrentTab(value as TabValue)}
                                  className="w-[400px] h-[800px] flex items-center">
                                <TabsList>
                                    <TabsTrigger value="login">Login</TabsTrigger>
                                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                                </TabsList>
                                <TabsContent value="login">
                                    <LoginForm/>
                                </TabsContent>
                                <TabsContent value="signup">
                                    <SignUpForm/>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className="bg-muted relative hidden lg:block">
                    <BackgroundWrapper src={"white-background.png"}/>
                </div>
            </div>
        </TabContext.Provider>
    );
}