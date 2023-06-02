// ajax callback function
    function ajaxreturn(data) {
        if (data.result == "error") {

            // SIMPLE JS ALERT
            // alert(data.message)

            // // THIS CUSTOM ALERT
            var customAlertConfirm = new NewmcAlertConfirm({
                    dialog          : 'alert',
                    'eID'           : null,
                    'checked'       : null,
                    'type'          : 'warning',
                    'title'         : 'Error',
                    'icon'          : 'fa-ban',
                    'body'          : data.message, // ajax data returned
                    'action'        : '',
                    'returnFalse'   : true
                });          
            // END CUSTOM ALERT            


        } else if (data.result == "ok"){

            setTimeout(function() {
  
                // SIMPLE JS ALERT
                // alert(data.message);

                // // CUSTOM ALERT
                var customAlertConfirm = new NewmcAlertConfirm({
                        dialog          : 'alert',
                        'eID'           : null,
                        'checked'       : null,
                        'type'          : 'success',
                        'title'         : 'Done!',
                        'icon'          : 'fa-check-circle',
                        'body'          : data.message, // ajax data returned
                        'action'        : '',
                        'href'          : location.reload(), // reload page 
                        'returnFalse'   : true // like event.preventDefault() to reload page only on OK click
                    });
                // END CUSTOM ALERT 

            }, 500);
      
        }
    }
