require('dotenv').config();
const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const API_KEY = process.env.API_KEY;



router.get ('/searchHistory/:uId', async (req, res) => {

    try {

        const apiKey = req.headers['x-api-key'];

        if (apiKey !== API_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const searchHistory = await prisma.searchHistory.findMany({
            where: {
                userId: parseInt(req.params.uId)
            }
        })

        let searchQuerys = '';

        searchHistory.forEach((search) => {
            searchQuerys += search.searchQuery + ' ';
        })

        res.status(200).json(searchQuerys)

    } catch (error) {

        console.log(error);
        res.status(500).json({error: error})
    }

    
});

router.get ('/userSearchHistory', async (req, res) => {

    const apiKey = req.headers['x-api-key'];

    if (apiKey !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const searchHistory = await prisma.searchHistory.findMany({
        where: {
            userId: req.body.id
        }
    })

    if (!searchHistory) {
        return res.status(404).json({message: "search history not found"});; 
    }

    let searchQuerys = '';

    searchHistory.forEach((search) => {
        searchQuerys += search.searchQuery + ' ';
    })

    res.status(200).json(searchQuerys)
    
});

router.get ('/visitHistory/:uId', async(req, res) => {
            
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const visitHistory = await prisma.visitHistory.findMany({
        where: {
            userId: parseInt(req.params.uId)
        }
    })

    if (!visitHistory) {
        return res.status(404).json({message: "visit history not found"});; 
    }

    const projectPromises = visitHistory.map(async (visit) => {
        const projects = await prisma.project.findMany({
            where: {
                id: visit.projectId
            }
        });

        return projects.map((project) => project.name);
    });

    const projectNamesArray = await Promise.all(projectPromises);

    const visitedProjects = projectNamesArray.flat().join(' ');

    res.status(200).json(visitedProjects);
    
});


router.get('/getAllProjects', async (req, res) => {
    
    const projects = await prisma.project.findMany({
        include: {
            collaborators: true
        }}  
    )
    
    if (!projects) {
        return res.status(404).json({message: "project not found"});; 
    }
    
    res.status(200).json(projects);

});



module.exports = router;

    