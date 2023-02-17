import { rest } from 'msw'
import todoProvider from '../todo/todo.provider'

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
        const result = todoProvider.addTodo(list, item)
        // const result = todoProvider.getTodoList()
        return res(
            ctx.status(200),
            ctx.json({
                data: result,
            })
        )
    }),
    rest.put('/test', async (req, res, ctx) => {
        const { data } = await req.json()
        todoProvider.updateItem(data)
        // todoProvider.completeTodo(id)
        // const result = todoProvider.getTodoList()
        return res(
            ctx.status(200),
            ctx.json({
                messages: 'put',
            })
        )
    }),

    rest.delete('/test', async (req, res, ctx) => {
        const { list, id } = await req.json()
        const rest = todoProvider.removeTodo(list, id)
        // const result = todoProvider.getTodoList()
        return res(
            ctx.status(200),
            ctx.json({
                data: rest,
            })
        )
    }),
]
