// script.ts — small, focused interactions. No framework needed for a page this size.

function initTypewriter(): void {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const lines: string[] = [
    "const dev = {",
    "  name: \"Suleyman Jama\",",
    "  role: \"Software Engineer\",",
    "  stack: [\"TS\", \"PHP\", \"Python\", \"Go\"],",
    "  focus: \"fullstack\",",
    "  status: \"open to work\",",
    "};",
  ];

  const fullText = lines.join("\n");
  let i = 0;

  function type(): void {
    if (!el) return;
    if (i <= fullText.length) {
      el.textContent = fullText.slice(0, i);
      i++;
      window.setTimeout(type, 18);
    }
  }

  type();
}

function initClock(): void {
  const el = document.getElementById("clock");
  if (!el) return;

  function tick(): void {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    if (el) el.textContent = `${hh}:${mm}`;
  }

  tick();
  window.setInterval(tick, 1000 * 15);
}

document.addEventListener("DOMContentLoaded", () => {
  initTypewriter();
  initClock();
});
