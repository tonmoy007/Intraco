var app=angular.module('homeApp',[]);

app.controller('homeCtrl',function($scope,$http,$timeout,$document){
    $scope.loading=true;
    $scope.navShow=false;
    $scope.sliderShow=false;
    $scope.videoShow=false;
    $scope.navFix=false;
    
    var head=angular.element(document.getElementById('header'));
    angular.element(document).ready(function() {
        $timeout(function(){
            $scope.loading=false;
            $scope.navShow=true;
            $scope.sliderShow=true;
            $scope.videoShow=true;
            new WOW().init();
        },600);
    });
    $scope.$watch('showMenu',function(value){
        if(value){
            
            head.addClass('fixed');
        }else{
            head.removeClass('fixed');
        }
    });
    
    
});

app.directive('navigation',function($timeout){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'navigation.html',
        link:function(scope,elem,attr){
            angular.element(document).scroll(function(event) {
                    /* Act on the event */
                    
                    if($(this).scrollTop()>170){
                        elem.parent('.navi').addClass('fixed');
                    }else{
                        elem.parent('.navi').removeClass('fixed');
                    }
        });
    }
}
});

app.directive('slider',function($timeout){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'slider.html',
        link:function(scope,elem,attr){
            elem.ready(function () {
    //console.log("ready");
    
            $('#da-slider').cslider({

                current     : 0,    
                // index of current slide
                
                bgincrement : 50,   
                // increment the background position 
                // (parallax effect) when sliding
                
                autoplay    : true,
                // slideshow on / off
                
                interval    :  5000  
                // time between transitions
                
            });
              
});
        }
    }
});

app.directive('intracoVideo',function($timeout){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'video.html',
        link:function(scope,elem,attr){
            
        }
    }

});

app.directive('loading', function ($timeout) {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="spinner"><i class="fa fa-spinner fa-pulse"></i></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  });
  
  app.directive('newsFeed',function(){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'news-feed.html'
    }
  });

  app.directive('speech',function(){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'speech.html'
    }
  });