const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', '..', '.video_build');
const DOCS_DIR = path.join(__dirname, '..', '..', 'docs');
const SHOWCASE_PUBLIC_DIR = path.join(__dirname, '..', '..', 'showcase', 'public');

function getDuration(filePath) {
  const out = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`).toString().trim();
  return parseFloat(out);
}

function run(cmd) {
  console.log(`Executing: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

async function assemble() {
  const d1 = getDuration(path.join(BUILD_DIR, 'act1.mp3'));
  const d2 = getDuration(path.join(BUILD_DIR, 'act2.mp3'));
  const d3 = getDuration(path.join(BUILD_DIR, 'act3.mp3'));
  const d4 = getDuration(path.join(BUILD_DIR, 'act4.mp3'));
  const d5 = getDuration(path.join(BUILD_DIR, 'act5.mp3'));
  const d6 = getDuration(path.join(BUILD_DIR, 'act6.mp3'));

  console.log(`Durations: Act1=${d1}s, Act2=${d2}s, Act3=${d3}s, Act4=${d4}s, Act5=${d5}s, Act6=${d6}s`);

  // 1. Concatenate all audio files into one continuous master audio stream
  console.log('Concatenating audios into master_audio.mp3...');
  const audioListFile = path.join(BUILD_DIR, 'audio_concat_list.txt');
  const audioFiles = [1, 2, 3, 4, 5, 6].map(i => `file '${path.join(BUILD_DIR, `act${i}.mp3`).replace(/\\/g, '/')}'`).join('\n');
  fs.writeFileSync(audioListFile, audioFiles);

  const masterAudioPath = path.join(BUILD_DIR, 'master_audio.mp3');
  run(`ffmpeg -y -f concat -safe 0 -i "${audioListFile}" -c:a libmp3lame -b:a 192k "${masterAudioPath}"`);
  const totalAudioDuration = getDuration(masterAudioPath);
  console.log(`Master Audio Duration: ${totalAudioDuration}s`);

  // 2. Build precise image sequence timeline
  // For Act 3, split between AI template demo and Search Console dashboard
  const halfD3 = (d3 / 2).toFixed(3);
  const restD3 = (d3 - parseFloat(halfD3)).toFixed(3);

  const imageTimelineFile = path.join(BUILD_DIR, 'video_timeline.txt');
  const timelineContent = [
    `file '${path.join(BUILD_DIR, 'slide_1.png').replace(/\\/g, '/')}'`,
    `duration ${d1.toFixed(3)}`,
    `file '${path.join(BUILD_DIR, 'slide_2.png').replace(/\\/g, '/')}'`,
    `duration ${d2.toFixed(3)}`,
    `file '${path.join(BUILD_DIR, 'slide_3_ai.png').replace(/\\/g, '/')}'`,
    `duration ${halfD3}`,
    `file '${path.join(BUILD_DIR, 'slide_3_dash.png').replace(/\\/g, '/')}'`,
    `duration ${restD3}`,
    `file '${path.join(BUILD_DIR, 'slide_4.png').replace(/\\/g, '/')}'`,
    `duration ${d4.toFixed(3)}`,
    `file '${path.join(BUILD_DIR, 'slide_5.png').replace(/\\/g, '/')}'`,
    `duration ${d5.toFixed(3)}`,
    `file '${path.join(BUILD_DIR, 'slide_6.png').replace(/\\/g, '/')}'`,
    `duration ${d6.toFixed(3)}`,
    // Final hold frame
    `file '${path.join(BUILD_DIR, 'slide_6.png').replace(/\\/g, '/')}'`
  ].join('\n');
  fs.writeFileSync(imageTimelineFile, timelineContent);

  // 3. Render complete video in a SINGLE unified pass (avoids any timestamp desync or Part 3 - Part 4 cutoff!)
  console.log('Rendering unified full video with FFmpeg...');
  const finalOutPath = path.join(DOCS_DIR, 'omniflow_intro_presentation.mp4');
  run(`ffmpeg -y -f concat -safe 0 -i "${imageTimelineFile}" -i "${masterAudioPath}" -c:v libx264 -tune stillimage -pix_fmt yuv420p -r 25 -c:a aac -b:a 192k -shortest -movflags +faststart "${finalOutPath}"`);

  // Copy to showcase public
  const showcasePublicOut = path.join(SHOWCASE_PUBLIC_DIR, 'omniflow_intro_presentation.mp4');
  fs.copyFileSync(finalOutPath, showcasePublicOut);

  console.log(`FINAL_VIDEO_SAVED: ${finalOutPath}`);
  console.log(`COPIED_TO_PUBLIC: ${showcasePublicOut}`);
}

assemble().catch(err => {
  console.error('Assembly Error:', err);
  process.exit(1);
});
