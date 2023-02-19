import { rest } from 'msw'
import todoProvider from '../todo/todo.provider'

export const handlers = [
    rest.get('/test', (req, res, ctx) => {
        const result = todoProvider.getTodos()
        console.error('get result', result)
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
        const { action, list, id, refId } = await req.json()
        if (action === 'connect') {
            todoProvider.addConnection(list, id, refId)
        }
        if (action === 'complete') {
            console.error('action compplete?', action)
            todoProvider.completeTodo(list, id)
        }
        if (action === 'undoComplete') {
            console.error('action undo compplete?', action)
            todoProvider.undoCompleteTodo(list, id)
        }
        if (action === 'disconnect') {
            todoProvider.removeConnection(list, id, refId)
        }

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
