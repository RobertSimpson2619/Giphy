$(document).ready(function(){

var topics = ["Frog","Cat","Dog","Turtle","Fox","Whale","Shark","Lion"];
var queryURL;
var keyWord;
var apiKey = "&api+key=dc6zaTOxFJmzC";



function createButtons(){
	$("#userButtons").empty();
	for(var i =0; i<topics.length; i++){

		$("#userButtons").append("<button class = 'btn btn-primary topics' style = 'margin: 5px;'> " + topics[i] + " </button>")

	}
}

createButtons();

$(".submitButton").on("click",function(){
	
	var loggedResponse = $("#userInput").val();
	console.log(loggedResponse);
	topics.push(loggedResponse);
	createButtons();

});


$(".topics").on("click", function(){


	keyWord = $(this).html();
	console.log(keyWord);
	queryURL = "http://api.giphy.com/v1/gifs/search?q=" + keyWord + apiKey;
	console.log(queryURL);


	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response){

			$("#Gifs").empty();
		 var results = response.data;


          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item col-md-4 col-md-offset-1'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

           var personImage = $("<img>");

            personImage.attr("src", results[i].images.original_still.url);
            personImage.attr("data-still", results[i].images.original_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-state", "still");
            personImage.attr("id", "gifImages");
						// console.log(personImage);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);
 
            $("#Gifs").prepend(gifDiv);
		}

		$("#gifImages").on("click",function(){
		console.log("test");
		var state = $(this).attr("data-state");
		console.log(this);
		console.log(state);
		 if(state === "still"){
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
				}
				if(state != "still"){
				 $(this).attr("src", $(this).attr("data-still"));
				 $(this).attr("data-state","still");
				}
	})

	});


	

});



})

