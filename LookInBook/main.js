$(document).ready(initializeApp);


//global variables
var outside;

function initializeApp(){
    newYorkTimesAjax();
}

async function newYorkTimesAjax (){
    var newYorkTimesParams = {
      url: "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?",
      method: 'GET',
      data: {
        'api-key': "EAJZJKpUWUaaG7GFAfAd00tnyinAFTIl"
      },
      success: newYorkTimesAjaxSuccessful,
      error: newYorkTimesAjaxError,
    }
    await $.ajax( newYorkTimesParams );
}

function newYorkTimesAjaxSuccessful(responseData){
    console.log('success');
    // for(i=0; i<responseData.results.books.length; i++){
    //     $('#bookRow').append('<div id="' + responseData.results.books[i].rank + '">').append(responseData.results.books[i].title);
    // }
    console.log(responseData);
    retrieveBookInfo(responseData);

}

function newYorkTimesAjaxError(){
    console.log('error');
}

async function retrieveBookInfo(responseData){
    for(i=0; i < responseData.results.books.length; i++){
        let googleBooksCall = {
            url: 'https://www.googleapis.com/books/v1/volumes?',
            method: 'GET',
            data: {
                'api-key': 'AIzaSyAi_F1l9eRkXcRtV1NBCJAnFqwXV-ZtTu0',
                'q': responseData.results.books[i].primary_isbn13,
                'maxResults': 1,
                'orderBy': 'relevance',
                'showPreorders': false,
            },
            success: googleBooksAjaxSuccessful,
            error: googleBooksAjaxError,
        }
        await $.ajax(googleBooksCall);        
    }
}

function googleBooksAjaxSuccessful(responseData){
    console.log('success');
    console.log(responseData);
    let image = responseData.items[0].volumeInfo.imageLinks.thumbnail;
    $('#bookRow').append("<img src ='" + image + "'>")
}

function googleBooksAjaxError(){
    console.log('error');
}
