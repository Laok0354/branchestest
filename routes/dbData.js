const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/skills', async (req, res) => {
 
  const skills = await prisma.skill.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (!skills) {
    return res.status(400).json({ error: 'No skills found' });
  }

  res.json(skills);

});

module.exports = router;