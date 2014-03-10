/*global BranzSurvey */

var branzSurvey = {};

$(function() {
    "use strict";
    
	var formUrls = new Array(
		"https://branz.tripdocs.net/survey/form1.html",
		"https://branz.tripdocs.net/survey/form2.html",
		"https://branz.tripdocs.net/survey/form3.html"
	);

    branzSurvey = new BranzSurvey();
    branzSurvey.render(formUrls);
});