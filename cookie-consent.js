// Cookie Consent Component for Israeli Law
class CookieConsent {
  constructor() {
    this.cookieName = 'matkunim_cookie_consent';
    this.consentGiven = this.checkConsent();
    
    if (!this.consentGiven) {
      this.createConsentBanner();
    }
  }

  checkConsent() {
    const consent = localStorage.getItem(this.cookieName);
    return consent === 'accepted';
  }

  createConsentBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-icon">🍪</div>
        <div class="cookie-text">
          <h3>שימוש בעוגיות (Cookies)</h3>
          <p>
            אתר זה משתמש בעוגיות טכניות הכרחיות להפעלת האתר בלבד.
            אנו לא משתמשים בעוגיות מעקב, פרסום או אנליטיקה.
            המידע נשמר רק במכשיר שלך ולא משותף עם צדדים שלישיים.
          </p>
          <p class="cookie-details">
            <strong>סוגי העוגיות שבהן אנו משתמשים:</strong><br>
            • שמירת העדפות חיפוש ופילטור (עוגיות הכרחיות)<br>
            • העדפות נגישות ותצוגה (עוגיות הכרחיות)
          </p>
        </div>
        <div class="cookie-actions">
          <button id="accept-cookies" class="btn-accept">
            הבנתי ואני מסכים/ה
          </button>
          <button id="learn-more" class="btn-learn">
            מידע נוסף על פרטיות
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.getElementById('accept-cookies')?.addEventListener('click', () => {
      this.acceptCookies();
    });

    document.getElementById('learn-more')?.addEventListener('click', () => {
      this.showPrivacyPolicy();
    });
  }

  acceptCookies() {
    localStorage.setItem(this.cookieName, 'accepted');
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.animation = 'slideDown 0.5s ease-out';
      setTimeout(() => banner.remove(), 500);
    }
  }

  showPrivacyPolicy() {
    alert(`מדיניות פרטיות - אתר מתכונים

אתר זה מכבד את פרטיות המשתמשים ומשתמש רק בעוגיות הכרחיות:

1. עוגיות טכניות להפעלת האתר
2. שמירת העדפות חיפוש ופילטור
3. העדפות נגישות אישיות

אנו לא:
❌ אוספים מידע אישי מזהה
❌ משתפים מידע עם צדדים שלישיים
❌ משתמשים בעוגיות מעקב או פרסום
❌ מעבירים מידע מחוץ למכשיר שלך

כל המידע נשמר רק במכשיר האישי שלך.

לשאלות: [email protected]`);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new CookieConsent();
});
