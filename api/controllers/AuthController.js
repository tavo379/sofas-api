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
      return res.badReques({err : 'invalid email'});
    }

    //validate password
    if(!password){
      return res.badRequest({err : 'invalid password'});
    }



    const loginReq = async () => {

      //add try and catch
        const user = await User.findOne({
          email
        });

      const isMatched = await User.checkPassword(password,user.password)

      if(!isMatched){
        throw new Error('Your password is not matched');
      }


      return user;

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
  }
};
