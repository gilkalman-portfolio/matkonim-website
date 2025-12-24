// Accessibility Menu Component for Israeli Standard 5568 (WCAG 2.0)
class AccessibilityMenu {
  constructor() {
    this.isOpen = false;
    this.settings = this.loadSettings();
    this.createAccessibilityButton();
    this.createAccessibilityMenu();
    this.applySettings();
  }

  loadSettings() {
    const saved = localStorage.getItem('accessibility_settings');
    return saved ? JSON.parse(saved) : {
      fontSize: 100,
      contrast: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      underlineLinks: false,
      readableFont: false,
      highlightLinks: false,
      cursorSize: 'normal',
      textAlign: 'right'
    };
  }

  saveSettings() {
    localStorage.setItem('accessibility_settings', JSON.stringify(this.settings));
  }

  createAccessibilityButton() {
    const button = document.createElement('button');
    button.id = 'accessibility-button';
    button.className = 'accessibility-btn';
    button.setAttribute('aria-label', 'פתח תפריט נגישות');
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="7" r="1.5" fill="currentColor"/>
        <path d="M6 10 L12 12 L18 10" stroke-width="2"/>
        <path d="M9 12 L9 18" stroke-width="2"/>
        <path d="M15 12 L15 18" stroke-width="2"/>
      </svg>
      <span>נגישות</span>
    `;
    
    button.addEventListener('click', () => this.toggleMenu());
    document.body.appendChild(button);
  }

  createAccessibilityMenu() {
    const menu = document.createElement('div');
    menu.id = 'accessibility-menu';
    menu.className = 'accessibility-menu';
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-label', 'תפריט נגישות');
    menu.innerHTML = `
      <div class="a11y-header">
        <h2>הגדרות נגישות</h2>
        <button id="close-a11y" aria-label="סגור תפריט נגישות">✕</button>
      </div>
      
      <div class="a11y-content">
        <div class="a11y-section">
          <h3>גודל טקסט</h3>
          <div class="a11y-controls">
            <button class="a11y-btn" data-action="decreaseFontSize" aria-label="הקטן טקסט">
              A-
            </button>
            <span id="font-size-display" aria-live="polite">${this.settings.fontSize}%</span>
            <button class="a11y-btn" data-action="increaseFontSize" aria-label="הגדל טקסט">
              A+
            </button>
          </div>
        </div>

        <div class="a11y-section">
          <h3>ניגודיות</h3>
          <div class="a11y-controls">
            <button class="a11y-btn ${this.settings.contrast === 'normal' ? 'active' : ''}" 
                    data-action="setContrast" data-value="normal">
              רגיל
            </button>
            <button class="a11y-btn ${this.settings.contrast === 'high' ? 'active' : ''}" 
                    data-action="setContrast" data-value="high">
              גבוה
            </button>
            <button class="a11y-btn ${this.settings.contrast === 'inverted' ? 'active' : ''}" 
                    data-action="setContrast" data-value="inverted">
              הפוך
            </button>
          </div>
        </div>

        <div class="a11y-section">
          <h3>מרווח בין שורות</h3>
          <div class="a11y-controls">
            <button class="a11y-btn ${this.settings.lineHeight === 'normal' ? 'active' : ''}" 
                    data-action="setLineHeight" data-value="normal">
              רגיל
            </button>
            <button class="a11y-btn ${this.settings.lineHeight === 'increased' ? 'active' : ''}" 
                    data-action="setLineHeight" data-value="increased">
              מוגדל
            </button>
            <button class="a11y-btn ${this.settings.lineHeight === 'large' ? 'active' : ''}" 
                    data-action="setLineHeight" data-value="large">
              גדול
            </button>
          </div>
        </div>

        <div class="a11y-section">
          <h3>מרווח בין אותיות</h3>
          <div class="a11y-controls">
            <button class="a11y-btn ${this.settings.letterSpacing === 'normal' ? 'active' : ''}" 
                    data-action="setLetterSpacing" data-value="normal">
              רגיל
            </button>
            <button class="a11y-btn ${this.settings.letterSpacing === 'increased' ? 'active' : ''}" 
                    data-action="setLetterSpacing" data-value="increased">
              מוגדל
            </button>
          </div>
        </div>

        <div class="a11y-section">
          <h3>תכונות נוספות</h3>
          <div class="a11y-toggles">
            <label class="a11y-toggle">
              <input type="checkbox" id="underline-links" 
                     ${this.settings.underlineLinks ? 'checked' : ''}>
              <span>קו תחתון לקישורים</span>
            </label>
            
            <label class="a11y-toggle">
              <input type="checkbox" id="readable-font" 
                     ${this.settings.readableFont ? 'checked' : ''}>
              <span>גופן קריא (Arial)</span>
            </label>
            
            <label class="a11y-toggle">
              <input type="checkbox" id="highlight-links" 
                     ${this.settings.highlightLinks ? 'checked' : ''}>
              <span>הדגש קישורים</span>
            </label>
          </div>
        </div>

        <div class="a11y-section">
          <h3>גודל סמן עכבר</h3>
          <div class="a11y-controls">
            <button class="a11y-btn ${this.settings.cursorSize === 'normal' ? 'active' : ''}" 
                    data-action="setCursorSize" data-value="normal">
              רגיל
            </button>
            <button class="a11y-btn ${this.settings.cursorSize === 'large' ? 'active' : ''}" 
                    data-action="setCursorSize" data-value="large">
              גדול
            </button>
            <button class="a11y-btn ${this.settings.cursorSize === 'xlarge' ? 'active' : ''}" 
                    data-action="setCursorSize" data-value="xlarge">
              ענק
            </button>
          </div>
        </div>

        <div class="a11y-actions">
          <button class="a11y-btn-reset" id="reset-a11y">
            אפס הגדרות
          </button>
        </div>

        <div class="a11y-info">
          <p>
            <strong>הצהרת נגישות:</strong> אתר זה עומד בתקן ישראלי 5568 ומיישם את הנחיות 
            WCAG 2.0 ברמת AA. לשאלות או בעיות נגישות:
            <a href="mailto:[email protected]">[email protected]</a>
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(menu);
    this.attachMenuEventListeners();
  }

