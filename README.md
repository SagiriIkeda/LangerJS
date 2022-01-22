# Langer
Langer is a library to facilitate the creation of pages in various languages.

To install this library you must first link the js file in your **head** tag
```html
<script src="bin/Langer 5.js"></script>
```
now to start using langer you must first instantiate the **LANGUAGE5** class in a variable with the settings you want.
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

then you must indicate a folder where your languages will be found, for this use
```js
//example
LANGUAJE.setRoute("json/");
```
Now, to set the language of the page, you must indicate the **.json** file that will be used
```js
//example
LANGUAJE.set("EN");
```



