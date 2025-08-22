export interface User {
    username: string;
    email: string;
}

export interface SelectedUser {
    username: string;
    email: string;
    role: { name: string };
}
