const User = require('../../model/utilisateur.model');
const Role = require('../../model/role.model')

async function create (req, res) {
//!! attention, ne pas pouvoir faire deux meme login
  const login = req.body.login;
  const passw = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const role = req.body.idRole;

    User.createUtilisateurs(login, passw, firstName, lastName, role);
    return 
  }
 
  
  module.exports = create;
