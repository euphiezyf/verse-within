import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BarChart3,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Library,
  Mic,
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
    reference: "经文出处",
    collection: "分类",
    verseText: "经文内容",
    save: "保存",
    cancel: "取消",
    search: "搜索经文、出处或分类",
    read: "朗读",
    cloze: "填空",
    hide: "遮词",
    firstLetter: "首字母",
    recall: "默写",
    speech: "语音",
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
    referenceAtEnd: "背诵时出处放在末尾",
    listen: "听经文",
    startSpeaking: "开始背诵",
    stopSpeaking: "停止",
    speechUnsupported: "这个浏览器暂不支持语音识别，可先用键盘默写。",
    fillBlanks: "填写空格",
    blankHint: "先填空，再进入首字母和完整默写。",
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
    reference: "Reference",
    collection: "Collection",
    verseText: "Verse text",
    save: "Save",
    cancel: "Cancel",
    search: "Search verses, references, collections",
    read: "Read",
    cloze: "Fill",
    hide: "Hide",
    firstLetter: "First letter",
    recall: "Recall",
    speech: "Voice",
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
    referenceAtEnd: "Reference belongs at the end",
    listen: "Listen",
    startSpeaking: "Start reciting",
    stopSpeaking: "Stop",
    speechUnsupported: "Speech recognition is not supported in this browser.",
    fillBlanks: "Fill the blanks",
    blankHint: "Fill blanks first, then move to initials and full recall.",
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
    reference: "본문",
    collection: "분류",
    verseText: "말씀",
    save: "저장",
    cancel: "취소",
    search: "구절, 본문, 분류 검색",
    read: "읽기",
    cloze: "빈칸",
    hide: "가리기",
    firstLetter: "첫 글자",
    recall: "암기 입력",
    speech: "음성",
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
    referenceAtEnd: "본문은 마지막에 둡니다",
    listen: "듣기",
    startSpeaking: "암송 시작",
    stopSpeaking: "중지",
    speechUnsupported: "이 브라우저는 음성 인식을 지원하지 않습니다.",
    fillBlanks: "빈칸 채우기",
    blankHint: "빈칸부터 시작해 첫 글자와 전체 암송으로 이동하세요.",
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

function App() {
  const [state, setState] = useState(loadState);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(state.verses[0]?.id);
  const [mode, setMode] = useState("read");
  const [answer, setAnswer] = useState("");
  const [clozeAnswers, setClozeAnswers] = useState({});
  const [drillSeed, setDrillSeed] = useState(1);
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    reference: "",
    collection: "",
    language: "en",
    text: "",
  });

  const t = labels[state.uiLanguage] || labels.en;
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

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

  function updateUiLanguage(language) {
    setState((current) => ({ ...current, uiLanguage: language }));
  }

  function updateLibraryLanguage(language) {
    setState((current) => ({ ...current, libraryLanguage: language }));
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
      progress: { level: 1, accuracy: 0, attempts: 0, nextReview: new Date().toISOString() },
      status: "active",
      trouble: {},
    };
    setState((current) => ({ ...current, verses: [verse, ...current.verses], activeTab: "practice" }));
    setSelectedId(verse.id);
    setShowForm(false);
    setForm({ reference: "", collection: "", language: "en", text: "" });
    setMode("read");
    setAnswer("");
    setClozeAnswers({});
    setDrillSeed((seed) => seed + 1);
    setResult(null);
  }

  function removeVerse(id) {
    setState((current) => ({
      ...current,
      verses: current.verses.filter((verse) => verse.id !== id),
    }));
  }

  function resetTrouble(id) {
    setState((current) => ({
      ...current,
      verses: current.verses.map((verse) => (verse.id === id ? { ...verse, trouble: {} } : verse)),
    }));
  }

  function resetAllTrouble() {
    setState((current) => ({
      ...current,
      verses: current.verses.map((verse) => ({ ...verse, trouble: {} })),
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
      </section>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h2>{state.activeTab === "practice" ? t.practice : state.activeTab === "library" ? t.library : t.stats}</h2>
          </div>
          <button className="primary-button" onClick={() => setShowForm(true)}>
            <Plus size={18} />
            <span>{t.addVerse}</span>
          </button>
        </header>

        {showForm && (
          <section className="add-panel" aria-label={t.addVerse}>
            <form onSubmit={saveVerse}>
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
                    <option value="en">{t.en}</option>
                    <option value="zh">{t.zhName}</option>
                    <option value="ko">{t.ko}</option>
                    <option value="custom">{t.custom}</option>
                  </select>
                </label>
              </div>
              <label className="textarea-label">
                <span>{t.verseText}</span>
                <textarea value={form.text} onChange={(event) => setForm({ ...form, text: event.target.value })} placeholder={t.pasteAny} />
              </label>
              <div className="form-actions">
                <button type="button" className="ghost-button" onClick={() => setShowForm(false)}>
                  {t.cancel}
                </button>
                <button className="primary-button" type="submit">
                  <Check size={18} />
                  <span>{t.save}</span>
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
  const blankIndexSet = drillIndexes(tokens, verse.progress.level, drillSeed);
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

        <div className="mode-switch" role="tablist" aria-label="Practice modes">
          <button className={mode === "read" ? "active" : ""} onClick={() => switchMode("read")}>{t.read}</button>
          <button className={mode === "cloze" ? "active" : ""} onClick={() => switchMode("cloze")}>{t.cloze}</button>
          <button className={mode === "hide" ? "active" : ""} onClick={() => switchMode("hide")}>{t.hide}</button>
          <button className={mode === "firstLetter" ? "active" : ""} onClick={() => switchMode("firstLetter")}>{t.firstLetter}</button>
          <button className={mode === "recall" ? "active" : ""} onClick={() => switchMode("recall")}>{t.recall}</button>
          <button className={mode === "speech" ? "active" : ""} onClick={() => switchMode("speech")}>{t.speech}</button>
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
            <div className="cloze-wrap" aria-label={t.fillBlanks} ref={clozeWrapRef}>
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
          {mode === "firstLetter" && (
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
          {mode === "recall" && <p className="muted-script">{t.typeVerseAndRef}</p>}
          {mode === "speech" && (
            <div className="speech-panel">
              <Mic size={34} />
              <p>{t.typeVerseAndRef}</p>
              {speechError && <span>{speechError}</span>}
            </div>
          )}
        </div>

        {mode !== "cloze" && (
          <label className="answer-box">
            <span>{mode === "speech" ? t.speech : t.typeVerseAndRef}</span>
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
          <button className="secondary-button" onClick={mode === "speech" ? toggleListening : speakVerse}>
            {mode === "speech" && isListening ? <Square size={18} /> : mode === "speech" ? <Mic size={18} /> : <Volume2 size={18} />}
            <span>{mode === "speech" && isListening ? t.stopSpeaking : mode === "speech" ? t.startSpeaking : t.listen}</span>
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
            <button
              className="secondary-button compact-button"
              disabled={!isActiveAssignment(verse)}
              onClick={() => completeAssignment(verse.id)}
            >
              <Check size={16} />
              <span>{isCompleted(verse) ? t.completed : t.markComplete}</span>
            </button>
            <button className="icon-button danger" aria-label="Delete verse" onClick={() => removeVerse(verse.id)}>
              <Trash2 size={18} />
            </button>
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
