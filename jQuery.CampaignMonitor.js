// Campaign Monitor jQuery plugin
// Chris @ Anywhichway 2010
//
// usage $(form).campaignMonitor(), where form is the signup form


jQuery.fn.campaignMonitorSignup = function(options) {
	var defaults = {
			callbacks: {
				success: function(){},
				failure: function(){},
				invalidEmail: function(){}
			},
			proxy: "" // URL to a serverside script. We need this to get around XSS.
		},
		options = $.extend({}, defaults, options),
		isValidEmail = function(emailFieldValue) {
			// Validate email address with regex
			var pattern = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return pattern.test(emailFieldValue);
		};

	return $(this).submit(
		function(event) {

			var url = this.action,
				$form = $(this),
				address = $(":text", $form).get(0).val(); // This needs to be more specific

			if (!isValidEmail(address)) {
				options.callbacks.invalidEmail();
				return false;
			}

			$.post(
				options.proxy,
				{
					url: url + "?" + $form.serialize()
				},
				function(data) {
					/*
					if (data.search(/invalid/i) === -1) {
						options.callbacks.success();
					} else {
						options.callbacks.failure();
					}
					*/
					options.callbacks[data.search(/invalid/i) === -1 ? "success" : "failure"](); // untested
				},
				"html"
			);

			return false;

		}
	);

};