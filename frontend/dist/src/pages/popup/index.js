import { j as jsxRuntimeExports, r as reactExports, a as reactDomExports, c as createRoot } from "../../../assets/js/client.js";
import { w as withErrorBoundary, a as withSuspense, u as useStorage } from "../../../assets/js/withErrorBoundary.js";
import { e as exampleThemeStorage } from "../../../assets/js/exampleThemeStorage.js";
import { c as createContext, C as ColorModeContext, T as ThemeProvider, a as CSSReset, b as CSSPolyfill, G as GlobalStyle, d as chakra, r as runIfFn, f as forwardRef, e as cx, u as useStyleConfig, S as Spinner, o as omitThemingProps, g as useMultiStyleConfig, t as theme, i as isObject, m as mergeRefs, h as dataAttr, j as callAllHandlers, k as keyframes$1, l as callAll } from "../../../assets/js/index.js";
import { a as addHmrIntoView } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import "../../../assets/js/_commonjsHelpers.js";
var [PortalManagerContextProvider, usePortalManager] = createContext({
  strict: false,
  name: "PortalManagerContext"
});
function PortalManager(props) {
  const { children, zIndex } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalManagerContextProvider, { value: { zIndex }, children });
}
PortalManager.displayName = "PortalManager";
var useSafeLayoutEffect = Boolean(globalThis == null ? void 0 : globalThis.document) ? reactExports.useLayoutEffect : reactExports.useEffect;
var [PortalContextProvider, usePortalContext] = createContext({
  strict: false,
  name: "PortalContext"
});
var PORTAL_CLASSNAME = "chakra-portal";
var PORTAL_SELECTOR = `.chakra-portal`;
var Container = (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: "chakra-portal-zIndex",
    style: {
      position: "absolute",
      zIndex: props.zIndex,
      top: 0,
      left: 0,
      right: 0
      // NB: Don't add `bottom: 0`, it makes the entire app unusable
      // @see https://github.com/chakra-ui/chakra-ui/issues/3201
    },
    children: props.children
  }
);
var DefaultPortal = (props) => {
  const { appendToParentPortal, children } = props;
  const [tempNode, setTempNode] = reactExports.useState(null);
  const portal = reactExports.useRef(null);
  const [, forceUpdate] = reactExports.useState({});
  reactExports.useEffect(() => forceUpdate({}), []);
  const parentPortal = usePortalContext();
  const manager = usePortalManager();
  useSafeLayoutEffect(() => {
    if (!tempNode)
      return;
    const doc = tempNode.ownerDocument;
    const host = appendToParentPortal ? parentPortal != null ? parentPortal : doc.body : doc.body;
    if (!host)
      return;
    portal.current = doc.createElement("div");
    portal.current.className = PORTAL_CLASSNAME;
    host.appendChild(portal.current);
    forceUpdate({});
    const portalNode = portal.current;
    return () => {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, [tempNode]);
  const _children = (manager == null ? void 0 : manager.zIndex) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { zIndex: manager == null ? void 0 : manager.zIndex, children }) : children;
  return portal.current ? reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx(PortalContextProvider, { value: portal.current, children: _children }),
    portal.current
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      ref: (el) => {
        if (el)
          setTempNode(el);
      }
    }
  );
};
var ContainerPortal = (props) => {
  const { children, containerRef, appendToParentPortal } = props;
  const containerEl = containerRef.current;
  const host = containerEl != null ? containerEl : typeof window !== "undefined" ? document.body : void 0;
  const portal = reactExports.useMemo(() => {
    const node = containerEl == null ? void 0 : containerEl.ownerDocument.createElement("div");
    if (node)
      node.className = PORTAL_CLASSNAME;
    return node;
  }, [containerEl]);
  const [, forceUpdate] = reactExports.useState({});
  useSafeLayoutEffect(() => forceUpdate({}), []);
  useSafeLayoutEffect(() => {
    if (!portal || !host)
      return;
    host.appendChild(portal);
    return () => {
      host.removeChild(portal);
    };
  }, [portal, host]);
  if (host && portal) {
    return reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(PortalContextProvider, { value: appendToParentPortal ? portal : null, children }),
      portal
    );
  }
  return null;
};
function Portal(props) {
  const portalProps = {
    appendToParentPortal: true,
    ...props
  };
  const { containerRef, ...rest } = portalProps;
  return containerRef ? /* @__PURE__ */ jsxRuntimeExports.jsx(ContainerPortal, { containerRef, ...rest }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultPortal, { ...rest });
}
Portal.className = PORTAL_CLASSNAME;
Portal.selector = PORTAL_SELECTOR;
Portal.displayName = "Portal";
var classNames = {
  light: "chakra-ui-light",
  dark: "chakra-ui-dark"
};
function getColorModeUtils(options = {}) {
  const { preventTransition = true } = options;
  const utils = {
    setDataset: (value) => {
      const cleanup = preventTransition ? utils.preventTransition() : void 0;
      document.documentElement.dataset.theme = value;
      document.documentElement.style.colorScheme = value;
      cleanup == null ? void 0 : cleanup();
    },
    setClassName(dark) {
      document.body.classList.add(dark ? classNames.dark : classNames.light);
      document.body.classList.remove(dark ? classNames.light : classNames.dark);
    },
    query() {
      return window.matchMedia("(prefers-color-scheme: dark)");
    },
    getSystemTheme(fallback) {
      var _a;
      const dark = (_a = utils.query().matches) != null ? _a : fallback === "dark";
      return dark ? "dark" : "light";
    },
    addListener(fn) {
      const mql = utils.query();
      const listener = (e) => {
        fn(e.matches ? "dark" : "light");
      };
      if (typeof mql.addListener === "function")
        mql.addListener(listener);
      else
        mql.addEventListener("change", listener);
      return () => {
        if (typeof mql.removeListener === "function")
          mql.removeListener(listener);
        else
          mql.removeEventListener("change", listener);
      };
    },
    preventTransition() {
      const css = document.createElement("style");
      css.appendChild(
        document.createTextNode(
          `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
        )
      );
      document.head.appendChild(css);
      return () => {
        (() => window.getComputedStyle(document.body))();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.head.removeChild(css);
          });
        });
      };
    }
  };
  return utils;
}
var STORAGE_KEY = "chakra-ui-color-mode";
function createLocalStorageManager(key) {
  return {
    ssr: false,
    type: "localStorage",
    get(init2) {
      if (!(globalThis == null ? void 0 : globalThis.document))
        return init2;
      let value;
      try {
        value = localStorage.getItem(key) || init2;
      } catch (e) {
      }
      return value || init2;
    },
    set(value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
      }
    }
  };
}
var localStorageManager = createLocalStorageManager(STORAGE_KEY);
var noop$1 = () => {
};
function getTheme(manager, fallback) {
  return manager.type === "cookie" && manager.ssr ? manager.get(fallback) : fallback;
}
function ColorModeProvider(props) {
  const {
    value,
    children,
    options: {
      useSystemColorMode,
      initialColorMode,
      disableTransitionOnChange
    } = {},
    colorModeManager = localStorageManager
  } = props;
  const defaultColorMode = initialColorMode === "dark" ? "dark" : "light";
  const [colorMode, rawSetColorMode] = reactExports.useState(
    () => getTheme(colorModeManager, defaultColorMode)
  );
  const [resolvedColorMode, setResolvedColorMode] = reactExports.useState(
    () => getTheme(colorModeManager)
  );
  const { getSystemTheme, setClassName, setDataset, addListener } = reactExports.useMemo(
    () => getColorModeUtils({ preventTransition: disableTransitionOnChange }),
    [disableTransitionOnChange]
  );
  const resolvedValue = initialColorMode === "system" && !colorMode ? resolvedColorMode : colorMode;
  const setColorMode = reactExports.useCallback(
    (value2) => {
      const resolved = value2 === "system" ? getSystemTheme() : value2;
      rawSetColorMode(resolved);
      setClassName(resolved === "dark");
      setDataset(resolved);
      colorModeManager.set(resolved);
    },
    [colorModeManager, getSystemTheme, setClassName, setDataset]
  );
  useSafeLayoutEffect(() => {
    if (initialColorMode === "system") {
      setResolvedColorMode(getSystemTheme());
    }
  }, []);
  reactExports.useEffect(() => {
    const managerValue = colorModeManager.get();
    if (managerValue) {
      setColorMode(managerValue);
      return;
    }
    if (initialColorMode === "system") {
      setColorMode("system");
      return;
    }
    setColorMode(defaultColorMode);
  }, [colorModeManager, defaultColorMode, initialColorMode, setColorMode]);
  const toggleColorMode = reactExports.useCallback(() => {
    setColorMode(resolvedValue === "dark" ? "light" : "dark");
  }, [resolvedValue, setColorMode]);
  reactExports.useEffect(() => {
    if (!useSystemColorMode)
      return;
    return addListener(setColorMode);
  }, [useSystemColorMode, addListener, setColorMode]);
  const context = reactExports.useMemo(
    () => ({
      colorMode: value != null ? value : resolvedValue,
      toggleColorMode: value ? noop$1 : toggleColorMode,
      setColorMode: value ? noop$1 : setColorMode,
      forced: value !== void 0
    }),
    [resolvedValue, toggleColorMode, setColorMode, value]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ColorModeContext.Provider, { value: context, children });
}
ColorModeProvider.displayName = "ColorModeProvider";
var EnvironmentContext = reactExports.createContext({
  getDocument() {
    return document;
  },
  getWindow() {
    return window;
  }
});
EnvironmentContext.displayName = "EnvironmentContext";
function EnvironmentProvider(props) {
  const { children, environment: environmentProp, disabled } = props;
  const ref = reactExports.useRef(null);
  const context = reactExports.useMemo(() => {
    if (environmentProp)
      return environmentProp;
    return {
      getDocument: () => {
        var _a, _b;
        return (_b = (_a = ref.current) == null ? void 0 : _a.ownerDocument) != null ? _b : document;
      },
      getWindow: () => {
        var _a, _b;
        return (_b = (_a = ref.current) == null ? void 0 : _a.ownerDocument.defaultView) != null ? _b : window;
      }
    };
  }, [environmentProp]);
  const showSpan = !disabled || !environmentProp;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(EnvironmentContext.Provider, { value: context, children: [
    children,
    showSpan && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "__chakra_env", hidden: true, ref })
  ] });
}
EnvironmentProvider.displayName = "EnvironmentProvider";
var ChakraProvider$1 = (props) => {
  const {
    children,
    colorModeManager,
    portalZIndex,
    resetScope,
    resetCSS = true,
    theme: theme2 = {},
    environment,
    cssVarsRoot,
    disableEnvironment,
    disableGlobalStyle
  } = props;
  const _children = /* @__PURE__ */ jsxRuntimeExports.jsx(
    EnvironmentProvider,
    {
      environment,
      disabled: disableEnvironment,
      children
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { theme: theme2, cssVarsRoot, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ColorModeProvider,
    {
      colorModeManager,
      options: theme2.config,
      children: [
        resetCSS ? /* @__PURE__ */ jsxRuntimeExports.jsx(CSSReset, { scope: resetScope }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CSSPolyfill, {}),
        !disableGlobalStyle && /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalStyle, {}),
        portalZIndex ? /* @__PURE__ */ jsxRuntimeExports.jsx(PortalManager, { zIndex: portalZIndex, children: _children }) : _children
      ]
    }
  ) });
};
var findById = (arr, id2) => arr.find((toast) => toast.id === id2);
function findToast(toasts, id2) {
  const position = getToastPosition(toasts, id2);
  const index = position ? toasts[position].findIndex((toast) => toast.id === id2) : -1;
  return {
    position,
    index
  };
}
function getToastPosition(toasts, id2) {
  for (const [position, values] of Object.entries(toasts)) {
    if (findById(values, id2)) {
      return position;
    }
  }
}
function getToastStyle(position) {
  const isRighty = position.includes("right");
  const isLefty = position.includes("left");
  let alignItems = "center";
  if (isRighty)
    alignItems = "flex-end";
  if (isLefty)
    alignItems = "flex-start";
  return {
    display: "flex",
    flexDirection: "column",
    alignItems
  };
}
function getToastListStyle(position) {
  const isTopOrBottom = position === "top" || position === "bottom";
  const margin = isTopOrBottom ? "0 auto" : void 0;
  const top = position.includes("top") ? "env(safe-area-inset-top, 0px)" : void 0;
  const bottom = position.includes("bottom") ? "env(safe-area-inset-bottom, 0px)" : void 0;
  const right = !position.includes("left") ? "env(safe-area-inset-right, 0px)" : void 0;
  const left = !position.includes("right") ? "env(safe-area-inset-left, 0px)" : void 0;
  return {
    position: "fixed",
    zIndex: "var(--toast-z-index, 5500)",
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
    margin,
    top,
    bottom,
    right,
    left
  };
}
function useCallbackRef(callback, deps = []) {
  const callbackRef = reactExports.useRef(callback);
  reactExports.useEffect(() => {
    callbackRef.current = callback;
  });
  return reactExports.useCallback((...args) => {
    var _a;
    return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
  }, deps);
}
function useTimeout(callback, delay2) {
  const fn = useCallbackRef(callback);
  reactExports.useEffect(() => {
    if (delay2 == null)
      return void 0;
    let timeoutId = null;
    timeoutId = window.setTimeout(() => {
      fn();
    }, delay2);
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [delay2, fn]);
}
function useUpdateEffect(callback, deps) {
  const renderCycleRef = reactExports.useRef(false);
  const effectCycleRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const mounted = renderCycleRef.current;
    const run = mounted && effectCycleRef.current;
    if (run) {
      return callback();
    }
    effectCycleRef.current = true;
  }, deps);
  reactExports.useEffect(() => {
    renderCycleRef.current = true;
    return () => {
      renderCycleRef.current = false;
    };
  }, []);
}
const MotionConfigContext = reactExports.createContext({
  transformPagePoint: (p) => p,
  isStatic: false,
  reducedMotion: "never"
});
const MotionContext = reactExports.createContext({});
const PresenceContext = reactExports.createContext(null);
const isBrowser = typeof document !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? reactExports.useLayoutEffect : reactExports.useEffect;
const LazyContext = reactExports.createContext({ strict: false });
const camelToDash = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();
const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);
const MotionGlobalConfig = {
  skipAnimations: false,
  useManualTiming: false
};
class Queue {
  constructor() {
    this.order = [];
    this.scheduled = /* @__PURE__ */ new Set();
  }
  add(process) {
    if (!this.scheduled.has(process)) {
      this.scheduled.add(process);
      this.order.push(process);
      return true;
    }
  }
  remove(process) {
    const index = this.order.indexOf(process);
    if (index !== -1) {
      this.order.splice(index, 1);
      this.scheduled.delete(process);
    }
  }
  clear() {
    this.order.length = 0;
    this.scheduled.clear();
  }
}
function createRenderStep(runNextFrame) {
  let thisFrame = new Queue();
  let nextFrame = new Queue();
  let numToRun = 0;
  let isProcessing = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (queue.add(callback) && addToCurrentFrame && isProcessing) {
        numToRun = thisFrame.order.length;
      }
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (callback) => {
      nextFrame.remove(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (frameData2) => {
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      [thisFrame, nextFrame] = [nextFrame, thisFrame];
      nextFrame.clear();
      numToRun = thisFrame.order.length;
      if (numToRun) {
        for (let i = 0; i < numToRun; i++) {
          const callback = thisFrame.order[i];
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame();
          }
          callback(frameData2);
        }
      }
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData2);
      }
    }
  };
  return step;
}
const stepsOrder = [
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
const maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  const steps2 = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(() => runNextFrame = true);
    return acc;
  }, {});
  const processStep = (stepId) => {
    steps2[stepId].process(state);
  };
  const processBatch = () => {
    const timestamp = performance.now();
    runNextFrame = false;
    state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
    state.timestamp = timestamp;
    state.isProcessing = true;
    stepsOrder.forEach(processStep);
    state.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  };
  const wake = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  };
  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps2[key];
    acc[key] = (process, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        wake();
      return step.schedule(process, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = (process) => stepsOrder.forEach((key) => steps2[key].cancel(process));
  return { schedule, cancel, state, steps: steps2 };
}
const { schedule: microtask, cancel: cancelMicrotask } = createRenderBatcher(queueMicrotask, false);
function useVisualElement(Component, visualState, props, createVisualElement) {
  const { visualElement: parent } = reactExports.useContext(MotionContext);
  const lazyContext = reactExports.useContext(LazyContext);
  const presenceContext = reactExports.useContext(PresenceContext);
  const reducedMotionConfig = reactExports.useContext(MotionConfigContext).reducedMotion;
  const visualElementRef = reactExports.useRef();
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component, {
      visualState,
      parent,
      props,
      presenceContext,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig
    });
  }
  const visualElement = visualElementRef.current;
  reactExports.useInsertionEffect(() => {
    visualElement && visualElement.update(props, presenceContext);
  });
  const wantsHandoff = reactExports.useRef(Boolean(props[optimizedAppearDataAttribute] && !window.HandoffComplete));
  useIsomorphicLayoutEffect(() => {
    if (!visualElement)
      return;
    microtask.postRender(visualElement.render);
    if (wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  reactExports.useEffect(() => {
    if (!visualElement)
      return;
    visualElement.updateFeatures();
    if (!wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
    if (wantsHandoff.current) {
      wantsHandoff.current = false;
      window.HandoffComplete = true;
    }
  });
  return visualElement;
}
function isRefObject(ref) {
  return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
function useMotionRef(visualState, visualElement, externalRef) {
  return reactExports.useCallback(
    (instance) => {
      instance && visualState.mount && visualState.mount(instance);
      if (visualElement) {
        instance ? visualElement.mount(instance) : visualElement.unmount();
      }
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(instance);
        } else if (isRefObject(externalRef)) {
          externalRef.current = instance;
        }
      }
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]
  );
}
function isVariantLabel(v) {
  return typeof v === "string" || Array.isArray(v);
}
function isAnimationControls(v) {
  return v !== null && typeof v === "object" && typeof v.start === "function";
}
const variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
const variantProps = ["initial", ...variantPriorityOrder];
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}
function getCurrentTreeVariants(props, context) {
  if (isControllingVariants(props)) {
    const { initial, animate } = props;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate) ? animate : void 0
    };
  }
  return props.inherit !== false ? context : {};
}
function useCreateMotionContext(props) {
  const { initial, animate } = getCurrentTreeVariants(props, reactExports.useContext(MotionContext));
  return reactExports.useMemo(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}
const featureProps = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
const featureDefinitions = {};
for (const key in featureProps) {
  featureDefinitions[key] = {
    isEnabled: (props) => featureProps[key].some((name) => !!props[name])
  };
}
function loadFeatures(features) {
  for (const key in features) {
    featureDefinitions[key] = {
      ...featureDefinitions[key],
      ...features[key]
    };
  }
}
const LayoutGroupContext = reactExports.createContext({});
const SwitchLayoutGroupContext = reactExports.createContext({});
const motionComponentSymbol = Symbol.for("motionComponentSymbol");
function createMotionComponent({ preloadedFeatures: preloadedFeatures2, createVisualElement, useRender, useVisualState, Component }) {
  preloadedFeatures2 && loadFeatures(preloadedFeatures2);
  function MotionComponent(props, externalRef) {
    let MeasureLayout2;
    const configAndProps = {
      ...reactExports.useContext(MotionConfigContext),
      ...props,
      layoutId: useLayoutId(props)
    };
    const { isStatic } = configAndProps;
    const context = useCreateMotionContext(props);
    const visualState = useVisualState(props, isStatic);
    if (!isStatic && isBrowser) {
      context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement);
      const initialLayoutGroupConfig = reactExports.useContext(SwitchLayoutGroupContext);
      const isStrict = reactExports.useContext(LazyContext).strict;
      if (context.visualElement) {
        MeasureLayout2 = context.visualElement.loadFeatures(
          // Note: Pass the full new combined props to correctly re-render dynamic feature components.
          configAndProps,
          isStrict,
          preloadedFeatures2,
          initialLayoutGroupConfig
        );
      }
    }
    return jsxRuntimeExports.jsxs(MotionContext.Provider, { value: context, children: [MeasureLayout2 && context.visualElement ? jsxRuntimeExports.jsx(MeasureLayout2, { visualElement: context.visualElement, ...configAndProps }) : null, useRender(Component, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)] });
  }
  const ForwardRefComponent = reactExports.forwardRef(MotionComponent);
  ForwardRefComponent[motionComponentSymbol] = Component;
  return ForwardRefComponent;
}
function useLayoutId({ layoutId }) {
  const layoutGroupId = reactExports.useContext(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function createMotionProxy(createConfig) {
  function custom(Component, customMotionComponentConfig = {}) {
    return createMotionComponent(createConfig(Component, customMotionComponentConfig));
  }
  if (typeof Proxy === "undefined") {
    return custom;
  }
  const componentCache = /* @__PURE__ */ new Map();
  return new Proxy(custom, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (_target, key) => {
      if (!componentCache.has(key)) {
        componentCache.set(key, custom(key));
      }
      return componentCache.get(key);
    }
  });
}
const lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function isSVGComponent(Component) {
  if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component !== "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    Component.includes("-")
  ) {
    return false;
  } else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements.indexOf(Component) > -1 || /**
     * If it contains a capital letter, it's an SVG component
     */
    /[A-Z]/u.test(Component)
  ) {
    return true;
  }
  return false;
}
const scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}
const transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
const transformProps = new Set(transformPropOrder);
function isForcedMotionValue(key, { layout: layout2, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout2 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
const isMotionValue = (value) => Boolean(value && value.getVelocity);
const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
const numTransforms = transformPropOrder.length;
function buildTransform(transform, { enableHardwareAcceleration = true, allowTransformNone = true }, transformIsDefault, transformTemplate) {
  let transformString = "";
  for (let i = 0; i < numTransforms; i++) {
    const key = transformPropOrder[i];
    if (transform[key] !== void 0) {
      const transformName = translateAlias[key] || key;
      transformString += `${transformName}(${transform[key]}) `;
    }
  }
  if (enableHardwareAcceleration && !transform.z) {
    transformString += "translateZ(0)";
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
const checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
const isCSSVariableName = checkStringStartsWith("--");
const startsAsVariableToken = checkStringStartsWith("var(--");
const isCSSVariableToken = (value) => {
  const startsWithToken = startsAsVariableToken(value);
  if (!startsWithToken)
    return false;
  return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
const getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};
const clamp = (min, max, v) => {
  if (v > max)
    return max;
  if (v < min)
    return min;
  return v;
};
const number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
const alpha = {
  ...number,
  transform: (v) => clamp(0, 1, v)
};
const scale = {
  ...number,
  default: 1
};
const sanitize = (v) => Math.round(v * 1e5) / 1e5;
const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
function isString(v) {
  return typeof v === "string";
}
const createUnitType = (unit) => ({
  test: (v) => isString(v) && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
const degrees = createUnitType("deg");
const percent = createUnitType("%");
const px = createUnitType("px");
const vh = createUnitType("vh");
const vw = createUnitType("vw");
const progressPercentage = {
  ...percent,
  parse: (v) => percent.parse(v) / 100,
  transform: (v) => percent.transform(v * 100)
};
const int = {
  ...number,
  transform: Math.round
};
const numberValueTypes = {
  // Border props
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  // Transform props
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  // Misc
  zIndex: int,
  backgroundPositionX: px,
  backgroundPositionY: px,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
function buildHTMLStyles(state, latestValues, options, transformTemplate) {
  const { style, vars, transform, transformOrigin } = state;
  let hasTransform2 = false;
  let hasTransformOrigin = false;
  let transformIsNone = true;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    }
    const valueType = numberValueTypes[key];
    const valueAsType = getValueAsType(value, valueType);
    if (transformProps.has(key)) {
      hasTransform2 = true;
      transform[key] = valueAsType;
      if (!transformIsNone)
        continue;
      if (value !== (valueType.default || 0))
        transformIsNone = false;
    } else if (key.startsWith("origin")) {
      hasTransformOrigin = true;
      transformOrigin[key] = valueAsType;
    } else {
      style[key] = valueAsType;
    }
  }
  if (!latestValues.transform) {
    if (hasTransform2 || transformTemplate) {
      style.transform = buildTransform(state.transform, options, transformIsNone, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}
const createHtmlRenderState = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues({ transformTemplate }, visualState, isStatic) {
  return reactExports.useMemo(() => {
    const state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate);
    return Object.assign({}, state.vars, state.style);
  }, [visualState]);
}
function useStyle(props, visualState, isStatic) {
  const styleProp = props.style || {};
  const style = {};
  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
  return style;
}
function useHTMLProps(props, visualState, isStatic) {
  const htmlProps = {};
  const style = useStyle(props, visualState, isStatic);
  if (props.drag && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) {
    htmlProps.tabIndex = 0;
  }
  htmlProps.style = style;
  return htmlProps;
}
const validMotionProps = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function isValidMotionProp(key) {
  return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}
let shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
try {
  loadExternalIsValidProp(require("@emotion/is-prop-valid").default);
} catch (_a) {
}
function filterProps(props, isDom2, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props) {
    if (key === "values" && typeof props.values === "object")
      continue;
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom2 && !isValidMotionProp(key) || // If trying to use native HTML drag events, forward drag listeners
    props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}
function calcOrigin$1(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  const pxOriginX = calcOrigin$1(originX, dimensions.x, dimensions.width);
  const pxOriginY = calcOrigin$1(originY, dimensions.y, dimensions.height);
  return `${pxOriginX} ${pxOriginY}`;
}
const dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
const camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = px.transform(-offset);
  const pathLength = px.transform(length);
  const pathSpacing = px.transform(spacing);
  attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}
function buildSVGAttrs(state, {
  attrX,
  attrY,
  attrScale,
  originX,
  originY,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, options, isSVGTag2, transformTemplate) {
  buildHTMLStyles(state, latest, options, transformTemplate);
  if (isSVGTag2) {
    if (state.style.viewBox) {
      state.attrs.viewBox = state.style.viewBox;
    }
    return;
  }
  state.attrs = state.style;
  state.style = {};
  const { attrs, style, dimensions } = state;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (attrScale !== void 0)
    attrs.scale = attrScale;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}
const createSvgRenderState = () => ({
  ...createHtmlRenderState(),
  attrs: {}
});
const isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";
function useSVGProps(props, visualState, _isStatic, Component) {
  const visualProps = reactExports.useMemo(() => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, { enableHardwareAcceleration: false }, isSVGTag(Component), props.transformTemplate);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}
function createUseRender(forwardMotionProps = false) {
  const useRender = (Component, props, ref, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent(Component) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic, Component);
    const filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
    const elementProps = Component !== reactExports.Fragment ? { ...filteredProps, ...visualProps, ref } : {};
    const { children } = props;
    const renderedChildren = reactExports.useMemo(() => isMotionValue(children) ? children.get() : children, [children]);
    return reactExports.createElement(Component, {
      ...elementProps,
      children: renderedChildren
    });
  };
  return useRender;
}
function renderHTML(element, { style, vars }, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (const key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}
const camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}
function scrapeMotionValuesFromProps$1(props, prevProps, visualElement) {
  var _a;
  const { style } = props;
  const newValues = {};
  for (const key in style) {
    if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props) || ((_a = visualElement === null || visualElement === void 0 ? void 0 : visualElement.getValue(key)) === null || _a === void 0 ? void 0 : _a.liveStyle) !== void 0) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  const newValues = scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}
function resolveVariantFromProps(props, definition, custom, currentValues = {}, currentVelocity = {}) {
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  return definition;
}
function useConstant(init2) {
  const ref = reactExports.useRef(null);
  if (ref.current === null) {
    ref.current = init2();
  }
  return ref.current;
}
const isKeyframesTarget = (v) => {
  return Array.isArray(v);
};
const isCustomValue = (v) => {
  return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
const resolveFinalValueInKeyframes = (v) => {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};
function resolveMotionValue(value) {
  const unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, createRenderState, onMount }, props, context, presenceContext) {
  const state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps2),
    renderState: createRenderState()
  };
  if (onMount) {
    state.mount = (instance) => onMount(props, instance, state);
  }
  return state;
}
const makeUseVisualState = (config) => (props, isStatic) => {
  const context = reactExports.useContext(MotionContext);
  const presenceContext = reactExports.useContext(PresenceContext);
  const make = () => makeState(config, props, context, presenceContext);
  return isStatic ? make() : useConstant(make);
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props, {});
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate } = props;
  const isControllingVariants$1 = isControllingVariants(props);
  const isVariantNode$1 = isVariantNode(props);
  if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
    if (initial === void 0)
      initial = context.initial;
    if (animate === void 0)
      animate = context.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach((definition) => {
      const resolved = resolveVariantFromProps(props, definition);
      if (!resolved)
        return;
      const { transitionEnd, transition, ...target } = resolved;
      for (const key in target) {
        let valueTarget = target[key];
        if (Array.isArray(valueTarget)) {
          const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
          valueTarget = valueTarget[index];
        }
        if (valueTarget !== null) {
          values[key] = valueTarget;
        }
      }
      for (const key in transitionEnd)
        values[key] = transitionEnd[key];
    });
  }
  return values;
}
const noop = (any) => any;
const { schedule: frame, cancel: cancelFrame, state: frameData, steps } = createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);
const svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createSvgRenderState,
    onMount: (props, instance, { renderState, latestValues }) => {
      frame.read(() => {
        try {
          renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
        } catch (e) {
          renderState.dimensions = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
      });
      frame.render(() => {
        buildSVGAttrs(renderState, latestValues, { enableHardwareAcceleration: false }, isSVGTag(instance.tagName), props.transformTemplate);
        renderSVG(instance, renderState);
      });
    }
  })
};
const htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
    createRenderState: createHtmlRenderState
  })
};
function createDomMotionConfig(Component, { forwardMotionProps = false }, preloadedFeatures2, createVisualElement) {
  const baseConfig = isSVGComponent(Component) ? svgMotionConfig : htmlMotionConfig;
  return {
    ...baseConfig,
    preloadedFeatures: preloadedFeatures2,
    useRender: createUseRender(forwardMotionProps),
    createVisualElement,
    Component
  };
}
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}
const isPrimaryPointer = (event) => {
  if (event.pointerType === "mouse") {
    return typeof event.button !== "number" || event.button <= 0;
  } else {
    return event.isPrimary !== false;
  }
};
function extractEventInfo(event, pointType = "page") {
  return {
    point: {
      x: event[`${pointType}X`],
      y: event[`${pointType}Y`]
    }
  };
}
const addPointerInfo = (handler) => {
  return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
};
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}
const combineFunctions = (a, b) => (v) => b(a(v));
const pipe = (...transformers) => transformers.reduce(combineFunctions);
function createLock(name) {
  let lock = null;
  return () => {
    const openLock = () => {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
const globalHorizontalLock = createLock("dragHorizontal");
const globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
  let lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    const openHorizontal = globalHorizontalLock();
    const openVertical = globalVerticalLock();
    if (openHorizontal && openVertical) {
      lock = () => {
        openHorizontal();
        openVertical();
      };
    } else {
      if (openHorizontal)
        openHorizontal();
      if (openVertical)
        openVertical();
    }
  }
  return lock;
}
function isDragActive() {
  const openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}
class Feature {
  constructor(node) {
    this.isMounted = false;
    this.node = node;
  }
  update() {
  }
}
function addHoverEvent(node, isActive) {
  const eventName = isActive ? "pointerenter" : "pointerleave";
  const callbackName = isActive ? "onHoverStart" : "onHoverEnd";
  const handleEvent = (event, info) => {
    if (event.pointerType === "touch" || isDragActive())
      return;
    const props = node.getProps();
    if (node.animationState && props.whileHover) {
      node.animationState.setActive("whileHover", isActive);
    }
    const callback = props[callbackName];
    if (callback)
      callback(event, info);
  };
  return addPointerEvent(node.current, eventName, handleEvent, {
    passive: !node.getProps()[callbackName]
  });
}
class HoverGesture extends Feature {
  mount() {
    this.unmount = pipe(addHoverEvent(this.node, true), addHoverEvent(this.node, false));
  }
  unmount() {
  }
}
class FocusGesture extends Feature {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible2 = false;
    try {
      isFocusVisible2 = this.node.current.matches(":focus-visible");
    } catch (e) {
      isFocusVisible2 = true;
    }
    if (!isFocusVisible2 || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
const isNodeOrChild = (parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};
function fireSyntheticPointerEvent(name, handler) {
  if (!handler)
    return;
  const syntheticPointerEvent = new PointerEvent("pointer" + name);
  handler(syntheticPointerEvent, extractEventInfo(syntheticPointerEvent));
}
class PressGesture extends Feature {
  constructor() {
    super(...arguments);
    this.removeStartListeners = noop;
    this.removeEndListeners = noop;
    this.removeAccessibleListeners = noop;
    this.startPointerPress = (startEvent, startInfo) => {
      if (this.isPressing)
        return;
      this.removeEndListeners();
      const props = this.node.getProps();
      const endPointerPress = (endEvent, endInfo) => {
        if (!this.checkPressEnd())
          return;
        const { onTap, onTapCancel, globalTapTarget } = this.node.getProps();
        !globalTapTarget && !isNodeOrChild(this.node.current, endEvent.target) ? onTapCancel && onTapCancel(endEvent, endInfo) : onTap && onTap(endEvent, endInfo);
      };
      const removePointerUpListener = addPointerEvent(window, "pointerup", endPointerPress, {
        passive: !(props.onTap || props["onPointerUp"])
      });
      const removePointerCancelListener = addPointerEvent(window, "pointercancel", (cancelEvent, cancelInfo) => this.cancelPress(cancelEvent, cancelInfo), {
        passive: !(props.onTapCancel || props["onPointerCancel"])
      });
      this.removeEndListeners = pipe(removePointerUpListener, removePointerCancelListener);
      this.startPress(startEvent, startInfo);
    };
    this.startAccessiblePress = () => {
      const handleKeydown = (keydownEvent) => {
        if (keydownEvent.key !== "Enter" || this.isPressing)
          return;
        const handleKeyup = (keyupEvent) => {
          if (keyupEvent.key !== "Enter" || !this.checkPressEnd())
            return;
          fireSyntheticPointerEvent("up", (event, info) => {
            const { onTap } = this.node.getProps();
            if (onTap)
              onTap(event, info);
          });
        };
        this.removeEndListeners();
        this.removeEndListeners = addDomEvent(this.node.current, "keyup", handleKeyup);
        fireSyntheticPointerEvent("down", (event, info) => {
          this.startPress(event, info);
        });
      };
      const removeKeydownListener = addDomEvent(this.node.current, "keydown", handleKeydown);
      const handleBlur = () => {
        if (!this.isPressing)
          return;
        fireSyntheticPointerEvent("cancel", (cancelEvent, cancelInfo) => this.cancelPress(cancelEvent, cancelInfo));
      };
      const removeBlurListener = addDomEvent(this.node.current, "blur", handleBlur);
      this.removeAccessibleListeners = pipe(removeKeydownListener, removeBlurListener);
    };
  }
  startPress(event, info) {
    this.isPressing = true;
    const { onTapStart, whileTap } = this.node.getProps();
    if (whileTap && this.node.animationState) {
      this.node.animationState.setActive("whileTap", true);
    }
    if (onTapStart) {
      onTapStart(event, info);
    }
  }
  checkPressEnd() {
    this.removeEndListeners();
    this.isPressing = false;
    const props = this.node.getProps();
    if (props.whileTap && this.node.animationState) {
      this.node.animationState.setActive("whileTap", false);
    }
    return !isDragActive();
  }
  cancelPress(event, info) {
    if (!this.checkPressEnd())
      return;
    const { onTapCancel } = this.node.getProps();
    if (onTapCancel)
      onTapCancel(event, info);
  }
  mount() {
    const props = this.node.getProps();
    const removePointerListener = addPointerEvent(props.globalTapTarget ? window : this.node.current, "pointerdown", this.startPointerPress, {
      passive: !(props.onTapStart || props["onPointerStart"])
    });
    const removeFocusListener = addDomEvent(this.node.current, "focus", this.startAccessiblePress);
    this.removeStartListeners = pipe(removePointerListener, removeFocusListener);
  }
  unmount() {
    this.removeStartListeners();
    this.removeEndListeners();
    this.removeAccessibleListeners();
  }
}
const observerCallbacks = /* @__PURE__ */ new WeakMap();
const observers = /* @__PURE__ */ new WeakMap();
const fireObserverCallback = (entry) => {
  const callback = observerCallbacks.get(entry.target);
  callback && callback(entry);
};
const fireAllObserverCallbacks = (entries) => {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}
const thresholdNames = {
  some: 0,
  all: 1
};
class InViewFeature extends Feature {
  constructor() {
    super(...arguments);
    this.hasEnteredView = false;
    this.isInView = false;
  }
  startObserver() {
    this.unmount();
    const { viewport = {} } = this.node.getProps();
    const { root, margin: rootMargin, amount = "some", once } = viewport;
    const options = {
      root: root ? root.current : void 0,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const onIntersectionUpdate = (entry) => {
      const { isIntersecting } = entry;
      if (this.isInView === isIntersecting)
        return;
      this.isInView = isIntersecting;
      if (once && !isIntersecting && this.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        this.hasEnteredView = true;
      }
      if (this.node.animationState) {
        this.node.animationState.setActive("whileInView", isIntersecting);
      }
      const { onViewportEnter, onViewportLeave } = this.node.getProps();
      const callback = isIntersecting ? onViewportEnter : onViewportLeave;
      callback && callback(entry);
    };
    return observeIntersection(this.node.current, options, onIntersectionUpdate);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver === "undefined")
      return;
    const { props, prevProps } = this.node;
    const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
  unmount() {
  }
}
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
  return (name) => viewport[name] !== prevViewport[name];
}
const gestureAnimations = {
  inView: {
    Feature: InViewFeature
  },
  tap: {
    Feature: PressGesture
  },
  focus: {
    Feature: FocusGesture
  },
  hover: {
    Feature: HoverGesture
  }
};
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}
function getCurrent(visualElement) {
  const current = {};
  visualElement.values.forEach((value, key) => current[key] = value.get());
  return current;
}
function getVelocity$1(visualElement) {
  const velocity = {};
  visualElement.values.forEach((value, key) => velocity[key] = value.getVelocity());
  return velocity;
}
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, getCurrent(visualElement), getVelocity$1(visualElement));
}
const secondsToMilliseconds = (seconds) => seconds * 1e3;
const millisecondsToSeconds = (milliseconds) => milliseconds / 1e3;
const underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
const criticallyDampedSpring = (target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
const keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
const ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
const getDefaultTransition = (valueKey, { keyframes: keyframes2 }) => {
  if (keyframes2.length > 2) {
    return keyframesTransition;
  } else if (transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes2[1]) : underDampedSpring;
  }
  return ease;
};
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
  return !!Object.keys(transition).length;
}
function getValueTransition(transition, key) {
  return transition[key] || transition["default"] || transition;
}
const isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe) {
  const resolvedKeyframes = keyframes2.filter(isNotNull);
  const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}
let now;
function clearTime() {
  now = void 0;
}
const time = {
  now: () => {
    if (now === void 0) {
      time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
    }
    return now;
  },
  set: (newTime) => {
    now = newTime;
    queueMicrotask(clearTime);
  }
};
const isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString(value);
  } else {
    return true;
  }
}
let warning = noop;
let invariant = noop;
const isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);
const splitCSSVariableRegex = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function parseCSSVariable(current) {
  const match = splitCSSVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token1, token2, fallback] = match;
  return [`--${token1 !== null && token1 !== void 0 ? token1 : token2}`, fallback];
}
function getVariableValue(current, element, depth = 1) {
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
  }
  return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}
const positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y",
  "translateX",
  "translateY"
]);
const isNumOrPxType = (v) => v === number || v === px;
const getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
const getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform }) => {
  if (transform === "none" || !transform)
    return 0;
  const matrix3d = transform.match(/^matrix3d\((.+)\)$/u);
  if (matrix3d) {
    return getPosFromMatrix(matrix3d[1], pos3);
  } else {
    const matrix = transform.match(/^matrix\((.+)\)$/u);
    if (matrix) {
      return getPosFromMatrix(matrix[1], pos2);
    } else {
      return 0;
    }
  }
};
const transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
const nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  return removedTransforms;
}
const positionalValues = {
  // Dimensions
  width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
  right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
  // Transform
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
const testValueType = (v) => (type) => type.test(v);
const auto = {
  test: (v) => v === "auto",
  parse: (v) => v
};
const dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
const findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));
const toResolve = /* @__PURE__ */ new Set();
let isScheduled = false;
let anyNeedsMeasurement = false;
function measureAllKeyframes() {
  if (anyNeedsMeasurement) {
    const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
    const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
    const transformsToRestore = /* @__PURE__ */ new Map();
    elementsToMeasure.forEach((element) => {
      const removedTransforms = removeNonTranslationalTransform(element);
      if (!removedTransforms.length)
        return;
      transformsToRestore.set(element, removedTransforms);
      element.render();
    });
    resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
    elementsToMeasure.forEach((element) => {
      element.render();
      const restore = transformsToRestore.get(element);
      if (restore) {
        restore.forEach(([key, value]) => {
          var _a;
          (_a = element.getValue(key)) === null || _a === void 0 ? void 0 : _a.set(value);
        });
      }
    });
    resolversToMeasure.forEach((resolver) => resolver.measureEndState());
    resolversToMeasure.forEach((resolver) => {
      if (resolver.suspendedScrollY !== void 0) {
        window.scrollTo(0, resolver.suspendedScrollY);
      }
    });
  }
  anyNeedsMeasurement = false;
  isScheduled = false;
  toResolve.forEach((resolver) => resolver.complete());
  toResolve.clear();
}
function readAllKeyframes() {
  toResolve.forEach((resolver) => {
    resolver.readKeyframes();
    if (resolver.needsMeasurement) {
      anyNeedsMeasurement = true;
    }
  });
}
function flushKeyframeResolvers() {
  readAllKeyframes();
  measureAllKeyframes();
}
class KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element, isAsync = false) {
    this.isComplete = false;
    this.isAsync = false;
    this.needsMeasurement = false;
    this.isScheduled = false;
    this.unresolvedKeyframes = [...unresolvedKeyframes];
    this.onComplete = onComplete;
    this.name = name;
    this.motionValue = motionValue2;
    this.element = element;
    this.isAsync = isAsync;
  }
  scheduleResolve() {
    this.isScheduled = true;
    if (this.isAsync) {
      toResolve.add(this);
      if (!isScheduled) {
        isScheduled = true;
        frame.read(readAllKeyframes);
        frame.resolveKeyframes(measureAllKeyframes);
      }
    } else {
      this.readKeyframes();
      this.complete();
    }
  }
  readKeyframes() {
    const { unresolvedKeyframes, name, element, motionValue: motionValue2 } = this;
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (unresolvedKeyframes[i] === null) {
        if (i === 0) {
          const currentValue = motionValue2 === null || motionValue2 === void 0 ? void 0 : motionValue2.get();
          const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
          if (currentValue !== void 0) {
            unresolvedKeyframes[0] = currentValue;
          } else if (element && name) {
            const valueAsRead = element.readValue(name, finalKeyframe);
            if (valueAsRead !== void 0 && valueAsRead !== null) {
              unresolvedKeyframes[0] = valueAsRead;
            }
          }
          if (unresolvedKeyframes[0] === void 0) {
            unresolvedKeyframes[0] = finalKeyframe;
          }
          if (motionValue2 && currentValue === void 0) {
            motionValue2.set(unresolvedKeyframes[0]);
          }
        } else {
          unresolvedKeyframes[i] = unresolvedKeyframes[i - 1];
        }
      }
    }
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete() {
    this.isComplete = true;
    this.onComplete(this.unresolvedKeyframes, this.finalKeyframe);
    toResolve.delete(this);
  }
  cancel() {
    if (!this.isComplete) {
      this.isScheduled = false;
      toResolve.delete(this);
    }
  }
  resume() {
    if (!this.isComplete)
      this.scheduleResolve();
  }
}
const isColorString = (type, testProp) => (v) => {
  return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
};
const splitColor = (aName, bName, cName) => (v) => {
  if (!isString(v))
    return v;
  const [a, b, c, alpha2] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};
const clampRgbUnit = (v) => clamp(0, 255, v);
const rgbUnit = {
  ...number,
  transform: (v) => Math.round(clampRgbUnit(v))
};
const rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v) {
  let r = "";
  let g = "";
  let b = "";
  let a = "";
  if (v.length > 5) {
    r = v.substring(1, 3);
    g = v.substring(3, 5);
    b = v.substring(5, 7);
    a = v.substring(7, 9);
  } else {
    r = v.substring(1, 2);
    g = v.substring(2, 3);
    b = v.substring(3, 4);
    a = v.substring(4, 5);
    r += r;
    g += g;
    b += b;
    a += a;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
const hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};
const hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};
const color = {
  test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
  parse: (v) => {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: (v) => {
    return isString(v) ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  }
};
function test(v) {
  var _a, _b;
  return isNaN(v) && isString(v) && (((_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = v.match(colorRegex)) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0;
}
const NUMBER_TOKEN = "number";
const COLOR_TOKEN = "color";
const VAR_TOKEN = "var";
const VAR_FUNCTION_TOKEN = "var(";
const SPLIT_TOKEN = "${}";
const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
  const originalValue = value.toString();
  const values = [];
  const indexes = {
    color: [],
    number: [],
    var: []
  };
  const types = [];
  let i = 0;
  const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
    if (color.test(parsedValue)) {
      indexes.color.push(i);
      types.push(COLOR_TOKEN);
      values.push(color.parse(parsedValue));
    } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
      indexes.var.push(i);
      types.push(VAR_TOKEN);
      values.push(parsedValue);
    } else {
      indexes.number.push(i);
      types.push(NUMBER_TOKEN);
      values.push(parseFloat(parsedValue));
    }
    ++i;
    return SPLIT_TOKEN;
  });
  const split = tokenised.split(SPLIT_TOKEN);
  return { values, split, indexes, types };
}
function parseComplexValue(v) {
  return analyseComplexValue(v).values;
}
function createTransformer(source) {
  const { split, types } = analyseComplexValue(source);
  const numSections = split.length;
  return (v) => {
    let output = "";
    for (let i = 0; i < numSections; i++) {
      output += split[i];
      if (v[i] !== void 0) {
        const type = types[i];
        if (type === NUMBER_TOKEN) {
          output += sanitize(v[i]);
        } else if (type === COLOR_TOKEN) {
          output += color.transform(v[i]);
        } else {
          output += v[i];
        }
      }
    }
    return output;
  };
}
const convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
function getAnimatableNone$1(v) {
  const parsed = parseComplexValue(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
const complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone: getAnimatableNone$1
};
const maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  const [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
  ...complex,
  getAnimatableNone: (v) => {
    const functions = v.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v;
  }
};
const defaultValueTypes = {
  ...numberValueTypes,
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
};
const getDefaultValueType = (key) => defaultValueTypes[key];
function getAnimatableNone(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
  let i = 0;
  let animatableTemplate = void 0;
  while (i < unresolvedKeyframes.length && !animatableTemplate) {
    if (typeof unresolvedKeyframes[i] === "string" && unresolvedKeyframes[i] !== "none" && unresolvedKeyframes[i] !== "0") {
      animatableTemplate = unresolvedKeyframes[i];
    }
    i++;
  }
  if (animatableTemplate && name) {
    for (const noneIndex of noneKeyframeIndexes) {
      unresolvedKeyframes[noneIndex] = getAnimatableNone(name, animatableTemplate);
    }
  }
}
class DOMKeyframesResolver extends KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2) {
    super(unresolvedKeyframes, onComplete, name, motionValue2, motionValue2 === null || motionValue2 === void 0 ? void 0 : motionValue2.owner, true);
  }
  readKeyframes() {
    const { unresolvedKeyframes, element, name } = this;
    if (!element.current)
      return;
    super.readKeyframes();
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      const keyframe = unresolvedKeyframes[i];
      if (typeof keyframe === "string" && isCSSVariableToken(keyframe)) {
        const resolved = getVariableValue(keyframe, element.current);
        if (resolved !== void 0) {
          unresolvedKeyframes[i] = resolved;
        }
        if (i === unresolvedKeyframes.length - 1) {
          this.finalKeyframe = keyframe;
        }
      }
    }
    if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
      return this.resolveNoneKeyframes();
    }
    const [origin, target] = unresolvedKeyframes;
    const originType = findDimensionValueType(origin);
    const targetType = findDimensionValueType(target);
    if (originType === targetType)
      return;
    if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
      for (let i = 0; i < unresolvedKeyframes.length; i++) {
        const value = unresolvedKeyframes[i];
        if (typeof value === "string") {
          unresolvedKeyframes[i] = parseFloat(value);
        }
      }
    } else {
      this.needsMeasurement = true;
    }
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes, name } = this;
    const noneKeyframeIndexes = [];
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (isNone(unresolvedKeyframes[i])) {
        noneKeyframeIndexes.push(i);
      }
    }
    if (noneKeyframeIndexes.length) {
      makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
    }
  }
  measureInitialState() {
    const { element, unresolvedKeyframes, name } = this;
    if (!element.current)
      return;
    if (name === "height") {
      this.suspendedScrollY = window.pageYOffset;
    }
    this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    unresolvedKeyframes[0] = this.measuredOrigin;
    const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
    if (measureKeyframe !== void 0) {
      element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
    }
  }
  measureEndState() {
    var _a;
    const { element, name, unresolvedKeyframes } = this;
    if (!element.current)
      return;
    const value = element.getValue(name);
    value && value.jump(this.measuredOrigin, false);
    const finalKeyframeIndex = unresolvedKeyframes.length - 1;
    const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
    unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    if (finalKeyframe !== null && this.finalKeyframe === void 0) {
      this.finalKeyframe = finalKeyframe;
    }
    if ((_a = this.removedTransforms) === null || _a === void 0 ? void 0 : _a.length) {
      this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
        element.getValue(unsetTransformName).set(unsetTransformValue);
      });
    }
    this.resolveNoneKeyframes();
  }
}
function memo(callback) {
  let result;
  return () => {
    if (result === void 0)
      result = callback();
    return result;
  };
}
const isAnimatable = (value, name) => {
  if (name === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  (complex.test(value) || value === "0") && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
};
function hasKeyframesChanged(keyframes2) {
  const current = keyframes2[0];
  if (keyframes2.length === 1)
    return true;
  for (let i = 0; i < keyframes2.length; i++) {
    if (keyframes2[i] !== current)
      return true;
  }
}
function canAnimate(keyframes2, name, type, velocity) {
  const originKeyframe = keyframes2[0];
  if (originKeyframe === null)
    return false;
  const targetKeyframe = keyframes2[keyframes2.length - 1];
  const isOriginAnimatable = isAnimatable(originKeyframe, name);
  const isTargetAnimatable = isAnimatable(targetKeyframe, name);
  if (!isOriginAnimatable || !isTargetAnimatable) {
    return false;
  }
  return hasKeyframesChanged(keyframes2) || type === "spring" && velocity;
}
class BaseAnimation {
  constructor({ autoplay = true, delay: delay2 = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", ...options }) {
    this.isStopped = false;
    this.hasAttemptedResolve = false;
    this.options = {
      autoplay,
      delay: delay2,
      type,
      repeat,
      repeatDelay,
      repeatType,
      ...options
    };
    this.updateFinishedPromise();
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    if (!this._resolved && !this.hasAttemptedResolve) {
      flushKeyframeResolvers();
    }
    return this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(keyframes2, finalKeyframe) {
    this.hasAttemptedResolve = true;
    const { name, type, velocity, delay: delay2, onComplete, onUpdate, isGenerator } = this.options;
    if (!isGenerator && !canAnimate(keyframes2, name, type, velocity)) {
      if (!delay2) {
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(getFinalKeyframe(keyframes2, this.options, finalKeyframe));
        onComplete === null || onComplete === void 0 ? void 0 : onComplete();
        this.resolveFinishedPromise();
        return;
      } else {
        this.options.duration = 0;
      }
    }
    const resolvedAnimation = this.initPlayback(keyframes2, finalKeyframe);
    if (resolvedAnimation === false)
      return;
    this._resolved = {
      keyframes: keyframes2,
      finalKeyframe,
      ...resolvedAnimation
    };
    this.onPostResolved();
  }
  onPostResolved() {
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve, reject) {
    return this.currentFinishedPromise.then(resolve, reject);
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((resolve) => {
      this.resolveFinishedPromise = resolve;
    });
  }
}
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
const velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t, current) {
  const prevT = Math.max(t - velocitySampleDuration, 0);
  return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}
const safeMin = 1e-3;
const minDuration = 0.01;
const maxDuration$1 = 10;
const minDamping = 0.05;
const maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= secondsToMilliseconds(maxDuration$1));
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
  duration = clamp(minDuration, maxDuration$1, millisecondsToSeconds(duration));
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b = calcAngularFreq(undampedFreq2, dampingRatio);
      const c = Math.exp(-delta);
      return safeMin - a / b * c;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a * b;
    };
    derivative = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (velocity - undampedFreq2) * (duration * duration);
      return a * b;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = secondsToMilliseconds(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    const derived = findSpring(options);
    springOptions = {
      ...springOptions,
      ...derived,
      mass: 1
    };
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring({ keyframes: keyframes2, restDelta, restSpeed, ...options }) {
  const origin = keyframes2[0];
  const target = keyframes2[keyframes2.length - 1];
  const state = { done: false, value: origin };
  const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
    ...options,
    velocity: -millisecondsToSeconds(options.velocity || 0)
  });
  const initialVelocity = velocity || 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? 0.01 : 2);
  restDelta || (restDelta = isGranularScale ? 5e-3 : 0.5);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
    };
  } else if (dampingRatio === 1) {
    resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
  } else {
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    };
  }
  return {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    next: (t) => {
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        let currentVelocity = initialVelocity;
        if (t !== 0) {
          if (dampingRatio < 1) {
            currentVelocity = calcGeneratorVelocity(resolveSpring, t, current);
          } else {
            currentVelocity = 0;
          }
        }
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? target : current;
      return state;
    }
  };
}
function inertia({ keyframes: keyframes2, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
  const origin = keyframes2[0];
  const state = {
    done: false,
    value: origin
  };
  const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
  const nearestBoundary = (v) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
  const calcLatest = (t) => target + calcDelta(t);
  const applyFriction = (t) => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state.done = Math.abs(delta) <= restDelta;
    state.value = state.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t) => {
    if (!isOutOfBounds(state.value))
      return;
    timeReachedBoundary = t;
    spring$1 = spring({
      keyframes: [state.value, nearestBoundary(state.value)],
      velocity: calcGeneratorVelocity(calcLatest, t, state.value),
      // TODO: This should be passing * 1000
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: (t) => {
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === void 0) {
        hasUpdatedFrame = true;
        applyFriction(t);
        checkCatchBoundary(t);
      }
      if (timeReachedBoundary !== void 0 && t >= timeReachedBoundary) {
        return spring$1.next(t - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t);
        return state;
      }
    }
  };
}
const calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
const easeIn = cubicBezier(0.42, 0, 1, 1);
const easeOut = cubicBezier(0, 0, 0.58, 1);
const easeInOut = cubicBezier(0.42, 0, 0.58, 1);
const isEasingArray = (ease2) => {
  return Array.isArray(ease2) && typeof ease2[0] !== "number";
};
const mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
const reverseEasing = (easing) => (p) => 1 - easing(1 - p);
const circIn = (p) => 1 - Math.sin(Math.acos(p));
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circIn);
const backOut = cubicBezier(0.33, 1.53, 0.69, 0.99);
const backIn = reverseEasing(backOut);
const backInOut = mirrorEasing(backIn);
const anticipate = (p) => (p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
const easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
};
const easingDefinitionToFunction = (definition) => {
  if (Array.isArray(definition)) {
    invariant(definition.length === 4);
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }
  return definition;
};
const progress = (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
const mixNumber$1 = (from, to, progress2) => {
  return from + (to - from) * progress2;
};
function hueToRgb(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    red = hueToRgb(p, q, hue + 1 / 3);
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}
const mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const expo = v * (to * to - fromExpo) + fromExpo;
  return expo < 0 ? 0 : Math.sqrt(expo);
};
const colorTypes = [hex, rgba, hsla];
const getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color2) {
  const type = getColorType(color2);
  let model = type.parse(color2);
  if (type === hsla) {
    model = hslaToRgba(model);
  }
  return model;
}
const mixColor = (from, to) => {
  const fromRGBA = asRGBA(from);
  const toRGBA = asRGBA(to);
  const blended = { ...fromRGBA };
  return (v) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
    blended.alpha = mixNumber$1(fromRGBA.alpha, toRGBA.alpha, v);
    return rgba.transform(blended);
  };
};
function mixImmediate(a, b) {
  return (p) => p > 0 ? b : a;
}
function mixNumber(a, b) {
  return (p) => mixNumber$1(a, b, p);
}
function getMixer(a) {
  if (typeof a === "number") {
    return mixNumber;
  } else if (typeof a === "string") {
    return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
  } else if (Array.isArray(a)) {
    return mixArray;
  } else if (typeof a === "object") {
    return color.test(a) ? mixColor : mixObject;
  }
  return mixImmediate;
}
function mixArray(a, b) {
  const output = [...a];
  const numValues = output.length;
  const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
  return (p) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](p);
    }
    return output;
  };
}
function mixObject(a, b) {
  const output = { ...a, ...b };
  const blendValue = {};
  for (const key in output) {
    if (a[key] !== void 0 && b[key] !== void 0) {
      blendValue[key] = getMixer(a[key])(a[key], b[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
}
function matchOrder(origin, target) {
  var _a;
  const orderedOrigin = [];
  const pointers = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < target.values.length; i++) {
    const type = target.types[i];
    const originIndex = origin.indexes[type][pointers[type]];
    const originValue = (_a = origin.values[originIndex]) !== null && _a !== void 0 ? _a : 0;
    orderedOrigin[i] = originValue;
    pointers[type]++;
  }
  return orderedOrigin;
}
const mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyseComplexValue(origin);
  const targetStats = analyseComplexValue(target);
  const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
  if (canInterpolate) {
    return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
  } else {
    return mixImmediate(origin, target);
  }
};
function mix(from, to, p) {
  if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
    return mixNumber$1(from, to, p);
  }
  const mixer = getMixer(from);
  return mixer(from, to);
}
function createMixers(output, ease2, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || mix;
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease2) {
      const easingFunction = Array.isArray(ease2) ? ease2[i] || noop : ease2;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length);
  if (inputLength === 1)
    return () => output[0];
  if (inputLength === 2 && input[0] === input[1])
    return () => output[1];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease2, mixer);
  const numMixers = mixers.length;
  const interpolator = (v) => {
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v < input[i + 1])
          break;
      }
    }
    const progressInRange = progress(input[i], input[i + 1], v);
    return mixers[i](progressInRange);
  };
  return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i);
    offset.push(mixNumber$1(min, 1, offsetProgress));
  }
}
function defaultOffset(arr) {
  const offset = [0];
  fillOffset(offset, arr.length - 1);
  return offset;
}
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
  const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t) => {
      state.value = mapTimeToKeyframe(t);
      state.done = t >= duration;
      return state;
    }
  };
}
const maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
  let duration = 0;
  const timeStep = 50;
  let state = generator.next(duration);
  while (!state.done && duration < maxGeneratorDuration) {
    duration += timeStep;
    state = generator.next(duration);
  }
  return duration >= maxGeneratorDuration ? Infinity : duration;
}
const frameloopDriver = (update) => {
  const passTimestamp = ({ timestamp }) => update(timestamp);
  return {
    start: () => frame.update(passTimestamp, true),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => frameData.isProcessing ? frameData.timestamp : time.now()
  };
};
const generators = {
  decay: inertia,
  inertia,
  tween: keyframes,
  keyframes,
  spring
};
const percentToProgress = (percent2) => percent2 / 100;
class MainThreadAnimation extends BaseAnimation {
  constructor({ KeyframeResolver: KeyframeResolver$1 = KeyframeResolver, ...options }) {
    super(options);
    this.holdTime = null;
    this.startTime = null;
    this.cancelTime = null;
    this.currentTime = 0;
    this.playbackSpeed = 1;
    this.pendingPlayState = "running";
    this.state = "idle";
    this.stop = () => {
      this.resolver.cancel();
      this.isStopped = true;
      if (this.state === "idle")
        return;
      this.teardown();
      const { onStop } = this.options;
      onStop && onStop();
    };
    const { name, motionValue: motionValue2, keyframes: keyframes2 } = this.options;
    const onResolved = (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe);
    if (name && motionValue2 && motionValue2.owner) {
      this.resolver = motionValue2.owner.resolveKeyframes(keyframes2, onResolved, name, motionValue2);
    } else {
      this.resolver = new KeyframeResolver$1(keyframes2, onResolved, name, motionValue2);
    }
    this.resolver.scheduleResolve();
  }
  initPlayback(keyframes$12) {
    const { type = "keyframes", repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = this.options;
    const generatorFactory = generators[type] || keyframes;
    let mapPercentToKeyframes;
    let mirroredGenerator;
    if (generatorFactory !== keyframes && typeof keyframes$12[0] !== "number") {
      mapPercentToKeyframes = pipe(percentToProgress, mix(keyframes$12[0], keyframes$12[1]));
      keyframes$12 = [0, 100];
    }
    const generator = generatorFactory({ ...this.options, keyframes: keyframes$12 });
    if (repeatType === "mirror") {
      mirroredGenerator = generatorFactory({
        ...this.options,
        keyframes: [...keyframes$12].reverse(),
        velocity: -velocity
      });
    }
    if (generator.calculatedDuration === null) {
      generator.calculatedDuration = calcGeneratorDuration(generator);
    }
    const { calculatedDuration } = generator;
    const resolvedDuration = calculatedDuration + repeatDelay;
    const totalDuration = resolvedDuration * (repeat + 1) - repeatDelay;
    return {
      generator,
      mirroredGenerator,
      mapPercentToKeyframes,
      calculatedDuration,
      resolvedDuration,
      totalDuration
    };
  }
  onPostResolved() {
    const { autoplay = true } = this.options;
    this.play();
    if (this.pendingPlayState === "paused" || !autoplay) {
      this.pause();
    } else {
      this.state = this.pendingPlayState;
    }
  }
  tick(timestamp, sample = false) {
    const { resolved } = this;
    if (!resolved) {
      const { keyframes: keyframes3 } = this.options;
      return { done: true, value: keyframes3[keyframes3.length - 1] };
    }
    const { finalKeyframe, generator, mirroredGenerator, mapPercentToKeyframes, keyframes: keyframes2, calculatedDuration, totalDuration, resolvedDuration } = resolved;
    if (this.startTime === null)
      return generator.next(0);
    const { delay: delay2, repeat, repeatType, repeatDelay, onUpdate } = this.options;
    if (this.speed > 0) {
      this.startTime = Math.min(this.startTime, timestamp);
    } else if (this.speed < 0) {
      this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
    }
    if (sample) {
      this.currentTime = timestamp;
    } else if (this.holdTime !== null) {
      this.currentTime = this.holdTime;
    } else {
      this.currentTime = Math.round(timestamp - this.startTime) * this.speed;
    }
    const timeWithoutDelay = this.currentTime - delay2 * (this.speed >= 0 ? 1 : -1);
    const isInDelayPhase = this.speed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    this.currentTime = Math.max(timeWithoutDelay, 0);
    if (this.state === "finished" && this.holdTime === null) {
      this.currentTime = totalDuration;
    }
    let elapsed = this.currentTime;
    let frameGenerator = generator;
    if (repeat) {
      const progress2 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
    }
    const state = isInDelayPhase ? { done: false, value: keyframes2[0] } : frameGenerator.next(elapsed);
    if (mapPercentToKeyframes) {
      state.value = mapPercentToKeyframes(state.value);
    }
    let { done } = state;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = this.speed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
    }
    const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
    if (isAnimationFinished && finalKeyframe !== void 0) {
      state.value = getFinalKeyframe(keyframes2, this.options, finalKeyframe);
    }
    if (onUpdate) {
      onUpdate(state.value);
    }
    if (isAnimationFinished) {
      this.finish();
    }
    return state;
  }
  get duration() {
    const { resolved } = this;
    return resolved ? millisecondsToSeconds(resolved.calculatedDuration) : 0;
  }
  get time() {
    return millisecondsToSeconds(this.currentTime);
  }
  set time(newTime) {
    newTime = secondsToMilliseconds(newTime);
    this.currentTime = newTime;
    if (this.holdTime !== null || this.speed === 0) {
      this.holdTime = newTime;
    } else if (this.driver) {
      this.startTime = this.driver.now() - newTime / this.speed;
    }
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(newSpeed) {
    const hasChanged = this.playbackSpeed !== newSpeed;
    this.playbackSpeed = newSpeed;
    if (hasChanged) {
      this.time = millisecondsToSeconds(this.currentTime);
    }
  }
  play() {
    if (!this.resolver.isScheduled) {
      this.resolver.resume();
    }
    if (!this._resolved) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped)
      return;
    const { driver = frameloopDriver, onPlay } = this.options;
    if (!this.driver) {
      this.driver = driver((timestamp) => this.tick(timestamp));
    }
    onPlay && onPlay();
    const now2 = this.driver.now();
    if (this.holdTime !== null) {
      this.startTime = now2 - this.holdTime;
    } else if (!this.startTime || this.state === "finished") {
      this.startTime = now2;
    }
    if (this.state === "finished") {
      this.updateFinishedPromise();
    }
    this.cancelTime = this.startTime;
    this.holdTime = null;
    this.state = "running";
    this.driver.start();
  }
  pause() {
    var _a;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    this.state = "paused";
    this.holdTime = (_a = this.currentTime) !== null && _a !== void 0 ? _a : 0;
  }
  complete() {
    if (this.state !== "running") {
      this.play();
    }
    this.pendingPlayState = this.state = "finished";
    this.holdTime = null;
  }
  finish() {
    this.teardown();
    this.state = "finished";
    const { onComplete } = this.options;
    onComplete && onComplete();
  }
  cancel() {
    if (this.cancelTime !== null) {
      this.tick(this.cancelTime);
    }
    this.teardown();
    this.updateFinishedPromise();
  }
  teardown() {
    this.state = "idle";
    this.stopDriver();
    this.resolveFinishedPromise();
    this.updateFinishedPromise();
    this.startTime = this.cancelTime = null;
    this.resolver.cancel();
  }
  stopDriver() {
    if (!this.driver)
      return;
    this.driver.stop();
    this.driver = void 0;
  }
  sample(time2) {
    this.startTime = 0;
    return this.tick(time2, true);
  }
}
const isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";
function isWaapiSupportedEasing(easing) {
  return Boolean(!easing || typeof easing === "string" && easing in supportedWaapiEasing || isBezierDefinition(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
}
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
const supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};
function mapEasingToNativeEasingWithDefault(easing) {
  return mapEasingToNativeEasing(easing) || supportedWaapiEasing.easeOut;
}
function mapEasingToNativeEasing(easing) {
  if (!easing) {
    return void 0;
  } else if (isBezierDefinition(easing)) {
    return cubicBezierAsString(easing);
  } else if (Array.isArray(easing)) {
    return easing.map(mapEasingToNativeEasingWithDefault);
  } else {
    return supportedWaapiEasing[easing];
  }
}
function animateStyle(element, valueName, keyframes2, { delay: delay2 = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease2, times } = {}) {
  const keyframeOptions = { [valueName]: keyframes2 };
  if (times)
    keyframeOptions.offset = times;
  const easing = mapEasingToNativeEasing(ease2);
  if (Array.isArray(easing))
    keyframeOptions.easing = easing;
  return element.animate(keyframeOptions, {
    delay: delay2,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  });
}
const supportsWaapi = memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
const acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
const sampleDelta = 10;
const maxDuration = 2e4;
function requiresPregeneratedKeyframes(options) {
  return options.type === "spring" || options.name === "backgroundColor" || !isWaapiSupportedEasing(options.ease);
}
function pregenerateKeyframes(keyframes2, options) {
  const sampleAnimation = new MainThreadAnimation({
    ...options,
    keyframes: keyframes2,
    repeat: 0,
    delay: 0,
    isGenerator: true
  });
  let state = { done: false, value: keyframes2[0] };
  const pregeneratedKeyframes = [];
  let t = 0;
  while (!state.done && t < maxDuration) {
    state = sampleAnimation.sample(t);
    pregeneratedKeyframes.push(state.value);
    t += sampleDelta;
  }
  return {
    times: void 0,
    keyframes: pregeneratedKeyframes,
    duration: t - sampleDelta,
    ease: "linear"
  };
}
class AcceleratedAnimation extends BaseAnimation {
  constructor(options) {
    super(options);
    const { name, motionValue: motionValue2, keyframes: keyframes2 } = this.options;
    this.resolver = new DOMKeyframesResolver(keyframes2, (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe), name, motionValue2);
    this.resolver.scheduleResolve();
  }
  initPlayback(keyframes2, finalKeyframe) {
    var _a;
    let { duration = 300, times, ease: ease2, type, motionValue: motionValue2, name } = this.options;
    if (!((_a = motionValue2.owner) === null || _a === void 0 ? void 0 : _a.current)) {
      return false;
    }
    if (requiresPregeneratedKeyframes(this.options)) {
      const { onComplete, onUpdate, motionValue: motionValue3, ...options } = this.options;
      const pregeneratedAnimation = pregenerateKeyframes(keyframes2, options);
      keyframes2 = pregeneratedAnimation.keyframes;
      if (keyframes2.length === 1) {
        keyframes2[1] = keyframes2[0];
      }
      duration = pregeneratedAnimation.duration;
      times = pregeneratedAnimation.times;
      ease2 = pregeneratedAnimation.ease;
      type = "keyframes";
    }
    const animation = animateStyle(motionValue2.owner.current, name, keyframes2, { ...this.options, duration, times, ease: ease2 });
    animation.startTime = time.now();
    if (this.pendingTimeline) {
      animation.timeline = this.pendingTimeline;
      this.pendingTimeline = void 0;
    } else {
      animation.onfinish = () => {
        const { onComplete } = this.options;
        motionValue2.set(getFinalKeyframe(keyframes2, this.options, finalKeyframe));
        onComplete && onComplete();
        this.cancel();
        this.resolveFinishedPromise();
      };
    }
    return {
      animation,
      duration,
      times,
      type,
      ease: ease2,
      keyframes: keyframes2
    };
  }
  get duration() {
    const { resolved } = this;
    if (!resolved)
      return 0;
    const { duration } = resolved;
    return millisecondsToSeconds(duration);
  }
  get time() {
    const { resolved } = this;
    if (!resolved)
      return 0;
    const { animation } = resolved;
    return millisecondsToSeconds(animation.currentTime || 0);
  }
  set time(newTime) {
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    animation.currentTime = secondsToMilliseconds(newTime);
  }
  get speed() {
    const { resolved } = this;
    if (!resolved)
      return 1;
    const { animation } = resolved;
    return animation.playbackRate;
  }
  set speed(newSpeed) {
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    animation.playbackRate = newSpeed;
  }
  get state() {
    const { resolved } = this;
    if (!resolved)
      return "idle";
    const { animation } = resolved;
    return animation.playState;
  }
  /**
   * Replace the default DocumentTimeline with another AnimationTimeline.
   * Currently used for scroll animations.
   */
  attachTimeline(timeline) {
    if (!this._resolved) {
      this.pendingTimeline = timeline;
    } else {
      const { resolved } = this;
      if (!resolved)
        return noop;
      const { animation } = resolved;
      animation.timeline = timeline;
      animation.onfinish = null;
    }
    return noop;
  }
  play() {
    if (this.isStopped)
      return;
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    if (animation.playState === "finished") {
      this.updateFinishedPromise();
    }
    animation.play();
  }
  pause() {
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    animation.pause();
  }
  stop() {
    this.resolver.cancel();
    this.isStopped = true;
    if (this.state === "idle")
      return;
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation, keyframes: keyframes2, duration, type, ease: ease2, times } = resolved;
    if (animation.playState === "idle" || animation.playState === "finished") {
      return;
    }
    if (this.time) {
      const { motionValue: motionValue2, onUpdate, onComplete, ...options } = this.options;
      const sampleAnimation = new MainThreadAnimation({
        ...options,
        keyframes: keyframes2,
        duration,
        type,
        ease: ease2,
        times,
        isGenerator: true
      });
      const sampleTime = secondsToMilliseconds(this.time);
      motionValue2.setWithVelocity(sampleAnimation.sample(sampleTime - sampleDelta).value, sampleAnimation.sample(sampleTime).value, sampleDelta);
    }
    this.cancel();
  }
  complete() {
    const { resolved } = this;
    if (!resolved)
      return;
    resolved.animation.finish();
  }
  cancel() {
    const { resolved } = this;
    if (!resolved)
      return;
    resolved.animation.cancel();
  }
  static supports(options) {
    const { motionValue: motionValue2, name, repeatDelay, repeatType, damping, type } = options;
    return supportsWaapi() && name && acceleratedValues.has(name) && motionValue2 && motionValue2.owner && motionValue2.owner.current instanceof HTMLElement && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !motionValue2.owner.getProps().onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
  }
}
const animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
  const valueTransition = getValueTransition(transition, name) || {};
  const delay2 = valueTransition.delay || transition.delay || 0;
  let { elapsed = 0 } = transition;
  elapsed = elapsed - secondsToMilliseconds(delay2);
  let options = {
    keyframes: Array.isArray(target) ? target : [null, target],
    ease: "easeOut",
    velocity: value.getVelocity(),
    ...valueTransition,
    delay: -elapsed,
    onUpdate: (v) => {
      value.set(v);
      valueTransition.onUpdate && valueTransition.onUpdate(v);
    },
    onComplete: () => {
      onComplete();
      valueTransition.onComplete && valueTransition.onComplete();
    },
    name,
    motionValue: value,
    element: isHandoff ? void 0 : element
  };
  if (!isTransitionDefined(valueTransition)) {
    options = {
      ...options,
      ...getDefaultTransition(name, options)
    };
  }
  if (options.duration) {
    options.duration = secondsToMilliseconds(options.duration);
  }
  if (options.repeatDelay) {
    options.repeatDelay = secondsToMilliseconds(options.repeatDelay);
  }
  if (options.from !== void 0) {
    options.keyframes[0] = options.from;
  }
  let shouldSkip = false;
  if (options.type === false || options.duration === 0 && !options.repeatDelay) {
    options.duration = 0;
    if (options.delay === 0) {
      shouldSkip = true;
    }
  }
  if (shouldSkip && !isHandoff && value.get() !== void 0) {
    const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
    if (finalKeyframe !== void 0) {
      frame.update(() => {
        options.onUpdate(finalKeyframe);
        options.onComplete();
      });
      return;
    }
  }
  if (!isHandoff && AcceleratedAnimation.supports(options)) {
    return new AcceleratedAnimation(options);
  } else {
    return new MainThreadAnimation(options);
  }
};
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1)
    arr.splice(index, 1);
}
class SubscriptionManager {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a, b, c) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a, b, c);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a, b, c);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const MAX_VELOCITY_DELTA = 30;
const isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
class MotionValue {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(init2, options = {}) {
    this.version = "11.1.7";
    this.canTrackVelocity = false;
    this.events = {};
    this.updateAndNotify = (v, render = true) => {
      const currentTime = time.now();
      if (this.updatedAt !== currentTime) {
        this.setPrevFrameValue();
      }
      this.prev = this.current;
      this.setCurrent(v);
      if (this.current !== this.prev && this.events.change) {
        this.events.change.notify(this.current);
      }
      if (render && this.events.renderRequest) {
        this.events.renderRequest.notify(this.current);
      }
    };
    this.hasAnimated = false;
    this.setCurrent(init2);
    this.canTrackVelocity = isFloat(this.current);
    this.owner = options.owner;
  }
  setCurrent(current) {
    this.current = current;
    this.updatedAt = time.now();
  }
  setPrevFrameValue(prevFrameValue = this.current) {
    this.prevFrameValue = prevFrameValue;
    this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        frame.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v, render = true) {
    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v, render);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current, delta) {
    this.set(current);
    this.prev = void 0;
    this.prevFrameValue = prev;
    this.prevUpdatedAt = this.updatedAt - delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v, endAnimation = true) {
    this.updateAndNotify(v);
    this.prev = v;
    this.prevUpdatedAt = this.prevFrameValue = void 0;
    endAnimation && this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const currentTime = time.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
      return 0;
    }
    const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
    return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
}
function motionValue(init2, options) {
  return new MotionValue(init2, options);
}
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay: delay2 = 0, transitionOverride, type } = {}) {
  var _a;
  let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;
  const willChange = visualElement.getValue("willChange");
  if (transitionOverride)
    transition = transitionOverride;
  const animations2 = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (const key in target) {
    const value = visualElement.getValue(key, (_a = visualElement.latestValues[key]) !== null && _a !== void 0 ? _a : null);
    const valueTarget = target[key];
    if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay: delay2,
      elapsed: 0,
      ...getValueTransition(transition || {}, key)
    };
    let isHandoff = false;
    if (window.HandoffAppearAnimations) {
      const props = visualElement.getProps();
      const appearId = props[optimizedAppearDataAttribute];
      if (appearId) {
        const elapsed = window.HandoffAppearAnimations(appearId, key);
        if (elapsed !== null) {
          valueTransition.elapsed = elapsed;
          isHandoff = true;
        }
      }
    }
    value.start(animateMotionValue(key, value, valueTarget, visualElement.shouldReduceMotion && transformProps.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
    const animation = value.animation;
    if (animation) {
      if (isWillChangeMotionValue(willChange)) {
        willChange.add(key);
        animation.then(() => willChange.remove(key));
      }
      animations2.push(animation);
    }
  }
  if (transitionEnd) {
    Promise.all(animations2).then(() => {
      frame.update(() => {
        transitionEnd && setTarget(visualElement, transitionEnd);
      });
    });
  }
  return animations2;
}
function animateVariant(visualElement, variant, options = {}) {
  var _a;
  const resolved = resolveVariant(visualElement, variant, options.type === "exit" ? (_a = visualElement.presenceContext) === null || _a === void 0 ? void 0 : _a.custom : void 0);
  let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
  const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
    return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
    return first().then(() => last());
  } else {
    return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
  }
}
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations2 = [];
  const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
  const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
  Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i) => {
    child.notify("AnimationStart", variant);
    animations2.push(animateVariant(child, variant, {
      ...options,
      delay: delayChildren + generateStaggerDuration(i)
    }).then(() => child.notify("AnimationComplete", variant)));
  });
  return Promise.all(animations2);
}
function sortByTreeOrder(a, b) {
  return a.sortNodePosition(b);
}
function animateVisualElement(visualElement, definition, options = {}) {
  visualElement.notify("AnimationStart", definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations2 = definition.map((variant) => animateVariant(visualElement, variant, options));
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
    animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
  }
  return animation.then(() => {
    frame.postRender(() => {
      visualElement.notify("AnimationComplete", definition);
    });
  });
}
const reversePriorityOrder = [...variantPriorityOrder].reverse();
const numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
  return (animations2) => Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
}
function createAnimationState(visualElement) {
  let animate = animateList(visualElement);
  const state = createState();
  let isInitialRender = true;
  const buildResolvedTypeValues = (type) => (acc, definition) => {
    var _a;
    const resolved = resolveVariant(visualElement, definition, type === "exit" ? (_a = visualElement.presenceContext) === null || _a === void 0 ? void 0 : _a.custom : void 0);
    if (resolved) {
      const { transition, transitionEnd, ...target } = resolved;
      acc = { ...acc, ...target, ...transitionEnd };
    }
    return acc;
  };
  function setAnimateFunction(makeAnimator) {
    animate = makeAnimator(visualElement);
  }
  function animateChanges(changedActiveType) {
    const props = visualElement.getProps();
    const context = visualElement.getVariantContext(true) || {};
    const animations2 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i = 0; i < numAnimationTypes; i++) {
      const type = reversePriorityOrder[i];
      const typeState = state[type];
      const prop = props[type] !== void 0 ? props[type] : context[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = { ...encounteredKeys };
      if (
        // If it isn't active and hasn't *just* been set as inactive
        !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
        !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
        isAnimationControls(prop) || typeof prop === "boolean"
      ) {
        continue;
      }
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i > removedVariantIndex && propIsVariant;
      let handledRemovedValues = false;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = (key) => {
        shouldAnimateType = true;
        if (removedKeys.has(key)) {
          handledRemovedValues = true;
          removedKeys.delete(key);
        }
        typeState.needsAnimating[key] = true;
        const motionValue2 = visualElement.getValue(key);
        if (motionValue2)
          motionValue2.liveStyle = false;
      };
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        let valueHasChanged = false;
        if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
          valueHasChanged = !shallowCompare(next, prev);
        } else {
          valueHasChanged = next !== prev;
        }
        if (valueHasChanged) {
          if (next !== void 0 && next !== null) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = { ...encounteredKeys, ...resolvedValues };
      }
      if (isInitialRender && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && (!isInherited || handledRemovedValues)) {
        animations2.push(...definitionList.map((animation) => ({
          animation,
          options: { type }
        })));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        const motionValue2 = visualElement.getValue(key);
        if (motionValue2)
          motionValue2.liveStyle = true;
        fallbackAnimation[key] = fallbackTarget !== null && fallbackTarget !== void 0 ? fallbackTarget : null;
      });
      animations2.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate(animations2) : Promise.resolve();
  }
  function setActive(type, isActive) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    const animations2 = animateChanges(type);
    for (const key in state) {
      state[key].protectedKeys = {};
    }
    return animations2;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state
  };
}
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (Array.isArray(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  return {
    animate: createTypeState(true),
    whileInView: createTypeState(),
    whileHover: createTypeState(),
    whileTap: createTypeState(),
    whileDrag: createTypeState(),
    whileFocus: createTypeState(),
    exit: createTypeState()
  };
}
class AnimationFeature extends Feature {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(node) {
    super(node);
    node.animationState || (node.animationState = createAnimationState(node));
  }
  updateAnimationControlsSubscription() {
    const { animate } = this.node.getProps();
    this.unmount();
    if (isAnimationControls(animate)) {
      this.unmount = animate.subscribe(this.node);
    }
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate } = this.node.getProps();
    const { animate: prevAnimate } = this.node.prevProps || {};
    if (animate !== prevAnimate) {
      this.updateAnimationControlsSubscription();
    }
  }
  unmount() {
  }
}
let id$1 = 0;
class ExitAnimationFeature extends Feature {
  constructor() {
    super(...arguments);
    this.id = id$1++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: isPresent2, onExitComplete } = this.node.presenceContext;
    const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || isPresent2 === prevIsPresent) {
      return;
    }
    const exitAnimation = this.node.animationState.setActive("exit", !isPresent2);
    if (onExitComplete && !isPresent2) {
      exitAnimation.then(() => onExitComplete(this.id));
    }
  }
  mount() {
    const { register } = this.node.presenceContext || {};
    if (register) {
      this.unmount = register(this.id);
    }
  }
  unmount() {
  }
}
const animations = {
  animation: {
    Feature: AnimationFeature
  },
  exit: {
    Feature: ExitAnimationFeature
  }
};
const distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
  const xDelta = distance(a.x, b.x);
  const yDelta = distance(a.y, b.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
class PanSession {
  constructor(event, handlers2, { transformPagePoint, contextWindow, dragSnapToOrigin = false } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.contextWindow = window;
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point2 } = info2;
      const { timestamp: timestamp2 } = frameData;
      this.history.push({ ...point2, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      frame.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
      if (this.dragSnapToOrigin)
        resumeAnimation && resumeAnimation();
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const panInfo = getPanInfo(event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (!isPrimaryPointer(event))
      return;
    this.dragSnapToOrigin = dragSnapToOrigin;
    this.handlers = handlers2;
    this.transformPagePoint = transformPagePoint;
    this.contextWindow = contextWindow || window;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = frameData;
    this.history = [{ ...point, timestamp }];
    const { onSessionStart } = handlers2;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(handlers2) {
    this.handlers = handlers2;
  }
  end() {
    this.removeListeners && this.removeListeners();
    cancelFrame(this.updatePoint);
  }
}
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo({ point }, history) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  const time2 = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time2 === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time2,
    y: (lastPoint.y - timestampedPoint.y) / time2
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target = 0, maxDistance = 0.01) {
  return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mixNumber$1(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale))
    delta.scale = 1;
  delta.translate = mixNumber$1(target.min, target.max, delta.origin) - delta.originPoint;
  if (isNear(delta.translate) || isNaN(delta.translate))
    delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
  calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout2, parent) {
  target.min = layout2.min - parent.min;
  target.max = target.min + calcLength(layout2);
}
function calcRelativePosition(target, layout2, parent) {
  calcRelativeAxisPosition(target.x, layout2.x, parent.x);
  calcRelativeAxisPosition(target.y, layout2.y, parent.y);
}
function applyConstraints(point, { min, max }, elastic) {
  if (min !== void 0 && point < min) {
    point = elastic ? mixNumber$1(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mixNumber$1(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout2, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout2.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout2.min;
  }
  return relativeConstraints;
}
const defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
const createAxisDelta = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
const createDelta = () => ({
  x: createAxisDelta(),
  y: createAxisDelta()
});
const createAxis = () => ({ min: 0, max: 0 });
const createBox = () => ({
  x: createAxis(),
  y: createAxis()
});
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertBoxToBoundingBox({ x, y }) {
  return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
function transformBoxPoints(point, transformPoint2) {
  if (!transformPoint2)
    return point;
  const topLeft = transformPoint2({ x: point.left, y: point.top });
  const bottomRight = transformPoint2({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
function hasScale({ scale: scale2, scaleX, scaleY }) {
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
  return value && value !== "0%";
}
function scalePoint(point, scale2, originPoint) {
  const distanceFromOrigin = point - originPoint;
  const scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, { x, y }) {
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta = node.projectionDelta;
    const instance = node.instance;
    if (instance && instance.style && instance.style.display === "contents") {
      continue;
    }
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, {
        x: -node.scroll.offset.x,
        y: -node.scroll.offset.y
      });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
  treeScale.x = snapToDefault(treeScale.x);
  treeScale.y = snapToDefault(treeScale.y);
}
function snapToDefault(scale2) {
  if (Number.isInteger(scale2))
    return scale2;
  return scale2 > 1.0000000000001 || scale2 < 0.999999999999 ? scale2 : 1;
}
function translateAxis(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
function transformAxis(axis, transforms, [key, scaleKey, originKey]) {
  const axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
  const originPoint = mixNumber$1(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
const xKeys$1 = ["x", "scaleX", "originX"];
const yKeys$1 = ["y", "scaleY", "originY"];
function transformBox(box, transform) {
  transformAxis(box.x, transform, xKeys$1);
  transformAxis(box.y, transform, yKeys$1);
}
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll } = rootProjectionNode2;
  if (scroll) {
    translateAxis(viewportBox.x, scroll.offset.x);
    translateAxis(viewportBox.y, scroll.offset.y);
  }
  return viewportBox;
}
const getContextWindow = ({ current }) => {
  return current ? current.ownerDocument.defaultView : null;
};
const elementDragControls = /* @__PURE__ */ new WeakMap();
class VisualElementDragControls {
  constructor(visualElement) {
    this.openGlobalLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    const { presenceContext } = this.visualElement;
    if (presenceContext && presenceContext.isPresent === false)
      return;
    const onSessionStart = (event) => {
      const { dragSnapToOrigin: dragSnapToOrigin2 } = this.getProps();
      dragSnapToOrigin2 ? this.pauseAnimation() : this.stopAnimation();
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event, "page").point);
      }
    };
    const onStart = (event, info) => {
      const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
      if (drag2 && !dragPropagation) {
        if (this.openGlobalLock)
          this.openGlobalLock();
        this.openGlobalLock = getGlobalLock(drag2);
        if (!this.openGlobalLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) {
              const length = calcLength(measuredAxis);
              current = length * (parseFloat(current) / 100);
            }
          }
        }
        this.originPoint[axis] = current;
      });
      if (onDragStart)
        onDragStart(event, info);
      const { animationState } = this.visualElement;
      animationState && animationState.setActive("whileDrag", true);
    };
    const onMove = (event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openGlobalLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) {
          onDirectionLock && onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      onDrag && onDrag(event, info);
    };
    const onSessionEnd = (event, info) => this.stop(event, info);
    const resumeAnimation = () => eachAxis((axis) => {
      var _a;
      return this.getAnimationState(axis) === "paused" && ((_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.play());
    });
    const { dragSnapToOrigin } = this.getProps();
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd,
      resumeAnimation
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin,
      contextWindow: getContextWindow(this.visualElement)
    });
  }
  stop(event, info) {
    const isDragging = this.isDragging;
    this.cancel();
    if (!isDragging)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    if (onDragEnd)
      onDragEnd(event, info);
  }
  cancel() {
    this.isDragging = false;
    const { projection, animationState } = this.visualElement;
    if (projection) {
      projection.isAnimationBlocked = false;
    }
    this.panSession && this.panSession.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    animationState && animationState.setActive("whileDrag", false);
  }
  updateAxis(axis, _point, offset) {
    const { drag: drag2 } = this.getProps();
    if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    var _a;
    const { dragConstraints, dragElastic } = this.getProps();
    const layout2 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : (_a = this.visualElement.projection) === null || _a === void 0 ? void 0 : _a.layout;
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout2) {
        this.constraints = calcRelativeConstraints(layout2.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout2 && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.constraints !== false && this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout2.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, this.currentDirection)) {
        return;
      }
      let transition = constraints && constraints[axis] || {};
      if (dragSnapToOrigin)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia2 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement));
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  pauseAnimation() {
    eachAxis((axis) => {
      var _a;
      return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.pause();
    });
  }
  getAnimationState(axis) {
    var _a;
    return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(axis) {
    const dragKey = `_drag${axis.toUpperCase()}`;
    const props = this.visualElement.getProps();
    const externalMotionValue = props[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
  }
  snapToCursor(point) {
    eachAxis((axis) => {
      const { drag: drag2 } = this.getProps();
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        axisValue.set(point[axis] - mixNumber$1(min, max, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: drag2, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue && this.constraints !== false) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mixNumber$1(min, max, boxProgress[axis]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag2, dragListener = true } = this.getProps();
      drag2 && dragListener && this.start(event);
    });
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints)) {
        this.constraints = this.resolveRefConstraints();
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    measureDragConstraints();
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue2 = this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    });
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return {
      ...props,
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
}
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}
class DragGesture extends Feature {
  constructor(node) {
    super(node);
    this.removeGroupControls = noop;
    this.removeListeners = noop;
    this.controls = new VisualElementDragControls(node);
  }
  mount() {
    const { dragControls } = this.node.getProps();
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop;
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
  }
}
const asyncHandler = (handler) => (event, info) => {
  if (handler) {
    handler(event, info);
  }
};
class PanGesture extends Feature {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = noop;
  }
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: getContextWindow(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
    return {
      onSessionStart: asyncHandler(onPanSessionStart),
      onStart: asyncHandler(onPanStart),
      onMove: onPan,
      onEnd: (event, info) => {
        delete this.session;
        if (onPanEnd)
          onPanEnd(event, info);
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
}
function usePresence() {
  const context = reactExports.useContext(PresenceContext);
  if (context === null)
    return [true, null];
  const { isPresent: isPresent2, onExitComplete, register } = context;
  const id2 = reactExports.useId();
  reactExports.useEffect(() => register(id2), []);
  const safeToRemove = () => onExitComplete && onExitComplete(id2);
  return !isPresent2 && onExitComplete ? [false, safeToRemove] : [true];
}
function useIsPresent() {
  return isPresent(reactExports.useContext(PresenceContext));
}
function isPresent(context) {
  return context === null ? true : context.isPresent;
}
const globalProjectionState = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: true,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: false
};
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
const correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x = pixelsToPercent(latest, node.target.x);
    const y = pixelsToPercent(latest, node.target.y);
    return `${x}% ${y}%`;
  }
};
const correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mixNumber$1(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    return template(shadow);
  }
};
class MeasureLayoutWithContext extends reactExports.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
    const { projection } = visualElement;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const { layoutDependency, visualElement, drag: drag2, isPresent: isPresent2 } = this.props;
    const projection = visualElement.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent2;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent2) {
      if (isPresent2) {
        projection.promote();
      } else if (!projection.relegate()) {
        frame.postRender(() => {
          const stack = projection.getStack();
          if (!stack || !stack.members.length) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const { projection } = this.props.visualElement;
    if (projection) {
      projection.root.didUpdate();
      microtask.postRender(() => {
        if (!projection.currentAnimation && projection.isLead()) {
          this.safeToRemove();
        }
      });
    }
  }
  componentWillUnmount() {
    const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
    const { projection } = visualElement;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup && layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext && promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const { safeToRemove } = this.props;
    safeToRemove && safeToRemove();
  }
  render() {
    return null;
  }
}
function MeasureLayout(props) {
  const [isPresent2, safeToRemove] = usePresence();
  const layoutGroup = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: reactExports.useContext(SwitchLayoutGroupContext), isPresent: isPresent2, safeToRemove });
}
const defaultScaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};
const borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
const numBorders = borders.length;
const asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
const isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
  if (shouldCrossfadeOpacity) {
    target.opacity = mixNumber$1(
      0,
      // TODO Reinstate this if only child
      lead.opacity !== void 0 ? lead.opacity : 1,
      easeCrossfadeIn(progress2)
    );
    target.opacityExit = mixNumber$1(follow.opacity !== void 0 ? follow.opacity : 1, 0, easeCrossfadeOut(progress2));
  } else if (isOnlyMember) {
    target.opacity = mixNumber$1(follow.opacity !== void 0 ? follow.opacity : 1, lead.opacity !== void 0 ? lead.opacity : 1, progress2);
  }
  for (let i = 0; i < numBorders; i++) {
    const borderLabel = `border${borders[i]}Radius`;
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mixNumber$1(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mixNumber$1(follow.rotate || 0, lead.rotate || 0, progress2);
  }
}
function getRadius(values, radiusName) {
  return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
const easeCrossfadeIn = compress(0, 0.5, circOut);
const easeCrossfadeOut = compress(0.5, 0.95, noop);
function compress(min, max, easing) {
  return (p) => {
    if (p < min)
      return 0;
    if (p > max)
      return 1;
    return easing(progress(min, max, p));
  };
}
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mixNumber$1(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mixNumber$1(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
const xKeys = ["x", "scaleX", "originX"];
const yKeys = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
  removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function boxEquals(a, b) {
  return a.x.min === b.x.min && a.x.max === b.x.max && a.y.min === b.y.min && a.y.max === b.y.max;
}
function boxEqualsRounded(a, b) {
  return Math.round(a.x.min) === Math.round(b.x.min) && Math.round(a.x.max) === Math.round(b.x.max) && Math.round(a.y.min) === Math.round(b.y.min) && Math.round(a.y.max) === Math.round(b.y.max);
}
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}
class NodeStack {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  }
  remove(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node) {
    const indexOfNode = this.members.findIndex((member) => node === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i = indexOfNode; i >= 0; i--) {
      const member = this.members[i];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  }
  promote(node, preserveFollowOpacity) {
    const prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
      }
      if (node.root && node.root.isUpdating) {
        node.isLayoutDirty = true;
      }
      const { crossfade } = node.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node) => {
      const { options, resumingFrom } = node;
      options.onExitComplete && options.onExitComplete();
      if (resumingFrom) {
        resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
      }
    });
  }
  scheduleRender() {
    this.members.forEach((node) => {
      node.instance && node.scheduleRender(false);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
}
function buildProjectionTransform(delta, treeScale, latestTransform) {
  let transform = "";
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  const zTranslate = (latestTransform === null || latestTransform === void 0 ? void 0 : latestTransform.z) || 0;
  if (xTranslate || yTranslate || zTranslate) {
    transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
  }
  if (treeScale.x !== 1 || treeScale.y !== 1) {
    transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  }
  if (latestTransform) {
    const { transformPerspective, rotate, rotateX, rotateY, skewX, skewY } = latestTransform;
    if (transformPerspective)
      transform = `perspective(${transformPerspective}px) ${transform}`;
    if (rotate)
      transform += `rotate(${rotate}deg) `;
    if (rotateX)
      transform += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform += `rotateY(${rotateY}deg) `;
    if (skewX)
      transform += `skewX(${skewX}deg) `;
    if (skewY)
      transform += `skewY(${skewY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  if (elementScaleX !== 1 || elementScaleY !== 1) {
    transform += `scale(${elementScaleX}, ${elementScaleY})`;
  }
  return transform || "none";
}
const compareByDepth = (a, b) => a.depth - b.depth;
class FlatTree {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
}
function delay(callback, timeout) {
  const start = time.now();
  const checkElapsed = ({ timestamp }) => {
    const elapsed = timestamp - start;
    if (elapsed >= timeout) {
      cancelFrame(checkElapsed);
      callback(elapsed - timeout);
    }
  };
  frame.read(checkElapsed, true);
  return () => cancelFrame(checkElapsed);
}
function record(data) {
  if (window.MotionDebug) {
    window.MotionDebug.record(data);
  }
}
function isSVGElement(element) {
  return element instanceof SVGElement && element.tagName !== "svg";
}
function animateSingleValue(value, keyframes2, options) {
  const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  motionValue$1.start(animateMotionValue("", motionValue$1, keyframes2, options));
  return motionValue$1.animation;
}
const transformAxes = ["", "X", "Y", "Z"];
const hiddenVisibility = { visibility: "hidden" };
const animationTarget = 1e3;
let id = 0;
const projectionFrameData = {
  type: "projectionFrame",
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0
};
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
  const { latestValues } = visualElement;
  if (latestValues[key]) {
    values[key] = latestValues[key];
    visualElement.setStaticValue(key, 0);
    if (sharedAnimationValues) {
      sharedAnimationValues[key] = 0;
    }
  }
}
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return class ProjectionNode {
    constructor(latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
      this.id = id++;
      this.animationId = 0;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.isProjectionDirty = false;
      this.isSharedProjectionDirty = false;
      this.isTransformDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.hasTreeAnimated = false;
      this.updateScheduled = false;
      this.projectionUpdateScheduled = false;
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.projectionUpdateScheduled = false;
        projectionFrameData.totalNodes = projectionFrameData.resolvedTargetDeltas = projectionFrameData.recalculatedProjection = 0;
        this.nodes.forEach(propagateDirtyNodes);
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
        this.nodes.forEach(cleanDirtyNodes);
        record(projectionFrameData);
      };
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager && subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    /**
     * Lifecycles
     */
    mount(instance, isLayoutDirty = this.root.hasTreeAnimated) {
      if (this.instance)
        return;
      this.isSVG = isSVGElement(instance);
      this.instance = instance;
      const { layoutId, layout: layout2, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      this.parent && this.parent.children.add(this);
      if (isLayoutDirty && (layout2 || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
        attachResizeListener(instance, () => {
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout2)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const targetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout) || hasRelativeTargetChanged;
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
          if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            const animationOptions = {
              ...getValueTransition(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged) {
              finishAnimation(this);
            }
            if (this.isLead() && this.options.onExitComplete) {
              this.options.onExitComplete();
            }
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      const stack = this.getStack();
      stack && stack.remove(this);
      this.parent && this.parent.children.delete(this);
      this.instance = void 0;
      cancelFrame(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    // Note: currently only running on root node
    startUpdate() {
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      this.nodes && this.nodes.forEach(resetSkewAndRotation);
      this.animationId++;
    }
    getTransformTemplate() {
      const { visualElement } = this.options;
      return visualElement && visualElement.getProps().transformTemplate;
    }
    willUpdate(shouldNotifyListeners = true) {
      this.root.hasTreeAnimated = true;
      if (this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        node.shouldResetTransform = true;
        node.updateScroll("snapshot");
        if (node.options.layoutRoot) {
          node.willUpdate(false);
        }
      }
      const { layoutId, layout: layout2 } = this.options;
      if (layoutId === void 0 && !layout2)
        return;
      const transformTemplate = this.getTransformTemplate();
      this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    update() {
      this.updateScheduled = false;
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (!this.isUpdating) {
        this.nodes.forEach(clearIsLayoutDirty);
      }
      this.isUpdating = false;
      if (window.HandoffCancelAllAnimations) {
        window.HandoffCancelAllAnimations();
      }
      this.nodes.forEach(resetTransformStyle);
      this.nodes.forEach(updateLayout);
      this.nodes.forEach(notifyLayoutUpdate);
      this.clearAllSnapshots();
      const now2 = time.now();
      frameData.delta = clamp(0, 1e3 / 60, now2 - frameData.timestamp);
      frameData.timestamp = now2;
      frameData.isProcessing = true;
      steps.update.process(frameData);
      steps.preRender.process(frameData);
      steps.render.process(frameData);
      frameData.isProcessing = false;
    }
    didUpdate() {
      if (!this.updateScheduled) {
        this.updateScheduled = true;
        microtask.read(() => this.update());
      }
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      if (!this.projectionUpdateScheduled) {
        this.projectionUpdateScheduled = true;
        frame.preRender(this.updateProjection, false, true);
      }
    }
    scheduleCheckAfterUnmount() {
      frame.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
    }
    updateLayout() {
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          node.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement } = this.options;
      visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
    }
    updateScroll(phase = "measure") {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
        needsMeasurement = false;
      }
      if (needsMeasurement) {
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot: checkIsScrollRoot(this.instance),
          offset: measureScroll(this.instance)
        };
      }
    }
    resetTransform() {
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate = this.getTransformTemplate();
      const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox(layoutBox);
      return {
        animationId: this.root.animationId,
        measuredBox: pageBox,
        layoutBox,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox();
      const box = visualElement.measureViewportBox();
      const { scroll } = this.root;
      if (scroll) {
        translateAxis(box.x, scroll.offset.x);
        translateAxis(box.y, scroll.offset.y);
      }
      return box;
    }
    removeElementScroll(box) {
      const boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        const { scroll, options } = node;
        if (node !== this.root && scroll && options.layoutScroll) {
          if (scroll.isRoot) {
            copyBoxInto(boxWithoutScroll, box);
            const { scroll: rootScroll } = this.root;
            if (rootScroll) {
              translateAxis(boxWithoutScroll.x, -rootScroll.offset.x);
              translateAxis(boxWithoutScroll.y, -rootScroll.offset.y);
            }
          }
          translateAxis(boxWithoutScroll.x, scroll.offset.x);
          translateAxis(boxWithoutScroll.y, scroll.offset.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox(withTransforms, {
            x: -node.scroll.offset.x,
            y: -node.scroll.offset.y
          });
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    }
    removeTransform(box) {
      const boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        const sourceBox = createBox();
        const nodeBox = node.measurePageBox();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
      this.isProjectionDirty = true;
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    forceRelativeParentToResolveTarget() {
      if (!this.relativeParent)
        return;
      if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) {
        this.relativeParent.resolveTargetDelta(true);
      }
    }
    resolveTargetDelta(forceRecalculation = false) {
      var _a;
      const lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
      this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
      this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty) || this.attemptToResolveRelativeTarget);
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      if (!this.layout || !(layout2 || layoutId))
        return;
      this.resolvedRelativeTargetAt = frameData.timestamp;
      if (!this.targetDelta && !this.relativeTarget) {
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && relativeParent.layout && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
        this.forceRelativeParentToResolveTarget();
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.layoutBox);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      projectionFrameData.resolvedTargetDeltas++;
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) {
        return void 0;
      }
      if (this.parent.isProjecting()) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    isProjecting() {
      return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var _a;
      const lead = this.getLead();
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      let canSkip = true;
      if (this.isProjectionDirty || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty)) {
        canSkip = false;
      }
      if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
        canSkip = false;
      }
      if (this.resolvedRelativeTargetAt === frameData.timestamp) {
        canSkip = false;
      }
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout2 || layoutId))
        return;
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
      if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
        lead.target = lead.layout.layoutBox;
        lead.targetWithTransforms = createBox();
      }
      const { target } = lead;
      if (!target) {
        if (this.projectionTransform) {
          this.projectionDelta = createDelta();
          this.projectionTransform = "none";
          this.scheduleRender();
        }
        return;
      }
      if (!this.projectionDelta) {
        this.projectionDelta = createDelta();
        this.projectionDeltaWithTransform = createDelta();
      }
      const prevProjectionTransform = this.projectionTransform;
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
      if (this.projectionTransform !== prevProjectionTransform || this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
      projectionFrameData.recalculatedProjection++;
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll = true) {
      this.options.scheduleRender && this.options.scheduleRender();
      if (notifyAll) {
        const stack = this.getStack();
        stack && stack.scheduleRender();
      }
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      const snapshot = this.snapshot;
      const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta();
      if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
        this.relativeTarget = this.relativeTargetOrigin = void 0;
      }
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox();
      const snapshotSource = snapshot ? snapshot.source : void 0;
      const layoutSource = this.layout ? this.layout.source : void 0;
      const isSharedLayoutAnimation = snapshotSource !== layoutSource;
      const stack = this.getStack();
      const isOnlyMember = !stack || stack.members.length <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      let prevRelativeTarget;
      this.mixTargetDelta = (latest) => {
        const progress2 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress2);
        mixAxisDelta(targetDelta.y, delta.y, progress2);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
          calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
          if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
            this.isProjectionDirty = false;
          }
          if (!prevRelativeTarget)
            prevRelativeTarget = createBox();
          copyBoxInto(prevRelativeTarget, this.relativeTarget);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress2;
      };
      this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(options) {
      this.notifyListeners("animationStart");
      this.currentAnimation && this.currentAnimation.stop();
      if (this.resumingFrom && this.resumingFrom.currentAnimation) {
        this.resumingFrom.currentAnimation.stop();
      }
      if (this.pendingAnimation) {
        cancelFrame(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = frame.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        this.currentAnimation = animateSingleValue(0, animationTarget, {
          ...options,
          onUpdate: (latest) => {
            this.mixTargetDelta(latest);
            options.onUpdate && options.onUpdate(latest);
          },
          onComplete: () => {
            options.onComplete && options.onComplete();
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      const stack = this.getStack();
      stack && stack.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      if (this.currentAnimation) {
        this.mixTargetDelta && this.mixTargetDelta(animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout: layout2, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout2)
        return;
      if (this !== lead && this.layout && layout2 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout2.layoutBox)) {
        target = this.target || createBox();
        const xLength = calcLength(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      const config = node.options.initialPromotionConfig;
      node.promote({
        transition: config ? config.transition : void 0,
        preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this : this;
    }
    getPrevLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetSkewAndRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasDistortingTransform = false;
      const { latestValues } = visualElement;
      if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
        hasDistortingTransform = true;
      }
      if (!hasDistortingTransform)
        return;
      const resetValues = {};
      if (latestValues.z) {
        resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
      }
      for (let i = 0; i < transformAxes.length; i++) {
        resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
        resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
      }
      visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
        if (this.animationValues) {
          this.animationValues[key] = resetValues[key];
        }
      }
      visualElement.scheduleRender();
    }
    getProjectionStyles(styleProp) {
      var _a, _b;
      if (!this.instance || this.isSVG)
        return void 0;
      if (!this.isVisible) {
        return hiddenVisibility;
      }
      const styles = {
        visibility: ""
      };
      const transformTemplate = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
        styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return styles;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        const emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        styles.transform = transformTemplate(valuesToRender, styles.transform);
      }
      const { x, y } = this.projectionDelta;
      styles.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
      if (lead.animationValues) {
        styles.opacity = lead === this ? (_b = (_a = valuesToRender.opacity) !== null && _a !== void 0 ? _a : this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo } = scaleCorrectors[key];
        const corrected = styles.transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i = 0; i < num; i++) {
            styles[applyTo[i]] = corrected;
          }
        } else {
          styles[key] = corrected;
        }
      }
      if (this.options.layoutId) {
        styles.pointerEvents = lead === this ? resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "" : "none";
      }
      return styles;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((node) => {
        var _a;
        return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  };
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  var _a;
  const snapshot = ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { layoutBox: layout2, measuredBox: measuredLayout } = node.layout;
    const { animationType } = node.options;
    const isShared = snapshot.source !== node.layout.source;
    if (animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(axisSnapshot);
        axisSnapshot.min = layout2[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout2)) {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(layout2[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
        if (node.relativeTarget && !node.currentAnimation) {
          node.isProjectionDirty = true;
          node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
        }
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout2, snapshot.layoutBox);
    const visualDelta = createDelta();
    if (isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta(visualDelta, layout2, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeTargetChanged = false;
    if (!node.resumeFrom) {
      const relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          const relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout2, parentLayout.layoutBox);
          if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) {
            hasRelativeTargetChanged = true;
          }
          if (relativeParent.options.layoutRoot) {
            node.relativeTarget = relativeLayout;
            node.relativeTargetOrigin = relativeSnapshot;
            node.relativeParent = relativeParent;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout: layout2,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeTargetChanged
    });
  } else if (node.isLead()) {
    const { onExitComplete } = node.options;
    onExitComplete && onExitComplete();
  }
  node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
  projectionFrameData.totalNodes++;
  if (!node.parent)
    return;
  if (!node.isProjecting()) {
    node.isProjectionDirty = node.parent.isProjectionDirty;
  }
  node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
  node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
  node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function clearIsLayoutDirty(node) {
  node.isLayoutDirty = false;
}
function resetTransformStyle(node) {
  const { visualElement } = node.options;
  if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
  node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetSkewAndRotation(node) {
  node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
  output.translate = mixNumber$1(delta.translate, 0, p);
  output.scale = mixNumber$1(delta.scale, 1, p);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
  output.min = mixNumber$1(from.min, to.min, p);
  output.max = mixNumber$1(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
  mixAxis(output.x, from.x, to.x, p);
  mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
const defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
const userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
const roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(axis) {
  axis.min = roundPoint(axis.min);
  axis.max = roundPoint(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout2) {
  return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout2), 0.2);
}
const DocumentProjectionNode = createProjectionNode({
  attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});
const rootProjectionNode = {
  current: void 0
};
const HTMLProjectionNode = createProjectionNode({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode({});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});
const drag = {
  pan: {
    Feature: PanGesture
  },
  drag: {
    Feature: DragGesture,
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};
const prefersReducedMotion = { current: null };
const hasReducedMotionListener = { current: false };
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}
function updateMotionValuesFromProps(element, next, prev) {
  const { willChange } = next;
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
      if (isWillChangeMotionValue(willChange)) {
        willChange.add(key);
      }
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue, { owner: element }));
      if (isWillChangeMotionValue(willChange)) {
        willChange.remove(key);
      }
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        if (existingValue.liveStyle === true) {
          existingValue.jump(nextValue);
        } else if (!existingValue.hasAnimated) {
          existingValue.set(nextValue);
        }
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}
const visualElementStore = /* @__PURE__ */ new WeakMap();
const valueTypes = [...dimensionValueTypes, color, complex];
const findValueType = (v) => valueTypes.find(testValueType(v));
const featureNames = Object.keys(featureDefinitions);
const numFeatures = featureNames.length;
const propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
const numVariantProps = variantProps.length;
function getClosestProjectingNode(visualElement) {
  if (!visualElement)
    return void 0;
  return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}
class VisualElement {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
    return {};
  }
  constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, options = {}) {
    this.resolveKeyframes = (keyframes2, onComplete, name, value) => {
      return new this.KeyframeResolver(keyframes2, onComplete, name, value, this);
    };
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.values = /* @__PURE__ */ new Map();
    this.KeyframeResolver = KeyframeResolver;
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.scheduleRender = () => frame.render(this.render, false, true);
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.blockInitialAnimation = Boolean(blockInitialAnimation);
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
        if (isWillChangeMotionValue(willChange)) {
          willChange.add(key);
        }
      }
    }
  }
  mount(instance) {
    this.current = instance;
    visualElementStore.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (!hasReducedMotionListener.current) {
      initPrefersReducedMotion();
    }
    this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
    if (this.parent)
      this.parent.children.add(this);
    this.update(this.props, this.presenceContext);
  }
  unmount() {
    var _a;
    visualElementStore.delete(this.current);
    this.projection && this.projection.unmount();
    cancelFrame(this.notifyUpdate);
    cancelFrame(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent && this.parent.children.delete(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      (_a = this.features[key]) === null || _a === void 0 ? void 0 : _a.unmount();
    }
    this.current = null;
  }
  bindToMotionValue(key, value) {
    const valueIsTransform = transformProps.has(key);
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && frame.preRender(this.notifyUpdate);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
    });
    const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
      if (value.owner)
        value.stop();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  loadFeatures({ children, ...renderedProps }, isStrict, preloadedFeatures2, initialLayoutGroupConfig) {
    let ProjectionNodeConstructor;
    let MeasureLayout2;
    for (let i = 0; i < numFeatures; i++) {
      const name = featureNames[i];
      const { isEnabled, Feature: FeatureConstructor, ProjectionNode, MeasureLayout: MeasureLayoutComponent } = featureDefinitions[name];
      if (ProjectionNode)
        ProjectionNodeConstructor = ProjectionNode;
      if (isEnabled(renderedProps)) {
        if (!this.features[name] && FeatureConstructor) {
          this.features[name] = new FeatureConstructor(this);
        }
        if (MeasureLayoutComponent) {
          MeasureLayout2 = MeasureLayoutComponent;
        }
      }
    }
    if ((this.type === "html" || this.type === "svg") && !this.projection && ProjectionNodeConstructor) {
      this.projection = new ProjectionNodeConstructor(this.latestValues, getClosestProjectingNode(this.parent));
      const { layoutId, layout: layout2, drag: drag2, dragConstraints, layoutScroll, layoutRoot } = renderedProps;
      this.projection.setOptions({
        layoutId,
        layout: layout2,
        alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */
        animationType: typeof layout2 === "string" ? layout2 : "both",
        initialPromotionConfig: initialLayoutGroupConfig,
        layoutScroll,
        layoutRoot
      });
    }
    return MeasureLayout2;
  }
  updateFeatures() {
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature.isMounted) {
        feature.update();
      } else {
        feature.mount();
        feature.isMounted = true;
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listenerName = "on" + key;
      const listener = props[listenerName];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  getVariantContext(startAtParent = false) {
    if (startAtParent) {
      return this.parent ? this.parent.getVariantContext() : void 0;
    }
    if (!this.isControllingVariants) {
      const context2 = this.parent ? this.parent.getVariantContext() || {} : {};
      if (this.props.initial !== void 0) {
        context2.initial = this.props.initial;
      }
      return context2;
    }
    const context = {};
    for (let i = 0; i < numVariantProps; i++) {
      const name = variantProps[i];
      const prop = this.props[name];
      if (isVariantLabel(prop) || prop === false) {
        context[name] = prop;
      }
    }
    return context;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    const existingValue = this.values.get(key);
    if (value !== existingValue) {
      if (existingValue)
        this.removeValue(key);
      this.bindToMotionValue(key, value);
      this.values.set(key, value);
      this.latestValues[key] = value.get();
    }
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key, target) {
    var _a;
    let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : (_a = this.getBaseTargetFromProps(this.props, key)) !== null && _a !== void 0 ? _a : this.readValueFromInstance(this.current, key, this.options);
    if (value !== void 0 && value !== null) {
      if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
        value = parseFloat(value);
      } else if (!findValueType(value) && complex.test(target)) {
        value = getAnimatableNone(key, target);
      }
      this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
    }
    return isMotionValue(value) ? value.get() : value;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    var _a;
    const { initial } = this.props;
    let valueFromInitial;
    if (typeof initial === "string" || typeof initial === "object") {
      const variant = resolveVariantFromProps(this.props, initial, (_a = this.presenceContext) === null || _a === void 0 ? void 0 : _a.custom);
      if (variant) {
        valueFromInitial = variant[key];
      }
    }
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
}
class DOMVisualElement extends VisualElement {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = DOMKeyframesResolver;
  }
  sortInstanceNodePosition(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
}
function getComputedStyle(element) {
  return window.getComputedStyle(element);
}
class HTMLVisualElement extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      const computedStyle = getComputedStyle(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, options, props) {
    buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current)
          this.current.textContent = `${latest}`;
      });
    }
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderHTML(instance, renderState, styleProp, projection);
  }
}
class SVGVisualElement extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement);
  }
  build(renderState, latestValues, options, props) {
    buildSVGAttrs(renderState, latestValues, options, this.isSVGTag, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag(instance.tagName);
    super.mount(instance);
  }
}
const createDomVisualElement = (Component, options) => {
  return isSVGComponent(Component) ? new SVGVisualElement(options, { enableHardwareAcceleration: false }) : new HTMLVisualElement(options, {
    allowProjection: Component !== reactExports.Fragment,
    enableHardwareAcceleration: true
  });
};
const layout = {
  layout: {
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};
const preloadedFeatures = {
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layout
};
const motion = /* @__PURE__ */ createMotionProxy((Component, config) => createDomMotionConfig(Component, config, preloadedFeatures, createDomVisualElement));
function useIsMounted() {
  const isMounted = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
function useForceUpdate() {
  const isMounted = useIsMounted();
  const [forcedRenderCount, setForcedRenderCount] = reactExports.useState(0);
  const forceRender = reactExports.useCallback(() => {
    isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
  const deferredForceRender = reactExports.useCallback(() => frame.postRender(forceRender), [forceRender]);
  return [deferredForceRender, forcedRenderCount];
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (element && prevProps.isPresent && !this.props.isPresent) {
      const size = this.props.sizeRef.current;
      size.height = element.offsetHeight || 0;
      size.width = element.offsetWidth || 0;
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent: isPresent2 }) {
  const id2 = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left } = size.current;
    if (isPresent2 || !ref.current || !width || !height)
      return;
    ref.current.dataset.motionPopId = id2;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    document.head.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id2}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            top: ${top}px !important;
            left: ${left}px !important;
          }
        `);
    }
    return () => {
      document.head.removeChild(style);
    };
  }, [isPresent2]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent: isPresent2, childRef: ref, sizeRef: size, children: reactExports.cloneElement(children, { ref }) });
}
const PresenceChild = ({ children, initial, isPresent: isPresent2, onExitComplete, custom, presenceAffectsLayout, mode }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id2 = reactExports.useId();
  const context = reactExports.useMemo(
    () => ({
      id: id2,
      initial,
      isPresent: isPresent2,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    presenceAffectsLayout ? [Math.random()] : [isPresent2]
  );
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent2]);
  reactExports.useEffect(() => {
    !isPresent2 && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent2]);
  if (mode === "popLayout") {
    children = jsxRuntimeExports.jsx(PopChild, { isPresent: isPresent2, children });
  }
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
function useUnmountEffect(callback) {
  return reactExports.useEffect(() => () => callback(), []);
}
const getChildKey = (child) => child.key || "";
function updateChildLookup(children, allChildren) {
  children.forEach((child) => {
    const key = getChildKey(child);
    allChildren.set(key, child);
  });
}
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, exitBeforeEnter, presenceAffectsLayout = true, mode = "sync" }) => {
  const forceRender = reactExports.useContext(LayoutGroupContext).forceRender || useForceUpdate()[0];
  const isMounted = useIsMounted();
  const filteredChildren = onlyElements(children);
  let childrenToRender = filteredChildren;
  const exitingChildren = reactExports.useRef(/* @__PURE__ */ new Map()).current;
  const presentChildren = reactExports.useRef(childrenToRender);
  const allChildren = reactExports.useRef(/* @__PURE__ */ new Map()).current;
  const isInitialRender = reactExports.useRef(true);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    updateChildLookup(filteredChildren, allChildren);
    presentChildren.current = childrenToRender;
  });
  useUnmountEffect(() => {
    isInitialRender.current = true;
    allChildren.clear();
    exitingChildren.clear();
  });
  if (isInitialRender.current) {
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: childrenToRender.map((child) => jsxRuntimeExports.jsx(PresenceChild, { isPresent: true, initial: initial ? void 0 : false, presenceAffectsLayout, mode, children: child }, getChildKey(child))) });
  }
  childrenToRender = [...childrenToRender];
  const presentKeys = presentChildren.current.map(getChildKey);
  const targetKeys = filteredChildren.map(getChildKey);
  const numPresent = presentKeys.length;
  for (let i = 0; i < numPresent; i++) {
    const key = presentKeys[i];
    if (targetKeys.indexOf(key) === -1 && !exitingChildren.has(key)) {
      exitingChildren.set(key, void 0);
    }
  }
  if (mode === "wait" && exitingChildren.size) {
    childrenToRender = [];
  }
  exitingChildren.forEach((component, key) => {
    if (targetKeys.indexOf(key) !== -1)
      return;
    const child = allChildren.get(key);
    if (!child)
      return;
    const insertionIndex = presentKeys.indexOf(key);
    let exitingComponent = component;
    if (!exitingComponent) {
      const onExit = () => {
        exitingChildren.delete(key);
        const leftOverKeys = Array.from(allChildren.keys()).filter((childKey) => !targetKeys.includes(childKey));
        leftOverKeys.forEach((leftOverKey) => allChildren.delete(leftOverKey));
        presentChildren.current = filteredChildren.filter((presentChild) => {
          const presentChildKey = getChildKey(presentChild);
          return (
            // filter out the node exiting
            presentChildKey === key || // filter out the leftover children
            leftOverKeys.includes(presentChildKey)
          );
        });
        if (!exitingChildren.size) {
          if (isMounted.current === false)
            return;
          forceRender();
          onExitComplete && onExitComplete();
        }
      };
      exitingComponent = jsxRuntimeExports.jsx(PresenceChild, { isPresent: false, onExitComplete: onExit, custom, presenceAffectsLayout, mode, children: child }, getChildKey(child));
      exitingChildren.set(key, exitingComponent);
    }
    childrenToRender.splice(insertionIndex, 0, exitingComponent);
  });
  childrenToRender = childrenToRender.map((child) => {
    const key = child.key;
    return exitingChildren.has(key) ? child : jsxRuntimeExports.jsx(PresenceChild, { isPresent: true, presenceAffectsLayout, mode, children: child }, getChildKey(child));
  });
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: exitingChildren.size ? childrenToRender : childrenToRender.map((child) => reactExports.cloneElement(child)) });
};
var toastMotionVariants = {
  initial: (props) => {
    const { position } = props;
    const dir = ["top", "bottom"].includes(position) ? "y" : "x";
    let factor = ["top-right", "bottom-right"].includes(position) ? 1 : -1;
    if (position === "bottom")
      factor = 1;
    return {
      opacity: 0,
      [dir]: factor * 24
    };
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
};
var ToastComponent = reactExports.memo((props) => {
  const {
    id: id2,
    message,
    onCloseComplete,
    onRequestRemove,
    requestClose = false,
    position = "bottom",
    duration = 5e3,
    containerStyle,
    motionVariants = toastMotionVariants,
    toastSpacing = "0.5rem"
  } = props;
  const [delay2, setDelay] = reactExports.useState(duration);
  const isPresent2 = useIsPresent();
  useUpdateEffect(() => {
    if (!isPresent2) {
      onCloseComplete == null ? void 0 : onCloseComplete();
    }
  }, [isPresent2]);
  useUpdateEffect(() => {
    setDelay(duration);
  }, [duration]);
  const onMouseEnter = () => setDelay(null);
  const onMouseLeave = () => setDelay(duration);
  const close = () => {
    if (isPresent2)
      onRequestRemove();
  };
  reactExports.useEffect(() => {
    if (isPresent2 && requestClose) {
      onRequestRemove();
    }
  }, [isPresent2, requestClose, onRequestRemove]);
  useTimeout(close, delay2);
  const containerStyles = reactExports.useMemo(
    () => ({
      pointerEvents: "auto",
      maxWidth: 560,
      minWidth: 300,
      margin: toastSpacing,
      ...containerStyle
    }),
    [containerStyle, toastSpacing]
  );
  const toastStyle = reactExports.useMemo(() => getToastStyle(position), [position]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      layout: true,
      className: "chakra-toast",
      variants: motionVariants,
      initial: "initial",
      animate: "animate",
      exit: "exit",
      onHoverStart: onMouseEnter,
      onHoverEnd: onMouseLeave,
      custom: { position },
      style: toastStyle,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        chakra.div,
        {
          role: "status",
          "aria-atomic": "true",
          className: "chakra-toast__inner",
          __css: containerStyles,
          children: runIfFn(message, { id: id2, onClose: close })
        }
      )
    }
  );
});
ToastComponent.displayName = "ToastComponent";
var fallbackIcon = {
  path: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { stroke: "currentColor", strokeWidth: "1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        strokeLinecap: "round",
        fill: "none",
        d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "currentColor",
        strokeLinecap: "round",
        d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { fill: "none", strokeMiterlimit: "10", cx: "12", cy: "12", r: "11.25" })
  ] }),
  viewBox: "0 0 24 24"
};
var Icon = forwardRef((props, ref) => {
  const {
    as: element,
    viewBox,
    color: color2 = "currentColor",
    focusable = false,
    children,
    className,
    __css,
    ...rest
  } = props;
  const _className = cx("chakra-icon", className);
  const customStyles = useStyleConfig("Icon", props);
  const styles = {
    w: "1em",
    h: "1em",
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: 0,
    color: color2,
    ...__css,
    ...customStyles
  };
  const shared = {
    ref,
    focusable,
    className: _className,
    __css: styles
  };
  const _viewBox = viewBox != null ? viewBox : fallbackIcon.viewBox;
  if (element && typeof element !== "string") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(chakra.svg, { as: element, ...shared, ...rest });
  }
  const _path = children != null ? children : fallbackIcon.path;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(chakra.svg, { verticalAlign: "middle", viewBox: _viewBox, ...shared, ...rest, children: _path });
});
Icon.displayName = "Icon";
function CheckIcon$1(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
    }
  ) });
}
function InfoIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
    }
  ) });
}
function WarningIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
    }
  ) });
}
var [AlertProvider, useAlertContext] = createContext({
  name: "AlertContext",
  hookName: "useAlertContext",
  providerName: "<Alert />"
});
var [AlertStylesProvider, useAlertStyles] = createContext({
  name: `AlertStylesContext`,
  hookName: `useAlertStyles`,
  providerName: "<Alert />"
});
var STATUSES = {
  info: { icon: InfoIcon, colorScheme: "blue" },
  warning: { icon: WarningIcon, colorScheme: "orange" },
  success: { icon: CheckIcon$1, colorScheme: "green" },
  error: { icon: WarningIcon, colorScheme: "red" },
  loading: { icon: Spinner, colorScheme: "blue" }
};
function getStatusColorScheme(status) {
  return STATUSES[status].colorScheme;
}
function getStatusIcon(status) {
  return STATUSES[status].icon;
}
var AlertDescription = forwardRef(
  function AlertDescription2(props, ref) {
    const styles = useAlertStyles();
    const { status } = useAlertContext();
    const descriptionStyles = {
      display: "inline",
      ...styles.description
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.div,
      {
        ref,
        "data-status": status,
        ...props,
        className: cx("chakra-alert__desc", props.className),
        __css: descriptionStyles
      }
    );
  }
);
AlertDescription.displayName = "AlertDescription";
function AlertIcon(props) {
  const { status } = useAlertContext();
  const BaseIcon = getStatusIcon(status);
  const styles = useAlertStyles();
  const css = status === "loading" ? styles.spinner : styles.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.span,
    {
      display: "inherit",
      "data-status": status,
      ...props,
      className: cx("chakra-alert__icon", props.className),
      __css: css,
      children: props.children || /* @__PURE__ */ jsxRuntimeExports.jsx(BaseIcon, { h: "100%", w: "100%" })
    }
  );
}
AlertIcon.displayName = "AlertIcon";
var AlertTitle = forwardRef(
  function AlertTitle2(props, ref) {
    const styles = useAlertStyles();
    const { status } = useAlertContext();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.div,
      {
        ref,
        "data-status": status,
        ...props,
        className: cx("chakra-alert__title", props.className),
        __css: styles.title
      }
    );
  }
);
AlertTitle.displayName = "AlertTitle";
var Alert = forwardRef(function Alert2(props, ref) {
  var _a;
  const { status = "info", addRole = true, ...rest } = omitThemingProps(props);
  const colorScheme = (_a = props.colorScheme) != null ? _a : getStatusColorScheme(status);
  const styles = useMultiStyleConfig("Alert", { ...props, colorScheme });
  const alertStyles = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    ...styles.container
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertProvider, { value: { status }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertStylesProvider, { value: styles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.div,
    {
      "data-status": status,
      role: addRole ? "alert" : void 0,
      ref,
      ...rest,
      className: cx("chakra-alert", props.className),
      __css: alertStyles
    }
  ) }) });
});
Alert.displayName = "Alert";
function CloseIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { focusable: "false", "aria-hidden": true, ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
    }
  ) });
}
var CloseButton = forwardRef(
  function CloseButton2(props, ref) {
    const styles = useStyleConfig("CloseButton", props);
    const { children, isDisabled, __css, ...rest } = omitThemingProps(props);
    const baseStyle = {
      outline: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.button,
      {
        type: "button",
        "aria-label": "Close",
        ref,
        disabled: isDisabled,
        __css: {
          ...baseStyle,
          ...styles,
          ...__css
        },
        ...rest,
        children: children || /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, { width: "1em", height: "1em" })
      }
    );
  }
);
CloseButton.displayName = "CloseButton";
var initialState = {
  top: [],
  "top-left": [],
  "top-right": [],
  "bottom-left": [],
  bottom: [],
  "bottom-right": []
};
var toastStore = createStore(initialState);
function createStore(initialState2) {
  let state = initialState2;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (setStateFn) => {
    state = setStateFn(state);
    listeners.forEach((l) => l());
  };
  return {
    getState: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        setState(() => initialState2);
        listeners.delete(listener);
      };
    },
    /**
     * Delete a toast record at its position
     */
    removeToast: (id2, position) => {
      setState((prevState) => ({
        ...prevState,
        // id may be string or number
        // eslint-disable-next-line eqeqeq
        [position]: prevState[position].filter((toast) => toast.id != id2)
      }));
    },
    notify: (message, options) => {
      const toast = createToast(message, options);
      const { position, id: id2 } = toast;
      setState((prevToasts) => {
        var _a, _b;
        const isTop = position.includes("top");
        const toasts = isTop ? [toast, ...(_a = prevToasts[position]) != null ? _a : []] : [...(_b = prevToasts[position]) != null ? _b : [], toast];
        return {
          ...prevToasts,
          [position]: toasts
        };
      });
      return id2;
    },
    update: (id2, options) => {
      if (!id2)
        return;
      setState((prevState) => {
        const nextState = { ...prevState };
        const { position, index } = findToast(nextState, id2);
        if (position && index !== -1) {
          nextState[position][index] = {
            ...nextState[position][index],
            ...options,
            message: createRenderToast(options)
          };
        }
        return nextState;
      });
    },
    closeAll: ({ positions } = {}) => {
      setState((prev) => {
        const allPositions = [
          "bottom",
          "bottom-right",
          "bottom-left",
          "top",
          "top-left",
          "top-right"
        ];
        const positionsToClose = positions != null ? positions : allPositions;
        return positionsToClose.reduce(
          (acc, position) => {
            acc[position] = prev[position].map((toast) => ({
              ...toast,
              requestClose: true
            }));
            return acc;
          },
          { ...prev }
        );
      });
    },
    close: (id2) => {
      setState((prevState) => {
        const position = getToastPosition(prevState, id2);
        if (!position)
          return prevState;
        return {
          ...prevState,
          [position]: prevState[position].map((toast) => {
            if (toast.id == id2) {
              return {
                ...toast,
                requestClose: true
              };
            }
            return toast;
          })
        };
      });
    },
    isActive: (id2) => Boolean(findToast(toastStore.getState(), id2).position)
  };
}
var counter = 0;
function createToast(message, options = {}) {
  var _a, _b;
  counter += 1;
  const id2 = (_a = options.id) != null ? _a : counter;
  const position = (_b = options.position) != null ? _b : "bottom";
  return {
    id: id2,
    message,
    position,
    duration: options.duration,
    onCloseComplete: options.onCloseComplete,
    onRequestRemove: () => toastStore.removeToast(String(id2), position),
    status: options.status,
    requestClose: false,
    containerStyle: options.containerStyle
  };
}
var Toast = (props) => {
  const {
    status,
    variant = "solid",
    id: id2,
    title,
    isClosable,
    onClose,
    description,
    colorScheme,
    icon
  } = props;
  const ids = id2 ? {
    root: `toast-${id2}`,
    title: `toast-${id2}-title`,
    description: `toast-${id2}-description`
  } : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Alert,
    {
      addRole: false,
      status,
      variant,
      id: ids == null ? void 0 : ids.root,
      alignItems: "start",
      borderRadius: "md",
      boxShadow: "lg",
      paddingEnd: 8,
      textAlign: "start",
      width: "auto",
      colorScheme,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertIcon, { children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(chakra.div, { flex: "1", maxWidth: "100%", children: [
          title && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { id: ids == null ? void 0 : ids.title, children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { id: ids == null ? void 0 : ids.description, display: "block", children: description })
        ] }),
        isClosable && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CloseButton,
          {
            size: "sm",
            onClick: onClose,
            position: "absolute",
            insetEnd: 1,
            top: 1
          }
        )
      ]
    }
  );
};
function createRenderToast(options = {}) {
  const { render, toastComponent: ToastComponent2 = Toast } = options;
  const renderToast = (props) => {
    if (typeof render === "function") {
      return render({ ...props, ...options });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ToastComponent2, { ...props, ...options });
  };
  return renderToast;
}
var [ToastOptionProvider, useToastOptionContext] = createContext({
  name: `ToastOptionsContext`,
  strict: false
});
var ToastProvider = (props) => {
  const state = reactExports.useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getState,
    toastStore.getState
  );
  const {
    motionVariants,
    component: Component = ToastComponent,
    portalProps
  } = props;
  const stateKeys = Object.keys(state);
  const toastList = stateKeys.map((position) => {
    const toasts = state[position];
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "region",
        "aria-live": "polite",
        "aria-label": `Notifications-${position}`,
        id: `chakra-toast-manager-${position}`,
        style: getToastListStyle(position),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: toasts.map((toast) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Component,
          {
            motionVariants,
            ...toast
          },
          toast.id
        )) })
      },
      position
    );
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...portalProps, children: toastList });
};
var createChakraProvider = (providerTheme) => {
  return function ChakraProvider2({
    children,
    theme: theme2 = providerTheme,
    toastOptions,
    ...restProps
  }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(ChakraProvider$1, { theme: theme2, ...restProps, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToastOptionProvider, { value: toastOptions == null ? void 0 : toastOptions.defaultOptions, children }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToastProvider, { ...toastOptions })
    ] });
  };
};
var ChakraProvider = createChakraProvider(theme);
function useControllableState(props) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    shouldUpdate = (prev, next) => prev !== next
  } = props;
  const onChangeProp = useCallbackRef(onChange);
  const shouldUpdateProp = useCallbackRef(shouldUpdate);
  const [uncontrolledState, setUncontrolledState] = reactExports.useState(defaultValue);
  const controlled = valueProp !== void 0;
  const value = controlled ? valueProp : uncontrolledState;
  const setValue = useCallbackRef(
    (next) => {
      const setter = next;
      const nextValue = typeof next === "function" ? setter(value) : next;
      if (!shouldUpdateProp(value, nextValue)) {
        return;
      }
      if (!controlled) {
        setUncontrolledState(nextValue);
      }
      onChangeProp(nextValue);
    },
    [controlled, onChangeProp, value, shouldUpdateProp]
  );
  return [value, setValue];
}
function getValidChildren(children) {
  return reactExports.Children.toArray(children).filter(
    (child) => reactExports.isValidElement(child)
  );
}
var [CheckboxGroupProvider, useCheckboxGroupContext] = createContext({
  name: "CheckboxGroupContext",
  strict: false
});
function isInputEvent(value) {
  return value && isObject(value) && isObject(value.target);
}
function useCheckboxGroup(props = {}) {
  const {
    defaultValue,
    value: valueProp,
    onChange,
    isDisabled,
    isNative
  } = props;
  const onChangeProp = useCallbackRef(onChange);
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue || [],
    onChange: onChangeProp
  });
  const handleChange = reactExports.useCallback(
    (eventOrValue) => {
      if (!value)
        return;
      const isChecked = isInputEvent(eventOrValue) ? eventOrValue.target.checked : !value.includes(eventOrValue);
      const selectedValue = isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue;
      const nextValue = isChecked ? [...value, selectedValue] : value.filter((v) => String(v) !== String(selectedValue));
      setValue(nextValue);
    },
    [setValue, value]
  );
  const getCheckboxProps = reactExports.useCallback(
    (props2 = {}) => {
      const checkedKey = isNative ? "checked" : "isChecked";
      return {
        ...props2,
        [checkedKey]: value.some((val) => String(props2.value) === String(val)),
        onChange: handleChange
      };
    },
    [handleChange, isNative, value]
  );
  return {
    value,
    isDisabled,
    onChange: handleChange,
    setValue,
    getCheckboxProps
  };
}
function CheckboxGroup(props) {
  const { colorScheme, size, variant, children, isDisabled } = props;
  const { value, onChange } = useCheckboxGroup(props);
  const group = reactExports.useMemo(
    () => ({
      size,
      onChange,
      colorScheme,
      value,
      variant,
      isDisabled
    }),
    [size, onChange, colorScheme, value, variant, isDisabled]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupProvider, { value: group, children });
}
CheckboxGroup.displayName = "CheckboxGroup";
function useInitialAnimationState(isChecked) {
  const [previousIsChecked, setPreviousIsChecked] = reactExports.useState(isChecked);
  const [shouldAnimate, setShouldAnimate] = reactExports.useState(false);
  if (isChecked !== previousIsChecked) {
    setShouldAnimate(true);
    setPreviousIsChecked(isChecked);
  }
  return shouldAnimate;
}
function CheckIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.svg,
    {
      width: "1.2em",
      viewBox: "0 0 12 10",
      style: {
        fill: "none",
        strokeWidth: 2,
        stroke: "currentColor",
        strokeDasharray: 16
      },
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "1.5 6 4.5 9 10.5 1" })
    }
  );
}
function IndeterminateIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.svg,
    {
      width: "1.2em",
      viewBox: "0 0 24 24",
      style: { stroke: "currentColor", strokeWidth: 4 },
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "21", x2: "3", y1: "12", y2: "12" })
    }
  );
}
function CheckboxIcon(props) {
  const { isIndeterminate, isChecked, ...rest } = props;
  const BaseIcon = isIndeterminate ? IndeterminateIcon : CheckIcon;
  return isChecked || isIndeterminate ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.div,
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(BaseIcon, { ...rest })
    }
  ) : null;
}
var [FormControlStylesProvider, useFormControlStyles] = createContext({
  name: `FormControlStylesContext`,
  errorMessage: `useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormControl />" `
});
var [FormControlProvider, useFormControlContext] = createContext({
  strict: false,
  name: "FormControlContext"
});
function useFormControlProvider(props) {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    ...htmlProps
  } = props;
  const uuid = reactExports.useId();
  const id2 = idProp || `field-${uuid}`;
  const labelId = `${id2}-label`;
  const feedbackId = `${id2}-feedback`;
  const helpTextId = `${id2}-helptext`;
  const [hasFeedbackText, setHasFeedbackText] = reactExports.useState(false);
  const [hasHelpText, setHasHelpText] = reactExports.useState(false);
  const [isFocused, setFocus] = reactExports.useState(false);
  const getHelpTextProps = reactExports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      id: helpTextId,
      ...props2,
      /**
       * Notify the field context when the help text is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node)
          return;
        setHasHelpText(true);
      })
    }),
    [helpTextId]
  );
  const getLabelProps = reactExports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      ...props2,
      ref: forwardedRef,
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      id: props2.id !== void 0 ? props2.id : labelId,
      htmlFor: props2.htmlFor !== void 0 ? props2.htmlFor : id2
    }),
    [id2, isDisabled, isFocused, isInvalid, isReadOnly, labelId]
  );
  const getErrorMessageProps = reactExports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      id: feedbackId,
      ...props2,
      /**
       * Notify the field context when the error message is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node)
          return;
        setHasFeedbackText(true);
      }),
      "aria-live": "polite"
    }),
    [feedbackId]
  );
  const getRootProps = reactExports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      ...props2,
      ...htmlProps,
      ref: forwardedRef,
      role: "group",
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly)
    }),
    [htmlProps, isDisabled, isFocused, isInvalid, isReadOnly]
  );
  const getRequiredIndicatorProps = reactExports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      ...props2,
      ref: forwardedRef,
      role: "presentation",
      "aria-hidden": true,
      children: props2.children || "*"
    }),
    []
  );
  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    id: id2,
    labelId,
    feedbackId,
    helpTextId,
    htmlProps,
    getHelpTextProps,
    getErrorMessageProps,
    getRootProps,
    getLabelProps,
    getRequiredIndicatorProps
  };
}
var FormControl = forwardRef(
  function FormControl2(props, ref) {
    const styles = useMultiStyleConfig("Form", props);
    const ownProps = omitThemingProps(props);
    const {
      getRootProps,
      htmlProps: _,
      ...context
    } = useFormControlProvider(ownProps);
    const className = cx("chakra-form-control", props.className);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FormControlProvider, { value: context, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormControlStylesProvider, { value: styles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.div,
      {
        ...getRootProps({}, ref),
        className,
        __css: styles["container"]
      }
    ) }) });
  }
);
FormControl.displayName = "FormControl";
var FormHelperText = forwardRef(
  function FormHelperText2(props, ref) {
    const field = useFormControlContext();
    const styles = useFormControlStyles();
    const className = cx("chakra-form__helper-text", props.className);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.div,
      {
        ...field == null ? void 0 : field.getHelpTextProps(props, ref),
        __css: styles.helperText,
        className
      }
    );
  }
);
FormHelperText.displayName = "FormHelperText";
function useFormControlProps(props) {
  var _a, _b, _c;
  const field = useFormControlContext();
  const {
    id: id2,
    disabled,
    readOnly,
    required,
    isRequired,
    isInvalid,
    isReadOnly,
    isDisabled,
    onFocus,
    onBlur,
    ...rest
  } = props;
  const labelIds = props["aria-describedby"] ? [props["aria-describedby"]] : [];
  if ((field == null ? void 0 : field.hasFeedbackText) && (field == null ? void 0 : field.isInvalid)) {
    labelIds.push(field.feedbackId);
  }
  if (field == null ? void 0 : field.hasHelpText) {
    labelIds.push(field.helpTextId);
  }
  return {
    ...rest,
    "aria-describedby": labelIds.join(" ") || void 0,
    id: id2 != null ? id2 : field == null ? void 0 : field.id,
    isDisabled: (_a = disabled != null ? disabled : isDisabled) != null ? _a : field == null ? void 0 : field.isDisabled,
    isReadOnly: (_b = readOnly != null ? readOnly : isReadOnly) != null ? _b : field == null ? void 0 : field.isReadOnly,
    isRequired: (_c = required != null ? required : isRequired) != null ? _c : field == null ? void 0 : field.isRequired,
    isInvalid: isInvalid != null ? isInvalid : field == null ? void 0 : field.isInvalid,
    onFocus: callAllHandlers(field == null ? void 0 : field.onFocus, onFocus),
    onBlur: callAllHandlers(field == null ? void 0 : field.onBlur, onBlur)
  };
}
var visuallyHiddenStyle = {
  border: "0",
  clip: "rect(0, 0, 0, 0)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};
var isDom = () => typeof document !== "undefined";
var hasSetup = false;
var modality = null;
var hasEventBeforeFocus = false;
var hasBlurredWindowRecently = false;
var handlers = /* @__PURE__ */ new Set();
function trigger(modality2, event) {
  handlers.forEach((handler) => handler(modality2, event));
}
var isMac = typeof window !== "undefined" && window.navigator != null ? /^Mac/.test(window.navigator.platform) : false;
function isValidKey(e) {
  return !(e.metaKey || !isMac && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function onKeyboardEvent(event) {
  hasEventBeforeFocus = true;
  if (isValidKey(event)) {
    modality = "keyboard";
    trigger("keyboard", event);
  }
}
function onPointerEvent(event) {
  modality = "pointer";
  if (event.type === "mousedown" || event.type === "pointerdown") {
    hasEventBeforeFocus = true;
    const target = event.composedPath ? event.composedPath()[0] : event.target;
    let matches = false;
    try {
      matches = target.matches(":focus-visible");
    } catch {
    }
    if (matches)
      return;
    trigger("pointer", event);
  }
}
function isVirtualClick(event) {
  if (event.mozInputSource === 0 && event.isTrusted)
    return true;
  return event.detail === 0 && !event.pointerType;
}
function onClickEvent(e) {
  if (isVirtualClick(e)) {
    hasEventBeforeFocus = true;
    modality = "virtual";
  }
}
function onWindowFocus(event) {
  if (event.target === window || event.target === document) {
    return;
  }
  if (!hasEventBeforeFocus && !hasBlurredWindowRecently) {
    modality = "virtual";
    trigger("virtual", event);
  }
  hasEventBeforeFocus = false;
  hasBlurredWindowRecently = false;
}
function onWindowBlur() {
  hasEventBeforeFocus = false;
  hasBlurredWindowRecently = true;
}
function isFocusVisible() {
  return modality !== "pointer";
}
function setupGlobalFocusEvents() {
  if (!isDom() || hasSetup) {
    return;
  }
  const { focus } = HTMLElement.prototype;
  HTMLElement.prototype.focus = function focusElement(...args) {
    hasEventBeforeFocus = true;
    focus.apply(this, args);
  };
  document.addEventListener("keydown", onKeyboardEvent, true);
  document.addEventListener("keyup", onKeyboardEvent, true);
  document.addEventListener("click", onClickEvent, true);
  window.addEventListener("focus", onWindowFocus, true);
  window.addEventListener("blur", onWindowBlur, false);
  if (typeof PointerEvent !== "undefined") {
    document.addEventListener("pointerdown", onPointerEvent, true);
    document.addEventListener("pointermove", onPointerEvent, true);
    document.addEventListener("pointerup", onPointerEvent, true);
  } else {
    document.addEventListener("mousedown", onPointerEvent, true);
    document.addEventListener("mousemove", onPointerEvent, true);
    document.addEventListener("mouseup", onPointerEvent, true);
  }
  hasSetup = true;
}
function trackFocusVisible(fn) {
  setupGlobalFocusEvents();
  fn(isFocusVisible());
  const handler = () => fn(isFocusVisible());
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
}
function omit(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}
function useCheckbox(props = {}) {
  const formControlProps = useFormControlProps(props);
  const {
    isDisabled,
    isReadOnly,
    isRequired,
    isInvalid,
    id: id2,
    onBlur,
    onFocus,
    "aria-describedby": ariaDescribedBy
  } = formControlProps;
  const {
    defaultChecked,
    isChecked: checkedProp,
    isFocusable,
    onChange,
    isIndeterminate,
    name,
    value,
    tabIndex = void 0,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-invalid": ariaInvalid,
    ...rest
  } = props;
  const htmlProps = omit(rest, [
    "isDisabled",
    "isReadOnly",
    "isRequired",
    "isInvalid",
    "id",
    "onBlur",
    "onFocus",
    "aria-describedby"
  ]);
  const onChangeProp = useCallbackRef(onChange);
  const onBlurProp = useCallbackRef(onBlur);
  const onFocusProp = useCallbackRef(onFocus);
  const [isFocusVisible2, setIsFocusVisible] = reactExports.useState(false);
  const [isFocused, setFocused] = reactExports.useState(false);
  const [isHovered, setHovered] = reactExports.useState(false);
  const [isActive, setActive] = reactExports.useState(false);
  reactExports.useEffect(() => {
    return trackFocusVisible(setIsFocusVisible);
  }, []);
  const inputRef = reactExports.useRef(null);
  const [rootIsLabelElement, setRootIsLabelElement] = reactExports.useState(true);
  const [checkedState, setCheckedState] = reactExports.useState(!!defaultChecked);
  const isControlled = checkedProp !== void 0;
  const isChecked = isControlled ? checkedProp : checkedState;
  const handleChange = reactExports.useCallback(
    (event) => {
      if (isReadOnly || isDisabled) {
        event.preventDefault();
        return;
      }
      if (!isControlled) {
        if (isChecked) {
          setCheckedState(event.target.checked);
        } else {
          setCheckedState(isIndeterminate ? true : event.target.checked);
        }
      }
      onChangeProp == null ? void 0 : onChangeProp(event);
    },
    [
      isReadOnly,
      isDisabled,
      isChecked,
      isControlled,
      isIndeterminate,
      onChangeProp
    ]
  );
  useSafeLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(isIndeterminate);
    }
  }, [isIndeterminate]);
  useUpdateEffect(() => {
    if (isDisabled) {
      setFocused(false);
    }
  }, [isDisabled, setFocused]);
  useSafeLayoutEffect(() => {
    const el = inputRef.current;
    if (!(el == null ? void 0 : el.form))
      return;
    const formResetListener = () => {
      setCheckedState(!!defaultChecked);
    };
    el.form.addEventListener("reset", formResetListener);
    return () => {
      var _a;
      return (_a = el.form) == null ? void 0 : _a.removeEventListener("reset", formResetListener);
    };
  }, []);
  const trulyDisabled = isDisabled && !isFocusable;
  const onKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === " ") {
        setActive(true);
      }
    },
    [setActive]
  );
  const onKeyUp = reactExports.useCallback(
    (event) => {
      if (event.key === " ") {
        setActive(false);
      }
    },
    [setActive]
  );
  useSafeLayoutEffect(() => {
    if (!inputRef.current)
      return;
    const notInSync = inputRef.current.checked !== isChecked;
    if (notInSync) {
      setCheckedState(inputRef.current.checked);
    }
  }, [inputRef.current]);
  const getCheckboxProps = reactExports.useCallback(
    (props2 = {}, forwardedRef = null) => {
      const onPressDown = (event) => {
        if (isFocused) {
          event.preventDefault();
        }
        setActive(true);
      };
      return {
        ...props2,
        ref: forwardedRef,
        "data-active": dataAttr(isActive),
        "data-hover": dataAttr(isHovered),
        "data-checked": dataAttr(isChecked),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocused && isFocusVisible2),
        "data-indeterminate": dataAttr(isIndeterminate),
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(isInvalid),
        "data-readonly": dataAttr(isReadOnly),
        "aria-hidden": true,
        onMouseDown: callAllHandlers(props2.onMouseDown, onPressDown),
        onMouseUp: callAllHandlers(props2.onMouseUp, () => setActive(false)),
        onMouseEnter: callAllHandlers(
          props2.onMouseEnter,
          () => setHovered(true)
        ),
        onMouseLeave: callAllHandlers(
          props2.onMouseLeave,
          () => setHovered(false)
        )
      };
    },
    [
      isActive,
      isChecked,
      isDisabled,
      isFocused,
      isFocusVisible2,
      isHovered,
      isIndeterminate,
      isInvalid,
      isReadOnly
    ]
  );
  const getIndicatorProps = reactExports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      ...props2,
      ref: forwardedRef,
      "data-active": dataAttr(isActive),
      "data-hover": dataAttr(isHovered),
      "data-checked": dataAttr(isChecked),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocused && isFocusVisible2),
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly)
    }),
    [
      isActive,
      isChecked,
      isDisabled,
      isFocused,
      isFocusVisible2,
      isHovered,
      isIndeterminate,
      isInvalid,
      isReadOnly
    ]
  );
  const getRootProps = reactExports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      ...htmlProps,
      ...props2,
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node)
          return;
        setRootIsLabelElement(node.tagName === "LABEL");
      }),
      onClick: callAllHandlers(props2.onClick, () => {
        var _a;
        if (!rootIsLabelElement) {
          (_a = inputRef.current) == null ? void 0 : _a.click();
          requestAnimationFrame(() => {
            var _a2;
            (_a2 = inputRef.current) == null ? void 0 : _a2.focus({ preventScroll: true });
          });
        }
      }),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid)
    }),
    [htmlProps, isDisabled, isChecked, isInvalid, rootIsLabelElement]
  );
  const getInputProps = reactExports.useCallback(
    (props2 = {}, forwardedRef = null) => {
      return {
        ...props2,
        ref: mergeRefs(inputRef, forwardedRef),
        type: "checkbox",
        name,
        value,
        id: id2,
        tabIndex,
        onChange: callAllHandlers(props2.onChange, handleChange),
        onBlur: callAllHandlers(
          props2.onBlur,
          onBlurProp,
          () => setFocused(false)
        ),
        onFocus: callAllHandlers(
          props2.onFocus,
          onFocusProp,
          () => setFocused(true)
        ),
        onKeyDown: callAllHandlers(props2.onKeyDown, onKeyDown),
        onKeyUp: callAllHandlers(props2.onKeyUp, onKeyUp),
        required: isRequired,
        checked: isChecked,
        disabled: trulyDisabled,
        readOnly: isReadOnly,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-invalid": ariaInvalid ? Boolean(ariaInvalid) : isInvalid,
        "aria-describedby": ariaDescribedBy,
        "aria-disabled": isDisabled,
        style: visuallyHiddenStyle
      };
    },
    [
      name,
      value,
      id2,
      handleChange,
      onBlurProp,
      onFocusProp,
      onKeyDown,
      onKeyUp,
      isRequired,
      isChecked,
      trulyDisabled,
      isReadOnly,
      ariaLabel,
      ariaLabelledBy,
      ariaInvalid,
      isInvalid,
      ariaDescribedBy,
      isDisabled,
      tabIndex
    ]
  );
  const getLabelProps = reactExports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      ...props2,
      ref: forwardedRef,
      onMouseDown: callAllHandlers(props2.onMouseDown, stopEvent),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid)
    }),
    [isChecked, isDisabled, isInvalid]
  );
  const state = {
    isInvalid,
    isFocused,
    isChecked,
    isActive,
    isHovered,
    isIndeterminate,
    isDisabled,
    isReadOnly,
    isRequired
  };
  return {
    state,
    getRootProps,
    getCheckboxProps,
    getIndicatorProps,
    getInputProps,
    getLabelProps,
    htmlProps
  };
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
var controlStyles = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "top",
  userSelect: "none",
  flexShrink: 0
};
var rootStyles = {
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  verticalAlign: "top",
  position: "relative"
};
var checkAnim = keyframes$1({
  from: {
    opacity: 0,
    strokeDashoffset: 16,
    transform: "scale(0.95)"
  },
  to: {
    opacity: 1,
    strokeDashoffset: 0,
    transform: "scale(1)"
  }
});
var indeterminateOpacityAnim = keyframes$1({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});
var indeterminateScaleAnim = keyframes$1({
  from: {
    transform: "scaleX(0.65)"
  },
  to: {
    transform: "scaleX(1)"
  }
});
var Checkbox = forwardRef(function Checkbox2(props, ref) {
  const group = useCheckboxGroupContext();
  const mergedProps = { ...group, ...props };
  const styles = useMultiStyleConfig("Checkbox", mergedProps);
  const ownProps = omitThemingProps(props);
  const {
    spacing = "0.5rem",
    className,
    children,
    iconColor,
    iconSize,
    icon = /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIcon, {}),
    isChecked: isCheckedProp,
    isDisabled = group == null ? void 0 : group.isDisabled,
    onChange: onChangeProp,
    inputProps,
    ...rest
  } = ownProps;
  let isChecked = isCheckedProp;
  if ((group == null ? void 0 : group.value) && ownProps.value) {
    isChecked = group.value.includes(ownProps.value);
  }
  let onChange = onChangeProp;
  if ((group == null ? void 0 : group.onChange) && ownProps.value) {
    onChange = callAll(group.onChange, onChangeProp);
  }
  const {
    state,
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    getRootProps
  } = useCheckbox({
    ...rest,
    isDisabled,
    isChecked,
    onChange
  });
  const shouldAnimate = useInitialAnimationState(state.isChecked);
  const iconStyles = reactExports.useMemo(
    () => ({
      animation: !shouldAnimate ? void 0 : state.isIndeterminate ? `${indeterminateOpacityAnim} 20ms linear, ${indeterminateScaleAnim} 200ms linear` : `${checkAnim} 200ms linear`,
      fontSize: iconSize,
      color: iconColor,
      ...styles.icon
    }),
    [iconColor, iconSize, shouldAnimate, state.isIndeterminate, styles.icon]
  );
  const clonedIcon = reactExports.cloneElement(icon, {
    __css: iconStyles,
    isIndeterminate: state.isIndeterminate,
    isChecked: state.isChecked
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    chakra.label,
    {
      __css: { ...rootStyles, ...styles.container },
      className: cx("chakra-checkbox", className),
      ...getRootProps(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "chakra-checkbox__input",
            ...getInputProps(inputProps, ref)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          chakra.span,
          {
            __css: { ...controlStyles, ...styles.control },
            className: "chakra-checkbox__control",
            ...getCheckboxProps(),
            children: clonedIcon
          }
        ),
        children && /* @__PURE__ */ jsxRuntimeExports.jsx(
          chakra.span,
          {
            className: "chakra-checkbox__label",
            ...getLabelProps(),
            __css: {
              marginStart: spacing,
              ...styles.label
            },
            children
          }
        )
      ]
    }
  );
});
Checkbox.displayName = "Checkbox";
var Grid = forwardRef(function Grid2(props, ref) {
  const {
    templateAreas,
    gap,
    rowGap,
    columnGap,
    column,
    row,
    autoFlow,
    autoRows,
    templateRows,
    autoColumns,
    templateColumns,
    ...rest
  } = props;
  const styles = {
    display: "grid",
    gridTemplateAreas: templateAreas,
    gridGap: gap,
    gridRowGap: rowGap,
    gridColumnGap: columnGap,
    gridAutoColumns: autoColumns,
    gridColumn: column,
    gridRow: row,
    gridAutoFlow: autoFlow,
    gridAutoRows: autoRows,
    gridTemplateRows: templateRows,
    gridTemplateColumns: templateColumns
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(chakra.div, { ref, __css: styles, ...rest });
});
Grid.displayName = "Grid";
function mapResponsive(prop, mapper) {
  if (Array.isArray(prop)) {
    return prop.map((item) => item === null ? null : mapper(item));
  }
  if (isObject(prop)) {
    return Object.keys(prop).reduce((result, key) => {
      result[key] = mapper(prop[key]);
      return result;
    }, {});
  }
  if (prop != null) {
    return mapper(prop);
  }
  return null;
}
var StackItem = (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  chakra.div,
  {
    className: "chakra-stack__item",
    ...props,
    __css: {
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0,
      ...props["__css"]
    }
  }
);
StackItem.displayName = "StackItem";
function getDividerStyles(options) {
  const { spacing, direction } = options;
  const dividerStyles = {
    column: {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    "column-reverse": {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    row: {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    },
    "row-reverse": {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    }
  };
  return {
    "&": mapResponsive(
      direction,
      (value) => dividerStyles[value]
    )
  };
}
var Stack = forwardRef((props, ref) => {
  const {
    isInline,
    direction: directionProp,
    align,
    justify,
    spacing = "0.5rem",
    wrap,
    children,
    divider,
    className,
    shouldWrapChildren,
    ...rest
  } = props;
  const direction = isInline ? "row" : directionProp != null ? directionProp : "column";
  const dividerStyle = reactExports.useMemo(
    () => getDividerStyles({ spacing, direction }),
    [spacing, direction]
  );
  const hasDivider = !!divider;
  const shouldUseChildren = !shouldWrapChildren && !hasDivider;
  const clones = reactExports.useMemo(() => {
    const validChildren = getValidChildren(children);
    return shouldUseChildren ? validChildren : validChildren.map((child, index) => {
      const key = typeof child.key !== "undefined" ? child.key : index;
      const isLast = index + 1 === validChildren.length;
      const wrappedChild = /* @__PURE__ */ jsxRuntimeExports.jsx(StackItem, { children: child }, key);
      const _child = shouldWrapChildren ? wrappedChild : child;
      if (!hasDivider)
        return _child;
      const clonedDivider = reactExports.cloneElement(
        divider,
        {
          __css: dividerStyle
        }
      );
      const _divider = isLast ? null : clonedDivider;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
        _child,
        _divider
      ] }, key);
    });
  }, [
    divider,
    dividerStyle,
    hasDivider,
    shouldUseChildren,
    shouldWrapChildren,
    children
  ]);
  const _className = cx("chakra-stack", className);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.div,
    {
      ref,
      display: "flex",
      alignItems: align,
      justifyContent: justify,
      flexDirection: direction,
      flexWrap: wrap,
      gap: hasDivider ? void 0 : spacing,
      className: _className,
      ...rest,
      children: clones
    }
  );
});
Stack.displayName = "Stack";
var Box = chakra("div");
Box.displayName = "Box";
var Square = forwardRef(function Square2(props, ref) {
  const { size, centerContent = true, ...rest } = props;
  const styles = centerContent ? { display: "flex", alignItems: "center", justifyContent: "center" } : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      boxSize: size,
      __css: {
        ...styles,
        flexShrink: 0,
        flexGrow: 0
      },
      ...rest
    }
  );
});
Square.displayName = "Square";
var Circle = forwardRef(function Circle2(props, ref) {
  const { size, ...rest } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size, ref, borderRadius: "9999px", ...rest });
});
Circle.displayName = "Circle";
const Popup = () => {
  const theme2 = useStorage(exampleThemeStorage);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "App",
      style: {
        backgroundColor: theme2 === "light" ? "#fff" : "#000"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "gridContainer", p: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { templateColumns: "repeat(5, 1fr)", gap: 6, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { gridColumn: "2 / span 1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: " Terms of Service - Preferences/Filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroup, { colorScheme: "green", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { spacing: 1.5, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "usageGuidelines", children: "Usage Guidelines" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "thirdPartyServices", children: "Third-Party Services" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "userContent", children: "User Content" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "payment", children: "Payment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "termination", children: "Termination" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "generalSummaryTOS", children: "General Summary" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { gridColumn: "4 / span 1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: " Privacy Policy - Preferences/Filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroup, { colorScheme: "green", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { spacing: 1.5, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "personalDataCollected", children: "Personal Data Collected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "userRights", children: "User Rights" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "internationalData", children: "International Data" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "cookies", children: "Cookies" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "contact", children: "Contact" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "generalSummaryPP", children: "General Summary" })
          ] }) })
        ] })
      ] }) })
    }
  );
};
const Popup$1 = withErrorBoundary(withSuspense(Popup, /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Loading ... " })), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Error Occured " }));
addHmrIntoView("pages/popup");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChakraProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Popup$1, {}) })
  );
}
init();
