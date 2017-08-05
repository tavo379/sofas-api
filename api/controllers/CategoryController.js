/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";
var normalize = require('normalize-path');

module.exports = {

  /**
   * `CategoryController.create()`
   */
  create: function (req, res) {

      let name = req.body.name,
      subcategorie = req.body.sub,
      image = req.file('image');

      if(!name){
       return res.badRequest({err : 'invalid name'});
     }

    let img;
    if(subcategorie === 'null'){
      image.upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images/users')
      }, function (err, uploadedFiles) {
        img = normalize(uploadedFiles[0].fd);
        img = '/images/users/' + img.split('/').reverse()[0];
        makeRequest()
          .then(result => res.ok(result))
          .catch(err => res.serverError(err));
      });
    }

     //create async method makeRequest
     const makeRequest = async () =>{
       try {
        if(subcategorie === 'null'){
          console.log('aaaaaa '+ img)
          const category = await Category.create({name, subcategorie: null, image: img});
          return {category};
        }
        else{
          const category = await Category.findOne({name:name}).exec(function (err, categPrincipal){
            if (err) { return res.serverError(err); }
            if (!categPrincipal) { return res.notFound('Could not find a category.'); }
            console.log(categPrincipal)

            if(categPrincipal.subcategorie)
            {
              categPrincipal.subcategorie[(Object.keys(categPrincipal.subcategorie).length-1)/1+1] = subcategorie
            }
            else{
              categPrincipal.subcategorie={0:subcategorie}
            }
            categPrincipal.save(function(err){
              if (err) { return res.serverError(err); }
              return categPrincipal
            });//</save()>

          });
          const result = await Category.findOne({name:name})
          return result;
        }
         //return post and category


       }catch (err){
         console.log(err);
       }
     };

      //call the makeRequest method
      if (subcategorie !== 'null') {
        makeRequest()
          .then(result => res.ok(result))
          .catch(err => res.serverError(err));
      }

  },


  /**
   * `CategoryController.findOne()`
   */
   /**
    * `CategoryController.findOne()`
    */
   findOne: function (req, res) {

     //extract categoryId
     let categoryId = req.params.id;

     //validate categoryId
     if(!categoryId){
       return res.badRequest({err : 'invalid category_id'});
     }

     Category.findOne({
       id : categoryId
     })
       .then(category => {
         res.ok(category);
       })
       .catch(err => res.notFound(err));

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
