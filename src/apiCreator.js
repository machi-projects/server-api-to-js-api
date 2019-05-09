import requestAPI from './xhrApi';

let isFormData = (payload)=>{
	
	if(typeof FormData !== "undefined")
	{
		return payload.constructor == new FormData().constructor
	}	
	
	return typeof payload == "function";
}

let Builder = (apiJson, options) => {
	//Url and param builder..
	var apiOptions = (_method, requestUrl, parameters, queryParameters) => {
		
		var userParams = parameters;
		var isFormDataParams = isFormData(parameters);
		if( !isFormDataParams ){
			userParams = Object.assign({}, parameters); // to address re-back call ajax parameters keeping..
			if (Object.keys(parameters).length) {
				var propsToUrl = requestUrl.split('/'); // helps to some parameter to url...
				for (var i = 0, len = propsToUrl.length; i < len; i++) {
					var prop = propsToUrl[i];
					var paramKey = prop.replace(':','');
					if ( prop.charAt(0) === ':' && userParams.hasOwnProperty(paramKey) ) {
						var value = userParams[paramKey];
						requestUrl = requestUrl.replace('/' + prop, value ? '/' + value : '');
						requestUrl = requestUrl.replace( prop + '/', value ? value + '/' : '');
						delete userParams[paramKey];
					}
				}
			}
		}
		
		let defaultParams = Object.assign( {}, queryParameters, options.defaultParams);
		let gobalParamsToUrl = '';
		let count = 0;
		for (var prop in defaultParams) {
			if (count > 0) {
				gobalParamsToUrl += `&${prop}=${defaultParams[prop]}`;
				break;
			}
			gobalParamsToUrl += `${prop}=${defaultParams[prop]}`;
			count = 1;
		}

		gobalParamsToUrl = gobalParamsToUrl ? '?' + gobalParamsToUrl : '';
		
		if( !isFormDataParams ){
			var length = userParams ? Object.keys(userParams).length : 0;
			userParams =  length > 0 ? userParams : null;
		}
		 
		return {
			url: options.prefixUrl + requestUrl + gobalParamsToUrl, 
			param:userParams
		};
	};

	
	//url - bind arguments not from user..
	var httpConnection = ajaxmethod => {
		return (url, userPayload, userQueryStringParams, success, failure, progressReport) => {
			
			var ajaxcall = () => {
				
				let authHeaders = options.authHeaders;
				let headers = authHeaders ? authHeaders() : null;
				
				if (typeof userPayload == 'function') {
					
					var apioptions = apiOptions(ajaxmethod, url, {});
					return requestAPI(apioptions.url,headers)[ajaxmethod](apioptions.param, success).then(userPayload, userQueryStringParams);
				}

				if(typeof userQueryStringParams == 'function'){
					var apioptions = apiOptions(ajaxmethod, url, (userPayload || {}));
					return requestAPI(apioptions.url,headers)[ajaxmethod](apioptions.param, failure).then(userQueryStringParams, success);
				}
				
				var apioptions = apiOptions(ajaxmethod, url, (userPayload || {}), userQueryStringParams);
				return requestAPI(apioptions.url,headers)[ajaxmethod](apioptions.param, progressReport).then(success, failure);
			};
			
			return ajaxcall();
		};
	};

	//auto api functions creation...
	var userAPIS = {};
	for (var prop in apiJson) {
		
		var api = prop;
		var apivalue = apiJson[prop];
		
		var apiurl = apivalue.url;
		var apimethod = apivalue.method;
	
		//var apiFragments = api.split('/');
		var apiFragments = api.split('.');
		var lastObj = userAPIS;

		for (var j = 0; j < apiFragments.length; j++) {
			var apiFragment = apiFragments[j];
			if (apiFragment.indexOf(':') != -1) {
				continue; //Skipping this !api
			}

			if (apiFragment && typeof lastObj[apiFragment] === 'undefined') {
				
				lastObj[apiFragment] = httpConnection(apimethod).bind(null, apiurl);
				
				/*if (apiFragment.indexOf('+++') != -1) {
					apiFragment = apiFragment.replace('+++', '');
					lastObj[apiFragment] = httpConnection('put').bind(null, apiurl);
				} 
				else if (apiFragment.indexOf('++') != -1) {
					apiFragment = apiFragment.replace('++', '');
					lastObj[apiFragment] = httpConnection('post').bind(null, apiurl);
				} 
				else if (apiFragment.indexOf('>>>') != -1) {
					apiFragment = apiFragment.replace('>>>', '');
					lastObj[apiFragment] = httpConnection('postAsParams').bind(null, apiurl);
				}
				else if (apiFragment.indexOf('--') != -1) {
					apiFragment = apiFragment.replace('--', '');
					lastObj[apiFragment] = httpConnection('delete').bind(null, apiurl);
				} 
				else if (apiFragment.indexOf('>>') != -1) {
					apiFragment = apiFragment.replace('>>', '');
					lastObj[apiFragment] = httpConnection('downloadFile').bind(null, apiurl);
				}
				else {
					lastObj[apiFragment] = httpConnection('get').bind(null, apiurl);
				}*/
				
			}
			
			if( apiFragment && typeof lastObj[apiFragment] !== 'undefined'){
				lastObj = lastObj[apiFragment];
			}
		}
	}

	return userAPIS;
};

export default class {
	
	constructor(prefixUrl, defaultParams, authHeaders) {
		this.prefixUrl = prefixUrl;
		this.defaultParams = defaultParams;
		this.authHeaders = authHeaders;
	}
	
	create(javaApiList, name) {
		
		let defaultParams = this.defaultParams(name);
		let prefixUrl = this.prefixUrl(name);
		let authHeaders = this.authHeaders(name);
		
		return Builder(javaApiList || {}, { defaultParams, prefixUrl, authHeaders });
	}
}
