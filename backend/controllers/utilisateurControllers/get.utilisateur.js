async function connex (req, res) {
  const user = require('../../model/utilisateur.model.js');

  const login = req.body.login;
  const passw = req.body.password;

  const toSend = await user.userAuth(login, passw);
  res.json(toSend);
}
// si tosend vide, res.json(error 401)
module.exports = connex;
