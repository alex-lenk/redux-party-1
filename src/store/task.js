import {createSlice} from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import {setError} from './errors'

const initialState = {entities: [], isLoading: true}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        received(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(
                (el) => el.id === action.payload.id,
            )
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload,
            }
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (el) => el.id !== action.payload.id,
            )
        },
        addNewTask(state, action) {
            state.entities.push(action.payload)
            state.isLoading = false
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestFailed(state, action) {
            state.isLoading = false
        },
    },
})

const {actions, reducer: taskReducer} = taskSlice

const {update, remove, received, addNewTask, taskRequested, taskRequestFailed} = actions

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(received(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const completeTask = (id) => (dispatch, getState) => {
    dispatch(update({id, completed: true}))
}

export function titleChanged(id) {
    return update({id, title: `New title for ${id}`})
}

export function taskDeleted(id) {
    return remove({id})
}

export const createTask = () => async (dispatch) => {
    try {
        const data = await todosService.getNewTask()
        const uniqueId = {...data, id: Date.now()}
        dispatch(addNewTask(uniqueId))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const getTasks = () => (state) => state.tasks.entities

export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer
