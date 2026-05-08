(function () {
  "use strict";

  const DATA_PATHS = {
    categories: "/data/resource-categories.json",
    resources: "/data/resources.json"
  };

  const selectors = {
    resourceGrid: "[data-resource-grid]",
    categoryGrid: "[data-resource-category-grid]",
    featuredResources: "[data-featured-resources]",
    filters: "[data-resource-filter]",
    count: "[data-resource-count]"
  };

  const state = {
    categories: [],
    resources: [],
    filters: {
      category: "",
      partnerType: "",
      status: "",
      featured: ""
    }
  };

  function hasAnyContainer() {
    return Boolean(
      document.querySelector(selectors.resourceGrid) ||
        document.querySelector(selectors.categoryGrid) ||
        document.querySelector(selectors.featuredResources) ||
        document.querySelector(selectors.filters)
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

  function resourceMatchesFilters(resource) {
    const categoryFilter = normalize(state.filters.category);
    const partnerTypeFilter = normalize(state.filters.partnerType);
    const statusFilter = normalize(state.filters.status);
    const featuredFilter = normalize(state.filters.featured);

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
      meta.appendChild(createBadge(slugToLabel(useCase), "Use case"));
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

  function createResourceCard(resource) {
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
    meta.appendChild(createBadge(slugToLabel(resource.resourceType || "resource"), "Resource type"));
    meta.appendChild(createBadge(slugToLabel(getResourceStatus(resource)), "Status"));

    if (resource.featured) {
      meta.appendChild(createBadge("Featured", "Featured resource"));
    }

    if (resource.format) {
      meta.appendChild(createBadge(resource.format, "Format"));
    }

    const actions = createElement("div", "card-actions");
    actions.style.marginTop = "1.35rem";

    const pageLink = createLinkButton("View Resource", resource.pageUrl, "button-primary");
    const sourceLink = createLinkButton("Source", resource.sourcePath, "button-secondary");
    const downloadLink = createLinkButton("Download", resource.downloadUrl, "button-ghost");

    [pageLink, sourceLink, downloadLink].forEach(function (link) {
      if (link) {
        actions.appendChild(link);
      }
    });

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

    if (window.PEOSReveal && typeof window.PEOSReveal.refresh === "function") {
      window.PEOSReveal.refresh();
    }
  }

  function init() {
    if (!hasAnyContainer()) return;

    Promise.all([fetchJson(DATA_PATHS.categories), fetchJson(DATA_PATHS.resources)])
      .then(function (results) {
        state.categories = Array.isArray(results[0]) ? results[0] : [];
        state.resources = Array.isArray(results[1]) ? results[1] : [];

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
        filters: Object.assign({}, state.filters)
      };
    }
  };

  document.addEventListener("DOMContentLoaded", init);
})();
