export const themeConfig = {
    defaultTheme: 'system',
    colors: {
        primary: {
            light: '#0A1128',
            dark: '#FAFAFA',
        },
        accent: {
            light: '#008080',
            dark: '#00FFFF',
        },
    },
    radii: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
    },
    zIndex: {
        base: 0,
        nav: 50,
        dropdown: 100,
        modal: 200,
        toast: 300,
    },
};

export type ThemeConfig = typeof themeConfig;
