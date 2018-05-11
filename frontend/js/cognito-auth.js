
var chatbotTools = window.chatbotTools || {};

(function scopeWrapper($){

    let poolData = { 
        UserPoolId : _config.cognito.userPoolId,
        ClientId :   _config.cognito.userPoolClientId
    };

    let userPool; 
    
    if ( !(_config.cognito.userPoolId &&
            _config.cognito.userPoolClientId &&
            _config.cognito.region)) {
        alert("no Cognito");
        return;
    }

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    /*
    if( typeof AWSCognito !== 'undefined' ){
        AWSCognito.config.region = _config.cognito.region;
    }
    */

    chatbotTools.signOut = function signOut(){
        userPool.getCurrentUser().signOut();
    }

    

    chatbotTools.authToken =  new Promise(function fecthCurrentAuthToken(resolve, reject){
        let cognitoUser = userPool.getCurrentUser();

        if(cognitoUser){
            cognitoUser.getSession(function sessionCallback(err, session){
                if(err){
                    console.log("cognitoUser err " + JSON.stringify(err));
                    reject(err);
                }
                else if(!session.isValid()){
                    resolve(null);
                }
                else{
                    resolve(session.getIdToken().getJwtToken());
                }
                
            });
        }else{
            resolve(null);
        }
    });

    
    /*
    Cognito User Pool Functions
    */

    function signin(email, password, onSuccess, onFailure){
        console.log(email);
        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            //Username: toUsername(email),
            Username: email,
            Password: password
        });

        let cognitoUser = createCognitoUser(email);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: onSuccess,
            onFailure: onFailure,
            newPasswordRequired:(userAttributes, requireAttributes) => {
                if( $("#modal") ){
                    $("#modal").css({"display":"block"});
                    $("#nPasswordButton").click(function(){
                        let newPassword = $("#nPassword").val()
                        let attributesData = requireAttributes;
                        console.log(userAttributes);
                        console.log(requireAttributes);
                        cognitoUser.completeNewPasswordChallenge(newPassword, attributesData, {
                            onSuccess: function(result){
                                currentUser = result;
                                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                                window.location.assign("/uploader.html");
                            },
                            onFailure: function(err){
                                $('#modalerror').html(err.message);
                            }
                        });
                    
                    });
                    $("#canceldButton").click(function(){
                        closeModal();
                    });
                }
            }


        });
    }
    /* Fotgot Password Flow not working
    function forgotPasswordFlow(email, newPassword, code, onSucess, onFailure){
        let cognitoUser = email;
        cognitoUser.forgotConfirmPassword({
            onSuccess: function (result) {
                console.log('call result: ' + result);
            },
            onFailure: function(err) {
                alert(err);
            },
            inputVerificationCode() {
                var verificationCode = prompt('Please input verification code ' ,'');
                var newPassword = prompt('Enter new password ' ,'');
                cognitoUser.confirmPassword(verificationCode, newPassword, this);
            }
        });
    }*/

    
    function createCognitoUser(email) {
        return new AmazonCognitoIdentity.CognitoUser({
            //Username: toUsername(email),
            Username : email,
            Pool: userPool
        });
    }

    function toUsername(email){
        return email.replace('@', '-at-');
        
    }

    $( document ).ready(function(){
        $('#signinForm').submit(handleSignin);
        //$('#verifyForm').submit(handleForgotPassword);
    });

    if($('#close')[0] ){
        $("#close")[0].onclick = function(){
            $('#errormessage').html("");
            closeModal();
        }
        $("#canceldButton").click(function(){
            closeModal();
        });
    }

    function handleSignin(event){
        let email = $('#emailInputSignin').val();
        let password = $('#passwordInputSignin').val();
        event.preventDefault();
        signin(email, password, 
            function signinSuccess(){
                console.log('Successfully, Logged In');
                window.location.href=('uploader.html');
                
            }, function signinError(err){
                $('#errormessage').html("Error: " + err.message);
                email = ""
                password = ""
                $('#passwordInputSignin').val("");
                if(err.code == "PasswordResetRequiredException"){
                    console.log("PasswordResetRequiredException");
                }
                console.log(err);
            }
        );
    }
    /* Forgot password flow not working
    function handleForgotPassword(event){
        let forgotemail = $("#forgotemail").val();
        let forgotPassword = $("#forgotPassword").val();
        let code = $("#codeInputVerify").val();
        event.preventDefault();
        forgotPasswordFlow(forgotEmail, forgotPassword, code);
            
    }
    */

   

    function closeModal(){
        if( $("#modal") ){
            $("#modal").css({"display":"none"});
        }
    }

}(jQuery));