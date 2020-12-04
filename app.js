$(() => {
  // - code here
  $('form').on('submit', (event) => {
    event.preventDefault();
    const userInput = $('input[type="text"]').val();
    let pairedWines = $(event.target).attr('id')
    $.ajax({
      url: `https://api.spoonacular.com/food/wine/pairing?food=${userInput}&apiKey=8d08e6b62869469d8ed4ab6498d5f3ae`,
    }).then(
      (data) => {
        console.log(data);
        let $error = $('<div>').text(data.message).appendTo('dl')

        $('.wines')
        .html(data.pairedWines);

        $('.text')
        .html(data.pairingText);

        $('.title')
        .html(data.productMatches['0']['title']);

        $('.description')
        .html(data.productMatches['0']['description']);

        $('.imageUrl')
        .attr('src', data.productMatches['0']['imageUrl']);

        $('.price')
        .html(data.productMatches['0']['price']);

        $('.link')
        .attr('href', data.productMatches['0']['link'])
        .text('link')
        .attr('target', '_blank');


      },
      (error) => {
      console.log('hello');
      }
    );
  })
})
