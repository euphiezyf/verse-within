import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import {
  BarChart3,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Library,
  Mic,
  MoreVertical,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Square,
  Target,
  TimerReset,
  Trash2,
  Volume2,
} from "lucide-react";
import "./styles.css";

const STORAGE_KEY = "verse-within-state-v1";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const labels = {
  zh: {
    appName: "Verse Within",
    subtitle: "多语言圣经背诵",
    today: "本周作业",
    library: "经文库",
    practice: "背诵",
    stats: "统计",
    addVerse: "添加经文",
    language: "Language",
    libraryLanguage: "Library language",
    uiLanguage: "Language",
    account: "Account",
    signInWithGoogle: "Sign in with Google",
    signOut: "Sign out",
    cloudReady: "Cloud sync ready",
    cloudNotReady: "Add Supabase keys to connect cloud sync.",
    localModeTitle: "本地使用",
    localModeBody: "进度保存在这个浏览器。登录后可备份并在其他设备继续。",
    signedInTitle: "已登录",
    syncedTitle: "进度已备份",
    unsyncedTitle: "这台设备的进度尚未备份",
    syncNow: "立即合并",
    syncLater: "稍后再说",
    mergeProgress: "合并进度",
    useAccountProgress: "使用账号进度",
    syncDialogTitle: "选择这台设备的起点",
    syncDialogBody: "我们发现这台设备和你的账号可能有不同进度。合并会保留已完成记录、较高练习进度，并合并错词。",
    deviceProgress: "这台设备",
    accountProgress: "你的账号",
    versesCount: "节经文",
    completedCount: "已完成",
    lastPracticed: "最近练习",
    lastSynced: "上次同步",
    justNow: "刚刚",
    noCloudProgress: "账号里还没有进度",
    syncError: "同步失败，请稍后再试。",
    reference: "经文出处",
    collection: "分类",
    verseText: "经文内容",
    save: "保存",
    saveAndPractice: "保存并开始背诵",
    cancel: "取消",
    autoDetect: "自动识别",
    pasteFirst: "先粘贴经文",
    verseDetails: "经文信息",
    search: "搜索经文、出处或分类",
    read: "朗读",
    cloze: "填空",
    hide: "遮词",
    firstLetter: "首字母",
    recall: "默写",
    speech: "语音",
    speakAloud: "大声背诵",
    type: "打字",
    hint: "提示",
    nextStep: "下一步",
    difficulty: "难度",
    fill25: "挖空 25%",
    fill50: "挖空 50%",
    fill75: "挖空 75%",
    fillAll: "全部挖空",
    moreActions: "更多操作",
    deleteVerse: "删除经文",
    deleteConfirm: "确定删除这节经文吗？",
    check: "检查",
    next: "下一节",
    again: "再练一次",
    mastered: "已掌握",
    assignment: "作业",
    activeAssignments: "进行中",
    completedAssignments: "已完成",
    setForWeek: "设为本周",
    removeFromWeek: "移出本周",
    activeThisWeek: "本周背诵",
    markComplete: "完成本节",
    completed: "已完成",
    completedOn: "完成于",
    reactivateWarning: "这节经文已经完成。重新设为本周作业会清除完成状态，并把练习进度重置到 0。",
    noActiveAssignments: "本周作业都完成了。可以去经文库添加或选择新的经文。",
    dueNow: "现在复习",
    tomorrow: "明天",
    days: "天后",
    streak: "连续天数",
    masteredCount: "掌握经文",
    accuracy: "平均准确率",
    heatmap: "错词热区",
    resetHeat: "清零热区",
    resetAllHeat: "全部清零",
    emptyHeat: "练习后会显示最容易忘记的词。",
    pasteAny: "粘贴中英韩任意经文，系统会按语言自动分词。",
    benchmark: "参考 Bible Memory 的三步背诵：先读、再遮、最后主动回忆。",
    system: "跟随系统",
    en: "English",
    ko: "한국어",
    zhName: "中文",
    all: "全部",
    custom: "自定义",
    review: "复习",
    typeHere: "在这里输入你记得的内容",
    typeVerseAndRef: "默写经文，最后写上出处",
    recitePrompt: "凭记忆大声背诵。系统会把听到的内容写在下方，方便你检查。",
    transcriptLabel: "听写结果",
    referenceAtEnd: "背诵时出处放在末尾",
    listen: "听经文",
    startSpeaking: "开始背诵",
    stopSpeaking: "停止",
    speechUnsupported: "这个浏览器暂不支持语音识别，可先用键盘默写。",
    fillBlanks: "填写空格",
    blankHint: "选择挖空比例，自由调整难度。",
    tapToReveal: "点击灰色方块临时显示该词，再点一次隐藏。",
    showAll: "全部显示",
    hide25: "隐藏 25%",
    hide50: "隐藏 50%",
    hide75: "隐藏 75%",
    hideAll: "全部隐藏",
    answer: "答案",
    trouble: "需要多看",
    clean: "很稳",
    noVerses: "还没有经文。先添加一节想背的经文。",
  },
  en: {
    appName: "Verse Within",
    subtitle: "Multilingual Bible memory",
    today: "This week",
    library: "Library",
    practice: "Practice",
    stats: "Stats",
    addVerse: "Add verse",
    language: "Language",
    libraryLanguage: "Library language",
    uiLanguage: "Language",
    account: "Account",
    signInWithGoogle: "Sign in with Google",
    signOut: "Sign out",
    cloudReady: "Cloud sync ready",
    cloudNotReady: "Add Supabase keys to connect cloud sync.",
    localModeTitle: "Using this device",
    localModeBody: "Progress is saved in this browser. Sign in to back up and continue on other devices.",
    signedInTitle: "Signed in",
    syncedTitle: "Progress backed up",
    unsyncedTitle: "This device has progress not backed up",
    syncNow: "Merge now",
    syncLater: "Decide later",
    mergeProgress: "Merge progress",
    useAccountProgress: "Use account progress",
    syncDialogTitle: "Choose how to start on this device",
    syncDialogBody: "We found progress on this device and in your account. Merge keeps completed verses, stronger practice progress, and combines trouble words.",
    deviceProgress: "This device",
    accountProgress: "Your account",
    versesCount: "verses",
    completedCount: "completed",
    lastPracticed: "last practiced",
    lastSynced: "Last synced",
    justNow: "just now",
    noCloudProgress: "No account progress yet",
    syncError: "Sync failed. Please try again.",
    reference: "Reference",
    collection: "Collection",
    verseText: "Verse text",
    save: "Save",
    saveAndPractice: "Save and practice",
    cancel: "Cancel",
    autoDetect: "Auto-detect",
    pasteFirst: "Paste the verse first",
    verseDetails: "Verse details",
    search: "Search verses, references, collections",
    read: "Read",
    cloze: "Fill",
    hide: "Hide",
    firstLetter: "First letter",
    recall: "Recall",
    speech: "Voice",
    speakAloud: "Speak aloud",
    type: "Type",
    hint: "Hint",
    nextStep: "Next step",
    difficulty: "Difficulty",
    fill25: "Fill 25%",
    fill50: "Fill 50%",
    fill75: "Fill 75%",
    fillAll: "Fill all",
    moreActions: "More actions",
    deleteVerse: "Delete verse",
    deleteConfirm: "Delete this verse?",
    check: "Check",
    next: "Next verse",
    again: "Practice again",
    mastered: "Mastered",
    assignment: "Assignment",
    activeAssignments: "Active",
    completedAssignments: "Completed",
    setForWeek: "Set for week",
    removeFromWeek: "Remove from this week",
    activeThisWeek: "This week",
    markComplete: "Mark complete",
    completed: "Completed",
    completedOn: "Completed",
    reactivateWarning: "This verse is already complete. Setting it for this week will clear completion and reset progress to 0.",
    noActiveAssignments: "All assignments are complete. Add or choose another verse from the library.",
    dueNow: "Due now",
    tomorrow: "Tomorrow",
    days: "days",
    streak: "Streak",
    masteredCount: "Mastered",
    accuracy: "Avg. accuracy",
    heatmap: "Trouble heat map",
    resetHeat: "Reset heat map",
    resetAllHeat: "Reset all",
    emptyHeat: "Difficult words will appear after practice.",
    pasteAny: "Paste English, Chinese, Korean, or any language.",
    benchmark: "Inspired by Bible Memory's read, hide, and active recall flow.",
    system: "System",
    en: "English",
    ko: "한국어",
    zhName: "中文",
    all: "All",
    custom: "Custom",
    review: "Review",
    typeHere: "Type what you remember",
    typeVerseAndRef: "Write the verse, then the reference at the end",
    recitePrompt: "Recite from memory. What the app hears will appear below so you can check it.",
    transcriptLabel: "What the app heard",
    referenceAtEnd: "Reference belongs at the end",
    listen: "Listen",
    startSpeaking: "Start reciting",
    stopSpeaking: "Stop",
    speechUnsupported: "Speech recognition is not supported in this browser.",
    fillBlanks: "Fill the blanks",
    blankHint: "Choose how much to blank out and adjust the difficulty freely.",
    tapToReveal: "Tap a gray block to reveal the word, then tap again to hide it.",
    showAll: "Show all",
    hide25: "Hide 25%",
    hide50: "Hide 50%",
    hide75: "Hide 75%",
    hideAll: "Hide all",
    answer: "Answer",
    trouble: "Needs review",
    clean: "Solid",
    noVerses: "No verses yet. Add one to begin.",
  },
  ko: {
    appName: "Verse Within",
    subtitle: "다국어 성경 암송",
    today: "이번 주 과제",
    library: "구절함",
    practice: "암송",
    stats: "통계",
    addVerse: "구절 추가",
    language: "언어",
    libraryLanguage: "구절함 언어",
    uiLanguage: "Language",
    account: "계정",
    signInWithGoogle: "Google로 로그인",
    signOut: "로그아웃",
    cloudReady: "클라우드 동기화 준비됨",
    cloudNotReady: "Supabase 키를 넣으면 클라우드 연결이 됩니다.",
    localModeTitle: "이 기기에서 사용 중",
    localModeBody: "진행도는 이 브라우저에 저장됩니다. 로그인하면 백업하고 다른 기기에서도 이어갈 수 있습니다.",
    signedInTitle: "로그인됨",
    syncedTitle: "진행도 백업됨",
    unsyncedTitle: "이 기기의 진행도가 아직 백업되지 않았습니다",
    syncNow: "지금 병합",
    syncLater: "나중에 결정",
    mergeProgress: "진행도 병합",
    useAccountProgress: "계정 진행도 사용",
    syncDialogTitle: "이 기기에서 시작할 방식을 선택하세요",
    syncDialogBody: "이 기기와 계정에 다른 진행도가 있을 수 있습니다. 병합하면 완료 기록, 더 높은 연습 진행도, 어려운 단어가 함께 보존됩니다.",
    deviceProgress: "이 기기",
    accountProgress: "내 계정",
    versesCount: "구절",
    completedCount: "완료",
    lastPracticed: "최근 연습",
    lastSynced: "마지막 동기화",
    justNow: "방금",
    noCloudProgress: "계정에 아직 진행도가 없습니다",
    syncError: "동기화에 실패했습니다. 잠시 후 다시 시도하세요.",
    reference: "본문",
    collection: "분류",
    verseText: "말씀",
    save: "저장",
    saveAndPractice: "저장하고 연습",
    cancel: "취소",
    autoDetect: "자동 감지",
    pasteFirst: "먼저 말씀 붙여넣기",
    verseDetails: "구절 정보",
    search: "구절, 본문, 분류 검색",
    read: "읽기",
    cloze: "빈칸",
    hide: "가리기",
    firstLetter: "첫 글자",
    recall: "암기 입력",
    speech: "음성",
    speakAloud: "소리 내어 암송",
    type: "타이핑",
    hint: "힌트",
    nextStep: "다음 단계",
    difficulty: "난이도",
    fill25: "25% 빈칸",
    fill50: "50% 빈칸",
    fill75: "75% 빈칸",
    fillAll: "전체 빈칸",
    moreActions: "더 보기",
    deleteVerse: "구절 삭제",
    deleteConfirm: "이 구절을 삭제할까요?",
    check: "확인",
    next: "다음 구절",
    again: "다시 연습",
    mastered: "완료",
    assignment: "과제",
    activeAssignments: "진행 중",
    completedAssignments: "완료됨",
    setForWeek: "이번 주로 설정",
    removeFromWeek: "이번 주에서 제거",
    activeThisWeek: "이번 주",
    markComplete: "완료 표시",
    completed: "완료됨",
    completedOn: "완료",
    reactivateWarning: "이미 완료된 구절입니다. 이번 주 과제로 다시 설정하면 완료 상태가 사라지고 진행도가 0으로 초기화됩니다.",
    noActiveAssignments: "이번 주 과제가 모두 완료되었습니다. 구절함에서 새 말씀을 추가하거나 선택하세요.",
    dueNow: "지금 복습",
    tomorrow: "내일",
    days: "일 후",
    streak: "연속",
    masteredCount: "암송 완료",
    accuracy: "평균 정확도",
    heatmap: "어려운 단어",
    resetHeat: "초기화",
    resetAllHeat: "전체 초기화",
    emptyHeat: "연습 후 어려운 단어가 표시됩니다.",
    pasteAny: "영어, 중국어, 한국어 구절을 붙여넣으세요.",
    benchmark: "Bible Memory처럼 읽기, 가리기, 회상 순서로 연습합니다.",
    system: "시스템",
    en: "English",
    ko: "한국어",
    zhName: "中文",
    all: "전체",
    custom: "사용자 정의",
    review: "복습",
    typeHere: "기억나는 내용을 입력하세요",
    typeVerseAndRef: "말씀을 쓰고 마지막에 본문을 쓰세요",
    recitePrompt: "기억나는 대로 소리 내어 암송하세요. 인식된 내용이 아래에 표시되어 확인할 수 있습니다.",
    transcriptLabel: "인식된 내용",
    referenceAtEnd: "본문은 마지막에 둡니다",
    listen: "듣기",
    startSpeaking: "암송 시작",
    stopSpeaking: "중지",
    speechUnsupported: "이 브라우저는 음성 인식을 지원하지 않습니다.",
    fillBlanks: "빈칸 채우기",
    blankHint: "빈칸 비율을 선택해 난이도를 자유롭게 조절하세요.",
    tapToReveal: "회색 칸을 누르면 단어가 보이고, 다시 누르면 숨겨집니다.",
    showAll: "전체 표시",
    hide25: "25% 숨김",
    hide50: "50% 숨김",
    hide75: "75% 숨김",
    hideAll: "전체 숨김",
    answer: "정답",
    trouble: "복습 필요",
    clean: "좋아요",
    noVerses: "아직 구절이 없습니다. 먼저 하나를 추가하세요.",
  },
};

