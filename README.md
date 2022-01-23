# Langer
Langer is a library to facilitate the creation of pages in various languages.

Langer uses json files to have your page in one language or another.

To install this library you must first link the js file in your **head** tag
```html
<script src="https://cdn.jsdelivr.net/gh/DouglasAndres2020/Langer@5.1.0/src/Langer.min.js"></script>
```
you must use this syntax so that the content of your **.json** file can be returned
```html
<lang>$key</lang>
```

now to start using langer you must first instantiate the `LANGUAJE5` class in a variable with the settings you want.
```js
let LANGUAJE = new LANGUAJE5({
    functions: true, //bolean: activate the functions in the json strings
    markdown: true, //bolean: activate the transformation by markdown
    autosave: true //bolean: allows saving and loading the last language selected by the user.
});
```
your file structure where your languages are located look something like this
```
├── your_languaje_folder
    ├── ES.json
    ├── EN.json
    ├── FR.json
    ├── KO.json
    ...
```
Example of some of your json files
```json
{
    "$key": "¡Hellow world!",
    "$settings": "Settings",
    "$example": "this is an example using functions mat(4 + 5)"
}
```
then you must indicate a folder where your languages will be found, for this use
```js
//example
LANGUAJE.setRoute("json/");
```
Now, to set the language of the page, you must indicate the **.json** file that will be used
```js
//example
LANGUAJE.set("EN"); //the information is being obtained in: "json/EN.json"
```
Good! If no error occurred, your label should look like this
```html
<!--before-->
<lang>$key</lang>
<!--after-->
<lang>¡Hellow world!</lang>
```
And every time you use `LANGUAJE.set(filename)` the elements will be updated to the new language!  

if instead of passing a string you pass an object as a parameter to `LANGUAJE.set()`, it will not look for a file but use the passed object as a language  

`example`
```js
LANGUAJE.set({
    $key: "Hellow World without using a file!",
    $settings: "Settings"
}); 
``` 
`result`
```html
<!-- before -->
<lang>$key</lang>
<!-- after -->
<lang>Hellow world without using a file!</lang>
```

## Functions

the functions serve to abbreviate or return something in string of the json obtained
`example`
<br>
```json
{
    "$key": "this is an example using functions mat(4 + 5)"
}
```

```html
<!-- before -->
<lang>$key</lang>
<!-- after -->
<lang>this is an example using functions 9</lang>
```

### Defaults Functions

```js
mi(icon) //return a material-design icon example <i class="material-icon">icon</i>
lang(key) //return some language key
mat(operation) //returns the resolution of a mathematical operation
var(var) //return a variable content from your js code
```
### create your own functions
to create your own functions you should use `LANGUAJE.setFunction(functions)`
```js
//example
LANGUAJE.setFunction(
    function hello(value) {
        return "¡Hellow World!" + value; //functions must necessarily return something.
    },
    function tree(value) {
        return "Forest"
    }
);
```
`NOTE: for your functions to be executed they must be defined before using LANGUAJE.set()`

### Disable Functions
if your element has the `noFunctions` attribute the functions will not be executed on it
```html
<!-- before -->
<lang noFunctions>$key</lang>
<!-- after -->
<lang noFunctions>this is an example using functions mat(4 + 5)</lang>
```

## Auto save last lenguage
If at the time of instantiating the `LANGUAJE5` class you set its `autosave` parameters to true, the last used language will be saved and at the time of reloading the page it will automatically be loaded.
```js
 let LANGUAJE = new LANGUAJE5({
     autosave: true //bolean: allows saving and loading the last language selected by the user.
 });
```

## Langer Functions 
| function | action |
|---|---|
| `LANGUAJE.setRoute(rout)` | parameter string: set folder where the json files will be obtained |
| `LANGUAJE.set(filename)` | parameter string: set file from which the language information will be obtained |
| `LANGUAJE.Update()` | which allows updating the content of elements that were added after `LANGUAJE.set(filename)` |




