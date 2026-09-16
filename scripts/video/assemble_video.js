const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BUILD_DIR = __dirname;
const DOCS_DIR = path.join(__dirname, '..', 'docs');

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

  // Act 1 Video
  console.log('Rendering Act 1...');
  run(`ffmpeg -y -loop 1 -i "${path.join(BUILD_DIR, 'slide_1.png')}" -i "${path.join(BUILD_DIR, 'act1.mp3')}" -c:v libx264 -tune stillimage -t ${d1} -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "${path.join(BUILD_DIR, 'act1.mp4')}"`);

  // Act 2 Video
  console.log('Rendering Act 2...');
  run(`ffmpeg -y -loop 1 -i "${path.join(BUILD_DIR, 'slide_2.png')}" -i "${path.join(BUILD_DIR, 'act2.mp3')}" -c:v libx264 -tune stillimage -t ${d2} -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "${path.join(BUILD_DIR, 'act2.mp4')}"`);

  // Act 3 Video (2 slides: 3_ai and 3_dash)
  console.log('Rendering Act 3...');
  const halfD3 = (d3 / 2).toFixed(2);
  const restD3 = (d3 - parseFloat(halfD3)).toFixed(2);

  // Video part of act3
  const act3List = path.join(BUILD_DIR, 'act3_images.txt');
  fs.writeFileSync(act3List, `file '${path.join(BUILD_DIR, 'slide_3_ai.png').replace(/\\/g, '/')}'\nduration ${halfD3}\nfile '${path.join(BUILD_DIR, 'slide_3_dash.png').replace(/\\/g, '/')}'\nduration ${restD3}\nfile '${path.join(BUILD_DIR, 'slide_3_dash.png').replace(/\\/g, '/')}'\n`);

  run(`ffmpeg -y -f concat -safe 0 -i "${act3List}" -i "${path.join(BUILD_DIR, 'act3.mp3')}" -c:v libx264 -tune stillimage -t ${d3} -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "${path.join(BUILD_DIR, 'act3.mp4')}"`);

  // Act 4 Video
  console.log('Rendering Act 4...');
  run(`ffmpeg -y -loop 1 -i "${path.join(BUILD_DIR, 'slide_4.png')}" -i "${path.join(BUILD_DIR, 'act4.mp3')}" -c:v libx264 -tune stillimage -t ${d4} -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "${path.join(BUILD_DIR, 'act4.mp4')}"`);

  // Act 5 Video
  console.log('Rendering Act 5...');
  run(`ffmpeg -y -loop 1 -i "${path.join(BUILD_DIR, 'slide_5.png')}" -i "${path.join(BUILD_DIR, 'act5.mp3')}" -c:v libx264 -tune stillimage -t ${d5} -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "${path.join(BUILD_DIR, 'act5.mp4')}"`);

  // Act 6 Video
  console.log('Rendering Act 6...');
  run(`ffmpeg -y -loop 1 -i "${path.join(BUILD_DIR, 'slide_6.png')}" -i "${path.join(BUILD_DIR, 'act6.mp3')}" -c:v libx264 -tune stillimage -t ${d6} -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "${path.join(BUILD_DIR, 'act6.mp4')}"`);

  // Concatenate all acts into the final output
  console.log('Concatenating all acts into final video...');
  const concatList = path.join(BUILD_DIR, 'concat_list.txt');
  fs.writeFileSync(concatList, [1, 2, 3, 4, 5, 6].map(i => `file '${path.join(BUILD_DIR, `act${i}.mp4`).replace(/\\/g, '/')}'`).join('\n'));

  const finalOutPath = path.join(DOCS_DIR, 'omniflow_intro_presentation.mp4');
  run(`ffmpeg -y -f concat -safe 0 -i "${concatList}" -c copy "${finalOutPath}"`);

  // Also copy to showcase public
  const showcasePublicOut = path.join(__dirname, '..', 'showcase', 'public', 'omniflow_intro_presentation.mp4');
  fs.copyFileSync(finalOutPath, showcasePublicOut);

  console.log(`FINAL_VIDEO_SAVED: ${finalOutPath}`);
  console.log(`COPIED_TO_PUBLIC: ${showcasePublicOut}`);
}

assemble().catch(err => {
  console.error('Assembly Error:', err);
  process.exit(1);
});
