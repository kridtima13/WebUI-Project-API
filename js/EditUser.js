
$(document).ready(function() {

        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results[1] || 0;
        }
        $(function() {
            var id = $.urlParam('id');
            var url = "http://membershipwebapi977290.azurewebsites.net/api/Members/" + id;
            console.log(url);
            $.get(url, function(data, status) {
                console.log(data);
                $('.username').html(data.UserName);
                $('.fname').html(data.UserName);
                
                $('#username').val(data.UserName);
                // $('#password').val(data.Password);
                $('#fname').val(data.FirstName);
                $('#lname').val(data.LastName);
                $('#email').val(data.Email);
                $('#tel').val(data.Tel);

                $("#cancle").click(function () {
                    window.location.href = "User.html?id=" + data.Id; 
                });

                $("#update").click(function () {
                    //Set update data to newuser object
                    var newuser = { };
                    newuser.Id = data.Id;
                    newuser.username = $("#username").val();
                    newuser.password = data.Password;
                    newuser.firstname = $("#fname").val();
                    newuser.lastname = $("#lname").val();
                    newuser.email = $("#email").val();
                    newuser.tel = $("#tel").val();

                    //Creat a url for update member data
                    var updateUrl = "http://membershipwebapi977290.azurewebsites.net/api/Members/" + data.Id;

                    //Call Web Api with method PUT for updating
                    $.ajax({
                        url: updateUrl,
                        type: 'PUT',
                        data: newuser,
                        success: function(result) {
                            alert('Updated Complete!');
                            window.location.href = "User.html?id=" + data.Id;
                        }
                    });                    
                });
            });

        });
});