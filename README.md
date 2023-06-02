# NewmcAlertConfirm

Constructor plugin to create bootstrap modal structure for custom alert/confirn dialogs
|||
|:--|:--|
|2022 11 15 |Work in progress|
|2022 11 14 |BETA VERSION V2|
|2022 11 13 |ALPHA VERSION V1|
|||

**AUTHOR: NewMediaConsulting - Mauro Romano**

Plugin to create bootstrap modal structure for custom alert/confirn dialogs

## DECLARATION AND USAGE

#### IN PAGE LOAD ON TOP

CSS STYLE FOR CUSTOMIZATION

```<link rel="stylesheet" href="/your_path_to_file/NewmcAlertConfirm.css">```

#### IN PAGE LOAD AT BOTTOM

HTML PLACEHOLDER
(if "id" will be different from "NewmcAlertConfirm" it must be declared into object key:value pair as containerID:'YOUR_PLACEHOLDER_ID' )

```<div id="NewmcAlertConfirm" class="newmc-dialog-plugin"></div>```

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
    'color'         : HEXVAL,                           // defaults #222222 ( oter values depends by type )
    'bgcolor'       : HEXVAL,                           // default white ( oter values depends by type ),    
    'eID'           : elementID,                        // integer by DOM element
    'checked'       : true|false,                       // boolean
    'icon'          : 'fa-exclamation-triangle',        // FontAwesome icon class (icon class and optional 1 transformation or 1 motion, fa fa-2x exist)   
    'title'         : 'Attenzione!',                    // Header title (must be populated with ajax return message)
    'body'          : 'Voucher non ancora prenotato.',  // Explanation (must be populated with ajax return message)
    'action'        : 'Vuoi riscattarlo comunque?',     // Action to take (must be populated with ajax return message)
    'href'          : URL                               // to load with window.location.href (usually the page httpUrl for redirect without POST/GET data)
    'hrefDelay'     : millisecond                       // for SetTimeout funciton of href redirect
    'returnFalse'   : false                             // return false    
    'triggerON'     : true                              // trigger buttons click
    'cancelText'    : true                              // Text for Cancelbutton
    'okText'        : true                              // Text for OKButton
}
```

For more customizations, see defaultOptions in NewmcAlertConfirm.js
