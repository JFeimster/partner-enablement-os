(function () {
  "use strict";

  const DATA_PATHS = {
    categories: "/data/resource-categories.json",
    resources: "/data/resources.json",
    assets: "/data/asset-registry.json"
  };

  const selectors = {
    resourceGrid: "[data-resource-grid]",
    categoryGrid: "[data-resource-category-grid]",
    featuredResources: "[data-featured-resources]",
    assetGrid: "[data-asset-grid]",
    usableAssets: "[data-usable-assets]",
    filters: "[data-resource-filter]",
    count: "[data-resource-count]"
  };

  const state = {
    categories: [],
    resources: [],
    assets: [],
    assetsById: {},
    filters: {
      category: "",
      partnerType: "",
      status: "",
      featured: "",
      assetType: "",
      sourceType: "",
      usefulness: "",
      partnerSpecific: "",
      relatedPartner: ""
    }
  };

  function hasAnyContainer() {
    return Boolean(
      document.querySelector(selectors.resourceGrid) ||
        document.querySelector(selectors.categoryGrid) ||
        document.querySelector(selectors.featuredResources) ||
        document.querySelector(selectors.assetGrid) ||
        document.querySelector(selectors.usableAssets) ||
        document.querySelector(selectors.filters)
    );
  }

  function fetchJson(path, fallback) {
    return fetch(path, { cache: "no-cache" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Unable to load " + path + ": " + response.status);
        }

        return response.json();
      })
      .catch(function (error) {
        console.warn("Partner Enablement OS data warning:", error.message);
        return fallback;
      });
  }

  function sortByOrder(items) {
    return items.slice().sort(function (a, b) {
      return Number(a.order || 9999) - Number(b.order || 9999);
    });
  }

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
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
    if (!text) return null;

    const badge = createElement("span", "pill", text);
    if (label) {
      badge.setAttribute("aria-label", label + ": " + text);
    }

    return badge;
  }

  function appendBadge(container, text, label) {
    const badge = createBadge(text, label);
    if (badge) container.appendChild(badge);
  }

  function isExternalUrl(url) {
    return /^https?:\/\//i.test(url || "");
  }

  function createLinkButton(label, url, variant) {
    if (!url) return null;

    const link = createElement("a", "button " + (variant || "button-secondary"), label);
    link.href = url;

    if (isExternalUrl(url)) {
      link.target = "_blank";
      link.rel = "noopener";
    }

    return link;
  }

  function createCopyButton(label, value, variant) {
    if (!value) return null;

    const button = createElement("button", "button " + (variant || "button-secondary"), label);
    button.type = "button";
    button.setAttribute("data-copy-value", value);

    button.addEventListener("click", function () {
      if (!navigator.clipboard) {
        button.textContent = "Copy Unavailable";
        window.setTimeout(function () {
          button.textContent = label;
        }, 1500);
        return;
      }

      navigator.clipboard.writeText(value).then(function () {
        button.textContent = "Copied";
        window.setTimeout(function () {
          button.textContent = label;
        }, 1500);
      });
    });

    return button;
  }

  function getCategoryById(categoryId) {
    return state.categories.find(function (category) {
      return category.id === categoryId;
    });
  }

  function getResourceStatus(resource) {
    return resource.status || "planned";
  }

  function getResourceCategoryLabel(resource) {
    const category = getCategoryById(resource.category);
    return category ? category.name : slugToLabel(resource.category);
  }

  function buildAssetMap(assets) {
    const map = {};
    assets.forEach(function (asset) {
      if (asset && asset.id) {
        map[asset.id] = asset;
      }
    });
    return map;
  }

  function getAssetsForResource(resource) {
    const assetIds = toArray(resource.assetRegistryIds);
    const assets = assetIds
      .map(function (assetId) {
        return state.assetsById[assetId];
      })
      .filter(Boolean);

    if (!assets.length && resource.primaryAssetId && state.assetsById[resource.primaryAssetId]) {
      assets.push(state.assetsById[resource.primaryAssetId]);
    }

    return assets;
  }

  function getPrimaryAsset(resource) {
    if (resource.primaryAssetId && state.assetsById[resource.primaryAssetId]) {
      return state.assetsById[resource.primaryAssetId];
    }

    const assets = getAssetsForResource(resource);
    return assets.length ? assets[0] : null;
  }

  function resourceMatchesFilters(resource) {
    const categoryFilter = normalize(state.filters.category);
    const partnerTypeFilter = normalize(state.filters.partnerType);
    const statusFilter = normalize(state.filters.status);
    const featuredFilter = normalize(state.filters.featured);
    const assetTypeFilter = normalize(state.filters.assetType);
    const sourceTypeFilter = normalize(state.filters.sourceType);
    const usefulnessFilter = normalize(state.filters.usefulness);
    const partnerSpecificFilter = normalize(state.filters.partnerSpecific);
    const relatedPartnerFilter = normalize(state.filters.relatedPartner);

    const assets = getAssetsForResource(resource);
    const primaryAsset = getPrimaryAsset(resource);

    if (categoryFilter && normalize(resource.category) !== categoryFilter) {
      return false;
    }

    if (
      partnerTypeFilter &&
      !toArray(resource.partnerType).map(normalize).includes(partnerTypeFilter)
    ) {
      return false;
    }

    if (statusFilter && normalize(resource.status) !== statusFilter) {
      return false;
    }

    if (featuredFilter) {
      const wantsFeatured = ["true", "yes", "1", "featured"].includes(featuredFilter);
      if (Boolean(resource.featured) !== wantsFeatured) {
        return false;
      }
    }

    if (assetTypeFilter && !assets.some(function (asset) {
      return normalize(asset.assetType) === assetTypeFilter;
    })) {
      return false;
    }

    if (sourceTypeFilter && !assets.some(function (asset) {
      return normalize(asset.source && asset.source.type) === sourceTypeFilter;
    })) {
      return false;
    }

    if (usefulnessFilter && !assets.some(function (asset) {
      return normalize(asset.usefulness) === usefulnessFilter;
    })) {
      return false;
    }

    if (partnerSpecificFilter) {
      const wantsPartnerSpecific = ["true", "yes", "1", "partner-specific"].includes(partnerSpecificFilter);
      if (!primaryAsset || Boolean(primaryAsset.partnerSpecific) !== wantsPartnerSpecific) {
        return false;
      }
    }

    if (relatedPartnerFilter && !assets.some(function (asset) {
      return normalize(asset.relatedPartner) === relatedPartnerFilter;
    })) {
      return false;
    }

    return true;
  }

  function assetMatchesContainerFilter(asset, container) {
    const assetType = normalize(container.getAttribute("data-asset-type"));
    const relatedPartner = normalize(container.getAttribute("data-related-partner"));
    const sourceType = normalize(container.getAttribute("data-source-type"));
    const usefulness = normalize(container.getAttribute("data-usefulness"));
    const status = normalize(container.getAttribute("data-status"));

    if (assetType && normalize(asset.assetType) !== assetType) return false;
    if (relatedPartner && normalize(asset.relatedPartner) !== relatedPartner) return false;
    if (sourceType && normalize(asset.source && asset.source.type) !== sourceType) return false;
    if (usefulness && normalize(asset.usefulness) !== usefulness) return false;
    if (status && normalize(asset.status) !== status) return false;

    return true;
  }

  function createCategoryCard(category) {
    const article = createElement("article", "card reveal");
    article.setAttribute("data-category-id", category.id || "");

    const icon = createElement("div", "card-icon", category.icon || "•");
    icon.setAttribute("aria-hidden", "true");

    const title = createElement("h3", "", category.name || "Resource Category");
    const description = createElement("p", "", category.description || "");

    const meta = createElement("div", "hero-meta");
    meta.setAttribute("aria-label", "Category details");

    toArray(category.useCases).slice(0, 3).forEach(function (useCase) {
      appendBadge(meta, slugToLabel(useCase), "Use case");
    });

    article.appendChild(icon);
    article.appendChild(title);

    if (description.textContent) {
      article.appendChild(description);
    }

    if (meta.children.length) {
      article.appendChild(meta);
    }

    return article;
  }

  function appendAssetBadges(meta, asset) {
    if (!asset) return;

    appendBadge(meta, slugToLabel(asset.status), "Asset status");
    appendBadge(meta, slugToLabel(asset.usefulness), "Usefulness");
    appendBadge(meta, slugToLabel(asset.source && asset.source.type), "Source type");
    appendBadge(meta, asset.partnerSpecific ? "Partner-Specific" : "General", "Partner specificity");

    if (asset.relatedPartner) {
      appendBadge(meta, slugToLabel(asset.relatedPartner), "Related Partner");
    }
  }

  function appendResourceBadges(meta, resource, primaryAsset) {
    appendBadge(meta, slugToLabel(resource.resourceType || "resource"), "Resource type");
    appendBadge(meta, slugToLabel(getResourceStatus(resource)), "Status");

    if (resource.sourceStatus) {
      appendBadge(meta, slugToLabel(resource.sourceStatus), "Source status");
    }

    if (resource.isUsableNow) {
      appendBadge(meta, "Usable Now", "Usability");
    }

    if (resource.featured) {
      appendBadge(meta, "Featured", "Featured resource");
    }

    if (resource.format) {
      appendBadge(meta, resource.format, "Format");
    }

    appendAssetBadges(meta, primaryAsset);
  }

  function appendAction(actions, actionElement) {
    if (actionElement) {
      actions.appendChild(actionElement);
    }
  }

  function appendAssetActions(actions, asset) {
    if (!asset) return;

    const source = asset.source || {};
    const delivery = asset.delivery || {};
    const driveUrl = delivery.driveUrl || source.url;
    const downloadUrl = delivery.downloadUrl || "";

    if (source.type === "github") {
      appendAction(actions, createLinkButton("Open Source", source.url, "button-primary"));
      appendAction(actions, createLinkButton("Raw Markdown", source.rawUrl, "button-secondary"));
      appendAction(actions, createCopyButton("Copy Path", source.path, "button-ghost"));
    }

    if (source.type === "google-drive") {
      appendAction(actions, createLinkButton("View Drive Asset", driveUrl, "button-primary"));
      appendAction(actions, createCopyButton("Copy Drive URL", driveUrl, "button-ghost"));
    }

    if (downloadUrl && downloadUrl !== driveUrl) {
      appendAction(actions, createLinkButton("Download", downloadUrl, "button-secondary"));
    }

    if (source.rawUrl && source.type !== "github") {
      appendAction(actions, createLinkButton("Raw File", source.rawUrl, "button-secondary"));
    }

    if (source.path && source.type !== "github") {
      appendAction(actions, createCopyButton("Copy Path", source.path, "button-ghost"));
    }
  }

  function appendResourceActions(actions, resource, primaryAsset) {
    appendAction(actions, createLinkButton("View Page", resource.pageUrl, "button-secondary"));

    if (primaryAsset) {
      appendAssetActions(actions, primaryAsset);
      return;
    }

    appendAction(actions, createLinkButton("Open Source", resource.githubUrl, "button-primary"));
    appendAction(actions, createLinkButton("Raw Markdown", resource.rawUrl, "button-secondary"));
    appendAction(actions, createLinkButton("Download", resource.downloadUrl, "button-secondary"));
    appendAction(actions, createCopyButton("Copy Path", resource.sourcePath, "button-ghost"));
  }

  function createAssetCard(asset) {
    const article = createElement("article", "card reveal");
    article.setAttribute("data-asset-id", asset.id || "");
    article.setAttribute("data-asset-type", asset.assetType || "");
    article.setAttribute("data-source-type", asset.source && asset.source.type ? asset.source.type : "");

    const eyebrow = createElement("p", "panel-label", slugToLabel(asset.assetType || "asset"));
    const title = createElement("h3", "", asset.title || "Untitled Asset");
    const description = createElement("p", "", asset.description || "");

    const meta = createElement("div", "hero-meta");
    meta.setAttribute("aria-label", "Asset details");
    appendAssetBadges(meta, asset);

    const actions = createElement("div", "card-actions");
    actions.style.marginTop = "1.35rem";

    if (asset.delivery && asset.delivery.staticPageUrl) {
      appendAction(actions, createLinkButton("View Page", asset.delivery.staticPageUrl, "button-secondary"));
    }

    appendAssetActions(actions, asset);

    article.appendChild(eyebrow);
    article.appendChild(title);

    if (description.textContent) {
      article.appendChild(description);
    }

    if (meta.children.length) {
      article.appendChild(meta);
    }

    if (asset.complianceNotes) {
      const safeNote = createElement("p", "small-print", asset.complianceNotes);
      safeNote.style.marginTop = "1rem";
      article.appendChild(safeNote);
    }

    if (actions.children.length) {
      article.appendChild(actions);
    } else {
      const badgeWrap = createElement("div", "hero-meta");
      badgeWrap.style.marginTop = "1.35rem";
      appendBadge(badgeWrap, asset.status === "needs-cleanup" ? "Needs Cleanup" : "Coming Soon", "Asset action status");
      article.appendChild(badgeWrap);
    }

    return article;
  }

  function createResourceCard(resource) {
    const primaryAsset = getPrimaryAsset(resource);
    const article = createElement("article", "card reveal");
    article.setAttribute("data-resource-id", resource.id || "");
    article.setAttribute("data-resource-category", resource.category || "");
    article.setAttribute("data-resource-status", getResourceStatus(resource));

    const categoryLabel = getResourceCategoryLabel(resource);
    const eyebrow = createElement("p", "panel-label", categoryLabel);
    const title = createElement("h3", "", resource.title || "Untitled Resource");
    const description = createElement("p", "", resource.description || "");

    const meta = createElement("div", "hero-meta");
    meta.setAttribute("aria-label", "Resource details");
    appendResourceBadges(meta, resource, primaryAsset);

    const actions = createElement("div", "card-actions");
    actions.style.marginTop = "1.35rem";
    appendResourceActions(actions, resource, primaryAsset);

    article.appendChild(eyebrow);
    article.appendChild(title);

    if (description.textContent) {
      article.appendChild(description);
    }

    article.appendChild(meta);

    if (resource.safeLanguageNotes) {
      const safeNote = createElement("p", "small-print", resource.safeLanguageNotes);
      safeNote.style.marginTop = "1rem";
      article.appendChild(safeNote);
    }

    if (actions.children.length) {
      article.appendChild(actions);
    } else {
      const badgeWrap = createElement("div", "hero-meta");
      badgeWrap.style.marginTop = "1.35rem";
      appendBadge(badgeWrap, resource.status === "needs-cleanup" ? "Needs Cleanup" : "Coming Soon", "Resource action status");
      article.appendChild(badgeWrap);
    }

    return article;
  }

  function renderCategoryCards() {
    document.querySelectorAll(selectors.categoryGrid).forEach(function (container) {
      clearElement(container);

      const fragment = document.createDocumentFragment();
      sortByOrder(state.categories).forEach(function (category) {
        fragment.appendChild(createCategoryCard(category));
      });

      container.appendChild(fragment);
    });
  }

  function renderResources() {
    const filteredResources = sortByOrder(state.resources).filter(resourceMatchesFilters);

    document.querySelectorAll(selectors.resourceGrid).forEach(function (container) {
      clearElement(container);

      const fragment = document.createDocumentFragment();
      filteredResources.forEach(function (resource) {
        fragment.appendChild(createResourceCard(resource));
      });

      container.appendChild(fragment);
    });

    document.querySelectorAll(selectors.count).forEach(function (element) {
      element.textContent = String(filteredResources.length);
    });
  }

  function renderFeaturedResources() {
    const featuredResources = sortByOrder(state.resources).filter(function (resource) {
      return Boolean(resource.featured);
    });

    document.querySelectorAll(selectors.featuredResources).forEach(function (container) {
      clearElement(container);

      const limit = Number(container.getAttribute("data-limit") || 0);
      const items = limit > 0 ? featuredResources.slice(0, limit) : featuredResources;
      const fragment = document.createDocumentFragment();

      items.forEach(function (resource) {
        fragment.appendChild(createResourceCard(resource));
      });

      container.appendChild(fragment);
    });
  }

  function renderAssetGrids() {
    document.querySelectorAll(selectors.assetGrid).forEach(function (container) {
      clearElement(container);

      const limit = Number(container.getAttribute("data-limit") || 0);
      const filteredAssets = sortByOrder(state.assets).filter(function (asset) {
        return assetMatchesContainerFilter(asset, container);
      });
      const items = limit > 0 ? filteredAssets.slice(0, limit) : filteredAssets;
      const fragment = document.createDocumentFragment();

      items.forEach(function (asset) {
        fragment.appendChild(createAssetCard(asset));
      });

      container.appendChild(fragment);
    });
  }

  function renderUsableAssets() {
    document.querySelectorAll(selectors.usableAssets).forEach(function (container) {
      clearElement(container);

      const limit = Number(container.getAttribute("data-limit") || 0);
      const filteredAssets = sortByOrder(state.assets).filter(function (asset) {
        const isReady =
          normalize(asset.status) === "ready" ||
          normalize(asset.status) === "ready-after-permission-check";
        const isUseful =
          normalize(asset.usefulness) === "ready-to-use" ||
          normalize(asset.usefulness) === "ready-to-link" ||
          normalize(asset.usefulness) === "ready-to-link-after-review";

        return isReady && isUseful && assetMatchesContainerFilter(asset, container);
      });

      const items = limit > 0 ? filteredAssets.slice(0, limit) : filteredAssets;
      const fragment = document.createDocumentFragment();

      items.forEach(function (asset) {
        fragment.appendChild(createAssetCard(asset));
      });

      container.appendChild(fragment);
    });
  }

  function updateFilterFromElement(element) {
    const key = element.getAttribute("data-filter-key") || element.name || "";
    if (!key) return;

    if (element.type === "checkbox") {
      state.filters[key] = element.checked ? element.value || "true" : "";
      return;
    }

    state.filters[key] = element.value || "";
  }

  function setupFilters() {
    document.querySelectorAll(selectors.filters).forEach(function (filterElement) {
      updateFilterFromElement(filterElement);

      filterElement.addEventListener("change", function () {
        updateFilterFromElement(filterElement);
        renderResources();
      });

      filterElement.addEventListener("input", function () {
        updateFilterFromElement(filterElement);
        renderResources();
      });
    });
  }

  function renderAll() {
    renderCategoryCards();
    renderResources();
    renderFeaturedResources();
    renderAssetGrids();
    renderUsableAssets();

    if (window.PEOSReveal && typeof window.PEOSReveal.refresh === "function") {
      window.PEOSReveal.refresh();
    }
  }

  function init() {
    if (!hasAnyContainer()) return;

    Promise.all([
      fetchJson(DATA_PATHS.categories, []),
      fetchJson(DATA_PATHS.resources, []),
      fetchJson(DATA_PATHS.assets, [])
    ])
      .then(function (results) {
        state.categories = Array.isArray(results[0]) ? results[0] : [];
        state.resources = Array.isArray(results[1]) ? results[1] : [];
        state.assets = Array.isArray(results[2]) ? results[2] : [];
        state.assetsById = buildAssetMap(state.assets);

        setupFilters();
        renderAll();
      })
      .catch(function (error) {
        console.warn("Partner Enablement OS resource rendering warning:", error.message);
      });
  }

  window.PEOSResources = {
    init: init,
    renderAll: renderAll,
    getState: function () {
      return {
        categories: state.categories.slice(),
        resources: state.resources.slice(),
        assets: state.assets.slice(),
        filters: Object.assign({}, state.filters)
      };
    }
  };

  document.addEventListener("DOMContentLoaded", init);
})();
