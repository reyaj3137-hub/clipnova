/**
 * Download Simulation Module for ClipNova
 */
const Downloader = {
  activeDownload: null,

  startDownload(format, onProgress, onComplete, onError) {
    let percent = 0;
    const totalSizeMB = parseFloat(format.size) || 15;
    
    this.activeDownload = setInterval(() => {
      percent += Math.floor(Math.random() * 12) + 5;

      if (percent >= 100) {
        percent = 100;
        clearInterval(this.activeDownload);
        this.activeDownload = null;
        
        const loadedMB = totalSizeMB.toFixed(1);
        onProgress(100, loadedMB, loadedMB);
        onComplete({
          fileName: `ClipNova_${Date.now()}.${format.type === 'audio' ? 'mp3' : 'mp4'}`,
          size: format.size,
          type: format.type
        });
      } else {
        const loadedMB = ((percent / 100) * totalSizeMB).toFixed(1);
        onProgress(percent, loadedMB, totalSizeMB.toFixed(1));
      }
    }, 300);
  },

  cancelDownload() {
    if (this.activeDownload) {
      clearInterval(this.activeDownload);
      this.activeDownload = null;
      return true;
    }
    return false;
  }
};

window.Downloader = Downloader;
