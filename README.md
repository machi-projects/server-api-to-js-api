# server-api-to-js-api

#Example

```
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

```

#key - meaning in above json /  #value - meaning in above json 

```  
   { ' will be converted as js api ' : ' used for url to call api  }
```

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

```
let apiBuilder = new APIBuilder( "https://myspace.com/space/v1/" , defaultGlobalParamsForAll );
let mySpace = apiBuilder.create( jsonAPIS );

mySpace.Articles( parameters , resolve , reject ) 
mySpace.Articles.Get( parameters , resolve , reject  ) 
mySpace.Articles.Search( parameters, resolve , reject )
mySpace.Category(parameters, resolve , reject  )
  
```

