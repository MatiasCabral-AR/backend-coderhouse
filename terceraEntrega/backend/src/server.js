import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import {engine} from 'express-handlebars';
import { Server as SocketServer} from 'socket.io';
import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import { Strategy as TwitterStrategy } from "passport-twitter";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

// Dirname 
import {fileURLToPath} from 'url';
import { dirname, resolve } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Express server and io connection
const app = express();
const PORT = 4000;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)});
const io = new SocketServer(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(session({
    store : MongoStore.create({
        mongoUrl : process.env.DATABASE_URI,
        mongoOptions : {useNewUrlParser : true, useUnifiedTopology: true},
        dbName : 'business'
    }),
    secret : 'secret',
    resave : false, 
    saveUninitialized : false,
    cookie : {maxAge : 300000}
}));
app.use(express.static('public'))
app.use(passport.initialize());
app.use(passport.session())
app.use(flash())

// Passport
// -------------------------------------------------------------------
// Passport Sign-up, Log-in and Twitter verification
import { deserializer, loginLocalStrategy, signupLocalStrategy, twitterStrategy } from './middleware/passport.js';

    // Twitter
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_KEY_SECRET,
    callbackURL: '/auth/twitter/callback'
    }, 
    twitterStrategy
));
    // Local
passport.use('signup', new LocalStrategy({passReqToCallback: true}, signupLocalStrategy));
passport.use('login', new LocalStrategy(loginLocalStrategy));
// Passport serializer
passport.serializeUser((user, callback)=> {
    callback(null, user);
});
passport.deserializeUser(deserializer);

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', resolve(__dirname, './public/views'))

// Routers
import productsRouter from './routes/products.routes.js';
import loginRouter from './routes/login.routes.js';
app.use('/api/products', productsRouter)
app.use('/', loginRouter)

// Socket Events 
io.on('connection', async socket => {
    const products = await fetch('http://localhost:4000/api/products')
                        .then(response => response.json())
    socket.emit('render-products', products)
    socket.on('new-product', async product => {
        fetch('http://localhost:4000/api/products', 
            { method : 'post',
              headers : {"Content-type" : "application/json"},
              body : JSON.stringify(product)})
        .then(response => response.json())
        .then(response => console.log(response.newProd[0]) && products.push(response.newProd[0]) && socket.emit('render-products', products))
    })
    socket.on('delete-product', async id => {
        const url = `http://localhost:4000/api/products/${id}`;
        const producto = await fetch(url, {method : 'delete', headers : {"Content-type" : "application/json"}})
                              .then(response => response.json())
                              console.log(producto)
        let index = products.indexOf(products.find(product => product._id === producto._id))
        products.splice(index, 1)
        socket.emit('render-products', products)
    })
})