const seedVerses = [
  {
    id: "john-3-16-en",
    reference: "John 3:16",
    language: "en",
    collection: "Gospel",
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    createdAt: "2026-06-23T00:00:00.000Z",
    progress: { level: 1, accuracy: 0, attempts: 0, nextReview: new Date().toISOString() },
    trouble: {},
  },
  {
    id: "john-3-16-zh",
    reference: "约翰福音 3:16",
    language: "zh",
    collection: "福音",
    text: "神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不至灭亡，反得永生。",
    createdAt: "2026-06-23T00:00:00.000Z",
    progress: { level: 1, accuracy: 0, attempts: 0, nextReview: new Date().toISOString() },
    trouble: {},
  },
  {
    id: "psalm-23-1-ko",
    reference: "시편 23:1",
    language: "ko",
    collection: "평안",
    text: "여호와는 나의 목자시니 내게 부족함이 없으리로다.",
    createdAt: "2026-06-23T00:00:00.000Z",
    progress: { level: 1, accuracy: 0, attempts: 0, nextReview: new Date().toISOString() },
    trouble: {},
  },
];

const oneToOneDisciplingPlan = {
  id: "one-to-one-discipling",
  type: "built-in",
  name: {
    en: "One-to-One Discipling",
    ko: "일대일 제자양육",
    zh: "一对一门徒训练",
  },
  weeks: [
    {
      weekNumber: 1,
      topic: {
        ko: "중심 되신 그리스도",
        en: "Christ the Center",
        zh: "以基督为中心",
      },
      verses: [{ reference: "Galatians 2:20" }, { reference: "John 15:5" }],
    },
    {
      weekNumber: 2,
      topic: {
        ko: "구원의 확신",
        en: "Assurance of Salvation",
        zh: "救恩的确据",
      },
      verses: [{ reference: "1 John 5:13" }, { reference: "John 5:24" }],
    },
    {
      weekNumber: 3,
      topic: {
        ko: "하나님의 속성",
        en: "The Attributes of God",
        zh: "神的属性",
      },
      verses: [{ reference: "1 Chronicles 29:11-12" }, { reference: "Psalm 36:5-6" }],
    },
    {
      weekNumber: 4,
      topic: {
        ko: "성경",
        en: "Scripture",
        zh: "圣经",
      },
      verses: [{ reference: "2 Timothy 3:16" }, { reference: "1 Peter 2:2" }],
    },
    {
      weekNumber: 5,
      topic: {
        ko: "기도",
        en: "Prayer",
        zh: "祷告",
      },
      verses: [{ reference: "John 15:7" }, { reference: "Philippians 4:6-7" }],
    },
    {
      weekNumber: 6,
      topic: {
        ko: "교제",
        en: "Fellowship",
        zh: "团契",
      },
      verses: [{ reference: "Romans 12:4-5" }, { reference: "John 13:34-35" }],
    },
    {
      weekNumber: 7,
      topic: {
        ko: "전도",
        en: "Evangelism",
        zh: "传福音",
      },
      verses: [{ reference: "Romans 1:16" }, { reference: "1 Peter 3:15" }],
    },
    {
      weekNumber: 8,
      topic: {
        ko: "성령 충만한 삶",
        en: "The Spirit-Filled Life",
        zh: "被圣灵充满的生活",
      },
      verses: [{ reference: "Ephesians 5:18" }, { reference: "Galatians 5:22-23" }],
    },
    {
      weekNumber: 9,
      topic: {
        ko: "시험을 이기는 삶",
        en: "Overcoming Temptation",
        zh: "胜过试探的生活",
      },
      verses: [{ reference: "1 Corinthians 10:13" }, { reference: "James 1:14-15" }],
    },
    {
      weekNumber: 10,
      topic: {
        ko: "순종하는 삶",
        en: "The Obedient Life",
        zh: "顺服的生活",
      },
      verses: [{ reference: "Romans 12:1" }, { reference: "Luke 9:23" }],
    },
    {
      weekNumber: 11,
      topic: {
        ko: "사역하는 삶",
        en: "The Serving Life",
        zh: "服事的生活",
      },
      verses: [{ reference: "1 Peter 2:9" }, { reference: "1 Corinthians 3:9" }],
    },
  ],
};

