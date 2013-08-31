makeDropZone(document.querySelector('body'), function (data) {
  console.log(parse_and_evaluate(data));
});

function loaded() {
    var oldShow = show;
    var oldAnaglyph = anaglyph;
    var oldHollusion = hollusion;
    var oldStereogram = stereogram;
    exportSymbol('show', function() {
	//var index = $('#goto-display').parent().index();
	//$('#source-code').tabs('option', 'active', index);
	oldShow.apply(this, arguments);
    });
    exportSymbol('hollusion', function() {
	//var index = $('#goto-display').parent().index();
	//$('#source-code').tabs('option', 'active', index);
	oldHollusion.apply(this, arguments);
    });
    exportSymbol('anaglyph', function() {
	//var index = $('#goto-display').parent().index();
	//$('#source-code').tabs('option', 'active', index);
	oldAnaglyph.apply(this, arguments);
    });
    exportSymbol('clear_all', clear_all);
    //exportSymbol('hollusion', hollusion);
    //exportSymbol('anaglyph', anaglyph);
    exportSymbol('stereogram', stereogram);

    exportSymbol('scale', scale);
    exportSymbol('overlay', overlay);
    exportSymbol('overlay_frac', overlay_frac);
    exportSymbol('rotate', rotate);
    exportSymbol('translate', translate);

    exportSymbol('flip_horiz', flip_horiz);
    exportSymbol('flip_vert', flip_vert);
    exportSymbol('turn_upside_down', turn_upside_down);
    exportSymbol('quarter_turn_left', quarter_turn_left);
    exportSymbol('quarter_turn_right', quarter_turn_right);
    exportSymbol('beside', beside);
    exportSymbol('stack', stack);
    exportSymbol('stackn', stackn);
    exportSymbol('stack_frac', stack_frac);
    exportSymbol('repeat_pattern', repeat_pattern);
    exportSymbol('make_cross', make_cross);

    exportSymbol('rcross_bb', rcross_bb);
    exportSymbol('sail_bb', sail_bb);
    exportSymbol('corner_bb', corner_bb);
    exportSymbol('nova_bb', nova_bb);
    exportSymbol('heart_bb', heart_bb);
    exportSymbol('circle_bb', circle_bb);
    exportSymbol('ribbon_bb', ribbon_bb);
    exportSymbol('black_bb', black_bb);
    exportSymbol('blank_bb', blank_bb);
    exportSymbol('pentagram_bb', pentagram_bb);

    //loadStudentScript();
}

function loadStudentScript() {
    initialise();

    function initialise() {
	clear_all();

        document.getElementById('mosaic').onclick = function() {
	    clear_all();
	    var mosaic = parse_and_evaluate("mosaic;");
	    show(mosaic(rcross_bb, sail_bb, corner_bb, nova_bb));
	};
        document.getElementById('simple_fractal').onclick = function() {
	    clear_all();
	    var simple_fractal = parse_and_evaluate("simple_fractal;");
	    show(simple_fractal(make_cross(rcross_bb)));
	};
        document.getElementById('fractal').onclick = function() {
            clear_all();
	    var fractal = parse_and_evaluate("fractal;");
	    show(fractal(make_cross(rcross_bb), 7));
        };
        document.getElementById('persian').onclick = function() {
	    clear_all();
	    var persian = parse_and_evaluate("persian;");
	    show(persian(make_cross(rcross_bb), 5));
	};
    };
}

window.onload = loaded;
