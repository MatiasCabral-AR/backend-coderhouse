export function getHome(req, res){
    if(!req.user){
        return res.redirect('/')}
    const user = req.user
    req.session.cookie.expires = new Date(Date.now() + 30000)
    res.render('home', {fullName : user.fullName, role : user.role})
}
export function getLogIn(req, res){
    if (req.isAuthenticated()) {res.redirect('home');}
    else {res.render('login')}
}
export function getSignUp(req, res){
    if (req.isAuthenticated()) {
        res.redirect('home');
    }
    else {
        res.render('signup');
    }
}
export function postLogin(req, res){
    const user = req.user;
    req.session.name = user.username;
    console.log(user)
    res.render('home', {fullName : user.username, role : user.role});
}
export function postSignup(req, res){
    req.session.name = req.user.username;
    res.render('home', {fullName : req.session.name});
}
export function getFailedLogIn(req, res){
    // Aca aprendi a usar connect-flash pero no me alcanza el tiempo
    const flashError = req.flash('error')[0]
    console.log(flashError)
    res.render('login-error', {flashError})
}
export function getFailedSignUp(req, res){
    console.log(req);
    res.render('signup-error', {
    });
}
export function getLogOut(req, res, next){
    if(!req.user){
        return res.redirect('/')
    }
    const name = req.user.username ? req.user.username : req.session.name
    req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy((error) => {
            if(error){return res.json({status : 'Logout error', body : error})}
            else{return res.render('logout', {nombre : name});}
        })
    });
}
