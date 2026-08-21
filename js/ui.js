/**
 * UI Controller Module for ClipNova
 */
const UI = {
  elements: {
    urlForm: document.getElementById('url-form'),
    urlInput: document.getElementById('url-input'),
    clearBtn: document.getElementById('clear-btn'),
    searchBtn: document.getElementById('search-btn'),
    platformBtns: document.querySelectorAll('.platform-btn'),
    statusContainer: document.getElementById('status-container'),
    loadingState: document.getElementById('loading-state'),
    errorState: document.getElementById('error-state'),
    emptyState: document.getElementById('empty-state'),
    errorMessage: document.getElementById('error-message'),
    resultContainer: document.getElementById('result-container'),
    resultThumb: document.getElementById('result-thumb'),
    resultTitle: document.getElementById('result-title'),
    resultDuration: document.getElementById('result-duration'),
    resultPlatform: document.getElementById('result-platform'),
    downloadModal: document.getElementById('download-modal'),
    openModalBtn: document.getElementById('open-download-modal-btn'),
    formatOptionsList: document.getElementById('format-options-list'),
    modalSelectionView: document.getElementById('modal-selection-view'),
    modalProgressView: document.getElementById('modal-progress-view'),
    modalCompleteView: document.getElementById('modal-complete-view'),
    progressBar: document.getElementById('progress-bar'),
    progressPercent: document.getElementById('progress-percent'),
    progressStats: document.getElementById('progress-stats'),
    startDownloadBtn: document.getElementById('start-download-btn'),
    cancelDownloadBtn: document.getElementById('cancel-download-btn'),
    downloadAgainBtn: document.getElementById('download-again-btn')
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    this.elements.urlInput?.addEventListener('input', (e) => {
      if (e.target.value.trim().length > 0) {
        this.elements.clearBtn?.classList.remove('hidden');
      } else {
        this.elements.clearBtn?.classList.add('hidden');
      }
    });

    this.elements.clearBtn?.addEventListener('click', () => {
      this.elements.urlInput.value = '';
      this.elements.clearBtn.classList.add('hidden');
      this.elements.urlInput.focus();
    });

    this.elements.platformBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.elements.platformBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) modal.classList.add('hidden');
      });
    });

    document.querySelectorAll('[data-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-modal');
        const targetModal = document.getElementById(targetId);
        if (targetModal) targetModal.classList.remove('hidden');
      });
    });
  },

  showLoading() {
    this.elements.statusContainer?.classList.remove('hidden');
    this.elements.loadingState?.classList.remove('hidden');
    this.elements.errorState?.classList.add('hidden');
    this.elements.emptyState?.classList.add('hidden');
    this.elements.resultContainer?.classList.add('hidden');
  },

  hideStatus() {
    this.elements.statusContainer?.classList.add('hidden');
    this.elements.loadingState?.classList.add('hidden');
  },

  showError(msg) {
    this.elements.statusContainer?.classList.remove('hidden');
    this.elements.loadingState?.classList.add('hidden');
    this.elements.errorState?.classList.remove('hidden');
    if (this.elements.errorMessage) {
      this.elements.errorMessage.textContent = msg || 'An error occurred.';
    }
  },

  renderResult(data) {
    this.hideStatus();
    this.elements.resultContainer?.classList.remove('hidden');
    
    if (this.elements.resultThumb) this.elements.resultThumb.src = data.thumbnail;
    if (this.elements.resultTitle) this.elements.resultTitle.textContent = data.title;
    if (this.elements.resultDuration) this.elements.resultDuration.textContent = data.duration;
    if (this.elements.resultPlatform) this.elements.resultPlatform.textContent = data.platform;

    this.renderFormats(data.formats);
  },

  renderFormats(formats) {
    if (!this.elements.formatOptionsList) return;
    this.elements.formatOptionsList.innerHTML = '';

    formats.forEach((fmt, index) => {
      const item = document.createElement('div');
      item.className = `format-item ${index === 0 ? 'selected' : ''}`;
      item.dataset.formatId = fmt.id;
      item.dataset.size = fmt.size;
      item.dataset.type = fmt.type;

      item.innerHTML = `
        <div>
          <strong>${fmt.label}</strong>
        </div>
        <span class="text-muted">${fmt.size}</span>
      `;

      item.addEventListener('click', () => {
        document.querySelectorAll('.format-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
      });

      this.elements.formatOptionsList.appendChild(item);
    });
  }
};

window.UI = UI;
