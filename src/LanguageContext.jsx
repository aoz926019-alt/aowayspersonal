import { useLayoutEffect, useRef, useState } from "react";
import { LanguageContext } from "./hooks/useLanguage.js";
import * as chinese from "./data/content.js";
import * as english from "./data/content.en.js";
import { formatMessage } from "./data/messages.js";
import { ScrollTrigger } from "./hooks/gsap";
import { scrollToPosition } from "./hooks/smoothScroll";

const valid = language => language === "en" || language === "zh";
function initialLanguage() {
  const query = new URLSearchParams(window.location.search).get("lang");
  if (valid(query)) return query;
  try { const saved = localStorage.getItem("ao-language"); if (valid(saved)) return saved; } catch { /* Storage can be disabled. */ }
  return "zh";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);
  const anchor = useRef(null);
  const t = (key, values) => formatMessage(language, key, values);
  const selectLanguage = next => {
    if (!valid(next) || next === language) return;
    const sections = [...document.querySelectorAll("main > [id]")];
    const current = sections.filter(section => section.getBoundingClientRect().top <= 140).at(-1) || sections[0];
    if (current) anchor.current = { id: current.id, top: current.getBoundingClientRect().top };
    setLanguage(next);
  };

  useLayoutEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    document.title = formatMessage(language, "title");
    const description = formatMessage(language, "description");
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", language === "en" ? "en_GB" : "zh_CN");
    try { localStorage.setItem("ao-language", language); } catch { /* The current session still switches. */ }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState(window.history.state, "", url);
    let active = true;
    // Restore before paint so a later navigation cannot be overwritten by a queued frame.
    if (anchor.current) {
      const section = document.getElementById(anchor.current.id);
      if (section) scrollToPosition(window.scrollY + section.getBoundingClientRect().top - anchor.current.top);
      anchor.current = null;
    }
    ScrollTrigger.refresh();
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; };
  }, [language]);

  return <LanguageContext.Provider value={{ language, selectLanguage, t, content: language === "en" ? english : chinese }}>{children}</LanguageContext.Provider>;
}
