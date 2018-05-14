var chatbotTools = window.chatbotTools || {};

(function uploaderScopeWrapper($){
    let authtoken;
    let urlPost = "https://atvjafo94j.execute-api.us-east-1.amazonaws.com/test1/{proxy+}"

    chatbotTools.authToken.then(function setAuthToken(token){
        if(token){
            authtoken = token;
        }
        else{
            //alert('no auth token');
            //window.location.href = '/';
        }
    }).catch( function handleTokenError(error) {
        console.log("error");
        //window.location.href = '/';
    });
    
    $(function onDocReady(){
        $('#signOut').click(function(){
            chatbotTools.signOut();
            authtoken = "";
            //window.location = "index.html";
        });

        $("#uploadForm").submit(function(e){
            e.preventDefault();
            console.log(authtoken);
            
            //let fileData = $('#uploadForm');
            //console.log(fileData);

            let img = $("#imageOrVideoFile");
            console.log(img[0].files[0] );
            let formdata = new FormData();
            formdata.append('file', img[0].files[0], img[0].files[0].name);
            
            /*
            if(fileData.length == 0 || fileData.length >=2){
                $('#upload_response').html("<p>File upload error</p>");
            }*/
            
            $.ajax({
                method: 'POST', 
                url: urlPost,
                processData: false,
                data: formdata,
                headers:{
                   
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS, POST',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                accepts:{
                    "content-type" : "application.json"
                },
                success: completeRequest,
                error: function ajaxError(jqXHR, errorThrown) {
                    console.error('Error uploading, Details: ', errorThrown);
                    console.error('Response: ', jqXHR.responseText);
                    alert('An error occured:\n' + jqXHR.responseText);
                }
            });
        })
        
    });

    function completeRequest(result){
        console.log("success: result " + JSON.stringify(result));
    }
}(jQuery));

/***
 * 
 * headers:{
                    Authorization : authtoken
                }
 */
