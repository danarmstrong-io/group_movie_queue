$(document).ready(function(){

    
    /* --------------------------------------------------------
        Side Menu
    -----------------------------------------------------------*/
    (function(){
        $('.side-menu > li.submenu > a').click(function(e){
            e.preventDefault();
	    if (!$(this).next('ul').is(":visible")) {
		$('.side-menu > li ul').slideUp(150);
		$(this).next('ul').slideDown(150);
	    }
	    else {
		$(this).next('ul').slideToggle(150);
	    }
	    
	    
        });
    })();
    
    /* --------------------------------------------------------
        Sidebar Toggle
    -----------------------------------------------------------*/
    (function(){
	function handler1() {
	
	    $(this).closest('aside').addClass('toggled').find('.sidebar-container').animate({
		width: '230px'
	    }, 100, function(){
		$(this).closest('aside').find('.shadowed').fadeIn(150);	
	    });
	    $(this).closest('aside').find('.sidebar-toggle').one("click", handler2);
	}
	function handler2() {
	    $(this).closest('aside').find('.shadowed').fadeOut(150, function(){
		$(this).closest('aside').removeClass('toggled').find('.sidebar-container').animate({
		    width: '15px'
		}, 100);
		$(this).closest('aside').find('.shadowed').hide();
	    });
	    
	   $(this).closest('aside').find('.sidebar-toggle').one("click", handler1);
	}
	
	//Sidebar toggle based on above 2 functions in mobile devices
	$('.sidebar-toggle').one("click", handler1);
	
	//Sidebar sizing based on #content height
	var contentHeight = $('#content').height(true);
	$('#rightbar .sidebar-toggle').click(function(){
	    $('#rightbar').height(contentHeight); 
	});
    })();
    
    /* --------------------------------------------------------
        List View
    -----------------------------------------------------------*/
    (function(){
	checkBox = $('.listview .media .check-all');
	parentCheck = $('.listview .listview-header .check-all');
	deleteAll = $('.listview .listview-header .list-delete-all');
	
	parentCheck.change(function () {
	    if ($(this).is(':checked')) {
		checkBox.prop('checked', true);
		deleteAll.css('display', 'inline-block');
	    }
	    else {
		checkBox.prop('checked', false);
		deleteAll.hide();
	    }
	});
          
	checkBox.change(function(){
	     if(checkBox.length == $('.listview .media .check-all:checked').length) {
		parentCheck.prop('checked', true);
		  
	     } else {
		parentCheck.prop('checked', false);  
	     }
       });
     
	$('.listview .listview-header .check-all, .listview .media .check-all').change(function(){
	    deleteAll.css('display','inline-block');
	    if(!$('.listview .media .check-all:checked').length > 0){
		deleteAll.hide();
	    }
	});
   
     })();
    

	
});


