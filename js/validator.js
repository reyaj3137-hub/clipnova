/**
 * URL Validation Module for ClipNova
 */
const Validator = {
  patterns: {
    youtube: /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/i,
    facebook: /^(https?:\/\/)?(www\.|m\.|web\.)?(facebook\.com|fb\.watch)\/.+$/i,
    tiktok: /^(https?:\/\/)?(www\.|vm\.|vt\.)?tiktok\.com\/.+$/i,
    instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/.+$/i
  },

  detectPlatform(url) {
    if (!url) return null;
    const cleanUrl = url.trim();
    for (const [platform, pattern] of Object.entries(this.patterns)) {
      if (pattern.test(cleanUrl)) {
        return platform;
      }
    }
    return null;
  },

  isValidUrl(url, targetPlatform = null) {
    if (!url || typeof url !== 'string') return false;
    const cleanUrl = url.trim();
    
    try {
      new URL(cleanUrl);
    } catch (_) {
      return false;
    }

    if (targetPlatform && this.patterns[targetPlatform]) {
      return this.patterns[targetPlatform].test(cleanUrl);
    }

    return Object.values(this.patterns).some(pattern => pattern.test(cleanUrl));
  }
};

window.Validator = Validator;
