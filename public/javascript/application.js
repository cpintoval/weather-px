// App handlers
var handlers = {
  autocomplete: function(query) {
    console.log($('#place').val().length);
    // console.log(availableTags.length);
    if ($('#place').val().length > 0) {
      $.ajax ({
        url: "http://autocomplete.wunderground.com/aq",
        dataType: 'jsonp',
        jsonp: 'cb',
        data: {
          format: 'json',
          query: $('#place').val()
        },
        success: handlers.processResults
      });
    }
    else {
      var table = $('#places').find('tbody').empty();
    }
  },

  searchPlace: function(event) {
    // event.preventDefault();
    console.log("Query: " + $('#place').val());
    $.ajax ({
      url: "http://autocomplete.wunderground.com/aq",
      dataType: 'jsonp',
      jsonp: 'cb',
      data: {
        format: 'json',
        query: $('#place').val()
      },
      success: handlers.processResults
    });
  },

  processResults: function(data) {
    // availableTags = [];
    var table = $('#places').find('tbody').empty();
    var i;
    for (i in data.RESULTS) {
      var place = data.RESULTS[i];
      var tr = $('<tr>').appendTo(table);
      $('<td>').text(place.name).appendTo(tr);
      // availableTags.push(place.name);
    }
  }

};

// Document ready
$(function() {
  $('.search').on('keypress', '#place', handlers.autocomplete);
  $('.search').on('click', '#search', handlers.searchPlace);
});
