import {Palette, Plug} from "lucide-react";
import {SettingsConfig} from "@/app/settings/settings-types";

/**
 * Settings configuration object for the application.
 *
 * This object defines all configurable settings organized into tabs, sections,
 * and individual settings. Each tab represents a major category of settings,
 * containing one or more sections, which in turn contain multiple settings.
 *
 * Structure:
 * - Top-level keys: represent tabs (e.g., "profile", "security", "notifications", "appearance").
 * - Each tab contains:
 *    - title: string — Display name of the tab.
 *    - description: string — Brief description shown under the tab title.
 *    - icon: React component — Icon representing the tab.
 *    - sections: an object mapping section keys to sections.
 *
 * Each section contains:
 *    - title: string — Section header title.
 *    - settings: an array of individual setting definitions.
 *
 * Each setting has:
 *    - key: string — Unique identifier used for storage and retrieval.
 *    - label: string — Display label for the setting control.
 *    - type: "input" | "textarea" | "switch" | "select" — Type of input control to render.
 *    - defaultValue: string | boolean — The default value for the setting.
 *    - options?: string[] — Array of options (required if type is "select").
 *
 * Supported setting types:
 * - "input": single-line text input.
 * - "textarea": multi-line text input.
 * - "switch": boolean toggle switch.
 * - "select": dropdown select with predefined options.
 *
 * Example:
 *
 * profile: {
 *   title: "Profile",
 *   description: "Manage your personal information",
 *   icon: User,
 *   sections: {
 *     personal: {
 *       title: "Personal Information",
 *       settings: [
 *         { key: "fullName", label: "Full Name", type: "input", defaultValue: "John Doe" },
 *         { key: "bio", label: "Bio", type: "textarea", defaultValue: "..." }
 *       ]
 *     },
 *     preferences: {
 *       title: "Profile Preferences",
 *       settings: [
 *         { key: "profileVisibility", label: "Profile Visibility", type: "select", options: ["Public", "Private"], defaultValue: "Public" },
 *         { key: "showEmail", label: "Show Email Publicly", type: "switch", defaultValue: false }
 *       ]
 *     }
 *   }
 * }
 */


export const settingsConfig: SettingsConfig = {
    appearance: {
        title: "Appearance",
        description: "Customize the look and feel",
        icon: Palette,
        sections: {
            theme: {
                title: "Theme Settings",
                settings: [
                    {
                        key: "theme",
                        label: "Theme",
                        type: "select",
                        options: ["light", "dark", "system"],
                        defaultValue: "light",
                    },
                    {key: "bg-url", label: "Background Image Url", type: "input", defaultValue: "https://images.pexels.com/photos/7919/pexels-photo.jpg?cs=srgb&dl=pexels-life-of-pix-7919.jpg&fm=jpg"},
                ]
            }
        }
    },
    api: {
        title: "Api Settings",
        description: "Settings for used APIs",
        icon: Plug,
        sections: {
            WeatherAPI: {
                title: "weatherapi.com",
                settings: [
                    {key: "weatherapi-key", label: "API key", type: "input", defaultValue: ""},
                    {key: "weatherapi-location", label: "Location", type: "input", defaultValue: "Hamburg"}
                ]
            }
        }
    }
}
