const express = require("express");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const authenticateToken = require("./authMiddleware");
const prisma = new PrismaClient();

router.use(express.json());

router.post('/login', async (req, res) => {

  if (!req.body.email || !req.body.password){
    return res.status(400).json({error: 'One or more required fields are empty'})
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
      where: {
        email: email
      }
  })

  if (user == null)
  {
    return res.status(400).json({error: 'Cannot find user'})
  }

  if (await bcrypt.compare(password, user.password)){

    const accessToken = generateAccessToken(user);

    if (accessToken == null) {
      return res.status(400).json({ error: "Cannot create token" });
    }

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    if (refreshToken == null) {
      return res.status(400).json({ error: "Cannot create refresh token" });
    }
      

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, 
      secure: false,
      sameSite: "strict",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true, 
      secure: false,
      sameSite: "strict",
    });

    res.json({
      Success: "Login Success",
      id: user.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

  } else {

    res.status(400).json({ error: "Not Allowed" });

  }

});

router.delete("/logout", authenticateToken, async (req, res) => {

  const deleteTokens = await prisma.refreshToken.deleteMany({
    where: {
      token: req.cookies.refreshToken,
    },
  });

  if (deleteTokens == null) {
    return res.status(400).json({ error: "Cannot find token" });
  } else {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.status(200).json({ message: "User logged out" });
  }

});

router.get("/token", authenticateToken, async (req, res) => {
 
  const accessToken = generateAccessToken({
    id: req.user.id,
    email: req.user.email,
    password: req.user.password,
    about: req.user.about,
  });

  if (accessToken == null) {
    return res.status(400).json({ error: "Cannot create token" });
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.json({ accessToken: accessToken });

});

router.get("/check", authenticateToken, async (req, res) => {

  try {
    res.status(200).send("authorized");
  } catch (error) {
    res.status(401).send("unauthorized");
  }

});

function generateAccessToken(user) {

  if (user.email) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "90000s",
    });
  }
  else{
    return null;
  }  

}

module.exports = router;
