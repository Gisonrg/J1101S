/*
    Replacement for graphics.ss
    
    Authors:
    v1 (2012/2013) by Michael Chua, Eldric Liew -- May 2012
*/

const antialias = 4;

// Graphics Auxiliary
function make_posn(x, y){
    return pair(x, y);
}

function posn_x(p){
    return head(p);
}

function posn_y(p){
    return tail(p);
}

function open_viewport(name, horiz, vert, aa_off){
    var canvas;
    canvas = open_pixmap(name, horiz, vert, aa_off);
    document.body.appendChild(canvas);
    canvas.setAttribute("style", canvas.getAttribute("style")+" position:absolute; left:0px; top:0px; border:black 1px solid;");
    return canvas;
}

function open_pixmap(name, horiz, vert, aa_off){
    var this_aa;
    if(aa_off){
        this_aa = 1;
    }else{
        this_aa = antialias;
    }
    var canvas = document.createElement("canvas");
    //this part uses actual canvas impl.
    canvas.width = horiz*this_aa;
    canvas.height = vert*this_aa;
    //this part uses CSS scaling, in this case is downsizing.
    canvas.style.width = horiz;
    canvas.style.height = vert;
    return canvas;
}

function clear_viewport(viewport){
    var ctx = viewport.getContext("2d");
    ctx.clearRect(0, 0, viewport.width, viewport.height);
}

function draw_solid_polygon(viewport, points, offset, color){
    if(color == null){
        color = make_rgb(0.0, 0.0, 0.0);
    }

    var ctx = viewport.getContext("2d");

    var redstr      = get_red(color).toString(16);
    var greenstr    = get_green(color).toString(16);
    var bluestr     = get_blue(color).toString(16);
    if(redstr.length < 2)   redstr = "0" + redstr;
    if(greenstr.length < 2) greenstr = "0" + greenstr;
    if(bluestr.length < 2)  bluestr = "0" + bluestr;
    var colorstr = redstr+greenstr+bluestr;
    
    ctx.beginPath();
    while(!is_empty_list(points)){
        ctx.lineTo(antialias*(posn_x(head(points))+posn_x(offset)), antialias*(posn_y(head(points))+posn_y(offset)));
        points = tail(points);
    }
    ctx.closePath();
    ctx.fillStyle = '#'+colorstr;
    ctx.fill();
}

// expects a (viewport_size x viewport_size) pixel array. blits all pixels to viewport. 
function blit_pixels(viewport, transform, pixels, viewport_size, mono){
    var ctx = viewport.getContext("2d");
    var imageData = ctx.getImageData(0, 0, viewport.width, viewport.height);
    var target = imageData.data;
    for(var y = 0; y < viewport_size; y++)
    {
        for(var x = 0; x < viewport_size; x++)
        {
            var posn = pair(x,y);
            var transposn = transform(posn); 
            var srcIdx = 4*(viewport_size * y + x);
            var destIdx = 4*(viewport.width * Math.round(posn_y(transposn)) + Math.round(posn_x(transposn)));
            if(mono){
                var avg = Math.round(pixels[srcIdx+0] + pixels[srcIdx+1] + pixels[srcIdx+2])/3;
                target[destIdx+0] = avg;
                target[destIdx+1] = avg;
                target[destIdx+2] = avg;
            }else{
                target[destIdx+0] = pixels[srcIdx+0];
                target[destIdx+1] = pixels[srcIdx+1];
                target[destIdx+2] = pixels[srcIdx+2];
            }
            target[destIdx+3] = 255;
        }
    }
    var buffer = document.createElement("Canvas");
    buffer.width = ctx.canvas.width;
    buffer.height = ctx.canvas.height;
    buffer.getContext("2d").putImageData(imageData, 0, 0);
    ctx.scale(antialias, antialias);
    ctx.drawImage(buffer, 0 , 0);
}

// expects a pixel list of (posn, color) pairs. sets only these pixels, all others are set to alpha=0.
function draw_pixels(viewport, pixels, viewport_size){
    var ctx = viewport.getContext("2d");
    var imageData = ctx.getImageData(0, 0, viewport.width, viewport.height);
    var target = imageData.data;
    while(!is_empty_list(pixels)){        
        var posn = head(head(pixels));
        var color = tail(head(pixels));
        var x = Math.round(posn_x(posn));
        var y = Math.round(posn_y(posn));
        var destIdx = 4*(viewport.width * y + x);
        if(0 <= x && x < viewport_size &&
           0 <= y && y < viewport_size){
            target[destIdx+0] = get_red(color);
            target[destIdx+1] = get_green(color);
            target[destIdx+2] = get_blue(color);
            target[destIdx+3] = 255;
        }
        pixels = tail(pixels);
    }
    var buffer = document.createElement("Canvas");
    buffer.width = ctx.canvas.width;
    buffer.height = ctx.canvas.height;
    buffer.getContext("2d").putImageData(imageData, 0, 0);
    ctx.drawImage(buffer, 0 , 0);
}

function draw_line(viewport, p1, p2, color){
    if(color == null){
        color = make_rgb(0.0, 0.0, 0.0);
    }

    var ctx = viewport.getContext("2d");

    var redstr     = get_red(color).toString(16);
    var greenstr     = get_green(color).toString(16);
    var bluestr     = get_blue(color).toString(16);
    if(redstr.length < 2)    redstr = "0" + redstr;
    if(greenstr.length < 2)    greenstr = "0" + greenstr;
    if(bluestr.length < 2)    bluestr = "0" + bluestr;
    var colorstr = redstr+greenstr+bluestr;

    ctx.beginPath();
    ctx.moveTo(posn_x(p1), posn_y(p1));
    ctx.lineTo(posn_x(p2), posn_y(p2));
    ctx.closePath();
    ctx.strokeStyle = '#'+colorstr;
    ctx.stroke();
}

function make_rgb(red, green ,blue){
    red = Math.round(red*255);
    green = Math.round(green*255);
    blue = Math.round(blue*255);
    return list(red, green, blue);
}

function get_red(color){
    return head(color);
}

function get_green(color){
    return head(tail(color));
}

function get_blue(color){
    return head(tail(tail(color)));
}

//pls leave this, its a native for use with 3d image generation
function copy_viewport(src, dest) 
{
    dest.getContext("2d").clearRect(0,0,dest.width,dest.height);
    dest.getContext("2d").drawImage(src,0,0);
}
