import httpService from './http.service'

const todosEndpoint = 'todos/'
const todosService = {
    fetch: async () => {
        const {data} = await httpService.get(todosEndpoint, {
            params: {
                _page: 1,
                _limit: 10,
            },
        })
        return data
    },
    getNewTask: async () => {
        const {data} = await httpService.post(todosEndpoint, {
            title: 'NEW FROM JSONPLACEHOLDER',
            completed: false,
        })
        return data
    },
}

export default todosService
