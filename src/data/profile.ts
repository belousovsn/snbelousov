/**
 * All site content lives here, separated from presentation.
 *
 * The site is bilingual (EN / RU). Content is provided per language in the
 * `content` map below; components read the active language via the language
 * context (see src/i18n/LanguageContext.tsx).
 *
 * Per request, the job TITLE ("Fullstack QA Engineer") and the SKILLS (technical
 * terms / tags) are kept in English in both languages; only prose is translated.
 */

export type Lang = "en" | "ru";

export interface NavLink {
  label: string;
  href: string;
}

export interface Contact {
  label: string;
  value: string;
  href: string;
  /** Shown as a short monospace handle next to the label. */
  handle?: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  subheadline: string;
  location: string;
  availability: string;
  yearsInIt: string;
  yearsInQa: string;
  /** Paragraphs for the About section. */
  about: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  domain: string;
  summary: string;
  highlights: string[];
}

export interface SkillGroup {
  title: string;
  /** Optional one-line note for the group. */
  note?: string;
  skills: string[];
}

export interface Project {
  title: string;
  kind: "Production" | "Personal" | "Concept";
  description: string;
  bullets: string[];
  stack: string[];
  /** Optional outbound link; leave undefined to hide the link. */
  link?: { label: string; href: string };
}

export interface CaseStudy {
  id: string;
  title: string;
  tag: string;
  problem: string;
  approach: string[];
  value: string;
}

/** Localised UI strings (labels, buttons, the QA Lab modal, etc.). */
export interface UiStrings {
  hero: {
    tryTests: string;
    viewProjects: string;
    downloadCv: string;
    contact: string;
    experienceLabel: string;
    automationLabel: string;
    statusLabel: string;
    automationValue: string;
  };
  sections: {
    about: string;
    aboutAside: string;
    experience: string;
    skills: string;
    projects: string;
    projectsAside: string;
    contact: string;
    qa: string;
    qaAside: string;
  };
  projectKinds: Record<Project["kind"], string>;
  contactLead: string;
  footer: { builtWith: string; backToTop: string };
  qa: {
    introBefore: string;
    introLink: string;
    introAfter: string;
    openButton: string;
    modalKicker: string;
    modalTitle: string;
    connecting: string;
    offline: string;
    chooseGroup: string;
    signsIn: string;
    testsCount: (n: number) => string;
    runIdle: string;
    runStarting: string;
    runRunning: string;
    lastRun: string;
    passed: string;
    failed: string;
    skipped: string;
    flaky: string;
    secondsSuffix: string;
    status: Record<"running" | "passed" | "failed" | "timedout" | "error", string>;
    msgInProgress: string;
    msgLost: string;
    openReport: string;
    visualReport: string;
    rawOutput: string;
    live: string;
    idleNote: string;
    closeBusy: string;
    close: string;
  };
}

export interface SiteContent {
  profile: Profile;
  nav: NavLink[];
  experience: ExperienceItem[];
  skillGroups: SkillGroup[];
  projects: Project[];
  contacts: Contact[];
  ui: UiStrings;
}

/* ----------------------------------------------------- shared (not localised) */

// Contacts are language-neutral (proper nouns / addresses). The Yandex email is
// shown only in the Russian version (see contactsRu).
const emailGmail: Contact = {
  label: "Email",
  value: "oohthischarmingman@gmail.com",
  href: "mailto:oohthischarmingman@gmail.com",
};
const emailYandex: Contact = {
  label: "Email",
  value: "belousovsn1008@ya.ru",
  href: "mailto:belousovsn1008@ya.ru",
};
const linkedIn: Contact = {
  label: "LinkedIn",
  value: "linkedin.com/in/sergey-belousov-b6795758",
  href: "https://www.linkedin.com/in/sergey-belousov-b6795758",
  handle: "/in/sergey-belousov",
};
const gitHub: Contact = {
  label: "GitHub",
  value: "github.com/belousovsn",
  href: "https://github.com/belousovsn",
  handle: "@belousovsn",
};
const telegram: Contact = {
  label: "Telegram",
  value: "@mrbrightside42",
  href: "https://t.me/mrbrightside42",
  handle: "@mrbrightside42",
};

const contactsEn: Contact[] = [emailGmail, linkedIn, gitHub, telegram];
const contactsRu: Contact[] = [emailGmail, emailYandex, linkedIn, gitHub, telegram];

