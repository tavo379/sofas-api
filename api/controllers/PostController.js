/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";
var normalize = require('normalize-path');

module.exports = {



  /**
   * `PostController.create()`
   */


  create: function (req, res) {

    let categoryName = req.param('category_name'),
       nombre = req.param('nombre'),
       descripcion =req.param('descripcion'),
       medidas = req.param('medidas'),
       color1 = req.param('color1'),
       color2 = req.param('color2'),
       color3 = req.param('color3'),
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
    if(!color1){
      return res.badRequest({err : 'invalid color1'});
    }
    if(!color2){
      return res.badRequest({err : 'invalid color2'});
    }
    if(!color3){
      return res.badRequest({err : 'invalid color3'});
    }
    if(!userId){
      return res.badRequest({err : 'invalid user_id'});
    }
    // Codigo para enlistar las imagenes para el color 1
    let archivosColor1 = req.file('archivosColor1')
    if(!archivosColor1){
      return res.badRequest({err : 'invalid archivosColor1'});
    }
    archivosColor1 = JSON.parse(archivosColor1)
    let imagesColor1 = [];
    archivosColor1.upload({ 
      dirname: require('path').resolve(sails.config.appPath, 'assets/images/users') 
    }, function (err, uploadedFiles) {
      if (err) return res.negotiate(err);
      uploadedFiles.forEach(function(file) {
        file.fd = normalize(file.fd);
        imagesColor1.push('/images/users/' + file.fd.split('/').reverse()[0]);
      });
      makeRequest()
        .then(result => res.ok(result))
        .catch(err => res.serverError(err));
    });
    if (imagesColor1.length !== 3) {
      return res.badRequest({err : 'invalid archivosColor1'});
    }
    // Codigo para enlistar las imagenes del color 2
    let archivosColor2 = req.file('archivosColor2')
    if(!archivosColor2){
      return res.badRequest({err : 'invalid archivosColor1'});
    }
    archivosColor2 = JSON.parse(archivosColor2)
    let imagesColor2 = [];
    archivosColor2.upload({ 
      dirname: require('path').resolve(sails.config.appPath, 'assets/images/users') 
    }, function (err, uploadedFiles) {
      if (err) return res.negotiate(err);
      uploadedFiles.forEach(function(file) {
        file.fd = normalize(file.fd);
        imagesColor2.push('/images/users/' + file.fd.split('/').reverse()[0]);
      });
      makeRequest()
        .then(result => res.ok(result))
        .catch(err => res.serverError(err));
    });
    if (imagesColor2.length !== 3) {
      return res.badRequest({err : 'invalid archivosColor2'});
    }
    // Código para enlistar las imagenes de color 3
    let archivosColor3 = req.file('archivosColor3')
    if(!archivosColor3){
      return res.badRequest({err : 'invalid archivosColor1'});
    }
    archivosColor3 = JSON.parse(archivosColor3)
    let imagesColor3 = [];
    archivosColor3.upload({ 
      dirname: require('path').resolve(sails.config.appPath, 'assets/images/users') 
    }, function (err, uploadedFiles) {
      if (err) return res.negotiate(err);
      uploadedFiles.forEach(function(file) {
        file.fd = normalize(file.fd);
        imagesColor3.push('/images/users/' + file.fd.split('/').reverse()[0]);
      });
      makeRequest()
        .then(result => res.ok(result))
        .catch(err => res.serverError(err));
    });
    if (imagesColor3.length !== 3) {
      return res.badRequest({err : 'invalid archivosColor3'});
    }
    
    let images = []
    for (var i = 0; i < imagesColor1.length; i++) {
      var element = imagesColor1[i];
      images.push({
        color1: imagesColor1[i],
        color2: imagesColor2[i],
        color3: imagesColor3[i]
      })
    }

    // create async method makeRequest
    const makeRequest = async () =>{
      try {
        //create new Category
        const category = await Category.findOne({name:categoryName})
        //create new Post
        const post = await Post.create({
          nombre,
          descripcion,
          medidas,
          color1,
          color2,
          color3,
          images: JSON.stringify(images), // La magia pokemon!!
          _user :userId,
          _category: category.id
      });

        //return post and category
        return { post, category };

      } catch (err){
        throw err;
      }
    }



  //  let images = [];
  //  var path = require('path')
  //  req.file('archivos').upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/users') }, function (err, uploadedFiles) {
  //     if (err) return res.negotiate(err);

  //     uploadedFiles.forEach(function(file) {
  //       file.fd = normalize(file.fd);
  //       images.push('/images/users/' + file.fd.split('/').reverse()[0]);
  //     });
  //     makeRequest()
  //      .then(result => res.ok(result))
  //      .catch(err => res.serverError(err));
  //   });

  //     //create async method makeRequest
  //    const makeRequest = async () =>{
  //      try {
  //        //create new Category
  //        const category = await Category.findOne({name:categoryName})
  //        //create new Post
  //        const post = await Post.create({
  //         nombre, descripcion, medidas, color,
  //         images: images,
  //         _user :userId,
  //         _category: category.id
  //       });

  //        //return post and category
  //         return { post, category };

  //      } catch (err){
  //        throw err;
  //      }
  //    };
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
