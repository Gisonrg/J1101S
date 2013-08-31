makeDropZone(document.querySelector('body'), function (data) {
  console.log(parse_and_evaluate(data));
});

function loaded() {
	// mission 4

	exportSymbol('make_point', make_point);
	exportSymbol('x_of', x_of);
	exportSymbol('y_of', y_of);
	exportSymbol('unit_circle', unit_circle);
	exportSymbol('unit_line_at', unit_line_at);
	exportSymbol('unit_line', unit_line);
	exportSymbol('draw_points_on', (draw_points_on));
	exportSymbol('draw_connected', (draw_connected));
	exportSymbol('draw_points_squeezed_to_window', (draw_points_squeezed_to_window));
	exportSymbol('draw_connected_squeezed_to_window', (draw_connected_squeezed_to_window));
	exportSymbol('draw_connected_full_view', (draw_connected_full_view));
}

window.onload = loaded;
