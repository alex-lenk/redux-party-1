import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import * as actions from './store/task/actions'
import {initiateStore} from './store/store'

const store = initiateStore()

const App = () => {
    const [state, setState] = useState(store.getState())

    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState())
        })
    }, [])

    const completeTask = (taskId) => {
        store.dispatch(actions.taskCompleted(taskId))
    }
    const changeTitle = (taskId) => {
        store.dispatch(actions.titleChanged(taskId))
    }
    const deleteTask = (taskId) => {
        store.dispatch(actions.taskDeleted(taskId))
    }

    return (
        <>
            <h1> App</h1>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p> {`Completed: ${el.completed}`}</p>
                        <button onClick={() => completeTask(el.id)}>
                            Complete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change title
                        </button>
                        <button onClick={() => deleteTask(el.id)}>
                            Delete this task
                        </button>
                        <hr/>
                    </li>
                ))}
            </ul>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <App/>
    </>
)
