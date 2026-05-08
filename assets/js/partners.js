(function () {
  "use strict";

  const DATA_PATHS = {
    partnerTypes: "/data/partner-types.json",
    launchKits: "/data/partner-launch-kits.json"
  };

  const selectors = {
    partnerTypeGrid: "[data-partner-type-grid]",
    launchKitGrid: "[data-launch-kit-grid]",
    featuredLaunchKit: "[data-featured-launch-kit]",
    partnerCount: "[data-partner-count]"
  };

  const state = {
    partnerTypes: [],
    launchKits: []
  };

  function hasAnyContainer() {
    return Boolean(
      document.querySelector(selectors.partnerTypeGrid) ||
        document.querySelector(selectors.launchKitGrid) ||
        document.querySelector(selectors.featuredLaunchKit) ||
        document.querySelector(selectors.partnerCount)
    );
  }

  function fetchJson(path) {
    return fetch(path, { cache: "no-cache" }).then(function (response) {
      if (!response.ok) {
        throw new Error("Unable to load " + path + ": " + response.status);
      }

      return response.json();
    });
  }

  function sortByOrder(items) {
    return items.slice().sort(function (a, b) {
      return Number(a.order || 9999) - Number(b.order || 9999);
    });
  }

  function toArray(value) {
    if (Array.isArray(value)) return value;
    if (value === null || value === undefined || value === "") return [];
    return [value];
  }

  function slugToLabel(value) {
    return String(value || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
      });
  }

  function clearElement(element) {
    if (!element) return;
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);

    if (className) {
      element.className = className;
    }

    if (text !== undefined && text !== null) {
      element.textContent = text;
    }

    return element;
  }

  function createBadge(text, label) {
    const badge = createElement("span", "pill", text);
    if (label) {
      badge.setAttribute("aria-label", label + ": " + text);
    }
    return badge;
  }

  function createLinkButton(label, url, variant) {
    if (!url) return null;

    const link = createElement("a", "button " + (variant || "button-secondary"), label);
    link.href = url;

    if (/^https?:\/\//i.test(url)) {
      link.rel = "noopener";
    }

    return link;
  }

  function createList(items, className) {
    const list = createElement("ul", className || "check-list");

    toArray(items).forEach(function (item) {
      const listItem = createElement("li", "", item);
      list.appendChild(listItem);
    });

    return list;
  }

  function createPartnerTypeCard(partnerType) {
    const article = createElement("article", "card reveal");
    article.setAttribute("data-partner-type-id", partnerType.id || "");

    const icon = createElement("div", "card-icon", String(partnerType.name || "P").slice(0, 2).toUpperCase());
    icon.setAttribute("aria-hidden", "true");

    const title = createElement("h3", "", partnerType.name || "Partner Type");
    const description = createElement("p", "", partnerType.description || "");

    const meta = createElement("div", "hero-meta");
    meta.setAttribute("aria-label", "Partner type details");

    if (partnerType.umbrellaTerm) {
      meta.appendChild(createBadge(partnerType.umbrellaTerm, "Umbrella term"));
    }

    toArray(partnerType.primaryUseCases).slice(0, 3).forEach(function (useCase) {
      meta.appendChild(createBadge(slugToLabel(useCase), "Use case"));
    });

    article.appendChild(icon);
    article.appendChild(title);

    if (description.textContent) {
      article.appendChild(description);
    }

    if (partnerType.safePositioning) {
      const safePositioning = createElement("p", "small-print", partnerType.safePositioning);
      safePositioning.style.marginTop = "1rem";
      article.appendChild(safePositioning);
    }

    if (meta.children.length) {
      article.appendChild(meta);
    }

    return article;
  }

  function createLaunchKitCard(launchKit) {
    const isPrototype =
      String(launchKit.slug || "").toLowerCase() === "darwin-hanneman" ||
      String(launchKit.status || "").toLowerCase() === "prototype";

    const article = createElement("article", isPrototype ? "featured-card reveal" : "card reveal");
    article.setAttribute("data-launch-kit-id", launchKit.id || "");
    article.setAttribute("data-launch-kit-status", launchKit.status || "");

    const content = createElement("div", "");

    const eyebrow = createElement("p", "eyebrow", isPrototype ? "Prototype Launch Kit" : "Partner Launch Kit");
    const title = createElement("h2", "", launchKit.title || launchKit.partnerName || "Partner Launch Kit");
    const summary = createElement("p", "", launchKit.summary || "");

    content.appendChild(eyebrow);
    content.appendChild(title);

    if (summary.textContent) {
      content.appendChild(summary);
    }

    if (launchKit.safePositioning) {
      const safePositioning = createElement("p", "small-print", launchKit.safePositioning);
      safePositioning.style.marginTop = "1rem";
      content.appendChild(safePositioning);
    }

    const actions = createElement("div", "card-actions");
    actions.style.marginTop = "1.35rem";

    const profileLink = createLinkButton("View Launch Kit", launchKit.profilePage, "button-primary");
    const sourceLink = createLinkButton("Source Folder", launchKit.sourceFolder, "button-secondary");
    const downloadLink = createLinkButton("Download", launchKit.downloadUrl, "button-ghost");

    [profileLink, sourceLink, downloadLink].forEach(function (link) {
      if (link) {
        actions.appendChild(link);
      }
    });

    if (actions.children.length) {
      content.appendChild(actions);
    }

    const aside = createElement("aside", "card");
    aside.setAttribute("aria-label", (launchKit.partnerName || "Partner") + " launch kit details");

    const statusLabel = createElement("p", "panel-label", "Launch Kit Status");
    const status = createElement("h3", "", slugToLabel(launchKit.status || "planned"));

    aside.appendChild(statusLabel);
    aside.appendChild(status);

    if (toArray(launchKit.bestFitLanes).length) {
      const lanesTitle = createElement("p", "small-print", "Best-fit lanes");
      lanesTitle.style.marginTop = "1rem";
      aside.appendChild(lanesTitle);
      aside.appendChild(createList(launchKit.bestFitLanes, "check-list"));
    }

    const badges = createElement("div", "hero-meta");
    badges.setAttribute("aria-label", "Launch kit tags");

    if (launchKit.ecosystemBrand) {
      badges.appendChild(createBadge(launchKit.ecosystemBrand, "Ecosystem brand"));
    }

    if (launchKit.partnerType) {
      badges.appendChild(createBadge(slugToLabel(launchKit.partnerType), "Partner type"));
    }

    if (launchKit.featured) {
      badges.appendChild(createBadge("Featured", "Featured launch kit"));
    }

    if (badges.children.length) {
      aside.appendChild(badges);
    }

    article.appendChild(content);
    article.appendChild(aside);

    return article;
  }

  function renderPartnerTypes() {
    document.querySelectorAll(selectors.partnerTypeGrid).forEach(function (container) {
      clearElement(container);

      const fragment = document.createDocumentFragment();
      sortByOrder(state.partnerTypes).forEach(function (partnerType) {
        fragment.appendChild(createPartnerTypeCard(partnerType));
      });

      container.appendChild(fragment);
    });
  }

  function renderLaunchKits() {
    document.querySelectorAll(selectors.launchKitGrid).forEach(function (container) {
      clearElement(container);

      const fragment = document.createDocumentFragment();
      sortByOrder(state.launchKits).forEach(function (launchKit) {
        fragment.appendChild(createLaunchKitCard(launchKit));
      });

      container.appendChild(fragment);
    });
  }

  function renderFeaturedLaunchKit() {
    const featured =
      state.launchKits.find(function (launchKit) {
        return String(launchKit.slug || "").toLowerCase() === "darwin-hanneman";
      }) ||
      state.launchKits.find(function (launchKit) {
        return Boolean(launchKit.featured);
      });

    document.querySelectorAll(selectors.featuredLaunchKit).forEach(function (container) {
      clearElement(container);

      if (featured) {
        container.appendChild(createLaunchKitCard(featured));
      }
    });
  }

  function renderPartnerCount() {
    document.querySelectorAll(selectors.partnerCount).forEach(function (element) {
      element.textContent = String(state.partnerTypes.length);
    });
  }

  function renderAll() {
    renderPartnerTypes();
    renderLaunchKits();
    renderFeaturedLaunchKit();
    renderPartnerCount();

    if (window.PEOSReveal && typeof window.PEOSReveal.refresh === "function") {
      window.PEOSReveal.refresh();
    }
  }

  function init() {
    if (!hasAnyContainer()) return;

    Promise.all([fetchJson(DATA_PATHS.partnerTypes), fetchJson(DATA_PATHS.launchKits)])
      .then(function (results) {
        state.partnerTypes = Array.isArray(results[0]) ? results[0] : [];
        state.launchKits = Array.isArray(results[1]) ? results[1] : [];

        renderAll();
      })
      .catch(function (error) {
        console.warn("Partner Enablement OS partner rendering warning:", error.message);
      });
  }

  window.PEOSPartners = {
    init: init,
    renderAll: renderAll,
    getState: function () {
      return {
        partnerTypes: state.partnerTypes.slice(),
        launchKits: state.launchKits.slice()
      };
    }
  };

  document.addEventListener("DOMContentLoaded", init);
})();
