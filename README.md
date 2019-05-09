#js-api-creator

##How to install

```
npm i js-api-creator
```


##How to use in your code - example

```
import { constants } from 'js-api-creator'; 
let jsonAPIS = {
	"blogs" : { url : "connectBlogs" , method : constants.get } ,
	"blogs.create" : { url : "connectBlogs" , method : constants.post } ,
	"blogs.deleteIt" : { url : "connectBlogs/:id" , method : constants.deleteIt } ,
	"blogs.update" : { url : "connectBlogs/:id" , method : constants.put }  ,
	"blogs.get" : { url : "connectBlogs/:id" , method : constants.get },
	"blogs.getByPermalink" : { url : "connectBlogs/blogByPermalink", method : constants.get } ,
	"blogs.search" : { url : "connectBlogs/search", method : constants.get },
	"blogs.relatedBlogs" : { url : "connectBlogs/relatedArticleSearch" , method : constants.get } ,
	"blogs.like" : { url : "connectBlogs/:id/like", method : constants.post },
	"blogs.disLike" : { url : "connectBlogs/:id/dislike", method : constants.post } ,
	"blogs.attachments" : { url : "connectBlogs/:id/attachments", method : constants.get } ,
	"blogs.attachments.download" : { url : "connectBlogs/:blogId/attachments/:id/content" ,
									 method : constants.download }  ,
	"blogs.updateFeedback" : { url : "connectBlogs/:id/feedbacks", method : constants.post } ,
	"blogs.comments" : { url : "connectBlogs/:id/comments" , method : constants.get},
	"blogs.comments.get" :{ url : "connectBlogs/:id/comments/:id", method : constants.get },
	"blogs.comments.attachments" :{ url : "connectBlogs/:blogId/comments/:id/attachments", method : constants.get },
	"blogs.comments.attachments.download" : { url : "connectBlogsBlogs/:blogId/comments/:commentId/attachments/:id/content" , 
										method : constants.download } ,
	"categories" : { url : "connectCategory" , method : constants.get }
}

```

##How we are differenciating the multiple id's in url <== from parameters

```
     Input : 
     
    "blogs.comments.attachments.download" : { 
		url : "connectBlogsBlogs/:blogId/comments/:commentId/attachments/:id/content" ,
		method : constants.download
     }
     
     How we call : 
     blogs.comments.attachments.download({
          blogId : 'efgh-abcd',                    ===> refers blog id
     	commentId : 'abcd-efgh',                 ===> refers comment id
     	id : 'xyz-pqrs'                          ===> refers attachment id
     })

    
    What is the URL output : 
    
    	`connectBlogsBlogs/efgh-abcd/comments/abcd-efgh/attachments/xyz-pqrs/content`

```


##Exmaple build the apis

```
import APIBuilder from 'js-api-creator'; 
let apiBuilder = new APIBuilder( 
	   (m)=>"https://myspace.com/space/v1/" ,   ===> prefix will be added for all urls + dynamic changable
	   (m)=>globalParameters,                   ===> params will be added for all urls + dynamic changable
	   (m)=>headers                             ===> header will be added for all urls + dynamic changable
	);
let apiModuleObject = apiBuilder.create( jsonAPIS, 'modueName' );

apiModuleObject.modueName.blogs( parameters , resolve , reject ) 
apiModuleObject.modueName.blogs.Get( parameters , resolve , reject  ) 
apiModuleObject.modueName.blogs.Search( parameters, resolve , reject )
apiModuleObject.modueName.categories( parameters, resolve , reject  )
  
```


##method - Specific url prefix.

```
modueName.blogs( { url } , parameters , resolve , reject )
```



##module - Specific url pattern prefix , global parameters and header.

```
	 new APIBuilder( 
	 	(m)=>{
	 	   if(m == "kb"){
	 	   	 return module-specific-prefix
	 	   }
	 	   
	 	   return prefix
	 	},
	 	
	 	(m)=>{
	 	   if(m == "kb"){
	 	   	 return {module-specific-global-parameters}
	 	   }
	 	   
	 	   return {global-parameters}
	 	},
	 	
	 	if(m == "kb"){
	 	   	 return {module-specific-headers}
	 	   }
	 	   
	 	   return {global-headers}
	 	}
	 );
```
