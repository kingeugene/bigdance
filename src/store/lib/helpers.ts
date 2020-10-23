export function loadingGetters() {
    return {
        loading: state => [
            "init",
            "loading",
        ].includes(state.fetchStatus),
        loaded: (state, getters) => !getters.loading,
    };
}