function getInitialLanguage() {
  const browser = navigator.language?.slice(0, 2);
  return ["zh", "en", "ko"].includes(browser) ? browser : "en";
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed?.verses?.length) {
      if (parsed.libraryLanguage) {
        return parsed.memoryPlan ? parsed : { ...parsed, memoryPlan: oneToOneDisciplingPlan };
      }
      return {
        ...parsed,
        libraryLanguage:
          parsed.practiceLanguage && parsed.practiceLanguage !== "system" ? parsed.practiceLanguage : "all",
        memoryPlan: oneToOneDisciplingPlan,
      };
    }
  } catch {
    // Ignore corrupt local data and start with defaults.
  }
  return {
    uiLanguage: getInitialLanguage(),
    libraryLanguage: "all",
    activeTab: "practice",
    memoryPlan: oneToOneDisciplingPlan,
    verses: seedVerses,
    session: { streak: 1, lastPracticeDate: new Date().toISOString().slice(0, 10) },
  };
}

function detectLanguage(text) {
  if (/[\uac00-\ud7af]/.test(text)) return "ko";
  if (/[\u3400-\u9fff]/.test(text)) return "zh";
  return "en";
}

function tokenize(text, language) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];
  if (language === "zh") {
    return Array.from(cleaned).filter((char) => !/\s/.test(char));
  }
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const granularity = language === "ko" ? "word" : "word";
    const segmenter = new Intl.Segmenter(language, { granularity });
    return Array.from(segmenter.segment(cleaned))
      .map((part) => part.segment.trim())
      .filter(Boolean);
  }
  return cleaned.split(/(\s+|[,.!?;:，。！？；：])/).filter((part) => part.trim());
}

function normalize(text) {
  return text
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "")
    .trim();
}

function scoreAnswer(answer, verse) {
  const expected = tokenize(memoryLine(verse), verse.language).filter((token) => normalize(token));
  const actual = tokenize(answer, verse.language).map(normalize).filter(Boolean);
  const trouble = {};
  let correct = 0;

  expected.forEach((token, index) => {
    const clean = normalize(token);
    if (actual[index] === clean) {
      correct += 1;
    } else {
      trouble[token] = (trouble[token] || 0) + 1;
    }
  });

  return {
    accuracy: expected.length ? Math.round((correct / expected.length) * 100) : 0,
    trouble,
  };
}

function memoryLine(verse) {
  return `${verse.text} ${verse.reference}`;
}

function isWordToken(token) {
  return Boolean(normalize(token));
}

function seededValue(seed, index) {
  const x = Math.sin(seed * 997 + index * 37.17) * 10000;
  return x - Math.floor(x);
}

function wordIndexesFor(tokens) {
  return tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => isWordToken(token))
    .map(({ index }) => index);
}

function drillIndexes(tokens, level, seed, densityOffset = 0, densityOverride = null) {
  const wordIndexes = tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => isWordToken(token))
    .map(({ index }) => index);
  const density = densityOverride ?? (level >= 4 ? 0.48 : level >= 2 ? 0.36 : 0.26);
  const targetCount = Math.max(1, Math.round(wordIndexes.length * Math.min(density + densityOffset, 0.68)));
  return new Set(
    wordIndexes
      .map((index, order) => ({ index, rank: seededValue(seed, index + order) }))
      .sort((a, b) => a.rank - b.rank)
      .slice(0, targetCount)
      .map(({ index }) => index),
  );
}

function scoreCloze(answers, tokens, blankIndexes) {
  const trouble = {};
  let correct = 0;
  const blanks = [];
  blankIndexes.forEach((tokenIndex) => {
    const expected = normalize(tokens[tokenIndex]);
    const actual = normalize(answers[tokenIndex] || "");
    const isCorrect = actual === expected;
    blanks.push({
      index: tokenIndex,
      expected: tokens[tokenIndex],
      actual: answers[tokenIndex] || "",
      correct: isCorrect,
    });
    if (isCorrect) {
      correct += 1;
    } else {
      trouble[tokens[tokenIndex]] = (trouble[tokens[tokenIndex]] || 0) + 1;
    }
  });
  return {
    accuracy: blankIndexes.length ? Math.round((correct / blankIndexes.length) * 100) : 100,
    mode: "cloze",
    blanks,
    trouble,
  };
}

function speechLanguage(language) {
  if (language === "zh") return "zh-CN";
  if (language === "ko") return "ko-KR";
  return "en-US";
}

