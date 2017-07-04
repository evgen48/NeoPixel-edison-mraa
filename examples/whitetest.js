/*
 * Author: Eugene Smirnov <o1o2o3o4o5@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion()); //write the mraa version to the console

const NPAPI = require("./build/Release/NeoPixel");

// Execution logic

const {channel, gpio} = initContext();

var i = 0;

periodicActivity(); //call the periodicActivity function


module.exports = periodicActivity;

// Definitions

function initContext() {
	let channel = new NPAPI.ws2811_channel_t();
	channel.gpionum    = 14; // connected neopixel on A0 pin on edison arduino board
	channel.count      = 16;
	channel.brightness = 255;
	const gpio = NPAPI.NPInit(channel);

	return {channel, gpio};
}

function periodicActivity() {
	setColor(channel, i, 0x000000);

	console.log("off"+i);

	i = newI(i);

	setColor(channel, i, 0x0F0F0F);

	console.log("on" + i);

 	//call again in a second
	setTimeout(periodicActivity, 1000);
}

const setColor = (channel, index, value) => {
	NPAPI.NPRLedSet(channel, i, 0x0F0F0F );
   	NPAPI.NPRender(channel, gpio);
}

const newI = (i) => (i+1) % 16;
