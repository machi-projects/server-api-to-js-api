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

#Example

`
let jsonAPIS = {
	"Articles" : "kbArticles" ,
	"Articles/!id/Get" : "kbArticles/id",
	"Articles/Search" : "kbArticles/search" ,
	"Articles/RelatedArticles" : "kbArticles/relatedArticleSearch" ,
	"Articles/!id/++Like" : "kbArticles/id/like" ,
	"Articles/!id/++DisLike" : "kbArticles/id/dislike" ,
	"Articles/!id/Attachments" : "kbArticles/id/attachments" ,
	"Articles/!id/++UpdateFeedback" : "kbArticles/id/feedbacks" ,
	"Category" : "kbCategory" 
}

`

#Definations 

Methods       | json          | javascript api  | urls 
------------- | ------------- | --------------  | ----------------
GET           |  { "Articles" : "kbArticles" }  | mySpace.Articles(parameters)    | `https://myspace.com/space/v1/kbArticles?globalparams`   
GET  | { "Articles/!id/Get" : "kbArticles/id" }   | mySpace.Articles.Get({ id : '<id>' })    | `https://myspace.com/space/v1/kbArticles/<id>?globalparams` 
GET  | { "Articles/!id/Attachments" : "kbArticles/id/attachments" }  | mySpace.Articles.Attachments({ id : '<id>' }) | `https://myspace.com/space/v1/kbArticles/<id>/attachments?globalparams` 
Content Cell  | Content Cell  | Content Cell    | Content Cell  
Content Cell  | Content Cell  | Content Cell    | Content Cell  
Content Cell  | Content Cell  | Content Cell    | Content Cell  

For GET URLS SIMPLY 
  "Articles" : "kbArticles"   -->   mySpace.Articles / https://myspace.com/space/v1/kbArticles?globalparams 



#How to use

`
let apiBuilder = new APIBuilder( "https://myspace.com/space/v1/" , defaultGlobalParamsForAll );
let mySpace = apiBuilder.create( jsonAPIS );

mySpace.Articles( parameters , resolve , reject ) 
mySpace.Articles.Get( parameters , resolve , reject  ) 
mySpace.Articles.Search( parameters, resolve , reject )
mySpace.Category(parameters, resolve , reject  )
  
`

