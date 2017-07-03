/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `CategoryController.create()`
   */
  create: function (req, res) {

      name = req.param('name');

      if(!name){
       return res.badRequest({err : 'invalid name'});
     }
     //create async method makeRequest
     const makeRequest = async () =>{

       try {


         //create new Category
         const category = await Category.create({name});

         //return post and category
          return {category};

       }catch (err){
         throw err;
       }
     };
     //call the makeRequest method
      makeRequest()
        .then(result => res.ok(result))
        .catch(err => res.serverError(err));

  },


  /**
   * `CategoryController.findOne()`
   */
  findOne: function (req, res) {
    return res.json({
      todo: 'findOne() is not implemented yet!'
    });
  },


  /**
   * `CategoryController.findAll()`
   */
   findAll: function (req, res) {

     Category.find()
       .then(category => {

         if(!category || category.length === 0){
           throw new Error('No post found');
         }
         return res.ok(category);
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
