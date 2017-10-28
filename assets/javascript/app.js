//Initial array of movies
var tvShows = ["The Walking Dead", "Bob's Burgers", "Rick and Morty", "Breaking Bad", "Family Guy", "The Office", "Parks and Recreation", "Modern Family", "Seinfeld", "It's Always Sunny in Philadelphia"];

function displayShowInfo() {

    $("#tvShowsGifDiv").empty();

    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        var results = response.data;

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

        }

    });
};

function changeStateOfGif() {

    var state = $(this).attr('data-state');

    if (state === 'still') {

        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate')
    
    } else {
    
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still')
    
    };

    console.log($(this).attr('src'));

};

function renderButtons() {

    // Deleting the all buttons prior to adding new buttons
    // (this is necessary otherwise you will have repeat buttons)
    $("#tvShowButtonsDiv").empty();

    // Looping through the array of movies
    for (var i = 0; i < tvShows.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("tvShowButton");
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

// Adding a click event listener to all elements with a class of "movie"
$(document).on("click", ".tvShowButton", displayShowInfo);

$(document).on("click", ".gif", changeStateOfGif);

renderButtons();