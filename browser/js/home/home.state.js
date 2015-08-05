app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope) {
    $scope.myInterval = 6000;
    $scope.noWrapSlides = false;
    $scope.slides = [{
        image: 'https://justaddcheese.files.wordpress.com/2011/04/dsc_04281.jpg'
    }, {
        image: 'https://makingsundaysauce.files.wordpress.com/2011/10/mg_0959.jpg'
    }, {
        image: 'http://25.media.tumblr.com/8de69d887367fa0ea41ba1c628fcad9f/tumblr_myvf7h7dKh1shjq15o1_1280.jpg'
    }, {
        image: 'https://tastethestyle.files.wordpress.com/2013/08/lobster.jpg'
    }, {
        image: 'http://www.diningchicago.com/blog/wp-content/uploads/2010/05/Scallopslg.jpg'
    }, {
        image: 'https://7cb2640dd4728f53a8a1777ce3ec0602de1135e8.googledrive.com/host/0B8ZkbFxTBFsiXzdXcGxOcHYzUWs/_uploads_2014_07_colorfull-fruits-cake-wedding-dessert.jpg'
    }];
});