const user = require('../../model/utilisateur.model.js');
async function connex (req, res) {

  const login = req.body.login;
  const passw = req.body.password;

  const toSend = await user.userAuth(login, passw);

  if(toSend){
    req.session.login = toSend.loginutilisateur;
    res.json(toSend);

  } else {
    res.status(401).send('utilisateur inconnu')
  }

}
// si tosend vide, res.json(error 401)
module.exports = connex; 
