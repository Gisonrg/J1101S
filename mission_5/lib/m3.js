makeDropZone(document.querySelector('body'), function (data) {
  console.log(parse_and_evaluate(data));
});

function loaded() {

    exportSymbol('draw_points_on', (draw_points_on));
    exportSymbol('draw_connected', (draw_connected));
    exportSymbol('draw_points_squeezed_to_window', (draw_points_squeezed_to_window));
    exportSymbol('draw_connected_squeezed_to_window', (draw_connected_squeezed_to_window));
    exportSymbol('draw_connected_full_view', (draw_connected_full_view));
    exportSymbol('draw_connected_full_view_proportional', (draw_connected_full_view_proportional));

    exportSymbol('make_point', make_point);
    exportSymbol('x_of', x_of);
    exportSymbol('y_of', y_of);
    exportSymbol('unit_circle', unit_circle);
    exportSymbol('alternative_unit_circle', alternative_unit_circle);
    exportSymbol('unit_line_at', unit_line_at);
    exportSymbol('unit_line', unit_line);

    exportSymbol('rotate_pi_over_2', rotate_pi_over_2);
    exportSymbol('connect_rigidly', connect_rigidly);
    exportSymbol('translate', translate);
    exportSymbol('scale_x_y', scale_x_y);
    exportSymbol('scale', scale);

    exportSymbol('gosperize', gosperize);
    exportSymbol('gosper_curve', gosper_curve);
    exportSymbol('repeated', repeated);
    exportSymbol('squeeze_rectangular_portion', squeeze_rectangular_portion);
    exportSymbol('squeeze_full_view', squeeze_full_view);
    exportSymbol('full_view_proportional', full_view_proportional);
    exportSymbol('show_connected_gosper', show_connected_gosper);
    exportSymbol('repeated', repeated);
    exportSymbol('param_gosper', param_gosper);
    exportSymbol('param_gosperize', param_gosperize);
    exportSymbol('rotate_around_origin', rotate_around_origin);
    exportSymbol('put_in_standard_position', put_in_standard_position);
    exportSymbol('revert', revert);
}

window.onload = loaded;
