export function getHome(req, res) {
    const user = req.user
    req.session.cookie.expires = new Date(Date.now() + 30000)
    res.render('home', {name : user.username, email : user.email})
}
export function getLogIn(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('home');
    }
    else {
        res.render('login');
    }
}
export function getSignUp(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('home');
    }
    else {
        res.render('signup');
    }
}
export function postLogin(req, res) {
    const user = req.user;
    req.session.name = user.username;
    res.render('home', {name : user.username, email : user.email});
}

export function postSignup(req, res) {
    req.session.name = req.user.username;
    res.render('home', {name : req.session.name});
}

export function getFailedLogIn(req, res) {
    console.log('error en login');
    res.render('login-error', {
    });
}

export function getFailedSignUp(req, res) {
    console.log('error en signup');
    res.render('signup-error', {
    });
}


export function getLogOut(req, res, next) {
    const name = req.user.username ? req.user.username : req.session.name
    req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy((error) => {
            if(error){res.json({status : 'Logout error', body : error})}
            else{res.render('logout', {nombre : name});}
        })
    });
}
