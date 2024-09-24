import { useAuthStore } from "./auth";
import jwt_decode from "jwt-decode";


export const useTokenStore = defineStore('token', {
    state: () => ({
        token: null,
        loggedIn: false,
        refreshToken: null,
        expiresAt: null,
    }),
    persist: true,
    getters: {
        getToken: (state) => state.token,
        getStatus: (state) => state.loggedIn,
        getRefreshToken: (state) => state.refreshToken,
        isTokenExpired: (state) => {
            return state.expiresAt ? Date.now() >= state.expiresAt * 1000 : true;
        }
    },
    actions: {
        setToken(token, refreshToken) {
            const decoded = jwt_decode(token);
            this.token = token;
            this.refreshToken = refreshToken;
            this.expiresAt = decoded.exp;
            this.loggedIn = true;
        },
        removeToken() {
            useAuthStore().$reset();
            this.$reset();
            navigateTo('/auth/login')
        },
    },
})