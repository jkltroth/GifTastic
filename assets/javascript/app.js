//Initial array of movies
var tvShows = ["The Walking Dead", "Bob's Burgers", "Rick and Morty", "Breaking Bad", "Family Guy", "The Office", "Parks and Recreation", "Modern Family", "Seinfeld", "It's Always Sunny in Philadelphia"];

function renderButtons() {

    // Deleting the all buttons prior to adding new buttons
    // (this is necessary otherwise you will have repeat buttons)
    $("#tvShowButtons").empty();

    // Looping through the array of movies
    for (var i = 0; i < tvShows.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("tvShow");
        // Adding a data-attribute
        a.attr("data-name", tvShows[i]);
        // Providing the initial button text
        a.text(tvShows[i]);
        // Adding the button to the tvShowButtons div
        $("#tvShowButtons").append(a);

    };
};

renderButtons();