const user = require('../../model/utilisateur.model.js');
async function connex (req, res) {

  const login = req.body.login;
  const passw = req.body.password;

  const toSend = await user.userAuth(login, passw);
console.log(toSend);
  if(toSend != undefined){

    req.session.login = toSend.loginutilisateur;
    req.session.role = toSend.stringrole;
    res.json(toSend);

  } else {
    res.sendStatus(401);
  }

}
// si tosend vide, res.json(error 401)
module.exports = connex; 
