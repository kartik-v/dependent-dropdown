dependent-dropdown
==================

A multi level dependent dropdown JQuery plugin that allows nested dependencies. The plugin allows you to convert normal
select inputs, whose options are derived based on value selected in another input/or a group of inputs. It works both  
with normal select options and select with optgroups as well.

## Features

- Apply the plugin on a select element and set dependency to one or more other input / select elements (including
  dependency nesting).
- Automatically lock/disable the dependent dropdown until dependent results are available.
- The plugin uses ajax call to the server to render the list of dependent options.
- Allows to set a default
- Allows a loading indicator to be displayed in dependent select until the results are fetched from the server.
- Display a placeholder
- Triggers JQuery events for advanced development. Events currently available are `depdrop.init`, `depdrop.change`,
  `depdrop.beforeChange`,`depdrop.afterChange`, and  `depdrop.error`.
- Size of the entire plugin is less than 4KB (about 3KB for the minified JS and 1KB for the minified CSS).


## Demo

View the [plugin documentation](http://plugins.krajee.com/dependent-dropdown) and
[plugin demos](http://plugins.krajee.com/dependent-dropdown/demo) at Krajee JQuery plugins.

## Pre-requisites

1. Latest [JQuery](http://jquery.com/)
2. All select inputs in markup must have a defined `ID` attribute for the plugin to work.
3. Works currently only with default HTML select input. It is not tested to work with other JQuery plugins that enhance
   the HTML select input (e.g. Select2, multiselect etc.). However, the plugin exposes events, which can be used in
   such situations.
4. The dependent dropdown is generated using an ajax call and hence requires a web server and web programming language to
   generate this. The plugin passes the dependent id values as an input to the ajax call via POST action. The ajax response
   should be a JSON encoded specified format like below:

   ```
   {output: <dependent-list>, selected: <default-selected-value>}
   ```

  where, the `output` is an array of data for the dependent list of the format `{id: <option-value>, name: <option-name>}`,
  and `selected` is the default selected value after the dependent dropdown is generated. If you desire a dependent list
  containing optgroups then the `output` must be of the format `{group-name: {id: <option-value>, name: <option-name>}}`.

## Installation

### Using Bower
You can use the `bower` package manager to install. Run:

    bower install dependent-dropdown

### Using Composer
You can use the `composer` package manager to install. Either run:

    $ php composer.phar require kartik-v/dependent-dropdown "dev-master"

or add:

    "kartik-v/dependent-dropdown": "dev-master"

to your composer.json file

### Manual Install

You can also manually install the plugin easily to your project. Just download the source
[ZIP](https://github.com/kartik-v/dependent-dropdown/zipball/master) or
[TAR ball](https://github.com/kartik-v/dependent-dropdown/tarball/master) and extract the
plugin assets (css and js folders) into your project.

## Usage

Step 1: Load the following assets in your header.

```html
<link href="path/to/css/dependent-dropdown.min.css" media="all" rel="stylesheet" type="text/css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="path/to/js/dependent-dropdown.min.js" type="text/javascript"></script>
```

If you noticed, you need to load the `jquery.min.js` in addition to the `dependent-dropdown.min.css` and
`dependent-dropdown.min.js` for the plugin to work with default settings.

Step 2: Setup your select input markup. NOTE: All select inputs must have a defined `ID` attribute for the plugin to work.

```html
<select id="parent-1">
   <!-- your select options -->
</select>

<select id="child-1">
   <!-- your select options -->
</select>

<select id="child-2">
   <!-- your select options -->
</select>
```

Step 3: Initialize the plugin on your page for your dependent dropdowns. For example,

```js
$("#child-1").depdrop({
    depends: {'parent-1'},
    url: '/path/to/child_1_list'
});

$("#child-2").depdrop({
    depends: {'parent-1', 'child-1'},
    url: '/path/to/child_2_list'
});

```

Alternatively, you can directly call the plugin options by setting data attributes to your input fields.

## Documentation

### Plugin Options
The plugin supports these following options:

##### depends
_array_ The list of input `ID` attributes on which the current dropdown is dependent on.

##### url
_string_ the ajax url action which will process the dependent list. The server action must return a JSON encoded
specified format like `{output: <dependent-list>, selected: <default-selected-value>}`.
where, the `output` is an array of data for the dependent list of the format `{id: <option-value>, name: <option-name>}`,
and `selected` is the default selected value after the dependent dropdown is generated. If you desire a dependent list
containing optgroups then the `output` must be of the format `{group-name: {id: <option-value>, name: <option-name>}}`.

The plugin passes an array of dependent values as a POST request under a variable name `id`, which can be read by the
server action to generate a dependent dropdown list. An example for a PHP server action could be:

```php
public function generateChildren() {
    $out = [];
    if (isset($_POST['id'])) {
        $parents = $_POST['id'];
        if ($id != null) {
            $out = getSubCatList($parents); // this function can query a db and return array of format
                                            // {id: <val>, name: <desc>}, based on the list of parents passed
            echo json_encode(['output' => $out, 'selected'=>'']);
            return;
        }
    }
    echo json_encode(['output' => '', 'selected'=>'']); // note when output is null, a placeholder is displayed
}
```

>NOTE: If you return a null value or an empty array from the server, the plugin will display the `emptyMsg` in the
dependent dropdown, which will be disabled until it has a valid list of values.

##### loading
_boolean_ whether to show a loading spinning icon in the dependent select when server is processing the ajax response.
Defaults to `true`.

##### placeholder
_string_ whether the dependent select has a default placeholder (with an empty value), when no records are found. You
can set this to a label which will be displayed as an empty value. For optgroups this will be a disabled option. If you
set this to null or empty string , it will not be displayed. Defaults to `Select ...`.

##### emptyMsg
_string_ the message to display when the ajax response returned from the server is null or an empty array. Defaults to
`No data found`.

### Plugin Events
The plugin supports these events:

#### depdrop.init
This event is triggered when the dependent dropdown is initialized.

**Example:**
```js
$('#input-id').on('depdrop.init', function(event) {
    // perform any action
});
```

#### depdrop.change
This event is triggered when the dependent parent input is modified or changed. This event also allows you to access
these parameters:

- `value`: the dependent rating value after the change (based on the `selected` variable generated in server response).
- `count`: the count of options generated in the dependent dropdown.

**Example:**
```js
$('#child-1').on('depdrop.change', function(event, value, caption) {
    console.log(value);
    console.log(count);
});
```

#### depdrop.beforeChange
This event is triggered when the dependent parent input is modified or changed and before the ajax response is sent
to the server. This event also allows you to access these parameters:

- `value`: the dependent rating value.

**Example:**
```js
$('#child-1').on('depdrop.beforeChange', function(event, value, caption) {
    console.log(value);
});
```

#### depdrop.afterChange
This event is triggered when the dependent parent input is modified or changed and after the ajax response is processed
by the server. This event also allows you to access these parameters:

- `value`: the dependent rating value.

**Example:**
```js
$('#child-1').on('depdrop.afterChange', function(event, value, caption) {
    console.log(value);
});
```

#### depdrop.error
This event is triggered when the dependent parent input is modified or changed and if an error is faced within
the ajax response processed by the server. This event also allows you to access these parameters:

- `value`: the dependent rating value.

**Example:**
```js
$('#child-1').on('depdrop.error', function(event, value, caption) {
    console.log(value);
});
```

### Plugin Methods
The plugin supports these methods:

#### init
Initialize the dependent dropdown.
```js
$('#input-id').depdrop('init');
```

## License

**dependent-dropdown** is released under the BSD 3-Clause License. See the bundled `LICENSE.md` for details.

