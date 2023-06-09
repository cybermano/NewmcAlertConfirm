# NewmcAlertConfirm

Constructor plugin to create bootstrap modal structure for custom alert/confirn dialogs, without html modal tags, classes, attributes and/or js triggers to write on each message.

|||||
|:--|:--|:--|:--|
|2022 06 03 | V4 |MASTER STABLE| Added timeOutHide method to auto hide modal after X milliseconds (useful for notification only popups like) |
|2022 11 15 | V3 |RELEASE CANDIDATE| Work in progress|
|2022 11 14 | V2 |BETA VERSION V2||
|2022 11 13 | V1 |ALPHA VERSION V1||
|||||

**AUTHOR: NewMediaConsulting - Mauro Romano**

Plugin to create bootstrap modal structure for custom alert/confirn dialogs. It uses fontawesome icons.
![screenshot](https://github.com/cybermano/NewmcAlertConfirm/blob/main/code_example/Warning.jpg?raw=true)
![screenshot](https://github.com/cybermano/NewmcAlertConfirm/blob/main/code_example/Success.jpg?raw=true)

## DECLARATION AND USAGE

#### IN PAGE LOAD ON TOP

CSS STYLE FOR CUSTOMIZATION

```<link rel="stylesheet" href="/your_path_to_file/NewmcAlertConfirm.css">```

#### IN PAGE LOAD AT BOTTOM

HTML PLACEHOLDER
(if "id" will be different from "NewmcAlertConfirm" it must be declared into object key:value pair as containerID:'YOUR_PLACEHOLDER_ID' )

```<div id="NewmcAlertConfirm" class="newmc-dialog-plugin"></div>```

TO USE AUTO HIDE NOTIFICATIONS, ADD THIS PLACEHOLDER AND USE PROPER ID AND CSS ON CONFIGURATIONS
(if "id" will be different from "NewmcAlertConfirmTimer" it must be declared into object key:value pair as containerID:'YOUR_PLACEHOLDER_ID' )

```<div id="NewmcAlertConfirmTimer" class="newmc-dialog-plugin"></div>```

**If 'timeOtoHide' method is not setted, clicking outside the modal will hide it (but will not perfom any setted triggers)**


#### AT SCRIPT BEGIN

LOAD CONSTRUCTOR (THIS FILE)

```<script src="/your_path_to_file/NewmcAlertConfirm.js"></script>```

##### BASIC USAGE IN PAGE SCRIPT

CALL A NEW CONSTRUCTOR AND PASS TO IT YOUR PARAMETERS (CALL EACH TIME YOU WANT, NO DESTROY NEEDS)

```
// // CUSTOM ALERT
    var customAlertConfirm = new NewmcAlertConfirm({
        dialog:'alert',
        type: 'success',
        title: 'Well done!',
        body: 'You have created your first custom alert with NewmcAlertConfirm constructor!',
        icon: 'fa-check',
    });
// // END CUSTOM ALERT
```

##### JS Object OPTIONAL parameters to pass

```
{
    'containerID'   : 'NewmcAlertConfirm',              // id | default (must refer to html placeholder)
    'dialog'        : 'modal',                          // string, variant 'alert'
    'type'          : 'warning',                        // string, variant: 'info', 'danger', 'success'    
    'color'         : HEXVAL,                           // defaults #222222 ( other values depends by type )
    'bgcolor'       : HEXVAL,                           // default white ( other values depends by type ),    
    'eID'           : elementID,                        // integer by DOM element
    'checked'       : true|false,                       // boolean
    'icon'          : 'fa-exclamation-triangle',        // FontAwesome icon class (icon class and optional 1 transformation or 1 motion, fa fa-2x exist)   
    'title'         : 'Attenzione!',                    // Header title (could be populated with ajax return message)
    'body'          : 'Voucher non ancora prenotato.',  // Explanation (could be populated with ajax return message)
    'action'        : 'Vuoi riscattarlo comunque?',     // Action to take (could be populated with ajax return message)
    'href'          : URL                               // to load with window.location.href (usually the page httpUrl for redirect without POST/GET data)
    'hrefDelay'     : millisecond                       // for SetTimeout funciton of href redirect
    'timeOutHide'   : null,                             // milliseconds (to hide modal after X milliseconds)
    'returnFalse'   : false                             // return false    
    'triggerON'     : true                              // trigger buttons click
    'cancelText'    : true                              // Text for Cancelbutton
    'okText'        : true                              // Text for OKButton
}
```

For more customizations, see defaultOptions in NewmcAlertConfirm.js