// Skills are kept in English (technical terms). Only the per-group notes differ.
const skillTags = {
  testing: [
    "Manual testing",
    "Backend testing",
    "API testing",
    "Integration testing",
    "E2E testing",
    "Test design",
    "Risk-based testing",
    "Exploratory testing",
    "Regression testing",
    "Defect investigation",
    "Requirement analysis",
    "Test documentation",
    "Shift-left QA",
  ],
  automation: [
    "Playwright",
    "TypeScript",
    "JavaScript",
    "API automation",
    "E2E automation",
    "Component testing",
    "Mocks",
    "Framework setup from scratch",
    "Page Object Model",
    "Test data setup / cleanup",
  ],
  backend: [
    "REST API",
    "AWS Lambda",
    "Step Functions",
    "DynamoDB",
    "SQS",
    "DLQ behavior",
    "CloudWatch",
    "Event-driven architecture",
    "Async processing",
    "Version / order protection",
  ],
  databases: ["SQL (incl. complex queries)", "NoSQL", "MS SQL", "MongoDB", "DynamoDB"],
  tools: [
    "Postman",
    "Insomnia",
    "SoapUI",
    "Jira",
    "Confluence",
    "Test IT",
    "Git / GitHub",
    "Graylog",
    "Grafana",
    "CloudWatch",
    "VS Code",
    "IntelliJ IDEA",
  ],
  devops: [
    "Linux command line",
    "SSH",
    "Docker / Compose basics",
    "Node.js basics",
    "Supabase",
    "DigitalOcean / VPS",
  ],
} as const;

function pluralTestsRu(n: number): string {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return `${n} тест`;
  if (n10 >= 2 && n10 <= 4 && !(n100 >= 12 && n100 <= 14)) return `${n} теста`;
  return `${n} тестов`;
}

/* ----------------------------------------------------------------- English */

