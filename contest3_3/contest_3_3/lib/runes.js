/*
    Quilting/stereogram support code for CS1101S Missions
    Ported from runes.rkt v3.1
    
    Authors:
    v1 (2012/2013) by Michael Chua, Eldric Liew -- May 2012
*/

// Setup graphics

const viewport_size = 600; // This is the height of the viewport
const spread = 20;
var active_hollusion = null;

var vp = open_viewport("ViewPort", 4/3*viewport_size, viewport_size, false);
var lp = open_pixmap("Left Port", 4/3*viewport_size, viewport_size);
var rp = open_pixmap("Right Port", 4/3*viewport_size, viewport_size);
function clear_all(){
    if(active_hollusion != null){
        active_hollusion("kill");
        active_hollusion = null;
    }
    clear_viewport(vp);
    clear_viewport(lp);
    clear_viewport(rp);
}
                              
// specialised, non-JediScript version of for_each, used for making stereograms and
// anaglyphs work. This was reverted in cb13996b57b2 by Martin, to make list.js
// more JediScript-like. However, it broke the runes.
// for_each applies first arg proc to the elements of the remaining arguments,
// assumed to be lists of equal length.
// proc is applied element-by-element:
// for_each(proc,[1,[2,[]]],[3,[4,[]]]) results in the calls proc(1,3) and proc(2,4)
// for_each returns null.
// for_each throws an exception if any of the remaining arguments is not a list,
// or if they do not have equal length.
function for_each(){
    var param_len = arguments[0].length;
    var proc = arguments[0];
    while(!is_empty_list(arguments[1])){
        var params = [];
        for(var j = 1; j < 1+param_len; j++) {
            params.push(head(arguments[j]));
            arguments[j] = tail(arguments[j]);
        }
        proc.apply(proc, params);
	}
}

// Vector arithmetic

function add_vect(p1, p2){
    return make_posn(posn_x(p1) + posn_x(p2),
                     posn_y(p1) + posn_y(p2));
}

function scale_vect(r, p){
    return make_posn(r * posn_x(p),
                     r * posn_y(p));
}

// A graphic object (painter) is drawn in a frame 
// made up of an origin and 2 vectors

function make_frame(p0, p1, p2, z1, z2){
    return list(p0, p1, p2, z1, z2);
}

function frame_orig(f){    return head(f); }
function frame_x(f){     return head(tail(f)); }
function frame_y(f){     return head(tail(tail(f))); }
function frame_z1(f){    return head(tail(tail(tail(f)))); }
function frame_z2(f){    return head(tail(tail(tail(tail(f))))); }

// Show a painter in the unit frame

var unit_frame = make_frame(make_posn(1/6*viewport_size, 0),
                            make_posn(viewport_size,0),
                            make_posn(0,viewport_size),
                            0,
                            1);

function show(painter){
    return painter(vp, unit_frame);
}

// Translate a point from the unit frame into a new frame

function transform_posn(frame){
    return function(posn){
               return add_vect(frame_orig(frame),
                      add_vect(scale_vect(posn_x(posn)/viewport_size,
                                         frame_x(frame)),
                               scale_vect(posn_y(posn)/viewport_size,
                                         frame_y(frame))));
           }
}

function translate_posn(posn, dist){
    make_posn(posn_x(posn)+dist,posn_y(posn));
}

// Zero element of painting

function null_painter(frame){
    // nothing-to-do
}

// Some useful predefined painters (page 16 in "Concrete Abstractions")

