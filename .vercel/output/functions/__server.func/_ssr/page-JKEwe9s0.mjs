import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-JKEwe9s0.js
var import_jsx_runtime = require_jsx_runtime();
var useLang = create((set, get) => ({
	lang: "fa",
	setLang: (lang) => {
		try {
			localStorage.setItem("parvaz-lang", lang);
		} catch {}
		if (typeof document !== "undefined") {
			document.documentElement.lang = lang;
			document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
		}
		set({ lang });
	},
	toggle: () => {
		const next = get().lang === "fa" ? "en" : "fa";
		get().setLang(next);
	}
}));
function hydrateLang() {
	try {
		const stored = localStorage.getItem("parvaz-lang");
		if (stored === "en" || stored === "fa") useLang.getState().setLang(stored);
		else useLang.getState().setLang("fa");
	} catch {}
}
var copy = {
	fa: {
		nav: {
			home: "صفحه اصلی",
			projects: "پروژه‌ها",
			invest: "سرمایه‌گذاری",
			advisory: "مشاوره",
			founder: "بنیان‌گذار",
			contact: "تماس",
			protocol: "پروتکل",
			economy: "اقتصاد"
		},
		hero: {
			tagline: "بساز. تحلیل کن. ساختاربده. سرمایه‌گذاری کن.",
			body: "استودیوی بنیان‌گذار برای ساخت تکنولوژی، خواندن فرصت‌ها، و تبدیل ایده، دارایی و کسب‌وکار به ونچری که بتواند بزرگ شود.",
			ctaProjects: "مشاهده پروژه‌ها",
			ctaInvest: "فرصت‌های سرمایه",
			ctaWork: "همکاری",
			ctaEconomy: "عرضهٔ اقتصاد"
		},
		home: {
			buildingEyebrow: "Live building",
			buildingTitle: "در حال ساخت",
			buildingBody: "مسیرهای فعال — از پژوهش تا محصول زنده.",
			allProjects: "همه پروژه‌ها",
			investEyebrow: "Investment",
			investTitle: "فرصت‌های باز",
			investBody: "ونچرهایی با داده، ساختار، و جای خالی برای شریک.",
			investAll: "میز سرمایه",
			advisoryEyebrow: "Advisory",
			advisoryTitle: "روش کار",
			advisoryBody: "همان دقتی که روی کارهای خودمان می‌گذاریم، برای تیم‌های دیگر.",
			advisoryAll: "خدمات مشاوره",
			founderEyebrow: "Founder",
			founderQuote: "ونچر خوب از ایدهٔ درخشان شروع نمی‌شود. از مسئلهٔ باریک، ساخت منظم، و ساختاری که بعد از واقعیت می‌آید شروع می‌شود.",
			founderCta: "داستان استودیو",
			contactEyebrow: "Contact",
			contactTitle: "یک مسیر مشخص بنویسید",
			contactBody: "سرمایه، شراکت، مشاوره یا همکاری. کوتاه و دقیق بهتر از بلند و مبهم است.",
			contactCta: "شروع گفتگو",
			protocolEyebrow: "Protocol",
			protocolTitle: "توکن‌سازی دارایی واقعی",
			protocolBody: "از ملک و فاکتور تا فلز و نیروگاه — با ساختار حقوقی، نه با شعار زنجیره.",
			protocolAll: "میز پروتکل",
			economyEyebrow: "Economy",
			economyTitle: "توکن استودیو",
			economyBody: "سایت، پروتکل و میز سرمایه روی یک واحد جمع می‌شوند تا بتوانید اقتصاد را عرضه کنید.",
			economyAll: "برگهٔ عرضه"
		},
		projectsPage: {
			eyebrow: "Projects",
			title: "ساخت جاری",
			body: "هفت مسیر. بعضی زنده‌اند، بعضی هنوز در حال شکل گرفتن.",
			search: "جستجوی پروژه یا فناوری…",
			all: "همه",
			empty: "چیزی با این فیلتر پیدا نشد.",
			progress: "پیشرفت",
			open: "جزئیات",
			close: "بستن",
			stack: "فناوری",
			publicWork: "کار عمومی"
		},
		cats: {
			saas: "SaaS",
			web3: "Web3",
			marketplace: "بازار",
			infra: "زیرساخت"
		},
		status: {
			live: "زنده",
			beta: "بتا",
			development: "در حال ساخت",
			research: "پژوهش"
		},
		investPage: {
			eyebrow: "Investment",
			title: "میز سرمایه",
			body: "فقط جایی باز می‌کنیم که محصول، داده و ساختار از ایده جلوتر باشد.",
			openRounds: "دورهای باز",
			more: "درخواست اطلاعات",
			committed: "تعهد شده",
			filled: "تأمین شده",
			howTitle: "چطور انتخاب می‌کنیم",
			how: [
				"مسئله باید باریک و قابل‌اثبات باشد — نه یک بازار خیالی.",
				"باید نسخهٔ قابل‌استفاده یا مسیر فنی روشن وجود داشته باشد.",
				"ساختار حقوقی و مالکیت باید قبل از پول مرتب شود.",
				"شریک باید چیزی غیر از سرمایه بیاورد: شبکه، حوزه، یا زمان."
			],
			termsTitle: "چارچوب شراکت",
			termsBody: "شراکت‌ها موردی‌اند. معمولاً سرمایهٔ مرحله‌ای، نقش مشخص، و گزارش منظم. این صفحه دعوت به گفتگو است، نه برگهٔ شرایط.",
			disclaimerTitle: "توجه",
			disclaimer: "PARVAZ نهاد عمومی جذب سرمایه نیست و این صفحه پیشنهاد فروش اوراق بهادار محسوب نمی‌شود. اطلاعات نمایش‌داده‌شده برای معرفی است و باید مستقل بررسی شود. بازده تضمین نمی‌شود. اگر سرمایه‌گذار حرفه‌ای نیستید، قبل از هر تعهدی با مشاور حقوقی و مالی خود صحبت کنید."
		},
		advisoryPage: {
			eyebrow: "Advisory",
			title: "مشاورهٔ بنیان‌گذار",
			body: "کمک محدود، دقیق، و در نقطه‌ای که تصمیم واقعاً تغییر می‌کند.",
			fitTitle: "برای چه کسی",
			fit: [
				"بنیان‌گذاری که محصول دارد اما ساختار ندارد.",
				"تیمی که می‌خواهد بداند الان سرمایه بگیرد یا نه.",
				"اپراتوری که بازار را می‌بیند و به خوانش دوم نیاز دارد."
			],
			notTitle: "چه کاری نمی‌کنیم",
			not: [
				"اسلاید دکراتیو بدون تصمیم.",
				"منتورینگ نامحدود هفتگی.",
				"وعدهٔ معرفی سرمایه‌گذار به‌عنوان خدمت."
			],
			cta: "درخواست مشاوره"
		},
		founderPage: {
			eyebrow: "Founder",
			title: "یک استودیو، چند مسیر",
			body: "PARVAZ را به‌عنوان سقف ساختم: جایی که ساخت، تحلیل و ساختار در یک روش جمع شوند — نه به‌عنوان آژانس، نه به‌عنوان صندوق.",
			methodTitle: "روش",
			method: "اول مسئله. بعد ساخت باریک. بعد داده. ساختار و سرمایه آخر می‌آیند. اگر مرحله‌ای رد شود، معمولاً بعداً گران تمام می‌شود.",
			caseEyebrow: "Case",
			caseTitle: "از ایده شلوغ تا محصول زنده",
			caseBody: "یک همکاری ۱۴ هفته‌ای. چهار ایستگاه. بدون اسم مشتری.",
			timeEyebrow: "Timeline",
			timeTitle: "مسیر استودیو",
			workTitle: "کار عمومی",
			workBody: "مخازن منتخب. اعداد نمونهٔ داخلی‌اند، نه ادعای لحظه‌ای گیت‌هاب.",
			stars: "ستاره",
			commits: "کامیت"
		},
		contactPage: {
			eyebrow: "Contact",
			title: "گفتگو را از اینجا شروع کنید",
			body: "نوع درخواست را مشخص کنید. هرچه دقیق‌تر بنویسید، پاسخ جدی‌تر خواهد بود.",
			name: "نام",
			email: "ایمیل",
			message: "پیام",
			type: "نوع درخواست",
			send: "ارسال",
			sending: "در حال ارسال…",
			successTitle: "پیام ثبت شد",
			successBody: "روی همین دستگاه ذخیره شد. اگر لازم باشد با همان ایمیل ادامه می‌دهیم.",
			another: "پیام دیگر",
			namePh: "نام و نام خانوادگی",
			emailPh: "you@domain.com",
			messagePh: "چه کاری، در چه مرحله‌ای، و چه کمکی لازم دارید؟",
			errName: "نام را کامل بنویسید.",
			errEmail: "ایمیل معتبر نیست.",
			errMessage: "کمی بیشتر توضیح دهید — حداقل چند جمله.",
			errType: "یک نوع درخواست انتخاب کنید."
		},
		footer: {
			blurb: "استودیوی بنیان‌گذار. ساخت، تحلیل، ساختار، سرمایه.",
			studio: "استودیو",
			legal: "حقوقی",
			rights: "تمامی حقوق محفوظ است.",
			disclaimer: "سلب مسئولیت",
			privacy: "حریم خصوصی"
		},
		common: {
			menu: "منو",
			close: "بستن",
			lang: "EN",
			skip: "پرش به محتوا"
		},
		protocol: {
			eyebrow: "Protocol",
			title: "مسیر توکن‌سازی",
			body: "DAP دارایی واقعی را به ادعای اقتصادی قابل‌انتقال تبدیل می‌کند — فقط وقتی مالکیت، امین و عدد NAV روشن باشد.",
			railsEyebrow: "Rails",
			railsTitle: "چهار ریل",
			railsBody: "هر ریل یک کار مشخص دارد. اگر یکی نباشد، توکن فقط یک فایل است.",
			studioEyebrow: "Studio",
			studioTitle: "میز صدور",
			studioBody: "یک دارایی را انتخاب کنید، NAV و عرضه را تنظیم کنید، و صدور آزمایشی را روی همین دستگاه ببینید.",
			disclaimerTitle: "توجه",
			disclaimer: "این میز یک شبیه‌ساز آموزشی است، نه پیشنهاد فروش اوراق و نه صدور واقعی. اعداد نمونه هستند. توکن‌سازی دارایی واقعی به ساختار حقوقی، احراز هویت و مجوز حوزهٔ قضایی نیاز دارد.",
			ctaInvest: "فرصت‌های سرمایه",
			ctaContact: "گفتگو دربارهٔ پروتکل",
			holders: "دارندگان",
			protocolShare: "پروتکل",
			spvShare: "SPV",
			studio: "صدور آزمایشی",
			nav: "ارزش خالص",
			supply: "عرضه",
			lockup: "قفل زمانی",
			months: "ماه",
			price: "قیمت واحد",
			working: "NAV کاری",
			reserve: "ذخیره",
			coupon: "کوپن",
			yieldSplit: "تقسیم بازده سالانه",
			simNote: "صدور روی همین مرورگر ذخیره می‌شود. هیچ زنجیره‌ای در کار نیست.",
			issue: "صدور آزمایشی",
			issued: "روی دفتر محلی ثبت شد.",
			ledger: "دفتر صدور",
			ledgerEmpty: "هنوز صدوری ثبت نشده.",
			asset: "دارایی"
		},
		economy: {
			eyebrow: "Economy",
			title: "اقتصاد پارواز، آمادهٔ عرضه",
			body: "PRVZ خود سایت نیست. ادعای اقتصادی استودیو است: کارمزد پروتکل، دسترسی به میز، و رأی روی دور بعد. اعداد را تنظیم کنید و برگه را ثبت کنید.",
			tokenTitle: "واحد استودیو",
			tokenBody: "صد میلیون واحد پیش‌فرض. خزانه باقی‌ماندهٔ تخصیص است. شناور عمومی فقط از سبد جامعه بریده می‌شود.",
			desk: "میز عرضه",
			allocTitle: "تخصیص",
			allocBody: "هر سبد سقف دارد. اگر جمع از صد بگذرد، آخرین حرکت کوتاه می‌شود و خزانه صفر می‌ماند.",
			treasury: "خزانه",
			supply: "عرضهٔ کل",
			price: "قیمت واحد",
			fdv: "ارزش کاملاً رقیق",
			raise: "مبلغ عرضه",
			float: "شناور عمومی",
			lockup: "قفل خریداران",
			months: "ماه",
			offerTitle: "برگهٔ عرضه",
			offerBody: "ثبت، روی همین مرورگر می‌ماند. کپی خلاصه را می‌توانید برای گفتگو بفرستید. این صدور زنجیره‌ای نیست.",
			publish: "ثبت عرضه",
			published: "برگه روی دفتر محلی نشست.",
			copy: "کپی خلاصه",
			copied: "کپی شد",
			book: "عرضه‌های ثبت‌شده",
			bookEmpty: "هنوز برگه‌ای ثبت نشده. تخصیص را ببندید و عرضه را ثبت کنید.",
			disclaimerTitle: "توجه",
			disclaimer: "PARVAZ اینجا اوراق نمی‌فروشد و توکنی ضرب نمی‌کند. برگه یک پیش‌نویس داخلی است برای اینکه اقتصاد را قبل از وکیل و ساختار، روشن ببینید. بازده تضمین نمی‌شود.",
			ctaContact: "گفتگو برای ساختار",
			ctaProtocol: "توکن دارایی واقعی"
		}
	},
	en: {
		nav: {
			home: "Home",
			projects: "Projects",
			invest: "Invest",
			advisory: "Advisory",
			founder: "Founder",
			contact: "Contact",
			protocol: "Protocol",
			economy: "Economy"
		},
		hero: {
			tagline: "Build. Analyze. Structure. Invest.",
			body: "A founder-led studio that builds technology, reads opportunities, and turns ideas, assets, and businesses into ventures that can scale.",
			ctaProjects: "View projects",
			ctaInvest: "Open opportunities",
			ctaWork: "Work with us",
			ctaEconomy: "Offer the economy"
		},
		home: {
			buildingEyebrow: "Live building",
			buildingTitle: "Currently building",
			buildingBody: "Active paths — from research to products already in use.",
			allProjects: "All projects",
			investEyebrow: "Investment",
			investTitle: "Open opportunities",
			investBody: "Ventures with data, structure, and room for the right partner.",
			investAll: "Investment desk",
			advisoryEyebrow: "Advisory",
			advisoryTitle: "How we work",
			advisoryBody: "The same care we use on our own work, offered to other teams.",
			advisoryAll: "Advisory",
			founderEyebrow: "Founder",
			founderQuote: "A venture does not start with a brilliant idea. It starts with a narrow problem, disciplined building, and structure that arrives after reality.",
			founderCta: "Studio story",
			contactEyebrow: "Contact",
			contactTitle: "Write a specific path",
			contactBody: "Capital, partnership, advisory, or collaboration. Short and precise beats long and vague.",
			contactCta: "Start a conversation",
			protocolEyebrow: "Protocol",
			protocolTitle: "Real-world asset rails",
			protocolBody: "From property and invoices to metal and power — legal structure first, chain second.",
			protocolAll: "Protocol desk",
			economyEyebrow: "Economy",
			economyTitle: "The studio token",
			economyBody: "The site, the protocol, and the capital desk sit on one unit — so you can offer the economy.",
			economyAll: "Offer sheet"
		},
		projectsPage: {
			eyebrow: "Projects",
			title: "Work in motion",
			body: "Seven paths. Some are live. Some are still taking shape.",
			search: "Search a project or stack…",
			all: "All",
			empty: "Nothing matches this filter.",
			progress: "Progress",
			open: "Details",
			close: "Close",
			stack: "Stack",
			publicWork: "Public work"
		},
		cats: {
			saas: "SaaS",
			web3: "Web3",
			marketplace: "Marketplace",
			infra: "Infrastructure"
		},
		status: {
			live: "Live",
			beta: "Beta",
			development: "In development",
			research: "Research"
		},
		investPage: {
			eyebrow: "Investment",
			title: "Investment desk",
			body: "We only open a seat when product, data, and structure are ahead of the pitch.",
			openRounds: "Open rounds",
			more: "Request details",
			committed: "committed",
			filled: "filled",
			howTitle: "How we choose",
			how: [
				"The problem must be narrow and provable — not an imagined market.",
				"There must be a usable version, or a technical path that is already clear.",
				"Legal structure and ownership should be clean before money moves.",
				"A partner should bring more than capital: a network, a domain, or time."
			],
			termsTitle: "How partnership looks",
			termsBody: "Every partnership is specific. Typical shape: staged capital, a defined role, and regular reporting. This page is an invitation to talk, not a term sheet.",
			disclaimerTitle: "Notice",
			disclaimer: "PARVAZ is not a public fundraising vehicle and nothing here is an offer to sell securities. Figures are illustrative and should be independently verified. Returns are not guaranteed. If you are not a professional investor, speak with your own legal and financial advisers before making any commitment."
		},
		advisoryPage: {
			eyebrow: "Advisory",
			title: "Founder advisory",
			body: "Limited, precise help at the point where a decision actually changes.",
			fitTitle: "Who it is for",
			fit: [
				"A founder with a product and no structure.",
				"A team that needs to know whether to raise now.",
				"An operator who can see the market and wants a second reading."
			],
			notTitle: "What we do not do",
			not: [
				"Decorative decks with no decision.",
				"Open-ended weekly mentoring.",
				"Investor introductions sold as a service."
			],
			cta: "Request advisory"
		},
		founderPage: {
			eyebrow: "Founder",
			title: "One studio, several paths",
			body: "I built PARVAZ as a roof: a place where building, analysis, and structure share one method — not an agency, not a fund.",
			methodTitle: "Method",
			method: "Problem first. Then a thin build. Then data. Structure and capital come last. Skipping a stage usually costs more later.",
			caseEyebrow: "Case",
			caseTitle: "From a crowded idea to a live product",
			caseBody: "A fourteen-week engagement. Four stations. No client name.",
			timeEyebrow: "Timeline",
			timeTitle: "Studio path",
			workTitle: "Public work",
			workBody: "Selected repositories. Counts are internal snapshots, not a live GitHub claim.",
			stars: "stars",
			commits: "commits"
		},
		contactPage: {
			eyebrow: "Contact",
			title: "Start the conversation here",
			body: "Pick a type. The more precise the note, the more serious the reply.",
			name: "Name",
			email: "Email",
			message: "Message",
			type: "Request type",
			send: "Send",
			sending: "Sending…",
			successTitle: "Message saved",
			successBody: "Stored on this device. If we continue, it will be at the email you gave.",
			another: "Another message",
			namePh: "Your name",
			emailPh: "you@domain.com",
			messagePh: "What are you building, what stage, and what do you need?",
			errName: "Please write your full name.",
			errEmail: "That email does not look valid.",
			errMessage: "Add a little more — a few sentences at least.",
			errType: "Choose a request type."
		},
		footer: {
			blurb: "A founder studio. Build, analyze, structure, invest.",
			studio: "Studio",
			legal: "Legal",
			rights: "All rights reserved.",
			disclaimer: "Disclaimer",
			privacy: "Privacy"
		},
		common: {
			menu: "Menu",
			close: "Close",
			lang: "فا",
			skip: "Skip to content"
		},
		protocol: {
			eyebrow: "Protocol",
			title: "The tokenization path",
			body: "DAP turns a real asset into a transferable economic claim — only when title, custody, and NAV are already clear.",
			railsEyebrow: "Rails",
			railsTitle: "Four rails",
			railsBody: "Each rail does one job. If one is missing, the token is just a file.",
			studioEyebrow: "Studio",
			studioTitle: "Issuance desk",
			studioBody: "Pick an asset, set NAV and supply, and run a local issuance. Nothing leaves this device.",
			disclaimerTitle: "Notice",
			disclaimer: "This desk is a teaching simulator, not an offer of securities and not a live mint. Figures are illustrative. Tokenizing a real asset needs legal structure, KYC, and the right jurisdiction.",
			ctaInvest: "Open opportunities",
			ctaContact: "Talk about the protocol",
			holders: "Holders",
			protocolShare: "Protocol",
			spvShare: "SPV",
			studio: "Trial issuance",
			nav: "Net asset value",
			supply: "Supply",
			lockup: "Lockup",
			months: "months",
			price: "Unit price",
			working: "Working NAV",
			reserve: "Reserve",
			coupon: "Coupon",
			yieldSplit: "Annual yield split",
			simNote: "Issuance is stored in this browser. No chain is involved.",
			issue: "Run trial issuance",
			issued: "Saved to the local ledger.",
			ledger: "Issuance ledger",
			ledgerEmpty: "No issuances recorded yet.",
			asset: "Asset"
		},
		economy: {
			eyebrow: "Economy",
			title: "The PARVAZ economy, ready to offer",
			body: "PRVZ is not the website. It is an economic claim on the studio: protocol fees, desk access, and a vote on the next round. Set the numbers and file the sheet.",
			tokenTitle: "Studio unit",
			tokenBody: "One hundred million units by default. Treasury is whatever allocation leaves. The public float is cut only from the community bucket.",
			desk: "Offer desk",
			allocTitle: "Allocation",
			allocBody: "Each bucket has a cap. If the sum would pass one hundred, the last move is shortened and treasury stays at zero.",
			treasury: "Treasury",
			supply: "Total supply",
			price: "Unit price",
			fdv: "Fully diluted value",
			raise: "Offer size",
			float: "Public float",
			lockup: "Buyer lock",
			months: "months",
			offerTitle: "Offer sheet",
			offerBody: "Filing stays in this browser. Copy the summary into a conversation. Nothing is minted on a chain.",
			publish: "File the offer",
			published: "Sheet saved to the local book.",
			copy: "Copy summary",
			copied: "Copied",
			book: "Filed offers",
			bookEmpty: "No sheet filed yet. Close the allocation, then file the offer.",
			disclaimerTitle: "Notice",
			disclaimer: "PARVAZ is not selling securities here and is not minting a token. The sheet is an internal draft so the economy is clear before lawyers and structure. Returns are not guaranteed.",
			ctaContact: "Talk structure",
			ctaProtocol: "Real-asset tokens"
		}
	}
};
function useT() {
	return copy[useLang((s) => s.lang)];
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Page({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto w-full max-w-6xl px-6", className),
		children
	});
}
function SectionHeader({ eyebrow, title, body, align = "start" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-medium tracking-tight text-fg md:text-4xl",
				children: title
			}),
			body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-base text-muted",
				children: body
			}) : null
		]
	});
}
//#endregion
export { useLang as a, hydrateLang as i, SectionHeader as n, useT as o, cn as r, Page as t };
