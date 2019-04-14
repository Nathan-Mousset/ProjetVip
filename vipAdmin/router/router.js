let HomeController = require('./../controllers/HomeController');
let ConnexionController = require('./../controllers/ConnexionController');
let VipController = require('./../controllers/VipController');
let PhotosController = require('./../controllers/PhotosController');





// Routes
module.exports = function(app){



// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

    //Connexion
  app.post('/Connexion', ConnexionController.Connexion);
  app.get('/PageConnexion', ConnexionController.testConnexion);
  app.get('/Deconnexion', ConnexionController.Deconnexion);

  //vip
  app.get('/administration/vips',ConnexionController.testConnexion, VipController.vips);

  app.get('/administration/vips/ajoutVipTest',ConnexionController.testConnexion, VipController.ajoutVipTest);
  app.post('/administration/vips/ajoutVip',ConnexionController.testConnexion, VipController.ajoutVip);

  app.get('/administration/vips/modifVipTest',ConnexionController.testConnexion, VipController.modifVipTest);
  app.post('/administration/vips/modifVip',ConnexionController.testConnexion, VipController.modifVip);

  app.get('/Administration/Vips/SupprimerVipTest', ConnexionController.testConnexion, VipController.SupprimerVipTest);
      app.post('/Administration/Vips/SupprimerVip',  ConnexionController.testConnexion, VipController.SupprimerVip);


  //Photos
  app.get('/Administration/Photos', ConnexionController.testConnexion, PhotosController.photos);

     //Ajouter
     app.get('/Administration/Photos/AjouterPhotoTest', ConnexionController.testConnexion, PhotosController.AjouterPhotoTest);
     app.post('/Administration/Photos/AjouterPhoto', ConnexionController.testConnexion, PhotosController.AjouterPhoto);

     //Supprimer
     app.get('/Administration/Photos/SupprimerPhotoTest', ConnexionController.testConnexion, PhotosController.SupprimerPhotoTest);
     app.post('/Administration/Photos/SupprimerPhoto', ConnexionController.testConnexion, PhotosController.SupprimerPhoto);
     app.post('/Administration/Photos/SupprimerPhoto2/:vipNum', ConnexionController.testConnexion, PhotosController.SupprimerPhoto2);




// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
