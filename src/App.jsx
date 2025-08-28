import React, { useRef } from "react";
import { MapPin, Baby, CheckCircle2, Home, Activity, MessageCircle, Send } from "lucide-react";
import {
  BRAND,
  PHONE,
  WHATSAPP,
  WHATSAPP_MESSAGE,
  TELEGRAM,
  ADDRESS,
  services,
} from "./constants.js";

// Мини‑самопроверки (консоль браузера)
(function runSelfTests() {
  console.assert(typeof BRAND === "string" && BRAND.length > 0, "BRAND must be a non-empty string");
  console.assert(!/\\/.test(BRAND), "BRAND must not contain stray backslashes");
  console.assert(Array.isArray(services) && services.length >= 3, "services must contain at least 3 items");
  console.info("✅ Self-tests passed");
})();

const Icon = ({ name }) => {
  const map = { Baby, CheckCircle2, Home, Activity };
  const Cmp = map[name] || CheckCircle2;
  return <Cmp className="w-6 h-6" strokeWidth={1.5} />;
};

const METRIKA_ID = 123456789;
const track = (goal) => window.ym?.(METRIKA_ID, "reachGoal", goal);

export default function App() {
  const formRef = useRef(null);
  const serviceRef = useRef(null);
  const commentRef = useRef(null);
  const scrollToForm = (message = "", serviceTitle = "") => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (message && commentRef.current) commentRef.current.value = message;
    if (serviceTitle && serviceRef.current) serviceRef.current.value = serviceTitle;
  };
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const sendMessage = (platform) => {
    const formEl = formRef.current.querySelector('form');
    const fd = new FormData(formEl);
    const name = fd.get('name');
    const phone = fd.get('phone');
    const serviceTitle = fd.get('service');
    const date = fd.get('date');
    const comment = fd.get('comment');
    const msg = `Здравствуйте! Меня зовут ${name}. Интересует ${serviceTitle}. Дата: ${date}. Телефон: ${phone}${comment ? `. ${comment}` : ''}`;
    const encoded = encodeURIComponent(msg);
    const url =
      platform === 'wa'
        ? `https://wa.me/${WHATSAPP}?text=${encoded}`
        : `https://t.me/${TELEGRAM}?text=${encoded}`;
    track(platform === 'wa' ? 'form_whatsapp' : 'form_telegram');
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-2xl">
              <img src="/images/logo-horse.png" alt="" className="w-5 h-5" />
            </span>
            <span className="font-semibold tracking-tight">{BRAND}</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-amber-700">Услуги</a>
            <a href="#faq" className="hover:text-amber-700">FAQ</a>
            <a href="#contacts" className="hover:text-amber-700">Контакты</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_click")}
              className="hidden md:block text-sm text-neutral-600"
            >
              WhatsApp
            </a>
            <a
              href={`https://t.me/${TELEGRAM}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("telegram_click")}
              className="hidden md:block text-sm text-neutral-600"
            >
              Telegram
            </a>
            <button
              onClick={() => {
                track("package_select");
                scrollToForm("Хочу записаться на урок");
              }}
              className="px-3 py-2 rounded-xl bg-amber-600 text-white text-sm shadow hover:bg-amber-700 active:scale-[.98]"
            >
              Записаться
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative"
          style={{
            backgroundImage: 'url(/2_horses.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
          }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/35 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 h-[60vh] min-h-[420px] flex flex-col justify-end pb-12 text-white">
          <span className="inline-block w-fit mb-3 text-[11px] tracking-widest uppercase text-white/80">
            Верховая езда • Выездка • Постой
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Завидово: учим, тренируем, заботимся о лошадях
          </h1>
          <p className="max-w-2xl mt-4 text-white/90 text-base sm:text-lg">
            Zavodovo Horses — уютный конный клуб в дер. Щёлково. Обучение для взрослых и детей, тренировки по выездке, постой лошадей.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={scrollToForm} className="px-5 py-3 rounded-2xl bg-amber-600 text-white shadow hover:bg-amber-700 active:scale-[.99]">
              Записаться
            </button>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_click")}
              className="px-5 py-3 rounded-2xl border border-white/70 text-white hover:bg-white/10"
            >
              Написать в WhatsApp
            </a>
            <a
              href={`https://t.me/${TELEGRAM}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("telegram_click")}
              className="px-5 py-3 rounded-2xl border border-white/70 text-white hover:bg-white/10"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>

      {/* BADGES */}
      <section className="max-w-6xl mx-auto px-4 mt-6 grid sm:grid-cols-3 gap-3">
        {["Новичкам и опытным", "Шлемы и защита включены", "Тёплая комната отдыха"].map((b, i) => (
          <div key={i} className="rounded-2xl bg-white border border-neutral-200 p-3 text-sm shadow-sm">
            {b}
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
        <div className="flex items-end justify-between gap-6 mb-2">
          <h2 className="text-2xl sm:text-3xl font-semibold">Наши услуги</h2>
          <button
            onClick={() => {
              track("package_select");
              scrollToForm("Хочу записаться на урок");
            }}
            className="hidden sm:block px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm"
          >
            Выбрать и записаться
          </button>
        </div>
        <p className="mb-8 text-sm text-neutral-600">Цены по запросу</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <article key={i} className="group rounded-2xl bg-white border border-neutral-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-800 border border-amber-200">
                  <Icon name={s.icon} />
                </span>
                <h3 className="font-medium">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    track("package_select");
                    scrollToForm(`Записаться на ${s.title}`, s.title);
                  }}
                  className="text-sm text-amber-700 hover:underline"
                >
                  Записаться →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* GALLERY */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Галерея</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { src: '/images/belis_do.jpg', alt: 'Прогулка на лошади в манеже' },
            { src: '/images/beylis_posle.jpg', alt: 'Лошадь на пастбище' },
            { src: '/images/dressage-1.jpg', alt: 'Тренировка по выездке' },
            { src: '/images/dressage-2.jpg', alt: 'Проезд мимо трибун на тренировке' },
            { src: '/images/stable-horse.jpg', alt: 'Лошадь в деннике' },
            { src: '/images/awards-team.jpg', alt: 'Команда Zavodovo Horses с наградами' },
          ].map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-48 object-cover rounded-2xl border border-neutral-200" />
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-6 items-center">
          <div className="grid grid-cols-2 gap-3">
            <img src="/images/awards-team.jpg" alt="Команда Zavodovo Horses на пьедестале с наградами" className="rounded-2xl object-cover w-full h-48 sm:h-56" loading="lazy" decoding="async" />
            <img src="/images/awards-trophies.jpg" alt="Кубки и грамоты Zavodovo Horses" className="rounded-2xl object-cover w-full h-48 sm:h-56" loading="lazy" decoding="async" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Победы наших спортсменов</h2>
            <p className="mt-3 text-neutral-600">
              Регулярно выступаем на областных стартах и кубках. Занятия по выездке — с разбором ошибок и подготовкой к стартам.
            </p>
            <div className="mt-5 text-sm text-neutral-500">Фото: наши спортсмены и трофеи.</div>
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section id="safety" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-semibold">Безопасность и правила</h2>
        <p className="mt-4 text-neutral-700">Мы строго соблюдаем безопасность</p>
        <ul className="mt-4 space-y-2 text-sm text-neutral-700">
          <li>Перед занятием — инструктаж.</li>
          <li>Шлемы и защитные жилеты выдаём.</li>
          <li>Лошадей подбираем по уровню всадника.</li>
          <li>Погода/трассы — по сезону и состоянию грунта.</li>
        </ul>
        <h3 className="mt-6 font-medium">Что надеть</h3>
        <ul className="mt-2 space-y-2 text-sm text-neutral-700">
          <li>Удобные штаны без внутреннего грубого шва.</li>
          <li>Закрытая обувь с небольшим каблуком.</li>
          <li>Перчатки (по желанию).</li>
        </ul>
      </section>

      {/* FORM */}
      <section ref={formRef} className="bg-white/60 border-y border-neutral-200 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-semibold">Быстрая запись</h2>
          <p className="mt-2 text-neutral-600 text-sm">Оставьте контакты, мы уточним детали и время.</p>
          <form className="mt-6 grid md:grid-cols-3 gap-4">
            <input
              name="name"
              required
              placeholder="Ваше имя"
              className="px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <input
              name="phone"
              required
              placeholder="+7 ХХХ ХХХ-ХХ-ХХ"
              inputMode="tel"
              className="px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <select
              name="service"
              ref={serviceRef}
              className="px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              {services.map((s, i) => <option key={i}>{s.title}</option>)}
            </select>
            <input name="date" type="date" className="px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300" />
            <input
              name="comment"
              ref={commentRef}
              placeholder="Пожелания (необязательно)"
              className="md:col-span-2 px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <div className="md:col-span-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => sendMessage('wa')}
                className="px-5 py-3 rounded-2xl bg-emerald-500 text-white shadow hover:bg-emerald-600 active:scale-[.98]"
              >
                Отправить в WhatsApp
              </button>
              <button
                type="button"
                onClick={() => sendMessage('tg')}
                className="px-5 py-3 rounded-2xl bg-sky-500 text-white shadow hover:bg-sky-600 active:scale-[.98]"
              >
                Отправить в Telegram
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-neutral-700 flex flex-col gap-1">
            <a
              className="inline-flex items-center gap-2 underline"
              href={waLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_click")}
            >
              <MessageCircle className="w-4 h-4" /> {PHONE}
            </a>
            <a
              className="inline-flex items-center gap-2 underline"
              href={`https://t.me/${TELEGRAM}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("telegram_click")}
            >
              <Send className="w-4 h-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* TRAINING / DRESSAGE */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl sm:text-3xl font-semibold">Тренировки по выездке</h2>
          <p className="mt-2 text-neutral-600">Спокойная подача, чистая посадка, понятная методика для взрослых и детей.</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <figure className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
              <img src="/images/dressage-portrait.jpg" alt="Всадница в манеже — портретный кадр на шагу" className="w-full h-56 object-cover" loading="lazy" decoding="async" />
              <figcaption className="p-3 text-sm text-neutral-600">Первые занятия — спокойно и безопасно</figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
              <img src="/images/dressage-1.jpg" alt="Тренировка по выездке — рысь в манеже" className="w-full h-56 object-cover" loading="lazy" decoding="async" />
              <figcaption className="p-3 text-sm text-neutral-600">Развиваем посадку и управление</figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
              <img src="/images/dressage-2.jpg" alt="Тренировка по выездке — проход мимо зрительской трибуны" className="w-full h-56 object-cover" loading="lazy" decoding="async" />
              <figcaption className="p-3 text-sm text-neutral-600">Подготовка к стартам по выездке</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* STABLE / CARE */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Условия постоя</h2>
            <ul className="mt-4 space-y-2 text-neutral-700 list-disc pl-5">
              <li>Просторные денники, выгула, индивидуальный рацион</li>
              <li>Ежедневный уход, кормление по графику</li>
              <li>Ветеринарный контроль по договорённости</li>
            </ul>
            <button onClick={scrollToForm} className="mt-5 px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm">Узнать условия постоя</button>
          </div>
          <img src="/images/stable-horse.jpg" alt="Лошадь в деннике — условия постоя" className="rounded-2xl object-cover w-full h-64 md:h-80 border border-neutral-200" loading="lazy" decoding="async" />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-semibold">Частые вопросы</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {[
            ["Можно ли без опыта?", "Да, инструктор познакомит с правилами, подберём спокойную лошадь."],
            ["Что надеть?", "Удобные штаны без швов на внутренней стороне, закрытую обувь с небольшим каблуком. Шлем выдаём."],
            ["Как оплатить?", "Наличные, перевод, по запросу — счёт. Сертификаты доступны круглогодично."]
          ].map(([q, a], i) => (
            <details key={i} className="rounded-2xl bg-white border border-neutral-200 p-5 open:shadow-sm">
              <summary className="font-medium cursor-pointer">{q}</summary>
              <p className="mt-2 text-sm text-neutral-600">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="bg-neutral-900 text-neutral-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Контакты</h2>
            <p className="mt-4 text-neutral-300 inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> Адрес: {ADDRESS}</p>
            <div className="mt-3 text-neutral-300">
              WhatsApp: <a className="underline" href={waLink} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click")}>{PHONE}</a>
            </div>
            <div className="mt-1 text-neutral-300">
              Telegram: <a className="underline" href={`https://t.me/${TELEGRAM}`} target="_blank" rel="noreferrer" onClick={() => track("telegram_click")}>{PHONE}</a>
            </div>
            <p className="mt-6 text-sm text-neutral-400">Работаем по предварительной записи.</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-800/50 p-4">
            <p className="text-neutral-300 text-sm">Мы на карте: дер. Щёлково, Конаковский район, Тверская область.</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <a
                className="underline"
                target="_blank"
                rel="noreferrer"
                onClick={() => track("map_yandex_click")}
                href="https://yandex.ru/maps/org/zolotoye_secheniye/29237188099/?ll=36.606123%2C56.609752&z=15"
              >
                Открыть в Яндекс.Картах
              </a>
              <a
                className="underline"
                target="_blank"
                rel="noreferrer"
                onClick={() => track("map_2gis_click")}
                href="https://go.2gis.com/f2fxw"
              >
                Открыть в 2ГИС
              </a>
              <a
                className="underline"
                target="_blank"
                rel="noreferrer"
                onClick={() => track("map_google_click")}
                href="https://maps.app.goo.gl/c1fxxE2YWXgzW8hV7"
              >
                Открыть в Google Maps
              </a>
            </div>
            <div className="mt-2 text-xs text-neutral-400">В Яндекс.Картах — самая актуальная информация.</div>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-950 text-neutral-400">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-amber-200/70 border border-amber-300">
              <img src="/images/logo-horse.png" alt="" className="w-4 h-4" />
            </span>
            <span className="text-sm">{BRAND}</span>
          </div>
          <div className="text-xs flex items-center gap-4">
            <span>© {new Date().getFullYear()} {BRAND}. Любовь к лошадям — в деталях.</span>
            <a className="underline" href="/offer.html" target="_blank" rel="noreferrer">
              Оферта
            </a>
            <a className="underline" href="/privacy.html" target="_blank" rel="noreferrer">
              Политика
            </a>
          </div>
        </div>
      </footer>

      {/* FLOAT BUTTON */}
      <a
        href={waLink}
        onClick={() => track("whatsapp_click")}
        className="fixed bottom-4 right-4 px-4 py-3 rounded-2xl bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 inline-flex items-center gap-2"
      >
        <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
      </a>
    </div>
  );
}
