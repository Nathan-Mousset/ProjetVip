let model = require("../models/vip.js");
let async = require('async');
let moment = require('moment');
////////////////////////////////////////////////////////////////////////////////
module.exports.Articles = function(request, response){
response.title = 'Articles';
model.getVipWithArticle(function(err, result){  // appel le module test qui exécute la requete SQL
    if (err) {
         console.log(err);
         return;
    }
   response.vips = result;
   response.render('articlesVip', response); // appel la vue Handlebars qui va afficher le résultat
} );
}



module.exports.ArticlesVip = 	function(request, response){
let number = request.params.number;
response.title = 'Articles';
   async.parallel([
        function(callback){
             model.getVipWithArticle(function(err, result) {callback(null, result)});
        },
        function(callback){
             model.getVipArticles(number, (function(err2, result2) {callback(null, result2)}));
        }
   ],
        function(err, result){
             if (err){
                  console.log(err);
                  return;
             }

             response.vips = result[0];
             response.articles = result[1];
             response.render('articlesVipNumber', response);
        });

}
