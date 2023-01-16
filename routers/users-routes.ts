import express from 'express'
import { check } from 'express-validator'
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/users-controllers'


export const router = express.Router()


router.get('/', getUsers)

router.post('/', [check("username").not().isEmpty(), check("password").isLength({min: 6, max: 12})], createUser)

router.put('/', updateUser)

router.delete('/:id', deleteUser)

