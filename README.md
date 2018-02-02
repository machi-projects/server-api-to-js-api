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
	"Category" : "kbCategory",
	"Articles/++Create" : "kbArticles",
	"Articles/++uploadAttachment" : "uploadAttachments",
	
}

`

#Definations 

Methods       | json          | javascript api  | urls 
------------- | ------------- | --------------  | ----------------
GET           |  { "Articles" : "kbArticles" }  | mySpace.Articles(parameters)    | `https://myspace.com/space/v1/kbArticles?globalparams`   
GET  | { "Articles/!id/Get" : "kbArticles/id" }   | mySpace.Articles.Get({ id : `<id>` })    | `https://myspace.com/space/v1/kbArticles/<id>?globalparams` 
GET  | { "Articles/!id/Attachments" : "kbArticles/id/attachments" }  | mySpace.Articles.Attachments({ id : `<id>` }) | `https://myspace.com/space/v1/kbArticles/<id>/attachments?globalparams` 
POST  | { "Articles/!id/++Like" : "kbArticles/id/like" }  | mySpace.Articles.Like({ id : `<id>`})    | `https://myspace.com/space/v1/kbArticles/<id>/like?globalparams`
POST  | {"Articles/++Create" : "kbArticles"} | mySpace.Articles.Create({ all the data })    | `https://myspace.com/space/v1/kbArticles?globalparams`
POST  | {"Articles/++CreateAttachment" : "uploadAttachments"} | mySpace.Articles.CreateAttachment(FormData) | `https://myspace.com/space/v1/uploadAttachments?globalparams`  
PUT  | {"Articles/!id/+++Update" : "kbArticles/id"} | mySpace.Articles.Update({ all the data })    | `https://myspace.com/space/v1/kbArticles/<id>?globalparams`
DELETE  | {"Articles/!id/--Delete" : "kbArticles/id"} | mySpace.Articles.Delete({ id : `<id>` })    | `https://myspace.com/space/v1/kbArticles/<id>?globalparams`



#How to use

`
let apiBuilder = new APIBuilder( "https://myspace.com/space/v1/" , defaultGlobalParamsForAll );
let mySpace = apiBuilder.create( jsonAPIS );

mySpace.Articles( parameters , resolve , reject ) 
mySpace.Articles.Get( parameters , resolve , reject  ) 
mySpace.Articles.Search( parameters, resolve , reject )
mySpace.Category(parameters, resolve , reject  )
  
`

