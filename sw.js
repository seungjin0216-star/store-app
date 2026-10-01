// 장수 매장앱 — 폰 알림만 받습니다 (2026-10-02)
// 13:30 챙겨 올 것 · 16:00 고기 입고 · 22:00 식자재 발주 · 마감 완료
// 보내는 쪽: 사장앱 서버 (Netlify · owner-staff.mjs / owner-api staffevent)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', event => {
  let d = { title: '장수 매장앱', body: '확인할 것이 있습니다' };
  try { d = Object.assign(d, event.data.json()); } catch (e) {}
  event.waitUntil(self.registration.showNotification(d.title, {
    body: d.body, icon: 'icon-192.png', badge: 'icon-192.png', tag: 'store-' + (d.title || ''), renotify: true,
    data: { url: d.url || './baekseok.html' },
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow((event.notification.data && event.notification.data.url) || './baekseok.html'));
});
