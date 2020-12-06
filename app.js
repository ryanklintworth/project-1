$(() => {
  // - code here
  $('form').on('submit', (event) => {
    event.preventDefault();
    const userInput = $('input[type="text"]').val();
    let pairedWines = $(event.target).attr('id')

    // - building out the modal
    // - grabbing modal and close button elements
    const $openModal = $('#openModal');
    const $modal = $('.modal');
    const $closeModal = $('.close');

    // - grabbing wine pairing information from www.spoonacular.com API
    $.ajax({
      url: `https://api.spoonacular.com/food/wine/pairing?food=${userInput}&apiKey=8d08e6b62869469d8ed4ab6498d5f3ae`,
    }).then(
      (data) => {
        console.log(data);

      // - Event handlers
      const openModal = () => {
        $modal.css('display', 'block');
      }

      const closeModal = () => {
        $modal.css('display', 'none')
      }

      // - Event listeners
      // - setting an on click event to open/close the modal
      $openModal.on('click', openModal);
      $closeModal.on('click', closeModal);

      // - if someone types in something not in the API, error data will display
      // let $error = $('<div>').text(data.message).appendTo('dl')
      // $('.wines')

      //   .html(data.pairedWines['0'] + ' ' + data.pairedWines['1'] + ' ' +  data.pairedWines['2']);

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
      // - log any errors to the page
      (error) => {
      console.log('hello');
      }
    );
  })
})
