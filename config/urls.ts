export const urls = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
    },
    www: {
        pricing: "/pricing",
        support: "/support",
    },
    app: {
        dashboard: "/dashboard",
        project: (id: string) => `/project/${id}`,
        projectDetails: (id: string) => `/project/${id}/details`,
        projectCollaborators: (id: string) => `/project/${id}/collaborators`,
    },
};
