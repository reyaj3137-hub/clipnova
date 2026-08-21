/**
 * Mock API Handling Module for ClipNova
 */
const MediaAPI = {
  async fetchMetadata(url, platform) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (!url) {
      throw new Error('Please enter a valid URL.');
    }

    // Mock response data
    return {
      title: 'Sample High Quality Video - ClipNova Demo',
      platform: platform || 'YouTube',
      duration: '03:45',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop&q=80',
      formats: [
        { id: '1080p', label: '1080p Full HD', size: '45.2 MB', type: 'video' },
        { id: '720p', label: '720p HD', size: '22.8 MB', type: 'video' },
        { id: '480p', label: '480p SD', size: '12.4 MB', type: 'video' },
        { id: 'mp3-320', label: 'Audio MP3 (320kbps)', size: '8.5 MB', type: 'audio' },
        { id: 'mp3-128', label: 'Audio MP3 (128kbps)', size: '3.2 MB', type: 'audio' }
      ]
    };
  }
};

window.MediaAPI = MediaAPI;
