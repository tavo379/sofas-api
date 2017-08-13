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

    // create async method makeRequest
    const makeRequest = async () =>{
      try {
        if (subcategorie === 'null') {
          const category = await Category.create({name, subcategorie: null, image: img});
          return {category};
        } else {
          const category = await Category.findOne({name:name}).exec(function (err, categPrincipal){
            if (err) { return res.serverError(err); }
            if (!categPrincipal) { return res.notFound('Could not find a category.'); }
          });
          if (!category.subcategorie) {
            category.subcategorie = []
          }
          console.log(category);
          category.subcategorie.push(subcategorie);

          await category.save(function(err){
            if (err) { return res.serverError(err); }
            return {category}
          });//</save()>
          return {category};
        }
        //return post and category
      }catch (err){
        console.log(err);
      }
    };

    let name = req.body.name,
    subcategorie = req.body.sub,
    image = req.file('image');

    if(!name){
      return res.badRequest({err : 'invalid name'});
    }

    let img;
    if(subcategorie === 'null'){
      image.upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images/categories')
      }, function (err, uploadedFiles) {
        img = normalize(uploadedFiles[0].fd);
        img = '/images/categories/' + img.split('/').reverse()[0];
        makeRequest()
          .then(result => res.ok(result))
          .catch(err => res.serverError(err));
      });
    } else {
      //call the makeRequest method
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
