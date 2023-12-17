// This is an intentionaly vulnerable Javascript file used for testing, do not use or deploy it anywhere.
//test
var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get("username1");

document.write("Hello to you!!!!, " + username + "!!!");
