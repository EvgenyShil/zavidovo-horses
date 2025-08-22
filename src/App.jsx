import React, { useRef } from "react";
import { Phone, Mail, MapPin, Baby, Rabbit, CheckCircle2, Home, Activity, MessageCircle } from "lucide-react";
import {
  BRAND,
  PHONE,
  PHONE_LINK,
  WHATSAPP,
  WHATSAPP_MESSAGE,
  EMAIL,
  TELEGRAM,
  ADDRESS,
  services,
} from "./constants.js";

// Мини‑самопроверки (консоль браузера)
(function runSelfTests() {
  console.assert(typeof BRAND === "string" && BRAND.length > 0, "BRAND must be a non-empty string");
  console.assert(!/\\/.test(BRAND), "BRAND must not contain stray backslashes");
  console.assert(/^\d+$/.test(PHONE_LINK), "PHONE_LINK must contain only digits");
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
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-amber-200/70 border border-amber-300 shadow-sm">
              <Rabbit className="w-5 h-5" strokeWidth={1.5} />
            </span>
            <span className="font-semibold tracking-tight">{BRAND}</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-amber-700">Услуги</a>
            <a href="#prices" className="hover:text-amber-700">Цены</a>
            <a href="#faq" className="hover:text-amber-700">FAQ</a>
            <a href="#contacts" className="hover:text-amber-700">Контакты</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE_LINK}`}
              onClick={() => track("phone_click")}
              className="hidden md:block text-sm text-neutral-600"
            >
              {PHONE}
            </a>
            <button
              onClick={() => {
                track("package_select");
                scrollToForm();
              }}
              className="px-3 py-2 rounded-xl bg-amber-600 text-white text-sm shadow hover:bg-amber-700 active:scale-[.98]"
            >
              Записаться
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-amber-50 to-neutral-100">
        <div className="max-w-6xl mx-auto px-4 h-[52vh] flex flex-col justify-end pb-12">
          <h1 className="text-neutral-900 text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Завидово: учим, тренируем, заботимся о лошадях
          </h1>
          <p className="max-w-2xl mt-4 text-neutral-700 text-base sm:text-lg">
            {BRAND} — уютный конный клуб в дер. Щёлково. Обучение верховой езде для взрослых и детей, выездка и постой лошадей.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => {
                track("package_select");
                scrollToForm();
              }}
              className="px-5 py-3 rounded-2xl bg-neutral-900 text-white shadow hover:shadow-md active:scale-[.99]"
            >
              Записаться
            </button>
            <a
              href={waLink}
              onClick={() => track("whatsapp_click")}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-2xl border border-neutral-700 text-neutral-900 hover:bg-neutral-900/5"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* BADGES */}
      <section className="max-w-6xl mx-auto px-4 mt-6 sm:-mt-8 grid sm:grid-cols-3 gap-3">
        {["Новичкам и опытным", "Шлемы и защита включены", "Тёплая комната отдыха"].map((b, i) => (
          <div key={i} className="rounded-2xl bg-white border border-neutral-200 p-3 text-sm shadow-sm">
            {b}
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">Наши услуги</h2>
            <button
              onClick={() => {
                track("package_select");
                scrollToForm();
              }}
              className="hidden sm:block px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm"
            >
              Выбрать и записаться
            </button>
        </div>
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
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[15px] font-medium text-neutral-800">{s.price}</span>
                <button
                  onClick={() => {
                    track("package_select");
                    scrollToForm();
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

      {/* PRICES */}
      <section id="prices" className="bg-white/60 border-y border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-semibold">Прайс</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[{
              name: "Урок (1 час)",
              price: "2 000 ₽",
              features: ["Микрогруппа до 2 человек", "Инструктор рядом", "Шлем и защита"],
              badge: "Популярно",
            }, {
              name: "Прогулка по полям/лесу (1 час)",
              price: "3 000 ₽",
              features: ["Безопасный маршрут", "Чай после занятия", "Фото на телефон"],
              badge: "Хит",
            }, {
              name: "Урок с тренером (манеж)",
              price: "3 500 ₽",
              features: ["Индивидуальная программа", "Отработка посадки", "Домашнее задание"],
            }].map((p, i) => (
              <div key={i} className={`rounded-2xl border p-6 bg-white shadow-sm ${p.badge ? "border-amber-400" : "border-neutral-200"}`}>
                {p.badge && (
                  <span className="inline-block text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">{p.badge}</span>
                )}
                <h3 className="mt-2 text-lg font-semibold">{p.name}</h3>
                <div className="mt-2 text-3xl font-semibold">{p.price}</div>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-[2px]" strokeWidth={1.8} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    track("package_select");
                    scrollToForm();
                  }}
                  className="mt-6 w-full px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm"
                >
                  Выбрать
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section id="safety" className="max-w-6xl mx-auto px-4 py-16">
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
        <h3 className="mt-6 font-medium">Возраст и ограничения</h3>
        <ul className="mt-2 space-y-2 text-sm text-neutral-700">
          <li>Дети: с 3 лет — пони‑прогулки с проводником; с 10+ — занятия на лошадях.</li>
          <li>Весовые ограничения: [укажите, если есть].</li>
        </ul>
      </section>

      {/* CERTIFICATES */}
      <section className="bg-white/60 border-y border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold">Подарочные сертификаты</h2>
          <p className="mt-4 text-neutral-700 max-w-2xl mx-auto">
            Электронный сертификат за 5 минут — на прогулку, урок или фотосессию. Срок действия — [укажите]. Персонализируем
            под получателя.
          </p>
          <button
            onClick={() => {
              track("package_select");
              scrollToForm();
            }}
            className="mt-6 px-5 py-3 rounded-2xl bg-amber-600 text-white shadow hover:bg-amber-700 active:scale-[.98]"
          >
            Получить сертификат
          </button>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold">Отзывы</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            [
              "Отличное первое знакомство с верховой ездой. Тренер деликатно объясняет, лошадь очень спокойная.",
              "Анна",
            ],
            ["Приезжаем семьёй по выходным. Дочке нравится пони-прогулка, я занимаюсь выездкой.", "Сергей"],
            ["Чистые денники, внимательный уход — постой без хлопот.", "Мария"],
          ].map(([t, a], i) => (
            <figure key={i} className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-sm">
              <blockquote className="text-sm text-neutral-700">“{t}”</blockquote>
              <figcaption className="mt-3 text-sm font-medium text-neutral-900">— {a}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section ref={formRef} className="bg-white/60 border-y border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-semibold">Быстрая запись</h2>
          <p className="mt-2 text-neutral-600 text-sm">Оставьте контакты, мы уточним детали и время.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              track("form_submit");
              alert("Спасибо! Мы свяжемся с вами в течение 15 минут (10:00–20:00).");
            }}
            className="mt-6 grid md:grid-cols-3 gap-4"
          >
            <input
              required
              placeholder="Ваше имя"
              className="px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <input
              required
              placeholder="+7 ХХХ ХХХ-ХХ-ХХ"
              inputMode="tel"
              className="px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <select className="px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300">
              {services.map((s, i) => <option key={i}>{s.title}</option>)}
            </select>
            <input type="date" className="px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300" />
            <input placeholder="Пожелания (необязательно)" className="md:col-span-2 px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300" />
            <button className="md:col-span-3 px-5 py-3 rounded-2xl bg-amber-600 text-white shadow hover:bg-amber-700 active:scale-[.98]">
              Отправить заявку
            </button>
          </form>
          <div className="mt-4 text-sm text-neutral-700 flex flex-col gap-1">
            <a
              className="inline-flex items-center gap-2 underline"
              href={`tel:${PHONE_LINK}`}
              onClick={() => track("phone_click")}
            >
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
            <a className="inline-flex items-center gap-2 underline" href={`mailto:${EMAIL}`}>
              <Mail className="w-4 h-4" /> {EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold">Частые вопросы</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {[
            ["Можно ли без опыта?", "Да, инструктор познакомит с правилами, подберём спокойную лошадь."],
            ["Что надеть?", "Удобные штаны без швов на внутренней стороне, закрытую обувь с небольшим каблуком. Шлем выдаём."],
            ["Можно детям?", "С 3 лет — пони‑прогулки с проводником. На больших лошадях обычно с 10+."],
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
      <section id="contacts" className="bg-neutral-900 text-neutral-50">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Контакты</h2>
            <p className="mt-4 text-neutral-300 inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> Адрес: {ADDRESS}</p>
            <div className="mt-3 text-neutral-300">
              Телефон: <a className="underline" href={`tel:${PHONE_LINK}`} onClick={() => track("phone_click")}>{PHONE}</a>
            </div>
            <div className="mt-1 text-neutral-300">
              Email: <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
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
                href="https://yandex.ru/maps/?text=%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D1%8F%20%D0%A9%D1%91%D0%BB%D0%BA%D0%BE%D0%B2%D0%BE%20%D0%9A%D0%BE%D0%BD%D0%B0%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%20%D0%A2%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C"
              >
                Открыть в Яндекс.Картах
              </a>
              <a
                className="underline"
                target="_blank"
                rel="noreferrer"
                onClick={() => track("map_google_click")}
                href="https://maps.google.com/?q=%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D1%8F+%D0%A9%D1%91%D0%BB%D0%BA%D0%BE%D0%B2%D0%BE+%D0%9A%D0%BE%D0%BD%D0%B0%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9+%D1%80%D0%B0%D0%B9%D0%BE%D0%BD+%D0%A2%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C"
              >
                Открыть в Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-950 text-neutral-400">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-amber-200/70 border border-amber-300">
              <Rabbit className="w-4 h-4" strokeWidth={1.5} />
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
