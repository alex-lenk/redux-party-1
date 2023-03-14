import {createAction} from '@reduxjs/toolkit'

const updated = createAction('task/updated');
const removed = createAction('task/removed');

export function taskCompleted(id) {
    return updated({id, completed: true})
}

export function titleChanged(id) {
    return updated({id, title: `New title for ${id}`})
}

export function taskDeleted(id) {
    removed({id})
}

function taskReducer(state = [], action) {
    switch (action.type) {
        case updated.type: {
            const newArray = [...state];
            const elementIndex = newArray.findIndex(
                (el) => el.id === action.payload.id,
            );
            newArray[elementIndex] = {
                ...newArray[elementIndex],
                ...action.payload,
            };
            return newArray;
        }
        case removed.type: {
            return [...state].filter(el => el.id !== action.payload.id);
        }
        default:
            return state;
    }
}

export default taskReducer
