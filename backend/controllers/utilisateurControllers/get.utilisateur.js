class GetUtilisateur {
  async connex (log, pass) {
    const user = require('../../model/utilisateur.model.js');
    // const login = Logs.login;
    // const passw = Logs.Password;
    // console.log(login, passw);
    user.userAuth(log, pass);
  }
}
module.exports = new GetUtilisateur();

/* static async hasPlatformAccesRight (userId, right) {
  const result = await PostgresStore.client.query({
    text: `SELECT 1 FROM ${PlatformRole.tableName} AS pr
              LEFT JOIN ${RoleAccessRight.tableName} AS ar on pr.role_id = ar.role_id
              WHERE pr.user_id = $1
                  AND ar.acces_right = $2`,
    values: [userId, right]
  });

  if (result.rows.length > 0) {
    return true;
  }
  return false;
}
*/
