/*
2022 11 15 Work in progress
2022 11 14 BETA VERSION V2
2022 11 13 ALPHA VERSION V1

AUTHOR: NewMediaConsulting - Mauro Romano

Plugin to create bootstrap modal structure for custom alert/confirn dialogs
JS Object OPTIONAL parameters to pass
{
    'containerID'   : 'NewmcAlertConfirm',              // id | default (must refer to html placeholder)
    'dialog'        : 'modal',                          // string, variant 'alert'
    'type'          : 'warning',                        // string, variant: 'info', 'danger', 'success'    
    'color'         : HEXVAL,                           // defaults #222222 ( other values depends by type )
    'bgcolor'       : HEXVAL,                           // default white ( other values depends by type ),    
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


DECLARATION AND USAGE

IN PAGE LOAD ON TOP
CSS STYLE FOR CUSTOMIZATION
<link rel="stylesheet" href="/site/templates/scripts/newmc/NewmcAlertConfirm.css">

IN PAGE LOAD AT BOTTOM OF HTML
PLACEHOLDER (if "id" will be different from "NewmcAlertConfirm" it must be declared into object key:value pair as containerID:'YOUR_PLACEHOLDER_ID' )
<div id="NewmcAlertConfirm" class="newmc-dialog-plugin"></div>

AT SCRIPT BEGIN
LOAD CONSTRUCTOR (THIS FILE)
<script src="/site/templates/scripts/newmc/NewmcAlertConfirm.js"></script>

BASIC USAGE IN PAGE SCRIPT
CALL A NEW CONSTRUCTOR AND PASS TO IT YOUR PARAMETERS (CALL EACH TIME YOU WANT, NO DESTROY NEEDS)
// // CUSTOM ALERT
    var customAlertConfirm = new NewmcAlertConfirm({
        dialog:'alert',
        type: 'danger',
        title: 'Error!',
        body: 'Oooops... Something went wrong',
        icon: 'fa-ban',
    });
// // END CUSTOM ALERT

For more customizations, see defaultOptions

*/

