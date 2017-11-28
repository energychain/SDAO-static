var mapping=[];


$('#retrieve_btn').click(function() {
	var provider = new ethers.providers.JsonRpcProvider('https://lc4.stromdao.de/rpc');
	provider.getTransactionReceipt ( $('#query').val() ).then( function(d) {
				$('.withAddress').show();
				console.log(d);
				
		
	});

});
