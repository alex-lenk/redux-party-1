const task_Updated = "task/updated";
const task_Removed = "task/deleted";

export function taskCompleted(id) {
    return {
        type: task_Updated,
        payload: { id, completed: true },
    };
}
export function titleChanged(id) {
    return {
        type: task_Updated,
        payload: { id, title: `New title for ${id}` },
    };
}
export function taskDeleted(id) {
    return {
        type: task_Removed,
        payload: { id },
    };
}

function taskReducer(state = [], action) {
    switch (action.type) {
        case task_Updated: {
            const newArray = [...state];
            const elementIndex = newArray.findIndex(
                (el) => el.id === action.payload.id
            );
            newArray[elementIndex] = {
                ...newArray[elementIndex],
                ...action.payload,
            };
            return newArray;
        }
        case task_Removed: {
            return [...state].filter(el => el.id !== action.payload.id);
        }
        default:
            return state;
    }
}

export default taskReducer