class NewmcAlertConfirm {
    constructor(options) {

        // constructor(options) {
        // Filter type of Modal for colors (as BS Alerts)
        switch (options.type) {
            case 'success':
                options.color = '#155724';
                options.bgcolor = '#d4edda';
                break;
            case 'warning':          
                options.color = '#856404';
                options.bgcolor = '#fff3cd';
                break;
            case 'danger':                
                options.color = '#721c24';
                options.bgcolor = '#f8d7da';
                break;
            case 'info':
                options.color = '#0c5460';
                options.bgcolor = '#d1ecf1';
                break;

        }

        let defaultOptions = {
            'containerID'   : 'NewmcAlertConfirm',              // default placeholder id
            'dialog'        : 'modal',                          // dialog kind (variant: 'alert')
            'type'          : 'default',                        // color scheme (variants: success, warning, alert, info)
            'color'         : '#222222',                        // hex or web name
            'bgcolor'       : 'white',                          // hex or web name
            'icon'          : 'fa-check-circle',                // only icon class (and its transformation class) - fa fa-2x alredy created
            'eID'           : null,                             // id of the element to pass (useful in modal with ok click function)
            'checked'       : true,                             // checked status to pass
            'title'         : 'NewMC Custom Title',             // Could be populated with an ajax return text
            'body'          : 'NewMC Custom Body.',             // Could be populated with an ajax return text
            'action'        : 'Perform NewMC Custom Action?',   // Could be populated with an ajax return text
            'href'          : null,                             // URL for window.reload.href (redirect)
            'hrefDelay'     : 0,                                // milliseconds
            'returnFalse'   : false,                            // return false
            'triggerON'     : true,                             // trigger buttons click
            'cancelText'    : 'Cancel',                         // Default Text for Cancelbutton
            'okText'        : 'OK'                              // Default Text for OKButton            
        };

        options = { ...defaultOptions, ...options };

        // console.info(options);

        let _this = this;

        // function loaded on constructor call in page script
        this.init = function (options) {
            var existClass = document.getElementById(options.containerID).className;
            document.getElementById(options.containerID).className = "newmc-custom-dialog-wrapper";
            if (existClass != '') {
                document.getElementById(options.containerID).className += " " + existClass;
            }
            this.prepareControls(options);

            // Load and show the dialog
            $('#custom-' + options.dialog).modal('show');



            // On OK button click trigger
            if (options.triggerON){
                $('button#' + options.dialog + '-ok' ).on('click', function(){
                    $('#custom-' + options.dialog).modal('hide');
                    
                    if (options.href != null){
                        setTimeout(function() {
                            window.location.href = options.href;
                        }, options.hrefDelay);
                    }
                    
                    if (options.returnFalse){
                        return false;
                    }
                    
                }); 
                // On CANCEL button click trigger
                $('button#' + options.dialog + '-cancel' ).on('click', function(){
                    $('#custom-' + options.dialog).modal('hide');

                    if (options.href != null){
                        setTimeout(function() {
                                window.location.href = options.href;
                        }, options.hrefDelay);
                    }

                    if (options.returnFalse){
                        return false;
                    }

                }); 
            }

        };

        // Building the DOM elements
        this.prepareControls = function (options) {

        let modalFade = document.createElement('div');
            modalFade.setAttribute('class', 'modal fade');
            modalFade.setAttribute('id', 'custom-' + options.dialog);
            modalFade.setAttribute('tabindex', '-1');
            modalFade.setAttribute('role', 'dialog');
            modalFade.setAttribute('aria-labelledby', 'customNewMediaConsultingDialog');
            modalFade.setAttribute('aria-hidden', 'true');

        let modalDialogCenter = document.createElement('div');
            modalDialogCenter.setAttribute('class','modal-dialog modal-dialog-centered');
            modalDialogCenter.setAttribute('role','document');

        let modalContent = document.createElement('div');
            modalContent.setAttribute('class','modal-content');
            modalContent.setAttribute('style','color:' + options.color + ';background-color:' + options.bgcolor);

        let modalHeader = document.createElement('div');
            modalHeader.setAttribute('class','modal-header');
            modalHeader.setAttribute('style','border-bottom: 1px solid ' + options.color);


        let modalTitle = document.createElement('H5');
            modalTitle.setAttribute('class','modal-title');
            modalTitle.setAttribute('id','newmcCustomDialogTitle');
            modalTitle.innerText = options.title;

        let buttonClose = document.createElement('button');
            buttonClose.setAttribute('class','close');
            buttonClose.setAttribute('type','button');
            buttonClose.setAttribute('data-dismiss','modal');
            buttonClose.setAttribute('aria-label','Close');
            buttonClose.innerHTML = '<span aria-hidden="true">&times;</span>';

        let modalBody = document.createElement('div');
            modalBody.setAttribute('class','modal-body');

        let modalBodyContainer = document.createElement('div');
            modalBodyContainer.setAttribute('class','container');

        let modalBodyRow = document.createElement('div');
            modalBodyRow.setAttribute('class','row');

        let modalBodyCol2 = document.createElement('div');
            modalBodyCol2.setAttribute('class','col-2 g-pt-7');

        let modalIcon = document.createElement('i');
            modalIcon.setAttribute('id','modal-icon');
            modalIcon.setAttribute('class','fa fa-2x ' + options.icon);

        let modalBodyCol10 = document.createElement('div');
            modalBodyCol10.setAttribute('class','col-10');
            modalBodyCol10.setAttribute('id','modal-body-text');

        let modalTextBlock = document.createElement('span');
            modalTextBlock.setAttribute('id','modal-text');
            modalTextBlock.setAttribute('class','d-block');
            modalTextBlock.innerText = options.body;;

        let modalActionBlock = document.createElement('span');
            modalActionBlock.setAttribute('id','modal-action');
            modalActionBlock.setAttribute('class','d-block');
            modalActionBlock.innerHTML = '<strong>' + options.action + '</strong>';

        let modalFooter = document.createElement('div');
            modalFooter.setAttribute('class','modal-footer');
            modalFooter.setAttribute('style','border-top: 1px solid ' + options.color);

        let modalButtonCancel = document.createElement('button')
            modalButtonCancel.setAttribute('type','button');
            modalButtonCancel.setAttribute('class','btn btn-secondary');
            modalButtonCancel.setAttribute('id', options.dialog + '-cancel');
            modalButtonCancel.setAttribute('onClick', '');
            modalButtonCancel.setAttribute('data-dismiss','modal');
            modalButtonCancel.innerText = options.cancelText;
            
        let modalButtonOk = document.createElement('button')
            modalButtonOk.setAttribute('type','button');
            modalButtonOk.setAttribute('class','btn btn-primary');
            modalButtonOk.setAttribute('id', options.dialog + '-ok');
            modalButtonOk.innerText = options.okText;



            // APPENDING CHILD IN DOM
            modalFade.appendChild(modalDialogCenter);
            modalDialogCenter.appendChild(modalContent);
            // HEADER
            modalContent.appendChild(modalHeader);
            modalHeader.appendChild(modalTitle);
            modalHeader.appendChild(buttonClose);
            // BODY
            modalContent.appendChild(modalBody);
            modalBody.appendChild(modalBodyContainer);
            modalBodyContainer.appendChild(modalBodyRow);
            modalBodyRow.appendChild(modalBodyCol2);
            modalBodyCol2.appendChild(modalIcon);
            modalBodyRow.appendChild(modalBodyCol10);
            modalBodyCol10.appendChild(modalTextBlock);
            modalBodyCol10.appendChild(modalActionBlock);
            // FOOTER
            modalContent.appendChild(modalFooter);
            modalFooter.appendChild(modalButtonCancel);
            modalFooter.appendChild(modalButtonOk);
			
            // REMOVE PREVIOUS (HIDED) MODALS (AVOID destroy() METHODS)
            $('div#' + options.containerID + ' div[id*=custom-').each(function(){
                if (!$(this).hasClass('show')){
                    $(this).remove();
                }
            });

            // Append wrapper in HTML placeholder
            document.getElementById(options.containerID).append(modalFade);

        };

        // Call the initialization (creates the dialog in browser page)
        this.init(options);

    }

}
