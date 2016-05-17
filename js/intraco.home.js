var app=angular.module('homeApp',['ngAnimate']);

app.controller('homeCtrl',function($scope,$http,$timeout,$interval){
    

    $scope.loading=true;
    $scope.navShow=false;
    $scope.sliderShow=false;
    $scope.videoShow=false;
    $scope.navFix=false;
    $scope.slides=slides;
    $scope.fullslide=slides.length;
    $scope.myInterval=1000;
    $scope.slidesCurrent=[];
    $scope.index=0;
    $scope.prevAvailabel=false;
    $scope.mySlide=[];
    var interval;
    var head=angular.element(document.getElementById('header'));
    angular.element(document).ready(function() {
        $interval(function(){
                i=$scope.index;
                $scope.next(i,false);
               },6000);

            
            
            $timeout(function(){
                $scope.siteLoaded=true;
                $scope.loading=false;
                new WOW().init();
            },1000)
            
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
    $scope.move=function(index,fromButton=false){
        
        if(index<$scope.fullslide-2){
        $scope.nextSlide(index,index+1,index+2);
            }else if(index==$scope.fullslide-2){
                $scope.nextSlide(index,index+1,0);
            }else if(index==$scope.fullslide-1){
                $scope.nextSlide(index,0,1);
                $scope.index=0;
                // previous=false;
            }
            // console.log($scope.index);
    }
    $scope.previous=function(ind,fromButton=false){
        
            if(ind>0){
                $scope.index--;
                console.log($scope.index);
                $scope.move($scope.index,fromButton,true);
            }else{
                $scope.prevAvailabel=false;
            }
            
        
    }
    $scope.next=function(index,fromButton=false){
        $scope.index++;
        
        $scope.prevAvailabel=true;
        $scope.move($scope.index,fromButton);
        
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

            elem.ready(function(){
                scope.navShow=true;
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
              scope.sliderShow=true;
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
            elem.ready(function(){
                scope.videoShow=true;
            });
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
        templateUrl:'news-feed.html',
        link:function(scope,elem,attr){

        }
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
               scope.fullslide=scope.slides.length;
                });
            
            
            
            
           
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
                $scope.contactShow=true;
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
           elem.ready(function(){
                $scope.footShow=true;
           });
        }
    }
});

var slides=[
{image1:'img/business-segments/properties1.jpg',image2:'img/business-segments/properties2.jpg',title:'Intraco Properties Limited'},
{image1:'img/business-segments/agrabad1.jpg',image2:'img/business-segments/agrabad2.jpg',title:'Hotel Agrabad, Chittagong'},
{image1:'img/business-segments/butterfly.jpg',image2:'img/business-segments/butterfly2.jpg',title:'Intraco Butterfly Park Limited'},
{image1:'img/business-segments/cng1.jpg',image2:'img/business-segments/cng2.jpg',title:'Intraco CNG Limited'},
{image1:'img/business-segments/refueling1.jpg',image2:'img/business-segments/refueling2.jpg',title:'Intraco Refueling Stations Limited'},
{image1:'img/business-segments/energy1.jpg',image2:'img/business-segments/energy2.jpg',title:'Intraco Energy Limited'},
{image1:'img/business-segments/coconut1.jpg',image2:'img/business-segments/coconut2.jpg',title:'Intraco Coconut Park, Coxs Bazar'},
{image1:'img/business-segments/merine1.jpg',image2:'img/business-segments/merine2.jpg',title:'Intraco Marine Division'},
{image1:'img/business-segments/readymix1.jpg',image2:'img/business-segments/readymix2.jpg',title:'Intraco Ready-mix Co. Limited'},
{image1:'img/business-segments/agro1.jpg',image2:'img/business-segments/agro2.jpg',title:'Intraco Agro-Products Ltd.'},
{image1:'img/business-segments/ultrapharma1.jpg',image2:'img/business-segments/ultrapharma2.jpg',title:'Intraco Ultra Pharma Limited'},
{image1:'img/business-segments/telecom1.jpg',image2:'img/business-segments/telecom2.jpg',title:'Intraco Telecom Ltd'}

];