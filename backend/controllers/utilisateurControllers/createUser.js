const User = require('../../model/utilisateur.model');

async function create (req, res) {
//!! attention, ne pas pouvoir faire deux meme login
  const login = req.body.login;
  const passw = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const role = req.body.idRole;
  const group = req.body.idgroup;

    User.createUtilisateurs(login, passw, firstName, lastName, role, group);
    return 
  }
 
  
  module.exports = create;