const en: SiteContent = {
  profile: {
    name: "Sergey Belousov",
    role: "Fullstack QA Engineer",
    headline: "Fullstack QA Engineer",
    subheadline:
      "Automation with Playwright and TypeScript — end-to-end and API coverage — alongside deep manual testing of cloud, billing, and payment systems where correctness, data consistency, and edge cases matter.",
    location: "Armenia · open to remote",
    availability: "Open to QA / QA Automation roles",
    yearsInIt: "~10 years in IT",
    yearsInQa: "~6 years in QA",
    about: [
      "I'm a QA engineer with around 10 years in IT and 6 in QA. I work across the stack — UI, API, integrations, and backend — and combine thorough manual testing with automation in Playwright and TypeScript. Test design and a clear strategy matter to me as much as execution.",
      "I turn requirements into a practical test strategy: risk-based coverage, well-structured test cases and checklists, and clear bug reports. I test APIs and contracts with tools like Postman and Insomnia, cover critical paths with end-to-end and integration tests, and follow team standards and a shift-left approach so problems surface early. When behavior isn't obvious, I dig into logs, the database, and queues to find the real cause.",
      "Most of my experience is in cloud products with real business complexity — billing, payments, and healthcare — where correctness, data consistency, and edge cases matter. I enjoy understanding the domain, working closely with developers and product owners, mentoring junior QA engineers, and treating quality as a shared responsibility rather than a final gate.",
    ],
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Try my tests", href: "#qa-lab" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  experience: [
    {
      company: "DataArt Solutions, Inc.",
      role: "Senior QA Engineer",
      period: "Current",
      domain: "US healthcare billing & patient payments",
      summary:
        "Testing a cloud-based healthcare billing and payment platform used by medical practices. Focused on backend, API, integration, and payment flows where data consistency, security, and business-logic accuracy are critical.",
      highlights: [
        "Designed and executed test scenarios for billing, ledger, invoicing, payment, and notification workflows.",
        "Tested API and integration flows across AWS-based microservices.",
        "Validated asynchronous event processing using queues, logs, and downstream data checks.",
        "Investigated defects through CloudWatch, Graylog, Grafana, API responses, and database state.",
        "Verified payment edge cases including card-on-file, autopay limits, failed flows, and asynchronous payment recording.",
        "Worked with complex business rules around bill status, insurance-related holds, credits, payment plans, and patient communication schedules.",
        "Took part in requirement clarification, technical discussions, demos, shift-left QA, and mentoring junior QA engineers.",
      ],
    },
  ],
  skillGroups: [
    { title: "Testing", note: "Where most of my depth is.", skills: [...skillTags.testing] },
    {
      title: "Automation",
      note: "Growing — practical, not senior-level production ownership.",
      skills: [...skillTags.automation],
    },
    { title: "Backend & Cloud", skills: [...skillTags.backend] },
    { title: "Databases", skills: [...skillTags.databases] },
    { title: "Tools", skills: [...skillTags.tools] },
    { title: "Dev & Ops basics", skills: [...skillTags.devops] },
  ],
  projects: [
    {
      title: "Healthcare Billing & Payment Platform",
      kind: "Production",
      description:
        "A cloud-based patient billing and payment platform for medical practices. I focused on backend, API, integration, and payment flows where data consistency, security, and business-logic accuracy were critical.",
      bullets: [
        "Patient bill generation, updates, and on-hold logic.",
        "Payment processing, card-on-file, autopay limits, and scheduling.",
        "Patient-facing payment portal and secure embedded card entry (CDE-style isolation).",
        "Billing ledgers, charges, credits, payment plans, guarantors, and patient accounts.",
        "Dunning / notification schedules and integrations with practice management systems.",
        "Event-driven updates through AWS services with DynamoDB consistency and versioning.",
      ],
      stack: ["AWS", "Lambda", "DynamoDB", "SQS", "REST API", "Graylog", "Grafana"],
    },
    {
      title: "Language Learning Memo Cards",
      kind: "Personal",
      description:
        "A personal TypeScript project for saving translated words as reusable memo cards — built around a real learning need rather than a toy example. It combines authentication, database storage, external API integrations, and automated tests.",
      bullets: [
        "Translate a word, then save it as a reusable memo card.",
        "Supabase for user data, authentication, and audio/TTS storage.",
        "Integrates translation, image, and audio resources.",
        "A playground for Playwright E2E, API, and component testing.",
      ],
      stack: ["TypeScript", "Supabase", "Auth", "External APIs", "Playwright"],
    },
  ],
  contacts: contactsEn,
  ui: {
    hero: {
      tryTests: "▶ Try my tests",
      viewProjects: "View projects",
      downloadCv: "Download CV",
      contact: "Contact",
      experienceLabel: "Experience",
      automationLabel: "Automation",
      statusLabel: "Status",
      automationValue: "Playwright · TypeScript · E2E · API",
    },
    sections: {
      about: "About",
      aboutAside: "who you'd be hiring",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      projectsAside: "production · personal",
      contact: "Contact",
      qa: "Try my tests on a real app",
      qaAside: "Playwright E2E · live run",
    },
    projectKinds: { Production: "Production", Personal: "Personal", Concept: "Concept" },
    contactLead:
      "Looking for a QA engineer who digs into systems, not just screens? I'm open to QA / QA Automation roles.",
    footer: { builtWith: "Built with React & TypeScript", backToTop: "Back to top ↑" },
    qa: {
      introBefore: "The Playwright end-to-end ",
      introLink: "test suite",
      introAfter:
        " for one of my projects, run on demand against its live test environment. Select a group of tests to run and review the results, including the full Playwright report.",
      openButton: "Open test runner",
      modalKicker: "Live test run",
      modalTitle: "Run the Playwright suite",
      connecting: "Connecting to the runner…",
      offline:
        "The live runner isn't reachable right now. It runs on demand against test.memdecks.com; if it's asleep or rate-limited, check back shortly.",
      chooseGroup: "Choose a test group",
      signsIn: "signs in",
      testsCount: (n) => `${n} ${n === 1 ? "test" : "tests"}`,
      runIdle: "Run tests ▶",
      runStarting: "Starting…",
      runRunning: "Running…",
      lastRun: "Last run:",
      passed: "passed",
      failed: "failed",
      skipped: "skipped",
      flaky: "flaky",
      secondsSuffix: "s",
      status: {
        running: "Running",
        passed: "All passed",
        failed: "Failures",
        timedout: "Timed out",
        error: "Runner error",
      },
      msgInProgress: "A run is already in progress — attaching to it.",
      msgLost: "Lost connection to the runner.",
      openReport: "Open full report ↗",
      visualReport:
        "Report, screenshots, video & trace — click a test, then open its trace to scrub through the run.",
      rawOutput: "Raw output",
      live: "live",
      idleNote:
        "Select a group and press Run tests. Tests execute on a server against the live app — results stream back here in real time.",
      closeBusy: "running…",
      close: "close ✕",
    },
  },
};

/* ----------------------------------------------------------------- Russian */

