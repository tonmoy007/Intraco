var app=angular.module('homeApp',['ngAnimate']);

app.controller('homeCtrl',function($scope,$http,$timeout,$interval){
    $scope.loading=true;
    $scope.navShow=false;
    $scope.sliderShow=false;
    $scope.videoShow=false;
    $scope.navFix=false;
    $scope.slides=slides;
    $scope.myInterval=1000;
    $scope.slidesCurrent=[];
    $scope.index=0;
    $scope.prevAvailabel=false;
    $scope.mySlide=[];
    var interval;
    var head=angular.element(document.getElementById('header'));
    angular.element(document).ready(function() {
        $interval(function(){
                index=$scope.index;
                $scope.next(index,false);
               },6000);

        
            $scope.loading=false;
            $scope.navShow=true;
            $scope.sliderShow=true;
            $scope.videoShow=true;
            $scope.contactShow=true;
            $scope.footShow=true;
            new WOW().init();
            
             //console.log(interval);
        
    });
  

    $scope.nextSlide=function(index1,index2,index3){
            
            var slide=[];
            slide.push($scope.slides[index1]);
            slide.push($scope.slides[index2]);
            slide.push($scope.slides[index3]);
            $scope.mySlide=slide;

            angular.forEach($scope.slides,function(value,key){
                if(key==index1||key==index2||key==index3){
                    $scope.slides[key].active=true;
                }else{
                    $scope.slides[key].active=false;
                }
            });
            
                
           

        }
    $scope.move=function(index,fromButton=false,previous=false){
        
        if(index<$scope.fullslide-2){
        $scope.nextSlide(index,index+1,index+2);
            }else if(index==$scope.fullslide-2){
                $scope.nextSlide(index,index+1,0);
            }else if(index==$scope.fullslide-1){
                $scope.nextSlide(index,0,1);
                $scope.index=0;
                previous=false;
            }
            
            
            
            if(!fromButton){
                $interval.cancel(interval);
            }
    }
    $scope.previous=function(ind,fromButton=false){
        
            if(ind>0){
                $scope.index--;
                console.log($scope.index);
                $scope.move($scope.index,fromButton,true);
            }
            console.log(ind);
        
    }
    $scope.next=function(index,fromButton=false){
        $scope.index++;
        $scope.move($scope.index,fromButton);
        $scope.prevAvailabel=true;
    }
    $scope.nextSlide(0,1,2);
    
});

app.directive('navigation',function($timeout){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'navigation.html',
        link:function(scope,elem,attr){
            angular.element(document).scroll(function(event) {
                    /* Act on the event */
                    
                    if($(this).scrollTop()>60){
                        elem.parent('.navi').addClass('adjust-menu');
                    }else{
                        elem.parent('.navi').removeClass('adjust-menu');
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

app.directive('bussinessSegments',function($interval){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'business-segments.html',
        link:function(scope,elem,attr){
            elem.ready(function(){
               
                });
            
            scope.fullslide=scope.slides.length;
            
            
           
                }
            }        

    
  });
app.directive('contact',function(){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'contact.html',
        link:function($scope,elem,attr){
            elem.ready(function(){
                plotMap();
            })
        }
    }
});
app.directive('intracoFooter',function(){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'footer.html',
        link:function($scope,elem,attr){
           
        }
    }
});
app.animation('.slide', function($timeout) {
  return {
    // make note that other events (like addClass/removeClass)
    // have different function input parameters
    enter: function(element, doneFn) {
      // jQuery(element).addClass('slideInRight').addClass('animated');
      jQuery(element).addClass('fadeIn').addClass('animated');
      // remember to call doneFn so that angular
      // knows that the animation has concluded
    },

    move: function(element, doneFn) {
      jQuery(element).removeClass('fadeIn').addClass('fadeOut').addClass('animated');
    },

    leave: function(element, doneFn) {
     jQuery(element).addClass('fadeOut');
     $timeout(function(){
        jQuery(element).css({'margin-left':'0'});
        jQuery(element).remove();
    },700);
    }
  }
});
var slides=[
{image:'img/logo.png',active:false},
{image:'img/logo-s.png',active:false},
{image:'img/logo.png',active:false},
{image:'img/texture-1.jpg',active:false},
{image:'img/texture-2.png',active:false},
{image:'img/texture-3.jpg',active:false},
{image:'img/texture-4.jpg',active:false},
{image:'img/texture-5.jpg',active:false},
{image:'img/texture-6.jpg',active:false},
{image:'img/logo.png',active:false},
{image:'img/logo.png',active:false},
{image:'img/logo.png',active:false}

];