require('dotenv').config();
const authenticateToken = require('./authMiddleware');
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use(express.json());

router.post('/sendCollaborationRequest/:projectId', authenticateToken, async (req, res) => {
    
    
    const existingCollaborator = await prisma.projectCollaborators.findFirst({
        where: {
            projectId: parseInt(req.params.projectId),
            userId: req.user.id
        }
    });

    if (existingCollaborator) {
        return res.status(400).json({ message: "You are already a collaborator of the project" });
    }

    const requestSent = await prisma.collaborationRequest.create({
        data: {
            userId: req.user.id,
            projectId: parseInt(req.params.projectId),
            message: req.body.message
        }
    })

    if (!requestSent) {
        return res.status(400).json({ message: "Could not send collaboration request" });
    }

    res.status(200).json({message: 'Collaboration request sent'})

    
}) 

router.get('/getOwnCollaborationRequests', authenticateToken, async (req, res) => {

    const myCollaborationRequests = await prisma.collaborationRequest.findMany({
        where: {
            userId: req.user.userId
        }
    })

    if (myCollaborationRequests.length === 0) {
        return res.status(404).json({ error: "No collaboration requests found" });
    }

    res.status(200).json(myCollaborationRequests)

});

router.get('/getOwnCollaborationRequest/:id', authenticateToken, async (req, res) => {
        
    const myCollaborationRequest = await prisma.collaborationRequest.findMany({
        where: {
            userId: req.user.userId,

            id: parseInt( req.params.id)

        }
    })

    if (myCollaborationRequest.length === 0) {
        return res.status(404).json({ error: "No collaboration requests found" });
    }

    res.status(200).json(myCollaborationRequest)

});

router.get('/getCollaborationRequests', authenticateToken, async (req, res) => {
    
    const projects = await prisma.project.findMany({
        where: {
            creatorId: req.user.id
        },
        select: {
            id: true 
        }
    });
    
    const projectIds = projects.map(projects => projects.id);
    
    const collaborationRequests = await prisma.collaborationRequest.findMany({
        where: {
            projectId: {
                in: projectIds
            }
        },
        include: {

            user: {
                select: {
                    userName: true
                }
            },
            project: {
                select: {
                    name: true
                }
            }
            
        }
    });

    if (collaborationRequests.length === 0) {
        return res.status(404).json({ error: "No collaboration requests found" });
    }

    res.status(200).json(collaborationRequests)
});

router.get('/getCollaborationRequest/:id', authenticateToken, async (req, res) => {

    const projects = await prisma.project.findMany({
        where: {
            creatorId: req.user.id
        },
        select: {
            id: true 
        }
    });
    
    const projectIds = projects.map(projects => projects.id);
    
    const collaborationRequest = await prisma.collaborationRequest.findMany({
        where: {
            projectId: {
                in: projectIds
            },

            id: parseInt(req.params.id)
        }
    });

    if (collaborationRequest.length === 0) {
        return res.status(404).json({ error: "No collaboration requests found" });
    }

    res.status(200).json(collaborationRequest)

});



router.post('/acceptCollaborationRequest/:id', authenticateToken, async (req, res) => {

    const projects = await prisma.project.findMany({
        where: {
            creatorId: req.user.id
        },
        select: {
            id: true 
        }
    });
    
    const projectIds = projects.map(projects => projects.id);
    
    const collaborationRequest = await prisma.collaborationRequest.findUnique({
        where: {
            projectId: {
                in: projectIds
            },

            id: parseInt(req.params.id)
        }
    });

    if (!collaborationRequest) {res.status(404).json({ error: "No collaboration requests found" });

    const userid = collaborationRequest.userId
    const projectid = collaborationRequest.projectId

    await prisma.projectCollaborators.create({
        data: {
            userId: userid,
            projectId: projectid
        }
    })

    await prisma.collaborationRequest.update({
        where: {
            projectId: {
                in: projectIds
            },

            id: parseInt(req.params.id)
        },
        data: {
            status: 'accepted',

            response: req.body.response
        }
    
    })

    res.status(200).json({message: 'Collaboration request accepted'})

}})


router.post('/rejectCollaborationRequest/:id', authenticateToken, async (req, res) => {
    
        const projects = await prisma.project.findMany({
            where: {
                creatorId: req.user.id
            },
            select: {
                id: true 
            }
        });
        
        const projectIds = projects.map(projects => projects.id);

        const updatedStatus = await prisma.collaborationRequest.update({
            where: {
                projectId: {
                    in: projectIds
                },

                id: parseInt(req.params.id)
            },
            data: {
                status: 'rejected',

                response: req.body.response
            }
        
        })

        if (!updatedStatus) {
            return res.status(404).json({ error: "No collaboration requests found" });
        }

        res.status(200).json({message: 'Collaboration request rejected'})

})

router.delete('/deleteCollaborationRequest/:id', authenticateToken, async (req, res) => {

    const collaborationRequest = await prisma.collaborationRequest.findUnique({ 
        where: {
            id: parseInt(req.params.id)
        }
    });

    if (!collaborationRequest) {
        return res.status(404).json({ error: "No collaboration requests found" });
    }

   if (req.user.id !== collaborationRequest.userId) {
        return res.status(403).json({ error: "You are not allowed to delete this collaboration request" });
    }

    
    await prisma.collaborationRequest.delete({
        where: {
            id: parseInt(req.params.id),
        }
    })

    res.status(200).json({message: 'Collaboration request deleted'})

});


router.post('/like/:pid', authenticateToken, async (req, res) => {
        
    const existingLike = await prisma.projectLike.findUnique({
        where: {
        userId_projectId: {
            userId: req.user.id,
            projectId: parseInt(req.params.pid),
        },
        },
    });
    
    if (existingLike) {
        
        const updatedLike = await prisma.ProjectLike.update({
            where: {
                userId_projectId: {
                userId: req.user.id,
                projectId: parseInt(req.params.pid),
                },
            },
            data: {
                liked: !existingLike.liked,
            },
        });
    
        if (updatedLike) {
            res.json({ message: 'Project like updated correctly' });
        }
        else {
            res.status(500).json({ error: "Could not update like" });
        }
        
    } else {
        
        const newLike = await prisma.ProjectLike.create({
        data: {
        
            liked: true,

            project: {
            connect: {
                id: parseInt(req.params.pid),
            },
            },
            user: {
                connect: {
                id: req.user.id,
                },
            },
        },
        });

        if (newLike !== null) {
        res.json({ message: 'Project liked successfully' });
        }
        else {
            res.status(500).json({ error: "Could not like project" });
        }
    
    }

});


router.get('/getLiked', authenticateToken, async (req, res) => {
        
    const projectLikes = await prisma.projectLike.findMany({
        where: {
            userId: req.user.id,
            liked : true
        },
        include: {
            project:{
                include: {
                    collaborators: true
                }
        }
    }
    });

    if (projectLikes.length === 0) {
        return res.status(404).json({ error: "No projects liked" });
    }

    const projects = projectLikes.map(like => like.project);

    res.status(200).json(projects);

});



router.delete('/deleteAllLikes', authenticateToken, async (req, res) => {
    const dP = await prisma.projectLike.deleteMany({});

    if(dP === null) {
        res.status(500).send({message: "couldnt delete project likes"});
    }

    res.status(200).send({message: "deleted all project likes"});
});

router.delete('/deleteAllCollaborationRequests', async (req, res) => {
    try {
        await prisma.collaborationRequest.deleteMany({});
        res.status(200).json({ message: "All collaboration requests deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

module.exports = router;
