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


export default (url)=>{
  let core = {
    ajax : function(method, url, payload , progressReport){
      return new Promise( function (resolve, reject) {
    	  
        let client = new XMLHttpRequest();
        
        
        let queryData = null;
        let isPayloadFormData = isFormData(payload);
        if( isPayloadFormData ){

          	queryData = payload;
        }
        else if( isPlainObject( payload )  &&  (method === 'POST' || method === 'PUT' ) )
        { 
        		queryData = JSON.stringify(payload);
        }
        else{
	        	let data = "";
	        	if ( isPlainObject( payload ) ) {
	        		let argcount = 0;
	        		for (let key in payload) {
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
        
        client.open(method, url);
        
    		/*client.setRequestHeader("Accept", "application/json");
        client.setRequestHeader("Accept", "text/*");
  		if( !isPayloadFormData ){
        if(   (method === 'POST' || method === 'PUT' )   )
        	{
        		client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        	}
        	else 
        	{
        		client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        		client.setRequestHeader("Accept", "application/json");
        	}

        client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        client.setRequestHeader("X-ZCSRF-TOKEN","crmcsrfparam=4c94608558501a4101e73f45eab952e9c5f3def56548766b2c14d81945fbedeee213b6340f0dab0c466a3f80745f78db273477b1ad66639ea8c0fbc06f4752e3");
        */
        
      	client.send(queryData);
        client.onload = function () {
        	
          if(this.status === 200 || this.status === 201 || this.status === 204 ) {
            let response = this.response ? this.response : this.responseText;
            if(!response){
              resolve(null);
            }
            else {
              let isJsonString= IsJsonString(response)      
              resolve(isJsonString?JSON.parse(response): response);
            }
          } else {
			   let responseContent = this.response ? this.response : this.responseText;
			   if( responseContent ){
				   	let isJsonString = IsJsonString(responseContent);
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
                    let percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    progressReport( percentComplete );

                 }
             }, false);
        }	

        client.onerror = function (e) {
          
           let responseContent = this.response ? this.response : this.responseText;
		   if( responseContent ){
			   let isJsonString = IsJsonString(responseContent);
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
    'post' : function(payload , progressReport ) {
      return core.ajax('POST', url, payload , progressReport);
    },
    'put' : function(payload) {
      return core.ajax('PUT', url, payload);
    },
    'delete' : function(payload) {
      return core.ajax('DELETE', url, payload);
    }
  };
};

