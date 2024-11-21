(
s.options.numBuffers = 1024 * 256;
s.options.memSize = 8192 * 32;
s.options.maxNodes = 1024 * 32;
s.options.numOutputBusChannels = 2; // total number of output channels
s.options.numInputBusChannels = 0;

s.waitForBoot {
    ~dirt = SuperDirt(2, s); // total number of output channels
	  ~dirt.loadSoundFiles;
    ~dirt.loadSoundFiles("/Users/luma/Documents/GitHub/lc/secondTidalPatch/sample/**"); // 01_xx, 02_xx.WAV
    s.sync; // wait for supercollider to finish booting up
    ~dirt.start(57120, 0 ! 12); // start superdirt, listening on port 57120, create twelve orbits each sending audio to channel 0
};
);