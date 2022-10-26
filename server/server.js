require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./config/mongoose.config');

require('./routes/user.routes')(app);
require('./routes/posts.routes')(app);
require('./routes/comment.routes')(app);
    
app.listen(process.env.PORT , () => console.log("Listening on port:", process.env.PORT) );
