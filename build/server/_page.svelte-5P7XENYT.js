import {
  Tabs
} from "./chunk-SNJQHPGH.js";
import {
  Loader
} from "./chunk-4RYA37SW.js";
import {
  notifications
} from "./chunk-4LG5OOAT.js";
import {
  page
} from "./chunk-IPPZVKT5.js";
import {
  api
} from "./chunk-KHZRRB2F.js";
import {
  theme
} from "./chunk-MPXLX2QA.js";
import "./chunk-JMKO23OJ.js";
import "./chunk-ZKIORBGS.js";
import {
  add_attribute,
  createEventDispatcher,
  create_ssr_component,
  each,
  escape,
  onDestroy,
  subscribe,
  validate_component
} from "./chunk-INXCOC2Z.js";
import "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/admin/users/_p_/_page.svelte.js
import { DateTime } from "luxon";
var units = ["year", "month", "week", "day", "hour", "minute", "second"];
var timeAgo = (date) => {
  if (!date)
    return "invalid date";
  let dateTime = DateTime.fromISO(date);
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((unit2) => diff.get(unit2) !== 0) || "second";
  const relativeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto"
  });
  return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};
function paginate({ items, pageSize, currentPage }) {
  return items.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
}
var PREVIOUS_PAGE = "PREVIOUS_PAGE";
var NEXT_PAGE = "NEXT_PAGE";
var ELLIPSIS = "ELLIPSIS";
function generateNavigationOptions({
  totalItems,
  pageSize,
  currentPage,
  limit = null,
  showStepOptions = false
}) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const limitThreshold = getLimitThreshold({ limit });
  const limited = limit && totalPages > limitThreshold;
  let options = limited ? generateLimitedOptions({ totalPages, limit, currentPage }) : generateUnlimitedOptions({ totalPages });
  return showStepOptions ? addStepOptions({ options, currentPage, totalPages }) : options;
}
function generateUnlimitedOptions({ totalPages }) {
  return new Array(totalPages).fill(null).map((value, index) => ({
    type: "number",
    value: index + 1
  }));
}
function generateLimitedOptions({ totalPages, limit, currentPage }) {
  const boundarySize = limit * 2 + 2;
  const firstBoundary = 1 + boundarySize;
  const lastBoundary = totalPages - boundarySize;
  const totalShownPages = firstBoundary + 2;
  if (currentPage <= firstBoundary - limit) {
    return Array(totalShownPages).fill(null).map((value, index) => {
      if (index === totalShownPages - 1) {
        return {
          type: "number",
          value: totalPages
        };
      } else if (index === totalShownPages - 2) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: firstBoundary + 1
        };
      }
      return {
        type: "number",
        value: index + 1
      };
    });
  } else if (currentPage >= lastBoundary + limit) {
    return Array(totalShownPages).fill(null).map((value, index) => {
      if (index === 0) {
        return {
          type: "number",
          value: 1
        };
      } else if (index === 1) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: lastBoundary - 1
        };
      }
      return {
        type: "number",
        value: lastBoundary + index - 2
      };
    });
  } else if (currentPage >= firstBoundary - limit && currentPage <= lastBoundary + limit) {
    return Array(totalShownPages).fill(null).map((value, index) => {
      if (index === 0) {
        return {
          type: "number",
          value: 1
        };
      } else if (index === 1) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: currentPage - limit + (index - 2)
        };
      } else if (index === totalShownPages - 1) {
        return {
          type: "number",
          value: totalPages
        };
      } else if (index === totalShownPages - 2) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: currentPage + limit + 1
        };
      }
      return {
        type: "number",
        value: currentPage - limit + (index - 2)
      };
    });
  }
}
function addStepOptions({ options, currentPage, totalPages }) {
  return [
    {
      type: "symbol",
      symbol: PREVIOUS_PAGE,
      value: currentPage <= 1 ? 1 : currentPage - 1
    },
    ...options,
    {
      type: "symbol",
      symbol: NEXT_PAGE,
      value: currentPage >= totalPages ? totalPages : currentPage + 1
    }
  ];
}
function getLimitThreshold({ limit }) {
  const maximumUnlimitedPages = 3;
  const numberOfBoundaryPages = 2;
  return limit * 2 + maximumUnlimitedPages + numberOfBoundaryPages;
}
var ChevronLeftIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = "100%" } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { class: customClass = "" } = $$props;
  if (size !== "100%") {
    size = size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px";
  }
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.class === void 0 && $$bindings.class && customClass !== void 0)
    $$bindings.class(customClass);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"${add_attribute("stroke-width", strokeWidth, 0)} stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"feather feather-chevron-left " + escape(customClass, true)}"><polyline points="${"15 18 9 12 15 6"}"></polyline></svg>`;
});
var ChevronRightIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = "100%" } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { class: customClass = "" } = $$props;
  if (size !== "100%") {
    size = size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px";
  }
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.class === void 0 && $$bindings.class && customClass !== void 0)
    $$bindings.class(customClass);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"${add_attribute("stroke-width", strokeWidth, 0)} stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"feather feather-chevron-right " + escape(customClass, true)}"><polyline points="${"9 18 15 12 9 6"}"></polyline></svg>`;
});
var css$1 = {
  code: ".page-link.svelte-172ljb2:hover{cursor:pointer}.ellipsis.svelte-172ljb2{cursor:not-allowed;pointer-events:none}.disabled.svelte-172ljb2{cursor:not-allowed}.pagination.svelte-172ljb2{padding:40px 10px;width:100%}",
  map: null
};
var PaginationNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let options;
  let totalPages;
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  createEventDispatcher();
  let { totalItems = 0 } = $$props;
  let { pageSize = 1 } = $$props;
  let { currentPage = 1 } = $$props;
  let { limit = null } = $$props;
  let { showStepOptions = false } = $$props;
  const setPage = (page2) => {
    currentPage = page2;
  };
  if ($$props.totalItems === void 0 && $$bindings.totalItems && totalItems !== void 0)
    $$bindings.totalItems(totalItems);
  if ($$props.pageSize === void 0 && $$bindings.pageSize && pageSize !== void 0)
    $$bindings.pageSize(pageSize);
  if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
    $$bindings.currentPage(currentPage);
  if ($$props.limit === void 0 && $$bindings.limit && limit !== void 0)
    $$bindings.limit(limit);
  if ($$props.showStepOptions === void 0 && $$bindings.showStepOptions && showStepOptions !== void 0)
    $$bindings.showStepOptions(showStepOptions);
  if ($$props.setPage === void 0 && $$bindings.setPage && setPage !== void 0)
    $$bindings.setPage(setPage);
  $$result.css.add(css$1);
  options = generateNavigationOptions({
    totalItems,
    pageSize,
    currentPage,
    limit,
    showStepOptions
  });
  totalPages = Math.ceil(totalItems / pageSize);
  $$unsubscribe_theme();
  return `<nav aria-label="${"pagination"}" class="${"navbar " + escape($theme === "dark" ? "navbar-dark bg-dark" : "", true)}"><ul class="${"pagination svelte-172ljb2"}">${each(options, (option) => {
    return `${option.type === "symbol" && option.symbol === PREVIOUS_PAGE ? `${slots.prev ? slots.prev({}) : `
					<li class="${[
      "page-item svelte-172ljb2",
      (option.type === "number" ? "pageNumber" : "") + " " + (option.type === "symbol" && option.symbol === NEXT_PAGE && currentPage >= totalPages || option.type === "symbol" && option.symbol === PREVIOUS_PAGE && currentPage <= 1 ? "disabled" : "") + " " + (option.type === "symbol" && option.symbol === PREVIOUS_PAGE ? "prev" : "")
    ].join(" ").trim()}" ${option.type === "symbol" && option.symbol === NEXT_PAGE && currentPage >= totalPages || option.type === "symbol" && option.symbol === PREVIOUS_PAGE && currentPage <= 1 ? "disabled" : ""}><span class="${"page-link svelte-172ljb2"}">${validate_component(ChevronLeftIcon, "ChevronLeftIcon").$$render($$result, { size: "1x" }, {}, {})}</span></li>
				`}` : ``}
			<li class="${[
      "page-item",
      option.type === "number" && option.value === currentPage ? "active" : ""
    ].join(" ").trim()}">${option.type === "number" ? `${slots.number ? slots.number({ value: option.value }) : `
						<a href="${"/" + escape(option.value, true)}"${add_attribute("id", option.value, 0)}${add_attribute("data-id", option.value, 0)} class="${"page-link svelte-172ljb2"}">${escape(option.value)}</a>
					`}` : `${option.type === "symbol" && option.symbol === ELLIPSIS ? `${slots.ellipsis ? slots.ellipsis({}) : `
						<span class="${"ellipsis page-link svelte-172ljb2"}">\u2026</span>
					`}` : ``}`}</li>
			${option.type === "symbol" && option.symbol === NEXT_PAGE ? `${slots.next ? slots.next({}) : `
					<li class="${[
      "page-item svelte-172ljb2",
      (option.type === "number" ? "pageNumber" : "") + " " + (option.type === "symbol" && option.symbol === NEXT_PAGE && currentPage >= totalPages || option.type === "symbol" && option.symbol === PREVIOUS_PAGE && currentPage <= 1 ? "disabled" : "") + " " + (option.type === "symbol" && option.symbol === NEXT_PAGE ? "next" : "")
    ].join(" ").trim()}" ${option.type === "symbol" && option.symbol === NEXT_PAGE && currentPage >= totalPages || option.type === "symbol" && option.symbol === PREVIOUS_PAGE && currentPage <= 1 ? "disabled" : ""}><span class="${"page-link svelte-172ljb2"}">${validate_component(ChevronRightIcon, "ChevronRightIcon").$$render($$result, { size: "1x" }, {}, {})}</span></li>
				`}` : ``}`;
  })}</ul>
</nav>`;
});
var css = {
  code: ".svg-icon.svelte-2wuwt6 svg.svelte-2wuwt6{width:20px;height:20px}.default-img.svelte-2wuwt6.svelte-2wuwt6{display:inline-block;width:40px;height:40px;border-radius:50%;vertical-align:middle}.link.svelte-2wuwt6.svelte-2wuwt6{background:#fdac17;padding:12px;float:right;color:white}.link.svelte-2wuwt6.svelte-2wuwt6:hover{opacity:0.9}",
  map: null
};
var Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let pageSize;
  let totalItems;
  let items = [];
  let users = [];
  let currentPage;
  let urlPage;
  let unsubscribe;
  $page.params.p;
  async function getAllUsers(pageNumber) {
    try {
      const res = await api("GET", `admin/users/${pageNumber}`, {}, $page.data.token);
      if (res) {
        pageSize = res.perPage;
        items = res.users;
        totalItems = res.totalItems;
        return users = res.users;
      }
    } catch (err) {
      notifications.push(err.message);
    }
  }
  if (typeof window != "undefined") {
    unsubscribe = page.subscribe(async ({ url }) => {
      urlPage = url.pathname.split("/").pop();
      currentPage = parseInt(urlPage);
      await getAllUsers(urlPage);
    });
  }
  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
  $$result.css.add(css);
  paginate({ items, pageSize, currentPage });
  $$unsubscribe_page();
  $$unsubscribe_theme();
  return `${$$result.head += `${$$result.title = `<title>Admin Panel</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-1fufk22">`, ""}

