$(() => {
  // - code here
	// - building out the modal
	// - grabbing modal and close button elements
	const $modal = $('.modal');
	const $closeModal = $('.close');
	// - event handlers
	const closeModal = () => {
		$modal.css('display', 'none')
		// - initialize values to empty strings
    // - this resets the modal so that an error response doesn't show on top of other information
		$('.status').html('');
		$('.text').html('');
		$('.title').html('');
		$('.description').html('');
		$('.imageUrl').attr('src', '');
		$('.price').html('');
		$('.link').attr('href','').text('');
	}
	// - event listeners
	// - setting an on click event to close the modal
	$closeModal.on('click', closeModal);
	// - on submit event listener for the form
  	$('form').on('submit', (event) => {
    	event.preventDefault();
    	const userInput = $('input[type="text"]').val();
    	let pairedWines = $(event.target).attr('id')
		// - grabbing wine pairing information from www.spoonacular.com API
		$.ajax({
		  	url: `https://api.spoonacular.com/food/wine/pairing?food=${userInput}&apiKey=8d08e6b62869469d8ed4ab6498d5f3ae`,
		}).then(
			(data) => {
        console.log(data);
        // - if/else statment to show error information inside the modal if API does not have wine information for use input
				if ('status' in data) {
					if (data.status == 'failure') {
						$('.status').html(data.message).css('display', 'block'); // - show status div
					} else {
						console.log(data); // - log API info
					}
				}
				else {
					$('.status').html('').css('display', 'none'); // - hide status div
					$('.text').html(data.pairingText);
					$('.title').html(data.productMatches['0']['title']);
					$('.description').html(data.productMatches['0']['description']);
					$('.imageUrl').attr('src', data.productMatches['0']['imageUrl']);
					$('.price').html(data.productMatches['0']['price']);
					$('.link').attr('href', data.productMatches['0']['link']).text('Buy Your Own Bottle').attr('target', '_blank');
				}
				$modal.css('display', 'block'); //update display to block AFTER updating the text.
			},
			// - log any errors to the page
			(error) => {
				console.log(error);
			}
		);
  })
})
