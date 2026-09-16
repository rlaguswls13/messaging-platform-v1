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
    text: "단골 손님 한 명이라도 더 모으기 위해 보낸 마케팅 메시지. <|0.3s|> 하지만 (광고) 표기 하나, 080 수신거부 번호 하나 빠졌다는 이유로 최대 3,000만 원의 과태료를 물 수 있다는 사실, 알고 계셨습니까? <|0.3s|> 게다가 돈 들여 메시지를 보내도 손님이 열어는 봤는지 알 길 없는 답답한 깜깜이 발송에, 단골 외에는 새로운 손님을 끌어올 마케팅 방법도 막막했습니다. <|0.3s|> 소상공인 사장님들에게 고객 마케팅은 늘 불안하고 외로운 숙제였습니다."
  },
  {
    id: 'act2',
    text: "이제 소상공인을 위한 가장 완벽한 해답이 시작됩니다. <|0.3s|> 정보통신망법을 자동 준수하는 에이아이(AI) 비서와, 구글 서치콘솔형 실시간 성과 대시보드를 하나로! <|0.3s|> 소상공인 안심 마케팅 포털과 금융앱을 잇는 상생형 옴니채널 플랫폼, 옴니플로우입니다. <|0.3s|> 사장님에게는 과태료 걱정 없는 쓰리클릭(3-Click) 안심 마케팅 도구를 제공하고, 연계기관 금융앱과 연계하여 더 넓은 잠재 고객 풀과 연결되는 새로운 상생 성장을 만들어냅니다."
  },
  {
    id: 'act3',
    text: "실제 동작 화면을 보시죠. <|0.3s|> 사장님이 매장 포스터나 메뉴 사진 한 장만 업로드하면, 에이아이가 이미지와 키워드를 분석해 알림톡, 친구톡, 문자 템플릿을 3초 만에 완성합니다. <|0.3s|> 자체 세컨드 브레인 지식 베이스가 정보통신망법 제50조를 자동으로 검증해 (광고) 필수 표기와 080 무료수신거부 번호를 완벽히 조립하며, 컨텍스트 슬라이싱 기술로 에이아이 토큰 비용을 90% 이상 낮췄습니다. <|0.3s|> 오발송 방지를 위한 2단계 승인 게이트를 거쳐 발송하면, 구글 서치콘솔 스타일 대시보드에서 오픈율, 클릭률, 순 도달수를 실시간 시계열로 분석할 수 있습니다."
  },
  {
    id: 'act4',
    text: "옴니플로우는 탄탄한 백엔드 엔지니어링 기술로 구현되었습니다. <|0.3s|> 자체 개발한 네티(Netty) 비동기 리액티브 엔진으로, 템플릿 병합과 개인화 데이터 주입 등 발송 전 내부 처리를 초당 약 2,000건 수준으로 고속 처리합니다. <|0.3s|> 특히 소상공인의 단골 고객 전화번호를 금융권 수준으로 보호하기 위해 사업자별 독립 케이엠에스(KMS) 암호키 분리와 대칭형 암호화를 기본 적용했습니다. <|0.3s|> 플랫폼 운영자조차 고객 정보를 절대 열람할 수 없는 완벽한 데이터 보안을 보장합니다."
  },
  {
    id: 'act5',
    text: "수익 모델은 금융기관과의 긴밀한 '상생'에 있습니다. <|0.3s|> 연계기관 사업자 계좌를 보유한 소상공인에게는 '금융앱 소호(SOHO) 상생 플랜'을 통해 월 0원에 에이아이 안심 템플릿과 기본 발송 혜택을 지원합니다. <|0.3s|> 소상공인은 고객 획득 비용 부담 없이 매장을 홍보하고, 연계기관은 금융앱 체류 시간 증대와 함께 메시징 충전금 자동이체 주거래 계좌를 유치하여 저원가성 예금 잔액을 증대시킵니다. <|0.3s|> 인프라 원가 기반의 단위 경제성과 구독 모델로 건강하고 지속 가능한 흑자 구조를 증명합니다."
  },
  {
    id: 'act6',
    text: "옴니플로우는 핵심 기술 프로토타입 검증을 마쳤으며, <|0.3s|> 1단계 클라우드 알파테스트부터 2단계 소상공인 현장 베타와 금융앱 인앱 연동성 실증, 그리고 3단계 연계기관 금융앱 인앱 정식 오픈까지 단계별 실행 준비를 모두 마쳤습니다. <|0.3s|> 소상공인의 든든한 마케팅 비서이자 연계기관의 신뢰받는 상생 파트너, 옴니플로우가 대한민국 골목상권의 새로운 도약을 열겠습니다. <|0.4s|> 감사합니다."
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
