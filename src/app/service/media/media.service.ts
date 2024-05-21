import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor() { }

  isImage(file: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(file);
  }

  isVideo(file: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(file);
  }

  getMediaPath(path: string, file: string): string {
    return `${path}${file}`;
  }
}
