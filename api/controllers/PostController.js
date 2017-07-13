/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";
module.exports = {



  /**
   * `PostController.create()`
   */


  create: function (req, res) {

    let categoryName = req.param('category_name'),
       nombre = req.param('nombre'),
       descripcion =req.param('descripcion'),
       medidas = req.param('medidas'),
       color = req.param('color'),
       url = req.param('url'),
       userId = req.param('user_id');

   if(!categoryName){
     return res.badRequest({err : 'invalid category_name'});
   }
    if(!nombre){
     return res.badRequest({err : 'invalid nombre'});
   }
    if(!descripcion){
     return res.badRequest({err : 'invalid descripcion'});
   }
   if(!medidas){
    return res.badRequest({err : 'invalid medidas'});
   }
   if(!color){
    return res.badRequest({err : 'invalid color'});
   }

   if(!userId){
     return res.badRequest({err : 'invalid user_id'});
   }

   let images = [];
   var path = require('path')
   var streamOptions = {
      dirname: path.resolve(sails.config.appPath, 'assets/images/'),
      completed: function(fileData, next) {
        next();
      }
    };

   req.file('archivos').upload(Uploader.documentReceiverStream(streamOptions), function (err, uploadedFiles) {
      if (err) return res.negotiate(err);

      uploadedFiles.forEach(function(file) {
        images.push('assets/images/' + file.fd);
      });
      makeRequest()
       .then(result => res.ok(result))
       .catch(err => res.serverError(err));
    });

      //create async method makeRequest
     const makeRequest = async () =>{
       try {
         //create new Category
         const category = await Category.findOne({name:categoryName})
         //create new Post
         const post = await Post.create({
          nombre, descripcion, medidas, color,
          images: images,
          _user :userId,
          _category: category.id
        });

         //return post and category
          return { post, category };

       } catch (err){
         throw err;
       }
     };
  },


  /**
   * `PostController.findOne()`
   */
   findByCategory: function (req, res) {

     //extract postId
     let categoryID = req.params.categoryId;
     console.log(categoryID);
     Category.findOne({
        id: categoryID
     }).then((category) =>{
       if(category){
         Post.find({
           category_id: category.id
         })
         .then((posts)=>{
           if(posts && posts.length>0){
             res.ok(posts);
           }
         })
       }
     });
   },

  findOne: function (req, res) {

    //extract postId
    let postId = req.params.id;

    //validate postId
    if(!postId){
      return res.badRequest({err : 'invalid post_id'});
    }

    //find single post with category
    Post.findOne({
      id : postId
    })
      .populate('_category')
      .then(post => {
        res.ok(post);
      })
      .catch(err => res.notFound(err));

  },


  /**
   * `PostController.findAll()`
   */
  findAll: function (req, res) {

    Post.find()
      .populate('_category')
      .then(posts => {

        if(!posts || posts.length ===0){
          throw new Error('No post found');
        }
        return res.ok(posts);
      })
      .catch(err => res.notFound(err));

  },


  /**
   * `PostController.update()`
   */
  update: function (req, res) {

    //Extract PostId
    let postId = req.params.id;

    let post = {};

    //extract title
    let nombre= req.param('title'),
       descripcion = req.param('descripcion'),
       medidas = req.param('medidas'),
       color = req.param('color'),
       userId = req.param('user_id'),
       categoryId = req.param('category_id');

    //add title to Post object
    if(title){
      post.title = title;
    }
    //add title to Post object
    if(title){
      post.title = title;
    }
    //add title to Post object
    if(title){
      post.title = title;
    }
    //add content to Post Object
    if(content){
      post.content = content;
    }
    if(userId){
      post._user = userId;
    }
    if(categoryId){
      post._category = categoryId;
    }

    //Update the Post by id

     Post.update({id : postId},post)
       .then(post => {

         return res.ok(post[0]);
       })
       .catch(err => res.serverError(err));

  },


  /**
   * `PostController.delete()`
   */
  delete: function (req, res) {

    //extract postId
    let postId = req.params.id;

    //validate postId
    if(!postId){
      return res.badRequest({err : 'invalid post_id'});
    }


    //delete the Post
    Post.destroy({
      id : postId
    })
      .then(post => {

        res.ok(`Post has been deleted with ID ${postId}`);

      })
      .catch(err => res.serverError(err));

  }
};
