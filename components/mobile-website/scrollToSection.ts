// Переход к разделу после закрытия меню: ждём снятия блокировки прокрутки
export function scrollToSection(hash: string) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      target.scrollIntoView({ block: "start" });
      history.replaceState(null, "", hash);
      target.focus({ preventScroll: true });
    });
  });
}
