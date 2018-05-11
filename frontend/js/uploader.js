var chatbotTools = window.chatbotTools || {};

(function uploaderScopeWrapper($){
    let authtoken;

    chatbotTools.authToken.then(function setAuthToken(token){
        if(token){
            authtoken = token;
        }
        else{
            alert('no auth token');
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
        $("#upload").click(function(e){
            e.preventDefault();
            console.log(authtoken);
            
            $.ajax({
                method: 'GET', 
                url: ' https://gbb8xz2947.execute-api.us-east-1.amazonaws.com/testing_Cognito',
                headers:{
                    Authorization : authtoken
                },
                data: "hello: hello",
                contentType: 'application/json',
                success: completeRequest,
                error: function ajaxError(jqXHR, errorThrown) {
                    console.error('Error uploading, Details: ', errorThrown);
                    console.error('Response: ', jqXHR.responseText);
                    alert('An error occured:\n' + jqXHR.responseText);
                }
            });
        });
    });

    function completeRequest(result){
        console.log("success: result " + JSON.stringify(result));
    }
}(jQuery));
