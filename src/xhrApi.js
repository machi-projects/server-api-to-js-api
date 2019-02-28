function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

let isFormData = (payload)=>{
	
	if(!payload){
		return false;
	}
	
	if(typeof FormData !== "undefined")
	{
		return payload.constructor == new FormData().constructor
	}	
	
	return typeof payload == "function";
}

let isPlainObject = (payload)=>{
	
	if(!payload){
		return false;
	}
	
	let t = {};
	return payload.constructor == t.constructor;
}


export default (url,headers)=>{
  var core = {
    ajax : function(method, url, payload , progressReport){
      return new Promise( function (resolve, reject) {
    	  
        var client = new XMLHttpRequest();
        
        var queryData = null;
        var isPayloadFormData = isFormData(payload);
        if( isPayloadFormData ){
          	queryData = payload;
        }
        else if( isPlainObject( payload )  &&  (method === 'POST' || method === 'PUT' ) )
        { 
        		queryData = JSON.stringify(payload);
        }
        else{

	        	var data = "";
	        	if ( isPlainObject( payload ) ) {
	        		var argcount = 0;
	        		for (var key in payload) {
	        			if (payload.hasOwnProperty(key)) {
	        				if (argcount++) {
	        					data += '&';
	        				}
	        				data += encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
	        			}
	        		}
	        	}
	
	        	if( data ){
	        	 	url += ( url.lastIndexOf("?") == -1 ? "?"+data : "&"+data );
	        	}
	       
        }
        
        let isDownloadFile = false;
        if( method == "DOWNLOADFILE" ){
        		client.responseType = 'arraybuffer';
        		//client.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        		method = "GET";
        }
        
        if( method == "POSTPARAMS" ){
        		method = "POST";
        }
        
        client.open(method, url);
        
        if( headers ){
        	
	        	let headersObj = Object.assign({},headers);
	        	Object.keys(headersObj).forEach((headerName)=>{
	        		let headerValue = headersObj[ headerName ];
	        		client.setRequestHeader(headerName, headerValue);
	        	});
        }
   
      	client.send(queryData);
        client.onload = function () {
        	
	        if( client.responseType === 'arraybuffer' ) {
	        		
        		 if (this.status === 200) {
    		        resolve({ content : this.response,
		        		contentType : client.getResponseHeader('Content-Type')
    		        });
        		 }
        		 return;
	       }

          if(this.status === 200 || this.status === 201 || this.status === 204 ) {
            var response = this.response ? this.response : this.responseText;
            if(!response){
              resolve(null);
            }
            else {
              var isJsonString= IsJsonString(response)      
              resolve(isJsonString?JSON.parse(response): response);
            }
          } else {
			   var responseContent = this.response ? this.response : this.responseText;
			   if( responseContent ){
				   	var isJsonString = IsJsonString(responseContent);
				   	responseContent = isJsonString?JSON.parse(responseContent): responseContent;
			   }
			
			   reject({ response : { errorResponse : {
				  		status : this.status,
				  		statusText : this.statusText,
				  		servererror : true,
				  		clientError : false,
				  		data : responseContent,
				  		method : method
			   		   }
			   		}
			  	});
          }
        };
        
        if( client.upload )
        {
        		client.upload.addEventListener("progress", function(evt) {
             	
                 if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    progressReport && progressReport( percentComplete );

                 }
             }, false);
        }	

        client.onerror = function (e) {
          
           var responseContent = this.response ? this.response : this.responseText;
		   if( responseContent ){
			   var isJsonString = IsJsonString(responseContent);
			   responseContent = isJsonString?JSON.parse(responseContent): responseContent;
		   }
		   
		   reject({ response : { errorResponse : {
				  		status : this.status,
				  		statusText : this.statusText,
				  		servererror : false,
				  		clientError : true,
				  		data : responseContent,
				  		method : method
		   			}
		   		}
		  	});
		   
        };

      });
    }
  };

  return {
    'get' : function(payload){
      return core.ajax('GET', url , payload);
    },
    'post' : function(payload, progressReport ) {
      return core.ajax('POST', url, payload, progressReport);
    },
    'postAsParams' : function(payload,  progressReport ) {
        return core.ajax('POSTPARAMS', url, payload , progressReport);
     },
    'put' : function(payload) {
      return core.ajax('PUT', url, payload);
    },
    'delete' : function(payload) {
      return core.ajax('DELETE', url, payload);
    },
    'downloadFile' : function(payload) {
        return core.ajax('DOWNLOADFILE', url, payload);
     }
  };
};
