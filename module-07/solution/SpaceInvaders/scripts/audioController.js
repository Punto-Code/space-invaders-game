class AudioController {
  static sounds = [];

  constructor({ src, isLoop, volume }) {
    this.baseVolume = volume || 1.0;
    this.audio = new Audio(src);
    this.audio.loop = isLoop || false;
    this.audio.volume = this.baseVolume;
    AudioController.sounds.push(this);
  }

  play() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  resume() {
    this.audio.play();
  }

  static setVolumeForAll(multiplier) {
    return AudioController.sounds.map((sound) => {
      sound.audio.volume = sound.baseVolume * multiplier;
      return sound;
    });
  }
  // ...
}
