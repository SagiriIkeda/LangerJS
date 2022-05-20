/*
    Langer 5.7 DEBUG version
    LICENCE MIT DouglasAndres©2020
===========================================================>
*/

class LANGUAJE5 {
    constructor ({functions = true,markdown = true,autosave = false} = {}) {
        let self = this;
		this.stor = false;
        this.name = this.constructor.name;
        this.color = "color:#FFC107";
        this.route = undefined;
        this.allow = {
            functions: functions,
            markdown: markdown,
            autosave: autosave
        }
        this.config = {
            CACHE: {},
            lang: "",
            lastLang: {}
        }
        this.functions = {
            mi(value) {
                return `<i class="material-icon">${value}</i>`;
            },
            lang(key) {
                let obtained = self.config.CACHE[self.config.lang][key];
                if(key == "this"){
                    obtained = self.config.lang;
                }
                return obtained ?? "(undefined)"
            },
            mat(operation) {
                let valid = operation.match(/(\d|\s|[+*/-])+/gim)
                if(valid != null){
                    return (eval(valid[0]));
                }else {
                    return "invalid operation."
                }
            },
            var(variable) {
                let result = undefined;
                let Var = variable.match(/\w+((.\w+\]?)*)/gim)[0];
                if(Var != null && (Var.slice(0,1)).match(/[0-9]/gim) == null){
                    result = eval(Var);
                }
                return result;
            },
        };
        // leer la cache del localStorage
        if(localStorage.getItem(`${this.name}`) != undefined && this.allow.autosave == true){
            this.config.lang = JSON.parse(localStorage.getItem(`${this.name}`));
        }
        let style = document.createElement("style");
        style.innerHTML = `lang {display: none;}lang[use]{display: block;}`;
        document.head.appendChild(style)

    }
    //OBTENER LA DATA
    async get(lang) {
        let self = this;
        let rtn = false;
        if(this.route == undefined){
            console.error(`${this.name} Error: \n you need to set a path to get the json files \n use LANGUAJE.setRoute()`);
            return false;
        }
        if(self.config.CACHE[lang] == undefined){
            let timeStart = Date.now();
            await fetch(`${this.route}${lang}.json`)
            .then(e => e.json())
            .then(response => {
                // guarda en la local cache el nuevo lenguaje
                self.config.CACHE[lang] = response;
                self.config.lang = lang;
                localStorage.setItem(`${this.name}`,JSON.stringify(self.config.lang))
                //retorna el lenguaje
                let timeEnd = Date.now();
                console.log(`%c${this.name} Debug:\nfiles were obtained in ${timeEnd - timeStart}ms`,this.color)
                rtn = self.config.CACHE[lang];
            }).catch(error => {
                console.error(`${this.name} Error: \nan error occurred, could not get the json files`);
                rtn = false;
            });
        }else {
            self.config.lang = lang;
            localStorage.setItem(`${this.name}`,JSON.stringify(self.config.lang))
            //retorna el lenguaje guardado previamente guardado en la local cache
            console.log(`%c${this.name} Debug:\nContent loaded from local cache.`,this.color);
            rtn = self.config.CACHE[lang];
        }
        return rtn;
    }
    //MOTOR de funciones
    motor(string) {
        let result = string;
            // MOTOR V5
            result = result.replace(/(\w+)\((.*?)\)/gim,(func,name,value) => {
                if(this.functions[name]){
                    return this.functions[name](value);
                }
                return func;
            })
        return result;
    }
    //MOTOR Markdown
    markdown(string) {
        if(this.allow.markdown == true){
            let tag = (tag,content) => `<${tag}>${content}</${tag}>`;
            string = string.replace(/((\*\*|\_\_))([^*]+)(\1)/gims, (f,fir,cont,sec) => {
                return tag("strong",sec);
            })
            string = string.replace(/((\*|\_))([^*]+)(\1)/gims, (f,fir,cont,sec) => {
                return tag("em",sec);
            })
            string = string.replace(/(~~)([^~]+)(~~)/gims, (f,fir,cont,sec) => {
                return tag("del",cont);
            })
        }
        return string;
    }
    getKey(key = "") {
        if(typeof key == "string"){
            return this.config.lastLang[key];
        }
    }
    PlaceholdersMotor(string,langElm) {
        return string.replace(/%([A-Z_0-9\-]+)%/gim,(e,holder) => {
            //Denieds Attrs holders
            if(["class","style","id"].includes(holder)){
                return e;
            }
            if(langElm.getAttribute(holder) != undefined){
                let KeyHolder = langElm.getAttribute(holder);
                return KeyHolder;
            }
            return e
        })
    }

    StringGenerator(str,langElm) {
        return this.PlaceholdersMotor(this.markdown((str)? (this.allow.functions == true && langElm.getAttribute('noFunctions') == undefined)? this.motor(str): str : ""),langElm);
    }
    //PINTAR LA DATA
    async set(lang = ""){
        if(lang == null || lang == undefined || ["string","object"].includes(typeof lang) == false || Array.isArray(lang) == true) {
            console.error(`${this.name} Error:\n LANGUAJE.set() can only receive a string or an object as a parameter.`)
            return false;
        }
        //autosave
        if(this.allow.autosave == true && this.stor == false){
            this.stor = true;
            if(this.config.lang != ""){
                lang = this.config.lang;
            }
        }
        //print data
        let data = (typeof lang == "object")? lang : await this.get(lang);
        this.config.lastLang = data;
        let inform = false;
        if(data != false) {
            setTimeout(() => {
                document.querySelectorAll('lang').forEach(langElm => {
                    langElm.setAttribute('use',"")
                    if(langElm.lenguaje != undefined && langElm.lenguaje == lang){
                        if(inform == false){
                            console.log(`%c${this.name} Debug:\n Same language only new elements will be updated`,this.color)
                            inform = true;
                        }
                        return false;
                    }
                    let target = langElm.innerHTML;
                    if(langElm.target == undefined){
                        langElm.target = target;
                    }
                    langElm.lenguaje = lang;
                    let key = data[langElm.target] ?? "(undefined)";
                    langElm.innerHTML = this.StringGenerator(key,langElm);
                })
            }, 0);
        }
    }
    Update() {
        this.set(this.config.lastLang)
    }
    setFunction(...funcs) {
        funcs.forEach(func => {
            this.functions[func.name] = func;
        })
    }
    setRoute(direction) {
        if(typeof direction == "string"){
            this.route = direction;
        }else {
            console.error(`${this.name} Error:\n LANGUAJE.setRout() can only receive a string as a parameter.`)
        }
    }
}