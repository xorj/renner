import authServices from "@/services/authServices";

export default {
    state: () => ({
        token: "",
        user_info: {},
    }),
    getters: {
        getToken({ commit }, state) {
            return state.token || localStorage.getItem("token") || "";
        },
        getUserInfo(state) {
            return state.user_info || {};
        },
    },
    mutations: {
        SET_INFO(state, payload) {
            state.user_info = payload;
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
    },

    actions: {
        async login({ commit }, payload) {
            try {
                const response = await authServices.postLogin(payload);
                const token = response.data.access;
                localStorage.setItem("token", token);
                commit("SET_TOKEN", token);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async cadastro({ commit }, payload) {
            try {
                const response = await authServices.postUser(payload);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async logout({ commit }, payload) {
            localStorage.removeItem("token");
            commit("SET_TOKEN", "");
        },
    },
};