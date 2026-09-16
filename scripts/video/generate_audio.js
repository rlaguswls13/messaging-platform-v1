const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BUILD_DIR = path.join(__dirname, '..', '..', '.video_build');
const TYPECAST_API_KEY = process.env.TYPECAST_API_KEY || '__plt6cLy8Fb5rzfV7FoRMXTBbZ3qt72DDDJ88k7X2QPJ';
const VOICE_ID = process.env.TYPECAST_VOICE_ID || 'tc_682e8798603b4e9ed84074f5'; // Hyeongjin (형진)

const ACTS = [
  {
    id: 'act1',
    text: "소상공인과 개인사업자 누구나 더 쉽고 직관적으로 실행할 수 있는 메시징 마케팅의 새로운 기준을 제시합니다. 바쁜 일상 속에서 매장을 운영하는 사장님들에게, 복잡한 발송 시스템과 까다로운 법률 요건은 늘 마케팅을 망설이게 만드는 커다란 장벽이었습니다. 옴니플로우는 이러한 기술적, 제도적 문턱을 낮추어, 개인사업자가 터치 몇 번만으로 단골 고객과 소통하고 매장 성장을 이끌어낼 수 있는 가장 직관적인 안심 마케팅 환경을 제공하고자 합니다."
  },
  {
    id: 'act2',
    text: "이제 개인사업자 사장님을 위한 가장 명쾌한 해답을 열어갑니다. 정보통신망법을 자동 준수하는 에이아이 비서와, 한눈에 파악되는 실시간 성과 대시보드를 하나로 결합한 소상공인 안심 마케팅 포털, 옴니플로우입니다. 사장님에게는 과태료 걱정 없는 쓰리스텝 안심 마케팅 도구를 제공하고, 1인 셀러부터 기업 고객까지, 향후 연계기관과의 전략적 제휴를 통해 더 넓은 잠재 고객 풀과 연결되는 새로운 상생 성장을 만들어가고자 합니다."
  },
  {
    id: 'act3',
    text: "프로토타입으로 구현된 실제 동작 화면을 보시죠. 사장님이 매장 사진 한 장만 업로드하면, 에이아이가 이미지와 키워드를 분석해 알림톡과 문자 완제 템플릿을 3초 만에 완성할 수 있습니다. 자체 세컨드 브레인 지식 베이스가 정보통신망법 제50조를 자동으로 검증해 광고 표기와 080 무료수신거부 번호를 완벽히 조립하며, 컨텍스트 슬라이싱 기술로 에이아이 토큰 비용을 90% 이상 절감할 수 있도록 설계했습니다. 오발송 방지를 위한 2단계 승인 게이트를 거쳐 발송하면, 구글 서치콘솔 스타일의 직관적인 대시보드에서 총 발송수와 오픈율, 클릭률, 순 도달수를 실시간 시계열로 분석할 수 있습니다."
  },
  {
    id: 'act4',
    text: "옴니플로우는 안정적인 백엔드 엔지니어링 기술을 바탕으로 아키텍처를 설계하고 있습니다. 네티 비동기 리액티브 엔진을 기반으로, 템플릿 병합과 개인화 데이터 주입 등 발송 전 내부 데이터 처리를 초당 약 2,000건 수준까지 원활하게 감당할 수 있도록 프로토타입 파이프라인을 구축해 검증했습니다. 특히 소상공인의 단골 고객 전화번호를 안전하게 보호하기 위해, 사업자별 독립 케이엠에스 암호키 분리와 대칭형 암호화를 활용한 가상 인프라 격리 보안 체계를 구성하고 있습니다. 이를 통해 플랫폼 운영자조차 고객 정보를 열람할 수 없는 높은 수준의 데이터 보안을 갖추어 나갈 계획입니다."
  },
  {
    id: 'act5',
    text: "수익 모델은 소상공인 구독과 연계기관과의 상생 모델을 중심으로 구체화하고 있습니다. 연계기관 사업자 계좌를 보유한 소상공인에게는, 연계기관 앱 소호 상생 플랜을 통해 월 0원에 에이아이 안심 템플릿과 기본 발송 혜택을 지원하는 상생 제휴 방안을 기획하고 있습니다. 소상공인은 고객 획득 비용 부담 없이 매장을 홍보할 수 있고, 연계기관은 앱 체류 시간 증대와 함께 메시징 충전 결제 주거래 계좌를 유치하는 긍정적인 상생 시너지를 창출할 수 있습니다. 낮은 인프라 원가 구조를 바탕으로, 건전하고 지속 가능한 비즈니스 모델을 차근차근 검증해 나갈 계획입니다."
  },
  {
    id: 'act6',
    text: "옴니플로우는 핵심 기능에 대한 프로토타입 기술 검증을 바탕으로, 구체적인 3단계 사업화 로드맵을 가지고 있습니다. 1단계 클라우드 환경 구축과 내부 알파테스트를 통해 시스템 안정성을 면밀히 확인하고, 2단계에서는 실제 소상공인 현장 베타테스트와 함께 연계기관 앱 인앱 연동 기술 규격을 순차적으로 실증할 계획입니다. 이후 검증된 데이터를 바탕으로 3단계 정식 연동과 상용 확장까지 차근차근 추진하고자 합니다. 소상공인을 위한 편리한 마케팅 비서이자 연계기관의 신뢰받는 상생 파트너로 발전할 수 있도록 최선을 다해 실행해 나가겠습니다. 경청해 주셔서 감사합니다."
  }
];

function synthesizeAct(act) {
  return new Promise((resolve, reject) => {
    console.log(`[Typecast API] Synthesizing ${act.id} with voice ${VOICE_ID} (Hyeongjin)...`);

    const payload = JSON.stringify({
      model: 'ssfm-v30',
      voice_id: VOICE_ID,
      text: act.text,
      language: 'kor',
      prompt: {
        emotion_type: 'smart'
      },
      output: {
        audio_format: 'mp3',
        audio_tempo: 1.05
      }
    });

    const req = https.request({
      hostname: 'api.typecast.ai',
      path: '/v1/text-to-speech',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'X-API-KEY': TYPECAST_API_KEY,
        'User-Agent': 'typecast-direct/1 node typecast-integration/1 (source=api-docs; generated_by=antigravity)'
      }
    }, res => {
      if (res.statusCode !== 200) {
        let errData = '';
        res.on('data', d => errData += d);
        res.on('end', () => reject(new Error(`Typecast API returned HTTP ${res.statusCode}: ${errData}`)));
        return;
      }

      const rawPath = path.join(BUILD_DIR, `${act.id}_raw.mp3`);
      const fileStream = fs.createWriteStream(rawPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        console.log(`[Typecast API] Successfully received raw audio for ${act.id}`);
        // Add 0.8s silence padding for smooth act transitions
        const finalPath = path.join(BUILD_DIR, `${act.id}.mp3`);
        execSync(`ffmpeg -y -i "${rawPath}" -af "apad=pad_dur=0.8" -c:a libmp3lame -b:a 192k "${finalPath}"`);
        console.log(`[FFmpeg] Saved padded audio: ${finalPath}`);
        resolve(finalPath);
      });

      fileStream.on('error', reject);
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function generateAll() {
  console.log('=== Starting Typecast Audio Synthesis ===');
  for (const act of ACTS) {
    await synthesizeAct(act);
  }
  console.log('=== All 6 Acts Synthesized Successfully via Typecast API ===');
}

generateAll().catch(err => {
  console.error('Typecast Generation Error:', err);
  process.exit(1);
});
