//Initial array of movies
var tvShows = ["The Walking Dead", "Bob's Burgers", "Rick and Morty", "Breaking Bad", "Family Guy", "The Office", "Parks and Recreation", "Modern Family", "Seinfeld", "It's Always Sunny in Philadelphia"];

//Function to display gifs
function displayShowInfo() {
    //Start with an empty gifs div
    $("#tvShowsGifDiv").empty();
    
    //Assign the data-name value of the button clicked to the variable 'show'
    var show = $(this).attr("data-name");
    //Assign the giphy api URL to the variable 'queryURL'
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=dc6zaTOxFJmzC&limit=10";
    //AJAX call to query the gihpy api using the 'queryURL' variable, and run the following function when data is returned...
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        //Assign the results of the query to 'results' variable
        var results = response.data;

        //For loop to create gifs...
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='gifDiv'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var showImage = $("<img>");
            showImage.attr("src", results[i].images.fixed_height_still.url);
            showImage.attr("data-still", results[i].images.fixed_height_still.url);
            showImage.attr("data-animate", results[i].images.fixed_height.url);
            showImage.attr("data-state", "still");
            showImage.attr("class", "gif");

            gifDiv.prepend(p);
            gifDiv.prepend(showImage);

            $("#tvShowsGifDiv").prepend(gifDiv);

        };
    });
};

//Function to play/pause gifs
function changeStateOfGif() {

    var state = $(this).attr('data-state');

    if (state === 'still') {

        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate')
    
    } else {
    
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still')
    
    };
};

//Function to create tvShow buttons
function renderButtons() {

    // Deleting the all buttons prior to adding new buttons
    $("#tvShowButtonsDiv").empty();

    // Looping through the array of shows
    for (var i = 0; i < tvShows.length; i++) {

        // Then dynamicaly generating buttons for each show in the array
        var a = $("<button>");
        // Adding a class of show to our button
        a.addClass("btn btn-dark tvShowButton");
        // Adding a data-attribute
        a.attr("data-name", tvShows[i]);
        // Providing the initial button text
        a.text(tvShows[i]);
        // Adding the button to the tvShowButtons div
        $("#tvShowButtonsDiv").append(a);

    };
};

// Function to add new tvShow buttons to the exisiting list of buttons
$("#tvShowAdd").on("click", function (event) {

    event.preventDefault();
    // This line grabs the input from the textbox
    var newShow = $("#tvShowInput").val().trim();

    // Adding newShow from the textbox to our array
    tvShows.push(newShow);

    // Calling renderButtons which repopulates the tvShows array as buttons (including new button)
    renderButtons();

    $("#tvShowInput").val('');
});

//Adding a click event listener to call displayShowInfo function when an element with a class of 'tvShowButton' is clicked
$(document).on("click", ".tvShowButton", displayShowInfo);
//Adding a click event listener to call changeStateOfGif function when an element with a class of 'gif' is clicked
$(document).on("click", ".gif", changeStateOfGif);
//Call the renderButtons function to create initial buttons
renderButtons();