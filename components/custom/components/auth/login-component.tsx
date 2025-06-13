import { useState, createContext, useContext } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LoginForm } from "@/components/custom/components/auth/login-form";
import { SignUpForm } from "@/components/custom/components/auth/sign-up-form";

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

export function LoginComponent({ defaultValue = "login" }: LoginComponentProps) {
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
            <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as TabValue)} className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                    <SignUpForm />
                </TabsContent>
            </Tabs>
        </TabContext.Provider>
    );
}

// Example usage in LoginForm component:
/*
import { useTabSwitcher } from './login-component';

export function LoginForm() {
  const { switchToTab } = useTabSwitcher();

  const handleSwitchToSignUp = () => {
    switchToTab("signup");
  };

  return (
    <div>
      // Your login form content
      <button onClick={handleSwitchToSignUp}>
        Don't have an account? Sign up
      </button>
    </div>
  );
}
*/