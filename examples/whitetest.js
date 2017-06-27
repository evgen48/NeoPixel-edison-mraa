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

var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion()); //write the mraa version to the console

var NPAPI = require("../src/build/Release/NeoPixel");
//console.log(NPAPI);

var channel = new NPAPI.ws2811_channel_t();
channel.gpionum=14;
channel.count=16;
channel.brightness=80;

var gpio = NPAPI.NPInit(channel);

var i = 0;
function periodicActivity()
{

   NPAPI.NPRLedSet(channel, i, 0x000000 );
   NPAPI.NPRender(channel, gpio);

//   console.log("off"+i);
   i = (i+1)%16;

   NPAPI.NPRLedSet(channel, i, 0xffffff );
   NPAPI.NPRender(channel, gpio);

//   console.log("on"+i);

   setTimeout(periodicActivity, 300); //call the indicated function after (100 milliseconds)
}

//periodicActivity(); ///call the periodicActivity function

var myDigitalPin1 = new m.Gpio(6); //setup digital read on pin 6
var myDigitalPin2 = new m.Gpio(7); //setup digital read on pin 6
var myDigitalPin3 = new m.Gpio(8); //setup digital read on pin 6
var myDigitalPin4 = new m.Gpio(9); //setup digital read on pin 6

myDigitalPin1.dir(m.DIR_IN); //set the gpio direction to input
myDigitalPin2.dir(m.DIR_IN); //set the gpio direction to input
myDigitalPin3.dir(m.DIR_IN); //set the gpio direction to input
myDigitalPin4.dir(m.DIR_IN); //set the gpio direction to input

periodicActivityButton(); //call the periodicActivity function

function periodicActivityButton() //
{
  var myDigitalValue1 = !myDigitalPin1.read(); //read the digital value of the pin
  //if (myDigitalValue1)console.log('1'); //write the read value out to the console
  var myDigitalValue2 = !myDigitalPin2.read(); //read the digital value of the pin
  //if (myDigitalValue2)console.log('2'); //write the read value out to the console
  var myDigitalValue3 = !myDigitalPin3.read(); //read the digital value of the pin
 // if (myDigitalValue3)console.log('3'); //write the read value out to the console
  var myDigitalValue4 = !myDigitalPin4.read(); //read the digital value of the pin
  //if (myDigitalValue4)console.log('4'); //write the read value out to the console
 
   for (i = 0; i < 16; i++) { 
      NPAPI.NPRLedSet(channel, i, 0x000000 );
   }

   var bits1 = (myDigitalValue1 ? 0xFF0000 : 0);
   var bits2 = (myDigitalValue2 ? 0xFFFF00 : 0);
   var bits3 = (myDigitalValue3 ? 0x00FF00 : 0);
   var bits4 = (myDigitalValue4 ? 0x0000ff : 0);
    
   var values = new Array(16);
   values.fill(bits1,0,4);
   values.fill(bits2,4,8);
   values.fill(bits3,8,12);
   values.fill(bits4,12,16);
   
   for (i = 0; i < 16; i++) { 
      NPAPI.NPRLedSet(channel, i, values[i] );
   }
   
   NPAPI.NPRender(channel, gpio);

  setTimeout(periodicActivityButton,50); //call the indicated function after 1 second (1000 milliseconds)
  
}

