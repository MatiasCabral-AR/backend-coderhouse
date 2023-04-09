import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {engine} from 'express-handlebars';
import { Server as SocketServer} from 'socket.io';
import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import { Strategy as TwitterStrategy } from "passport-twitter";
import {createHash, isValidPassword} from './helpers/helpers.js'
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
// Passport
// -------------------------------------------------------------------
// Passport Sign-up, Log-in and Twitter verification

    // Twitter
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback'
}, (token, tokenSecret, userProfile, done) => {
    return done(null, userProfile)
}));
    // Local
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        User.findOne({ 'username': username }, (err, user) => {
            if (err) {
                return done(err);
            };

            if (user) {
                return done(null, false);
            }

            const newUser = {
                username: username,
                password: createHash(password),
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            };

            User.create(newUser, (err, userWithId) => {
                if (err) {
                    return done(err);
                }
                return done(null, userWithId);
            })
        });
    }
));
passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                return done(null, false);
            }

            return done(null, user);
        })
    }
));
// Twitter serializer
passport.serializeUser((user, callback)=> {
    callback(null, user);
});
passport.deserializeUser((user, callback)=> {
    if(user._id){
        User.findById(user._id, callback)
    }
    else{callback(null, user)}
});
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