import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { spawn } from 'child_process';
import { IExchangeAudio } from 'src/interfaces/files.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpeg = require('fluent-ffmpeg');

@Injectable()
export class FilesService {
  // constructor(
  // @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  // ) {}
  // async saveFile(filename: string, file: any) {
  //   const storage = this.firebase.storage.bucket();
  //   await storage.file(filename).save(file, { gzip: true });
  // }
  async extractAudioFromVideo(video: string, audio: string) {
    const response = spawn('sudo ffmpeg', `-i ${video} ${audio}`.split(' '), {
      shell: true,
    });

    response.stdout.on('error', (e) => {
      throw new InternalServerErrorException(
        'Something went wrong. ' + e.message,
      );
    });
  }

  async exchangeAudio({
    originAudio,
    originVideo,
    outputVideo,
  }: IExchangeAudio) {
    spawn(
      `ffmpeg`,
      `-i ${originVideo} -i ${originAudio} -c:v copy -map 0:v:0 -map 1:a:0 ${outputVideo}`.split(
        ' ',
      ),
      { shell: true },
    );
  }
}
