const { MsEdgeTTS, OUTPUT_FORMAT } = require('./node_modules/msedge-tts');
const fs = require('fs');
const path = require('path');

const ACTS = [
  {
    id: 'act1',
    text: "단골 손님 한 명이라도 더 모으기 위해 보낸 마케팅 메시지. 하지만 (광고) 표기 하나, 080 수신거부 번호 하나 빠졌다는 이유로 최대 3,000만 원의 과태료를 물 수 있다는 사실, 알고 계셨습니까? 게다가 돈 들여 메시지를 보내도 손님이 열어는 봤는지 알 길 없는 답답한 '깜깜이 발송'에, 단골 외에는 새로운 손님을 끌어올 마케팅 방법도 막막했습니다. 소상공인 사장님들에게 고객 마케팅은 늘 불안하고 외로운 숙제였습니다."
  },
  {
    id: 'act2',
    text: "이제 소상공인을 위한 가장 완벽한 해답이 시작됩니다. 정보통신망법을 자동 준수하는 AI 비서와, 구글 서치콘솔형 실시간 성과 대시보드를 하나로! 소상공인 안심 마케팅 포털과 금융앱을 잇는 상생형 옴니채널 플랫폼, 옴니플로우(OmniFlow)입니다. 사장님에게는 과태료 걱정 없는 3-Click 안심 마케팅 도구를 제공하고, 금융앱과 연계하여 더 넓은 잠재 고객 풀과 연결되는 새로운 상생 성장을 만들어냅니다."
  },
  {
    id: 'act3',
    text: "실제 동작 화면을 보시죠. 사장님이 매장 포스터나 메뉴 사진 한 장만 업로드하면, AI가 이미지와 키워드를 분석해 알림톡·친구톡·문자 템플릿을 3초 만에 완성합니다. 자체 2nd Brain 지식 베이스가 정보통신망법 제50조를 자동으로 검증해 (광고) 필수 표기와 080 무료수신거부 번호를 완벽히 조립하며, Context Slicing 기술로 AI 토큰 비용을 90% 이상 낮췄습니다. 오발송 방지를 위한 2단계 승인 게이트를 거쳐 발송하면, 구글 서치콘솔 스타일 대시보드에서 오픈율, 클릭률, 순 도달수를 실시간 시계열로 분석할 수 있습니다."
  },
  {
    id: 'act4',
    text: "옴니플로우는 탄탄한 백엔드 엔지니어링 기술로 구현되었습니다. 자체 개발한 Netty 비동기 리액티브 엔진으로, 템플릿 병합과 개인화 데이터 주입 등 발송 전 내부 처리를 초당 약 2,000건 수준으로 고속 처리합니다. 특히 소상공인의 단골 고객 전화번호를 금융권 수준으로 보호하기 위해 사업자별 독립 KMS 암호키 분리와 AES-256-GCM 양방향 암호화를 기본 적용했습니다. 플랫폼 운영자조차 고객 정보를 절대 열람할 수 없는 완벽한 데이터 보안을 보장합니다."
  },
  {
    id: 'act5',
    text: "수익 모델은 금융기관과의 긴밀한 '상생'에 있습니다. 하나은행 사업자 계좌를 보유한 소상공인에게는 '하나원큐 SOHO 상생 플랜'을 통해 월 0원에 AI 안심 템플릿과 기본 발송 혜택을 지원합니다. 소상공인은 고객 획득 비용(CAC) 부담 없이 매장을 홍보하고, 하나은행은 금융앱 체류 시간 증대와 함께 메시징 충전금 자동이체 주거래 계좌를 유치하여 저원가성 예금 잔액을 증대시킵니다. 인프라 원가 기반의 단위 경제성과 구독 모델로 건강하고 지속 가능한 흑자 구조를 증명합니다."
  },
  {
    id: 'act6',
    text: "옴니플로우는 핵심 기술 프로토타입 검증을 마쳤으며, 1단계 클라우드 알파테스트부터 2단계 소상공인 현장 베타와 금융앱 인앱 연동성 실증, 그리고 3단계 하나은행 인앱 정식 오픈까지 단계별 실행 준비를 모두 마쳤습니다. 소상공인의 든든한 마케팅 비서이자 하나은행의 신뢰받는 상생 파트너, 옴니플로우가 대한민국 골목상권의 새로운 도약을 열겠습니다. 감사합니다."
  }
];

async function generateAll() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata('ko-KR-InJoonNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  for (const act of ACTS) {
    console.log(`Generating audio for ${act.id}...`);
    const stream = await tts.toStream(act.text);
    const outPath = path.join(__dirname, `${act.id}.mp3`);
    const file = fs.createWriteStream(outPath);
    await new Promise((resolve, reject) => {
      stream.audioStream.pipe(file);
      file.on('finish', resolve);
      file.on('error', reject);
    });
    console.log(`Saved ${outPath}`);
  }
  console.log('ALL_AUDIO_GENERATED_SUCCESSFULLY');
}

generateAll().catch(err => {
  console.error('TTS Generation Error:', err);
  process.exit(1);
});
