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

        if (!req.body.email || !req.body.password || !req.body.userName || !req.body.skillIds) {
            return res.status(400).json({ error: 'One or more required fields are empty' });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                userName: req.body.userName
            }
        });

        const existingUserEmail = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with the same username already exists.' });
        }
        if (existingUserEmail) {
            return res.status(400).json({ error: 'User with the same email already exists.' });
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
                about: req.body.about,
                skills: {
                    connect: req.body.skillIds.map((id) => ({ id })),
                }
            }
        })
        res.status(201).send({message: "user created"});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
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
            about: true,
            skills: {
                select: {
                    name: true
                }
            },
            projects: {
                select: {
                    project: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        },
    })
    res.json(userInfo)
});

router.get('/getAllUsers', async (req, res) => {
    
    try {

        const users = await prisma.user.findMany({
            include: {
                projects: {
                    include: {
                        project: {
                            include:  {
                                likes: true
                            }
                        }
                    }
                }
            }
        });
        
        res.status(200).json(users);

    } catch (error) {

        console.log(error);
        res.status(500).json({ error: error });

    }
})




module.exports = router;

