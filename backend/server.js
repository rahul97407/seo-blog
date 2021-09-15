const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');


const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');
const formRoutes = require('./routes/form');



const app = express();
mongoose.connect('mongodb://localhost:27017/seo_blog', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,  useFindAndModify: false })
.then(() => console.log("DB Connected"));

// app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

if(process.env.NODE_ENV === 'development'){
    app.use(cors( {origin : `${process.env.CLIENT_URL}`}));
}



app.use('/api' , blogRoutes);
app.use('/api' , authRoutes);
app.use('/api' , userRoutes);
app.use('/api' , categoryRoutes);
app.use('/api' , tagRoutes);
app.use('/api' , formRoutes);



app.listen(process.env.PORT , () =>{
    console.log("Server is running");
});