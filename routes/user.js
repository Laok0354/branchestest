require('dotenv').config();
const authenticateToken = require('./authMiddleware');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use(express.json());



router.post('/', async (req, res) => {
    try {

        //check if required fields are empty

        if (!req.body.email || !req.body.password || !req.body.userName || !req.body.skillIds) {
            return res.status(400).json({ error: 'One or more required fields are empty' });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                userName: req.body.userName
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with the same username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        let skillOk = true;

        checkAllSkills = req.body.skillIds.forEach(async (skillId) => {
            const checkEachSkill = await prisma.skill.findUnique({
                where: {
                    id: skillId
                }
            })
            if (!checkEachSkill) {
                skillOk = false;
                res.status(400).json({ error: 'One or more skills do not exist' });
            }
        })
        if (skillOk == false) return res.status(400).json({ error: 'One or more skills do not exist' });

        await prisma.user.create({
            data: {
                email: req.body.email,
                password: hashedPassword,
                userName: req.body.userName,
                skills: {
                    connect: req.body.skillIds.map((id) => ({ id })),
                }
            }
        })
        res.status(201).send();
    }
    catch (error) {

        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'User with the same email or username already exists.' });
        }

        if (error.code === 'P2003') {
            return res.status(400).json({ error: 'User with the same email or username already exists.' });
        }

        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/', authenticateToken, async (req, res) => {
    const userInfo = await prisma.user.findUnique({
        where: {
            email: req.user.email
        },

        select: {
            id: true,
            email: true,
            userName: true,
            skills: {
                select: {
                    name: true
                }
            }
        }
    })
    res.json(userInfo)
});



module.exports = router;

