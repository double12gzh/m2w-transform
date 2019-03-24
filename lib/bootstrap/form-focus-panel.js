$(document).on('focus','.form-focus-panel input',function(e){
	var src= $(this).parent().find('.form-focus-body');
	src.slideDown('fast');
}).on('mouseover','.form-focus-panel',function(e){
	$(this).data('state',1);
}).on('mouseout','.form-focus-panel',function(e){
	$(this).data('state',0);
}).on('click','body',function(){
	$('.form-focus-panel').each(function(){
		if($(this).data('state')==0){
			$(this).find('.form-focus-body').slideUp('fast');
		}
	})
})