function rcross_bb(vp,frame){
    var p1 = list(make_posn(0, 0),
                  make_posn(viewport_size / 4, viewport_size / 4),
                  make_posn(3 * viewport_size / 4, viewport_size / 4),
                  make_posn(3 * viewport_size / 4, 3 * viewport_size / 4),
                  make_posn(viewport_size, viewport_size),
                  make_posn(viewport_size, 0));
    var p2 = list(make_posn(viewport_size / 4, viewport_size / 4),
                  make_posn(viewport_size / 4, 3 * viewport_size / 4),
                  make_posn(3 * viewport_size / 4, 3 * viewport_size / 4));
    if(is_list(vp)){
        for_each(function(port, count){
                     draw_solid_polygon(port, map(transform_posn(frame), p1),
                                        make_posn((0.3 - frame_z1(frame)) * (spread * (((2 * count) / (length(vp) - 1)) - 1)), 0), 
                                        make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
                     draw_solid_polygon(port, map(transform_posn(frame), p2),
                                        make_posn((0.3 - frame_z1(frame)) * (spread * (((2 * count) / (length(vp) - 1)) - 1)), 0), 
                                        make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
                 }, 
                 vp, build_list(length(vp), function(x){ return x; }))
    }else if(vp !== null){
        draw_solid_polygon(vp, map(transform_posn(frame), p1),
                           make_posn(0, 0), 
                           make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
        draw_solid_polygon(vp, map(transform_posn(frame), p2),
                           make_posn(0, 0), 
                           make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
    }
}

function sail_bb(vp, frame){
    var p = list(make_posn(viewport_size / 2, 0),
                 make_posn(viewport_size / 2, viewport_size),
                 make_posn(viewport_size, viewport_size));
    if(is_list(vp)){
        for_each(function(port, count){
                     draw_solid_polygon(port, map(transform_posn(frame), p),
                                        make_posn((0.3 - frame_z1(frame)) * (spread * (((2 * count) / (length(vp) - 1)) - 1)), 0), 
                                        make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
                 }, 
                 vp, build_list(length(vp), function(x){ return x; }))
    }else if(vp !== null){
        draw_solid_polygon(vp, map(transform_posn(frame), p),
                           make_posn(0, 0), 
                           make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
    }
}

function corner_bb(vp, frame){
    var p = list(make_posn(viewport_size / 2, 0),
                 make_posn(viewport_size, 0),
                 make_posn(viewport_size, viewport_size / 2));
    if(is_list(vp)){
        for_each(function(port, count){
                     draw_solid_polygon(port, map(transform_posn(frame), p),
                                        make_posn((0.3 - frame_z1(frame)) * (spread * (((2 * count) / (length(vp) - 1)) - 1)), 0), 
                                        make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
                 }, 
                 vp, build_list(length(vp), function(x){ return x; }))
    }else if(vp !== null){
        draw_solid_polygon(vp, map(transform_posn(frame), p),
                           make_posn(0, 0), 
                           make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
    }
}

function nova_bb(vp, frame){
    var p = list(make_posn(viewport_size / 2, 0),
                 make_posn(viewport_size / 4, viewport_size / 2),
                 make_posn(viewport_size, viewport_size / 2),
                 make_posn(viewport_size / 2, viewport_size / 4));
    if(is_list(vp)){
        for_each(function(port, count){
                     draw_solid_polygon(port, map(transform_posn(frame), p),
                                        make_posn((0.3 - frame_z1(frame)) * (spread * (((2 * count) / (length(vp) - 1)) - 1)), 0), 
                                        make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
                 }, 
             vp, build_list(length(vp), function(x){ return x; }))
    }else if(vp !== null){
        draw_solid_polygon(vp, map(transform_posn(frame), p),
                           make_posn(0, 0), 
                           make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
    }
}

function heart_bb(vp, frame){
    var k = Math.sqrt(2) / 2; 
    var p = list(make_posn(viewport_size / 2, (1-k)/(1+3*k) * viewport_size), 
                 make_posn((1-k)/(1+k) * viewport_size / 2, 
                           (1+k)/(1+3*k) * viewport_size), 
                 make_posn(viewport_size / 2, viewport_size), 
                 make_posn(viewport_size - (1-k)/(1+k) * viewport_size / 2,
                          (1+k)/(1+3*k) * viewport_size));
    // Draw a kite (bottom half of the heart).    
    if(is_list(vp)){
        for_each(function(port, count){
                     draw_solid_polygon(port, map(transform_posn(frame), p),
                                        make_posn((0.3 - frame_z1(frame)) * (spread * (((2 * count) / (length(vp) - 1)) - 1)), 0), 
                                        make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
                 }, 
                 vp, build_list(length(vp), function(x){ return x; }))
    }else if(vp !== null){
        draw_solid_polygon(vp, map(transform_posn(frame), p),
                           make_posn(0, 0), 
                           make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
    }

    // Draw the top of the heart.
    var heart_circle = stack_frac(2 / (1 + 3 * k), 
                                  quarter_turn_right(stack_frac(k / (1+k), blank_bb, circle_bb)),
                                  blank_bb);
    heart_circle(vp, frame);
    flip_horiz(heart_circle)(vp, frame);
}

// center-and-fill will center and scale a 2x2 image to fill the entire viewport.
// This is used by circle-bb, spiral-bb, and ribbon-bb.
var center = make_posn(viewport_size / 2, viewport_size / 2);
function center_and_fill(x){
    return add_vect(center, scale_vect(viewport_size / 2, x));
}

function circle_bb(vp, frame){
    // make-circle will return a list of points (a lot of points) that approx a circle.
    const unit = 50; // 1 in the original, too slow to use
    function make_circle(){
        function helper(angle, poly){
            if(angle >= 2 * Math.PI){
                return poly;
            }else{
                return pair(make_posn(Math.cos(angle), Math.sin(angle)),
                            helper(angle + unit / viewport_size, poly));
            }
        }
        return helper(0, []);
    }

    // We approximate a circle by drawing polygon with A LOT of vertices.
    if(is_list(vp)){
        for_each(function(port, count){
                     draw_solid_polygon(port, map(transform_posn(frame), map(center_and_fill, make_circle())),
                                        make_posn((0.3 - frame_z1(frame)) * (spread * (((2 * count) / (length(vp) - 1)) - 1)), 0), 
                                        make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
                 }, 
                 vp, build_list(length(vp), function(x){ return x; }))
    }else if(vp !== null){
        draw_solid_polygon(vp, map(transform_posn(frame), map(center_and_fill, make_circle())),
                           make_posn(0, 0), 
                           make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
    }
}

// spiral_bb cannot be ported directly from the original racket implementation, because HTML5's 2d context 
//   lacks support for even-odd fill rules, and automatically closes the path between the last and first point
//   of a polygon. 
// Do not use spiral_bb. 
/*
function spiral_bb(vp, frame){
    const theta_max = 30;
    const thickness = -1 / theta_max;
    const unit = 0.1; // 0.02 in the original, too slow to use
    function make_spiral(){
        function helper(angle, offset, poly){
            if(angle >= theta_max){
                return poly;
            }else{
                return pair(make_posn((offset + angle / theta_max) * Math.cos(angle), 
                                      (offset + angle / theta_max) * Math.sin(angle)),
                            helper(angle + unit, offset, poly));
            }
        }
        return helper(0, 0, (helper(0, thickness, [])));
    }
    if(is_list(vp)){
        for_each(function(port, count){
                     draw_solid_polygon(port, map(transform_posn(frame), map(center_and_fill, make_spiral())),
                                        make_posn((0.3 - frame_z1(frame)) * (spread * (((2 * count) / (length(vp) - 1)) - 1)), 0), 
                                        make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
                 }, 
                 vp, build_list(length(vp), function(x){ return x; }))
    }else if(vp !== null){
        draw_solid_polygon(vp, map(transform_posn(frame), map(center_and_fill, make_spiral())),
                    make_posn(0, 0), 
                    make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
    }
}
*/

function ribbon_bb(vp, frame){
    const theta_max = 30;
    const thickness = -1 / theta_max;
    const unit = 0.1; // 0.02 in the original, too slow to use
    function make_ribbon(angle, poly){
        if(angle >= theta_max){
            return close_ribbon(angle, poly);
        }else{
            return pair(make_posn((angle / theta_max) * Math.cos(angle), 
                                  (angle / theta_max) * Math.sin(angle)),
                        make_ribbon(angle + unit, poly));
        }
    }
    function close_ribbon(angle, poly){
        if(angle <= 0){
            return poly;
        }else{
            return pair(make_posn(Math.abs(Math.cos(angle) * thickness) + (angle / theta_max * Math.cos(angle)), 
                                  Math.abs(Math.sin(angle) * thickness) + (angle / theta_max * Math.sin(angle))),
                        close_ribbon(angle - unit, poly));
        }
    }
    if(is_list(vp)){
        for_each(function(port, count){
                     draw_solid_polygon(port, map(transform_posn(frame), map(center_and_fill, make_ribbon(0, []))),
                                        make_posn((0.3 - frame_z1(frame)) * (spread * (((2 * count) / (length(vp) - 1)) - 1)), 0), 
                                        make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
                 }, 
                 vp, build_list(length(vp), function(x){ return x; }))
    }else if(vp !== null){
        draw_solid_polygon(vp, map(transform_posn(frame), map(center_and_fill, make_ribbon(0, []))),
                           make_posn(0, 0), 
                           make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
    }
}

function black_bb(vp, frame){
    var p = list(make_posn(0, 0),
                 make_posn(viewport_size, 0),
                 make_posn(viewport_size, viewport_size),
                 make_posn(0, viewport_size));
    if(is_list(vp)){
        for_each(function(port, count){
                     draw_solid_polygon(port, map(transform_posn(frame), p),
                                        make_posn((0.3 - frame_z1(frame)) * (spread * (((2 * count) / (length(vp) - 1)) - 1)), 0), 
                                        make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
                 }, 
                 vp, build_list(length(vp), function(x){ return x; }))
    }else if(vp !== null){
        draw_solid_polygon(vp, map(transform_posn(frame), p),
                           make_posn(0, 0), 
                           make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
    }
}

function blank_bb(vp,frame){
    // draws nothing
}

// replacement for spiral_bb
function pentagram_bb(vp, frame){
    var unit_offset = viewport_size / 2;
    var s1 = Math.sin(2 * Math.PI / 5) * unit_offset;
    var c1 = Math.cos(2 * Math.PI / 5) * unit_offset;
    var s2 = Math.sin(4 * Math.PI / 5) * unit_offset;
    var c2 = Math.cos(Math.PI / 5) * unit_offset;
    var p = list(make_posn(-s1 + unit_offset, 
                           -c1 + unit_offset),
             make_posn(s1 + unit_offset, 
                       -c1 + unit_offset),
             make_posn(-s2 + unit_offset, 
                       c2 + unit_offset),
             make_posn(unit_offset, 0),
             make_posn(s2 + unit_offset, 
                       c2 + unit_offset));
    if(is_list(vp)){
        for_each(function(port, count){
                     draw_solid_polygon(port, map(transform_posn(frame), p),
                                        make_posn((0.3 - frame_z1(frame)) * (spread * (((2 * count) / (length(vp) - 1)) - 1)), 0), 
                                        make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
                 }, 
                 vp, build_list(length(vp), function(x){ return x; }))
    }else if(vp !== null){
        draw_solid_polygon(vp, map(transform_posn(frame), p),
                           make_posn(0, 0), 
                           make_rgb(frame_z1(frame), frame_z1(frame), frame_z1(frame)));
    }
}

function synchronousImgLoad(filename) //returns a dataUrl usable in image loading.
{
    //add code to check if file exists
        //if not it will hang.
    if (window.XMLHttpRequest) {              
        AJAX=new XMLHttpRequest();              
    } else {                                  
        AJAX=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (AJAX) {
        AJAX.open("GET", filename, false);
        AJAX.overrideMimeType('text/plain; charset=x-user-defined');//doesn't work with IE, but heck.        
        AJAX.send(null);
        return AJAX.responseText;                                         
    } else {
        return false;
    }
}

function image_to_painter(filename)
{
    var img = synchronousImgLoad(filename); //returned in unicode, need to stuff into base64 encoding.
        //Hence, http://emilsblog.lerch.org/2009/07/javascript-hacks-using-xhr-to-load.html
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    encodeBinary = function(input){
        var output = "data:image/png;base64,";
        var bytebuffer;
        var encodedCharIndexes = new Array(4);
        var inx = 0;
        var paddingBytes = 0;
        
        while(inx < input.length){
            // Fill byte buffer array
            bytebuffer = new Array(3);
            for(jnx = 0; jnx < bytebuffer.length; jnx++)
            if(inx < input.length)
            bytebuffer[jnx] = input.charCodeAt(inx++) & 0xff; // throw away high-order byte, as documented at: https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
            else
            bytebuffer[jnx] = 0;
            
            // Get each encoded character, 6 bits at a time
            // index 1: first 6 bits
            encodedCharIndexes[0] = bytebuffer[0] >> 2;  
            // index 2: second 6 bits (2 least significant bits from input byte 1 + 4 most significant bits from byte 2)
            encodedCharIndexes[1] = ((bytebuffer[0] & 0x3) << 4) | (bytebuffer[1] >> 4);  
            // index 3: third 6 bits (4 least significant bits from input byte 2 + 2 most significant bits from byte 3)
            encodedCharIndexes[2] = ((bytebuffer[1] & 0x0f) << 2) | (bytebuffer[2] >> 6);  
            // index 3: forth 6 bits (6 least significant bits from input byte 3)
            encodedCharIndexes[3] = bytebuffer[2] & 0x3f;  
            
            // Determine whether padding happened, and adjust accordingly
            paddingBytes = inx - (input.length - 1);
            switch(paddingBytes){
            case 2:
                // Set last 2 characters to padding char
                encodedCharIndexes[3] = 64; 
                encodedCharIndexes[2] = 64; 
                break;
            case 1:
                // Set last character to padding char
                encodedCharIndexes[3] = 64; 
                break;
            default:
                break; // No padding - proceed
            }
            // Now we will grab each appropriate character out of our keystring
            // based on our index array and append it to the output string
            for(jnx = 0; jnx < encodedCharIndexes.length; jnx++)
            output += _keyStr.charAt(encodedCharIndexes[jnx]);
        }
        return output;
    };
    img = encodeBinary(img);
    var converter = open_pixmap("Converter", viewport_size/antialias, viewport_size/antialias);
    //console.log(converter);
        //document.body.appendChild(converter); //debug
    var tolerance = 1/spread;
    var limit = 0.86;

    var ctx = converter.getContext("2d");
    var imag = new Image();//sigh it still comes down to this.
    //imag.src = img; //lucky this guarantees the image is already available (almost)
    
    return function(vp, frame){
               imag.src = img;
               //imag.onload = function()
                   //{
                       if(is_list(vp))
                       {
                           function get_depth(x,y,dir)
                           {
                               //var result = 255;
                               for(var c = 0;c<spread;c++)
                               {
                                   var ox =  Math.round(x+dir*(-0.3*spread +c));
                                   if(ox>=0&&ox<viewport_size)
                                   {
                                       var tgt = 4*(y*converter.width + ox);
                                       var curr = pixels[tgt];
                                       var d = Math.abs(curr - 255*c/spread);
                                       if(d<=tolerance*255)
                                           return curr;
                                   }
                               }
                               return 255;
                           }
                           function ana_out_loop(port, count)
                           {
                               var tgtctx = port.getContext("2d");
                               var imgData = tgtctx.getImageData(0,0,port.width,port.height);
                               var tgtpixels =  imgData.data;
                               var transform = transform_posn(frame);
                               for(var y = 0;y<viewport_size;y++)
                                   for(var x = 0;x<viewport_size;x++)
                                   {
                                       var col = get_depth(x,y,count);
                                       col = (col>limit*255)? 999: (frame_z1(frame) + (frame_z2(frame) - frame_z1(frame)) * col);
                                       if(col<=255)
                                       {
                                           //draw-pixel after transform
                                           var posn = pair(x,y);
                                           var transposn = transform(posn);
                                           var tgttgt = 4*(port.width*Math.round(posn_y(transposn)) + 
                                                           Math.round(posn_x(transposn)));
                                           tgtpixels[tgttgt] = tgtpixels[tgttgt+1] = tgtpixels[tgttgt+2] = col;
                                           tgtpixels[tgttgt+3] = 255;
                                       }
                                   }
                               //tgtctx.putImageData(imgData,0,0);
                               var buffer = document.createElement("Canvas");
                               buffer.width = ctx.canvas.width;
                               buffer.height = ctx.canvas.height;
                               buffer.getContext("2d").putImageData(imgData, 0, 0);
							   tgtctx.save();
                               tgtctx.scale(antialias, antialias);
                               tgtctx.drawImage(buffer, 0 , 0);
							   tgtctx.restore();
                           }
                           ctx.drawImage(imag,0,0); //basically i'm praying that its loaded by the time this is done.
                           var pixels = ctx.getImageData(0,0,viewport_size, viewport_size).data;
                           for_each(function(port, count)
                                    {
                                        ana_out_loop(port, ((2*count)/(length(vp)-1) - 1));
                                    }, 
                                    vp, build_list(length(vp),function(x){return x;}));
                       }
                       else
                       {
                           var transform = transform_posn(frame);
                           ctx.drawImage(imag, 0, 0);
                           var pixels = ctx.getImageData(0,0,viewport_size, viewport_size).data;
                           blit_pixels(vp, transform, pixels, viewport_size, true);
                       }
                 //}
                 //imag.src = img;
           }
}

// This procedure creates a painter from a depth function f(x,y) where 0<=x,y<=600. The
// depth function returns a depth value, a real number in the range [0,1] where 0 represents
// shallowest depth and 1 deepest. The depth function will be sampled at integer intervals,
// users may use this fact to aid them in writing the depth function.
function function_to_painter(depth_fun){ // non-functional version of function_to_painter, functional ver was too slow
    var tolerance = 1 / spread;
    function get_depth(x, y, dir, frame){ // lp -> dir = -1, rp -> dir = 1
        var result = 1;
        for(var c = 0; c < spread; c++){
            var ox = Math.round(x + (dir * ((-0.3 * spread) + c)));
            if((ox >= 0) && (ox < viewport_size)){
                var curr = depth_fun(Math.round(x),Math.round(y));
                if(curr !== 1){
                    curr = frame_z1(frame) + ((frame_z2(frame) - frame_z1(frame)) * curr);
                }
                var d = Math.abs(curr - c / spread);
                if(d < tolerance){
                    result = curr;
                    break;
                }
            }
        }
        return result;
    }
    return function(vp, frame){
               function ana_loop(port, count){
                   var pixels = [];
                   for(var y = 0; y < viewport_size; y++){
                       for(var x = 0; x < viewport_size; x++){
                           var col = get_depth(x, y, count, frame);
                           if(col > 1){
                               col = 1;
                           }
                           pixels.push(col*255);
                           pixels.push(col*255);
                           pixels.push(col*255);
                           pixels.push(255);
                       }
                   }
                   var transform = transform_posn(frame);
                   blit_pixels(port, transform, pixels, viewport_size, false);
               }
               if(is_list(vp)){
                   for_each(function(port, count){
                                ana_loop(port, (2 * count) / (length(vp) - 1) - 1);
                            }, 
                            vp, build_list(length(vp), function(x){ return x; }))
               }else if(vp !== null){
                   var pixels = [];
                   for(var y = 0; y < viewport_size; y++){
                       for(var x = 0; x < viewport_size; x++){
                           var color = depth_fun(x, y);
                           if(color !== 1){
                               color = frame_z1(frame) + ((frame_z2(frame) - frame_z1(frame)) * color);
                           }
                           if(color > 1){
                               color = 1;
                           }
                           pixels.push(color*255);
                           pixels.push(color*255);
                           pixels.push(color*255);
                           pixels.push(255);
                       }
                   }
                   var transform = transform_posn(frame);
                   blit_pixels(vp, transform, pixels, viewport_size, false);
               }
           }
}

// Frame transformation factory.
function process_frame(op, frame){
    var p0 = frame_orig(frame);
    var p1 = frame_x(frame);
    var p2 = frame_y(frame);
    var z1 = frame_z1(frame);
    var z2 = frame_z2(frame);
    
    switch(op){
        case "bottom_frac":
            return function(frac){
                       return make_frame(add_vect(p0, scale_vect(1 - frac, p2)),
                                         p1,
                                         scale_vect(frac, p2),
                                         z1,
                                         z2);
                   }
        case "top_frac":
            return function(frac){
                       return make_frame(p0,
                                         p1,
                                         scale_vect(frac, p2),
                                         z1,
                                         z2);
                   }
        case "left":
            return make_frame(p0,
                              scale_vect(1/2, p1),
                              p2,
                              z1,
                              z2);
        case "right":
            return make_frame(add_vect(p0, scale_vect(1/2,p1)),
                              scale_vect(1/2, p1),
                              p2,
                              z1,
                              z2);
        case "flip_horiz":
            return make_frame(add_vect(p0, p1),
                              scale_vect(-1, p1),
                              p2,
                              z1,
                              z2);
        case "flip_vert":
            return make_frame(add_vect(p0, p2),
                              p1,
                              scale_vect(-1, p2),
                              z1,
                              z2);
        case "reduce_2":
            return make_frame(add_vect(p0, add_vect(scale_vect(-0.4, p1), 
                                                    scale_vect(0.125, p2))),
                              scale_vect(0.7071, p1),
                              scale_vect(0.7071, p2),
                              z1,
                              z2);
        case "rotate":
            return function(rad){
                       var cos_theta = Math.cos(rad);
                       var sin_theta = Math.sin(rad);
                       function rotate_posn(p){
                           return make_posn(cos_theta * posn_x(p) +
                                            sin_theta * posn_y(p),
                                            cos_theta * posn_y(p) -
                                            sin_theta * posn_x(p));
                       }
                       var half_gradient = scale_vect(1/2, add_vect(p1, p2));
                       var center = add_vect(add_vect(p0, half_gradient),
                                             rotate_posn(scale_vect(-1, half_gradient)));
                       return make_frame(center,
                                         rotate_posn(p1),
                                         rotate_posn(p2),
                                         z1,
                                         z2);
                   }
        case "rotate90":
            return make_frame(add_vect(p0, p1),
                              p2,
                              scale_vect(-1, p1),
                              z1,
                              z2);
        case "deep_frac":
            return function(frac){
                       return make_frame(p0,
                                         p1,
                                         p2,
                                         z1 + ((z2 - z1) * frac),
                                         z2);
                   }
        case "shallow_frac":
            return function(frac){
                       return make_frame(p0,
                                         p1,
                                         p2,
                                         z1,
                                         z1 + ((z2 - z1) * frac));
                   }
        case "scale_independent":
            return function(ratio_x, ratio_y){
                       var gradient = add_vect(p1, p2);
                       var scaled_gradient = make_posn(((1 - ratio_x) / 2) * posn_x(gradient),
                                                       ((1 - ratio_y) / 2) * posn_y(gradient));
                       var center = add_vect(p0, scaled_gradient);
                       return make_frame(center,
                                         scale_vect(ratio_x, p1),
                                         scale_vect(ratio_y, p2),
                                         z1,
                                         z2);
                   }
        case "translate":
            return function(x, y){
                       return make_frame(add_vect(add_vect(p0, scale_vect(x, p1)), scale_vect(y, p2)),
                                         p1,
                                         p2,
                                         z1,
                                         z2);
                   }
    }
}

// Basic painter combinators

function stack(painter1, painter2){
    return stack_frac(1/2, painter1, painter2);
}

function stack_frac(frac, painter1, painter2){
    return function(vp, frame){
               var uf = process_frame("top_frac", frame)(frac);
               var lf = process_frame("bottom_frac", frame)(1 - frac);
               painter1(vp, uf);
               painter2(vp, lf);
           }
}

function rotate(rad, painter){
    return function(vp, frame){
               painter(vp, process_frame("rotate", frame)(rad));
           }    
}

function eigth_turn_left(painter){
    return rotate(Math.PI / 4, painter);    
}

function quarter_turn_right(painter){
    return function(vp, frame){
               painter(vp, process_frame("rotate90", frame));
           }    
}

function flip_horiz(painter){
    return function(vp, frame){
               painter(vp, process_frame("flip_horiz", frame));
           }    
}

function flip_vert(painter){
    return function(vp, frame){
               painter(vp, process_frame("flip_vert", frame));
           }    
}

function overlay(painter1, painter2){
    return overlay_frac(1/2, painter1, painter2);    
}

function overlay_frac(frac, painter1, painter2){
    return function(vp, frame){
               if((1 < frac) || (frac < 0)){
                   error("overlay_frac: invalid fraction");
               }else{
                   var df = process_frame("deep_frac", frame)(frac);
                   var sf = process_frame("shallow_frac", frame)(frac);
                   painter2(vp, df);
                   painter1(vp, sf);
               }
           }
}

function scale_independent(ratio_x, ratio_y, painter){
    return function(vp, frame){
               painter(vp, process_frame("scale_independent", frame)(ratio_x, ratio_y));
           }
}

function scale(ratio, painter){
    return scale_independent(ratio, ratio, painter);
}

// Translate the painter. Note that positive x means rigt translate
// positive y means translate down.

function translate(x, y, painter){
    return function(vp, frame){
               painter(vp, process_frame("translate", frame)(x, y));
           }
}

// Painter combinations defined in lecture 2
function turn_upside_down(painter){
    return quarter_turn_right(quarter_turn_right(painter));
}

function quarter_turn_left(painter){
    return turn_upside_down(quarter_turn_right(painter));
}

function beside(painter1, painter2){
    return quarter_turn_right(stack(quarter_turn_left(painter2),
                                    quarter_turn_left(painter1)));
}

function make_cross(painter){
    return stack(beside(quarter_turn_right(painter),
                        turn_upside_down(painter)), 
                 beside(painter,
                        quarter_turn_left(painter)));
}

function repeat_pattern(n, pat, pic){
    if(n === 0){
        return pic;
    }else{
        return pat(repeat_pattern(n-1, pat, pic));
    }
}

function stackn(n, painter){
    if(n === 1){
        return painter;
    }else{
        return stack_frac(1/n, painter, stackn(n - 1, painter));
    }
}

function anaglyph(painter)
{
    var MAX_X = Math.round(4/3*viewport_size)*antialias;
    var MAX_Y = viewport_size*antialias;
    var stereo = vp;
    var depth = open_pixmap("Depthmap Viewport", viewport_size,viewport_size);
          
    function get_depth(x,y, pix, width) //why pixels? i think creating and closing a few million contexts is not good...
    {
        if(x>=0&&x<MAX_X)
        {
            var tgt = 4*(y*width + x);
            if(pix[tgt+3] != 0)    
                return pix[tgt];
            else
                return 255;
        }
        else
            return 255;
    }
    
    painter(list(lp,rp), unit_frame);
    //for_each(function(x){document.body.appendChild(x)}, list(lp,rp)); //debug
    
    var lp_ctx = lp.getContext("2d");
    var rp_ctx = rp.getContext("2d");
    var lp_data = lp_ctx.getImageData(0,0,lp.width,lp.height);
    var rp_data = rp_ctx.getImageData(0,0,rp.width,rp.height);
    
    var stereo_ctx = stereo.getContext("2d");
    var stereo_data = stereo_ctx.getImageData(0,0,stereo.width, stereo.height);
    var lp_pix = lp_data.data;
    var rp_pix = rp_data.data; //putting this here instead of in the loop seems to help CORRECTNESS -.- wtf?!!?!
    var pixels = stereo_data.data;
    for(var y = 0;y<MAX_Y;y++)
        for(var x = 0;x<MAX_X;x++) //either that or x+1<MAX_X
        {
            var l = get_depth(x,y,lp_pix, lp.width); 
            var r = get_depth(x,y,rp_pix, rp.width);
            // (colour (make-rgb r l l)))
            var tgt = 4*(y*stereo.width + x);
            pixels[tgt] = r;
            pixels[tgt+1] = pixels[tgt+2] = l;
            pixels[tgt+3] = 255;
        }
    stereo_ctx.putImageData(stereo_data,0,0);
}
    
function stereogram(painter)
{
    var E = 300; //; distance between eyes, 300 pixels
    var D = 600; //distance between eyes and image plane, 600 pixels
    var delta = 40; //stereo seperation
    var MAX_X = Math.round(4/3*viewport_size);
    var MAX_Y = viewport_size;
    var MAX_Z = 0;
    var CENTRE = Math.round(MAX_X/2);
    var stereo = vp;
    var stereo_ctx = stereo.getContext("2d");
    var stereo_data = stereo_ctx.getImageData(0,0,stereo.width, stereo.height);
    var pixels = stereo_data.data;
    var temp = open_pixmap("temp", viewport_size, viewport_size);
    painter(temp, unit_frame);
    //document.body.appendChild(temp);
    
    var depth = open_pixmap("Depthmap Viewport", viewport_size/antialias,viewport_size/antialias);
    var depthctx = depth.getContext("2d");
    //document.body.appendChild(depth);
    depthctx.scale(1/antialias, 1/antialias);
    depthctx.drawImage(temp, 0 , 0);
    var depth_data = depthctx.getImageData(0,0,viewport_size, viewport_size);
    var depth_pix = depth_data.data;
    function get_depth(x,y)
    {
        if((x>=(1/6*viewport_size)) && (x<(MAX_X-(1/6*viewport_size))))
        {
            var tgt = 4*(y*viewport_size + x-(viewport_size/6));
            return -100*depth_pix[tgt]/255 - 400;
        }
        else
            return -500;
    }
    for(var y = 0;y<MAX_Y;y++)
    {
        //may want to use list of points instead
        var link_left = [];
        var link_right = [];
        var colours = [];
        //constraint creation
        for(var x = 0;x<MAX_X;x++)
        {
            var z = get_depth(x,y);
            var s = delta + z*(E/(z-D))// Determine distance between intersection of lines of sight on image plane
            var left = x - Math.round (s/2); //x is integer, left is integer
            var right = left + Math.round(s); //right is integer
            if((left>0)&&(right<MAX_X))
            {
                if((!link_right[left]||s<link_right[left]) && (!link_left[right]||s<link_left[right]))
                {
                    link_right[left] = Math.round(s);
                    link_left[right] = Math.round(s);
                }
            }
            /*(define (column-loop x) ; Runs through a row
              (let* ((z (get-depth x y)) ; Obtain depth
                     (s (+ (* z (/ E (- z D))) DELTA)) ; Determine distance between intersection
                                                       ; of lines of sight on image plane
                     (left (inexact->exact (- x (round-off (/ s 2))))) ; Determine coordinates of intersection of
                                                  ; line of sight from left eye
                     (right (inexact->exact (+ left (round-off s))))) ; Determine coordinates of intersection of
                                                 ; line of sight from right eye
                (if (and (> left 0) (< right MAX_X)) ; Proceed if within bounds
                    (if (and (or (not (vector-ref link-right left)) ; check if new contraint needs to be updated
                                 (< s (vector-ref link-right left))) ; update only if no constraint exist or
                             (or (not (vector-ref link-left right)) ; if new constraint is of a smaller separation
                                 (< s (vector-ref link-left right))))
                        (begin
                          (vector-set! link-right left (round-off s)) ; update right linkage
                          (vector-set! link-left right (round-off s))))) ; update left linkage
                (if (< (+ x 1) MAX_X) 
                    (column-loop (+ x 1)))))*/
        }
        //constraint resolution
        for(var x = 0;x<MAX_X;x++)
        {
        var s = link_left[x];
        if(s == undefined)
            s = Infinity;
        else
            s = x;
        var d;
        if((x-s)>0)
            d = link_right[x-s];
        else
            d = Infinity;
        if((s == Infinity)||(s>d))
            link_left[x] = 0;
        }
        //drawing step
        for(var x = 0;x<MAX_X;x++)
        {
            var s = link_left[x]; //should be valid for any integer till MAX_X
            var colour = colours[x-s] || [Math.round(Math.round(Math.random()*10/9)*255), 
                                          Math.round(Math.round(Math.random()*10/9)*255), 
                                          Math.round(Math.round(Math.random()*10/9)*255)];
            var tgt = 4*(y*stereo.width+x);
            pixels[tgt] = colour[0];
            pixels[tgt+1] = colour[1];
            pixels[tgt+2] = colour[2];
            pixels[tgt+3] = 255;
            colours[x] = colour;
        }
    }
    //throw on canvas
    var buffer = document.createElement("Canvas");
    buffer.width = stereo.width;
    buffer.height = stereo.height;
    buffer.getContext("2d").putImageData(stereo_data, 0, 0);
    stereo_ctx.scale(antialias, antialias);
    stereo_ctx.drawImage(buffer, 0 , 0);
}

function square(x){
    return x * x;
}

// Sample depth map.
// Note that radius1 should be < than radius2. Can you see why?
// How would you modify this such that the requirement is no longer necessary?
function create_conc_circle_zf(radius1, depth1, radius2, depth2){
    var a1_2 = square(radius1);
    var a2_2 = square(radius2);
    return function(x, y){
               function helper(x, y){
                   var x2_plus_y2 = square(x) + square(y);
                   if(x2_plus_y2 < a1_2){
                       return depth1;
                   }else if(x2_plus_y2 < a2_2){
                       return depth2;
                   }else{
                       return 1;
                   }
               }
               return helper(x - 300, y - 300);
           }
}

function hollusion(painter, ports) //ports optional 
{
    var frequency = 2;
    var MAX_X = Math.round(4/3*viewport_size);
    var MAX_Y = viewport_size;
    var num = (ports==null||(2 >= ports))? 3: ports; //(num (if (null? ports) 3 (if (< 2 (car ports)) (car ports) 3)))
    var buffers = build_list(num, function(x){return open_pixmap("buffer", 4/3*viewport_size,viewport_size)});  //build-list num (lambda (x) (open-pixmap "buffer" (* (/ 4 3) viewport-size) viewport-size)))
    var stereo = vp;
    
    function animation()
    {
        ports = append(tail(buffers), tail(reverse(buffers)));
        //for_each(function(x){document.body.appendChild(x)},ports);
        kill = false;
        self = null;
        self = function(message)
        {
            switch(message)
            {
                case "next":
                    if(!kill)
                    {
                        ports = append(tail(ports), list(head(ports)));
                        copy_viewport(head(ports), stereo);
                        setTimeout(self.next, 1000/(frequency * length(ports)));
                        //console.log("test");
                    }
                    break;
                case "kill":
                    kill = true;
                    console.log("killing");
                    //for_each(close_viewport, buffers); //not implemented
                    break;
                case "buffers":
                    return buffers;
            }
        }
        self.next = function(){self("next");}
        return self;
    }
    
    painter(buffers, unit_frame); //sigh, either not drawing or we have a synchronity issue
    if(active_hollusion!=null)
    {
        active_hollusion("kill");
        //(kill-thread hollussion-thread) not necessary since we not using thread but setTimeout instead.
    }
    
    active_hollusion = animation();
    active_hollusion.next();
    console.log("done");
}
