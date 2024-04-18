import { j as jsxRuntimeExports, c as createRoot } from "../../../assets/js/client.js";
import { w as withErrorBoundary, a as withSuspense, u as useStorage, l as logo } from "../../../assets/js/withErrorBoundary.js";
import { e as exampleThemeStorage } from "../../../assets/js/exampleThemeStorage.js";
import { a as addHmrIntoView } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "App",
      style: {
        backgroundColor: theme === "light" ? "#fff" : "#000"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "App-header", style: { color: theme === "light" ? "#000" : "#fff" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, className: "App-logo", alt: "logo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Edit ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "src/pages/popup/Popup.tsx" }),
          " and save to reload."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            className: "App-link",
            href: "https://reactjs.org",
            target: "_blank",
            rel: "noopener noreferrer",
            style: { color: theme === "light" && "#0281dc", marginBottom: "10px" },
            children: "Learn React!"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            style: {
              backgroundColor: theme === "light" ? "#fff" : "#000",
              color: theme === "light" ? "#000" : "#fff"
            },
            onClick: exampleThemeStorage.toggle,
            children: "Toggle theme"
          }
        )
      ] })
    }
  );
};
const Popup$1 = withErrorBoundary(withSuspense(Popup, /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Loading ... " })), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Error Occur " }));
addHmrIntoView("pages/popup");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(Popup$1, {}));
}
init();
