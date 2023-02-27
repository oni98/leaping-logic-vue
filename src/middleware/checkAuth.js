
const checkAuth = function ({context, next}){
    if (context.store.getters.isAutenticated) {
        return next({
            name: 'ListUser'
        });
    }

    return next();
}

export default checkAuth;