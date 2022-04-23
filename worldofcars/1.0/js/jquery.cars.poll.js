(function($){
	
	$.fn.poll = function(options){
		options = jQuery.extend({
			container: 	'#poll',										// (string)
			animate: 		false,											// (boolean)
			transition:	'none',											// (string)
			delay: 			3000,												// (integer)
			loading:		'/images/ajax-loader.gif'		// (string)
		},options);	
	
		var $this = this;
		ra = [];
		
		var formWrap = $('<div class="poll_form">');
		
		function _init(){
			this.container = options.container;			
			this.question = $(this.container+' .question').html();
			this.form = $(this.container+' form');
			this.form.wrap(formWrap);
			this.action = this.form.attr('action');
			//this.method = this.form.attr('method').toUpperCase();			
			
			jq( '.submit_btn_disabled' ).removeClass( 'submit_btn_disabled' ).addClass( 'submit_btn' ).attr( 'disabled', false ).click(function(){postPoll();return false;});
		}
		
		function postPoll(){		
			var def = $(options.container+' input[name=def]').val();
			var pass = $(options.container+' input[name=pass]').val();

			if(!$(options.container+' input[name=Q1]').valButton()){
				//alert($(options.container+' .question').html());
				return false;
			}
			var vote = $(options.container+' input[name=Q1]:checked').val();
			
			this.form = $(options.container+' form');
			this.action = this.form.attr('action');
			this.method = this.form.attr('method').toUpperCase();
			
			$.ajax({
				type: this.method,
				url: this.action,
				data: 'Q1='+vote+'&def='+def+'&pass='+pass,
				success: function(results){
					displayResults(results);
				},
				error: function(){
					
				}
			});
			return false;
		}
		
		function displayResults(xml){
			//log(xml);
			var output = '<ul>';
			$('choice',xml).each(function(i,value){
				output += '<li>'+$(value).text()+'</li>';
				output += '<li><span class="percent">'+$(value).attr('percent')+' %</span><span id="bar_'+i+'" class="bar_wrap"><span class="bar" style="'+(options.animate ? '': 'width:'+$(value).attr('percent')+'%;')+';"></span></span></li>';
			});
			output += '</ul>';
			//log(output);
			$(options.container+' .poll_form').html(output);
			return false;
		}		
		
		// utilities
		
		$.fn.valButton = function() {
			var cnt = -1;
			for (var i=this.length-1; i > -1; i--) {
				if (this[i].checked) {cnt = i; i = -1;}
			}
			if (cnt > -1){ //return btn[cnt].value;
				return true
			} else {
				return false;
			}
		}	
		
		function log(string){
			if($.browser.mozilla)
				console.log(string)
		}
		
		_init();
	}; // end
})(jQuery);