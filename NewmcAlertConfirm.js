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
            'backDrop'      : true,                             // allow backdrop fade behind modal (variant: 'false' = remove backdrop)
            'href'          : null,                             // URL for window.reload.href (redirect)
            'hrefDelay'     : 0,                                // milliseconds
            'timeOutHide'   : null,                             // milliseconds
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
            document.getElementById(options.containerID).classList.add("newmc-custom-dialog-wrapper");
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

            if (options.timeOutHide){
                setTimeout(function() {
                    $('#custom-' + options.dialog).modal('hide');
                    $('.modal-backdrop').remove();
                    if (options.href != null){
                        window.location.href = options.href;
                    }                    
                }, options.timeOutHide);                
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
            var eaches = document.getElementById(options.containerID).querySelectorAll('div[id*=custom-');
            for (var i = 0; i < eaches.length; ++i) {
                eaches[i].remove();
            }
            // Append wrapper in HTML placeholder
            document.getElementById(options.containerID).append(modalFade);
            
            // remove backdrop 
            if(options.backDrop == false){
                document.addEventListener('click', function(e){
                    var target = document.querySelector('div.modal-backdrop.fade.show');
                    if(target){
                        target.remove();
                    }
                });
            }


        };

        // Call the initialization (creates the dialog in browser page)
        this.init(options);

    }

}