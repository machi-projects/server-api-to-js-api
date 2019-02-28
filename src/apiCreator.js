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
	let apiOptions = (_method, requestUrl, parameters) => {
		
		let userParams = parameters;
		let isFormDataParams = isFormData(parameters);
		if( !isFormDataParams ){
			userParams = Object.assign({}, parameters); // to address re-back call ajax parameters keeping..
			if (Object.keys(parameters).length) {
				let propsToUrl = requestUrl.split('/'); // helps to some parameter to url...
				for (let i = 0, len = propsToUrl.length; i < len; i++) {
					let prop = propsToUrl[i];
					if (userParams.hasOwnProperty(prop) ) {
						let value = userParams[prop];
						requestUrl = requestUrl.replace('/' + prop, value ? '/' + value : '');
						delete userParams[prop];
					}
				}
			}
		}
		
		
		let defaultParams = options.defaultParams;
		let gobalParamsToUrl = '';
		let count = 0;
		for (let prop in defaultParams) {
			if (count > 0) {
				gobalParamsToUrl += `&${prop}=${defaultParams[prop]}`;
				break;
			}
			gobalParamsToUrl += `${prop}=${defaultParams[prop]}`;
			count = 1;
		}

		gobalParamsToUrl = gobalParamsToUrl ? '?' + gobalParamsToUrl : '';
		
		if( !isFormDataParams ){
			let length = userParams ? Object.keys(userParams).length : 0;
			userParams =  length > 0 ? userParams : null;
		}
		 
		return {
				url: options.prefixUrl + requestUrl + gobalParamsToUrl, 
				param:userParams
			  };
	};

	//url - bind arguments not from user..
	let httpConnection = ajaxmethod => {
		return (url, userParam, success, failure, progressReport) => {
			userParam = userParam || {};
			
			let ajaxcall = () => {
				
				if (typeof userParam == 'function') {
					
					let apioptions = apiOptions(ajaxmethod, url, {});
					return requestAPI(apioptions.url)[ajaxmethod](apioptions.param, progressReport).then(userParam, success);
					
				}

				let apioptions = apiOptions(ajaxmethod, url, userParam);
				return requestAPI(apioptions.url)[ajaxmethod](apioptions.param, progressReport).then(success, failure);
			};

			return ajaxcall();
		};
	};

	let objectKey = a => {
		for (let i in a) {
			
			return { name: i, value: a[i] };
		}
	};
  
	//auto api functions creation...
	let userAPIS = {};
	//let isApiArray = Array.isArray(apiJson);
	for (let prop in apiJson) {
		
		let api = prop;
		let apiurl = apiJson[prop];
		let apiFragments = api.split('/');
		let lastObj = userAPIS;

		for (let j = 0; j < apiFragments.length; j++) {
			let apiFragment = apiFragments[j];
			if (apiFragment.indexOf('!') != -1) {
				continue; //Skipping this !api
			}

			if (apiFragment && typeof lastObj[apiFragment] === 'undefined') {
				if (apiFragment.indexOf('++') != -1) {
					apiFragment = apiFragment.replace('++', '');
					lastObj[apiFragment] = httpConnection('post').bind(null, apiurl);
				} else if (apiFragment.indexOf('+++') != -1) {
					apiFragment = apiFragment.replace('+++', '');
					lastObj[apiFragment] = httpConnection('put').bind(null, apiurl);
				} else if (apiFragment.indexOf('--') != -1) {
					apiFragment = apiFragment.replace('--', '');
					lastObj[apiFragment] = httpConnection('delete').bind(null, apiurl);
				} else {
					lastObj[apiFragment] = httpConnection('get').bind(null, apiurl);
				}
			}
			
			if( apiFragment && typeof lastObj[apiFragment] !== 'undefined'){
				lastObj = lastObj[apiFragment];
			}
			
		}
	}

	return userAPIS;
};

export default class {
	constructor(prefixUrl, defaultParams) {
		this.prefixUrl = prefixUrl;
		this.defaultParams = defaultParams;
	}

	create(javaApiList, name) {
		
		let apiBuilded = null;
		apiBuilded = Builder(javaApiList || {}, { defaultParams: this.defaultParams, prefixUrl: this.prefixUrl });
		return apiBuilded;
	}
}
