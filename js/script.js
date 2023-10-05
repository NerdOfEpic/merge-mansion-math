function do_reset() {
	document.querySelectorAll( '#item_container div span' ).forEach( element => {
		element.innerHTML = 0;
	} );
	document.querySelectorAll( '#result_container div span' ).forEach( element => {
		element.innerHTML = 0;
	} );
	if ( document.getElementById( 'limit' ) ) {
		document.getElementById( 'limit' ).value = 13;
	}
}

function do_reset_pouch() {

	// TODO: reset things

	document.getElementById('pouch_container').innerHTML = 'Reset complete. Click any item to start counting again!';
}

function do_undo_pouch() {

	// TODO: implement undo queue

	alert('Sorry, the undo isnt done. Please try again later');
}

function write_results( arr_values ) {
	let i = 0;
	document.querySelectorAll( '#result_container div span' ).forEach( element => {
		if ( 'undefined' !== typeof arr_values[i] ) {
			element.innerHTML = arr_values[i];
		}
		i ++;
	} );
}

function get_max_level() {
	return document.getElementById( 'limit' ).value;
}

function get_value( el ) {
	return parseInt( el.innerHTML );
}

function get_all_values() {
	let arr_values = new Array();
	document.querySelectorAll( '#item_container div span' ).forEach( element => {
		arr_values.push( get_value( element ) );
	} );
	return arr_values;
}

function build_item_container() {
	let html = '';
	for ( let i = 1; i <= 13; i ++ ) {
		html += '<div><span>0</span><br /><a class="down">&#8659;</a>&nbsp;<a class="up">&#8657;</a><hr />L'+i+'</div>';
	}
	document.getElementById( 'item_container' ).innerHTML = html;
}

function build_results_container( max_level = 13 ) {
	let html = '';
	max_level = ( max_level > 1 ) ? max_level : 1;
	for ( let i = 1; i <= max_level; i ++ ) {
		html += '<div>L'+i+'<hr /><span>0</span></div>';
	}
	document.getElementById( 'result_container' ).innerHTML = html;
}

/******************************************************************************
 * Rollup functions
 *****************************************************************************/
function do_rollup() {
	let arr_values = get_all_values();
	let max_level = get_max_level();

	let loop_limit = (
		max_level < arr_values.length
	) ? max_level : arr_values.length;

	for ( let i = 0; i < loop_limit-1; i ++ ) {
		// What's left behind will be our new current value, 0 or 1 only
		let new_val = arr_values[i] % 2;

		// this is how many merged things we can make, and roll up to the next level
		let roll_val = Math.floor( arr_values[i] / 2 );

		// Now set the current value and increment the next value if needed
		arr_values[i] = new_val;
		if ( i+1 !== loop_limit ) {
			arr_values[i+1] = arr_values[i+1]+roll_val;
		}
	}

	write_results( arr_values );

}

/******************************************************************************
 * Recipe functions
 *****************************************************************************/
function do_recipe_calculation() {
	let arr_values = get_all_values();
	let arr_results = [];

	let count = 0;
	for ( let i = 0; i < arr_values.length-1; i ++ ) {
		if ( 0 === i ) {
			count += arr_values[i]
		} else {
			if ( arr_values[i] > 0 ) {
				count += Math.pow( 2 * arr_values[i], i );
			}
		}
	}
	arr_results[0] = count;

	console.log(count);

	write_results( arr_results );

}

/******************************************************************************
 * Pouch functions
 *****************************************************************************/