function nextReviewDate(accuracy, currentLevel) {
  const days = accuracy >= 95 ? Math.min(currentLevel + 3, 14) : accuracy >= 75 ? 2 : 0;
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

function dueLabel(date, t) {
  const today = new Date();
  const next = new Date(date);
  const diff = Math.ceil((next.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / 86400000);
  if (diff <= 0) return t.dueNow;
  if (diff === 1) return t.tomorrow;
  return `${diff} ${t.days}`;
}

function isCompleted(verse) {
  return Boolean(verse.completedAt || verse.status === "completed");
}

function isActiveAssignment(verse) {
  return verse.status !== "library" && !isCompleted(verse);
}

function resetProgress() {
  return { level: 0, accuracy: 0, attempts: 0, nextReview: new Date().toISOString() };
}

function formatDateTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function verseKey(verse) {
  return normalize(verse.reference) + "::" + verse.language;
}

function latestDate(...values) {
  return values.filter(Boolean).sort().at(-1) || null;
}

function mergeTrouble(localTrouble = {}, cloudTrouble = {}) {
  const merged = { ...cloudTrouble };
  Object.entries(localTrouble || {}).forEach(([word, count]) => {
    merged[word] = (merged[word] || 0) + count;
  });
  return merged;
}

function strongerProgress(localProgress = resetProgress(), cloudProgress = resetProgress()) {
  const localScore = (localProgress.level || 0) * 1000 + (localProgress.accuracy || 0) * 10 + (localProgress.attempts || 0);
  const cloudScore = (cloudProgress.level || 0) * 1000 + (cloudProgress.accuracy || 0) * 10 + (cloudProgress.attempts || 0);
  const chosen = localScore >= cloudScore ? localProgress : cloudProgress;
  return {
    ...chosen,
    attempts: Math.max(localProgress.attempts || 0, cloudProgress.attempts || 0),
    level: Math.max(localProgress.level || 0, cloudProgress.level || 0),
    accuracy: Math.max(localProgress.accuracy || 0, cloudProgress.accuracy || 0),
    nextReview: latestDate(localProgress.nextReview, cloudProgress.nextReview) || new Date().toISOString(),
  };
}

function mergeVerse(localVerse, cloudVerse) {
  if (!localVerse) return cloudVerse;
  if (!cloudVerse) return localVerse;
  const localUpdated = localVerse.updatedAt || localVerse.completedAt || localVerse.createdAt || "";
  const cloudUpdated = cloudVerse.updatedAt || cloudVerse.completedAt || cloudVerse.createdAt || "";
  const newer = localUpdated >= cloudUpdated ? localVerse : cloudVerse;
  const completedAt = localVerse.completedAt || cloudVerse.completedAt;
  const active = isActiveAssignment(localVerse) || isActiveAssignment(cloudVerse);
  return {
    ...newer,
    id: newer.id || localVerse.id || cloudVerse.id,
    reference: newer.reference || localVerse.reference || cloudVerse.reference,
    language: newer.language || localVerse.language || cloudVerse.language,
    collection: newer.collection || localVerse.collection || cloudVerse.collection,
    text: newer.text || localVerse.text || cloudVerse.text,
    createdAt: localVerse.createdAt || cloudVerse.createdAt || new Date().toISOString(),
    updatedAt: latestDate(localVerse.updatedAt, cloudVerse.updatedAt) || new Date().toISOString(),
    status: completedAt ? "completed" : active ? "active" : "library",
    completedAt,
    progress: strongerProgress(localVerse.progress, cloudVerse.progress),
    trouble: mergeTrouble(localVerse.trouble, cloudVerse.trouble),
  };
}

function mergeVerseLists(localVerses, cloudVerses) {
  const byKey = new Map();
  [...cloudVerses, ...localVerses].forEach((verse) => {
    const key = verseKey(verse);
    byKey.set(key, mergeVerse(byKey.get(key), verse));
  });
  return Array.from(byKey.values()).sort((a, b) =>
    (b.updatedAt || b.createdAt || "").localeCompare(a.updatedAt || a.createdAt || ""),
  );
}

function verseToCloudRow(verse, userId) {
  const updatedAt = verse.updatedAt || verse.completedAt || verse.createdAt || new Date().toISOString();
  return {
    user_id: userId,
    reference: verse.reference,
    language: verse.language,
    collection: verse.collection || "",
    verse_text: verse.text || "",
    progress: { ...verse.progress, status: verse.status || "active", updatedAt },
    trouble: verse.trouble || {},
    completed_at: verse.completedAt || null,
    updated_at: updatedAt,
  };
}

function cloudRowToVerse(row) {
  const progress = row.progress || resetProgress();
  return {
    id: row.reference + "-" + row.language,
    reference: row.reference,
    language: row.language,
    collection: row.collection || "",
    text: row.verse_text || "",
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || progress.updatedAt || row.created_at || new Date().toISOString(),
    status: row.completed_at ? "completed" : progress.status || "library",
    completedAt: row.completed_at || undefined,
    progress: {
      level: progress.level || 0,
      accuracy: progress.accuracy || 0,
      attempts: progress.attempts || 0,
      nextReview: progress.nextReview || new Date().toISOString(),
    },
    trouble: row.trouble || {},
  };
}

function summarizeVerses(verses) {
  const completed = verses.filter((verse) => isCompleted(verse)).length;
  const dates = verses.flatMap((verse) => [verse.updatedAt, verse.completedAt, verse.progress?.nextReview]).filter(Boolean);
  return {
    verses: verses.length,
    completed,
    lastActivity: dates.sort().at(-1) || null,
  };
}

function App() {
  const [state, setState] = useState(loadState);
  const [authState, setAuthState] = useState({ loading: true, session: null, user: null });
  const [syncState, setSyncState] = useState({ mode: "local", loading: false, cloudVerses: [], lastSyncedAt: null, error: "" });
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(state.verses[0]?.id);
  const [mode, setMode] = useState("read");
  const [answer, setAnswer] = useState("");
  const [clozeAnswers, setClozeAnswers] = useState({});
  const [drillSeed, setDrillSeed] = useState(1);
  const [clozeDensity, setClozeDensity] = useState(0.25);
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    reference: "",
    collection: "",
    language: "custom",
    text: "",
  });

  const t = labels[state.uiLanguage] || labels.en;
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!supabase) {
      setAuthState({ loading: false, session: null, user: null });
      return;
    }

    let mounted = true;
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setAuthState({ loading: false, session: data.session || null, user: data.session?.user || null });
      })
      .catch(() => {
        if (!mounted) return;
        setAuthState({ loading: false, session: null, user: null });
      });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState({ loading: false, session, user: session?.user || null });
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!supabase || !authState.user) {
      setSyncState((current) => ({ ...current, mode: "local", loading: false, cloudVerses: [], error: "" }));
      return;
    }

    let cancelled = false;
    async function loadCloudProgress() {
      setSyncState((current) => ({ ...current, loading: true, error: "" }));
      const { data, error } = await supabase
        .from("verse_progress")
        .select("reference, language, collection, verse_text, progress, trouble, completed_at, created_at, updated_at")
        .eq("user_id", authState.user.id);
      if (cancelled) return;
      if (error) {
        setSyncState((current) => ({ ...current, loading: false, mode: "local", error: t.syncError }));
        return;
      }
      setSyncState({ mode: "pending", loading: false, cloudVerses: (data || []).map(cloudRowToVerse), lastSyncedAt: null, error: "" });
    }

    loadCloudProgress();
    return () => {
      cancelled = true;
    };
  }, [authState.user?.id, t.syncError]);

  useEffect(() => {
    if (!supabase || !authState.user || syncState.mode !== "synced") return;
    const timeout = window.setTimeout(() => {
      uploadVerses(state.verses, { quiet: true });
    }, 900);
    return () => window.clearTimeout(timeout);
  }, [state.verses, authState.user?.id, syncState.mode]);

  const filteredVerses = useMemo(() => {
    return state.verses.filter((verse) => {
      const languageMatch = state.libraryLanguage === "all" || verse.language === state.libraryLanguage;
      const haystack = `${verse.reference} ${verse.collection} ${verse.text}`.toLocaleLowerCase();
      return languageMatch && haystack.includes(query.toLocaleLowerCase());
    });
  }, [state.verses, state.libraryLanguage, query]);

  const activeAssignments = state.verses.filter((verse) => isActiveAssignment(verse));
  const selectedVerse =
    state.verses.find((verse) => verse.id === selectedId) || activeAssignments[0] || state.verses[0];

  useEffect(() => {
    if (state.verses.length && !state.verses.some((verse) => verse.id === selectedId)) {
      setSelectedId(state.verses[0].id);
      setAnswer("");
      setClozeAnswers({});
      setDrillSeed((seed) => seed + 1);
      setResult(null);
    }
  }, [state.verses, selectedId]);

  const activeAssignmentCount = activeAssignments.length;
  const completedAssignmentCount = state.verses.filter((verse) => isCompleted(verse)).length;
  const practiced = state.verses.filter((verse) => verse.progress.attempts > 0);
  const averageAccuracy = practiced.length
    ? Math.round(practiced.reduce((sum, verse) => sum + verse.progress.accuracy, 0) / practiced.length)
    : 0;
  const deviceSummary = summarizeVerses(state.verses);
  const accountSummary = summarizeVerses(syncState.cloudVerses);
  const showSyncChoice = Boolean(authState.user && syncState.mode === "pending" && !syncState.loading);
  const hasUnsyncedLocal = Boolean(authState.user && syncState.mode === "later");

  function updateUiLanguage(language) {
    setState((current) => ({ ...current, uiLanguage: language }));
  }

  function updateLibraryLanguage(language) {
    setState((current) => ({ ...current, libraryLanguage: language }));
  }

  async function signInWithGoogle() {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    });
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  async function uploadVerses(verses, options = {}) {
    if (!supabase || !authState.user) return false;
    if (!options.quiet) {
      setSyncState((current) => ({ ...current, loading: true, error: "" }));
    }
    const rows = verses.map((verse) => verseToCloudRow(verse, authState.user.id));
    if (!rows.length) {
      setSyncState((current) => ({ ...current, mode: "synced", loading: false, cloudVerses: [], lastSyncedAt: new Date().toISOString(), error: "" }));
      return true;
    }
    const { error } = await supabase.from("verse_progress").upsert(rows, { onConflict: "user_id,reference,language" });
    if (error) {
      setSyncState((current) => ({ ...current, loading: false, error: t.syncError }));
      return false;
    }
    const now = new Date().toISOString();
    setSyncState((current) => ({
      ...current,
      mode: "synced",
      loading: false,
      cloudVerses: verses,
      lastSyncedAt: now,
      error: "",
    }));
    return true;
  }

  async function mergeLocalWithAccount() {
    const merged = mergeVerseLists(state.verses, syncState.cloudVerses);
    setState((current) => ({ ...current, verses: merged }));
    await uploadVerses(merged);
  }

  function useAccountProgress() {
    if (!syncState.cloudVerses.length) return;
    setState((current) => ({ ...current, verses: syncState.cloudVerses }));
    setSyncState((current) => ({ ...current, mode: "synced", lastSyncedAt: new Date().toISOString(), error: "" }));
  }

  function decideLater() {
    setSyncState((current) => ({ ...current, mode: "later", error: "" }));
  }

  function saveVerse(event) {
    event.preventDefault();
    if (!form.reference.trim() || !form.text.trim()) return;
    const language = form.language === "custom" ? detectLanguage(form.text) : form.language;
    const verse = {
      id: `${Date.now()}`,
      reference: form.reference.trim(),
      collection: form.collection.trim() || t.custom,
      language,
      text: form.text.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: { level: 1, accuracy: 0, attempts: 0, nextReview: new Date().toISOString() },
      status: "active",
      trouble: {},
    };
    setState((current) => ({ ...current, verses: [verse, ...current.verses], activeTab: "practice" }));
    setSelectedId(verse.id);
    setShowForm(false);
    setForm({ reference: "", collection: "", language: "custom", text: "" });
    setMode("read");
    setAnswer("");
    setClozeAnswers({});
    setDrillSeed((seed) => seed + 1);
    setResult(null);
  }

  async function removeVerse(id) {
    const target = state.verses.find((verse) => verse.id === id);
    if (!target || !window.confirm(t.deleteConfirm)) return;
    setState((current) => ({
      ...current,
      verses: current.verses.filter((verse) => verse.id !== id),
    }));
    if (supabase && authState.user && syncState.mode === "synced" && target) {
      await supabase
        .from("verse_progress")
        .delete()
        .eq("user_id", authState.user.id)
        .eq("reference", target.reference)
        .eq("language", target.language);
    }
  }

  function resetTrouble(id) {
    setState((current) => ({
      ...current,
      verses: current.verses.map((verse) => (verse.id === id ? { ...verse, trouble: {}, updatedAt: new Date().toISOString() } : verse)),
    }));
  }

  function resetAllTrouble() {
    setState((current) => ({
      ...current,
      verses: current.verses.map((verse) => ({ ...verse, trouble: {}, updatedAt: new Date().toISOString() })),
    }));
  }

  function completeAssignment(id) {
    const nextActive = activeAssignments.find((verse) => verse.id !== id);
    setState((current) => ({
      ...current,
      verses: current.verses.map((verse) =>
        verse.id === id
          ? {
              ...verse,
              status: "completed",
              completedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              progress: { ...verse.progress, level: Math.max(verse.progress.level, 4) },
            }
          : verse,
      ),
    }));
    if (nextActive) {
      setSelectedId(nextActive.id);
      setMode("read");
      setAnswer("");
      setClozeAnswers({});
      setResult(null);
    }
  }

  function removeFromWeek(id) {
    const nextActive = activeAssignments.find((verse) => verse.id !== id);
    setState((current) => ({
      ...current,
      verses: current.verses.map((verse) =>
        verse.id === id
          ? {
              ...verse,
              status: "library",
              updatedAt: new Date().toISOString(),
            }
          : verse,
      ),
    }));
    if (nextActive) {
      setSelectedId(nextActive.id);
    }
    setMode("read");
    setAnswer("");
    setClozeAnswers({});
    setResult(null);
  }

  function setForWeek(id) {
    const target = state.verses.find((verse) => verse.id === id);
    if (!target) return;
    if (isCompleted(target) && !window.confirm(t.reactivateWarning)) return;
    setState((current) => ({
      ...current,
      verses: current.verses.map((verse) =>
        verse.id === id
          ? {
              ...verse,
              status: "active",
              completedAt: undefined,
              updatedAt: new Date().toISOString(),
              progress: isCompleted(verse) ? resetProgress() : verse.progress,
              trouble: isCompleted(verse) ? {} : verse.trouble,
            }
          : verse,
      ),
    }));
    setSelectedId(id);
    setMode("read");
    setAnswer("");
    setClozeAnswers({});
    setResult(null);
  }

  function recordPractice(nextResult) {
    if (!selectedVerse) return;
    setResult(nextResult);
    setState((current) => ({
      ...current,
      session: { ...current.session, lastPracticeDate: new Date().toISOString().slice(0, 10) },
      verses: current.verses.map((verse) => {
        if (verse.id !== selectedVerse.id) return verse;
        const level =
          nextResult.accuracy >= 95
            ? Math.min(verse.progress.level + 1, 6)
            : nextResult.accuracy >= 75
              ? Math.max(verse.progress.level, 2)
              : 1;
        const mergedTrouble = { ...verse.trouble };
        Object.entries(nextResult.trouble).forEach(([word, count]) => {
          mergedTrouble[word] = (mergedTrouble[word] || 0) + count;
        });
        return {
          ...verse,
          trouble: mergedTrouble,
          updatedAt: new Date().toISOString(),
          progress: {
            level,
            attempts: verse.progress.attempts + 1,
            accuracy: nextResult.accuracy,
            nextReview: nextReviewDate(nextResult.accuracy, level),
          },
        };
      }),
    }));
  }

  function checkAnswer(nextResult) {
    if (!selectedVerse) return;
    recordPractice(nextResult || scoreAnswer(answer, selectedVerse));
  }

  function nextVerse(direction = 1) {
    const versePool = activeAssignments.length ? activeAssignments : state.verses;
    if (!versePool.length) return;
    const index = versePool.findIndex((verse) => verse.id === selectedVerse?.id);
    const nextIndex = ((index === -1 ? 0 : index) + direction + versePool.length) % versePool.length;
    setSelectedId(versePool[nextIndex].id);
    setAnswer("");
    setClozeAnswers({});
    setDrillSeed((seed) => seed + 1);
    setResult(null);
    setMode("read");
  }

  return (
    <main className="app-shell">
      <section className="sidebar" aria-label="Verse Within navigation">
        <div className="brand">
          <div className="brand-mark">
            <BookOpen size={24} />
          </div>
          <div>
            <h1>{t.appName}</h1>
            <p>{t.subtitle}</p>
          </div>
        </div>

        <div className="stat-stack">
          <StatCard icon={<TimerReset size={18} />} label={t.today} value={activeAssignmentCount} />
          <StatCard icon={<Target size={18} />} label={t.completedAssignments} value={completedAssignmentCount} />
          <StatCard icon={<BarChart3 size={18} />} label={t.accuracy} value={`${averageAccuracy}%`} />
        </div>

        <nav className="tabs" aria-label="Primary">
          <TabButton icon={<Sparkles size={18} />} label={t.practice} active={state.activeTab === "practice"} onClick={() => setState((current) => ({ ...current, activeTab: "practice" }))} />
          <TabButton icon={<Library size={18} />} label={t.library} active={state.activeTab === "library"} onClick={() => setState((current) => ({ ...current, activeTab: "library" }))} />
          <TabButton icon={<BarChart3 size={18} />} label={t.stats} active={state.activeTab === "stats"} onClick={() => setState((current) => ({ ...current, activeTab: "stats" }))} />
        </nav>

        <div className="settings-panel">
          <label>
            <Settings size={16} />
            <span>{t.uiLanguage}</span>
          </label>
          <select value={state.uiLanguage} onChange={(event) => updateUiLanguage(event.target.value)}>
            <option value="zh">{t.zhName}</option>
            <option value="en">{t.en}</option>
            <option value="ko">{t.ko}</option>
          </select>
        </div>

        <div className="auth-panel">
          <div className="auth-panel-head">
            <span>{t.account}</span>
            <small>{supabase ? t.cloudReady : t.cloudNotReady}</small>
          </div>
          {authState.loading ? (
            <div className="auth-status">...</div>
          ) : authState.user ? (
            <>
              <div className="auth-user">
                <strong>{authState.user.email || authState.user.user_metadata?.full_name || t.signedInTitle}</strong>
                <small>{syncState.mode === "synced" ? t.syncedTitle : hasUnsyncedLocal ? t.unsyncedTitle : t.signedInTitle}</small>
              </div>
              {syncState.lastSyncedAt && (
                <p className="auth-note">
                  {t.lastSynced}: {t.justNow}
                </p>
              )}
              {syncState.error && <p className="auth-error">{syncState.error}</p>}
              {(showSyncChoice || hasUnsyncedLocal) && (
                <button className="secondary-button auth-button" onClick={mergeLocalWithAccount} disabled={syncState.loading}>
                  <span>{syncState.loading ? "..." : t.syncNow}</span>
                </button>
              )}
              <button className="ghost-button auth-button" onClick={signOut}>
                <span>{t.signOut}</span>
              </button>
            </>
          ) : (
            <>
              <div className="auth-user">
                <strong>{t.localModeTitle}</strong>
                <small>{t.localModeBody}</small>
              </div>
              <button className="primary-button auth-button" onClick={signInWithGoogle} disabled={!supabase}>
                <span>{t.signInWithGoogle}</span>
              </button>
            </>
          )}
        </div>
      </section>

      {showSyncChoice && (
        <div className="sync-overlay" role="dialog" aria-modal="true" aria-label={t.syncDialogTitle}>
          <section className="sync-dialog">
            <div>
              <h3>{t.syncDialogTitle}</h3>
              <p>{t.syncDialogBody}</p>
            </div>
            <div className="sync-compare">
              <SyncSummaryCard title={t.deviceProgress} summary={deviceSummary} t={t} />
              <SyncSummaryCard title={t.accountProgress} summary={accountSummary} t={t} emptyLabel={t.noCloudProgress} />
            </div>
            {syncState.error && <p className="auth-error">{syncState.error}</p>}
            <div className="sync-actions">
              <button className="primary-button" onClick={mergeLocalWithAccount} disabled={syncState.loading}>
                <span>{syncState.loading ? "..." : t.mergeProgress}</span>
              </button>
              <button className="secondary-button" onClick={useAccountProgress} disabled={!accountSummary.verses || syncState.loading}>
                <span>{t.useAccountProgress}</span>
              </button>
              <button className="ghost-button" onClick={decideLater}>
                <span>{t.syncLater}</span>
              </button>
            </div>
          </section>
        </div>
      )}

      <section className={`workspace workspace-${state.activeTab}`}>
        <header className="topbar">
          <div>
            <h2>{state.activeTab === "practice" ? t.practice : state.activeTab === "library" ? t.library : t.stats}</h2>
          </div>
          {state.activeTab === "stats" ? (
            <button
              className="secondary-button topbar-account"
              disabled={!supabase && !authState.user}
              onClick={authState.user ? signOut : signInWithGoogle}
            >
              <span>{authState.user ? t.signOut : t.signInWithGoogle}</span>
            </button>
          ) : (
            <button className="primary-button topbar-add" onClick={() => setShowForm(true)}>
              <Plus size={18} />
              <span>{t.addVerse}</span>
            </button>
          )}
        </header>

        {showForm && (
          <section className="add-panel" aria-label={t.addVerse}>
            <form onSubmit={saveVerse}>
              <label className="textarea-label primary-textarea">
                <span>{t.pasteFirst}</span>
                <textarea value={form.text} onChange={(event) => setForm({ ...form, text: event.target.value })} placeholder={t.pasteAny} />
              </label>
              <div className="form-section-title">{t.verseDetails}</div>
              <div className="form-grid">
                <label>
                  <span>{t.reference}</span>
                  <input value={form.reference} onChange={(event) => setForm({ ...form, reference: event.target.value })} placeholder="John 15:5" />
                </label>
                <label>
                  <span>{t.collection}</span>
                  <input value={form.collection} onChange={(event) => setForm({ ...form, collection: event.target.value })} placeholder="Gospel / 福音 / 평안" />
                </label>
                <label>
                  <span>{t.language}</span>
                  <select value={form.language} onChange={(event) => setForm({ ...form, language: event.target.value })}>
                    <option value="custom">{t.autoDetect}</option>
                    <option value="en">{t.en}</option>
                    <option value="zh">{t.zhName}</option>
                    <option value="ko">{t.ko}</option>
                  </select>
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className="ghost-button" onClick={() => setShowForm(false)}>
                  {t.cancel}
                </button>
                <button className="primary-button" type="submit">
                  <Check size={18} />
                  <span>{t.saveAndPractice}</span>
                </button>
              </div>
            </form>
          </section>
        )}

        {state.activeTab === "practice" && (
          <PracticeView
            t={t}
            verse={selectedVerse}
            mode={mode}
            setMode={setMode}
            answer={answer}
            setAnswer={setAnswer}
            clozeAnswers={clozeAnswers}
            setClozeAnswers={setClozeAnswers}
            drillSeed={drillSeed}
            clozeDensity={clozeDensity}
            setClozeDensity={setClozeDensity}
            reshuffleDrill={() => setDrillSeed((seed) => seed + 1)}
            result={result}
            setResult={setResult}
            checkAnswer={checkAnswer}
            nextVerse={nextVerse}
            resetTrouble={resetTrouble}
            completeAssignment={completeAssignment}
            isCompleted={selectedVerse ? isCompleted(selectedVerse) : false}
            hasActiveAssignments={activeAssignments.length > 0}
          />
        )}

        {state.activeTab === "library" && (
          <LibraryView
            t={t}
            verses={filteredVerses}
            query={query}
            setQuery={setQuery}
            selectedId={selectedVerse?.id}
            setSelectedId={setSelectedId}
            removeVerse={removeVerse}
            completeAssignment={completeAssignment}
            removeFromWeek={removeFromWeek}
            setForWeek={setForWeek}
            memoryPlan={state.memoryPlan}
            uiLanguage={state.uiLanguage}
            libraryLanguage={state.libraryLanguage}
            updateLibraryLanguage={updateLibraryLanguage}
            setTab={(tab) => setState((current) => ({ ...current, activeTab: tab }))}
          />
        )}

        {state.activeTab === "stats" && (
          <StatsView t={t} verses={state.verses} streak={state.session.streak} resetAllTrouble={resetAllTrouble} />
        )}
      </section>
    </main>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <div>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TabButton({ icon, label, active, onClick }) {
  return (
    <button className={`tab-button ${active ? "active" : ""}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function SyncSummaryCard({ title, summary, t, emptyLabel }) {
  return (
    <article className="sync-summary-card">
      <strong>{title}</strong>
      {summary.verses ? (
        <>
          <span>
            {summary.verses} {t.versesCount} · {summary.completed} {t.completedCount}
          </span>
          <small>
            {t.lastPracticed}: {summary.lastActivity ? formatDateTime(summary.lastActivity) : "-"}
          </small>
        </>
      ) : (
        <span>{emptyLabel}</span>
      )}
    </article>
  );
}

function PracticeView({
  t,
  verse,
  mode,
  setMode,
  answer,
  setAnswer,
  clozeAnswers,
  setClozeAnswers,
  drillSeed,
  clozeDensity,
  setClozeDensity,
  reshuffleDrill,
  result,
  setResult,
  checkAnswer,
  nextVerse,
  resetTrouble,
  completeAssignment,
  isCompleted,
  hasActiveAssignments,
}) {
  const recognitionRef = useRef(null);
  const clozeWrapRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [hideDensity, setHideDensity] = useState(0.25);
  const [recallInput, setRecallInput] = useState("type");
  const [showInitials, setShowInitials] = useState(false);
  const [revealedTokens, setRevealedTokens] = useState(new Set());

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop?.();
      window.speechSynthesis?.cancel?.();
    };
  }, [verse?.id]);

  if (!hasActiveAssignments) {
    return <div className="empty-state">{t.noActiveAssignments}</div>;
  }

  if (!verse) {
    return <div className="empty-state">{t.noVerses}</div>;
  }

  const displayLine = memoryLine(verse);
  const tokens = tokenize(displayLine, verse.language);
  const blankIndexSet =
    clozeDensity === 1
      ? new Set(wordIndexesFor(tokens))
      : drillIndexes(tokens, verse.progress.level, drillSeed, 0, clozeDensity);
  const hideIndexSet =
    hideDensity === 0
      ? new Set()
      : hideDensity === 1
        ? new Set(wordIndexesFor(tokens))
        : drillIndexes(tokens, verse.progress.level, drillSeed + 73, 0, hideDensity);
  const blankIndexes = Array.from(blankIndexSet);
  const clozeFeedback = new Map(
    result?.mode === "cloze" ? result.blanks.map((blank) => [blank.index, blank]) : [],
  );
  const troubleWords = Object.entries(verse.trouble).sort((a, b) => b[1] - a[1]).slice(0, 8);

  function switchMode(nextMode) {
    setMode(nextMode);
    setAnswer("");
    setClozeAnswers({});
    setResult(null);
    setSpeechError("");
    setRevealedTokens(new Set());
    setShowInitials(false);
    setRecallInput("type");
    if (nextMode === "cloze" || nextMode === "hide") {
      reshuffleDrill();
    }
  }

  function updateClozeAnswer(index, value) {
    setClozeAnswers((current) => ({ ...current, [index]: value }));
  }

  function checkCurrentMode() {
    if (mode === "cloze") {
      const liveAnswers = { ...clozeAnswers };
      clozeWrapRef.current?.querySelectorAll("input[data-token-index]").forEach((input) => {
        liveAnswers[input.dataset.tokenIndex] = input.value;
      });
      setClozeAnswers(liveAnswers);
      checkAnswer(scoreCloze(liveAnswers, tokens, blankIndexes));
      return;
    }
    checkAnswer();
  }

  function updateHideDensity(value) {
    setHideDensity(value);
    setRevealedTokens(new Set());
    reshuffleDrill();
  }

  function updateClozeDensity(value) {
    setClozeDensity(value);
    setClozeAnswers({});
    setResult(null);
    reshuffleDrill();
  }

  function goToNextStep() {
    if (mode === "read") {
      switchMode("hide");
      setHideDensity(0.25);
      return;
    }
    if (mode === "hide") {
      const next = hideDensity < 0.5 ? 0.5 : hideDensity < 0.75 ? 0.75 : hideDensity < 1 ? 1 : null;
      if (next) {
        updateHideDensity(next);
      } else {
        switchMode("cloze");
        setClozeDensity(0.25);
      }
      return;
    }
    if (mode === "cloze") {
      const next = clozeDensity < 0.5 ? 0.5 : clozeDensity < 0.75 ? 0.75 : clozeDensity < 1 ? 1 : null;
      if (next) {
        updateClozeDensity(next);
      } else {
        switchMode("recall");
      }
      return;
    }
    switchMode("read");
  }

  function toggleReveal(index) {
    setRevealedTokens((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  function speakVerse() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(displayLine);
    utterance.lang = speechLanguage(verse.language);
    utterance.rate = 0.86;
    window.speechSynthesis.speak(utterance);
  }

  function toggleListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError(t.speechUnsupported);
      return;
    }
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = speechLanguage(verse.language);
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = () => {
      setIsListening(true);
      setSpeechError("");
      setAnswer("");
    };
    recognition.onerror = () => {
      setIsListening(false);
      setSpeechError(t.speechUnsupported);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((item) => item[0]?.transcript || "")
        .join(" ")
        .trim();
      setAnswer(transcript);
    };
    recognitionRef.current = recognition;
    recognition.start();
  }

  return (
    <section className="practice-grid">
      <article className="practice-card">
        <div className="practice-header">
          <div>
            <span className="pill">{verse.language.toUpperCase()}</span>
            <h3>{verse.collection}</h3>
            <p>{t.referenceAtEnd}</p>
          </div>
          <div className="header-actions">
            {isCompleted && <span className="status-pill complete">{t.completed}</span>}
            <div className="review-date">{dueLabel(verse.progress.nextReview, t)}</div>
          </div>
        </div>

        <div className="mode-switch" role="tablist" aria-label="Practice stages">
          {[
            ["read", t.read],
            ["hide", t.hide],
            ["cloze", t.cloze],
            ["recall", t.recall],
          ].map(([stage, label]) => (
            <button
              aria-selected={mode === stage}
              className={mode === stage ? "active" : ""}
              key={stage}
              onClick={() => switchMode(stage)}
              role="tab"
            >
              {label}
            </button>
          ))}
        </div>

        <div className={`verse-display verse-${verse.language}`}>
          {mode === "read" && (
            <p>
              {verse.text}
              {" "}
              <span className="reference-end">{verse.reference}</span>
            </p>
          )}
          {mode === "cloze" && (
            <div className="guided-hide">
              <div className="hide-controls" aria-label={t.difficulty}>
                {[
                  [0.25, t.fill25],
                  [0.5, t.fill50],
                  [0.75, t.fill75],
                  [1, t.fillAll],
                ].map(([value, label]) => (
                  <button className={clozeDensity === value ? "active" : ""} key={label} onClick={() => updateClozeDensity(value)}>
                    {label}
                  </button>
                ))}
              </div>
              <div className="cloze-wrap reveal-wrap" aria-label={t.fillBlanks} ref={clozeWrapRef}>
                {tokens.map((token, index) =>
                  blankIndexSet.has(index) ? (
                    <span
                      className={`cloze-answer ${
                        clozeFeedback.has(index) ? (clozeFeedback.get(index).correct ? "correct" : "incorrect") : ""
                      }`}
                      key={`${token}-${index}`}
                    >
                      <input
                        data-token-index={index}
                        value={clozeAnswers[index] || ""}
                        onChange={(event) => updateClozeAnswer(index, event.target.value)}
                        aria-label={`${t.fillBlanks}: ${index + 1}`}
                        aria-invalid={clozeFeedback.has(index) && !clozeFeedback.get(index).correct}
                        style={{ width: `${Math.min(Math.max(Array.from(token).length + 2, 4), 12)}ch` }}
                      />
                      {clozeFeedback.has(index) && !clozeFeedback.get(index).correct && (
                        <small>{clozeFeedback.get(index).expected}</small>
                      )}
                    </span>
                  ) : (
                    <span key={`${token}-${index}`}>{token}</span>
                  ),
                )}
              </div>
            </div>
          )}
          {mode === "hide" && (
            <div className="guided-hide">
              <div className="hide-controls" aria-label={t.hide}>
                {[
                  [0, t.showAll],
                  [0.25, t.hide25],
                  [0.5, t.hide50],
                  [0.75, t.hide75],
                  [1, t.hideAll],
                ].map(([value, label]) => (
                  <button
                    className={hideDensity === value ? "active" : ""}
                    key={label}
                    onClick={() => updateHideDensity(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="token-wrap reveal-wrap">
                {tokens.map((token, index) => {
                  const isHidden = hideIndexSet.has(index);
                  const isRevealed = revealedTokens.has(index);
                  if (!isHidden) {
                    return <span key={`${token}-${index}`}>{token}</span>;
                  }
                  return (
                    <button
                      className={`reveal-token ${isRevealed ? "revealed" : ""}`}
                      key={`${token}-${index}`}
                      onClick={() => toggleReveal(index)}
                      style={{ minWidth: `${Math.min(Math.max(Array.from(token).length + 1, 4), 12)}ch` }}
                      aria-label={isRevealed ? token : t.tapToReveal}
                    >
                      {isRevealed ? token : ""}
                    </button>
                  );
                })}
              </div>
              <p className="practice-hint">{t.tapToReveal}</p>
            </div>
          )}
          {mode === "recall" && recallInput !== "speech" && !showInitials && <p className="muted-script">{t.typeVerseAndRef}</p>}
          {mode === "recall" && showInitials && (
            <div className="token-wrap">
              {tokens.map((token, index) => {
                const clean = normalize(token);
                return (
                  <span className="letter-token" key={`${token}-${index}`}>
                    {clean ? Array.from(token)[0] : token}
                  </span>
                );
              })}
            </div>
          )}
          {mode === "recall" && recallInput === "speech" && (
            <div className="speech-panel">
              <Mic size={34} />
              <p>{t.recitePrompt}</p>
              {speechError && <span>{speechError}</span>}
              <button className="primary-button speech-cta" onClick={toggleListening}>
                {isListening ? <Square size={18} /> : <Mic size={18} />}
                <span>{isListening ? t.stopSpeaking : t.startSpeaking}</span>
              </button>
            </div>
          )}
        </div>

        {mode === "recall" && (
          <div className="input-switch" aria-label={t.recall}>
            <button className={recallInput === "type" ? "active" : ""} onClick={() => setRecallInput("type")}>
              {t.type}
            </button>
            <button className={recallInput === "speech" ? "active" : ""} onClick={() => setRecallInput("speech")}>
              {t.speakAloud}
            </button>
            <button className={showInitials ? "active" : ""} onClick={() => setShowInitials((current) => !current)}>
              {t.hint}
            </button>
          </div>
        )}

        {mode !== "cloze" && (
          <label className="answer-box">
            <span>{mode === "recall" && recallInput === "speech" ? t.transcriptLabel : t.typeVerseAndRef}</span>
            <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} />
          </label>
        )}
        {mode === "cloze" && <p className="practice-hint">{t.blankHint}</p>}

        {result && (
          <div className={`result-panel ${result.accuracy >= 85 ? "good" : "needs-work"}`}>
            <strong>{result.accuracy}%</strong>
            <span>{result.accuracy >= 85 ? t.clean : t.trouble}</span>
            <p>{displayLine}</p>
          </div>
        )}

        <div className="practice-actions">
          <button className="icon-button" aria-label="Previous verse" onClick={() => nextVerse(-1)}>
            <ChevronLeft size={20} />
          </button>
          <button className="secondary-button" onClick={() => { setAnswer(""); setClozeAnswers({}); setRevealedTokens(new Set()); setResult(null); reshuffleDrill(); }}>
            <RotateCcw size={18} />
            <span>{t.again}</span>
          </button>
          <button className="secondary-button" onClick={speakVerse}>
            <Volume2 size={18} />
            <span>{t.listen}</span>
          </button>
          <button className="secondary-button" onClick={goToNextStep}>
            <ChevronRight size={18} />
            <span>{t.nextStep}</span>
          </button>
          <button className="secondary-button" disabled={isCompleted} onClick={() => completeAssignment(verse.id)}>
            <Check size={18} />
            <span>{isCompleted ? t.completed : t.markComplete}</span>
          </button>
          <button className="primary-button" onClick={checkCurrentMode}>
            <Check size={18} />
            <span>{t.check}</span>
          </button>
          <button className="icon-button" aria-label="Next verse" onClick={() => nextVerse(1)}>
            <ChevronRight size={20} />
          </button>
        </div>
      </article>

      <aside className="focus-panel">
        <div className="mini-card">
          <div className="mini-title">
            <Mic size={18} />
            <strong>Audio</strong>
          </div>
          <p>{t.read}: {verse.progress.attempts + 1}</p>
          <div className="audio-bars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="mini-card">
          <div className="mini-title">
            <div>
              <CircleHelp size={18} />
              <strong>{t.heatmap}</strong>
            </div>
            <button className="mini-tool-button" onClick={() => resetTrouble(verse.id)} aria-label={t.resetHeat}>
              <RotateCcw size={16} />
            </button>
          </div>
          {troubleWords.length ? (
            <div className="heat-list">
              {troubleWords.map(([word, count]) => (
                <span style={{ "--heat": Math.min(count / 5, 1) }} key={word}>
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p>{t.emptyHeat}</p>
          )}
        </div>
      </aside>
    </section>
  );
}

function LibraryView({
  t,
  verses,
  query,
  setQuery,
  selectedId,
  setSelectedId,
  removeVerse,
  completeAssignment,
  removeFromWeek,
  setForWeek,
  memoryPlan,
  uiLanguage,
  libraryLanguage,
  updateLibraryLanguage,
  setTab,
}) {
  return (
    <section className="library-view">
      <section className="plan-panel">
        <div className="plan-header">
          <div>
            <span className="plan-eyebrow">{t.assignment}</span>
            <h3>{memoryPlan.name[uiLanguage] || memoryPlan.name.en}</h3>
          </div>
          <span className="status-pill">{memoryPlan.type}</span>
        </div>
        <div className="plan-weeks">
          {memoryPlan.weeks.map((week) => (
            <article className="plan-week" key={week.weekNumber}>
              <div className="plan-week-top">
                <strong>Week {week.weekNumber}</strong>
                <span>{week.topic[uiLanguage] || week.topic.en}</span>
              </div>
              <div className="plan-week-verses">
                {week.verses.map((verse) => (
                  <span key={verse.reference}>{verse.reference}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="library-toolbar">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} />
        </label>
        <label className="library-language">
          <span>{t.libraryLanguage}</span>
          <select value={libraryLanguage} onChange={(event) => updateLibraryLanguage(event.target.value)}>
            <option value="all">{t.all}</option>
            <option value="en">{t.en}</option>
            <option value="zh">{t.zhName}</option>
            <option value="ko">{t.ko}</option>
          </select>
        </label>
      </div>
      <div className="verse-list">
        {verses.map((verse) => (
          <article className={`verse-row ${selectedId === verse.id ? "selected" : ""}`} key={verse.id}>
            <button
              onClick={() => {
                setSelectedId(verse.id);
                setTab("practice");
              }}
            >
              <span>{verse.reference}</span>
              <strong>{verse.text}</strong>
              <small>
                {verse.language.toUpperCase()} · {verse.collection} · {verse.progress.accuracy}% ·{" "}
                {isCompleted(verse)
                  ? `${t.completedOn} ${formatDateTime(verse.completedAt)}`
                  : isActiveAssignment(verse)
                    ? t.activeThisWeek
                    : t.library}
              </small>
            </button>
            <button
              className="secondary-button compact-button"
              onClick={() => (isActiveAssignment(verse) ? removeFromWeek(verse.id) : setForWeek(verse.id))}
            >
              <Check size={16} />
              <span>{isActiveAssignment(verse) ? t.removeFromWeek : t.setForWeek}</span>
            </button>
            <details className="row-menu">
              <summary aria-label={t.moreActions}>
                <MoreVertical size={18} />
              </summary>
              <div className="row-menu-list">
                <button disabled={!isActiveAssignment(verse)} onClick={() => completeAssignment(verse.id)}>
                  <Check size={16} />
                  <span>{isCompleted(verse) ? t.completed : t.markComplete}</span>
                </button>
                <button className="danger" onClick={() => removeVerse(verse.id)}>
                  <Trash2 size={16} />
                  <span>{t.deleteVerse}</span>
                </button>
              </div>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatsView({ t, verses, streak, resetAllTrouble }) {
  const trouble = verses
    .flatMap((verse) => Object.entries(verse.trouble).map(([word, count]) => ({ word, count, reference: verse.reference })))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <section className="stats-view">
      <div className="summary-strip">
        <StatCard icon={<Sparkles size={18} />} label={t.streak} value={streak} />
        <StatCard icon={<BookOpen size={18} />} label={t.library} value={verses.length} />
        <StatCard icon={<Target size={18} />} label={t.mastered} value={verses.filter((verse) => verse.progress.level >= 4).length} />
      </div>
      <div className="progress-table">
        {verses.map((verse) => (
          <div className="progress-row" key={verse.id}>
            <div>
              <strong>{verse.reference}</strong>
              <span>
                {verse.collection}
                {isCompleted(verse) ? ` · ${t.completedOn} ${formatDateTime(verse.completedAt)}` : ""}
              </span>
            </div>
            <div className="progress-track">
              <span style={{ width: `${Math.min(verse.progress.level * 16, 100)}%` }} />
            </div>
            <small>{verse.progress.accuracy}%</small>
          </div>
        ))}
      </div>
      <div className="mini-card wide">
        <div className="mini-title">
          <div>
            <Pencil size={18} />
            <strong>{t.heatmap}</strong>
          </div>
          <button className="secondary-button compact-button" onClick={resetAllTrouble}>
            <RotateCcw size={16} />
            <span>{t.resetAllHeat}</span>
          </button>
        </div>
        {trouble.length ? (
          <div className="trouble-table">
            {trouble.map((item) => (
              <div key={`${item.reference}-${item.word}`}>
                <span>{item.word}</span>
                <small>{item.reference}</small>
                <strong>{item.count}</strong>
              </div>
            ))}
          </div>
        ) : (
          <p>{t.emptyHeat}</p>
        )}
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
