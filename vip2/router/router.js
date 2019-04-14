let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let ArticleController = require('./../controllers/ArticleController');




// Routes
module.exports = function(app){



// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.listerLettres);
    app.get('/repertoire/:lettres', VipController.VipLettre);
    app.get('/repertoire/vip/:num', VipController.BioVip);

 // albums
   app.get('/album', AlbumController.ListerAlbum);
   app.get('/album/:numeroVip', AlbumController.ListerAlbum);

 // Article
 app.get('/articles', ArticleController.Articles);
 app.get('/articles/:number', ArticleController.ArticlesVip);


// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
