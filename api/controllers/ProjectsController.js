"use strict";
var normalize = require('normalize-path');

module.exports = {
  create: function (req, res) {
    let titulo1 = req.param('titulo1'),
    titulo2 = req.param('titulo2'),
    titulo3 = req.param('titulo3'),
    titulo4 = req.param('titulo4'),
    titulo5 = req.param('titulo5'),
    titulo6 = req.param('titulo6'),
    updates = req.param('updates');

    let images = [];
    var path = require('path')
    req.file('archivos').upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/projects') }, function (err, uploadedFiles) {
      if (err) return res.negotiate(err);
      let imgs = [];
      res.setTimeout(0);
      uploadedFiles.forEach(function(file) {
        file.fd = normalize(file.fd);
        imgs.push('/images/projects/' + file.fd.split('/').reverse()[0]);
      });
      let index = 0
      for (var i = 0; i < updates.length; i++) {        
        if (updates[i] == 'YES') {
          images.push(imgs[index])
          index+=1
        } else {
          images.push('')
        }
      }
      makeRequest()
        .then(result => res.ok(result))
        .catch(err => res.serverError(err));
    });

    //create async method makeRequest
    const makeRequest = async () =>{
    try {
      const projects = await Projects.find();
      let news = true;
      if (projects.length > 0) {
        news = false
      }
      if (news) {
        //create new Projects
        Projects.create({
          descripcion: titulo1,
          images: [
            images[0], images[1], images[2], images[3], images[4]
          ]
        });
        Projects.create({
          descripcion: titulo2,
          images: [
            images[5], images[6], images[7], images[8], images[9]
          ]
        });
        Projects.create({
          descripcion: titulo3,
          images: [
            images[10], images[11], images[12], images[13], images[14]
          ]
        });
        Projects.create({
          descripcion: titulo4,
          images: [
            images[15], images[16], images[17], images[18], images[19]
          ]
        });
        Projects.create({
          descripcion: titulo5,
          images: [
            images[20], images[21], images[22], images[23], images[24]
          ]
        });
        Projects.create({
          descripcion: titulo6,
          images: [
            images[25], images[26], images[27], images[28], images[29]
          ]
        });
        return 'OK';
      } else {
        let up = 0
        await Projects.update(projects[up].id, {
          descripcion:  titulo1.trim() != "" ? titulo1 : projects[up].descripcion,
          images: [
            images[0+up*5].trim() != "" ? images[0+up*5] : projects[up].images[0],
            images[1+up*5].trim() != "" ? images[1+up*5] : projects[up].images[1],
            images[2+up*5].trim() != "" ? images[2+up*5] : projects[up].images[2],
            images[3+up*5].trim() != "" ? images[3+up*5] : projects[up].images[3],
            images[4+up*5].trim() != "" ? images[4+up*5] : projects[up].images[4]
          ]
        });
        up+=1
        await Projects.update(projects[up].id, {
          descripcion:  titulo2.trim() != "" ? titulo2 : projects[up].descripcion,
          images: [
            images[0+up*5].trim() != "" ? images[0+up*5] : projects[up].images[0],
            images[1+up*5].trim() != "" ? images[1+up*5] : projects[up].images[1],
            images[2+up*5].trim() != "" ? images[2+up*5] : projects[up].images[2],
            images[3+up*5].trim() != "" ? images[3+up*5] : projects[up].images[3],
            images[4+up*5].trim() != "" ? images[4+up*5] : projects[up].images[4]
          ]
        });
        up+=1
        await Projects.update(projects[up].id, {
          descripcion:  titulo3.trim() != "" ? titulo3 : projects[up].descripcion,
          images: [
            images[0+up*5].trim() != "" ? images[0+up*5] : projects[up].images[0],
            images[1+up*5].trim() != "" ? images[1+up*5] : projects[up].images[1],
            images[2+up*5].trim() != "" ? images[2+up*5] : projects[up].images[2],
            images[3+up*5].trim() != "" ? images[3+up*5] : projects[up].images[3],
            images[4+up*5].trim() != "" ? images[4+up*5] : projects[up].images[4]
          ]
        });
        up+=1
        await Projects.update(projects[up].id, {
          descripcion:  titulo4.trim() != "" ? titulo4 : projects[up].descripcion,
          images: [
            images[0+up*5].trim() != "" ? images[0+up*5] : projects[up].images[0],
            images[1+up*5].trim() != "" ? images[1+up*5] : projects[up].images[1],
            images[2+up*5].trim() != "" ? images[2+up*5] : projects[up].images[2],
            images[3+up*5].trim() != "" ? images[3+up*5] : projects[up].images[3],
            images[4+up*5].trim() != "" ? images[4+up*5] : projects[up].images[4]
          ]
        });
        up+=1
        await Projects.update(projects[up].id, {
          descripcion:  titulo5.trim() != "" ? titulo5 : projects[up].descripcion,
          images: [
            images[0+up*5].trim() != "" ? images[0+up*5] : projects[up].images[0],
            images[1+up*5].trim() != "" ? images[1+up*5] : projects[up].images[1],
            images[2+up*5].trim() != "" ? images[2+up*5] : projects[up].images[2],
            images[3+up*5].trim() != "" ? images[3+up*5] : projects[up].images[3],
            images[4+up*5].trim() != "" ? images[4+up*5] : projects[up].images[4]
          ]
        });
        up+=1
        await Projects.update(projects[up].id, {
          descripcion:  titulo6.trim() != "" ? titulo6 : projects[up].descripcion,
          images: [
            images[0+up*5].trim() != "" ? images[0+up*5] : projects[up].images[0],
            images[1+up*5].trim() != "" ? images[1+up*5] : projects[up].images[1],
            images[2+up*5].trim() != "" ? images[2+up*5] : projects[up].images[2],
            images[3+up*5].trim() != "" ? images[3+up*5] : projects[up].images[3],
            images[4+up*5].trim() != "" ? images[4+up*5] : projects[up].images[4]
          ]
        });
        return 'OK';
      }
        //return slider and category
        return { slider };
      } catch (err){
        throw err;
      }
    };
  },

  findAll: function (req, res) {

    Slider.find()
      .then(anuncios => {

        if(!anuncios || anuncios.length ===0){
          throw new Error('No post found');
        }
        return res.ok(anuncios);
      })
      .catch(err => res.notFound(err));

  }
};
