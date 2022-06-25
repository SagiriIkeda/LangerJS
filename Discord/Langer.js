/**
 * 	Langer 6.3 DISCORD BOTS
 *	LICENCE MIT SagiriIkeda
 */
 class LANGUAJE6 {
	/**
	 * Initialize the languages ​​of your bot.
	 * @param {{functions: boolean, rout: string, languages: Array, defaultText: string}} param0 Configuraciones
	 * @example
	 * //await is not required but it is recommended to place it.
	 * let LANGUAJE = await LANGUAJE6.Create({
   	 *	functions: false,
     *	defaultText: "(undefined)",
     *	rout: "json/",
     *	languages: ["ES","EN"]
	 *	});
	 */

	static async Create({ functions = true, rout = "", languages = [],defaultText = "(undefined)" } = {}) {
		let obj = {}

		obj.route = rout;
		obj.allow = {
			functions: functions,
		}
		obj.config = {
			CACHE: {},
			defaultText: defaultText,
		}

		obj.functions = {};
		//CHECK TYPE OF PARAMETERS
		if (typeof rout != "string") {
			ErrorMSG("LANGUAJE6 ERROR: The rout parameter must be a string");
			return;
		}
		if (rout.trim() == "") {
			ErrorMSG("LANGUAJE6 ERROR: The rout parameter can't be vacio");
			return;
		}
		if (Array.isArray(languages) != true) {
			ErrorMSG("LANGUAJE6 ERROR: The rout languages must be a Array");
			return;
		}
		if (languages.length == 0) {
			ErrorMSG("LANGUAJE6 ERROR: the language list cannot be empty")
			return;
		}

		let ValidLangs = true;
		global.LANGUAJECONTEXT = obj;


		async function get(lang = "") {
			let file = `./${obj.route}${lang}.json`;
			try {
				let response = await require(file);
				
				obj.config.CACHE[lang] = response;
				return true;
			} catch (error) {
				if(error.name == "SyntaxError") {
                    ErrorMSG(`LANGUAJE6 Error: Invalid JSON ${error.message.replace(" in JSON","") }`)
                }
				if(error.code == "MODULE_NOT_FOUND") {
					ErrorMSG(`LANGUAJE6 Error: \nFile "${file}" not found`);
				}
				return false;
			}
		}

		for (let i = 0; i < languages.length; i++) {
			const lang = languages[i];
			let gettedData = await get(lang);
			if (gettedData == false) {
				ValidLangs = false;
				break;
			} else {
				continue;
			}
		}

		if (ValidLangs == false) {
			return;
		}

		global.LANGUAJECONTEXT = obj;

	}
	//UTILITIES

	/**
	 * Search among the names of the languages ​​for one that matches regardless of their upper or lower case.
	 * @param {string} language language to search
	 * @returns true or false
	 * @example
	 * LANGUAJE6.has("EN")
	 */

	static has (language = "") {
		const { LANGUAJECONTEXT } = global;
		let languages = Object.keys(LANGUAJECONTEXT.config.CACHE);

		if (typeof language != "string") return ErrorMSG("LANGUAJE6 Error: se tiene que pasar el lenguaje a comprobar");
		if (language.trim() == "") return ErrorMSG("LANGUAJE6 Error: el lenguaje no puede estar vacio");

		let result = languages.find((l) => l.toLowerCase() == language.toLowerCase());
		return (result == undefined) ? false : true;
	}
	/**
	 * Search among the names of the languages ​​for one that matches regardless of their upper or lower case.
	 * @param {string} language language to search
	 * @returns returns the exact language name if found and undefined if not.
	 * @example
	 * LANGUAJE6.findHas("EN")
	 */

	static findHas (language = "") {
		const { LANGUAJECONTEXT } = global;
		let languages = Object.keys(LANGUAJECONTEXT.config.CACHE);

		if (typeof language != "string") return ErrorMSG("LANGUAJE6 Error: se tiene que pasar el lenguaje a comprobar");
		if (language.trim() == "") return ErrorMSG("LANGUAJE6 Error: el lenguaje no puede estar vacio");

		let result = languages.find((l) => l.toLowerCase() == language.toLowerCase());
		return (result == undefined) ? undefined : result;
	}

	/**
	 * Create an instance of the language controller, which is used to obtain the keys of that language
	 * @param {string} lang language to use
	 * @returns will return a function that, passing a key as a parameter, returns its content.
	 * @example
	 * let keyParser = LANGUAJE6.Controller("EN");
	 * console.log( keyParser("example") )
	 */

	static Controller(lang) {
		return new LANGUAJECONTROLLER(lang);
	}
	/**
	 * Add custom functions
	 * @param  {...function} funcs 
	 */
	static setFunction(...funcs) {
        funcs.forEach(func => {
            global.LANGUAJECONTEXT.functions[func.name] = func;
        })
    }
	/**
	 * used to obtain an array of loaded languages
	 * @returns array of existing languages.
	 */
	static languagesArray () {
		if(global.LANGUAJECONTEXT.config != undefined) {
			return Object.keys(global.LANGUAJECONTEXT.config.CACHE);
		}
		return [];
	}
	static toArray() {
		return LANGUAJE6.languagesArray();
	}

}

