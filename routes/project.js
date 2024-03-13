const authenticateToken = require('./authMiddleware');
const express = require('express'); 
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.use (express.json());

router.post('/create',authenticateToken, async (req, res) => {

    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: "Project name and description are required" });
    }

    const {name, description, statusId, maxMembers} = req.body;

    userId = req.user.id;

    const existingProject = await prisma.project.findFirst({
        where: {
            name: name
        }
    });
    
    if (existingProject) {
        return res.status(409).json({message: "project with same name already exists"});
    }
    
    const newProject = await prisma.project.create({
        data: {
            name: name,
            description: description,
            status: {
                connect: {
                    id: statusId 
                }
            },
            creatorId: userId,
            maxMembers: maxMembers
        }
    });

    if (!newProject) {
        return res.status(409).json({message: "couldnt create project"}); 
    }

    projectCollabortors = await prisma.projectCollaborators.create({
        data: {
            projectId: newProject.id, 
            userId: userId 
        }
    });

    if (!projectCollabortors) {
        return res.status(409).json({message: "couldnt create project, collaborators"}); 
    }

    res.status(201).json(message = "project created");

})


router.put('/modify/:pid', authenticateToken, async (req, res) => {
   

    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: "Project name and description are required" });
    }

    const {name, description, statusId, maxMembers} = req.body;

    userId = req.user.id;

    const project = await prisma.project.findUnique({
        where: {
            id: parseInt(req.params.pid)
        }
    });

    if (!project) {
        return res.status(404).json({message: 'couldnt find project'});
    }

    const isCollaborator = await prisma.projectCollaborators.findFirst({
        where: {
            projectId: project.id,
            userId: userId
        }
    });
    
    if (!isCollaborator) {
        return res.status(401).json({message: "not authorized"});
    }

    const existingProject = await prisma.project.findFirst({
        where: {
            name: name,
            NOT: {
                id: parseInt(req.params.pid)
            }
        }
    });

    if (existingProject) {
        return res.status(409).json({message: "project with same name already exists"});
    }

    let updatedProject = await prisma.project.update({
        where: {
            id: project.id
        },
        data: {
            name: name,
            description: description,
            statusId: statusId,
            maxMembers: maxMembers
        }
    });

    if (!updatedProject) {
        return res.status(409).json({message: "couldnt update project updated"}); 
    }

    res.status(201).json({message: "project updated"});

})


router.delete('/delete/:pid', authenticateToken, async (req, res) => {

    const projectId = parseInt(req.params.pid);

    const project = await prisma.project.findUnique({
        where: {
            id: projectId   
        }
    });

    if (!project) {
        return res.status(404).json({message: "project not found"}); 
    }

    if (project.creatorId != req.user.id) {
        return res.status(401).json({message: "not authorized"}); 
    }

    await prisma.projectCollaborators.deleteMany({
        where: {
            projectId: projectId
        }
    });

    await prisma.project.delete({
        where: {
            id: projectId
        }
    });

    res.status(200).json({message: "project deleted"});

   
})

router.get('/getp/:pid', authenticateToken, async (req, res) => {

    const project = await prisma.project.findUnique({
        where: {
            id: parseInt(req.params.pid)
        },
        include: {
            collaborators: {
                select:{
                    user: true
                }
            },
            status: {
                select: {
                    name: true
                }
            }
        }
    });

    if (!project) {
        return res.status(404).json({message: "project not found"});; 
    }
    console.log(req.user.id)
    if (req.user.id) {
        await prisma.visitHistory.create({
            data: {
                projectId: parseInt(req.params.pid),
                userId: parseInt(req.user.id)
            }
        });
    }

    res.status(200).json({project});

})

router.get('/getpUnlogged/:pid', async (req, res) => {
    const project = await prisma.project.findUnique({
        where: {
            id: parseInt(req.params.pid)
        },
        include: {
            collaborators: {
                select:{
                    user: true
                }
            },
            status: {
                select: {
                    name: true
                }
            }
        }
    });

    if (!project) {
        return res.status(404).json({message: "project not found"});; 
    }

    res.status(200).json({project});

})

router.get('/getAllProjects', async (req, res) => {

    try {
        const projects = await prisma.project.findMany({
            include: {
                collaborators: true
            }
        });
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "couldnt find any projects" });
    }

});

router.get('/getMyProjects', authenticateToken, async (req, res) => {
    
    try 
    {
        const projects = await prisma.project.findMany
        ({
            where:
            {
                creatorId: req.user.id
            },
            include: {
                collaborators: true
            }
        });
        res.status(200).json(projects);
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ message: "couldnt find any projects" });
    }
    
});

module.exports = router;


