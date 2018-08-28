$(document).ready(function() {
  $('.tabs').tabs();
  showView(0);
});
//Running steem method on document ready when script tag initialized.
//There is not a need for document.ready funcion but you can use them for practice.
function showView(val) {
  switch (val) {
    case 0:
      steem.api.getDiscussionsByTrending({
        "tag": "steemit",
        "limit": 10
      }, function(err, result) {
        setValues(err, result);
      });
      break;

    case 1:
      steem.api.getDiscussionsByCreated({
        "tag": "steemit",
        "limit": 10
      }, function(err, result) {
        setValues(err, result);
      });
      break;

    case 2:
      steem.api.getDiscussionsByHot({
        "tag": "steemit",
        "limit": 10
      }, function(err, result) {
        setValues(err, result);
      });
      break;

    case 3:
      steem.api.getDiscussionsByPromoted({
        "tag": "steemit",
        "limit": 10
      }, function(err, result) {
        setValues(err, result);
      });
      break;
  }
}

function setValues(err, result) {
  $('.collection').empty();
  for (i = 0; i < result.length; i++) {
    //Looking for image, if existed then use the first of the post and if not then the use defined image.
    let imageUrl = JSON.parse(result[i].json_metadata);
    let image = "https://48tools.com/wp-content/uploads/2015/09/shortlink.png";
    if (imageUrl.hasOwnProperty('image')) {
      console.log("Has property image");
      if (imageUrl.image[0] !== "") {
        image = imageUrl.image[0];
      } else {
        image = "https://48tools.com/wp-content/uploads/2015/09/shortlink.png";
      }
    }
    // Replace if any html tag occur in post
    let bodyContent = result[i].body;
    let prefined = bodyContent.replace(/(<([^>]+)>)/ig, "");
    //Append <ul> tag body with proper steem post image, title and description.
    $(".collection").append("<li class='collection-item avatar'> \
    <a href='http://steemit.com" + result[i].url + "' style='color: inherit;'> \
    <img src='" + image + "' alt='' class='circle'> \
    <span class='title' style='font-weight:bold;'>" + result[i].root_title + "</span> \
    <p class='truncate'>" + prefined + "</p> \
    </a> \
    </br>\
  </li>");
  }
}
