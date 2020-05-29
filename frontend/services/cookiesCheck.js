function checkAuthCookie(req) {
    if(req.session){
        console.log('go go go')
    } else {
        console.log('rien a faire ici')
    }
}
