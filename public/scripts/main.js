var playerData = function(e) {
	e.preventDefault();

}

// 7799D516-6596-4B80-9C38-270885E543C7 

$(function(){
	
	var table = $('#player-list').DataTable();
	


	// console.log('ready!');
	$('.submission').on('click',function(e){
		e.preventDefault();
		// console.log('clicked');

		playerSearch = {
			name: $('.name').val(),
			id: $('.Id').val()
		};
		// console.log(playerSearch);
		$.post('/player/playerStats',playerSearch,function(dataFromServer,error){
			console.log(error);
			console.log('data',dataFromServer);
		})

	});

	$(document).on('click','.search',function(e){
		e.preventDefault();
		console.log(this.closest('td'));
		console.log($(this).closest('td'));
		console.log($(this).parent().data('.id'));
	})


});