${validate_component(Loader, "Loader").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {})}
  <div class="${"container"}"><div class="${"card"}"><div class="${"card-body"}"><div class="${"table-responsive"}"><table class="${"table " + escape($theme === "dark" ? "table-dark" : "", true)}"><thead><tr><th scope="${"col"}"><abbr title="${"Role"}">Role</abbr></th>
              <th scope="${"col"}"><abbr title="${"User profile image"}">Image</abbr></th>
              <th scope="${"col"}"><abbr title="${"User Name"}">Name</abbr></th>
              <th scope="${"col"}"><abbr title="${"Gender"}">Gender</abbr></th>
              <th scope="${"col"}"><abbr title="${"Website"}">Website</abbr></th>
              <th scope="${"col"}"><abbr title="${"Location"}">Location</abbr></th>
              <th scope="${"col"}"><abbr title="${"Customer Since"}">Member Since</abbr></th>
              <th scope="${"col"}"><abbr title="${"Action Button"}">Action</abbr></th></tr></thead>
            <tbody>${each(users, (user, i) => {
        return `<tr><td scope="${"row"}">${escape(user.role)}</td>
                <td>${user.avatar ? `<img class="${"default-img svelte-2wuwt6"}"${add_attribute("src", user.avatar, 0)} alt="${"User Image"}">` : `<img class="${"default-img svelte-2wuwt6"}" src="${"img/default-image.jpg"}" alt="${"User Image"}">`}</td>
                <td>${escape(user.name)}</td>
                <td>${escape(user.gender)}</td>
                <td>${escape(user.website)}</td>
                <td>${escape(user.location)}</td>
                <td>${escape(timeAgo(user.createdAt))}</td>
                <td><a class="${"link svelte-2wuwt6"}" href="${"/admin/user/" + escape(user._id, true)}"><i class="${"svg-icon svelte-2wuwt6"}"><svg class="${"svg-inline--fa fa-link fa-w-16 svelte-2wuwt6"}" aria-hidden="${"true"}" focusable="${"false"}" data-prefix="${"fas"}" data-icon="${"link"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 512 512"}" data-fa-i2svg="${""}"><path fill="${"currentColor"}" d="${"M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"}"></path></svg></i>
                  </a></td>
              </tr>`;
      })}</tbody></table></div>
        ${validate_component(PaginationNav, "PaginationNav").$$render(
        $$result,
        {
          totalItems,
          pageSize,
          currentPage,
          limit: 1,
          showStepOptions: true
        },
        {},
        {}
      )}</div></div></div>`;
    }
  })}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte-5P7XENYT.js.map
