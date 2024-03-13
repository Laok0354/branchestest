require('dotenv').config();
const authenticateToken = require('./authMiddleware');
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
router.use(express.json());

router.get('/searchProject/:searchString', authenticateToken, async (req, res) => {

    const searchString = req.params.searchString;

    if (!searchString) {
        return res.status(400).json({ message: "Search string is required" });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: req.user.email
        }
    });

    await prisma.searchHistory.create({
        data: {
            searchQuery: searchString,
            userId: user.id
        }
    });

    let result = await prisma.project.findMany({
        include: {
            collaborators: true,
        },
        where: {
            OR: [
                {
                    name: {
                        contains: searchString
                    }
                },
                {
                    description: {
                        contains: searchString
                    }
                }
            ]
        }
    });

    if (result.length === 0) {
        res.status(404).json({ message: "No projects found" });
    } else {
        res.status(200).json(result);
    }

   
});

router.get('/searchProjectUnlogged/:searchString', async (req, res) => {

    const searchString = req.params.searchString;

    if (!searchString) {
        return res.status(400).json({ message: "Search string is required" });
    }

    let result = await prisma.project.findMany({
        include: {
            collaborators: true,
        },
        where: {
            OR: [
                {
                    name: {
                        contains: searchString
                    }
                },
                {
                    description: {
                        contains: searchString
                    }
                }
            ]
        }
    });

    if (result.length === 0) {
        res.status(404).json({ message: "No projects found" });
    } else {
        res.status(200).json(result);
    }

   
});

router.get('/searchUser/:searchString', authenticateToken, async (req, res) => {

    try {
        const searchString = req.params.searchString;
            const user = await prisma.user.findUnique({
                where: {
                    email: req.user.email
                }
            });

            await prisma.userSearchHistory.create({
                data: {
                    searchQuery: searchString,
                    userId: user.id
                }
            });

        let result = await prisma.user.findMany({
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
            },
            where: {
                OR: [
                    {
                        userName: {
                            contains: searchString
                        }
                    },
                    {
                        about: {
                            contains: searchString
                        }
                    }
                ]
            }
        });

        if (result.length === 0) {
            res.status(404).json({ message: "No users found" });
        } else {
            res.status(200).json(result);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/searchUserUnlogged/:searchString', async (req, res) => {

    try {
        const searchString = req.params.searchString;

        let result = await prisma.user.findMany({
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
            },
            where: {
                OR: [
                    {
                        userName: {
                            contains: searchString
                        }
                    },
                    {
                        about: {
                            contains: searchString
                        }
                    }
                ]
            }
        });

        if (result.length === 0) {
            res.status(404).json({ message: "No users found" });
        } else {
            res.status(200).json(result);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
