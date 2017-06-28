function youtube_request() {
  var search_input = $('input[type="text"]').val();
  var keyword= encodeURIComponent(search_input);
  // Youtube API
  var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=5&v=2&alt=jsonc';

  $.ajax({
    type: "GET",
    url: yt_url,
    dataType:"jsonp",
    success: function(response) {

    if(response.data.items) {
      var html = '';
      $.each(response.data.items, function(i,data) {
        var video_id=data.id;
        var video_title=data.title;
        var video_viewCount=data.viewCount;

        // IFRAME Embed for YouTube
        video_frame="<iframe width='500' height='300' src='http://www.youtube.com/embed/"+video_id+"' frameborder='0' type='text/html'></iframe>";

        html +="<div class='video-wrapper'><div id='title'>"+video_title+"</div><div>"+video_frame+"</div><div id='count'>"+video_viewCount+" Views</div></div>";


      });
      $("#result").html(html); // Result
    } else {
      $("#result").html("<div id='no'>No Video</div>");
    }
  }
  });
}
$(document).ready(function() {

  // if click on submit button, get youtube videos
  $(".search").click(function(e) {
    e.preventDefault();
    youtube_request();
  });

  // if use enter in text field, get youtube videos
  $('.search_input').keyup(function(e){
      if(e.keyCode == 13) {
          e.preventDefault();
          youtube_request();
      }
  });
});