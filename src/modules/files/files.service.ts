import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { spawn } from 'child_process';
import { IExchangeAudio } from 'src/interfaces/files.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpeg = require('fluent-ffmpeg');

@Injectable()
export class FilesService {
  async extractAudioFromVideo(video: string, audio: string) {
    return await new Promise((resolve) => {
      const response = spawn('ffmpeg', `-i ${video} ${audio}`.split(' '), {
        shell: true,
      });
      response.on('close', resolve);
      response.on('exit', resolve);
      response.stdout.on('error', (e) => {
        throw new InternalServerErrorException(
          'Something went wrong. ' + e.message,
        );
      });
    });
    // let output;
    // const chunks = [];
    // ffmpeg(video)
    //   .noVideo()
    //   .format('wav')
    //   .on('end', function () {
    //     output = Buffer.concat(chunks);
    //   })
    //   .on('error', function (err) {
    //     console.log('Error extracting audio:', err);
    //   })
    //   .pipe()
    //   .on('data', function (chunk) {
    //     // `chunk` represents the audio buffer
    //     console.log('Received audio chunk', chunk);
    //     chunks.push(chunk);
    //     // Process the audio buffer here as per your requirements
    //   });
    // return output;
  }

  async mergeAudioWithVideo({
    originAudio,
    originVideo,
    outputVideo,
  }: IExchangeAudio) {
    return await new Promise((resolve) => {
      const response = spawn(
        `ffmpeg`,
        `-i ${originVideo} -i ${originAudio} -c:v copy -map 0:v:0 -map 1:a:0 ${outputVideo}`.split(
          ' ',
        ),
        { shell: true },
      );

      response.on('close', resolve);
      response.on('exit', resolve);

      response.stdout.on('error', (e) => {
        throw new InternalServerErrorException(
          'Something went wrong. ' + e.message,
        );
      });
    });
  }
}
