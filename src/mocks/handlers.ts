import { rest } from 'msw'
import todoProvider from '../todo/todo.provider'
import { TodoList } from '../redux/todo/todoSlice.type'

function filterAction(
    action: string,
    list: TodoList,
    id: string,
    refId: string,
    title: string
) {
    switch (action) {
        case 'connect':
            todoProvider.addConnection(list, id, refId)
            break
        case 'complete':
            todoProvider.completeTodo(list, id)
            break
        case 'undoComplete':
            todoProvider.undoCompleteTodo(list, id)
            break
        case 'disconnect':
            todoProvider.removeConnection(list, id, refId)
            break
        default:
            todoProvider.editTodo(list, id, title)
    }
}
export const handlers = [
    rest.get('/test', (req, res, ctx) => {
        const result = todoProvider.getTodos()
        return res(
            ctx.status(200),
            ctx.json({
                data: result,
            })
        )
    }),

    rest.post('/test', async (req, res, ctx) => {
        const { list, item } = await req.json()
        todoProvider.addTodo(list, item)
        return res(
            ctx.status(200),
            ctx.json({
                data: 'post',
            })
        )
    }),
    rest.put('/test', async (req, res, ctx) => {
        const { action, list, id, refId, title } = await req.json()
        filterAction(action, list, id, refId, title)
        return res(
            ctx.status(200),
            ctx.json({
                data: 'put',
            })
        )
    }),

    rest.delete('/test', async (req, res, ctx) => {
        const { list, id } = await req.json()
        const rest = todoProvider.removeTodo(list, id)
        return res(
            ctx.status(200),
            ctx.json({
                data: rest,
            })
        )
    }),
]
