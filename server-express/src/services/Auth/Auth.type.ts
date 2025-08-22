export interface LoginReq {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
}

export interface RefreshTokenReq {
    refreshToken: string;
}
export interface RefreshTokenResponse {
    token: string;
    refreshToken: string;
}
