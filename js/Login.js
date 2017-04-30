 $.validator.setDefaults({
    submitHandler: function() {}
});
$.validator.methods.equal = function(value, element, param) {
    return value == param;
};
 $('form').validate({
        rules: {
            username: {
                minlength: 3,
                maxlength: 15,
                required: true
            },
            password: {
                minlength: 3,
                maxlength: 15,
                required: true
            }
        },
        messages: {
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
$("#signin").click(function() {
    var url = "http://membershipwebapi977290.azurewebsites.net/api/Members/signin?";
    url += "username=" + $("#username").val();
    url += "&password=" + $("#password").val();
    console.log(url);
    $.get(url, function(data, status) {
        console.log(data);
        if (data.Status == true) {
            console.log(url);
            
            setTimeout(window.location.href = "User.html?id=" + data.CurrentUser.Id, 30000);
        } else {
            $("#err").show();
        }
    });
});
