$(() => {
  // - code here

	// - building out the modal
	// - grabbing modal and close button elements
	const $modal = $('.modal');
	const $closeModal = $('.close');

	// - event handlers
	const closeModal = () => {
		$modal.css('display', 'none');

		// - initialize values to empty strings
    // - I've found this to reset the modal so that an error response doesn't show on top of other information
		$('.status').html('');
		$('.text').html('');
		$('.title').html('');
		$('.description').html('');
		$('.imageUrl').attr('src', '');
		$('.price').html('');
		$('.link').attr('href','').text('');
    $('#food').val('');
	}
	// - event listeners
	// - setting an on click event to close the modal
	$closeModal.on('click', closeModal);

	// - on submit event listener for the form
  // - this allows the user to use the AJAX request
  	$('form').on('submit', (event) => {
      // - the event continues to propogate as usual
    	event.preventDefault();
    	const userInput = $('input[type="text"]').val();
    	let pairedWines = $(event.target).attr('id');
      $('#preLoader').css('display', 'block'); // - create a preLoader

		// - grabbing wine pairing information from www.spoonacular.com API
		$.ajax({
		  	url: `https://api.spoonacular.com/food/wine/pairing?food=${userInput}&apiKey=8d08e6b62869469d8ed4ab6498d5f3ae`,
		}).then(
			(data) => {
        console.log(data);

        // - if/else statement to show error information inside the modal if API does not have wine information for user input
				if ('status' in data) {
					if (data.status == 'failure') {
						$('.status').html(data.message).css('display', 'block'); // - show status div
					} else {
						console.log(data); // - log API info
					}
				}
				else {
          
          // - the preLoader and information displays after userInput
          $('#preLoader').css('display', 'none'); // - close preLoader
					$('.status').html('').css('display', 'none'); // - hide error div

          // - userInput populates the different objects below
					$('.text').html(data.pairingText);
					$('.title').html(data.productMatches['0']['title']);
					$('.description').html(data.productMatches['0']['description']);
					$('.imageUrl').attr('src', data.productMatches['0']['imageUrl']);
					$('.price').html(data.productMatches['0']['price']);
					$('.link').attr('href', data.productMatches['0']['link']).text('Buy Your Own Bottle').attr('target', '_blank');

          // - local storage of information given to the user
          localStorage.setItem("paired wines", data.pairedWines['0']);
          localStorage.setItem("pairing text", data.pairingText);
          localStorage.setItem("title", data.productMatches['0']['title']);
          localStorage.setItem("description", data.productMatches['0']['description']);
          localStorage.setItem("image", data.productMatches['0']['imageUrl']);
          localStorage.setItem("price", data.productMatches['0']['price']);
          localStorage.setItem("link", data.productMatches['0']['link']);
          console.log(localStorage);
				}
        // - resets the input box so that the user doesn't have to physically clear it
				$modal.css('display', 'block');
			},
			// - log any errors to the page
			(error) => {
				console.log(error);
			}
		);
  })
})
