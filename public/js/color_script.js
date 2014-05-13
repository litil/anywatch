/*
* Author:      Marco Kuiper (http://www.marcofolio.net/)
*/

$(document).ready(function()
{
	// Variable to set the duration of the animation
	var animationTime = 500;
	
	// Variable to store the colours
	var colours = ["fffebe", "ffee55", "ffc044", "ff872f", "ff2f0d"];



	// Function to colorize the right ratings
	var colourizeRatings = function(nrOfRatings) {
		$("#rating li a").each(function() {
			if($(this).parent().index() <= nrOfRatings) {
				$(this).stop().animate({ backgroundColor : "#" + colours[nrOfRatings] } , animationTime);
			}
		});
	};
	
	// Handle the hover events
	$("#rating li a").hover(function() {
		
		// Empty the rating info box and fade in
		ratingInfobox
			.empty()
			.stop()
			.animate({ opacity : 1 }, animationTime);
		
		// Add the text to the rating info box
		$("<p />")
			.html($(this).html())
			.appendTo(ratingInfobox);
		
		// Call the colourize function with the given index
		colourizeRatings($(this).parent().index());
	}, function() {
		
		// Fade out the rating information box
		ratingInfobox
			.stop()
			.animate({ opacity : 0 }, animationTime);
		
		// Restore all the rating to their original colours
		$("#rating li a").stop().animate({ backgroundColor : "#333" } , animationTime);
	});
	
	// Prevent the click event and show the rating
	$("#rating li a").click(function(e) {
		e.preventDefault();
		alert("You voted on item number " + ($(this).parent().index() + 1));
	});
});