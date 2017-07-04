NeoPixel:
	# shared object for python
	swig -python NeoPixel.i
	gcc -lmraa -Wall -fPIC -x c -c NeoPixel.cpp NeoPixel_wrap.c  -I /usr/include/python2.7/
	gcc -lmraa -shared -o _NeoPixel.so NeoPixel.o NeoPixel_wrap.o

	# shared object for c
	gcc -lmraa -Wall -fPIC -x c -c NeoPixel.cpp
	gcc -lmraa -shared -o NeoPixel.so NeoPixel.o

	# shared object for nodejs
	swig -c++ -javascript -node -DV8_VERSION=0x045103 NeoPixel.i
	node-gyp configure
	node-gyp build
	
clean:
	rm NeoPixel_wrap.c *.o *.so