/*
  Full-featured Ruffle integration:
  - Dynamically loads Ruffle polyfill/script (local or CDN)
  - Global config + per-instance overrides
  - Promise-based loading and event hooks (loadedmetadata, loadeddata)
  - Fullscreen, suspend/resume, and error handling
*/

(function() {
  const RUFFLE_CDN = "https://unpkg.com/@ruffle-rs/ruffle";
  const LOCAL_RUFFLE = "/ruffle/ruffle.js";

  // 0️⃣ Inject Ruffle script tag (prefers local, falls back to CDN)
  function loadRuffleScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.addEventListener('load', resolve);
      script.addEventListener('error', () => reject(new Error(`Failed to load Ruffle script: ${src}`)));
      document.head.appendChild(script);
    });
  }

  // 1️⃣ Wait for DOM + Ruffle
  document.addEventListener('DOMContentLoaded', async () => {
  let usingCDN = false;
  try {
    await loadRuffleScript(LOCAL_RUFFLE);
  } catch {
    console.warn('Local Ruffle failed, falling back to CDN');
    await loadRuffleScript(RUFFLE_CDN);
    usingCDN = true;
  }
    // 2️⃣ Global configuration
  window.RufflePlayer = window.RufflePlayer || {};
  window.RufflePlayer.config = {
    publicPath: usingCDN ? 'https://unpkg.com/@ruffle-rs/ruffle/' : '/ruffle/',
    polyfills: true,
    allowScriptAccess: false,
    autoplay: 'auto',
    unmuteOverlay: 'visible',
    scale: 'showAll',
    allowFullscreen: true,
    logLevel: 'info',
    // ...other config options
  };

    // 3️⃣ Setup UI
    const games = [
        { name: "Papa's Bakeria", file: "papasbakeria.swf" },
        { name: "Papa's Burgeria", file: "papasburgeria.swf" },
        { name: "Papa's Cheeseria", file: "papascheeseria_102.swf" },
        { name: "Papa's Cupcakeria", file: "papascupcakeria.swf" },
        { name: "Papa's Donuteria", file: "papasdonuteria.swf" },
        { name: "Papa's Freezeria", file: "papasfreezeria.swf" },
        { name: "Papa's Hot Doggeria", file: "papashotdoggeria.swf" },
        { name: "Papa's Pancakeria", file: "papaspancakeria.swf" },
        { name: "Papa's Pastaria", file: "papaspastaria.swf" },
        { name: "Papa's Pizzeria", file: "papaspizzeria_v2.swf" },
        { name: "Papa's Scooperia", file: "papasscooperia_v102.swf" },
        { name: "Papa's Sushiria", file: "papassushiria.swf" },
        { name: "Papa's Taco Mia", file: "papastacomia.swf" },
        { name: "Papa's Wingeria", file: "papaswingeria.swf" }
    ];
    const btns = document.querySelector('.buttons');
    const container = document.getElementById('swf-container');
    let player;

    // Generate selection buttons
    games.forEach(({ name, file }) => {
      const b = document.createElement('button');
      b.textContent = name;
      b.onclick = () => loadSWF(`/swfs/${file}`);
      btns.appendChild(b);
    });

    // Fullscreen, suspend/resume controls
    document.getElementById('fullscreen-toggle').onclick = () => toggleFullscreen();
    document.getElementById('suspend-toggle').onclick = () => {
      if (player) {
        const api = player.ruffle();
        api.suspended ? api.resume() : api.suspend();
      }
    };

    // 4️⃣ Function: load an SWF
    async function loadSWF(swf) {
      container.innerHTML = '';
      const r = window.RufflePlayer.newest();
      player = r.createPlayer();
      // Per-instance overrides
      player.ruffle().config = { allowScriptAccess: false };
      player.style.width = '100%';
      player.style.height = '100%';
      player.style.setProperty('--splash-screen-background', '#3c2a34'); // soft pink, for example
      player.style.setProperty('--logo-display', 'none'); // hide the logo
      container.appendChild(player);

      // Metadata/event handlers
      player.addEventListener('loadedmetadata', () => {
        console.info('Metadata:', player.ruffle().metadata);
      });
      player.addEventListener('loadeddata', () => {
        console.info('Scene fully loaded');
      });

      // Load with promise or string overload
      try {
        await player.ruffle().load(swf);
        console.info(`Loaded: ${swf}`);
      } catch (err) {
        console.error(`Error loading \${swf}:`, err);
        player.ruffle().displayMessage('Failed to load content');
      }
    }

    // 5️⃣ Fullscreen toggle helper
    function toggleFullscreen() {
      if (!player) return;
      const api = player.ruffle();
      if (!api.fullscreenEnabled) return;
      api.isFullscreen ? api.exitFullscreen() : api.requestFullscreen();
    }

  });
})();
