"use strict";
var normalize = require('normalize-path');

module.exports = {


    create: function (req, res) {

      let titulo1 = req.param('titulo1'),
          sliderlink1 = req.param('sliderlink1'),
          titulo2 = req.param('titulo2'),
          sliderlink2 = req.param('sliderlink2'),
          titulo3 = req.param('titulo3'),
          sliderlink3 = req.param('sliderlink3'),
          titulo4 = req.param('titulo4'),
          sliderlink4 = req.param('sliderlink4'),
          titulo5 = req.param('titulo5'),
          sliderlink5 = req.param('sliderlink5'),
          image1 = req.param('image1'),
          image2 = req.param('image2'),
          image3 = req.param('image3'),
          image4 = req.param('image4'),
          image5 = req.param('image5');
    
     let images = [];
     var path = require('path')
     req.file('archivos').upload({ dirname: require('path').resolve(sails.config.appPath, 'assets/images/users') }, function (err, uploadedFiles) {
        if (err) return res.negotiate(err);
        let imgs = [];
        res.setTimeout(0);
        uploadedFiles.forEach(function(file) {
          file.fd = normalize(file.fd);
          imgs.push('/images/users/' + file.fd.split('/').reverse()[0]);
        });
        let index = 0
        if (image1 === 'YES') {
          images.push(imgs[index])
          index+=1
        } else {
          images.push('')
        }
        if (image2 === 'YES') {
          images.push(imgs[index])
          index+=1
        } else {
          images.push('')
        }
        if (image3 === 'YES') {
          images.push(imgs[index])
          index+=1
        } else {
          images.push('')
        }
        if (image4 === 'YES') {
          images.push(imgs[index])
          index+=1
        } else {
          images.push('')
        }
        if (image5 === 'YES') {
          images.push(imgs[index])
          index+=1
        } else {
          images.push('')
        }
        makeRequest()
         .then(result => res.ok(result))
         .catch(err => res.serverError(err));
      });

        //create async method makeRequest
       const makeRequest = async () =>{
         try {
            const sliders = await Slider.find();
            let news = true;
            if (sliders.length > 0) {
              news = false
            }

            if (news) {
              //create new Post
              Slider.create({
                titulo: titulo1, sliderlink: sliderlink1,
                images: [images[0]],
              });
              Slider.create({
                titulo: titulo2, sliderlink: sliderlink2,
                images: [images[1]],
              });
              Slider.create({
                titulo: titulo3, sliderlink: sliderlink3,
                images: [images[2]],
              });
              Slider.create({
                titulo: titulo4, sliderlink: sliderlink4,
                images: [images[3]],
              });
              Slider.create({
                titulo: titulo5, sliderlink: sliderlink5,
                images: [images[4]],
              });
              return 'OK';
            } else {
              Slider.update(sliders[0].id, {
                titulo:  titulo1 == '' ? sliders[0].titulo : '',
                sliderlink: sliderlink1 == '' ? sliders[0].sliderlink: '',
                images: [images[0] == '' ? sliders[0].images[0]: images[0]],
              });
              Slider.update(sliders[1].id, {
                titulo:  titulo2 == '' ? sliders[1].titulo : '',
                sliderlink: sliderlink2 == '' ? sliders[1].sliderlink : '',
                images: [images[1] == '' ? sliders[1].images[0]: images[1]],
              });
              Slider.update(sliders[2].id, {
                titulo:  titulo3 == '' ? sliders[2].titulo: '',
                sliderlink: sliderlink3 == '' ? sliders[2].sliderlink: '',
                images: [images[2] == '' ? sliders[2].images[0]: images[2]],
              });
             Slider.update(sliders[3].id, {
                titulo:  titulo4 == '' ? sliders[3].titulo: '',
                sliderlink: sliderlink4 == '' ? sliders[3].sliderlink: '',
                images: [images[3] == '' ? sliders[3].images[0]: images[3]],
              });
              Slider.update(sliders[4].id, {
                titulo:  titulo5 == '' ? sliders[4].titulo: '',
                sliderlink: sliderlink5 == '' ? sliders[4].sliderlink: '',
                images: [images[4] == '' ? sliders[4].images[0]: images[4]],
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