const ru: SiteContent = {
  profile: {
    name: "Сергей Белоусов",
    role: "Fullstack QA Engineer",
    headline: "Fullstack QA Engineer",
    subheadline:
      "Автоматизация на Playwright и TypeScript — end-to-end и API-покрытие — вместе с глубоким ручным тестированием облачных, биллинговых и платёжных систем, где важны корректность, консистентность данных и граничные случаи.",
    location: "Армения · удалённо",
    availability: "Открыт к предложениям (QA / QA Automation)",
    yearsInIt: "~10 лет в IT",
    yearsInQa: "~6 лет в QA",
    about: [
      "QA-инженер: около 10 лет в IT и 6 лет в QA. Работаю на всех уровнях — UI, API, интеграции и бэкенд — и совмещаю тщательное ручное тестирование с автоматизацией на Playwright и TypeScript. Тест-дизайн и внятная стратегия для меня важны не меньше, чем само прохождение тестов.",
      "Превращаю требования в практичную стратегию тестирования: покрытие на основе рисков, аккуратные тест-кейсы и чек-листы, понятные баг-репорты. Тестирую API и контракты с помощью Postman и Insomnia, покрываю ключевые сценарии end-to-end и интеграционными тестами, придерживаюсь командных стандартов и подхода shift-left, чтобы проблемы всплывали раньше. Когда поведение неочевидно — разбираюсь в логах, базе данных и очередях, чтобы найти настоящую причину.",
      "Большая часть опыта — в облачных продуктах с реальной бизнес-сложностью: биллинг, платежи и медицинские системы, где важны корректность, консистентность данных и граничные случаи. Разбираюсь в предметной области, тесно работаю с разработчиками и бизнесом, имею опыт менторинга junior QA.",
    ],
  },
  nav: [
    { label: "Обо мне", href: "#about" },
    { label: "Мои тесты", href: "#qa-lab" },
    { label: "Опыт", href: "#experience" },
    { label: "Навыки", href: "#skills" },
    { label: "Проекты", href: "#projects" },
    { label: "Контакты", href: "#contact" },
  ],
  experience: [
    {
      company: "DataArt Solutions, Inc.",
      role: "Senior QA Engineer",
      period: "Сейчас",
      domain: "Медицинский биллинг и платежи пациентов (США)",
      summary:
        "Тестирование облачной платформы медицинского биллинга и платежей, которой пользуются медицинские практики. Фокус на бэкенде, API, интеграциях и платёжных потоках, где критичны консистентность данных, безопасность и точность бизнес-логики.",
      highlights: [
        "Проектировал и выполнял тест-сценарии для биллинга, реестров, выставления счетов, платежей и уведомлений.",
        "Тестировал API и интеграционные потоки в микросервисах на базе AWS.",
        "Проверял асинхронную обработку событий через очереди, логи и сверку данных ниже по потоку.",
        "Расследовал дефекты по CloudWatch, Graylog, Grafana, ответам API и состоянию базы данных.",
        "Проверял граничные случаи платежей: card-on-file, лимиты автоплатежа, неуспешные потоки и асинхронную фиксацию платежей.",
        "Работал со сложными бизнес-правилами: статусы счетов, удержания по страховке, кредиты, планы платежей и расписания уведомлений пациентов.",
        "Участвовал в прояснении требований, технических обсуждениях, демо, shift-left QA и наставничестве junior-инженеров QA.",
      ],
    },
  ],
  skillGroups: [
    { title: "Testing", note: "Здесь у меня больше всего глубины.", skills: [...skillTags.testing] },
    {
      title: "Automation",
      note: "Развиваю — практический уровень, без многолетнего сеньорского опыта в продакшн-автоматизации.",
      skills: [...skillTags.automation],
    },
    { title: "Backend & Cloud", skills: [...skillTags.backend] },
    { title: "Databases", skills: [...skillTags.databases] },
    { title: "Tools", skills: [...skillTags.tools] },
    { title: "Dev & Ops basics", skills: [...skillTags.devops] },
  ],
  projects: [
    {
      title: "Платформа медицинского биллинга и платежей",
      kind: "Production",
      description:
        "Облачная платформа биллинга и платежей пациентов для медицинских практик. Я отвечал за бэкенд, API, интеграции и платёжные потоки, где критичны консистентность данных, безопасность и точность бизнес-логики.",
      bullets: [
        "Генерация и обновление счетов пациентов, логика удержания (on-hold).",
        "Обработка платежей, card-on-file, лимиты автоплатежа и планирование.",
        "Платёжный портал для пациентов и безопасный встроенный ввод карты (изоляция в духе CDE).",
        "Биллинговые реестры, начисления, кредиты, планы платежей, гаранты и счета пациентов.",
        "Расписания напоминаний (dunning) и интеграции с системами управления практиками.",
        "Событийные обновления через сервисы AWS с консистентностью и версионированием в DynamoDB.",
      ],
      stack: ["AWS", "Lambda", "DynamoDB", "SQS", "REST API", "Graylog", "Grafana"],
    },
    {
      title: "Карточки для изучения языков",
      kind: "Personal",
      description:
        "Личный проект на TypeScript для сохранения переведённых слов в виде многоразовых карточек — построен вокруг реальной потребности в обучении, а не учебного примера. Сочетает аутентификацию, хранение в БД, интеграции с внешними API и автотесты.",
      bullets: [
        "Перевести слово и сохранить его как многоразовую карточку.",
        "Supabase для данных пользователей, аутентификации и хранения аудио/TTS.",
        "Интеграция переводов, изображений и аудио.",
        "Площадка для Playwright E2E, API и компонентных тестов.",
      ],
      stack: ["TypeScript", "Supabase", "Auth", "External APIs", "Playwright"],
    },
  ],
  contacts: contactsRu,
  ui: {
    hero: {
      tryTests: "▶ Мои тесты",
      viewProjects: "Проекты",
      downloadCv: "Скачать CV",
      contact: "Контакты",
      experienceLabel: "Опыт",
      automationLabel: "Автоматизация",
      statusLabel: "Статус",
      automationValue: "Playwright · TypeScript · E2E · API",
    },
    sections: {
      about: "Обо мне",
      aboutAside: "кого вы нанимаете",
      experience: "Опыт",
      skills: "Навыки",
      projects: "Проекты",
      projectsAside: "продакшн · личные",
      contact: "Контакты",
      qa: "Попробуйте мои тесты на реальном приложении",
      qaAside: "Playwright E2E · вживую",
    },
    projectKinds: { Production: "Продакшн", Personal: "Личный", Concept: "Концепт" },
    contactLead:
      "Нужен QA-инженер, который разбирается в системе, а не только в экранах? Я открыт к предложениям (QA / QA Automation).",
    footer: { builtWith: "Сделано на React и TypeScript", backToTop: "Наверх ↑" },
    qa: {
      introBefore: "End-to-end ",
      introLink: "набор тестов на Playwright",
      introAfter:
        " для одного из моих проектов — запускается по запросу в его рабочем тестовом окружении. Выберите группу тестов, запустите её и посмотрите результаты, включая полный отчёт Playwright.",
      openButton: "Открыть раннер тестов",
      modalKicker: "Запуск тестов вживую",
      modalTitle: "Запустить набор тестов Playwright",
      connecting: "Подключение к раннеру…",
      offline:
        "Раннер сейчас недоступен. Он запускается по запросу против test.memdecks.com; если он «спит» или сработал лимит — загляните чуть позже.",
      chooseGroup: "Выберите группу тестов",
      signsIn: "вход в аккаунт",
      testsCount: pluralTestsRu,
      runIdle: "Запустить тесты ▶",
      runStarting: "Запуск…",
      runRunning: "Выполняется…",
      lastRun: "Последний прогон:",
      passed: "прошло",
      failed: "упало",
      skipped: "пропущено",
      flaky: "нестабильных",
      secondsSuffix: "с",
      status: {
        running: "Идёт прогон",
        passed: "Все прошли",
        failed: "Есть падения",
        timedout: "Таймаут",
        error: "Ошибка раннера",
      },
      msgInProgress: "Прогон уже выполняется — подключаюсь к нему.",
      msgLost: "Потеряно соединение с раннером.",
      openReport: "Открыть полный отчёт ↗",
      visualReport:
        "Отчёт, скриншоты, видео и трейс — откройте тест, затем его трейс, чтобы прокрутить прогон по шагам.",
      rawOutput: "Вывод",
      live: "вживую",
      idleNote:
        "Выберите группу и нажмите «Запустить тесты». Тесты выполняются на сервере против рабочего приложения — результаты приходят сюда в реальном времени.",
      closeBusy: "идёт прогон…",
      close: "закрыть ✕",
    },
  },
};

export const content: Record<Lang, SiteContent> = { en, ru };

/** Path (in /public) to a downloadable CV. Set to a real file to enable the button. */
export const cvPath: string | null = "/Sergey-Belousov-CV.pdf";

/** Case studies are currently hidden from the page; kept for future use. */
export const caseStudies: CaseStudy[] = [];
