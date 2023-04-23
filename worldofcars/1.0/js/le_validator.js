function valForm(form) {

}

//
jq(function () {
	jq('form').submit(function (form) {
		var err = 0;

		if (jq('#first_name').length > 0) {
			if (jq('#first_name').val() == '') {
				jq('#first_name').inputError({ msg: "Please enter your First Name" });
				err++;
			}
		}
		if (jq('#account_id').length > 0) {
			if (jq('#account_id').val() == '') {
				jq('#account_id').inputError({ msg: "Please enter your account ID" });
				err++;
			}
		}
		if (jq('#email').length > 0) {
			if (jq('#email').val() == '') {
				jq('#email').inputError({ msg: "Please enter your e-mail" });
				err++;
			} else if (!jq('#email').validateEmail()) {
				jq('#email').inputError({ msg: "Please enter a valid e-mail" });
				err++;
			}
			/*console.log(jq(jq('#parent_email').val()).checkEmail());*/
		}
		if (jq('#parent_email').length > 0) {
			if (jq('#parent_email').val() == '') {
				jq('#parent_email').inputError({ msg: "Please enter your e-mail" });
				err++;
			} else if (!jq('#parent_email').validateEmail()) {
				jq('#parent_email').inputError({ msg: "Please enter a valid e-mail" });
				err++;
			}
		}
		if (jq('#question').length > 0) {
			if (jq('#question').val() == '') {
				jq('#question').inputError({ msg: "Please enter your question" });
				err++;
			}
		}
		if (jq('#account_username').length > 0) {
			if (jq('#account_username').val() == '') {
				jq('#account_username').inputError({ msg: "Please enter your Account ID" });
				err++;
			}
		}
		if (jq('#account_username').length > 0) {
			if (jq('#account_password').val() == '') {
				jq('#account_password').inputError({ msg: "Please enter your password" });
				err++;
			}
		}
		if (jq('.file').length > 0) {
			jq('.file').each(function () {
				if (jq(this).val()) {
					var fileName = jq(this).val().replace(/^\s|\s$/g, "");
					var ext = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();

					if (jq.inArray(ext, ['jpg', 'gif', 'bmp', 'log', 'txt', 'png']) == -1) {
						jq(this).inputError({
							msg: 'Please upload an accepted file type'
						});
						err++;
					}
				}
			});
		}

		if (err > 0)
			return false;
		else
			return;
		//}
	});
});
jq.fn.inputError = function (options) {
	options = jq.extend({
		msg: "Please fill in this field"
	}, options);
	return this.each(function () {
		var mTop = jq(this).css('margin-top').replace('px', '');
		var pTop = jq(this).css('padding-top').replace('px', '');
		var mBottom = jq(this).css('margin-bottom').replace('px', '');
		var pBottom = jq(this).css('padding-bottom').replace('px', '');
		var elHeight = jq(this).css('height').replace('px', '');
		var wrapHeight = parseInt(mTop) + parseInt(mBottom) + parseInt(pTop) + parseInt(pBottom) + parseInt(elHeight);
		var wrapper = jq('<div class="form_el">').css({ 'height': wrapHeight + 'px' });
		if (jq(this).parent('.form_el').length <= 0)
			jq(this).wrap(wrapper);

		if (jq(this).parent().find('.error_msg').length <= 0)
			jq(this).parent().append('<div class="error_msg">* ' + options.msg + '</div>');
		//		var errorY = parseInt(pTop) + parseInt(pBottom) + parseInt(elHeight);
		var errorY = parseInt(pTop) + parseInt(pBottom) + parseInt(elHeight);
		jq(this).parent().find(".error_msg").css({ 'top': errorY + 'px' });
		jq(this).focus(function () {
			jq(this).parent().find(".error_msg").fadeOut("slow", function () { jq(this).remove() })
		});
	});
}

jq.fn.validateEmail = function () {
	var regEx = new RegExp(/^([0-9a-z\-._!$^*()|{}[\]"'?])+@([-0-9a-z]+[.])+([a-z]{2,6})$/i);
	return regEx.test(this.val());
}
/*
jq.fn.checkEmail = function() {
	// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
	//return this.each(function(){ /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(this)
//	});

	return false;
}
*/