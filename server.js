import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {

    await prisma.usuario.create({
        data: {
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade
        }
    })
    res.send('OK, post')
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.usuario.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade
        }
    })

    res.send('OK, post')
})

app.get('/usuarios', async (req, res) => {

    let usuarios = []

    if (req.query) {
        usuarios = await prisma.usuario.findMany({
            where: {
                email: req.query.email,
                nome: req.query.nome,
                idade: req.body.idade
            }
        })
    } else {
        usuarios = await prisma.usuario.findMany()

    }

    res.status(200).json(usuarios)

})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.usuario.delete({
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