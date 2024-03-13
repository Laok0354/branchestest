const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const cors = require('cors');
const PORT = 3000;

const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true
}

app.use (cookieParser());
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

const user = require('./routes/user');
const auth = require('./routes/auth');
const project = require('./routes/project');
const search = require('./routes/search')
const userData = require('./routes/userData');
const userInteractions = require('./routes/userInteractions');
const dbData = require('./routes/dbData');
const recommendations = require('./routes/recommendations');

app.use('/user', user);
app.use ('/auth', auth);
app.use('/project', project);
app.use('/search', search);
app.use('/userData', userData);
app.use('/userInteractions', userInteractions);
app.use('/dbData', dbData);
app.use('/recommendations', recommendations);

app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
);