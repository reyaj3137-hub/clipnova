/**
 * Main Application Logic for ClipNova
 */
document.addEventListener('DOMContentLoaded', () => {
  UI.init();

  const form = document.getElementById('url-form');
  const urlInput = document.getElementById('url-input');
  const openModalBtn = document.getElementById('open-download-modal-btn');
  const startDownloadBtn = document.getElementById('start-download-btn');
  const cancelDownloadBtn = document.getElementById('cancel-download-btn');
  const downloadAgainBtn = document.getElementById('download-again-btn');

  let currentMediaData = null;

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();

    if (!url) {
      UI.showError('Please paste a valid video URL.');
      return;
    }

    const activePlatformBtn = document.querySelector('.platform-btn.active');
    const selectedPlatform = activePlatformBtn ? activePlatformBtn.dataset.platform : null;

    if (!Validator.isValidUrl(url, selectedPlatform)) {
      UI.showError('Invalid URL or platform mismatch. Please check the link.');
      return;
    }

    UI.showLoading();

    try {
      const data = await MediaAPI.fetchMetadata(url, selectedPlatform);
      currentMediaData = data;
      UI.renderResult(data);
    } catch (err) {
      UI.showError(err.message || 'Failed to analyze URL.');
    }
  });

  openModalBtn?.addEventListener('click', () => {
    if (!currentMediaData) return;
    UI.elements.modalSelectionView.classList.remove('hidden');
    UI.elements.modalProgressView.classList.add('hidden');
    UI.elements.modalCompleteView.classList.add('hidden');
    UI.elements.downloadModal.classList.remove('hidden');
  });

  startDownloadBtn?.addEventListener('click', () => {
    const selectedItem = document.querySelector('.format-item.selected');
    if (!selectedItem) return;

    const format = {
      id: selectedItem.dataset.formatId,
      size: selectedItem.dataset.size,
      type: selectedItem.dataset.type
    };

    UI.elements.modalSelectionView.classList.add('hidden');
    UI.elements.modalProgressView.classList.remove('hidden');

    Downloader.startDownload(
      format,
      (percent, loaded, total) => {
        UI.elements.progressBar.style.width = `${percent}%`;
        UI.elements.progressPercent.textContent = `${percent}%`;
        UI.elements.progressStats.textContent = `${loaded} MB / ${total} MB`;
      },
      (fileDetails) => {
        UI.elements.modalProgressView.classList.add('hidden');
        UI.elements.modalCompleteView.classList.remove('hidden');
      },
      (err) => {
        alert('Download failed');
      }
    );
  });

  cancelDownloadBtn?.addEventListener('click', () => {
    Downloader.cancelDownload();
    UI.elements.modalProgressView.classList.add('hidden');
    UI.elements.modalSelectionView.classList.remove('hidden');
  });

  downloadAgainBtn?.addEventListener('click', () => {
    UI.elements.modalCompleteView.classList.add('hidden');
    UI.elements.modalSelectionView.classList.remove('hidden');
  });
});
