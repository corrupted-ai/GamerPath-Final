$(".loginform").validate({
	rules : {
		loginemail : {
			required : true,
			email : true
		},
		loginpassword : {
			required : true
		},
	},
	messages : {
		loginemail : {
			required : "Email is required",
			email : "Email should be in valid format"
		},
		loginpassword : {
			required : "Password is mandatory"
		},
	},
	errorElement : 'div',
	errorPlacement : function(error, element) {
		var placement = $(element).data('error');
		if (placement) {
			$(placement).append(error)
		} else {
			error.insertAfter(element);
		}
	}
});


$(".signupform").validate({
	rules: {
		name: { required: true},
		email: { required: true, email: true },
		phone: { required: true ,digits:true},
		password: { required: true },
		confirmpassword: { required: true, equalTo: "#idpassword" }
	},
	messages: {
		name: { required: "Name is required"},
		email: {  required: "Email is required", email: "Email should be in correct format" },
		phone: { required: "Phone is required"},
		password: { required: "Password is mandatory" },
		confirmpassword: { required: "Password confirmation is mandatory", equalTo: "Passwords do not match"  }
	},
	errorElement: 'div',
	errorPlacement: function (error, element) {
		var placement = $(element).data('error');
		if (placement) {
			$(placement).append(error)
		} else {
			error.insertAfter(element);
		}
	}
});