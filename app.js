$(() => {
  // - code here
  $('form').on('submit', (event) => {
    event.preventDefault();
    const userInput = $('input[type="text"]').val();
    let pairedWines = $(event.target).attr('id')
    // - building out the modal
    // - grabbing modal and close button elements
    const $openModal = $('button');
    const $modal = $('.modal');
    const $closeModal = $('.close');

    $.ajax({
      url: `https://api.spoonacular.com/food/wine/pairing?food=${userInput}&apiKey=8d08e6b62869469d8ed4ab6498d5f3ae`,
    }).then(
      (data) => {
        console.log(data);

      const openModal = () => {
        $modal.css('display', 'block');
      }

      const closeModal = () => {
        $modal.css('display', 'none')
      }

      $openModal.on('click', openModal);
      $closeModal.on('click', closeModal);

      // - setting an on click event to open the modal
      // $('button').on('click', () => {
      //   $('modal').style.display = 'flex';
      // })
      // console.log($closeModal);
      //
      // // - setting an on click event to close the modal
      // $('.close').on('click', () => {
      //   $('.modal').style.display = 'none';
      // })
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
      (error) => {
      console.log('hello');
      }
    );
  })
})
