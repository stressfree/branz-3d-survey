/*exported BranzSurvey */
/*jshint scripturl:true*/

function BranzSurvey() {
    "use strict";
    
    // *** Private variables ***/

    // The element to render the form into.
    var __element = 'div.content';
    
    // *** Private functions ***/
    
	function __randomIntFromInterval(min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}

    // Load the Google Form and populate the div.
    function __renderForm(formUrls) {
    
		// Check if a valid array submitted - if not do nothing
		if (formUrls.length === 0) {
			return false;
		}

		// Check to see if a browser cookie has been set.
		var number = $.cookie('3d-survey-counter');
		
		if (number === undefined) {
			// Pick a random item between the first and last items of the array.
			number = __randomIntFromInterval(0, formUrls.length - 1);
			$.cookie('3d-survey-counter', number, { expires: 365 });
		}

		var formUrl = formUrls[number];

        if (__validateUrl(formUrl)) {
            $(__element).load(formUrl + " div.ss-form-container", function() {
				$('form#ss-form').on("submit", function(e) {
					var reqCount = 0;
					
					$('div.ss-item-required').each(function() {
						var item = this;
						
						$(item).removeClass('ss-not-supplied');
						
						if ($('input.ss-q-radio:checked', this).length === 0) {
							$(item).addClass('ss-not-supplied');
							reqCount++;
							
							if (reqCount === 1) {
								$('html, body').animate({
									scrollTop: $(item).offset().top
								}, 1500);
							}
						}
					});
					
					if (reqCount > 0) {
						e.preventDefault();
					}
				});
            });
        }
    }

    // Check the supplied string to see if it is a valid URL.
    function __validateUrl(url) {
        var validUrl = false;

        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        
        if(pattern.test(url)) {
            validUrl = true;
        }
        return validUrl;
    }
    
    /*** Public functions ***/
    
    return {
        
        setElement: function(element) {
            __element = element;
        },
        
        render: function(formUrls) {            
            __renderForm(formUrls);
        }
    };
}