/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
var normalize = require('normalize-path');

module.exports = {
  /**
   * `PostController.create()`
   */

  create: function(req, res) {
    res.setTimeout(0);
    let categoryName = req.param('category_name'),
      nombre = req.param('nombre'),
      descripcion = req.param('descripcion'),
      medidas = req.param('medidas'),
      color1 = req.param('color1'),
      color2 = req.param('color2'),
      color3 = req.param('color3'),
      url = req.param('url'),
      userId = req.param('user_id');

    if (!categoryName) {
      return res.badRequest({ err: 'invalid category_name' });
    }
    if (!nombre) {
      return res.badRequest({ err: 'invalid nombre' });
    }
    if (!descripcion) {
      return res.badRequest({ err: 'invalid descripcion' });
    }
    if (!medidas) {
      return res.badRequest({ err: 'invalid medidas' });
    }
    if (!color1) {
      return res.badRequest({ err: 'invalid color1' });
    }
    if (!color2) {
      return res.badRequest({ err: 'invalid color2' });
    }
    if (!color3) {
      return res.badRequest({ err: 'invalid color3' });
    }
    if (!userId) {
      return res.badRequest({ err: 'invalid user_id' });
    }
    // Codigo para enlistar las imagenes para el color 1
    let archivos = req.file('archivos');
    if (!archivos) {
      return res.badRequest({ err: 'invalid archivos' });
    }
    let imagenes = [];
    let images = [];
    res.setTimeout(0);
    archivos.upload(
      {
        dirname: require('path').resolve(
          sails.config.appPath,
          'assets/images/products'
        )
      },
      function(err, uploadedFiles) {
        if (err) return res.negotiate(err);
        uploadedFiles.forEach(function(file) {
          file.fd = normalize(file.fd);
          imagenes.push('/images/products/' + file.fd.split('/').reverse()[0]);
        });
        if (imagenes.length !== 9) {
          return res.badRequest({ err: 'invalid imagenes' });
        }
        for (var i = 0; i < 3; i++) {
          images.push({
            color1: imagenes[i],
            color2: imagenes[i + 3],
            color3: imagenes[i + 6]
          });
        }
        makeRequest()
          .then(result => res.ok(result))
          .catch(err => res.serverError(err));
      }
    );

    // create async method makeRequest
    const makeRequest = async () => {
      try {
        //create new Category
        const categories = await Category.find();
        let category = null
        for (var i = 0; i < categories.length; i++) {
          var element = categories[i];
          if (element.subcategorie) {
            for (var j = 0; j < element.subcategorie.length; j++) {
              var element2 = element.subcategorie[j];
              if (categoryName  == element2) {
                category = element
              }
            }
          }
        }
        if (!category) {
          throw 'Category not found';
        }

        //create new Post
        const post = await Post.create({
          nombre,
          descripcion,
          medidas,
          color1,
          color2,
          color3,
          images: JSON.stringify(images), // La magia pokemon!!
          _user: userId,
          _category: category.id,
          subCategory: categoryName
        });

        //return post and category
        return { post, category };
      } catch (err) {
        throw err;
      }
    };
  },

  /**
   * `PostController.findOne()`
   */
  findByCategory: function(req, res) {
    // res.ok([]);
    //  extract postId
    let categoryID = req.params.categoryId;

    try {
      Category.findOne({
        id: categoryID
      }).then(category => {
        if (category) {
          try {
            Post.find({
              category_id: category.id
            }).then(posts => {
              if (posts) {
                if (posts.length > 0) {
                  res.ok(posts);
                  return;
                }
              }
              res.ok([]);
            });
          } catch (err) {
            res.ok([]);
          }
        } else {
          res.ok([]);
        }
      });
    } catch (err) {
      res.ok([]);
    }
  },
  findProductsCat: function(req, res) {
    let categoryID = req.params.categoryId;
    let subcategoria = req.params.subcategoria;
    console.log(categoryID);
    console.log(subcategoria);
    try {
      Category.findOne({
        id: categoryID
      }).then(category => {
        if (category) {
          try {
            Post.find({
              category_id: category.id
            }).then(posts => {
              if (posts) {
                if (posts.length > 0) {
                  let products = [];
                  for(let i=0;i<posts.length;i++){
                    if(posts[i].subCategory == subcategoria){
                      products.push(posts[i]);
                    }
                  }
                  res.ok(products);
                  return;
                }
              }
              res.ok([]);
            });
          } catch (err) {
            res.ok([]);
          }
        } else {
          res.ok([]);
        }
      });
    } catch (err) {
      res.ok([]);
    }
  },

  findRandom: function(req, res) {
    let idProduct = req.params.idProduct;
    if(!idProduct){
      return res.badRequest({ err: 'invalid product id' });
    }
    Post.find()
      .populate('_category')
      .then(posts => {
        if (!posts || posts.length === 0) {
          throw new Error('No post found');
        }
        if(posts.length <= 4) {
          return res.ok(posts);
        }
        let products = [];
        let min = 0;
        let max = posts.length-1;

        for(let i = 0; i < 4; i++){
          let index = Math.floor(Math.random() * max) + min;

          if(posts[index].id == idProduct){
            i = i-1;
    
          }else{
            products.push(posts[index]);
            posts.splice(index,1);
            max = max-1;
          }
        }
        return res.ok(products);
      })
      .catch(err => res.notFound(err));
  },


  findOne: function(req, res) {
    //extract postId
    let postId = req.params.id;

    //validate postId
    if (!postId) {
      return res.badRequest({ err: 'invalid post_id' });
    }

    //find single post with category
    Post.findOne({
      id: postId
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
  findAll: function(req, res) {
    Post.find()
      .populate('_category')
      .then(posts => {
        if (!posts || posts.length === 0) {
          throw new Error('No post found');
        }
        return res.ok(posts);
      })
      .catch(err => res.notFound(err));
  },

  /**
   * `PostController.update()`
   */
  update: function(req, res) {
    //Extract PostId
    let postId = req.params.id;

    let post = {};

    let categoryName = req.param('category_name'),
      nombre = req.param('nombre'),
      descripcion = req.param('descripcion'),
      medidas = req.param('medidas'),
      color1 = req.param('color1'),
      color2 = req.param('color2'),
      color3 = req.param('color3'),
      url = req.param('url'),
      userId = req.param('user_id'),
      imagesA = req.param('images');

    // Codigo para enlistar las imagenes para el color 1
    let images = [];
    if (imagesA) {
      images = JSON.parse(imagesA);
    } else {
      let archivos = req.file('archivos');
      let imagenes = [];
      archivos.upload(
        {
          dirname: require('path').resolve(
            sails.config.appPath,
            'assets/images/users'
          )
        },
        function(err, uploadedFiles) {
          if (err) return res.negotiate(err);
          uploadedFiles.forEach(function(file) {
            file.fd = normalize(file.fd);
            imagenes.push('/images/users/' + file.fd.split('/').reverse()[0]);
          });
          if (imagenes.length !== 9) {
            return res.badRequest({ err: 'invalid imagenes' });
          }
          for (var i = 0; i < 3; i++) {
            images.push({
              color1: imagenes[i],
              color2: imagenes[i + 3],
              color3: imagenes[i + 6]
            });
          }
          makeRequest()
            .then(result => res.ok(result))
            .catch(err => res.serverError(err));
        }
      );
    }

    // create async method makeRequest
    const makeRequest = async () => {
      try {
        //Update the Post by id
        const post = await Post.update(
          { id: postId },
          {
            nombre,
            descripcion,
            medidas,
            color1,
            color2,
            color3,
            images: JSON.stringify(images) // La magia pokemon!!
          }
        );

        //return post and category
        return post;
      } catch (err) {
        throw err;
      }
    };

    if (imagesA) {
      makeRequest()
        .then(result => res.ok(result))
        .catch(err => res.serverError(err));
    }
  },

  /**
   * `PostController.delete()`
   */
  delete: function(req, res) {
    //extract postId
    let postId = req.params.id;

    //validate postId
    if (!postId) {
      return res.badRequest({ err: 'invalid post_id' });
    }

    //delete the Post
    Post.destroy({
      id: postId
    })
      .then(post => {
        res.ok(`Post has been deleted with ID ${postId}`);
      })
      .catch(err => res.serverError(err));
  }
};