  attachMenuEventListeners() {
    // Close button
    document.getElementById('close-a11y')?.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Action buttons
    document.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        const value = e.currentTarget.dataset.value;
        this[action](value);
      });
    });

    // Toggle checkboxes
    document.getElementById('underline-links')?.addEventListener('change', (e) => {
      this.settings.underlineLinks = e.target.checked;
      this.applySettings();
      this.saveSettings();
    });

    document.getElementById('readable-font')?.addEventListener('change', (e) => {
      this.settings.readableFont = e.target.checked;
      this.applySettings();
      this.saveSettings();
    });

    document.getElementById('highlight-links')?.addEventListener('change', (e) => {
      this.settings.highlightLinks = e.target.checked;
      this.applySettings();
      this.saveSettings();
    });

    // Reset button
    document.getElementById('reset-a11y')?.addEventListener('click', () => {
      this.resetSettings();
    });

    // Close on outside click
    document.getElementById('accessibility-menu')?.addEventListener('click', (e) => {
      if (e.target.id === 'accessibility-menu') {
        this.toggleMenu();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.toggleMenu();
      }
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    const menu = document.getElementById('accessibility-menu');
    if (menu) {
      menu.classList.toggle('open', this.isOpen);
      if (this.isOpen) {
        document.getElementById('close-a11y')?.focus();
      }
    }
  }

  increaseFontSize() {
    if (this.settings.fontSize < 200) {
      this.settings.fontSize += 10;
      this.applySettings();
      this.saveSettings();
      this.updateFontSizeDisplay();
    }
  }

  decreaseFontSize() {
    if (this.settings.fontSize > 80) {
      this.settings.fontSize -= 10;
      this.applySettings();
      this.saveSettings();
      this.updateFontSizeDisplay();
    }
  }

  updateFontSizeDisplay() {
    const display = document.getElementById('font-size-display');
    if (display) {
      display.textContent = `${this.settings.fontSize}%`;
    }
  }

  setContrast(value) {
    this.settings.contrast = value;
    this.updateActiveButton('setContrast', value);
    this.applySettings();
    this.saveSettings();
  }

  setLineHeight(value) {
    this.settings.lineHeight = value;
    this.updateActiveButton('setLineHeight', value);
    this.applySettings();
    this.saveSettings();
  }

  setLetterSpacing(value) {
    this.settings.letterSpacing = value;
    this.updateActiveButton('setLetterSpacing', value);
    this.applySettings();
    this.saveSettings();
  }

  setCursorSize(value) {
    this.settings.cursorSize = value;
    this.updateActiveButton('setCursorSize', value);
    this.applySettings();
    this.saveSettings();
  }

  updateActiveButton(action, value) {
    document.querySelectorAll(`[data-action="${action}"]`).forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === value);
    });
  }

  applySettings() {
    const root = document.documentElement;
    
    // Font size
    root.style.setProperty('--font-scale', this.settings.fontSize / 100);
    
    // Contrast
    root.className = root.className.replace(/contrast-\w+/g, '');
    if (this.settings.contrast !== 'normal') {
      root.classList.add(`contrast-${this.settings.contrast}`);
    }
    
    // Line height
    const lineHeightMap = {
      normal: '1.6',
      increased: '2',
      large: '2.5'
    };
    root.style.setProperty('--line-height', lineHeightMap[this.settings.lineHeight]);
    
    // Letter spacing
    const letterSpacingMap = {
      normal: '0',
      increased: '0.05em'
    };
    root.style.setProperty('--letter-spacing', letterSpacingMap[this.settings.letterSpacing]);
    
    // Link underline
    root.classList.toggle('underline-links', this.settings.underlineLinks);
    
    // Readable font
    root.classList.toggle('readable-font', this.settings.readableFont);
    
    // Highlight links
    root.classList.toggle('highlight-links', this.settings.highlightLinks);
    
    // Cursor size
    const cursorMap = {
      normal: 'auto',
      large: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><path d=\'M2 2 L2 28 L12 20 L18 30 L22 28 L16 18 L28 18 Z\' fill=\'black\' stroke=\'white\'/></svg>") 2 2, auto',
      xlarge: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\'><path d=\'M2 2 L2 42 L18 30 L27 45 L33 42 L24 27 L42 27 Z\' fill=\'black\' stroke=\'white\' stroke-width=\'2\'/></svg>") 2 2, auto'
    };
    root.style.cursor = cursorMap[this.settings.cursorSize];
  }

  resetSettings() {
    this.settings = {
      fontSize: 100,
      contrast: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      underlineLinks: false,
      readableFont: false,
      highlightLinks: false,
      cursorSize: 'normal',
      textAlign: 'right'
    };
    
    // Update UI
    this.updateFontSizeDisplay();
    document.querySelectorAll('.a11y-btn.active').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelectorAll('.a11y-btn[data-value="normal"]').forEach(btn => {
      btn.classList.add('active');
    });
    document.querySelectorAll('.a11y-toggle input').forEach(input => {
      input.checked = false;
    });
    
    this.applySettings();
    this.saveSettings();
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityMenu();
});
