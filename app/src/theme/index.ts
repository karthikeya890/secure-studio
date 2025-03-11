import { createSystem, defaultConfig } from "@chakra-ui/react"


const theme = {
    theme: {
        tokens: {
            colors: {
                primary: { value: "var(--primary-color)" },
                secondary: { value: "var(--secondary-color)" },
                "secondary.500": { value: "var(--secondary-color-500)" },
                support: { value: "var(--support-color)" },
                light: { value: "var(--light-color)" },
                dark: { value: "var(--dark-color)" },
                darkLight: { value: "var(--dark-light-color)" },
            },
            breakpointSizes: {
                "3xs": { value: "14rem" },
                "2xs": { value: "16rem" },
                xs: { value: "320px" },
            },
            Toast: {
                baseStyle: {
                    position: "top-right", // ✅ Default position for all toasts
                }
            }
        },
    }
}

export const system = createSystem(defaultConfig, theme)

