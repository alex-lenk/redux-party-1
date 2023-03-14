export function logger() {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            return next(action)
        }
    }
}
