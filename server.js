import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            agg: req.body.age
        }
    })

    res.send('OK, post')
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            agg: req.body.age
        }
    })

    res.send('OK, post')
})

app.get('/usuarios', async (req, res) => {

    let usuarios = []

    if (req.query) {
        usuarios = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                agg: req.body.age
            }
        })
    } else {
        usuarios = await prisma.user.findMany()

    }

    res.status(200).json(usuarios)

})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuario deletado com sucesso' })
})

app.listen(3000)

/* 
senha mongodb : gcX850fm5yrDMwks
*/