# server-api-to-js-api

#How to use in your code.

```
let apiBuilder = new APIBuilder( (m)=>"https://myspace.com/space/v1/" , (m)=>globalParameters, (m)=>headers );
let apiObject = apiBuilder.create( jsonAPIS, 'mySpace' );

apiObject.mySpace.Blogs( parameters , resolve , reject ) 
apiObject.mySpace.Blogs.Get( parameters , resolve , reject  ) 
apiObject.mySpace.Blogs.Search( parameters, resolve , reject )
apiObject.mySpace.Category(parameters, resolve , reject  )
  
```

#Example

```
let jsonAPIS = {
	"Blogs" : "connectBlogs" ,
	"Blogs/++Create" : "connectBlogs" ,
	"Blogs/:id/--DeleteIt" : "connectBlogs/:id" ,
	"Blogs/:id/+++Update" : "connectBlogs/:id" ,
	"Blogs/:id/Get" : "connectBlogs/:id",
	"Blogs/GetByPermalink" : "connectBlogs/blogByPermalink",
	"Blogs/Search" : "connectBlogs/search" ,
	"Blogs/RelatedBlogs" : "connectBlogs/relatedArticleSearch" ,
	"Blogs/:id/++Like" : "connectBlogs/:id/like" ,
	"Blogs/:id/++DisLike" : "connectBlogs/:id/dislike" ,
	"Blogs/:id/Attachments" : "connectBlogs/:id/attachments" ,
	"Blogs/:blogId/Attachments/:id/>>Download" : "connectBlogs/:blogId/attachments/:id/content" ,
	"Blogs/:id/++UpdateFeedback" : "connectBlogs/:id/feedbacks" ,
	"Blogs/:id/Comments" : "connectBlogs/:id/comments",
	"Blogs/:id/Comments/:id/Get" : "connectBlogs/:id/comments/:id",
	"Blogs/:blogId/Comments/:commentId/Attachments/:id/>>Download" : "connectBlogsBlogs/:blogId/comments/:commentId/attachments/:id/content" ,
	"Category" : "connectCategory"
}

```

#key / #value - meaning in above json 

```  
   { '<key will be converted as js api>' : '<value used for url to call api>'  }
```

#Definations 

Methods       | json          | javascript api  | urls 
------------- | ------------- | --------------  | ----------------
GET           |  { "Blogs" : "connectBlogs" }  | mySpace.Blogs(parameters)    | `https://myspace.com/space/v1/connectBlogs?globalparams`   
GET  | { "Blogs/!id/Get" : "connectBlogs/id" }   | mySpace.Blogs.Get({ id : `<id>` })    | `https://myspace.com/space/v1/connectBlogs/<id>?globalparams` 
GET  | { "Blogs/!id/Attachments" : "connectBlogs/id/attachments" }  | mySpace.Blogs.Attachments({ id : `<id>` }) | `https://myspace.com/space/v1/connectBlogs/<id>/attachments?globalparams` 
POST  | { "Blogs/!id/++Like" : "connectBlogs/id/like" }  | mySpace.Blogs.Like({ id : `<id>`})    | `https://myspace.com/space/v1/connectBlogs/<id>/like?globalparams`
POST  | {"Blogs/++Create" : "connectBlogs"} | mySpace.Blogs.Create({ all the data })    | `https://myspace.com/space/v1/connectBlogs?globalparams`
POST  | {"Blogs/++CreateAttachment" : "uploadAttachments"} | mySpace.Blogs.CreateAttachment(FormData) | `https://myspace.com/space/v1/uploadAttachments?globalparams`  
PUT  | {"Blogs/!id/+++Update" : "connectBlogs/id"} | mySpace.Blogs.Update({ all the data })    | `https://myspace.com/space/v1/connectBlogs/<id>?globalparams`
DELETE  | {"Blogs/!id/--Delete" : "connectBlogs/id"} | mySpace.Blogs.Delete({ id : `<id>` })    | `https://myspace.com/space/v1/connectBlogs/<id>?globalparams`


#!id - keys in url

```
	!id -> we will replace the value using parameters key(id) <==> mySpace.Blogs({id:'<292929929>'})
```



# What is New in Format - need todo.

```
{
	"Blogs" : {
		url : "connectBlogs",
		method : "get",
		params : {
			"sortBy" : "[(+-)?createdTime|liked|disliked]",
			"type" : "([])",
			"category" : "number"
		}
	}
}
```


``` 
	==> We can generate this json format from security.xml
	
	1. Test Cases for API is Easy.
	2. Automation will be convered.
	3. Parameter type validation on development time is helpful.
	4. Create Documention for Javascript API.

```