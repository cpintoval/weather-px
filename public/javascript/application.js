// App handlers
var handlers = {
  autocomplete: function(query) {
    if ($('#place').val().length > 4) {
      $.ajax ({
        url: "http://autocomplete.wunderground.com/aq",
        dataType: 'jsonp',
        jsonp: 'cb',
        data: {
          format: 'json',
          query: $('#place').val()
        },
        success: handlers.processAutocomplete
      });
    }
    else {
      // var table = $('#places').find('tbody').empty();
      var $dataList = $('#json-datalist').empty();
    }
  },

  processAutocomplete: function(data) {
    var $dataList = $('#json-datalist').empty();
    var i;
    for (i in data.RESULTS) {
      var place = data.RESULTS[i];
      // var $option = $('<option>').text(place.name).data('l', place.l, 'll', place.ll);
      var option = '<option id="' + place.l + '">' + place.name + '</option>'
      // $option.appendTo($dataList);
      $dataList.append(option);
    }
  },

  searchPlace: function(event) {
    event.preventDefault();
    var value = $('#place').val();
    var id = $('#json-datalist').find('option').filter(function() { return $.trim( $(this).text() ) === value; }).attr('id');
    var link = "http://api.wunderground.com/api/ae1b201dc653f8ca/conditions" + id + ".json";
    console.log(link);
    // $.ajax({
    //   url: link,
    //   dataType: 'json',
    //   jsonp: 'cb',
    //   data: {
    //     format: 'json'
    //   },
    //   success: handlers.processSearch
    // });
    $.getJSON(link, handlers.processSearch);
  },

  processSearch: function(data) {
    console.log(data.current_observation.display_location);
  }

};

// Document ready
$(function() {
  $('.search').on('keypress', '#place', handlers.autocomplete);
  $('.search').on('click', '#search', handlers.searchPlace);
});
