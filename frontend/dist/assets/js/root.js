import { j as jsxRuntimeExports, r as reactExports, a as reactDomExports, c as createRoot } from "./client.js";
import { i as isObject, n as mergeWith, t as theme$1, c as createContext, e as cx, d as chakra, S as Spinner, f as forwardRef, u as useStyleConfig, o as omitThemingProps, p as useMergeRefs, h as dataAttr, T as ThemeProvider, C as ColorModeContext, a as CSSReset, G as GlobalStyle, q as CacheProvider, s as createCache } from "./index.js";
import { a as addHmrIntoView } from "./_virtual_reload-on-update-in-view.js";
import "./_commonjsHelpers.js";
var VALID_VALUES = /* @__PURE__ */ new Set(["dark", "light", "system"]);
function normalize(initialColorMode) {
  let value = initialColorMode;
  if (!VALID_VALUES.has(value))
    value = "light";
  return value;
}
function getScriptSrc(props = {}) {
  const {
    initialColorMode = "light",
    type = "localStorage",
    storageKey: key = "chakra-ui-color-mode"
  } = props;
  const init = normalize(initialColorMode);
  const isCookie = type === "cookie";
  const cookieScript = `(function(){try{var a=function(o){var l="(prefers-color-scheme: dark)",v=window.matchMedia(l).matches?"dark":"light",e=o==="system"?v:o,d=document.documentElement,m=document.body,i="chakra-ui-light",n="chakra-ui-dark",s=e==="dark";return m.classList.add(s?n:i),m.classList.remove(s?i:n),d.style.colorScheme=e,d.dataset.theme=e,e},u=a,h="${init}",r="${key}",t=document.cookie.match(new RegExp("(^| )".concat(r,"=([^;]+)"))),c=t?t[2]:null;c?a(c):document.cookie="".concat(r,"=").concat(a(h),"; max-age=31536000; path=/")}catch(a){}})();
  `;
  const localStorageScript = `(function(){try{var a=function(c){var v="(prefers-color-scheme: dark)",h=window.matchMedia(v).matches?"dark":"light",r=c==="system"?h:c,o=document.documentElement,s=document.body,l="chakra-ui-light",d="chakra-ui-dark",i=r==="dark";return s.classList.add(i?d:l),s.classList.remove(i?l:d),o.style.colorScheme=r,o.dataset.theme=r,r},n=a,m="${init}",e="${key}",t=localStorage.getItem(e);t?a(t):localStorage.setItem(e,a(m))}catch(a){}})();
  `;
  const fn = isCookie ? cookieScript : localStorageScript;
  return `!${fn}`.trim();
}
function ColorModeScript(props = {}) {
  const { nonce } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "script",
    {
      id: "chakra-script",
      nonce,
      dangerouslySetInnerHTML: { __html: getScriptSrc(props) }
    }
  );
}
var requiredChakraThemeKeys = [
  "borders",
  "breakpoints",
  "colors",
  "components",
  "config",
  "direction",
  "fonts",
  "fontSizes",
  "fontWeights",
  "letterSpacings",
  "lineHeights",
  "radii",
  "shadows",
  "sizes",
  "space",
  "styles",
  "transition",
  "zIndices"
];
function isChakraTheme(unit) {
  if (!isObject(unit)) {
    return false;
  }
  return requiredChakraThemeKeys.every(
    (propertyName) => Object.prototype.hasOwnProperty.call(unit, propertyName)
  );
}
function isFunction(value) {
  return typeof value === "function";
}
function pipe(...fns) {
  return (v) => fns.reduce((a, b) => b(a), v);
}
var createExtendTheme = (theme2) => {
  return function extendTheme2(...extensions) {
    let overrides = [...extensions];
    let activeTheme = extensions[extensions.length - 1];
    if (isChakraTheme(activeTheme) && // this ensures backward compatibility
    // previously only `extendTheme(override, activeTheme?)` was allowed
    overrides.length > 1) {
      overrides = overrides.slice(0, overrides.length - 1);
    } else {
      activeTheme = theme2;
    }
    return pipe(
      ...overrides.map(
        (extension) => (prevTheme) => isFunction(extension) ? extension(prevTheme) : mergeThemeOverride(prevTheme, extension)
      )
    )(activeTheme);
  };
};
var extendTheme = createExtendTheme(theme$1);
function mergeThemeOverride(...overrides) {
  return mergeWith({}, ...overrides, mergeThemeCustomizer);
}
function mergeThemeCustomizer(source, override, key, object) {
  if ((isFunction(source) || isFunction(override)) && Object.prototype.hasOwnProperty.call(object, key)) {
    return (...args) => {
      const sourceValue = isFunction(source) ? source(...args) : source;
      const overrideValue = isFunction(override) ? override(...args) : override;
      return mergeWith({}, sourceValue, overrideValue, mergeThemeCustomizer);
    };
  }
  return void 0;
}
var [ButtonGroupProvider, useButtonGroup] = createContext({
  strict: false,
  name: "ButtonGroupContext"
});
function useButtonType(value) {
  const [isButton, setIsButton] = reactExports.useState(!value);
  const refCallback = reactExports.useCallback((node) => {
    if (!node)
      return;
    setIsButton(node.tagName === "BUTTON");
  }, []);
  const type = isButton ? "button" : void 0;
  return { ref: refCallback, type };
}
function ButtonIcon(props) {
  const { children, className, ...rest } = props;
  const _children = reactExports.isValidElement(children) ? reactExports.cloneElement(children, {
    "aria-hidden": true,
    focusable: false
  }) : children;
  const _className = cx("chakra-button__icon", className);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.span,
    {
      display: "inline-flex",
      alignSelf: "center",
      flexShrink: 0,
      ...rest,
      className: _className,
      children: _children
    }
  );
}
ButtonIcon.displayName = "ButtonIcon";
function ButtonSpinner(props) {
  const {
    label,
    placement,
    spacing = "0.5rem",
    children = /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { color: "currentColor", width: "1em", height: "1em" }),
    className,
    __css,
    ...rest
  } = props;
  const _className = cx("chakra-button__spinner", className);
  const marginProp = placement === "start" ? "marginEnd" : "marginStart";
  const spinnerStyles = reactExports.useMemo(
    () => ({
      display: "flex",
      alignItems: "center",
      position: label ? "relative" : "absolute",
      [marginProp]: label ? spacing : 0,
      fontSize: "1em",
      lineHeight: "normal",
      ...__css
    }),
    [__css, label, marginProp, spacing]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(chakra.div, { className: _className, ...rest, __css: spinnerStyles, children });
}
ButtonSpinner.displayName = "ButtonSpinner";
var Button = forwardRef((props, ref) => {
  const group = useButtonGroup();
  const styles = useStyleConfig("Button", { ...group, ...props });
  const {
    isDisabled = group == null ? void 0 : group.isDisabled,
    isLoading,
    isActive,
    children,
    leftIcon,
    rightIcon,
    loadingText,
    iconSpacing = "0.5rem",
    type,
    spinner,
    spinnerPlacement = "start",
    className,
    as,
    ...rest
  } = omitThemingProps(props);
  const buttonStyles = reactExports.useMemo(() => {
    const _focus = { ...styles == null ? void 0 : styles["_focus"], zIndex: 1 };
    return {
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      position: "relative",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      outline: "none",
      ...styles,
      ...!!group && { _focus }
    };
  }, [styles, group]);
  const { ref: _ref, type: defaultType } = useButtonType(as);
  const contentProps = { rightIcon, leftIcon, iconSpacing, children };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    chakra.button,
    {
      ref: useMergeRefs(ref, _ref),
      as,
      type: type != null ? type : defaultType,
      "data-active": dataAttr(isActive),
      "data-loading": dataAttr(isLoading),
      __css: buttonStyles,
      className: cx("chakra-button", className),
      ...rest,
      disabled: isDisabled || isLoading,
      children: [
        isLoading && spinnerPlacement === "start" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ButtonSpinner,
          {
            className: "chakra-button__spinner--start",
            label: loadingText,
            placement: "start",
            spacing: iconSpacing,
            children: spinner
          }
        ),
        isLoading ? loadingText || /* @__PURE__ */ jsxRuntimeExports.jsx(chakra.span, { opacity: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonContent, { ...contentProps }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonContent, { ...contentProps }),
        isLoading && spinnerPlacement === "end" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ButtonSpinner,
          {
            className: "chakra-button__spinner--end",
            label: loadingText,
            placement: "end",
            spacing: iconSpacing,
            children: spinner
          }
        )
      ]
    }
  );
});
Button.displayName = "Button";
function ButtonContent(props) {
  const { leftIcon, rightIcon, children, iconSpacing } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    leftIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonIcon, { marginEnd: iconSpacing, children: leftIcon }),
    children,
    rightIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonIcon, { marginStart: iconSpacing, children: rightIcon })
  ] });
}
function Badge({ url }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Trigger" });
}
function App({ anchorEls: anchorEls2 }) {
  return anchorEls2.map((anchorEl) => {
    const containerDiv = document.createElement("div");
    containerDiv.style.display = "inline-block";
    anchorEl.parentNode.insertBefore(containerDiv, anchorEl);
    containerDiv.appendChild(anchorEl);
    const contentDiv = document.createElement("div");
    contentDiv.style.display = "inline-block";
    anchorEl.after(contentDiv);
    return reactDomExports.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { url: anchorEl.href }), contentDiv);
  });
}
const injectedStyle = "";
const theme = extendTheme();
const getCurrentTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
};
function CustomChakraProvider({ children, shadowRootId }) {
  const [colorMode, setColorMode] = reactExports.useState(getCurrentTheme());
  reactExports.useEffect(() => {
    const darkThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChangeColorSchema = (event) => {
      const isDark = event.matches;
      setColorMode(isDark ? "dark" : "light");
    };
    darkThemeMediaQuery.addEventListener("change", onChangeColorSchema);
    return () => {
      darkThemeMediaQuery.removeEventListener("change", onChangeColorSchema);
    };
  }, []);
  const toggleColorMode = reactExports.useCallback(() => {
    setColorMode((prev) => prev === "dark" ? "light" : "dark");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { theme: { ...theme, config: { ...theme.config, colorMode } }, cssVarsRoot: `#${shadowRootId}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ColorModeScript, { initialColorMode: "system" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ColorModeContext.Provider, { value: { colorMode, setColorMode, toggleColorMode }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CSSReset, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalStyle, {}),
      children
    ] })
  ] });
}
function EmotionCacheProvider({ children, rootId }) {
  const [emotionCache, setEmotionCache] = reactExports.useState(null);
  reactExports.useEffect(() => {
    function setEmotionStyles(shadowRoot2) {
      setEmotionCache(
        createCache({
          key: rootId,
          container: shadowRoot2
        })
      );
    }
    const root2 = document.getElementById(rootId);
    if (root2 && root2.shadowRoot) {
      setEmotionStyles(root2.shadowRoot);
    }
  }, []);
  return emotionCache ? /* @__PURE__ */ jsxRuntimeExports.jsx(CacheProvider, { value: emotionCache, children }) : null;
}
addHmrIntoView("pages/content");
const root = document.createElement("div");
root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
document.body.append(root);
const rootIntoShadow = document.createElement("div");
rootIntoShadow.id = "shadow-root";
const shadowRoot = root.attachShadow({ mode: "open" });
shadowRoot.appendChild(rootIntoShadow);
const styleElement = document.createElement("style");
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);
const legalDocumentRegex = /\bagreement\b|\bprivacy policy\b|\bprivacy notice\b|\bcookie policy\b|\bterms and conditions\b|\bterms & conditions\b|\bt&c\b|\bconditions of use\b|\bterms of service\b/i;
const anchorEls = Array.from(document.getElementsByTagName("a")).filter((anchorEl) => legalDocumentRegex.test(anchorEl.innerText));
createRoot(rootIntoShadow).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(EmotionCacheProvider, { rootId: root.id, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomChakraProvider, { shadowRootId: rootIntoShadow.id, children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, { anchorEls }) }) })
);
