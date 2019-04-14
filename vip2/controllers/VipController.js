
let model = require("../models/vip.js");
let async = require('async');
let moment = require('moment');
// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

  module.exports.listerLettres = function(request, response){
   response.title = 'Répertoire des stars';
   model.listerLettres(function(err, result){  // appel le module test qui exécute la requete SQL
       if (err) {
           console.log(err);
           return;
       }
      response.lettres = result;
      response.render('repertoireVips', response); // appel la vue Handlebars qui va afficher le résultat
  } );
  }

  module.exports.VipLettre = 	function(request, response){
       let lettres = request.params.lettres;
   response.title = 'Répertoire des stars';
     async.parallel([
          function(callback){
               model.listerLettres(function(err, result) {callback(null, result)});
          },
          function(callback){
               model.VipLettre(lettres, (function(err2, result2) {callback(null, result2)}));
          }
     ],
          function(err, result){
               if (err){
                    console.log(err);
                    return;
               }

               response.lettres = result[0];
               response.vipL = result[1];
               response.render('repertoireVipsLettre', response);
          });

  }

  module.exports.BioVip = 	function(request, response){
       let num = request.params.num;
   response.title = 'Bio d\'un vip';
    async.parallel([
          function(callback){
               model.listerLettres(function(err, result) {callback(null, result)});
          },
          function(callback){
               model.getVipPhoto(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.getVipNPD(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.getVipDate(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.getVipNatio(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.getVipLiaison(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.getVipMariage(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.getVipAllPhoto(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.realisateurVip(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.acteurVip(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.chanteurVip(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.mannequinVip(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.couturierVip(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.joueVip(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.filmsVip(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.albumsVip(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.defiledansVip(num, (function(err, result) {callback(null, result)}));
          },
          function(callback){
               model.defilesVip(num, (function(err, result) {callback(null, result)}));
          },
    ],
          function(err, result){
               if (err){
                    console.log(err);
                    return;
               }

               response.lettres = result[0];
               response.photo = result[1][0];
               response.NPD =result[2][0];
               response.vipDate =result[3][0];
               response.vipNatio =result[4][0];
               response.vipLiaison = result[5];
               response.vipMariage = result[6];
               response.photos = result[7];
               response.realisateur = result[8];
               response.acteur = result[9];
               response.chanteur = result[10];
               response.mannequin = result[11];
               response.couturier = result[12];
               response.joue = result[13];
               response.films = result[14];
               response.albums = result[15];
               response.defiledans = result[16];
               response.defiles = result[17];
               response.render('InfoVip', response);
          });

  }
