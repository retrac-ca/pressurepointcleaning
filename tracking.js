(function () {
  var config = window.PPC_TRACKING || {};
  var gaId = config.ga4MeasurementId || "";
  var pixelId = config.metaPixelId || "";

  function loadScript(src) {
    var script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  function trackGa(name, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
    }
  }

  function trackFb(name, params) {
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", name, params || {});
    }
  }

  window.ppcTrack = function (name, params) {
    trackGa(name, params);
    trackFb(name, params);
  };

  if (gaId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gaId));
  }

  if (pixelId) {
    window.fbq = window.fbq || function () {
      window.fbq.callMethod
        ? window.fbq.callMethod.apply(window.fbq, arguments)
        : window.fbq.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = window.fbq;
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = "2.0";
    window.fbq.queue = [];
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a, button");
    if (!link) return;

    var href = link.getAttribute("href") || "";
    var label = (link.textContent || link.getAttribute("aria-label") || "").trim();
    var params = {
      label: label,
      href: href,
      location: window.location.pathname,
    };

    if (href.indexOf("tel:") === 0) {
      window.ppcTrack("phone_click", params);
    } else if (href.indexOf("mailto:") === 0) {
      window.ppcTrack("email_click", params);
    } else if (href.indexOf("schedule.pressurepointcleaning.ca") !== -1) {
      window.ppcTrack("booking_click", params);
    } else if (link.classList.contains("btn") || link.classList.contains("area-pill")) {
      window.ppcTrack("cta_click", params);
    }
  });
})();
