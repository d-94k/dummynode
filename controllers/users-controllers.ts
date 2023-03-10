import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { validationResult } from 'express-validator'
import { HttpError } from "../models/http-error"

const prisma = new PrismaClient()

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()
    res.json(users)
}


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const Error = validationResult(req);
    if (!Error.isEmpty()) {
        return new HttpError("Invalid user", 422)
    }
    const { username, password } = req.body;
    let user: any;
    try {
    user = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })} catch (error) {
        
    }
    res.json(user)
}


// export const createUser = async (req: Request, res: Response) => {
//     const { name, description } = req.body
//     const planet = await prisma.planet.create({
//         data: {
//             name: name,
//             description: description
//         }
//     })
//     res.json(planet)
// }

export const updateUser = async (req: Request, res: Response) => {
    const { id, username } = req.body
    const updateUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            username: username
        }
    })
    res.json(updateUser)
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id
    const deleteUser = await prisma.user.delete({
        where: {
            id: +id
        }
    })
    res.json(deleteUser)
}