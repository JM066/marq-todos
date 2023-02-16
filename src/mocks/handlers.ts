import { rest } from 'msw'
import todoProvider from '../todo/todo.provider'

export const handlers = [
    rest.get('/test', (req, res, ctx) => {
        const result = todoProvider.getTodoList()
        return res(
            ctx.status(200),
            ctx.json({
                messages: result,
            })
        )
    }),

    rest.post('/test', async (req, res, ctx) => {
        const { item } = await req.json()
        todoProvider.addTodo(item)
        const result = await todoProvider.getTodoList()
        return res(
            ctx.status(200),
            ctx.json({
                messages: result,
            })
        )
    }),
    rest.put('/test', async (req, res, ctx) => {
        const { id } = await req.json()
        todoProvider.completeTodo(id)
        const result = await todoProvider.getTodoList()
        return res(
            ctx.status(200),
            ctx.json({
                messages: result,
            })
        )
    }),
    rest.delete('/test', async (req, res, ctx) => {
        const { id } = await req.json()
        todoProvider.removeTodo(id)
        const result = await todoProvider.getTodoList()
        return res(
            ctx.status(200),
            ctx.json({
                messages: result,
            })
        )
    }),
]
