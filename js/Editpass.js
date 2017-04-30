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

                $("#cancle").click(function () {
                    window.location.href = "User.html?id=" + data.Id; 
                });

                $('#edit').click(function(){
                    var datapassword = data.Password;
                    var oldpassword = $("#oldpassword").val();
                    var npassword = $("#npassword").val();
                    var cpassword = $("#cpassword").val();
                    console.log(npassword);
                    if(oldpassword == datapassword) {
                        if (npassword == cpassword) {
                            var newuser = { };
                            newuser.Id = data.Id;
                            newuser.username = data.UserName;
                            newuser.Password = $("#npassword").val();
                            newuser.firstname = data.FirstName;
                            newuser.lastname = data.LastName;
                            newuser.email = data.Email;
                            newuser.tel = data.Tel;

                            var updateUrl = "http://membershipwebapi977290.azurewebsites.net/api/Members/" + data.Id;

                            $.ajax({
                                url: updateUrl,
                                type: 'PUT',
                                data: newuser,
                                success: function(result) {
                                    
                                }
                            });
                            alert('Updated Complete!');
                            window.location.href = "User.html?id=" + data.Id;
                        }else{
                            alert('New Password not match !');
                        }
                    }else{
                        alert('Old Password Wrong !');
                    }
                });

            });
        });
});