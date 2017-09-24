# server-api-to-js-api
server api to js api cache mechanism

## It supports es6 supported javascript and Pure javascript support also there... :-)


Exmple ten type of server apis 

   1. GET mobiles                  https:// xxx.serverx.com / api / v1x / mobiles 
   2. GET mobiles + filter         https:// xxx.serverx.com / api / v1x / mobiles ? sortBy=mostliked
   3. GET mobile                   https:// xxx.serverx.com / api / v1x / mobiles / <mobile id> 
   4. GET mobile + pictures        https:// xxx.serverx.com / api / v1x / mobiles / <mobile id> / pictures
   5. GET mobile + pictures + pic  https:// xxx.serverx.com / api / v1x / mobiles / <mobile id> / pictures / <picture id>  
   6. POST Upload mobile picture   https:// xxx.serverx.com / api / v1x / mobiles /  <mobile id> / uploadPicture
   7. POST add mobile              https:// xxx.serverx.com / api / v1x / mobiles  - ( new payload data )
   8. PUT update mobile            https:// xxx.serverx.com / api / v1x / mobiles / <mobile id>  - ( update payload data )
   9. PATCH update mobile          https:// xxx.serverx.com / api / v1x / mobiles / <mobile id> /like
   10. DELETE mobile               https:// xxx.serverx.com / api / v1x / mobiles / <mobile id>



createJSAPI({

  domainPath :  "https:// xxx.serverx.com" ,
  indexPath  :  "/api/v1x" ,
  
  responseDataType : 'object|json|string'
  
  apis : {
    
    '/mobiles' : 'Mobiles/id' ,
    '/mobiles/id' : 'Mobiles/id'
  
  },
  
})





Amaz.API.Mobiles(function(mobiles){
  
       mobiles.list(filter)
       mobiles.id()
  


  },function(){


});



#Exmaple 

```

var htmlString = "<div class='flet' style='display:none'> <span style='margin-left:10px'> testing </span> </div>"
purifyHtmlStyles = new PurifyHtmlStyles( htmlString );
htmlString = purifyHtmlStyles.run();

console.log( htmlString );

```


