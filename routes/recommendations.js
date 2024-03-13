require('dotenv').config();
const authenticateToken = require('./authMiddleware');
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use(express.json());


router.post('/recommend', async (req, res) => {

    const checkUser = await prisma.user.findUnique({
        where: {
            id: req.body.id
        }
    });

    if (!checkUser) {return res.status(400).json({ error: 'User does not exist' })}

    const checkProject = await prisma.project.findMany({
        where: {
            id: {
                in: req.body.projectsWithAffinities.map(({ projectId }) => projectId),
            },
        },
    });

    if (checkProject.length !== req.body.projectsWithAffinities.length) {
        return res.status(400).json({ error: 'One or more project IDs do not exist' });
    }

    const recommendedProjects = await prisma.recommendedProject.createMany({

        data: req.body.projectsWithAffinities.map(({ projectId }) => ({
            
            projectId,
            userId: req.body.id,

        })),

        skipDuplicates: true,

    });

    if (recommendedProjects === null) {
        return res.status(500).send({message: "couldnt create recommendations"});
    }
    
    res.status(200).json({message: "created recommendations"});

});

router.get('/getRecommended', authenticateToken, async (req, res) => {
    
    const recommendedProjects = await prisma.recommendedProject.findMany({
        where: {
          userId: req.user.id, // Replace with the actual user ID
        },
        include: {
            project: true,
        },
    });

    res = res.status(200).json(recommendedProjects);
    
}); 

router.delete('/deleteAllRecommendations', authenticateToken, async (req, res) => {
    const dR = await prisma.recommendedProject.deleteMany({});

    if(dR === null) {
        res.status(500).send({message: "couldnt delete trcommmendations"});
    }

    res.status(200).send({message: "deleted all recommendations"});
});

module.exports = router;

