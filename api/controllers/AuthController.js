/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * `AuthController.login()`
   */
  login: function (req, res) {

    //Extract email
    let email = req.param('email'),
        password = req.param('password');
    //Extract password

    //validate email
    if(!email){
      return res.badReques({err : 'Correo Invalido'});
    }

    //validate password
    if(!password){
      return res.badRequest({err : 'Contraseña Invalida'});
    }

    const loginReq = async () => {
      //add try and catch
        const user = await User.findOne({
          email
        });

      const isMatched = await User.checkPassword(password,user.password)

      if(!isMatched){
        throw new Error('Su contraseña no corresponde');
      }
      //creando  resp object
      let resp = {
        user
      };

      //generando token
      let token = JwtService.issue({
        user,
        expiresIn: '1d'
      });

      resp.token = token;

      return resp;
    };


    loginReq()
      .then(user => res.ok(user))
      .catch(err => res.forbidden(err));

  },


  /**
   * `AuthController.signup()`
   */
  signup: function (req, res) {

    //Extract firstName of the user
     let
         email = req.param('email'),
         password = req.param('password');


    //validate email
    if(!email){
      return res.badRequest({err : 'invalid email'});
    }


    //validate password
    if(!password){
      return res.badRequest({err : 'invalid password'});
    }



    //create async method signupRequest
    const signupRequest =  async () => {

      //add code into try catch
      try {

        //call the UtilService encryptpassword
         const encPassword = await UtilService.encryptPassword(password);
        // create User
        const user = await  User.create({
          email,
          password : encPassword
        });

        return res.ok(user);
      }
      catch (e){
        throw e;
      }

    };

    signupRequest()
      .then(user => res.ok(user))
      .catch(err => res.serverError(err));
  },


  findOne: function (req, res) {
    return res.json({
      todo: 'findOne() is not implemented yet!'
    });
  },


  /**
   * `CategoryController.findAll()`
   */
   findAll: function (req, res) {

     User.find()
       .then(users => {

         if(!users || users.length ===0){
           throw new Error('No post found');
         }
         return res.ok(users);
       })
       .catch(err => res.notFound(err));

   },


  /**
   * `CategoryController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `CategoryController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};
