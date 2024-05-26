import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private sounds: Howl[] = [];

  constructor() {
    this.loadSounds();
  }

  private loadSounds(): void {
    this.sounds.push(new Howl({ src: ['assets/birds_sounds/1.wav'] }));
    this.sounds.push(new Howl({ src: ['assets/birds_sounds/2Crow.mp3'] }));
    this.sounds.push(new Howl({ src: ['assets/birds_sounds/3Ducks.wav'] }));
    this.sounds.push(new Howl({ src: ['assets/birds_sounds/4Pigeon.wav'] }));
    this.sounds.push(new Howl({ src: ['assets/birds_sounds/5.wav'] }));
    this.sounds.push(new Howl({ src: ['assets/birds_sounds/6Crow.wav'] }));
    this.sounds.push(new Howl({ src: ['assets/birds_sounds/7Eagle.mp3'] }));
    this.sounds.push(new Howl({ src: ['assets/birds_sounds/8Sparrow.wav'] }));
    this.sounds.push(new Howl({ src: ['assets/birds_sounds/9Oiseau.wav'] }));
    this.sounds.push(new Howl({ src: ['assets/birds_sounds/10Jastrzab.mp3'] }));
    this.sounds.push(new Howl({ src: ['assets/birds_sounds/11Wren.wav'] }));
  }

  playRandomSound(): void {
    const randomIndex = Math.floor(Math.random() * this.sounds.length);
    const randomSound = this.sounds[randomIndex];
    randomSound.play();
  }
}