/**
 * Languaje Controller Manager
 */

class LANGUAJECONTROLLER {
	/**
	 * 
	 * @param {string} lang Language from which the keys will be obtained.
	 * @returns will return a function that, passing a key as a parameter, returns its content.
	 */
	constructor(lang) {
		const { LANGUAJECONTEXT } = global;

		if (Object.entries(LANGUAJECONTEXT).length == 0 || Object.entries(LANGUAJECONTEXT.config.CACHE).length == 0) {
			ErrorMSG("LANGUAJE6 Error: There are NO languages, this error is because LANGUAJE6.Create was never executed or some language could not be loaded")
			return () => {
				return LANGUAJECONTEXT.config.defaultText;
			}
		}
		if (LANGUAJECONTEXT.config.CACHE[lang] == undefined) {
			ErrorMSG(`LANGUAJE6 Error: The language "${lang}" does not exist.`)
			return () => {
				LANGUAJECONTEXT.config.defaultText;
			}
		}


		this.activeLang = global.LANGUAJECONTEXT.config.CACHE[lang] ?? {};
		this.config = global.LANGUAJECONTEXT.config;
		this.allow = global.LANGUAJECONTEXT.allow;

		let self = this;
		this.functions = {
			lang(key) {
				let obtained = self.activeLang[key];
				if (key == "lang") {
					obtained = lang;
				}
				return obtained ?? self.config.defaultText;
			},
		}

		this.functions = { ...this.functions, ...global.LANGUAJECONTEXT.functions };

		//getKeyMethod
		return (key = "", placeholders = {}, noFunctions = false) => {
			return this.Motor(key, placeholders, noFunctions);
		}
	}
	/**
	 * Process the functions in a text, if they are enabled.
	 * @param {string} string text to process
	 * @param {boolean} noFunct true if you want it not to be processed.
	 * @returns returns the text with the processed functions.
	 */

	FunctionsMotor(string, noFunct) {
		if (this.allow.functions != true || noFunct == true) {
			return string;
		}
		let result = string;
		// MOTOR V5
		result = result.replace(/(\w+)\((.*?)\)/gim, (func, name, value) => {
			if (this.functions[name]) {
				return this.functions[name](value);
			}
			return func;
		})
		return result;
	}
	/**
	 * Find a key
	 * @param {string} key key to search for in the language.
	 * @returns returns the value of the key (raw) or the default text in case the key does not exist.
	 */
	getKey(key = "") {
		if (typeof key == "string") {
			return this.activeLang[key.trim()] ?? this.config.defaultText;
		}
	}
	/**
	 * Process the placeholders in a text, if there are any.
	 * @param {string} string text to process
	 * @param {Object} placeholders Object with the placeholders to use
	 * @returns returns the text with the processed placeholders.
	 */
	PlaceholdersMotor(string, placeholders) {
		if (placeholders == null) return string;
		if (placeholders == {}) return string;
		return string.replace(/%([A-Z_0-9\-]+)%/gim, (e, holder) => {
			//Denieds Attrs holders
			if (["class", "style", "id"].includes(holder)) {
				return e;
			}
			let getTedHolder = placeholders[holder];
			if (getTedHolder != undefined) {
				let KeyHolder = getTedHolder.toString();
				return KeyHolder;
			}
			return e
		})
	}
	/**
	 * Key Motor
	 * @param {string} key key to search
	 * @param {Object} placeholders Placeholders to use in this key
	 * @param {boolean} noFunctions Enable functions on this key
	 * @returns returns the text value of a key already processed by all functions.
	 */

	Motor(key = "", placeholders = {}, noFunctions) {
		if (placeholders == true) {
			noFunctions = true;
			placeholders = null;
		}
		let string = this.getKey(key);
		string = this.PlaceholdersMotor(string, placeholders);
		string = this.FunctionsMotor(string, noFunctions);

		return string;
	}
}
global.LANGUAJECONTEXT = {
	functions:{}
};


function ErrorMSG(emsg = "") {
	console.error(emsg)
}

module.exports = LANGUAJE6;