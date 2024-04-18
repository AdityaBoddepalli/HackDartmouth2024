import { r as reactExports, j as jsxRuntimeExports, R as React, c as createRoot, a as reactDomExports } from "./client.js";
import { a as addHmrIntoView } from "./_virtual_reload-on-update-in-view.js";
import { i as isObject, q as mergeWith, t as theme$1, c as createContext, m as mergeRefs, p as cx, b as chakra, r as Spinner, j as forwardRef, s as useStyleConfig, o as omitThemingProps, v as useMergeRefs, g as dataAttr, u as useCallbackRef, f as useUpdateEffect, e as useSafeLayoutEffect$1, h as callAllHandlers, l as useMultiStyleConfig, w as useTheme$2, x as runIfFn, y as CloseButton, z as motion, n as callAll, a as useControllableState, A as getValidChildren, D as useFormControl, _ as _extends$1, E as CacheProvider, F as createCache, G as Global, H as newStyled, T as ThemeContext, I as css, k as keyframes, S as Stack, B as Box, P as Portal, C as ChakraProvider } from "./chunk-PULVB27S.js";
import { c as commonjsGlobal, g as getAugmentedNamespace } from "./_commonjsHelpers.js";
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
  return (v2) => fns.reduce((a, b2) => b2(a), v2);
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
function compact(object) {
  const clone = Object.assign({}, object);
  for (let key in clone) {
    if (clone[key] === void 0)
      delete clone[key];
  }
  return clone;
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function sortNodes(nodes) {
  return nodes.sort((a, b2) => {
    const compare = a.compareDocumentPosition(b2);
    if (compare & Node.DOCUMENT_POSITION_FOLLOWING || compare & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      return -1;
    }
    if (compare & Node.DOCUMENT_POSITION_PRECEDING || compare & Node.DOCUMENT_POSITION_CONTAINS) {
      return 1;
    }
    if (compare & Node.DOCUMENT_POSITION_DISCONNECTED || compare & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC) {
      throw Error("Cannot sort the given nodes.");
    } else {
      return 0;
    }
  });
}
var isElement$2 = (el) => typeof el == "object" && "nodeType" in el && el.nodeType === Node.ELEMENT_NODE;
function getNextIndex(current, max2, loop) {
  let next = current + 1;
  if (loop && next >= max2)
    next = 0;
  return next;
}
function getPrevIndex(current, max2, loop) {
  let next = current - 1;
  if (loop && next < 0)
    next = max2;
  return next;
}
var useSafeLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
var cast = (value) => value;
var DescendantsManager = class {
  constructor() {
    __publicField(this, "descendants", /* @__PURE__ */ new Map());
    __publicField(this, "register", (nodeOrOptions) => {
      if (nodeOrOptions == null)
        return;
      if (isElement$2(nodeOrOptions)) {
        return this.registerNode(nodeOrOptions);
      }
      return (node) => {
        this.registerNode(node, nodeOrOptions);
      };
    });
    __publicField(this, "unregister", (node) => {
      this.descendants.delete(node);
      const sorted = sortNodes(Array.from(this.descendants.keys()));
      this.assignIndex(sorted);
    });
    __publicField(this, "destroy", () => {
      this.descendants.clear();
    });
    __publicField(this, "assignIndex", (descendants) => {
      this.descendants.forEach((descendant) => {
        const index = descendants.indexOf(descendant.node);
        descendant.index = index;
        descendant.node.dataset["index"] = descendant.index.toString();
      });
    });
    __publicField(this, "count", () => this.descendants.size);
    __publicField(this, "enabledCount", () => this.enabledValues().length);
    __publicField(this, "values", () => {
      const values2 = Array.from(this.descendants.values());
      return values2.sort((a, b2) => a.index - b2.index);
    });
    __publicField(this, "enabledValues", () => {
      return this.values().filter((descendant) => !descendant.disabled);
    });
    __publicField(this, "item", (index) => {
      if (this.count() === 0)
        return void 0;
      return this.values()[index];
    });
    __publicField(this, "enabledItem", (index) => {
      if (this.enabledCount() === 0)
        return void 0;
      return this.enabledValues()[index];
    });
    __publicField(this, "first", () => this.item(0));
    __publicField(this, "firstEnabled", () => this.enabledItem(0));
    __publicField(this, "last", () => this.item(this.descendants.size - 1));
    __publicField(this, "lastEnabled", () => {
      const lastIndex = this.enabledValues().length - 1;
      return this.enabledItem(lastIndex);
    });
    __publicField(this, "indexOf", (node) => {
      var _a, _b;
      if (!node)
        return -1;
      return (_b = (_a = this.descendants.get(node)) == null ? void 0 : _a.index) != null ? _b : -1;
    });
    __publicField(this, "enabledIndexOf", (node) => {
      if (node == null)
        return -1;
      return this.enabledValues().findIndex((i) => i.node.isSameNode(node));
    });
    __publicField(this, "next", (index, loop = true) => {
      const next = getNextIndex(index, this.count(), loop);
      return this.item(next);
    });
    __publicField(this, "nextEnabled", (index, loop = true) => {
      const item = this.item(index);
      if (!item)
        return;
      const enabledIndex = this.enabledIndexOf(item.node);
      const nextEnabledIndex = getNextIndex(
        enabledIndex,
        this.enabledCount(),
        loop
      );
      return this.enabledItem(nextEnabledIndex);
    });
    __publicField(this, "prev", (index, loop = true) => {
      const prev = getPrevIndex(index, this.count() - 1, loop);
      return this.item(prev);
    });
    __publicField(this, "prevEnabled", (index, loop = true) => {
      const item = this.item(index);
      if (!item)
        return;
      const enabledIndex = this.enabledIndexOf(item.node);
      const prevEnabledIndex = getPrevIndex(
        enabledIndex,
        this.enabledCount() - 1,
        loop
      );
      return this.enabledItem(prevEnabledIndex);
    });
    __publicField(this, "registerNode", (node, options) => {
      if (!node || this.descendants.has(node))
        return;
      const keys = Array.from(this.descendants.keys()).concat(node);
      const sorted = sortNodes(keys);
      if (options == null ? void 0 : options.disabled) {
        options.disabled = !!options.disabled;
      }
      const descendant = { node, index: -1, ...options };
      this.descendants.set(node, descendant);
      this.assignIndex(sorted);
    });
  }
};
function useDescendants() {
  const descendants = reactExports.useRef(new DescendantsManager());
  useSafeLayoutEffect(() => {
    return () => descendants.current.destroy();
  });
  return descendants.current;
}
var [DescendantsContextProvider, useDescendantsContext] = createContext({
  name: "DescendantsProvider",
  errorMessage: "useDescendantsContext must be used within DescendantsProvider"
});
function useDescendant(options) {
  const descendants = useDescendantsContext();
  const [index, setIndex] = reactExports.useState(-1);
  const ref = reactExports.useRef(null);
  useSafeLayoutEffect(() => {
    return () => {
      if (!ref.current)
        return;
      descendants.unregister(ref.current);
    };
  }, []);
  useSafeLayoutEffect(() => {
    if (!ref.current)
      return;
    const dataIndex = Number(ref.current.dataset["index"]);
    if (index != dataIndex && !Number.isNaN(dataIndex)) {
      setIndex(dataIndex);
    }
  });
  const refCallback = options ? cast(descendants.register(options)) : cast(descendants.register);
  return {
    descendants,
    index,
    enabledIndex: descendants.enabledIndexOf(ref.current),
    register: mergeRefs(refCallback, ref)
  };
}
function createDescendantContext() {
  const ContextProvider = cast(DescendantsContextProvider);
  const _useDescendantsContext = () => cast(useDescendantsContext());
  const _useDescendant = (options) => useDescendant(options);
  const _useDescendants = () => useDescendants();
  return [
    // context provider
    ContextProvider,
    // call this when you need to read from context
    _useDescendantsContext,
    // descendants state information, to be called and passed to `ContextProvider`
    _useDescendants,
    // descendant index information
    _useDescendant
  ];
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
    isDisabled: isDisabled2 = group == null ? void 0 : group.isDisabled,
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
      disabled: isDisabled2 || isLoading,
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
var IconButton = forwardRef(
  (props, ref) => {
    const { icon, children, isRound, "aria-label": ariaLabel, ...rest } = props;
    const element = icon || children;
    const _children = reactExports.isValidElement(element) ? reactExports.cloneElement(element, {
      "aria-hidden": true,
      focusable: false
    }) : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        padding: "0",
        borderRadius: isRound ? "full" : void 0,
        ref,
        "aria-label": ariaLabel,
        ...rest,
        children: _children
      }
    );
  }
);
IconButton.displayName = "IconButton";
function useEventListener(target, event, handler, options) {
  const listener = useCallbackRef(handler);
  reactExports.useEffect(() => {
    const node = typeof target === "function" ? target() : target != null ? target : document;
    if (!handler || !node)
      return;
    node.addEventListener(event, listener, options);
    return () => {
      node.removeEventListener(event, listener, options);
    };
  }, [event, target, options, listener, handler]);
  return () => {
    const node = typeof target === "function" ? target() : target != null ? target : document;
    node == null ? void 0 : node.removeEventListener(event, listener, options);
  };
}
function isRefObject$1(val) {
  return "current" in val;
}
var isDom = () => typeof window !== "undefined";
function getPlatform() {
  var _a;
  const agent = navigator.userAgentData;
  return (_a = agent == null ? void 0 : agent.platform) != null ? _a : navigator.platform;
}
var vn = (v2) => isDom() && v2.test(navigator.vendor);
var pt = (v2) => isDom() && v2.test(getPlatform());
var isApple = () => pt(/mac|iphone|ipad|ipod/i);
var isSafari = () => isApple() && vn(/apple/i);
function useFocusOnPointerDown(props) {
  const { ref, elements, enabled } = props;
  const doc = () => {
    var _a, _b;
    return (_b = (_a = ref.current) == null ? void 0 : _a.ownerDocument) != null ? _b : document;
  };
  useEventListener(doc, "pointerdown", (event) => {
    if (!isSafari() || !enabled)
      return;
    const target = event.target;
    const els = elements != null ? elements : [ref];
    const isValidTarget = els.some((elementOrRef) => {
      const el = isRefObject$1(elementOrRef) ? elementOrRef.current : elementOrRef;
      return (el == null ? void 0 : el.contains(target)) || el === target;
    });
    if (doc().activeElement !== target && isValidTarget) {
      event.preventDefault();
      target.focus();
    }
  });
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function isElement$1(el) {
  return el != null && typeof el == "object" && "nodeType" in el && el.nodeType === Node.ELEMENT_NODE;
}
function isHTMLElement$1(el) {
  var _a;
  if (!isElement$1(el))
    return false;
  const win = (_a = el.ownerDocument.defaultView) != null ? _a : window;
  return el instanceof win.HTMLElement;
}
function getOwnerWindow(node) {
  var _a, _b;
  return (_b = (_a = getOwnerDocument(node)) == null ? void 0 : _a.defaultView) != null ? _b : window;
}
function getOwnerDocument(node) {
  return isElement$1(node) ? node.ownerDocument : document;
}
function getActiveElement(node) {
  return getOwnerDocument(node).activeElement;
}
var hasTabIndex = (element) => element.hasAttribute("tabindex");
var hasNegativeTabIndex = (element) => hasTabIndex(element) && element.tabIndex === -1;
function isDisabled(element) {
  return Boolean(element.getAttribute("disabled")) === true || Boolean(element.getAttribute("aria-disabled")) === true;
}
function isHidden(element) {
  if (element.parentElement && isHidden(element.parentElement))
    return true;
  return element.hidden;
}
function isContentEditable(element) {
  const value = element.getAttribute("contenteditable");
  return value !== "false" && value != null;
}
function isFocusable(element) {
  if (!isHTMLElement$1(element) || isHidden(element) || isDisabled(element)) {
    return false;
  }
  const { localName } = element;
  const focusableTags = ["input", "select", "textarea", "button"];
  if (focusableTags.indexOf(localName) >= 0)
    return true;
  const others = {
    a: () => element.hasAttribute("href"),
    audio: () => element.hasAttribute("controls"),
    video: () => element.hasAttribute("controls")
  };
  if (localName in others) {
    return others[localName]();
  }
  if (isContentEditable(element))
    return true;
  return hasTabIndex(element);
}
function isTabbable(element) {
  if (!element)
    return false;
  return isHTMLElement$1(element) && isFocusable(element) && !hasNegativeTabIndex(element);
}
var focusableElList = [
  "input:not(:disabled):not([disabled])",
  "select:not(:disabled):not([disabled])",
  "textarea:not(:disabled):not([disabled])",
  "embed",
  "iframe",
  "object",
  "a[href]",
  "area[href]",
  "button:not(:disabled):not([disabled])",
  "[tabindex]",
  "audio[controls]",
  "video[controls]",
  "*[tabindex]:not([aria-disabled])",
  "*[contenteditable]"
];
var focusableElSelector = focusableElList.join();
var isVisible = (el) => el.offsetWidth > 0 && el.offsetHeight > 0;
function getAllFocusable(container) {
  const focusableEls = Array.from(
    container.querySelectorAll(focusableElSelector)
  );
  focusableEls.unshift(container);
  return focusableEls.filter((el) => isFocusable(el) && isVisible(el));
}
var Text = forwardRef(function Text2(props, ref) {
  const styles = useStyleConfig("Text", props);
  const { className, align, decoration, casing, ...rest } = omitThemingProps(props);
  const aliasedProps = compact({
    textAlign: props.align,
    textDecoration: props.decoration,
    textTransform: props.casing
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.p,
    {
      ref,
      className: cx("chakra-text", props.className),
      ...aliasedProps,
      ...rest,
      __css: styles
    }
  );
});
Text.displayName = "Text";
function useEventListeners() {
  const listeners = reactExports.useRef(/* @__PURE__ */ new Map());
  const currentListeners = listeners.current;
  const add = reactExports.useCallback((el, type, listener, options) => {
    listeners.current.set(listener, { type, el, options });
    el.addEventListener(type, listener, options);
  }, []);
  const remove = reactExports.useCallback(
    (el, type, listener, options) => {
      el.removeEventListener(type, listener, options);
      listeners.current.delete(listener);
    },
    []
  );
  reactExports.useEffect(
    () => () => {
      currentListeners.forEach((value, key) => {
        remove(value.el, value.type, key, value.options);
      });
    },
    [remove, currentListeners]
  );
  return { add, remove };
}
function isValidElement(event) {
  const element = event.target;
  const { tagName, isContentEditable: isContentEditable2 } = element;
  return tagName !== "INPUT" && tagName !== "TEXTAREA" && isContentEditable2 !== true;
}
function useClickable(props = {}) {
  const {
    ref: htmlRef,
    isDisabled: isDisabled2,
    isFocusable: isFocusable2,
    clickOnEnter = true,
    clickOnSpace = true,
    onMouseDown,
    onMouseUp,
    onClick,
    onKeyDown,
    onKeyUp,
    tabIndex: tabIndexProp,
    onMouseOver,
    onMouseLeave,
    ...htmlProps
  } = props;
  const [isButton, setIsButton] = reactExports.useState(true);
  const [isPressed, setIsPressed] = reactExports.useState(false);
  const listeners = useEventListeners();
  const refCallback = (node) => {
    if (!node)
      return;
    if (node.tagName !== "BUTTON") {
      setIsButton(false);
    }
  };
  const tabIndex = isButton ? tabIndexProp : tabIndexProp || 0;
  const trulyDisabled = isDisabled2 && !isFocusable2;
  const handleClick = reactExports.useCallback(
    (event) => {
      if (isDisabled2) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      const self = event.currentTarget;
      self.focus();
      onClick == null ? void 0 : onClick(event);
    },
    [isDisabled2, onClick]
  );
  const onDocumentKeyUp = reactExports.useCallback(
    (e2) => {
      if (isPressed && isValidElement(e2)) {
        e2.preventDefault();
        e2.stopPropagation();
        setIsPressed(false);
        listeners.remove(document, "keyup", onDocumentKeyUp, false);
      }
    },
    [isPressed, listeners]
  );
  const handleKeyDown2 = reactExports.useCallback(
    (event) => {
      onKeyDown == null ? void 0 : onKeyDown(event);
      if (isDisabled2 || event.defaultPrevented || event.metaKey) {
        return;
      }
      if (!isValidElement(event.nativeEvent) || isButton)
        return;
      const shouldClickOnEnter = clickOnEnter && event.key === "Enter";
      const shouldClickOnSpace = clickOnSpace && event.key === " ";
      if (shouldClickOnSpace) {
        event.preventDefault();
        setIsPressed(true);
      }
      if (shouldClickOnEnter) {
        event.preventDefault();
        const self = event.currentTarget;
        self.click();
      }
      listeners.add(document, "keyup", onDocumentKeyUp, false);
    },
    [
      isDisabled2,
      isButton,
      onKeyDown,
      clickOnEnter,
      clickOnSpace,
      listeners,
      onDocumentKeyUp
    ]
  );
  const handleKeyUp = reactExports.useCallback(
    (event) => {
      onKeyUp == null ? void 0 : onKeyUp(event);
      if (isDisabled2 || event.defaultPrevented || event.metaKey)
        return;
      if (!isValidElement(event.nativeEvent) || isButton)
        return;
      const shouldClickOnSpace = clickOnSpace && event.key === " ";
      if (shouldClickOnSpace) {
        event.preventDefault();
        setIsPressed(false);
        const self = event.currentTarget;
        self.click();
      }
    },
    [clickOnSpace, isButton, isDisabled2, onKeyUp]
  );
  const onDocumentMouseUp = reactExports.useCallback(
    (event) => {
      if (event.button !== 0)
        return;
      setIsPressed(false);
      listeners.remove(document, "mouseup", onDocumentMouseUp, false);
    },
    [listeners]
  );
  const handleMouseDown = reactExports.useCallback(
    (event) => {
      if (event.button !== 0)
        return;
      if (isDisabled2) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      if (!isButton) {
        setIsPressed(true);
      }
      const target = event.currentTarget;
      target.focus({ preventScroll: true });
      listeners.add(document, "mouseup", onDocumentMouseUp, false);
      onMouseDown == null ? void 0 : onMouseDown(event);
    },
    [isDisabled2, isButton, onMouseDown, listeners, onDocumentMouseUp]
  );
  const handleMouseUp = reactExports.useCallback(
    (event) => {
      if (event.button !== 0)
        return;
      if (!isButton) {
        setIsPressed(false);
      }
      onMouseUp == null ? void 0 : onMouseUp(event);
    },
    [onMouseUp, isButton]
  );
  const handleMouseOver = reactExports.useCallback(
    (event) => {
      if (isDisabled2) {
        event.preventDefault();
        return;
      }
      onMouseOver == null ? void 0 : onMouseOver(event);
    },
    [isDisabled2, onMouseOver]
  );
  const handleMouseLeave = reactExports.useCallback(
    (event) => {
      if (isPressed) {
        event.preventDefault();
        setIsPressed(false);
      }
      onMouseLeave == null ? void 0 : onMouseLeave(event);
    },
    [isPressed, onMouseLeave]
  );
  const ref = mergeRefs(htmlRef, refCallback);
  if (isButton) {
    return {
      ...htmlProps,
      ref,
      type: "button",
      "aria-disabled": trulyDisabled ? void 0 : isDisabled2,
      disabled: trulyDisabled,
      onClick: handleClick,
      onMouseDown,
      onMouseUp,
      onKeyUp,
      onKeyDown,
      onMouseOver,
      onMouseLeave
    };
  }
  return {
    ...htmlProps,
    ref,
    role: "button",
    "data-active": dataAttr(isPressed),
    "aria-disabled": isDisabled2 ? "true" : void 0,
    tabIndex: trulyDisabled ? void 0 : tabIndex,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onKeyUp: handleKeyUp,
    onKeyDown: handleKeyDown2,
    onMouseOver: handleMouseOver,
    onMouseLeave: handleMouseLeave
  };
}
function preventReturnFocus(containerRef) {
  const el = containerRef.current;
  if (!el)
    return false;
  const activeElement = getActiveElement(el);
  if (!activeElement)
    return false;
  if (el.contains(activeElement))
    return false;
  if (isTabbable(activeElement))
    return true;
  return false;
}
function useFocusOnHide(containerRef, options) {
  const { shouldFocus: shouldFocusProp, visible, focusRef } = options;
  const shouldFocus = shouldFocusProp && !visible;
  useUpdateEffect(() => {
    if (!shouldFocus)
      return;
    if (preventReturnFocus(containerRef)) {
      return;
    }
    const el = (focusRef == null ? void 0 : focusRef.current) || containerRef.current;
    let rafId;
    if (el) {
      rafId = requestAnimationFrame(() => {
        el.focus({ preventScroll: true });
      });
      return () => {
        cancelAnimationFrame(rafId);
      };
    }
  }, [shouldFocus, containerRef, focusRef]);
}
var defaultOptions = {
  preventScroll: true,
  shouldFocus: false
};
function useFocusOnShow(target, options = defaultOptions) {
  const { focusRef, preventScroll, shouldFocus, visible } = options;
  const element = isRefObject(target) ? target.current : target;
  const autoFocusValue = shouldFocus && visible;
  const autoFocusRef = reactExports.useRef(autoFocusValue);
  const lastVisibleRef = reactExports.useRef(visible);
  useSafeLayoutEffect$1(() => {
    if (!lastVisibleRef.current && visible) {
      autoFocusRef.current = autoFocusValue;
    }
    lastVisibleRef.current = visible;
  }, [visible, autoFocusValue]);
  const onFocus = reactExports.useCallback(() => {
    if (!visible || !element || !autoFocusRef.current)
      return;
    autoFocusRef.current = false;
    if (element.contains(document.activeElement))
      return;
    if (focusRef == null ? void 0 : focusRef.current) {
      requestAnimationFrame(() => {
        var _a;
        (_a = focusRef.current) == null ? void 0 : _a.focus({ preventScroll });
      });
    } else {
      const tabbableEls = getAllFocusable(element);
      if (tabbableEls.length > 0) {
        requestAnimationFrame(() => {
          tabbableEls[0].focus({ preventScroll });
        });
      }
    }
  }, [visible, preventScroll, element, focusRef]);
  useUpdateEffect(() => {
    onFocus();
  }, [onFocus]);
  useEventListener(element, "transitionend", onFocus);
}
function isRefObject(val) {
  return "current" in val;
}
var toVar = (value, fallback) => ({
  var: value,
  varRef: fallback ? `var(${value}, ${fallback})` : `var(${value})`
});
var cssVars = {
  arrowShadowColor: toVar("--popper-arrow-shadow-color"),
  arrowSize: toVar("--popper-arrow-size", "8px"),
  arrowSizeHalf: toVar("--popper-arrow-size-half"),
  arrowBg: toVar("--popper-arrow-bg"),
  transformOrigin: toVar("--popper-transform-origin"),
  arrowOffset: toVar("--popper-arrow-offset")
};
function getBoxShadow(placement) {
  if (placement.includes("top"))
    return `1px 1px 0px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("bottom"))
    return `-1px -1px 0px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("right"))
    return `-1px 1px 0px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("left"))
    return `1px -1px 0px 0 var(--popper-arrow-shadow-color)`;
}
var transforms = {
  top: "bottom center",
  "top-start": "bottom left",
  "top-end": "bottom right",
  bottom: "top center",
  "bottom-start": "top left",
  "bottom-end": "top right",
  left: "right center",
  "left-start": "right top",
  "left-end": "right bottom",
  right: "left center",
  "right-start": "left top",
  "right-end": "left bottom"
};
var toTransformOrigin = (placement) => transforms[placement];
var defaultEventListeners = {
  scroll: true,
  resize: true
};
function getEventListenerOptions(value) {
  let eventListeners2;
  if (typeof value === "object") {
    eventListeners2 = {
      enabled: true,
      options: { ...defaultEventListeners, ...value }
    };
  } else {
    eventListeners2 = {
      enabled: value,
      options: defaultEventListeners
    };
  }
  return eventListeners2;
}
var matchWidth = {
  name: "matchWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => () => {
    const reference2 = state.elements.reference;
    state.elements.popper.style.width = `${reference2.offsetWidth}px`;
  }
};
var transformOrigin = {
  name: "transformOrigin",
  enabled: true,
  phase: "write",
  fn: ({ state }) => {
    setTransformOrigin(state);
  },
  effect: ({ state }) => () => {
    setTransformOrigin(state);
  }
};
var setTransformOrigin = (state) => {
  state.elements.popper.style.setProperty(
    cssVars.transformOrigin.var,
    toTransformOrigin(state.placement)
  );
};
var positionArrow = {
  name: "positionArrow",
  enabled: true,
  phase: "afterWrite",
  fn: ({ state }) => {
    setArrowStyles(state);
  }
};
var setArrowStyles = (state) => {
  var _a;
  if (!state.placement)
    return;
  const overrides = getArrowStyle$1(state.placement);
  if (((_a = state.elements) == null ? void 0 : _a.arrow) && overrides) {
    Object.assign(state.elements.arrow.style, {
      [overrides.property]: overrides.value,
      width: cssVars.arrowSize.varRef,
      height: cssVars.arrowSize.varRef,
      zIndex: -1
    });
    const vars = {
      [cssVars.arrowSizeHalf.var]: `calc(${cssVars.arrowSize.varRef} / 2 - 1px)`,
      [cssVars.arrowOffset.var]: `calc(${cssVars.arrowSizeHalf.varRef} * -1)`
    };
    for (const property in vars) {
      state.elements.arrow.style.setProperty(property, vars[property]);
    }
  }
};
var getArrowStyle$1 = (placement) => {
  if (placement.startsWith("top")) {
    return { property: "bottom", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("bottom")) {
    return { property: "top", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("left")) {
    return { property: "right", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("right")) {
    return { property: "left", value: cssVars.arrowOffset.varRef };
  }
};
var innerArrow = {
  name: "innerArrow",
  enabled: true,
  phase: "main",
  requires: ["arrow"],
  fn: ({ state }) => {
    setInnerArrowStyles(state);
  },
  effect: ({ state }) => () => {
    setInnerArrowStyles(state);
  }
};
var setInnerArrowStyles = (state) => {
  if (!state.elements.arrow)
    return;
  const inner = state.elements.arrow.querySelector(
    "[data-popper-arrow-inner]"
  );
  if (!inner)
    return;
  const boxShadow = getBoxShadow(state.placement);
  if (boxShadow) {
    inner.style.setProperty("--popper-arrow-default-shadow", boxShadow);
  }
  Object.assign(inner.style, {
    transform: "rotate(45deg)",
    background: cssVars.arrowBg.varRef,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "inherit",
    boxShadow: `var(--popper-arrow-shadow, var(--popper-arrow-default-shadow))`
  });
};
var logicals = {
  "start-start": { ltr: "left-start", rtl: "right-start" },
  "start-end": { ltr: "left-end", rtl: "right-end" },
  "end-start": { ltr: "right-start", rtl: "left-start" },
  "end-end": { ltr: "right-end", rtl: "left-end" },
  start: { ltr: "left", rtl: "right" },
  end: { ltr: "right", rtl: "left" }
};
var opposites = {
  "auto-start": "auto-end",
  "auto-end": "auto-start",
  "top-start": "top-end",
  "top-end": "top-start",
  "bottom-start": "bottom-end",
  "bottom-end": "bottom-start"
};
function getPopperPlacement(placement, dir = "ltr") {
  var _a, _b;
  const value = ((_a = logicals[placement]) == null ? void 0 : _a[dir]) || placement;
  if (dir === "ltr")
    return value;
  return (_b = opposites[placement]) != null ? _b : value;
}
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument2 = node.ownerDocument;
    return ownerDocument2 ? ownerDocument2.defaultView || window : window;
  }
  return node;
}
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles$1(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style2 = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style2);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style2 = styleProperties.reduce(function(style3, property) {
        style3[property] = "";
        return style3;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style2);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
const applyStyles$2 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles$1,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round$1 = Math.round;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round$1(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round$1(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width2 = clientRect.width / scaleX;
  var height2 = clientRect.height / scaleY;
  return {
    width: width2,
    height: height2,
    top: y,
    right: x + width2,
    bottom: y + height2,
    left: x,
    x,
    y
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width2 = element.offsetWidth;
  var height2 = element.offsetHeight;
  if (Math.abs(clientRect.width - width2) <= 1) {
    width2 = clientRect.width;
  }
  if (Math.abs(clientRect.height - height2) <= 1) {
    height2 = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width2,
    height: height2
  };
}
function contains$1(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css2 = getComputedStyle(currentNode);
    if (css2.transform !== "none" || css2.perspective !== "none" || css2.contain === "paint" || ["transform", "perspective"].indexOf(css2.willChange) !== -1 || isFirefox && css2.willChange === "filter" || isFirefox && css2.filter && css2.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min2, value, max2) {
  var v2 = within(min2, value, max2);
  return v2 > max2 ? max2 : v2;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding2, state) {
  padding2 = typeof padding2 === "function" ? padding2(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding2;
  return mergePaddingObject(typeof padding2 !== "number" ? padding2 : expandToHashMap(padding2, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains$1(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
const arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round$1(x * dpr) / dpr || 0,
    y: round$1(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
const computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
const eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width2 = html.clientWidth;
  var height2 = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width2 = visualViewport.width;
    height2 = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width: width2,
    height: height2,
    x: x + getWindowScrollBarX(element),
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width2 = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height2 = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width2;
  }
  return {
    width: width2,
    height: height2,
    x,
    y
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains$1(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding2 = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding2 !== "number" ? padding2 : expandToHashMap(padding2, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding2 = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding: padding2
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b2) {
    return overflows[a] - overflows[b2];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding2 = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding: padding2,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding: padding2
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
const flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
const hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
const offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
const popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding2 = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding: padding2,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = offset2 + overflow[mainSide];
    var max$1 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
const preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round$1(rect.width) / element.offsetWidth || 1;
  var scaleY = round$1(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce$1(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions2;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions2, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m2) {
          return m2.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce$1(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect2 = _ref.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$2, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
function usePopper(props = {}) {
  const {
    enabled = true,
    modifiers,
    placement: placementProp = "bottom",
    strategy = "absolute",
    arrowPadding = 8,
    eventListeners: eventListeners2 = true,
    offset: offset2,
    gutter = 8,
    flip: flip2 = true,
    boundary = "clippingParents",
    preventOverflow: preventOverflow2 = true,
    matchWidth: matchWidth2,
    direction = "ltr"
  } = props;
  const reference2 = reactExports.useRef(null);
  const popper2 = reactExports.useRef(null);
  const instance = reactExports.useRef(null);
  const placement = getPopperPlacement(placementProp, direction);
  const cleanup = reactExports.useRef(() => {
  });
  const setupPopper = reactExports.useCallback(() => {
    var _a;
    if (!enabled || !reference2.current || !popper2.current)
      return;
    (_a = cleanup.current) == null ? void 0 : _a.call(cleanup);
    instance.current = createPopper(reference2.current, popper2.current, {
      placement,
      modifiers: [
        innerArrow,
        positionArrow,
        transformOrigin,
        {
          ...matchWidth,
          enabled: !!matchWidth2
        },
        {
          name: "eventListeners",
          ...getEventListenerOptions(eventListeners2)
        },
        {
          name: "arrow",
          options: { padding: arrowPadding }
        },
        {
          name: "offset",
          options: {
            offset: offset2 != null ? offset2 : [0, gutter]
          }
        },
        {
          name: "flip",
          enabled: !!flip2,
          options: { padding: 8 }
        },
        {
          name: "preventOverflow",
          enabled: !!preventOverflow2,
          options: { boundary }
        },
        // allow users override internal modifiers
        ...modifiers != null ? modifiers : []
      ],
      strategy
    });
    instance.current.forceUpdate();
    cleanup.current = instance.current.destroy;
  }, [
    placement,
    enabled,
    modifiers,
    matchWidth2,
    eventListeners2,
    arrowPadding,
    offset2,
    gutter,
    flip2,
    preventOverflow2,
    boundary,
    strategy
  ]);
  reactExports.useEffect(() => {
    return () => {
      var _a;
      if (!reference2.current && !popper2.current) {
        (_a = instance.current) == null ? void 0 : _a.destroy();
        instance.current = null;
      }
    };
  }, []);
  const referenceRef = reactExports.useCallback(
    (node) => {
      reference2.current = node;
      setupPopper();
    },
    [setupPopper]
  );
  const getReferenceProps = reactExports.useCallback(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref: mergeRefs(referenceRef, ref)
    }),
    [referenceRef]
  );
  const popperRef = reactExports.useCallback(
    (node) => {
      popper2.current = node;
      setupPopper();
    },
    [setupPopper]
  );
  const getPopperProps = reactExports.useCallback(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref: mergeRefs(popperRef, ref),
      style: {
        ...props2.style,
        position: strategy,
        minWidth: matchWidth2 ? void 0 : "max-content",
        inset: "0 auto auto 0"
      }
    }),
    [strategy, popperRef, matchWidth2]
  );
  const getArrowProps = reactExports.useCallback((props2 = {}, ref = null) => {
    const { size, shadowColor, bg, style: style2, ...rest } = props2;
    return {
      ...rest,
      ref,
      "data-popper-arrow": "",
      style: getArrowStyle(props2)
    };
  }, []);
  const getArrowInnerProps = reactExports.useCallback(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref,
      "data-popper-arrow-inner": ""
    }),
    []
  );
  return {
    update() {
      var _a;
      (_a = instance.current) == null ? void 0 : _a.update();
    },
    forceUpdate() {
      var _a;
      (_a = instance.current) == null ? void 0 : _a.forceUpdate();
    },
    transformOrigin: cssVars.transformOrigin.varRef,
    referenceRef,
    popperRef,
    getPopperProps,
    getArrowProps,
    getArrowInnerProps,
    getReferenceProps
  };
}
function getArrowStyle(props) {
  const { size, shadowColor, bg, style: style2 } = props;
  const computedStyle = { ...style2, position: "absolute" };
  if (size) {
    computedStyle["--popper-arrow-size"] = size;
  }
  if (shadowColor) {
    computedStyle["--popper-arrow-shadow-color"] = shadowColor;
  }
  if (bg) {
    computedStyle["--popper-arrow-bg"] = bg;
  }
  return computedStyle;
}
function useDisclosure(props = {}) {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    isOpen: isOpenProp,
    id: idProp
  } = props;
  const handleOpen = useCallbackRef(onOpenProp);
  const handleClose = useCallbackRef(onCloseProp);
  const [isOpenState, setIsOpen] = reactExports.useState(props.defaultIsOpen || false);
  const isOpen = isOpenProp !== void 0 ? isOpenProp : isOpenState;
  const isControlled = isOpenProp !== void 0;
  const uid = reactExports.useId();
  const id = idProp != null ? idProp : `disclosure-${uid}`;
  const onClose = reactExports.useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    handleClose == null ? void 0 : handleClose();
  }, [isControlled, handleClose]);
  const onOpen = reactExports.useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    handleOpen == null ? void 0 : handleOpen();
  }, [isControlled, handleOpen]);
  const onToggle = reactExports.useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);
  function getButtonProps(props2 = {}) {
    return {
      ...props2,
      "aria-expanded": isOpen,
      "aria-controls": id,
      onClick(event) {
        var _a;
        (_a = props2.onClick) == null ? void 0 : _a.call(props2, event);
        onToggle();
      }
    };
  }
  function getDisclosureProps(props2 = {}) {
    return {
      ...props2,
      hidden: !isOpen,
      id
    };
  }
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps,
    getDisclosureProps
  };
}
function useAnimationState(props) {
  const { isOpen, ref } = props;
  const [mounted, setMounted] = reactExports.useState(isOpen);
  const [once, setOnce] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!once) {
      setMounted(isOpen);
      setOnce(true);
    }
  }, [isOpen, once, mounted]);
  useEventListener(
    () => ref.current,
    "animationend",
    () => {
      setMounted(isOpen);
    }
  );
  const hidden = isOpen ? false : !mounted;
  return {
    present: !hidden,
    onComplete() {
      var _a;
      const win = getOwnerWindow(ref.current);
      const evt = new win.CustomEvent("animationend", { bubbles: true });
      (_a = ref.current) == null ? void 0 : _a.dispatchEvent(evt);
    }
  };
}
function lazyDisclosure(options) {
  const { wasSelected, enabled, isSelected, mode = "unmount" } = options;
  if (!enabled)
    return true;
  if (isSelected)
    return true;
  if (mode === "keepMounted" && wasSelected)
    return true;
  return false;
}
var [PopoverProvider, usePopoverContext] = createContext({
  name: "PopoverContext",
  errorMessage: "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`"
});
var [PopoverStylesProvider, usePopoverStyles] = createContext({
  name: `PopoverStylesContext`,
  errorMessage: `usePopoverStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Popover />" `
});
var PopoverHeader = forwardRef(
  function PopoverHeader2(props, ref) {
    const { getHeaderProps } = usePopoverContext();
    const styles = usePopoverStyles();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.header,
      {
        ...getHeaderProps(props, ref),
        className: cx("chakra-popover__header", props.className),
        __css: styles.header
      }
    );
  }
);
PopoverHeader.displayName = "PopoverHeader";
function PopoverTrigger(props) {
  const child = reactExports.Children.only(props.children);
  const { getTriggerProps } = usePopoverContext();
  return reactExports.cloneElement(child, getTriggerProps(child.props, child.ref));
}
PopoverTrigger.displayName = "PopoverTrigger";
var TRIGGER = {
  click: "click",
  hover: "hover"
};
function usePopover(props = {}) {
  const {
    closeOnBlur = true,
    closeOnEsc = true,
    initialFocusRef,
    id,
    returnFocusOnClose = true,
    autoFocus = true,
    arrowSize,
    arrowShadowColor,
    trigger = TRIGGER.click,
    openDelay = 200,
    closeDelay = 200,
    isLazy,
    lazyBehavior = "unmount",
    computePositionOnMount,
    ...popperProps
  } = props;
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure(props);
  const anchorRef = reactExports.useRef(null);
  const triggerRef = reactExports.useRef(null);
  const popoverRef = reactExports.useRef(null);
  const isHoveringRef = reactExports.useRef(false);
  const hasBeenOpened = reactExports.useRef(false);
  if (isOpen) {
    hasBeenOpened.current = true;
  }
  const [hasHeader, setHasHeader] = reactExports.useState(false);
  const [hasBody, setHasBody] = reactExports.useState(false);
  const uuid = reactExports.useId();
  const uid = id != null ? id : uuid;
  const [triggerId, popoverId, headerId, bodyId] = [
    "popover-trigger",
    "popover-content",
    "popover-header",
    "popover-body"
  ].map((id2) => `${id2}-${uid}`);
  const {
    referenceRef,
    getArrowProps,
    getPopperProps,
    getArrowInnerProps,
    forceUpdate
  } = usePopper({
    ...popperProps,
    enabled: isOpen || !!computePositionOnMount
  });
  const animated = useAnimationState({ isOpen, ref: popoverRef });
  useFocusOnPointerDown({
    enabled: isOpen,
    ref: triggerRef
  });
  useFocusOnHide(popoverRef, {
    focusRef: triggerRef,
    visible: isOpen,
    shouldFocus: returnFocusOnClose && trigger === TRIGGER.click
  });
  useFocusOnShow(popoverRef, {
    focusRef: initialFocusRef,
    visible: isOpen,
    shouldFocus: autoFocus && trigger === TRIGGER.click
  });
  const shouldRenderChildren = lazyDisclosure({
    wasSelected: hasBeenOpened.current,
    enabled: isLazy,
    mode: lazyBehavior,
    isSelected: animated.present
  });
  const getPopoverProps = reactExports.useCallback(
    (props2 = {}, _ref = null) => {
      const popoverProps = {
        ...props2,
        style: {
          ...props2.style,
          transformOrigin: cssVars.transformOrigin.varRef,
          [cssVars.arrowSize.var]: arrowSize ? `${arrowSize}px` : void 0,
          [cssVars.arrowShadowColor.var]: arrowShadowColor
        },
        ref: mergeRefs(popoverRef, _ref),
        children: shouldRenderChildren ? props2.children : null,
        id: popoverId,
        tabIndex: -1,
        role: "dialog",
        onKeyDown: callAllHandlers(props2.onKeyDown, (event) => {
          if (closeOnEsc && event.key === "Escape") {
            onClose();
          }
        }),
        onBlur: callAllHandlers(props2.onBlur, (event) => {
          const relatedTarget = getRelatedTarget(event);
          const targetIsPopover = contains(popoverRef.current, relatedTarget);
          const targetIsTrigger = contains(triggerRef.current, relatedTarget);
          const isValidBlur = !targetIsPopover && !targetIsTrigger;
          if (isOpen && closeOnBlur && isValidBlur) {
            onClose();
          }
        }),
        "aria-labelledby": hasHeader ? headerId : void 0,
        "aria-describedby": hasBody ? bodyId : void 0
      };
      if (trigger === TRIGGER.hover) {
        popoverProps.role = "tooltip";
        popoverProps.onMouseEnter = callAllHandlers(props2.onMouseEnter, () => {
          isHoveringRef.current = true;
        });
        popoverProps.onMouseLeave = callAllHandlers(
          props2.onMouseLeave,
          (event) => {
            if (event.nativeEvent.relatedTarget === null) {
              return;
            }
            isHoveringRef.current = false;
            setTimeout(() => onClose(), closeDelay);
          }
        );
      }
      return popoverProps;
    },
    [
      shouldRenderChildren,
      popoverId,
      hasHeader,
      headerId,
      hasBody,
      bodyId,
      trigger,
      closeOnEsc,
      onClose,
      isOpen,
      closeOnBlur,
      closeDelay,
      arrowShadowColor,
      arrowSize
    ]
  );
  const getPopoverPositionerProps = reactExports.useCallback(
    (props2 = {}, forwardedRef = null) => getPopperProps(
      {
        ...props2,
        style: {
          visibility: isOpen ? "visible" : "hidden",
          ...props2.style
        }
      },
      forwardedRef
    ),
    [isOpen, getPopperProps]
  );
  const getAnchorProps = reactExports.useCallback(
    (props2, _ref = null) => {
      return {
        ...props2,
        // If anchor is rendered, it is used as reference.
        ref: mergeRefs(_ref, anchorRef, referenceRef)
      };
    },
    [anchorRef, referenceRef]
  );
  const openTimeout = reactExports.useRef();
  const closeTimeout = reactExports.useRef();
  const maybeReferenceRef = reactExports.useCallback(
    (node) => {
      if (anchorRef.current == null) {
        referenceRef(node);
      }
    },
    [referenceRef]
  );
  const getTriggerProps = reactExports.useCallback(
    (props2 = {}, _ref = null) => {
      const triggerProps = {
        ...props2,
        ref: mergeRefs(triggerRef, _ref, maybeReferenceRef),
        id: triggerId,
        "aria-haspopup": "dialog",
        "aria-expanded": isOpen,
        "aria-controls": popoverId
      };
      if (trigger === TRIGGER.click) {
        triggerProps.onClick = callAllHandlers(props2.onClick, onToggle);
      }
      if (trigger === TRIGGER.hover) {
        triggerProps.onFocus = callAllHandlers(props2.onFocus, () => {
          if (openTimeout.current === void 0) {
            onOpen();
          }
        });
        triggerProps.onBlur = callAllHandlers(props2.onBlur, (event) => {
          const relatedTarget = getRelatedTarget(event);
          const isValidBlur = !contains(popoverRef.current, relatedTarget);
          if (isOpen && closeOnBlur && isValidBlur) {
            onClose();
          }
        });
        triggerProps.onKeyDown = callAllHandlers(props2.onKeyDown, (event) => {
          if (event.key === "Escape") {
            onClose();
          }
        });
        triggerProps.onMouseEnter = callAllHandlers(props2.onMouseEnter, () => {
          isHoveringRef.current = true;
          openTimeout.current = window.setTimeout(() => onOpen(), openDelay);
        });
        triggerProps.onMouseLeave = callAllHandlers(props2.onMouseLeave, () => {
          isHoveringRef.current = false;
          if (openTimeout.current) {
            clearTimeout(openTimeout.current);
            openTimeout.current = void 0;
          }
          closeTimeout.current = window.setTimeout(() => {
            if (isHoveringRef.current === false) {
              onClose();
            }
          }, closeDelay);
        });
      }
      return triggerProps;
    },
    [
      triggerId,
      isOpen,
      popoverId,
      trigger,
      maybeReferenceRef,
      onToggle,
      onOpen,
      closeOnBlur,
      onClose,
      openDelay,
      closeDelay
    ]
  );
  reactExports.useEffect(() => {
    return () => {
      if (openTimeout.current) {
        clearTimeout(openTimeout.current);
      }
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);
  const getHeaderProps = reactExports.useCallback(
    (props2 = {}, ref = null) => ({
      ...props2,
      id: headerId,
      ref: mergeRefs(ref, (node) => {
        setHasHeader(!!node);
      })
    }),
    [headerId]
  );
  const getBodyProps = reactExports.useCallback(
    (props2 = {}, ref = null) => ({
      ...props2,
      id: bodyId,
      ref: mergeRefs(ref, (node) => {
        setHasBody(!!node);
      })
    }),
    [bodyId]
  );
  return {
    forceUpdate,
    isOpen,
    onAnimationComplete: animated.onComplete,
    onClose,
    getAnchorProps,
    getArrowProps,
    getArrowInnerProps,
    getPopoverPositionerProps,
    getPopoverProps,
    getTriggerProps,
    getHeaderProps,
    getBodyProps
  };
}
function contains(parent, child) {
  return parent === child || (parent == null ? void 0 : parent.contains(child));
}
function getRelatedTarget(event) {
  var _a;
  const activeEl = event.currentTarget.ownerDocument.activeElement;
  return (_a = event.relatedTarget) != null ? _a : activeEl;
}
function Popover(props) {
  const styles = useMultiStyleConfig("Popover", props);
  const { children, ...rest } = omitThemingProps(props);
  const theme2 = useTheme$2();
  const context = usePopover({ ...rest, direction: theme2.direction });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverProvider, { value: context, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverStylesProvider, { value: styles, children: runIfFn(children, {
    isOpen: context.isOpen,
    onClose: context.onClose,
    forceUpdate: context.forceUpdate
  }) }) });
}
Popover.displayName = "Popover";
var resolveVar = (scale, value) => value ? `${scale}.${value}, ${value}` : void 0;
function PopoverArrow(props) {
  var _a;
  const { bg, bgColor, backgroundColor: backgroundColor2, shadow, boxShadow, shadowColor } = props;
  const { getArrowProps, getArrowInnerProps } = usePopoverContext();
  const styles = usePopoverStyles();
  const arrowBg = (_a = bg != null ? bg : bgColor) != null ? _a : backgroundColor2;
  const arrowShadow = shadow != null ? shadow : boxShadow;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.div,
    {
      ...getArrowProps(),
      className: "chakra-popover__arrow-positioner",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        chakra.div,
        {
          className: cx("chakra-popover__arrow", props.className),
          ...getArrowInnerProps(props),
          __css: {
            "--popper-arrow-shadow-color": resolveVar("colors", shadowColor),
            "--popper-arrow-bg": resolveVar("colors", arrowBg),
            "--popper-arrow-shadow": resolveVar("shadows", arrowShadow),
            ...styles.arrow
          }
        }
      )
    }
  );
}
PopoverArrow.displayName = "PopoverArrow";
var PopoverBody = forwardRef(
  function PopoverBody2(props, ref) {
    const { getBodyProps } = usePopoverContext();
    const styles = usePopoverStyles();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.div,
      {
        ...getBodyProps(props, ref),
        className: cx("chakra-popover__body", props.className),
        __css: styles.body
      }
    );
  }
);
PopoverBody.displayName = "PopoverBody";
var PopoverCloseButton = forwardRef(
  function PopoverCloseButton2(props, ref) {
    const { onClose } = usePopoverContext();
    const styles = usePopoverStyles();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CloseButton,
      {
        size: "sm",
        onClick: onClose,
        className: cx("chakra-popover__close-btn", props.className),
        __css: styles.closeButton,
        ref,
        ...props
      }
    );
  }
);
PopoverCloseButton.displayName = "PopoverCloseButton";
function mergeVariants(variants) {
  if (!variants)
    return;
  return {
    enter: {
      ...variants.enter,
      visibility: "visible"
    },
    exit: {
      ...variants.exit,
      transitionEnd: {
        visibility: "hidden"
      }
    }
  };
}
var scaleFade = {
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1]
    }
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: [0, 0, 0.2, 1]
    }
  }
};
var MotionSection = chakra(motion.section);
var PopoverTransition = forwardRef(function PopoverTransition2(props, ref) {
  const { variants = scaleFade, ...rest } = props;
  const { isOpen } = usePopoverContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MotionSection,
    {
      ref,
      variants: mergeVariants(variants),
      initial: false,
      animate: isOpen ? "enter" : "exit",
      ...rest
    }
  );
});
PopoverTransition.displayName = "PopoverTransition";
var PopoverContent = forwardRef(
  function PopoverContent2(props, ref) {
    const { rootProps, motionProps, ...contentProps } = props;
    const { getPopoverProps, getPopoverPositionerProps, onAnimationComplete } = usePopoverContext();
    const styles = usePopoverStyles();
    const contentStyles = {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      ...styles.content
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.div,
      {
        ...getPopoverPositionerProps(rootProps),
        __css: styles.popper,
        className: "chakra-popover__popper",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PopoverTransition,
          {
            ...motionProps,
            ...getPopoverProps(contentProps, ref),
            onAnimationComplete: callAll(
              onAnimationComplete,
              contentProps.onAnimationComplete
            ),
            className: cx("chakra-popover__content", props.className),
            __css: contentStyles
          }
        )
      }
    );
  }
);
PopoverContent.displayName = "PopoverContent";
function PopoverFooter(props) {
  const styles = usePopoverStyles();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.footer,
    {
      ...props,
      className: cx("chakra-popover__footer", props.className),
      __css: styles.footer
    }
  );
}
PopoverFooter.displayName = "PopoverFooter";
var [
  TabsDescendantsProvider,
  useTabsDescendantsContext,
  useTabsDescendants,
  useTabsDescendant
] = createDescendantContext();
function useTabs(props) {
  var _a;
  const {
    defaultIndex,
    onChange,
    index,
    isManual,
    isLazy,
    lazyBehavior = "unmount",
    orientation = "horizontal",
    direction = "ltr",
    ...htmlProps
  } = props;
  const [focusedIndex, setFocusedIndex] = reactExports.useState(defaultIndex != null ? defaultIndex : 0);
  const [selectedIndex, setSelectedIndex] = useControllableState({
    defaultValue: defaultIndex != null ? defaultIndex : 0,
    value: index,
    onChange
  });
  reactExports.useEffect(() => {
    if (index != null) {
      setFocusedIndex(index);
    }
  }, [index]);
  const descendants = useTabsDescendants();
  const uuid = reactExports.useId();
  const uid = (_a = props.id) != null ? _a : uuid;
  const id = `tabs-${uid}`;
  return {
    id,
    selectedIndex,
    focusedIndex,
    setSelectedIndex,
    setFocusedIndex,
    isManual,
    isLazy,
    lazyBehavior,
    orientation,
    descendants,
    direction,
    htmlProps
  };
}
var [TabsProvider, useTabsContext] = createContext({
  name: "TabsContext",
  errorMessage: "useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />"
});
function useTabList(props) {
  const { focusedIndex, orientation, direction } = useTabsContext();
  const descendants = useTabsDescendantsContext();
  const onKeyDown = reactExports.useCallback(
    (event) => {
      const nextTab = () => {
        var _a;
        const next = descendants.nextEnabled(focusedIndex);
        if (next)
          (_a = next.node) == null ? void 0 : _a.focus();
      };
      const prevTab = () => {
        var _a;
        const prev = descendants.prevEnabled(focusedIndex);
        if (prev)
          (_a = prev.node) == null ? void 0 : _a.focus();
      };
      const firstTab = () => {
        var _a;
        const first = descendants.firstEnabled();
        if (first)
          (_a = first.node) == null ? void 0 : _a.focus();
      };
      const lastTab = () => {
        var _a;
        const last = descendants.lastEnabled();
        if (last)
          (_a = last.node) == null ? void 0 : _a.focus();
      };
      const isHorizontal = orientation === "horizontal";
      const isVertical = orientation === "vertical";
      const eventKey = event.key;
      const ArrowStart = direction === "ltr" ? "ArrowLeft" : "ArrowRight";
      const ArrowEnd = direction === "ltr" ? "ArrowRight" : "ArrowLeft";
      const keyMap = {
        [ArrowStart]: () => isHorizontal && prevTab(),
        [ArrowEnd]: () => isHorizontal && nextTab(),
        ArrowDown: () => isVertical && nextTab(),
        ArrowUp: () => isVertical && prevTab(),
        Home: firstTab,
        End: lastTab
      };
      const action = keyMap[eventKey];
      if (action) {
        event.preventDefault();
        action(event);
      }
    },
    [descendants, focusedIndex, orientation, direction]
  );
  return {
    ...props,
    role: "tablist",
    "aria-orientation": orientation,
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown)
  };
}
function useTab(props) {
  const { isDisabled: isDisabled2 = false, isFocusable: isFocusable2 = false, ...htmlProps } = props;
  const { setSelectedIndex, isManual, id, setFocusedIndex, selectedIndex } = useTabsContext();
  const { index, register } = useTabsDescendant({
    disabled: isDisabled2 && !isFocusable2
  });
  const isSelected = index === selectedIndex;
  const onClick = () => {
    setSelectedIndex(index);
  };
  const onFocus = () => {
    setFocusedIndex(index);
    const isDisabledButFocusable = isDisabled2 && isFocusable2;
    const shouldSelect = !isManual && !isDisabledButFocusable;
    if (shouldSelect) {
      setSelectedIndex(index);
    }
  };
  const clickableProps = useClickable({
    ...htmlProps,
    ref: mergeRefs(register, props.ref),
    isDisabled: isDisabled2,
    isFocusable: isFocusable2,
    onClick: callAllHandlers(props.onClick, onClick)
  });
  const type = "button";
  return {
    ...clickableProps,
    id: makeTabId(id, index),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, index),
    onFocus: isDisabled2 ? void 0 : callAllHandlers(props.onFocus, onFocus)
  };
}
var [TabPanelProvider, useTabPanelContext] = createContext({});
function useTabPanels(props) {
  const context = useTabsContext();
  const { id, selectedIndex } = context;
  const validChildren = getValidChildren(props.children);
  const children = validChildren.map(
    (child, index) => reactExports.createElement(
      TabPanelProvider,
      {
        key: index,
        value: {
          isSelected: index === selectedIndex,
          id: makeTabPanelId(id, index),
          tabId: makeTabId(id, index),
          selectedIndex
        }
      },
      child
    )
  );
  return { ...props, children };
}
function useTabPanel(props) {
  const { children, ...htmlProps } = props;
  const { isLazy, lazyBehavior } = useTabsContext();
  const { isSelected, id, tabId } = useTabPanelContext();
  const hasBeenSelected = reactExports.useRef(false);
  if (isSelected) {
    hasBeenSelected.current = true;
  }
  const shouldRenderChildren = lazyDisclosure({
    wasSelected: hasBeenSelected.current,
    isSelected,
    enabled: isLazy,
    mode: lazyBehavior
  });
  return {
    // Puts the tabpanel in the page `Tab` sequence.
    tabIndex: 0,
    ...htmlProps,
    children: shouldRenderChildren ? children : null,
    role: "tabpanel",
    "aria-labelledby": tabId,
    hidden: !isSelected,
    id
  };
}
function useTabIndicator() {
  const context = useTabsContext();
  const descendants = useTabsDescendantsContext();
  const { selectedIndex, orientation } = context;
  const isHorizontal = orientation === "horizontal";
  const isVertical = orientation === "vertical";
  const [rect, setRect] = reactExports.useState(() => {
    if (isHorizontal)
      return { left: 0, width: 0 };
    if (isVertical)
      return { top: 0, height: 0 };
    return void 0;
  });
  const [hasMeasured, setHasMeasured] = reactExports.useState(false);
  useSafeLayoutEffect$1(() => {
    if (selectedIndex == null)
      return;
    const tab = descendants.item(selectedIndex);
    if (tab == null)
      return;
    if (isHorizontal) {
      setRect({ left: tab.node.offsetLeft, width: tab.node.offsetWidth });
    }
    if (isVertical) {
      setRect({ top: tab.node.offsetTop, height: tab.node.offsetHeight });
    }
    const id = requestAnimationFrame(() => {
      setHasMeasured(true);
    });
    return () => {
      if (id) {
        cancelAnimationFrame(id);
      }
    };
  }, [selectedIndex, isHorizontal, isVertical, descendants]);
  return {
    position: "absolute",
    transitionProperty: "left, right, top, bottom, height, width",
    transitionDuration: hasMeasured ? "200ms" : "0ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    ...rect
  };
}
function makeTabId(id, index) {
  return `${id}--tab-${index}`;
}
function makeTabPanelId(id, index) {
  return `${id}--tabpanel-${index}`;
}
var [TabsStylesProvider, useTabsStyles] = createContext({
  name: `TabsStylesContext`,
  errorMessage: `useTabsStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tabs />" `
});
var Tabs = forwardRef(function Tabs2(props, ref) {
  const styles = useMultiStyleConfig("Tabs", props);
  const { children, className, ...rest } = omitThemingProps(props);
  const { htmlProps, descendants, ...ctx } = useTabs(rest);
  const context = reactExports.useMemo(() => ctx, [ctx]);
  const { isFitted: _, ...rootProps } = htmlProps;
  const tabsStyles = {
    position: "relative",
    ...styles.root
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TabsDescendantsProvider, { value: descendants, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsProvider, { value: context, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsStylesProvider, { value: styles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.div,
    {
      className: cx("chakra-tabs", className),
      ref,
      ...rootProps,
      __css: tabsStyles,
      children
    }
  ) }) }) });
});
Tabs.displayName = "Tabs";
var TabIndicator = forwardRef(
  function TabIndicator2(props, ref) {
    const indicatorStyle = useTabIndicator();
    const style2 = {
      ...props.style,
      ...indicatorStyle
    };
    const styles = useTabsStyles();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.div,
      {
        ref,
        ...props,
        className: cx("chakra-tabs__tab-indicator", props.className),
        style: style2,
        __css: styles.indicator
      }
    );
  }
);
TabIndicator.displayName = "TabIndicator";
var TabList = forwardRef(function TabList2(props, ref) {
  const tablistProps = useTabList({ ...props, ref });
  const styles = useTabsStyles();
  const tablistStyles = {
    display: "flex",
    ...styles.tablist
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.div,
    {
      ...tablistProps,
      className: cx("chakra-tabs__tablist", props.className),
      __css: tablistStyles
    }
  );
});
TabList.displayName = "TabList";
var TabPanel = forwardRef(function TabPanel2(props, ref) {
  const panelProps = useTabPanel({ ...props, ref });
  const styles = useTabsStyles();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.div,
    {
      outline: "0",
      ...panelProps,
      className: cx("chakra-tabs__tab-panel", props.className),
      __css: styles.tabpanel
    }
  );
});
TabPanel.displayName = "TabPanel";
var TabPanels = forwardRef(function TabPanels2(props, ref) {
  const panelsProps = useTabPanels(props);
  const styles = useTabsStyles();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.div,
    {
      ...panelsProps,
      width: "100%",
      ref,
      className: cx("chakra-tabs__tab-panels", props.className),
      __css: styles.tabpanels
    }
  );
});
TabPanels.displayName = "TabPanels";
var Tab = forwardRef(function Tab2(props, ref) {
  const styles = useTabsStyles();
  const tabProps = useTab({ ...props, ref });
  const tabStyles = {
    outline: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...styles.tab
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.button,
    {
      ...tabProps,
      className: cx("chakra-tabs__tab", props.className),
      __css: tabStyles
    }
  );
});
Tab.displayName = "Tab";
function omit(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}
var omitted = ["h", "minH", "height", "minHeight"];
var Textarea = forwardRef((props, ref) => {
  const styles = useStyleConfig("Textarea", props);
  const { className, rows, ...rest } = omitThemingProps(props);
  const textareaProps = useFormControl(rest);
  const textareaStyles = rows ? omit(styles, omitted) : styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.textarea,
    {
      ref,
      rows,
      ...textareaProps,
      className: cx("chakra-textarea", className),
      __css: textareaStyles
    }
  );
});
Textarea.displayName = "Textarea";
const injectedStyle = ".tnc-crawler-content-container * {\n   box-sizing: border-box !important;\n   margin: 0 !important;\n   padding: 0 !important;\n   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;\n}";
var cssUnit = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  "%": true
};
function parseLengthAndUnit(size) {
  if (typeof size === "number") {
    return {
      value: size,
      unit: "px"
    };
  }
  var value;
  var valueString = (size.match(/^[0-9.]*/) || "").toString();
  if (valueString.includes(".")) {
    value = parseFloat(valueString);
  } else {
    value = parseInt(valueString, 10);
  }
  var unit = (size.match(/[^0-9]*$/) || "").toString();
  if (cssUnit[unit]) {
    return {
      value,
      unit
    };
  }
  console.warn("React Spinners: ".concat(size, " is not a valid css value. Defaulting to ").concat(value, "px."));
  return {
    value,
    unit: "px"
  };
}
function cssValue(value) {
  var lengthWithunit = parseLengthAndUnit(value);
  return "".concat(lengthWithunit.value).concat(lengthWithunit.unit);
}
var createAnimation = function(loaderName, frames, suffix) {
  var animationName = "react-spinners-".concat(loaderName, "-").concat(suffix);
  if (typeof window == "undefined" || !window.document) {
    return animationName;
  }
  var styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  var styleSheet = styleEl.sheet;
  var keyFrames = "\n    @keyframes ".concat(animationName, " {\n      ").concat(frames, "\n    }\n  ");
  if (styleSheet) {
    styleSheet.insertRule(keyFrames, 0);
  }
  return animationName;
};
var __assign = function() {
  __assign = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e2) {
  var t2 = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e2.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i]))
        t2[p2[i]] = s[p2[i]];
    }
  return t2;
};
var bounce = createAnimation("BounceLoader", "0% {transform: scale(0)} 50% {transform: scale(1.0)} 100% {transform: scale(0)}", "bounce");
function BounceLoader(_a) {
  var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color2 = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.size, size = _f === void 0 ? 60 : _f, additionalprops = __rest(_a, ["loading", "color", "speedMultiplier", "cssOverride", "size"]);
  var style2 = function(i) {
    var animationTiming = i === 1 ? "".concat(1 / speedMultiplier, "s") : "0s";
    return {
      position: "absolute",
      height: cssValue(size),
      width: cssValue(size),
      backgroundColor: color2,
      borderRadius: "100%",
      opacity: 0.6,
      top: 0,
      left: 0,
      animationFillMode: "both",
      animation: "".concat(bounce, " ").concat(2.1 / speedMultiplier, "s ").concat(animationTiming, " infinite ease-in-out")
    };
  };
  var wrapper = __assign({ display: "inherit", position: "relative", width: cssValue(size), height: cssValue(size) }, cssOverride);
  if (!loading) {
    return null;
  }
  return reactExports.createElement(
    "span",
    __assign({ style: wrapper }, additionalprops),
    reactExports.createElement("span", { style: style2(1) }),
    reactExports.createElement("span", { style: style2(2) })
  );
}
var showdown = { exports: {} };
(function(module) {
  (function() {
    function getDefaultOpts(simple) {
      var defaultOptions2 = {
        omitExtraWLInCodeBlocks: {
          defaultValue: false,
          describe: "Omit the default extra whiteline added to code blocks",
          type: "boolean"
        },
        noHeaderId: {
          defaultValue: false,
          describe: "Turn on/off generated header id",
          type: "boolean"
        },
        prefixHeaderId: {
          defaultValue: false,
          describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
          type: "string"
        },
        rawPrefixHeaderId: {
          defaultValue: false,
          describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
          type: "boolean"
        },
        ghCompatibleHeaderId: {
          defaultValue: false,
          describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
          type: "boolean"
        },
        rawHeaderId: {
          defaultValue: false,
          describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`,
          type: "boolean"
        },
        headerLevelStart: {
          defaultValue: false,
          describe: "The header blocks level start",
          type: "integer"
        },
        parseImgDimensions: {
          defaultValue: false,
          describe: "Turn on/off image dimension parsing",
          type: "boolean"
        },
        simplifiedAutoLink: {
          defaultValue: false,
          describe: "Turn on/off GFM autolink style",
          type: "boolean"
        },
        excludeTrailingPunctuationFromURLs: {
          defaultValue: false,
          describe: "Excludes trailing punctuation from links generated with autoLinking",
          type: "boolean"
        },
        literalMidWordUnderscores: {
          defaultValue: false,
          describe: "Parse midword underscores as literal underscores",
          type: "boolean"
        },
        literalMidWordAsterisks: {
          defaultValue: false,
          describe: "Parse midword asterisks as literal asterisks",
          type: "boolean"
        },
        strikethrough: {
          defaultValue: false,
          describe: "Turn on/off strikethrough support",
          type: "boolean"
        },
        tables: {
          defaultValue: false,
          describe: "Turn on/off tables support",
          type: "boolean"
        },
        tablesHeaderId: {
          defaultValue: false,
          describe: "Add an id to table headers",
          type: "boolean"
        },
        ghCodeBlocks: {
          defaultValue: true,
          describe: "Turn on/off GFM fenced code blocks support",
          type: "boolean"
        },
        tasklists: {
          defaultValue: false,
          describe: "Turn on/off GFM tasklist support",
          type: "boolean"
        },
        smoothLivePreview: {
          defaultValue: false,
          describe: "Prevents weird effects in live previews due to incomplete input",
          type: "boolean"
        },
        smartIndentationFix: {
          defaultValue: false,
          describe: "Tries to smartly fix indentation in es6 strings",
          type: "boolean"
        },
        disableForced4SpacesIndentedSublists: {
          defaultValue: false,
          describe: "Disables the requirement of indenting nested sublists by 4 spaces",
          type: "boolean"
        },
        simpleLineBreaks: {
          defaultValue: false,
          describe: "Parses simple line breaks as <br> (GFM Style)",
          type: "boolean"
        },
        requireSpaceBeforeHeadingText: {
          defaultValue: false,
          describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)",
          type: "boolean"
        },
        ghMentions: {
          defaultValue: false,
          describe: "Enables github @mentions",
          type: "boolean"
        },
        ghMentionsLink: {
          defaultValue: "https://github.com/{u}",
          describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
          type: "string"
        },
        encodeEmails: {
          defaultValue: true,
          describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
          type: "boolean"
        },
        openLinksInNewWindow: {
          defaultValue: false,
          describe: "Open all links in new windows",
          type: "boolean"
        },
        backslashEscapesHTMLTags: {
          defaultValue: false,
          describe: "Support for HTML Tag escaping. ex: <div>foo</div>",
          type: "boolean"
        },
        emoji: {
          defaultValue: false,
          describe: "Enable emoji support. Ex: `this is a :smile: emoji`",
          type: "boolean"
        },
        underline: {
          defaultValue: false,
          describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
          type: "boolean"
        },
        ellipsis: {
          defaultValue: true,
          describe: "Replaces three dots with the ellipsis unicode character",
          type: "boolean"
        },
        completeHTMLDocument: {
          defaultValue: false,
          describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
          type: "boolean"
        },
        metadata: {
          defaultValue: false,
          describe: "Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).",
          type: "boolean"
        },
        splitAdjacentBlockquotes: {
          defaultValue: false,
          describe: "Split adjacent blockquote blocks",
          type: "boolean"
        }
      };
      if (simple === false) {
        return JSON.parse(JSON.stringify(defaultOptions2));
      }
      var ret = {};
      for (var opt in defaultOptions2) {
        if (defaultOptions2.hasOwnProperty(opt)) {
          ret[opt] = defaultOptions2[opt].defaultValue;
        }
      }
      return ret;
    }
    function allOptionsOn() {
      var options = getDefaultOpts(true), ret = {};
      for (var opt in options) {
        if (options.hasOwnProperty(opt)) {
          ret[opt] = true;
        }
      }
      return ret;
    }
    var showdown2 = {}, parsers = {}, extensions = {}, globalOptions = getDefaultOpts(true), setFlavor = "vanilla", flavor = {
      github: {
        omitExtraWLInCodeBlocks: true,
        simplifiedAutoLink: true,
        excludeTrailingPunctuationFromURLs: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true,
        disableForced4SpacesIndentedSublists: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        ghCompatibleHeaderId: true,
        ghMentions: true,
        backslashEscapesHTMLTags: true,
        emoji: true,
        splitAdjacentBlockquotes: true
      },
      original: {
        noHeaderId: true,
        ghCodeBlocks: false
      },
      ghost: {
        omitExtraWLInCodeBlocks: true,
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        excludeTrailingPunctuationFromURLs: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true,
        smoothLivePreview: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        ghMentions: false,
        encodeEmails: true
      },
      vanilla: getDefaultOpts(true),
      allOn: allOptionsOn()
    };
    showdown2.helper = {};
    showdown2.extensions = {};
    showdown2.setOption = function(key, value) {
      globalOptions[key] = value;
      return this;
    };
    showdown2.getOption = function(key) {
      return globalOptions[key];
    };
    showdown2.getOptions = function() {
      return globalOptions;
    };
    showdown2.resetOptions = function() {
      globalOptions = getDefaultOpts(true);
    };
    showdown2.setFlavor = function(name) {
      if (!flavor.hasOwnProperty(name)) {
        throw Error(name + " flavor was not found");
      }
      showdown2.resetOptions();
      var preset = flavor[name];
      setFlavor = name;
      for (var option in preset) {
        if (preset.hasOwnProperty(option)) {
          globalOptions[option] = preset[option];
        }
      }
    };
    showdown2.getFlavor = function() {
      return setFlavor;
    };
    showdown2.getFlavorOptions = function(name) {
      if (flavor.hasOwnProperty(name)) {
        return flavor[name];
      }
    };
    showdown2.getDefaultOptions = function(simple) {
      return getDefaultOpts(simple);
    };
    showdown2.subParser = function(name, func) {
      if (showdown2.helper.isString(name)) {
        if (typeof func !== "undefined") {
          parsers[name] = func;
        } else {
          if (parsers.hasOwnProperty(name)) {
            return parsers[name];
          } else {
            throw Error("SubParser named " + name + " not registered!");
          }
        }
      }
    };
    showdown2.extension = function(name, ext) {
      if (!showdown2.helper.isString(name)) {
        throw Error("Extension 'name' must be a string");
      }
      name = showdown2.helper.stdExtName(name);
      if (showdown2.helper.isUndefined(ext)) {
        if (!extensions.hasOwnProperty(name)) {
          throw Error("Extension named " + name + " is not registered!");
        }
        return extensions[name];
      } else {
        if (typeof ext === "function") {
          ext = ext();
        }
        if (!showdown2.helper.isArray(ext)) {
          ext = [ext];
        }
        var validExtension = validate(ext, name);
        if (validExtension.valid) {
          extensions[name] = ext;
        } else {
          throw Error(validExtension.error);
        }
      }
    };
    showdown2.getAllExtensions = function() {
      return extensions;
    };
    showdown2.removeExtension = function(name) {
      delete extensions[name];
    };
    showdown2.resetExtensions = function() {
      extensions = {};
    };
    function validate(extension, name) {
      var errMsg = name ? "Error in " + name + " extension->" : "Error in unnamed extension", ret = {
        valid: true,
        error: ""
      };
      if (!showdown2.helper.isArray(extension)) {
        extension = [extension];
      }
      for (var i = 0; i < extension.length; ++i) {
        var baseMsg = errMsg + " sub-extension " + i + ": ", ext = extension[i];
        if (typeof ext !== "object") {
          ret.valid = false;
          ret.error = baseMsg + "must be an object, but " + typeof ext + " given";
          return ret;
        }
        if (!showdown2.helper.isString(ext.type)) {
          ret.valid = false;
          ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + " given";
          return ret;
        }
        var type = ext.type = ext.type.toLowerCase();
        if (type === "language") {
          type = ext.type = "lang";
        }
        if (type === "html") {
          type = ext.type = "output";
        }
        if (type !== "lang" && type !== "output" && type !== "listener") {
          ret.valid = false;
          ret.error = baseMsg + "type " + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
          return ret;
        }
        if (type === "listener") {
          if (showdown2.helper.isUndefined(ext.listeners)) {
            ret.valid = false;
            ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
            return ret;
          }
        } else {
          if (showdown2.helper.isUndefined(ext.filter) && showdown2.helper.isUndefined(ext.regex)) {
            ret.valid = false;
            ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
            return ret;
          }
        }
        if (ext.listeners) {
          if (typeof ext.listeners !== "object") {
            ret.valid = false;
            ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + " given";
            return ret;
          }
          for (var ln in ext.listeners) {
            if (ext.listeners.hasOwnProperty(ln)) {
              if (typeof ext.listeners[ln] !== "function") {
                ret.valid = false;
                ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln + " must be a function but " + typeof ext.listeners[ln] + " given";
                return ret;
              }
            }
          }
        }
        if (ext.filter) {
          if (typeof ext.filter !== "function") {
            ret.valid = false;
            ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + " given";
            return ret;
          }
        } else if (ext.regex) {
          if (showdown2.helper.isString(ext.regex)) {
            ext.regex = new RegExp(ext.regex, "g");
          }
          if (!(ext.regex instanceof RegExp)) {
            ret.valid = false;
            ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + " given";
            return ret;
          }
          if (showdown2.helper.isUndefined(ext.replace)) {
            ret.valid = false;
            ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
            return ret;
          }
        }
      }
      return ret;
    }
    showdown2.validateExtension = function(ext) {
      var validateExtension = validate(ext, null);
      if (!validateExtension.valid) {
        console.warn(validateExtension.error);
        return false;
      }
      return true;
    };
    if (!showdown2.hasOwnProperty("helper")) {
      showdown2.helper = {};
    }
    showdown2.helper.isString = function(a) {
      return typeof a === "string" || a instanceof String;
    };
    showdown2.helper.isFunction = function(a) {
      var getType = {};
      return a && getType.toString.call(a) === "[object Function]";
    };
    showdown2.helper.isArray = function(a) {
      return Array.isArray(a);
    };
    showdown2.helper.isUndefined = function(value) {
      return typeof value === "undefined";
    };
    showdown2.helper.forEach = function(obj, callback) {
      if (showdown2.helper.isUndefined(obj)) {
        throw new Error("obj param is required");
      }
      if (showdown2.helper.isUndefined(callback)) {
        throw new Error("callback param is required");
      }
      if (!showdown2.helper.isFunction(callback)) {
        throw new Error("callback param must be a function/closure");
      }
      if (typeof obj.forEach === "function") {
        obj.forEach(callback);
      } else if (showdown2.helper.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          callback(obj[i], i, obj);
        }
      } else if (typeof obj === "object") {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            callback(obj[prop], prop, obj);
          }
        }
      } else {
        throw new Error("obj does not seem to be an array or an iterable object");
      }
    };
    showdown2.helper.stdExtName = function(s) {
      return s.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
    };
    function escapeCharactersCallback(wholeMatch, m1) {
      var charCodeToEscape = m1.charCodeAt(0);
      return "¨E" + charCodeToEscape + "E";
    }
    showdown2.helper.escapeCharactersCallback = escapeCharactersCallback;
    showdown2.helper.escapeCharacters = function(text, charsToEscape, afterBackslash) {
      var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
      if (afterBackslash) {
        regexString = "\\\\" + regexString;
      }
      var regex = new RegExp(regexString, "g");
      text = text.replace(regex, escapeCharactersCallback);
      return text;
    };
    showdown2.helper.unescapeHTMLEntities = function(txt) {
      return txt.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    };
    var rgxFindMatchPos = function(str, left2, right2, flags) {
      var f2 = flags || "", g2 = f2.indexOf("g") > -1, x = new RegExp(left2 + "|" + right2, "g" + f2.replace(/g/g, "")), l2 = new RegExp(left2, f2.replace(/g/g, "")), pos = [], t2, s, m2, start2, end2;
      do {
        t2 = 0;
        while (m2 = x.exec(str)) {
          if (l2.test(m2[0])) {
            if (!t2++) {
              s = x.lastIndex;
              start2 = s - m2[0].length;
            }
          } else if (t2) {
            if (!--t2) {
              end2 = m2.index + m2[0].length;
              var obj = {
                left: { start: start2, end: s },
                match: { start: s, end: m2.index },
                right: { start: m2.index, end: end2 },
                wholeMatch: { start: start2, end: end2 }
              };
              pos.push(obj);
              if (!g2) {
                return pos;
              }
            }
          }
        }
      } while (t2 && (x.lastIndex = s));
      return pos;
    };
    showdown2.helper.matchRecursiveRegExp = function(str, left2, right2, flags) {
      var matchPos = rgxFindMatchPos(str, left2, right2, flags), results = [];
      for (var i = 0; i < matchPos.length; ++i) {
        results.push([
          str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
          str.slice(matchPos[i].match.start, matchPos[i].match.end),
          str.slice(matchPos[i].left.start, matchPos[i].left.end),
          str.slice(matchPos[i].right.start, matchPos[i].right.end)
        ]);
      }
      return results;
    };
    showdown2.helper.replaceRecursiveRegExp = function(str, replacement, left2, right2, flags) {
      if (!showdown2.helper.isFunction(replacement)) {
        var repStr = replacement;
        replacement = function() {
          return repStr;
        };
      }
      var matchPos = rgxFindMatchPos(str, left2, right2, flags), finalStr = str, lng = matchPos.length;
      if (lng > 0) {
        var bits = [];
        if (matchPos[0].wholeMatch.start !== 0) {
          bits.push(str.slice(0, matchPos[0].wholeMatch.start));
        }
        for (var i = 0; i < lng; ++i) {
          bits.push(
            replacement(
              str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
              str.slice(matchPos[i].match.start, matchPos[i].match.end),
              str.slice(matchPos[i].left.start, matchPos[i].left.end),
              str.slice(matchPos[i].right.start, matchPos[i].right.end)
            )
          );
          if (i < lng - 1) {
            bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
          }
        }
        if (matchPos[lng - 1].wholeMatch.end < str.length) {
          bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
        }
        finalStr = bits.join("");
      }
      return finalStr;
    };
    showdown2.helper.regexIndexOf = function(str, regex, fromIndex) {
      if (!showdown2.helper.isString(str)) {
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      }
      if (regex instanceof RegExp === false) {
        throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
      }
      var indexOf = str.substring(fromIndex || 0).search(regex);
      return indexOf >= 0 ? indexOf + (fromIndex || 0) : indexOf;
    };
    showdown2.helper.splitAtIndex = function(str, index) {
      if (!showdown2.helper.isString(str)) {
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      }
      return [str.substring(0, index), str.substring(index)];
    };
    showdown2.helper.encodeEmailAddress = function(mail) {
      var encode = [
        function(ch) {
          return "&#" + ch.charCodeAt(0) + ";";
        },
        function(ch) {
          return "&#x" + ch.charCodeAt(0).toString(16) + ";";
        },
        function(ch) {
          return ch;
        }
      ];
      mail = mail.replace(/./g, function(ch) {
        if (ch === "@") {
          ch = encode[Math.floor(Math.random() * 2)](ch);
        } else {
          var r2 = Math.random();
          ch = r2 > 0.9 ? encode[2](ch) : r2 > 0.45 ? encode[1](ch) : encode[0](ch);
        }
        return ch;
      });
      return mail;
    };
    showdown2.helper.padEnd = function padEnd(str, targetLength, padString) {
      targetLength = targetLength >> 0;
      padString = String(padString || " ");
      if (str.length > targetLength) {
        return String(str);
      } else {
        targetLength = targetLength - str.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length);
        }
        return String(str) + padString.slice(0, targetLength);
      }
    };
    if (typeof console === "undefined") {
      console = {
        warn: function(msg) {
          alert(msg);
        },
        log: function(msg) {
          alert(msg);
        },
        error: function(msg) {
          throw msg;
        }
      };
    }
    showdown2.helper.regexes = {
      asteriskDashAndColon: /([*_:~])/g
    };
    showdown2.helper.emojis = {
      "+1": "👍",
      "-1": "👎",
      "100": "💯",
      "1234": "🔢",
      "1st_place_medal": "🥇",
      "2nd_place_medal": "🥈",
      "3rd_place_medal": "🥉",
      "8ball": "🎱",
      "a": "🅰️",
      "ab": "🆎",
      "abc": "🔤",
      "abcd": "🔡",
      "accept": "🉑",
      "aerial_tramway": "🚡",
      "airplane": "✈️",
      "alarm_clock": "⏰",
      "alembic": "⚗️",
      "alien": "👽",
      "ambulance": "🚑",
      "amphora": "🏺",
      "anchor": "⚓️",
      "angel": "👼",
      "anger": "💢",
      "angry": "😠",
      "anguished": "😧",
      "ant": "🐜",
      "apple": "🍎",
      "aquarius": "♒️",
      "aries": "♈️",
      "arrow_backward": "◀️",
      "arrow_double_down": "⏬",
      "arrow_double_up": "⏫",
      "arrow_down": "⬇️",
      "arrow_down_small": "🔽",
      "arrow_forward": "▶️",
      "arrow_heading_down": "⤵️",
      "arrow_heading_up": "⤴️",
      "arrow_left": "⬅️",
      "arrow_lower_left": "↙️",
      "arrow_lower_right": "↘️",
      "arrow_right": "➡️",
      "arrow_right_hook": "↪️",
      "arrow_up": "⬆️",
      "arrow_up_down": "↕️",
      "arrow_up_small": "🔼",
      "arrow_upper_left": "↖️",
      "arrow_upper_right": "↗️",
      "arrows_clockwise": "🔃",
      "arrows_counterclockwise": "🔄",
      "art": "🎨",
      "articulated_lorry": "🚛",
      "artificial_satellite": "🛰",
      "astonished": "😲",
      "athletic_shoe": "👟",
      "atm": "🏧",
      "atom_symbol": "⚛️",
      "avocado": "🥑",
      "b": "🅱️",
      "baby": "👶",
      "baby_bottle": "🍼",
      "baby_chick": "🐤",
      "baby_symbol": "🚼",
      "back": "🔙",
      "bacon": "🥓",
      "badminton": "🏸",
      "baggage_claim": "🛄",
      "baguette_bread": "🥖",
      "balance_scale": "⚖️",
      "balloon": "🎈",
      "ballot_box": "🗳",
      "ballot_box_with_check": "☑️",
      "bamboo": "🎍",
      "banana": "🍌",
      "bangbang": "‼️",
      "bank": "🏦",
      "bar_chart": "📊",
      "barber": "💈",
      "baseball": "⚾️",
      "basketball": "🏀",
      "basketball_man": "⛹️",
      "basketball_woman": "⛹️&zwj;♀️",
      "bat": "🦇",
      "bath": "🛀",
      "bathtub": "🛁",
      "battery": "🔋",
      "beach_umbrella": "🏖",
      "bear": "🐻",
      "bed": "🛏",
      "bee": "🐝",
      "beer": "🍺",
      "beers": "🍻",
      "beetle": "🐞",
      "beginner": "🔰",
      "bell": "🔔",
      "bellhop_bell": "🛎",
      "bento": "🍱",
      "biking_man": "🚴",
      "bike": "🚲",
      "biking_woman": "🚴&zwj;♀️",
      "bikini": "👙",
      "biohazard": "☣️",
      "bird": "🐦",
      "birthday": "🎂",
      "black_circle": "⚫️",
      "black_flag": "🏴",
      "black_heart": "🖤",
      "black_joker": "🃏",
      "black_large_square": "⬛️",
      "black_medium_small_square": "◾️",
      "black_medium_square": "◼️",
      "black_nib": "✒️",
      "black_small_square": "▪️",
      "black_square_button": "🔲",
      "blonde_man": "👱",
      "blonde_woman": "👱&zwj;♀️",
      "blossom": "🌼",
      "blowfish": "🐡",
      "blue_book": "📘",
      "blue_car": "🚙",
      "blue_heart": "💙",
      "blush": "😊",
      "boar": "🐗",
      "boat": "⛵️",
      "bomb": "💣",
      "book": "📖",
      "bookmark": "🔖",
      "bookmark_tabs": "📑",
      "books": "📚",
      "boom": "💥",
      "boot": "👢",
      "bouquet": "💐",
      "bowing_man": "🙇",
      "bow_and_arrow": "🏹",
      "bowing_woman": "🙇&zwj;♀️",
      "bowling": "🎳",
      "boxing_glove": "🥊",
      "boy": "👦",
      "bread": "🍞",
      "bride_with_veil": "👰",
      "bridge_at_night": "🌉",
      "briefcase": "💼",
      "broken_heart": "💔",
      "bug": "🐛",
      "building_construction": "🏗",
      "bulb": "💡",
      "bullettrain_front": "🚅",
      "bullettrain_side": "🚄",
      "burrito": "🌯",
      "bus": "🚌",
      "business_suit_levitating": "🕴",
      "busstop": "🚏",
      "bust_in_silhouette": "👤",
      "busts_in_silhouette": "👥",
      "butterfly": "🦋",
      "cactus": "🌵",
      "cake": "🍰",
      "calendar": "📆",
      "call_me_hand": "🤙",
      "calling": "📲",
      "camel": "🐫",
      "camera": "📷",
      "camera_flash": "📸",
      "camping": "🏕",
      "cancer": "♋️",
      "candle": "🕯",
      "candy": "🍬",
      "canoe": "🛶",
      "capital_abcd": "🔠",
      "capricorn": "♑️",
      "car": "🚗",
      "card_file_box": "🗃",
      "card_index": "📇",
      "card_index_dividers": "🗂",
      "carousel_horse": "🎠",
      "carrot": "🥕",
      "cat": "🐱",
      "cat2": "🐈",
      "cd": "💿",
      "chains": "⛓",
      "champagne": "🍾",
      "chart": "💹",
      "chart_with_downwards_trend": "📉",
      "chart_with_upwards_trend": "📈",
      "checkered_flag": "🏁",
      "cheese": "🧀",
      "cherries": "🍒",
      "cherry_blossom": "🌸",
      "chestnut": "🌰",
      "chicken": "🐔",
      "children_crossing": "🚸",
      "chipmunk": "🐿",
      "chocolate_bar": "🍫",
      "christmas_tree": "🎄",
      "church": "⛪️",
      "cinema": "🎦",
      "circus_tent": "🎪",
      "city_sunrise": "🌇",
      "city_sunset": "🌆",
      "cityscape": "🏙",
      "cl": "🆑",
      "clamp": "🗜",
      "clap": "👏",
      "clapper": "🎬",
      "classical_building": "🏛",
      "clinking_glasses": "🥂",
      "clipboard": "📋",
      "clock1": "🕐",
      "clock10": "🕙",
      "clock1030": "🕥",
      "clock11": "🕚",
      "clock1130": "🕦",
      "clock12": "🕛",
      "clock1230": "🕧",
      "clock130": "🕜",
      "clock2": "🕑",
      "clock230": "🕝",
      "clock3": "🕒",
      "clock330": "🕞",
      "clock4": "🕓",
      "clock430": "🕟",
      "clock5": "🕔",
      "clock530": "🕠",
      "clock6": "🕕",
      "clock630": "🕡",
      "clock7": "🕖",
      "clock730": "🕢",
      "clock8": "🕗",
      "clock830": "🕣",
      "clock9": "🕘",
      "clock930": "🕤",
      "closed_book": "📕",
      "closed_lock_with_key": "🔐",
      "closed_umbrella": "🌂",
      "cloud": "☁️",
      "cloud_with_lightning": "🌩",
      "cloud_with_lightning_and_rain": "⛈",
      "cloud_with_rain": "🌧",
      "cloud_with_snow": "🌨",
      "clown_face": "🤡",
      "clubs": "♣️",
      "cocktail": "🍸",
      "coffee": "☕️",
      "coffin": "⚰️",
      "cold_sweat": "😰",
      "comet": "☄️",
      "computer": "💻",
      "computer_mouse": "🖱",
      "confetti_ball": "🎊",
      "confounded": "😖",
      "confused": "😕",
      "congratulations": "㊗️",
      "construction": "🚧",
      "construction_worker_man": "👷",
      "construction_worker_woman": "👷&zwj;♀️",
      "control_knobs": "🎛",
      "convenience_store": "🏪",
      "cookie": "🍪",
      "cool": "🆒",
      "policeman": "👮",
      "copyright": "©️",
      "corn": "🌽",
      "couch_and_lamp": "🛋",
      "couple": "👫",
      "couple_with_heart_woman_man": "💑",
      "couple_with_heart_man_man": "👨&zwj;❤️&zwj;👨",
      "couple_with_heart_woman_woman": "👩&zwj;❤️&zwj;👩",
      "couplekiss_man_man": "👨&zwj;❤️&zwj;💋&zwj;👨",
      "couplekiss_man_woman": "💏",
      "couplekiss_woman_woman": "👩&zwj;❤️&zwj;💋&zwj;👩",
      "cow": "🐮",
      "cow2": "🐄",
      "cowboy_hat_face": "🤠",
      "crab": "🦀",
      "crayon": "🖍",
      "credit_card": "💳",
      "crescent_moon": "🌙",
      "cricket": "🏏",
      "crocodile": "🐊",
      "croissant": "🥐",
      "crossed_fingers": "🤞",
      "crossed_flags": "🎌",
      "crossed_swords": "⚔️",
      "crown": "👑",
      "cry": "😢",
      "crying_cat_face": "😿",
      "crystal_ball": "🔮",
      "cucumber": "🥒",
      "cupid": "💘",
      "curly_loop": "➰",
      "currency_exchange": "💱",
      "curry": "🍛",
      "custard": "🍮",
      "customs": "🛃",
      "cyclone": "🌀",
      "dagger": "🗡",
      "dancer": "💃",
      "dancing_women": "👯",
      "dancing_men": "👯&zwj;♂️",
      "dango": "🍡",
      "dark_sunglasses": "🕶",
      "dart": "🎯",
      "dash": "💨",
      "date": "📅",
      "deciduous_tree": "🌳",
      "deer": "🦌",
      "department_store": "🏬",
      "derelict_house": "🏚",
      "desert": "🏜",
      "desert_island": "🏝",
      "desktop_computer": "🖥",
      "male_detective": "🕵️",
      "diamond_shape_with_a_dot_inside": "💠",
      "diamonds": "♦️",
      "disappointed": "😞",
      "disappointed_relieved": "😥",
      "dizzy": "💫",
      "dizzy_face": "😵",
      "do_not_litter": "🚯",
      "dog": "🐶",
      "dog2": "🐕",
      "dollar": "💵",
      "dolls": "🎎",
      "dolphin": "🐬",
      "door": "🚪",
      "doughnut": "🍩",
      "dove": "🕊",
      "dragon": "🐉",
      "dragon_face": "🐲",
      "dress": "👗",
      "dromedary_camel": "🐪",
      "drooling_face": "🤤",
      "droplet": "💧",
      "drum": "🥁",
      "duck": "🦆",
      "dvd": "📀",
      "e-mail": "📧",
      "eagle": "🦅",
      "ear": "👂",
      "ear_of_rice": "🌾",
      "earth_africa": "🌍",
      "earth_americas": "🌎",
      "earth_asia": "🌏",
      "egg": "🥚",
      "eggplant": "🍆",
      "eight_pointed_black_star": "✴️",
      "eight_spoked_asterisk": "✳️",
      "electric_plug": "🔌",
      "elephant": "🐘",
      "email": "✉️",
      "end": "🔚",
      "envelope_with_arrow": "📩",
      "euro": "💶",
      "european_castle": "🏰",
      "european_post_office": "🏤",
      "evergreen_tree": "🌲",
      "exclamation": "❗️",
      "expressionless": "😑",
      "eye": "👁",
      "eye_speech_bubble": "👁&zwj;🗨",
      "eyeglasses": "👓",
      "eyes": "👀",
      "face_with_head_bandage": "🤕",
      "face_with_thermometer": "🤒",
      "fist_oncoming": "👊",
      "factory": "🏭",
      "fallen_leaf": "🍂",
      "family_man_woman_boy": "👪",
      "family_man_boy": "👨&zwj;👦",
      "family_man_boy_boy": "👨&zwj;👦&zwj;👦",
      "family_man_girl": "👨&zwj;👧",
      "family_man_girl_boy": "👨&zwj;👧&zwj;👦",
      "family_man_girl_girl": "👨&zwj;👧&zwj;👧",
      "family_man_man_boy": "👨&zwj;👨&zwj;👦",
      "family_man_man_boy_boy": "👨&zwj;👨&zwj;👦&zwj;👦",
      "family_man_man_girl": "👨&zwj;👨&zwj;👧",
      "family_man_man_girl_boy": "👨&zwj;👨&zwj;👧&zwj;👦",
      "family_man_man_girl_girl": "👨&zwj;👨&zwj;👧&zwj;👧",
      "family_man_woman_boy_boy": "👨&zwj;👩&zwj;👦&zwj;👦",
      "family_man_woman_girl": "👨&zwj;👩&zwj;👧",
      "family_man_woman_girl_boy": "👨&zwj;👩&zwj;👧&zwj;👦",
      "family_man_woman_girl_girl": "👨&zwj;👩&zwj;👧&zwj;👧",
      "family_woman_boy": "👩&zwj;👦",
      "family_woman_boy_boy": "👩&zwj;👦&zwj;👦",
      "family_woman_girl": "👩&zwj;👧",
      "family_woman_girl_boy": "👩&zwj;👧&zwj;👦",
      "family_woman_girl_girl": "👩&zwj;👧&zwj;👧",
      "family_woman_woman_boy": "👩&zwj;👩&zwj;👦",
      "family_woman_woman_boy_boy": "👩&zwj;👩&zwj;👦&zwj;👦",
      "family_woman_woman_girl": "👩&zwj;👩&zwj;👧",
      "family_woman_woman_girl_boy": "👩&zwj;👩&zwj;👧&zwj;👦",
      "family_woman_woman_girl_girl": "👩&zwj;👩&zwj;👧&zwj;👧",
      "fast_forward": "⏩",
      "fax": "📠",
      "fearful": "😨",
      "feet": "🐾",
      "female_detective": "🕵️&zwj;♀️",
      "ferris_wheel": "🎡",
      "ferry": "⛴",
      "field_hockey": "🏑",
      "file_cabinet": "🗄",
      "file_folder": "📁",
      "film_projector": "📽",
      "film_strip": "🎞",
      "fire": "🔥",
      "fire_engine": "🚒",
      "fireworks": "🎆",
      "first_quarter_moon": "🌓",
      "first_quarter_moon_with_face": "🌛",
      "fish": "🐟",
      "fish_cake": "🍥",
      "fishing_pole_and_fish": "🎣",
      "fist_raised": "✊",
      "fist_left": "🤛",
      "fist_right": "🤜",
      "flags": "🎏",
      "flashlight": "🔦",
      "fleur_de_lis": "⚜️",
      "flight_arrival": "🛬",
      "flight_departure": "🛫",
      "floppy_disk": "💾",
      "flower_playing_cards": "🎴",
      "flushed": "😳",
      "fog": "🌫",
      "foggy": "🌁",
      "football": "🏈",
      "footprints": "👣",
      "fork_and_knife": "🍴",
      "fountain": "⛲️",
      "fountain_pen": "🖋",
      "four_leaf_clover": "🍀",
      "fox_face": "🦊",
      "framed_picture": "🖼",
      "free": "🆓",
      "fried_egg": "🍳",
      "fried_shrimp": "🍤",
      "fries": "🍟",
      "frog": "🐸",
      "frowning": "😦",
      "frowning_face": "☹️",
      "frowning_man": "🙍&zwj;♂️",
      "frowning_woman": "🙍",
      "middle_finger": "🖕",
      "fuelpump": "⛽️",
      "full_moon": "🌕",
      "full_moon_with_face": "🌝",
      "funeral_urn": "⚱️",
      "game_die": "🎲",
      "gear": "⚙️",
      "gem": "💎",
      "gemini": "♊️",
      "ghost": "👻",
      "gift": "🎁",
      "gift_heart": "💝",
      "girl": "👧",
      "globe_with_meridians": "🌐",
      "goal_net": "🥅",
      "goat": "🐐",
      "golf": "⛳️",
      "golfing_man": "🏌️",
      "golfing_woman": "🏌️&zwj;♀️",
      "gorilla": "🦍",
      "grapes": "🍇",
      "green_apple": "🍏",
      "green_book": "📗",
      "green_heart": "💚",
      "green_salad": "🥗",
      "grey_exclamation": "❕",
      "grey_question": "❔",
      "grimacing": "😬",
      "grin": "😁",
      "grinning": "😀",
      "guardsman": "💂",
      "guardswoman": "💂&zwj;♀️",
      "guitar": "🎸",
      "gun": "🔫",
      "haircut_woman": "💇",
      "haircut_man": "💇&zwj;♂️",
      "hamburger": "🍔",
      "hammer": "🔨",
      "hammer_and_pick": "⚒",
      "hammer_and_wrench": "🛠",
      "hamster": "🐹",
      "hand": "✋",
      "handbag": "👜",
      "handshake": "🤝",
      "hankey": "💩",
      "hatched_chick": "🐥",
      "hatching_chick": "🐣",
      "headphones": "🎧",
      "hear_no_evil": "🙉",
      "heart": "❤️",
      "heart_decoration": "💟",
      "heart_eyes": "😍",
      "heart_eyes_cat": "😻",
      "heartbeat": "💓",
      "heartpulse": "💗",
      "hearts": "♥️",
      "heavy_check_mark": "✔️",
      "heavy_division_sign": "➗",
      "heavy_dollar_sign": "💲",
      "heavy_heart_exclamation": "❣️",
      "heavy_minus_sign": "➖",
      "heavy_multiplication_x": "✖️",
      "heavy_plus_sign": "➕",
      "helicopter": "🚁",
      "herb": "🌿",
      "hibiscus": "🌺",
      "high_brightness": "🔆",
      "high_heel": "👠",
      "hocho": "🔪",
      "hole": "🕳",
      "honey_pot": "🍯",
      "horse": "🐴",
      "horse_racing": "🏇",
      "hospital": "🏥",
      "hot_pepper": "🌶",
      "hotdog": "🌭",
      "hotel": "🏨",
      "hotsprings": "♨️",
      "hourglass": "⌛️",
      "hourglass_flowing_sand": "⏳",
      "house": "🏠",
      "house_with_garden": "🏡",
      "houses": "🏘",
      "hugs": "🤗",
      "hushed": "😯",
      "ice_cream": "🍨",
      "ice_hockey": "🏒",
      "ice_skate": "⛸",
      "icecream": "🍦",
      "id": "🆔",
      "ideograph_advantage": "🉐",
      "imp": "👿",
      "inbox_tray": "📥",
      "incoming_envelope": "📨",
      "tipping_hand_woman": "💁",
      "information_source": "ℹ️",
      "innocent": "😇",
      "interrobang": "⁉️",
      "iphone": "📱",
      "izakaya_lantern": "🏮",
      "jack_o_lantern": "🎃",
      "japan": "🗾",
      "japanese_castle": "🏯",
      "japanese_goblin": "👺",
      "japanese_ogre": "👹",
      "jeans": "👖",
      "joy": "😂",
      "joy_cat": "😹",
      "joystick": "🕹",
      "kaaba": "🕋",
      "key": "🔑",
      "keyboard": "⌨️",
      "keycap_ten": "🔟",
      "kick_scooter": "🛴",
      "kimono": "👘",
      "kiss": "💋",
      "kissing": "😗",
      "kissing_cat": "😽",
      "kissing_closed_eyes": "😚",
      "kissing_heart": "😘",
      "kissing_smiling_eyes": "😙",
      "kiwi_fruit": "🥝",
      "koala": "🐨",
      "koko": "🈁",
      "label": "🏷",
      "large_blue_circle": "🔵",
      "large_blue_diamond": "🔷",
      "large_orange_diamond": "🔶",
      "last_quarter_moon": "🌗",
      "last_quarter_moon_with_face": "🌜",
      "latin_cross": "✝️",
      "laughing": "😆",
      "leaves": "🍃",
      "ledger": "📒",
      "left_luggage": "🛅",
      "left_right_arrow": "↔️",
      "leftwards_arrow_with_hook": "↩️",
      "lemon": "🍋",
      "leo": "♌️",
      "leopard": "🐆",
      "level_slider": "🎚",
      "libra": "♎️",
      "light_rail": "🚈",
      "link": "🔗",
      "lion": "🦁",
      "lips": "👄",
      "lipstick": "💄",
      "lizard": "🦎",
      "lock": "🔒",
      "lock_with_ink_pen": "🔏",
      "lollipop": "🍭",
      "loop": "➿",
      "loud_sound": "🔊",
      "loudspeaker": "📢",
      "love_hotel": "🏩",
      "love_letter": "💌",
      "low_brightness": "🔅",
      "lying_face": "🤥",
      "m": "Ⓜ️",
      "mag": "🔍",
      "mag_right": "🔎",
      "mahjong": "🀄️",
      "mailbox": "📫",
      "mailbox_closed": "📪",
      "mailbox_with_mail": "📬",
      "mailbox_with_no_mail": "📭",
      "man": "👨",
      "man_artist": "👨&zwj;🎨",
      "man_astronaut": "👨&zwj;🚀",
      "man_cartwheeling": "🤸&zwj;♂️",
      "man_cook": "👨&zwj;🍳",
      "man_dancing": "🕺",
      "man_facepalming": "🤦&zwj;♂️",
      "man_factory_worker": "👨&zwj;🏭",
      "man_farmer": "👨&zwj;🌾",
      "man_firefighter": "👨&zwj;🚒",
      "man_health_worker": "👨&zwj;⚕️",
      "man_in_tuxedo": "🤵",
      "man_judge": "👨&zwj;⚖️",
      "man_juggling": "🤹&zwj;♂️",
      "man_mechanic": "👨&zwj;🔧",
      "man_office_worker": "👨&zwj;💼",
      "man_pilot": "👨&zwj;✈️",
      "man_playing_handball": "🤾&zwj;♂️",
      "man_playing_water_polo": "🤽&zwj;♂️",
      "man_scientist": "👨&zwj;🔬",
      "man_shrugging": "🤷&zwj;♂️",
      "man_singer": "👨&zwj;🎤",
      "man_student": "👨&zwj;🎓",
      "man_teacher": "👨&zwj;🏫",
      "man_technologist": "👨&zwj;💻",
      "man_with_gua_pi_mao": "👲",
      "man_with_turban": "👳",
      "tangerine": "🍊",
      "mans_shoe": "👞",
      "mantelpiece_clock": "🕰",
      "maple_leaf": "🍁",
      "martial_arts_uniform": "🥋",
      "mask": "😷",
      "massage_woman": "💆",
      "massage_man": "💆&zwj;♂️",
      "meat_on_bone": "🍖",
      "medal_military": "🎖",
      "medal_sports": "🏅",
      "mega": "📣",
      "melon": "🍈",
      "memo": "📝",
      "men_wrestling": "🤼&zwj;♂️",
      "menorah": "🕎",
      "mens": "🚹",
      "metal": "🤘",
      "metro": "🚇",
      "microphone": "🎤",
      "microscope": "🔬",
      "milk_glass": "🥛",
      "milky_way": "🌌",
      "minibus": "🚐",
      "minidisc": "💽",
      "mobile_phone_off": "📴",
      "money_mouth_face": "🤑",
      "money_with_wings": "💸",
      "moneybag": "💰",
      "monkey": "🐒",
      "monkey_face": "🐵",
      "monorail": "🚝",
      "moon": "🌔",
      "mortar_board": "🎓",
      "mosque": "🕌",
      "motor_boat": "🛥",
      "motor_scooter": "🛵",
      "motorcycle": "🏍",
      "motorway": "🛣",
      "mount_fuji": "🗻",
      "mountain": "⛰",
      "mountain_biking_man": "🚵",
      "mountain_biking_woman": "🚵&zwj;♀️",
      "mountain_cableway": "🚠",
      "mountain_railway": "🚞",
      "mountain_snow": "🏔",
      "mouse": "🐭",
      "mouse2": "🐁",
      "movie_camera": "🎥",
      "moyai": "🗿",
      "mrs_claus": "🤶",
      "muscle": "💪",
      "mushroom": "🍄",
      "musical_keyboard": "🎹",
      "musical_note": "🎵",
      "musical_score": "🎼",
      "mute": "🔇",
      "nail_care": "💅",
      "name_badge": "📛",
      "national_park": "🏞",
      "nauseated_face": "🤢",
      "necktie": "👔",
      "negative_squared_cross_mark": "❎",
      "nerd_face": "🤓",
      "neutral_face": "😐",
      "new": "🆕",
      "new_moon": "🌑",
      "new_moon_with_face": "🌚",
      "newspaper": "📰",
      "newspaper_roll": "🗞",
      "next_track_button": "⏭",
      "ng": "🆖",
      "no_good_man": "🙅&zwj;♂️",
      "no_good_woman": "🙅",
      "night_with_stars": "🌃",
      "no_bell": "🔕",
      "no_bicycles": "🚳",
      "no_entry": "⛔️",
      "no_entry_sign": "🚫",
      "no_mobile_phones": "📵",
      "no_mouth": "😶",
      "no_pedestrians": "🚷",
      "no_smoking": "🚭",
      "non-potable_water": "🚱",
      "nose": "👃",
      "notebook": "📓",
      "notebook_with_decorative_cover": "📔",
      "notes": "🎶",
      "nut_and_bolt": "🔩",
      "o": "⭕️",
      "o2": "🅾️",
      "ocean": "🌊",
      "octopus": "🐙",
      "oden": "🍢",
      "office": "🏢",
      "oil_drum": "🛢",
      "ok": "🆗",
      "ok_hand": "👌",
      "ok_man": "🙆&zwj;♂️",
      "ok_woman": "🙆",
      "old_key": "🗝",
      "older_man": "👴",
      "older_woman": "👵",
      "om": "🕉",
      "on": "🔛",
      "oncoming_automobile": "🚘",
      "oncoming_bus": "🚍",
      "oncoming_police_car": "🚔",
      "oncoming_taxi": "🚖",
      "open_file_folder": "📂",
      "open_hands": "👐",
      "open_mouth": "😮",
      "open_umbrella": "☂️",
      "ophiuchus": "⛎",
      "orange_book": "📙",
      "orthodox_cross": "☦️",
      "outbox_tray": "📤",
      "owl": "🦉",
      "ox": "🐂",
      "package": "📦",
      "page_facing_up": "📄",
      "page_with_curl": "📃",
      "pager": "📟",
      "paintbrush": "🖌",
      "palm_tree": "🌴",
      "pancakes": "🥞",
      "panda_face": "🐼",
      "paperclip": "📎",
      "paperclips": "🖇",
      "parasol_on_ground": "⛱",
      "parking": "🅿️",
      "part_alternation_mark": "〽️",
      "partly_sunny": "⛅️",
      "passenger_ship": "🛳",
      "passport_control": "🛂",
      "pause_button": "⏸",
      "peace_symbol": "☮️",
      "peach": "🍑",
      "peanuts": "🥜",
      "pear": "🍐",
      "pen": "🖊",
      "pencil2": "✏️",
      "penguin": "🐧",
      "pensive": "😔",
      "performing_arts": "🎭",
      "persevere": "😣",
      "person_fencing": "🤺",
      "pouting_woman": "🙎",
      "phone": "☎️",
      "pick": "⛏",
      "pig": "🐷",
      "pig2": "🐖",
      "pig_nose": "🐽",
      "pill": "💊",
      "pineapple": "🍍",
      "ping_pong": "🏓",
      "pisces": "♓️",
      "pizza": "🍕",
      "place_of_worship": "🛐",
      "plate_with_cutlery": "🍽",
      "play_or_pause_button": "⏯",
      "point_down": "👇",
      "point_left": "👈",
      "point_right": "👉",
      "point_up": "☝️",
      "point_up_2": "👆",
      "police_car": "🚓",
      "policewoman": "👮&zwj;♀️",
      "poodle": "🐩",
      "popcorn": "🍿",
      "post_office": "🏣",
      "postal_horn": "📯",
      "postbox": "📮",
      "potable_water": "🚰",
      "potato": "🥔",
      "pouch": "👝",
      "poultry_leg": "🍗",
      "pound": "💷",
      "rage": "😡",
      "pouting_cat": "😾",
      "pouting_man": "🙎&zwj;♂️",
      "pray": "🙏",
      "prayer_beads": "📿",
      "pregnant_woman": "🤰",
      "previous_track_button": "⏮",
      "prince": "🤴",
      "princess": "👸",
      "printer": "🖨",
      "purple_heart": "💜",
      "purse": "👛",
      "pushpin": "📌",
      "put_litter_in_its_place": "🚮",
      "question": "❓",
      "rabbit": "🐰",
      "rabbit2": "🐇",
      "racehorse": "🐎",
      "racing_car": "🏎",
      "radio": "📻",
      "radio_button": "🔘",
      "radioactive": "☢️",
      "railway_car": "🚃",
      "railway_track": "🛤",
      "rainbow": "🌈",
      "rainbow_flag": "🏳️&zwj;🌈",
      "raised_back_of_hand": "🤚",
      "raised_hand_with_fingers_splayed": "🖐",
      "raised_hands": "🙌",
      "raising_hand_woman": "🙋",
      "raising_hand_man": "🙋&zwj;♂️",
      "ram": "🐏",
      "ramen": "🍜",
      "rat": "🐀",
      "record_button": "⏺",
      "recycle": "♻️",
      "red_circle": "🔴",
      "registered": "®️",
      "relaxed": "☺️",
      "relieved": "😌",
      "reminder_ribbon": "🎗",
      "repeat": "🔁",
      "repeat_one": "🔂",
      "rescue_worker_helmet": "⛑",
      "restroom": "🚻",
      "revolving_hearts": "💞",
      "rewind": "⏪",
      "rhinoceros": "🦏",
      "ribbon": "🎀",
      "rice": "🍚",
      "rice_ball": "🍙",
      "rice_cracker": "🍘",
      "rice_scene": "🎑",
      "right_anger_bubble": "🗯",
      "ring": "💍",
      "robot": "🤖",
      "rocket": "🚀",
      "rofl": "🤣",
      "roll_eyes": "🙄",
      "roller_coaster": "🎢",
      "rooster": "🐓",
      "rose": "🌹",
      "rosette": "🏵",
      "rotating_light": "🚨",
      "round_pushpin": "📍",
      "rowing_man": "🚣",
      "rowing_woman": "🚣&zwj;♀️",
      "rugby_football": "🏉",
      "running_man": "🏃",
      "running_shirt_with_sash": "🎽",
      "running_woman": "🏃&zwj;♀️",
      "sa": "🈂️",
      "sagittarius": "♐️",
      "sake": "🍶",
      "sandal": "👡",
      "santa": "🎅",
      "satellite": "📡",
      "saxophone": "🎷",
      "school": "🏫",
      "school_satchel": "🎒",
      "scissors": "✂️",
      "scorpion": "🦂",
      "scorpius": "♏️",
      "scream": "😱",
      "scream_cat": "🙀",
      "scroll": "📜",
      "seat": "💺",
      "secret": "㊙️",
      "see_no_evil": "🙈",
      "seedling": "🌱",
      "selfie": "🤳",
      "shallow_pan_of_food": "🥘",
      "shamrock": "☘️",
      "shark": "🦈",
      "shaved_ice": "🍧",
      "sheep": "🐑",
      "shell": "🐚",
      "shield": "🛡",
      "shinto_shrine": "⛩",
      "ship": "🚢",
      "shirt": "👕",
      "shopping": "🛍",
      "shopping_cart": "🛒",
      "shower": "🚿",
      "shrimp": "🦐",
      "signal_strength": "📶",
      "six_pointed_star": "🔯",
      "ski": "🎿",
      "skier": "⛷",
      "skull": "💀",
      "skull_and_crossbones": "☠️",
      "sleeping": "😴",
      "sleeping_bed": "🛌",
      "sleepy": "😪",
      "slightly_frowning_face": "🙁",
      "slightly_smiling_face": "🙂",
      "slot_machine": "🎰",
      "small_airplane": "🛩",
      "small_blue_diamond": "🔹",
      "small_orange_diamond": "🔸",
      "small_red_triangle": "🔺",
      "small_red_triangle_down": "🔻",
      "smile": "😄",
      "smile_cat": "😸",
      "smiley": "😃",
      "smiley_cat": "😺",
      "smiling_imp": "😈",
      "smirk": "😏",
      "smirk_cat": "😼",
      "smoking": "🚬",
      "snail": "🐌",
      "snake": "🐍",
      "sneezing_face": "🤧",
      "snowboarder": "🏂",
      "snowflake": "❄️",
      "snowman": "⛄️",
      "snowman_with_snow": "☃️",
      "sob": "😭",
      "soccer": "⚽️",
      "soon": "🔜",
      "sos": "🆘",
      "sound": "🔉",
      "space_invader": "👾",
      "spades": "♠️",
      "spaghetti": "🍝",
      "sparkle": "❇️",
      "sparkler": "🎇",
      "sparkles": "✨",
      "sparkling_heart": "💖",
      "speak_no_evil": "🙊",
      "speaker": "🔈",
      "speaking_head": "🗣",
      "speech_balloon": "💬",
      "speedboat": "🚤",
      "spider": "🕷",
      "spider_web": "🕸",
      "spiral_calendar": "🗓",
      "spiral_notepad": "🗒",
      "spoon": "🥄",
      "squid": "🦑",
      "stadium": "🏟",
      "star": "⭐️",
      "star2": "🌟",
      "star_and_crescent": "☪️",
      "star_of_david": "✡️",
      "stars": "🌠",
      "station": "🚉",
      "statue_of_liberty": "🗽",
      "steam_locomotive": "🚂",
      "stew": "🍲",
      "stop_button": "⏹",
      "stop_sign": "🛑",
      "stopwatch": "⏱",
      "straight_ruler": "📏",
      "strawberry": "🍓",
      "stuck_out_tongue": "😛",
      "stuck_out_tongue_closed_eyes": "😝",
      "stuck_out_tongue_winking_eye": "😜",
      "studio_microphone": "🎙",
      "stuffed_flatbread": "🥙",
      "sun_behind_large_cloud": "🌥",
      "sun_behind_rain_cloud": "🌦",
      "sun_behind_small_cloud": "🌤",
      "sun_with_face": "🌞",
      "sunflower": "🌻",
      "sunglasses": "😎",
      "sunny": "☀️",
      "sunrise": "🌅",
      "sunrise_over_mountains": "🌄",
      "surfing_man": "🏄",
      "surfing_woman": "🏄&zwj;♀️",
      "sushi": "🍣",
      "suspension_railway": "🚟",
      "sweat": "😓",
      "sweat_drops": "💦",
      "sweat_smile": "😅",
      "sweet_potato": "🍠",
      "swimming_man": "🏊",
      "swimming_woman": "🏊&zwj;♀️",
      "symbols": "🔣",
      "synagogue": "🕍",
      "syringe": "💉",
      "taco": "🌮",
      "tada": "🎉",
      "tanabata_tree": "🎋",
      "taurus": "♉️",
      "taxi": "🚕",
      "tea": "🍵",
      "telephone_receiver": "📞",
      "telescope": "🔭",
      "tennis": "🎾",
      "tent": "⛺️",
      "thermometer": "🌡",
      "thinking": "🤔",
      "thought_balloon": "💭",
      "ticket": "🎫",
      "tickets": "🎟",
      "tiger": "🐯",
      "tiger2": "🐅",
      "timer_clock": "⏲",
      "tipping_hand_man": "💁&zwj;♂️",
      "tired_face": "😫",
      "tm": "™️",
      "toilet": "🚽",
      "tokyo_tower": "🗼",
      "tomato": "🍅",
      "tongue": "👅",
      "top": "🔝",
      "tophat": "🎩",
      "tornado": "🌪",
      "trackball": "🖲",
      "tractor": "🚜",
      "traffic_light": "🚥",
      "train": "🚋",
      "train2": "🚆",
      "tram": "🚊",
      "triangular_flag_on_post": "🚩",
      "triangular_ruler": "📐",
      "trident": "🔱",
      "triumph": "😤",
      "trolleybus": "🚎",
      "trophy": "🏆",
      "tropical_drink": "🍹",
      "tropical_fish": "🐠",
      "truck": "🚚",
      "trumpet": "🎺",
      "tulip": "🌷",
      "tumbler_glass": "🥃",
      "turkey": "🦃",
      "turtle": "🐢",
      "tv": "📺",
      "twisted_rightwards_arrows": "🔀",
      "two_hearts": "💕",
      "two_men_holding_hands": "👬",
      "two_women_holding_hands": "👭",
      "u5272": "🈹",
      "u5408": "🈴",
      "u55b6": "🈺",
      "u6307": "🈯️",
      "u6708": "🈷️",
      "u6709": "🈶",
      "u6e80": "🈵",
      "u7121": "🈚️",
      "u7533": "🈸",
      "u7981": "🈲",
      "u7a7a": "🈳",
      "umbrella": "☔️",
      "unamused": "😒",
      "underage": "🔞",
      "unicorn": "🦄",
      "unlock": "🔓",
      "up": "🆙",
      "upside_down_face": "🙃",
      "v": "✌️",
      "vertical_traffic_light": "🚦",
      "vhs": "📼",
      "vibration_mode": "📳",
      "video_camera": "📹",
      "video_game": "🎮",
      "violin": "🎻",
      "virgo": "♍️",
      "volcano": "🌋",
      "volleyball": "🏐",
      "vs": "🆚",
      "vulcan_salute": "🖖",
      "walking_man": "🚶",
      "walking_woman": "🚶&zwj;♀️",
      "waning_crescent_moon": "🌘",
      "waning_gibbous_moon": "🌖",
      "warning": "⚠️",
      "wastebasket": "🗑",
      "watch": "⌚️",
      "water_buffalo": "🐃",
      "watermelon": "🍉",
      "wave": "👋",
      "wavy_dash": "〰️",
      "waxing_crescent_moon": "🌒",
      "wc": "🚾",
      "weary": "😩",
      "wedding": "💒",
      "weight_lifting_man": "🏋️",
      "weight_lifting_woman": "🏋️&zwj;♀️",
      "whale": "🐳",
      "whale2": "🐋",
      "wheel_of_dharma": "☸️",
      "wheelchair": "♿️",
      "white_check_mark": "✅",
      "white_circle": "⚪️",
      "white_flag": "🏳️",
      "white_flower": "💮",
      "white_large_square": "⬜️",
      "white_medium_small_square": "◽️",
      "white_medium_square": "◻️",
      "white_small_square": "▫️",
      "white_square_button": "🔳",
      "wilted_flower": "🥀",
      "wind_chime": "🎐",
      "wind_face": "🌬",
      "wine_glass": "🍷",
      "wink": "😉",
      "wolf": "🐺",
      "woman": "👩",
      "woman_artist": "👩&zwj;🎨",
      "woman_astronaut": "👩&zwj;🚀",
      "woman_cartwheeling": "🤸&zwj;♀️",
      "woman_cook": "👩&zwj;🍳",
      "woman_facepalming": "🤦&zwj;♀️",
      "woman_factory_worker": "👩&zwj;🏭",
      "woman_farmer": "👩&zwj;🌾",
      "woman_firefighter": "👩&zwj;🚒",
      "woman_health_worker": "👩&zwj;⚕️",
      "woman_judge": "👩&zwj;⚖️",
      "woman_juggling": "🤹&zwj;♀️",
      "woman_mechanic": "👩&zwj;🔧",
      "woman_office_worker": "👩&zwj;💼",
      "woman_pilot": "👩&zwj;✈️",
      "woman_playing_handball": "🤾&zwj;♀️",
      "woman_playing_water_polo": "🤽&zwj;♀️",
      "woman_scientist": "👩&zwj;🔬",
      "woman_shrugging": "🤷&zwj;♀️",
      "woman_singer": "👩&zwj;🎤",
      "woman_student": "👩&zwj;🎓",
      "woman_teacher": "👩&zwj;🏫",
      "woman_technologist": "👩&zwj;💻",
      "woman_with_turban": "👳&zwj;♀️",
      "womans_clothes": "👚",
      "womans_hat": "👒",
      "women_wrestling": "🤼&zwj;♀️",
      "womens": "🚺",
      "world_map": "🗺",
      "worried": "😟",
      "wrench": "🔧",
      "writing_hand": "✍️",
      "x": "❌",
      "yellow_heart": "💛",
      "yen": "💴",
      "yin_yang": "☯️",
      "yum": "😋",
      "zap": "⚡️",
      "zipper_mouth_face": "🤐",
      "zzz": "💤",
      /* special emojis :P */
      "octocat": '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
      "showdown": `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>`
    };
    showdown2.Converter = function(converterOptions) {
      var options = {}, langExtensions = [], outputModifiers = [], listeners = {}, setConvFlavor = setFlavor, metadata = {
        parsed: {},
        raw: "",
        format: ""
      };
      _constructor();
      function _constructor() {
        converterOptions = converterOptions || {};
        for (var gOpt in globalOptions) {
          if (globalOptions.hasOwnProperty(gOpt)) {
            options[gOpt] = globalOptions[gOpt];
          }
        }
        if (typeof converterOptions === "object") {
          for (var opt in converterOptions) {
            if (converterOptions.hasOwnProperty(opt)) {
              options[opt] = converterOptions[opt];
            }
          }
        } else {
          throw Error("Converter expects the passed parameter to be an object, but " + typeof converterOptions + " was passed instead.");
        }
        if (options.extensions) {
          showdown2.helper.forEach(options.extensions, _parseExtension);
        }
      }
      function _parseExtension(ext, name) {
        name = name || null;
        if (showdown2.helper.isString(ext)) {
          ext = showdown2.helper.stdExtName(ext);
          name = ext;
          if (showdown2.extensions[ext]) {
            console.warn("DEPRECATION WARNING: " + ext + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!");
            legacyExtensionLoading(showdown2.extensions[ext], ext);
            return;
          } else if (!showdown2.helper.isUndefined(extensions[ext])) {
            ext = extensions[ext];
          } else {
            throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
          }
        }
        if (typeof ext === "function") {
          ext = ext();
        }
        if (!showdown2.helper.isArray(ext)) {
          ext = [ext];
        }
        var validExt = validate(ext, name);
        if (!validExt.valid) {
          throw Error(validExt.error);
        }
        for (var i = 0; i < ext.length; ++i) {
          switch (ext[i].type) {
            case "lang":
              langExtensions.push(ext[i]);
              break;
            case "output":
              outputModifiers.push(ext[i]);
              break;
          }
          if (ext[i].hasOwnProperty("listeners")) {
            for (var ln in ext[i].listeners) {
              if (ext[i].listeners.hasOwnProperty(ln)) {
                listen(ln, ext[i].listeners[ln]);
              }
            }
          }
        }
      }
      function legacyExtensionLoading(ext, name) {
        if (typeof ext === "function") {
          ext = ext(new showdown2.Converter());
        }
        if (!showdown2.helper.isArray(ext)) {
          ext = [ext];
        }
        var valid = validate(ext, name);
        if (!valid.valid) {
          throw Error(valid.error);
        }
        for (var i = 0; i < ext.length; ++i) {
          switch (ext[i].type) {
            case "lang":
              langExtensions.push(ext[i]);
              break;
            case "output":
              outputModifiers.push(ext[i]);
              break;
            default:
              throw Error("Extension loader error: Type unrecognized!!!");
          }
        }
      }
      function listen(name, callback) {
        if (!showdown2.helper.isString(name)) {
          throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof name + " given");
        }
        if (typeof callback !== "function") {
          throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof callback + " given");
        }
        if (!listeners.hasOwnProperty(name)) {
          listeners[name] = [];
        }
        listeners[name].push(callback);
      }
      function rTrimInputText(text) {
        var rsp = text.match(/^\s*/)[0].length, rgx = new RegExp("^\\s{0," + rsp + "}", "gm");
        return text.replace(rgx, "");
      }
      this._dispatch = function dispatch(evtName, text, options2, globals) {
        if (listeners.hasOwnProperty(evtName)) {
          for (var ei = 0; ei < listeners[evtName].length; ++ei) {
            var nText = listeners[evtName][ei](evtName, text, this, options2, globals);
            if (nText && typeof nText !== "undefined") {
              text = nText;
            }
          }
        }
        return text;
      };
      this.listen = function(name, callback) {
        listen(name, callback);
        return this;
      };
      this.makeHtml = function(text) {
        if (!text) {
          return text;
        }
        var globals = {
          gHtmlBlocks: [],
          gHtmlMdBlocks: [],
          gHtmlSpans: [],
          gUrls: {},
          gTitles: {},
          gDimensions: {},
          gListLevel: 0,
          hashLinkCounts: {},
          langExtensions,
          outputModifiers,
          converter: this,
          ghCodeBlocks: [],
          metadata: {
            parsed: {},
            raw: "",
            format: ""
          }
        };
        text = text.replace(/¨/g, "¨T");
        text = text.replace(/\$/g, "¨D");
        text = text.replace(/\r\n/g, "\n");
        text = text.replace(/\r/g, "\n");
        text = text.replace(/\u00A0/g, "&nbsp;");
        if (options.smartIndentationFix) {
          text = rTrimInputText(text);
        }
        text = "\n\n" + text + "\n\n";
        text = showdown2.subParser("detab")(text, options, globals);
        text = text.replace(/^[ \t]+$/mg, "");
        showdown2.helper.forEach(langExtensions, function(ext) {
          text = showdown2.subParser("runExtension")(ext, text, options, globals);
        });
        text = showdown2.subParser("metadata")(text, options, globals);
        text = showdown2.subParser("hashPreCodeTags")(text, options, globals);
        text = showdown2.subParser("githubCodeBlocks")(text, options, globals);
        text = showdown2.subParser("hashHTMLBlocks")(text, options, globals);
        text = showdown2.subParser("hashCodeTags")(text, options, globals);
        text = showdown2.subParser("stripLinkDefinitions")(text, options, globals);
        text = showdown2.subParser("blockGamut")(text, options, globals);
        text = showdown2.subParser("unhashHTMLSpans")(text, options, globals);
        text = showdown2.subParser("unescapeSpecialChars")(text, options, globals);
        text = text.replace(/¨D/g, "$$");
        text = text.replace(/¨T/g, "¨");
        text = showdown2.subParser("completeHTMLDocument")(text, options, globals);
        showdown2.helper.forEach(outputModifiers, function(ext) {
          text = showdown2.subParser("runExtension")(ext, text, options, globals);
        });
        metadata = globals.metadata;
        return text;
      };
      this.makeMarkdown = this.makeMd = function(src, HTMLParser) {
        src = src.replace(/\r\n/g, "\n");
        src = src.replace(/\r/g, "\n");
        src = src.replace(/>[ \t]+</, ">¨NBSP;<");
        if (!HTMLParser) {
          if (window && window.document) {
            HTMLParser = window.document;
          } else {
            throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
          }
        }
        var doc = HTMLParser.createElement("div");
        doc.innerHTML = src;
        var globals = {
          preList: substitutePreCodeTags(doc)
        };
        clean(doc);
        var nodes = doc.childNodes, mdDoc = "";
        for (var i = 0; i < nodes.length; i++) {
          mdDoc += showdown2.subParser("makeMarkdown.node")(nodes[i], globals);
        }
        function clean(node) {
          for (var n2 = 0; n2 < node.childNodes.length; ++n2) {
            var child = node.childNodes[n2];
            if (child.nodeType === 3) {
              if (!/\S/.test(child.nodeValue) && !/^[ ]+$/.test(child.nodeValue)) {
                node.removeChild(child);
                --n2;
              } else {
                child.nodeValue = child.nodeValue.split("\n").join(" ");
                child.nodeValue = child.nodeValue.replace(/(\s)+/g, "$1");
              }
            } else if (child.nodeType === 1) {
              clean(child);
            }
          }
        }
        function substitutePreCodeTags(doc2) {
          var pres = doc2.querySelectorAll("pre"), presPH = [];
          for (var i2 = 0; i2 < pres.length; ++i2) {
            if (pres[i2].childElementCount === 1 && pres[i2].firstChild.tagName.toLowerCase() === "code") {
              var content = pres[i2].firstChild.innerHTML.trim(), language = pres[i2].firstChild.getAttribute("data-language") || "";
              if (language === "") {
                var classes = pres[i2].firstChild.className.split(" ");
                for (var c2 = 0; c2 < classes.length; ++c2) {
                  var matches = classes[c2].match(/^language-(.+)$/);
                  if (matches !== null) {
                    language = matches[1];
                    break;
                  }
                }
              }
              content = showdown2.helper.unescapeHTMLEntities(content);
              presPH.push(content);
              pres[i2].outerHTML = '<precode language="' + language + '" precodenum="' + i2.toString() + '"></precode>';
            } else {
              presPH.push(pres[i2].innerHTML);
              pres[i2].innerHTML = "";
              pres[i2].setAttribute("prenum", i2.toString());
            }
          }
          return presPH;
        }
        return mdDoc;
      };
      this.setOption = function(key, value) {
        options[key] = value;
      };
      this.getOption = function(key) {
        return options[key];
      };
      this.getOptions = function() {
        return options;
      };
      this.addExtension = function(extension, name) {
        name = name || null;
        _parseExtension(extension, name);
      };
      this.useExtension = function(extensionName) {
        _parseExtension(extensionName);
      };
      this.setFlavor = function(name) {
        if (!flavor.hasOwnProperty(name)) {
          throw Error(name + " flavor was not found");
        }
        var preset = flavor[name];
        setConvFlavor = name;
        for (var option in preset) {
          if (preset.hasOwnProperty(option)) {
            options[option] = preset[option];
          }
        }
      };
      this.getFlavor = function() {
        return setConvFlavor;
      };
      this.removeExtension = function(extension) {
        if (!showdown2.helper.isArray(extension)) {
          extension = [extension];
        }
        for (var a = 0; a < extension.length; ++a) {
          var ext = extension[a];
          for (var i = 0; i < langExtensions.length; ++i) {
            if (langExtensions[i] === ext) {
              langExtensions.splice(i, 1);
            }
          }
          for (var ii = 0; ii < outputModifiers.length; ++ii) {
            if (outputModifiers[ii] === ext) {
              outputModifiers.splice(ii, 1);
            }
          }
        }
      };
      this.getAllExtensions = function() {
        return {
          language: langExtensions,
          output: outputModifiers
        };
      };
      this.getMetadata = function(raw) {
        if (raw) {
          return metadata.raw;
        } else {
          return metadata.parsed;
        }
      };
      this.getMetadataFormat = function() {
        return metadata.format;
      };
      this._setMetadataPair = function(key, value) {
        metadata.parsed[key] = value;
      };
      this._setMetadataFormat = function(format) {
        metadata.format = format;
      };
      this._setMetadataRaw = function(raw) {
        metadata.raw = raw;
      };
    };
    showdown2.subParser("anchors", function(text, options, globals) {
      text = globals.converter._dispatch("anchors.before", text, options, globals);
      var writeAnchorTag = function(wholeMatch, linkText, linkId, url, m5, m6, title) {
        if (showdown2.helper.isUndefined(title)) {
          title = "";
        }
        linkId = linkId.toLowerCase();
        if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
          url = "";
        } else if (!url) {
          if (!linkId) {
            linkId = linkText.toLowerCase().replace(/ ?\n/g, " ");
          }
          url = "#" + linkId;
          if (!showdown2.helper.isUndefined(globals.gUrls[linkId])) {
            url = globals.gUrls[linkId];
            if (!showdown2.helper.isUndefined(globals.gTitles[linkId])) {
              title = globals.gTitles[linkId];
            }
          } else {
            return wholeMatch;
          }
        }
        url = url.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
        var result = '<a href="' + url + '"';
        if (title !== "" && title !== null) {
          title = title.replace(/"/g, "&quot;");
          title = title.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
          result += ' title="' + title + '"';
        }
        if (options.openLinksInNewWindow && !/^#/.test(url)) {
          result += ' rel="noopener noreferrer" target="¨E95Eblank"';
        }
        result += ">" + linkText + "</a>";
        return result;
      };
      text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);
      text = text.replace(
        /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
        writeAnchorTag
      );
      text = text.replace(
        /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
        writeAnchorTag
      );
      text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);
      if (options.ghMentions) {
        text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(wm, st, escape, mentions, username) {
          if (escape === "\\") {
            return st + mentions;
          }
          if (!showdown2.helper.isString(options.ghMentionsLink)) {
            throw new Error("ghMentionsLink option must be a string");
          }
          var lnk = options.ghMentionsLink.replace(/\{u}/g, username), target = "";
          if (options.openLinksInNewWindow) {
            target = ' rel="noopener noreferrer" target="¨E95Eblank"';
          }
          return st + '<a href="' + lnk + '"' + target + ">" + mentions + "</a>";
        });
      }
      text = globals.converter._dispatch("anchors.after", text, options, globals);
      return text;
    });
    var simpleURLRegex = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, delimUrlRegex = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, delimMailRegex = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, replaceLink = function(options) {
      return function(wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
        link = link.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
        var lnkTxt = link, append = "", target = "", lmc = leadingMagicChars || "", tmc = trailingMagicChars || "";
        if (/^www\./i.test(link)) {
          link = link.replace(/^www\./i, "http://www.");
        }
        if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
          append = trailingPunctuation;
        }
        if (options.openLinksInNewWindow) {
          target = ' rel="noopener noreferrer" target="¨E95Eblank"';
        }
        return lmc + '<a href="' + link + '"' + target + ">" + lnkTxt + "</a>" + append + tmc;
      };
    }, replaceMail = function(options, globals) {
      return function(wholeMatch, b2, mail) {
        var href = "mailto:";
        b2 = b2 || "";
        mail = showdown2.subParser("unescapeSpecialChars")(mail, options, globals);
        if (options.encodeEmails) {
          href = showdown2.helper.encodeEmailAddress(href + mail);
          mail = showdown2.helper.encodeEmailAddress(mail);
        } else {
          href = href + mail;
        }
        return b2 + '<a href="' + href + '">' + mail + "</a>";
      };
    };
    showdown2.subParser("autoLinks", function(text, options, globals) {
      text = globals.converter._dispatch("autoLinks.before", text, options, globals);
      text = text.replace(delimUrlRegex, replaceLink(options));
      text = text.replace(delimMailRegex, replaceMail(options, globals));
      text = globals.converter._dispatch("autoLinks.after", text, options, globals);
      return text;
    });
    showdown2.subParser("simplifiedAutoLinks", function(text, options, globals) {
      if (!options.simplifiedAutoLink) {
        return text;
      }
      text = globals.converter._dispatch("simplifiedAutoLinks.before", text, options, globals);
      if (options.excludeTrailingPunctuationFromURLs) {
        text = text.replace(simpleURLRegex2, replaceLink(options));
      } else {
        text = text.replace(simpleURLRegex, replaceLink(options));
      }
      text = text.replace(simpleMailRegex, replaceMail(options, globals));
      text = globals.converter._dispatch("simplifiedAutoLinks.after", text, options, globals);
      return text;
    });
    showdown2.subParser("blockGamut", function(text, options, globals) {
      text = globals.converter._dispatch("blockGamut.before", text, options, globals);
      text = showdown2.subParser("blockQuotes")(text, options, globals);
      text = showdown2.subParser("headers")(text, options, globals);
      text = showdown2.subParser("horizontalRule")(text, options, globals);
      text = showdown2.subParser("lists")(text, options, globals);
      text = showdown2.subParser("codeBlocks")(text, options, globals);
      text = showdown2.subParser("tables")(text, options, globals);
      text = showdown2.subParser("hashHTMLBlocks")(text, options, globals);
      text = showdown2.subParser("paragraphs")(text, options, globals);
      text = globals.converter._dispatch("blockGamut.after", text, options, globals);
      return text;
    });
    showdown2.subParser("blockQuotes", function(text, options, globals) {
      text = globals.converter._dispatch("blockQuotes.before", text, options, globals);
      text = text + "\n\n";
      var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
      if (options.splitAdjacentBlockquotes) {
        rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
      }
      text = text.replace(rgx, function(bq) {
        bq = bq.replace(/^[ \t]*>[ \t]?/gm, "");
        bq = bq.replace(/¨0/g, "");
        bq = bq.replace(/^[ \t]+$/gm, "");
        bq = showdown2.subParser("githubCodeBlocks")(bq, options, globals);
        bq = showdown2.subParser("blockGamut")(bq, options, globals);
        bq = bq.replace(/(^|\n)/g, "$1  ");
        bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(wholeMatch, m1) {
          var pre = m1;
          pre = pre.replace(/^  /mg, "¨0");
          pre = pre.replace(/¨0/g, "");
          return pre;
        });
        return showdown2.subParser("hashBlock")("<blockquote>\n" + bq + "\n</blockquote>", options, globals);
      });
      text = globals.converter._dispatch("blockQuotes.after", text, options, globals);
      return text;
    });
    showdown2.subParser("codeBlocks", function(text, options, globals) {
      text = globals.converter._dispatch("codeBlocks.before", text, options, globals);
      text += "¨0";
      var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
      text = text.replace(pattern, function(wholeMatch, m1, m2) {
        var codeblock = m1, nextChar = m2, end2 = "\n";
        codeblock = showdown2.subParser("outdent")(codeblock, options, globals);
        codeblock = showdown2.subParser("encodeCode")(codeblock, options, globals);
        codeblock = showdown2.subParser("detab")(codeblock, options, globals);
        codeblock = codeblock.replace(/^\n+/g, "");
        codeblock = codeblock.replace(/\n+$/g, "");
        if (options.omitExtraWLInCodeBlocks) {
          end2 = "";
        }
        codeblock = "<pre><code>" + codeblock + end2 + "</code></pre>";
        return showdown2.subParser("hashBlock")(codeblock, options, globals) + nextChar;
      });
      text = text.replace(/¨0/, "");
      text = globals.converter._dispatch("codeBlocks.after", text, options, globals);
      return text;
    });
    showdown2.subParser("codeSpans", function(text, options, globals) {
      text = globals.converter._dispatch("codeSpans.before", text, options, globals);
      if (typeof text === "undefined") {
        text = "";
      }
      text = text.replace(
        /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
        function(wholeMatch, m1, m2, m3) {
          var c2 = m3;
          c2 = c2.replace(/^([ \t]*)/g, "");
          c2 = c2.replace(/[ \t]*$/g, "");
          c2 = showdown2.subParser("encodeCode")(c2, options, globals);
          c2 = m1 + "<code>" + c2 + "</code>";
          c2 = showdown2.subParser("hashHTMLSpans")(c2, options, globals);
          return c2;
        }
      );
      text = globals.converter._dispatch("codeSpans.after", text, options, globals);
      return text;
    });
    showdown2.subParser("completeHTMLDocument", function(text, options, globals) {
      if (!options.completeHTMLDocument) {
        return text;
      }
      text = globals.converter._dispatch("completeHTMLDocument.before", text, options, globals);
      var doctype = "html", doctypeParsed = "<!DOCTYPE HTML>\n", title = "", charset = '<meta charset="utf-8">\n', lang = "", metadata = "";
      if (typeof globals.metadata.parsed.doctype !== "undefined") {
        doctypeParsed = "<!DOCTYPE " + globals.metadata.parsed.doctype + ">\n";
        doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
        if (doctype === "html" || doctype === "html5") {
          charset = '<meta charset="utf-8">';
        }
      }
      for (var meta in globals.metadata.parsed) {
        if (globals.metadata.parsed.hasOwnProperty(meta)) {
          switch (meta.toLowerCase()) {
            case "doctype":
              break;
            case "title":
              title = "<title>" + globals.metadata.parsed.title + "</title>\n";
              break;
            case "charset":
              if (doctype === "html" || doctype === "html5") {
                charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
              } else {
                charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
              }
              break;
            case "language":
            case "lang":
              lang = ' lang="' + globals.metadata.parsed[meta] + '"';
              metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
              break;
            default:
              metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
          }
        }
      }
      text = doctypeParsed + "<html" + lang + ">\n<head>\n" + title + charset + metadata + "</head>\n<body>\n" + text.trim() + "\n</body>\n</html>";
      text = globals.converter._dispatch("completeHTMLDocument.after", text, options, globals);
      return text;
    });
    showdown2.subParser("detab", function(text, options, globals) {
      text = globals.converter._dispatch("detab.before", text, options, globals);
      text = text.replace(/\t(?=\t)/g, "    ");
      text = text.replace(/\t/g, "¨A¨B");
      text = text.replace(/¨B(.+?)¨A/g, function(wholeMatch, m1) {
        var leadingText = m1, numSpaces = 4 - leadingText.length % 4;
        for (var i = 0; i < numSpaces; i++) {
          leadingText += " ";
        }
        return leadingText;
      });
      text = text.replace(/¨A/g, "    ");
      text = text.replace(/¨B/g, "");
      text = globals.converter._dispatch("detab.after", text, options, globals);
      return text;
    });
    showdown2.subParser("ellipsis", function(text, options, globals) {
      if (!options.ellipsis) {
        return text;
      }
      text = globals.converter._dispatch("ellipsis.before", text, options, globals);
      text = text.replace(/\.\.\./g, "…");
      text = globals.converter._dispatch("ellipsis.after", text, options, globals);
      return text;
    });
    showdown2.subParser("emoji", function(text, options, globals) {
      if (!options.emoji) {
        return text;
      }
      text = globals.converter._dispatch("emoji.before", text, options, globals);
      var emojiRgx = /:([\S]+?):/g;
      text = text.replace(emojiRgx, function(wm, emojiCode) {
        if (showdown2.helper.emojis.hasOwnProperty(emojiCode)) {
          return showdown2.helper.emojis[emojiCode];
        }
        return wm;
      });
      text = globals.converter._dispatch("emoji.after", text, options, globals);
      return text;
    });
    showdown2.subParser("encodeAmpsAndAngles", function(text, options, globals) {
      text = globals.converter._dispatch("encodeAmpsAndAngles.before", text, options, globals);
      text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
      text = text.replace(/<(?![a-z\/?$!])/gi, "&lt;");
      text = text.replace(/</g, "&lt;");
      text = text.replace(/>/g, "&gt;");
      text = globals.converter._dispatch("encodeAmpsAndAngles.after", text, options, globals);
      return text;
    });
    showdown2.subParser("encodeBackslashEscapes", function(text, options, globals) {
      text = globals.converter._dispatch("encodeBackslashEscapes.before", text, options, globals);
      text = text.replace(/\\(\\)/g, showdown2.helper.escapeCharactersCallback);
      text = text.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, showdown2.helper.escapeCharactersCallback);
      text = globals.converter._dispatch("encodeBackslashEscapes.after", text, options, globals);
      return text;
    });
    showdown2.subParser("encodeCode", function(text, options, globals) {
      text = globals.converter._dispatch("encodeCode.before", text, options, globals);
      text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, showdown2.helper.escapeCharactersCallback);
      text = globals.converter._dispatch("encodeCode.after", text, options, globals);
      return text;
    });
    showdown2.subParser("escapeSpecialCharsWithinTagAttributes", function(text, options, globals) {
      text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", text, options, globals);
      var tags = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
      text = text.replace(tags, function(wholeMatch) {
        return wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, showdown2.helper.escapeCharactersCallback);
      });
      text = text.replace(comments, function(wholeMatch) {
        return wholeMatch.replace(/([\\`*_~=|])/g, showdown2.helper.escapeCharactersCallback);
      });
      text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", text, options, globals);
      return text;
    });
    showdown2.subParser("githubCodeBlocks", function(text, options, globals) {
      if (!options.ghCodeBlocks) {
        return text;
      }
      text = globals.converter._dispatch("githubCodeBlocks.before", text, options, globals);
      text += "¨0";
      text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(wholeMatch, delim, language, codeblock) {
        var end2 = options.omitExtraWLInCodeBlocks ? "" : "\n";
        codeblock = showdown2.subParser("encodeCode")(codeblock, options, globals);
        codeblock = showdown2.subParser("detab")(codeblock, options, globals);
        codeblock = codeblock.replace(/^\n+/g, "");
        codeblock = codeblock.replace(/\n+$/g, "");
        codeblock = "<pre><code" + (language ? ' class="' + language + " language-" + language + '"' : "") + ">" + codeblock + end2 + "</code></pre>";
        codeblock = showdown2.subParser("hashBlock")(codeblock, options, globals);
        return "\n\n¨G" + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock }) - 1) + "G\n\n";
      });
      text = text.replace(/¨0/, "");
      return globals.converter._dispatch("githubCodeBlocks.after", text, options, globals);
    });
    showdown2.subParser("hashBlock", function(text, options, globals) {
      text = globals.converter._dispatch("hashBlock.before", text, options, globals);
      text = text.replace(/(^\n+|\n+$)/g, "");
      text = "\n\n¨K" + (globals.gHtmlBlocks.push(text) - 1) + "K\n\n";
      text = globals.converter._dispatch("hashBlock.after", text, options, globals);
      return text;
    });
    showdown2.subParser("hashCodeTags", function(text, options, globals) {
      text = globals.converter._dispatch("hashCodeTags.before", text, options, globals);
      var repFunc = function(wholeMatch, match, left2, right2) {
        var codeblock = left2 + showdown2.subParser("encodeCode")(match, options, globals) + right2;
        return "¨C" + (globals.gHtmlSpans.push(codeblock) - 1) + "C";
      };
      text = showdown2.helper.replaceRecursiveRegExp(text, repFunc, "<code\\b[^>]*>", "</code>", "gim");
      text = globals.converter._dispatch("hashCodeTags.after", text, options, globals);
      return text;
    });
    showdown2.subParser("hashElement", function(text, options, globals) {
      return function(wholeMatch, m1) {
        var blockText = m1;
        blockText = blockText.replace(/\n\n/g, "\n");
        blockText = blockText.replace(/^\n/, "");
        blockText = blockText.replace(/\n+$/g, "");
        blockText = "\n\n¨K" + (globals.gHtmlBlocks.push(blockText) - 1) + "K\n\n";
        return blockText;
      };
    });
    showdown2.subParser("hashHTMLBlocks", function(text, options, globals) {
      text = globals.converter._dispatch("hashHTMLBlocks.before", text, options, globals);
      var blockTags = [
        "pre",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "table",
        "dl",
        "ol",
        "ul",
        "script",
        "noscript",
        "form",
        "fieldset",
        "iframe",
        "math",
        "style",
        "section",
        "header",
        "footer",
        "nav",
        "article",
        "aside",
        "address",
        "audio",
        "canvas",
        "figure",
        "hgroup",
        "output",
        "video",
        "p"
      ], repFunc = function(wholeMatch, match, left2, right2) {
        var txt = wholeMatch;
        if (left2.search(/\bmarkdown\b/) !== -1) {
          txt = left2 + globals.converter.makeHtml(match) + right2;
        }
        return "\n\n¨K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
      };
      if (options.backslashEscapesHTMLTags) {
        text = text.replace(/\\<(\/?[^>]+?)>/g, function(wm, inside) {
          return "&lt;" + inside + "&gt;";
        });
      }
      for (var i = 0; i < blockTags.length; ++i) {
        var opTagPos, rgx1 = new RegExp("^ {0,3}(<" + blockTags[i] + "\\b[^>]*>)", "im"), patLeft = "<" + blockTags[i] + "\\b[^>]*>", patRight = "</" + blockTags[i] + ">";
        while ((opTagPos = showdown2.helper.regexIndexOf(text, rgx1)) !== -1) {
          var subTexts = showdown2.helper.splitAtIndex(text, opTagPos), newSubText1 = showdown2.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, "im");
          if (newSubText1 === subTexts[1]) {
            break;
          }
          text = subTexts[0].concat(newSubText1);
        }
      }
      text = text.replace(
        /(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
        showdown2.subParser("hashElement")(text, options, globals)
      );
      text = showdown2.helper.replaceRecursiveRegExp(text, function(txt) {
        return "\n\n¨K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
      }, "^ {0,3}<!--", "-->", "gm");
      text = text.replace(
        /(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
        showdown2.subParser("hashElement")(text, options, globals)
      );
      text = globals.converter._dispatch("hashHTMLBlocks.after", text, options, globals);
      return text;
    });
    showdown2.subParser("hashHTMLSpans", function(text, options, globals) {
      text = globals.converter._dispatch("hashHTMLSpans.before", text, options, globals);
      function hashHTMLSpan(html) {
        return "¨C" + (globals.gHtmlSpans.push(html) - 1) + "C";
      }
      text = text.replace(/<[^>]+?\/>/gi, function(wm) {
        return hashHTMLSpan(wm);
      });
      text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(wm) {
        return hashHTMLSpan(wm);
      });
      text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(wm) {
        return hashHTMLSpan(wm);
      });
      text = text.replace(/<[^>]+?>/gi, function(wm) {
        return hashHTMLSpan(wm);
      });
      text = globals.converter._dispatch("hashHTMLSpans.after", text, options, globals);
      return text;
    });
    showdown2.subParser("unhashHTMLSpans", function(text, options, globals) {
      text = globals.converter._dispatch("unhashHTMLSpans.before", text, options, globals);
      for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
        var repText = globals.gHtmlSpans[i], limit = 0;
        while (/¨C(\d+)C/.test(repText)) {
          var num = RegExp.$1;
          repText = repText.replace("¨C" + num + "C", globals.gHtmlSpans[num]);
          if (limit === 10) {
            console.error("maximum nesting of 10 spans reached!!!");
            break;
          }
          ++limit;
        }
        text = text.replace("¨C" + i + "C", repText);
      }
      text = globals.converter._dispatch("unhashHTMLSpans.after", text, options, globals);
      return text;
    });
    showdown2.subParser("hashPreCodeTags", function(text, options, globals) {
      text = globals.converter._dispatch("hashPreCodeTags.before", text, options, globals);
      var repFunc = function(wholeMatch, match, left2, right2) {
        var codeblock = left2 + showdown2.subParser("encodeCode")(match, options, globals) + right2;
        return "\n\n¨G" + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock }) - 1) + "G\n\n";
      };
      text = showdown2.helper.replaceRecursiveRegExp(text, repFunc, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim");
      text = globals.converter._dispatch("hashPreCodeTags.after", text, options, globals);
      return text;
    });
    showdown2.subParser("headers", function(text, options, globals) {
      text = globals.converter._dispatch("headers.before", text, options, globals);
      var headerLevelStart = isNaN(parseInt(options.headerLevelStart)) ? 1 : parseInt(options.headerLevelStart), setextRegexH1 = options.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, setextRegexH2 = options.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
      text = text.replace(setextRegexH1, function(wholeMatch, m1) {
        var spanGamut = showdown2.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
        return showdown2.subParser("hashBlock")(hashBlock, options, globals);
      });
      text = text.replace(setextRegexH2, function(matchFound, m1) {
        var spanGamut = showdown2.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart + 1, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
        return showdown2.subParser("hashBlock")(hashBlock, options, globals);
      });
      var atxStyle = options.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
      text = text.replace(atxStyle, function(wholeMatch, m1, m2) {
        var hText = m2;
        if (options.customizedHeaderId) {
          hText = m2.replace(/\s?\{([^{]+?)}\s*$/, "");
        }
        var span = showdown2.subParser("spanGamut")(hText, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m2) + '"', hLevel = headerLevelStart - 1 + m1.length, header = "<h" + hLevel + hID + ">" + span + "</h" + hLevel + ">";
        return showdown2.subParser("hashBlock")(header, options, globals);
      });
      function headerId(m2) {
        var title, prefix;
        if (options.customizedHeaderId) {
          var match = m2.match(/\{([^{]+?)}\s*$/);
          if (match && match[1]) {
            m2 = match[1];
          }
        }
        title = m2;
        if (showdown2.helper.isString(options.prefixHeaderId)) {
          prefix = options.prefixHeaderId;
        } else if (options.prefixHeaderId === true) {
          prefix = "section-";
        } else {
          prefix = "";
        }
        if (!options.rawPrefixHeaderId) {
          title = prefix + title;
        }
        if (options.ghCompatibleHeaderId) {
          title = title.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase();
        } else if (options.rawHeaderId) {
          title = title.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "¨").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase();
        } else {
          title = title.replace(/[^\w]/g, "").toLowerCase();
        }
        if (options.rawPrefixHeaderId) {
          title = prefix + title;
        }
        if (globals.hashLinkCounts[title]) {
          title = title + "-" + globals.hashLinkCounts[title]++;
        } else {
          globals.hashLinkCounts[title] = 1;
        }
        return title;
      }
      text = globals.converter._dispatch("headers.after", text, options, globals);
      return text;
    });
    showdown2.subParser("horizontalRule", function(text, options, globals) {
      text = globals.converter._dispatch("horizontalRule.before", text, options, globals);
      var key = showdown2.subParser("hashBlock")("<hr />", options, globals);
      text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
      text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
      text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
      text = globals.converter._dispatch("horizontalRule.after", text, options, globals);
      return text;
    });
    showdown2.subParser("images", function(text, options, globals) {
      text = globals.converter._dispatch("images.before", text, options, globals);
      var inlineRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, crazyRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, base64RegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;
      function writeImageTagBase64(wholeMatch, altText, linkId, url, width2, height2, m5, title) {
        url = url.replace(/\s/g, "");
        return writeImageTag(wholeMatch, altText, linkId, url, width2, height2, m5, title);
      }
      function writeImageTag(wholeMatch, altText, linkId, url, width2, height2, m5, title) {
        var gUrls = globals.gUrls, gTitles = globals.gTitles, gDims = globals.gDimensions;
        linkId = linkId.toLowerCase();
        if (!title) {
          title = "";
        }
        if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
          url = "";
        } else if (url === "" || url === null) {
          if (linkId === "" || linkId === null) {
            linkId = altText.toLowerCase().replace(/ ?\n/g, " ");
          }
          url = "#" + linkId;
          if (!showdown2.helper.isUndefined(gUrls[linkId])) {
            url = gUrls[linkId];
            if (!showdown2.helper.isUndefined(gTitles[linkId])) {
              title = gTitles[linkId];
            }
            if (!showdown2.helper.isUndefined(gDims[linkId])) {
              width2 = gDims[linkId].width;
              height2 = gDims[linkId].height;
            }
          } else {
            return wholeMatch;
          }
        }
        altText = altText.replace(/"/g, "&quot;").replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
        url = url.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
        var result = '<img src="' + url + '" alt="' + altText + '"';
        if (title && showdown2.helper.isString(title)) {
          title = title.replace(/"/g, "&quot;").replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
          result += ' title="' + title + '"';
        }
        if (width2 && height2) {
          width2 = width2 === "*" ? "auto" : width2;
          height2 = height2 === "*" ? "auto" : height2;
          result += ' width="' + width2 + '"';
          result += ' height="' + height2 + '"';
        }
        result += " />";
        return result;
      }
      text = text.replace(referenceRegExp, writeImageTag);
      text = text.replace(base64RegExp, writeImageTagBase64);
      text = text.replace(crazyRegExp, writeImageTag);
      text = text.replace(inlineRegExp, writeImageTag);
      text = text.replace(refShortcutRegExp, writeImageTag);
      text = globals.converter._dispatch("images.after", text, options, globals);
      return text;
    });
    showdown2.subParser("italicsAndBold", function(text, options, globals) {
      text = globals.converter._dispatch("italicsAndBold.before", text, options, globals);
      function parseInside(txt, left2, right2) {
        return left2 + txt + right2;
      }
      if (options.literalMidWordUnderscores) {
        text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
          return parseInside(txt, "<strong><em>", "</em></strong>");
        });
        text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
          return parseInside(txt, "<strong>", "</strong>");
        });
        text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function(wm, txt) {
          return parseInside(txt, "<em>", "</em>");
        });
      } else {
        text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<strong><em>", "</em></strong>") : wm;
        });
        text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<strong>", "</strong>") : wm;
        });
        text = text.replace(/_([^\s_][\s\S]*?)_/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<em>", "</em>") : wm;
        });
      }
      if (options.literalMidWordAsterisks) {
        text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(wm, lead, txt) {
          return parseInside(txt, lead + "<strong><em>", "</em></strong>");
        });
        text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(wm, lead, txt) {
          return parseInside(txt, lead + "<strong>", "</strong>");
        });
        text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(wm, lead, txt) {
          return parseInside(txt, lead + "<em>", "</em>");
        });
      } else {
        text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<strong><em>", "</em></strong>") : wm;
        });
        text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<strong>", "</strong>") : wm;
        });
        text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<em>", "</em>") : wm;
        });
      }
      text = globals.converter._dispatch("italicsAndBold.after", text, options, globals);
      return text;
    });
    showdown2.subParser("lists", function(text, options, globals) {
      function processListItems(listStr, trimTrailing) {
        globals.gListLevel++;
        listStr = listStr.replace(/\n{2,}$/, "\n");
        listStr += "¨0";
        var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, isParagraphed = /\n[ \t]*\n(?!¨0)/.test(listStr);
        if (options.disableForced4SpacesIndentedSublists) {
          rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
        }
        listStr = listStr.replace(rgx, function(wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
          checked = checked && checked.trim() !== "";
          var item = showdown2.subParser("outdent")(m4, options, globals), bulletStyle = "";
          if (taskbtn && options.tasklists) {
            bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
            item = item.replace(/^[ \t]*\[(x|X| )?]/m, function() {
              var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
              if (checked) {
                otp += " checked";
              }
              otp += ">";
              return otp;
            });
          }
          item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(wm2) {
            return "¨A" + wm2;
          });
          if (m1 || item.search(/\n{2,}/) > -1) {
            item = showdown2.subParser("githubCodeBlocks")(item, options, globals);
            item = showdown2.subParser("blockGamut")(item, options, globals);
          } else {
            item = showdown2.subParser("lists")(item, options, globals);
            item = item.replace(/\n$/, "");
            item = showdown2.subParser("hashHTMLBlocks")(item, options, globals);
            item = item.replace(/\n\n+/g, "\n\n");
            if (isParagraphed) {
              item = showdown2.subParser("paragraphs")(item, options, globals);
            } else {
              item = showdown2.subParser("spanGamut")(item, options, globals);
            }
          }
          item = item.replace("¨A", "");
          item = "<li" + bulletStyle + ">" + item + "</li>\n";
          return item;
        });
        listStr = listStr.replace(/¨0/g, "");
        globals.gListLevel--;
        if (trimTrailing) {
          listStr = listStr.replace(/\s+$/, "");
        }
        return listStr;
      }
      function styleStartNumber(list, listType) {
        if (listType === "ol") {
          var res = list.match(/^ *(\d+)\./);
          if (res && res[1] !== "1") {
            return ' start="' + res[1] + '"';
          }
        }
        return "";
      }
      function parseConsecutiveLists(list, listType, trimTrailing) {
        var olRgx = options.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, ulRgx = options.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, counterRxg = listType === "ul" ? olRgx : ulRgx, result = "";
        if (list.search(counterRxg) !== -1) {
          (function parseCL(txt) {
            var pos = txt.search(counterRxg), style3 = styleStartNumber(list, listType);
            if (pos !== -1) {
              result += "\n\n<" + listType + style3 + ">\n" + processListItems(txt.slice(0, pos), !!trimTrailing) + "</" + listType + ">\n";
              listType = listType === "ul" ? "ol" : "ul";
              counterRxg = listType === "ul" ? olRgx : ulRgx;
              parseCL(txt.slice(pos));
            } else {
              result += "\n\n<" + listType + style3 + ">\n" + processListItems(txt, !!trimTrailing) + "</" + listType + ">\n";
            }
          })(list);
        } else {
          var style2 = styleStartNumber(list, listType);
          result = "\n\n<" + listType + style2 + ">\n" + processListItems(list, !!trimTrailing) + "</" + listType + ">\n";
        }
        return result;
      }
      text = globals.converter._dispatch("lists.before", text, options, globals);
      text += "¨0";
      if (globals.gListLevel) {
        text = text.replace(
          /^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
          function(wholeMatch, list, m2) {
            var listType = m2.search(/[*+-]/g) > -1 ? "ul" : "ol";
            return parseConsecutiveLists(list, listType, true);
          }
        );
      } else {
        text = text.replace(
          /(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
          function(wholeMatch, m1, list, m3) {
            var listType = m3.search(/[*+-]/g) > -1 ? "ul" : "ol";
            return parseConsecutiveLists(list, listType, false);
          }
        );
      }
      text = text.replace(/¨0/, "");
      text = globals.converter._dispatch("lists.after", text, options, globals);
      return text;
    });
    showdown2.subParser("metadata", function(text, options, globals) {
      if (!options.metadata) {
        return text;
      }
      text = globals.converter._dispatch("metadata.before", text, options, globals);
      function parseMetadataContents(content) {
        globals.metadata.raw = content;
        content = content.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
        content = content.replace(/\n {4}/g, " ");
        content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(wm, key, value) {
          globals.metadata.parsed[key] = value;
          return "";
        });
      }
      text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(wholematch, format, content) {
        parseMetadataContents(content);
        return "¨M";
      });
      text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(wholematch, format, content) {
        if (format) {
          globals.metadata.format = format;
        }
        parseMetadataContents(content);
        return "¨M";
      });
      text = text.replace(/¨M/g, "");
      text = globals.converter._dispatch("metadata.after", text, options, globals);
      return text;
    });
    showdown2.subParser("outdent", function(text, options, globals) {
      text = globals.converter._dispatch("outdent.before", text, options, globals);
      text = text.replace(/^(\t|[ ]{1,4})/gm, "¨0");
      text = text.replace(/¨0/g, "");
      text = globals.converter._dispatch("outdent.after", text, options, globals);
      return text;
    });
    showdown2.subParser("paragraphs", function(text, options, globals) {
      text = globals.converter._dispatch("paragraphs.before", text, options, globals);
      text = text.replace(/^\n+/g, "");
      text = text.replace(/\n+$/g, "");
      var grafs = text.split(/\n{2,}/g), grafsOut = [], end2 = grafs.length;
      for (var i = 0; i < end2; i++) {
        var str = grafs[i];
        if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
          grafsOut.push(str);
        } else if (str.search(/\S/) >= 0) {
          str = showdown2.subParser("spanGamut")(str, options, globals);
          str = str.replace(/^([ \t]*)/g, "<p>");
          str += "</p>";
          grafsOut.push(str);
        }
      }
      end2 = grafsOut.length;
      for (i = 0; i < end2; i++) {
        var blockText = "", grafsOutIt = grafsOut[i], codeFlag = false;
        while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
          var delim = RegExp.$1, num = RegExp.$2;
          if (delim === "K") {
            blockText = globals.gHtmlBlocks[num];
          } else {
            if (codeFlag) {
              blockText = showdown2.subParser("encodeCode")(globals.ghCodeBlocks[num].text, options, globals);
            } else {
              blockText = globals.ghCodeBlocks[num].codeblock;
            }
          }
          blockText = blockText.replace(/\$/g, "$$$$");
          grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
          if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
            codeFlag = true;
          }
        }
        grafsOut[i] = grafsOutIt;
      }
      text = grafsOut.join("\n");
      text = text.replace(/^\n+/g, "");
      text = text.replace(/\n+$/g, "");
      return globals.converter._dispatch("paragraphs.after", text, options, globals);
    });
    showdown2.subParser("runExtension", function(ext, text, options, globals) {
      if (ext.filter) {
        text = ext.filter(text, globals.converter, options);
      } else if (ext.regex) {
        var re = ext.regex;
        if (!(re instanceof RegExp)) {
          re = new RegExp(re, "g");
        }
        text = text.replace(re, ext.replace);
      }
      return text;
    });
    showdown2.subParser("spanGamut", function(text, options, globals) {
      text = globals.converter._dispatch("spanGamut.before", text, options, globals);
      text = showdown2.subParser("codeSpans")(text, options, globals);
      text = showdown2.subParser("escapeSpecialCharsWithinTagAttributes")(text, options, globals);
      text = showdown2.subParser("encodeBackslashEscapes")(text, options, globals);
      text = showdown2.subParser("images")(text, options, globals);
      text = showdown2.subParser("anchors")(text, options, globals);
      text = showdown2.subParser("autoLinks")(text, options, globals);
      text = showdown2.subParser("simplifiedAutoLinks")(text, options, globals);
      text = showdown2.subParser("emoji")(text, options, globals);
      text = showdown2.subParser("underline")(text, options, globals);
      text = showdown2.subParser("italicsAndBold")(text, options, globals);
      text = showdown2.subParser("strikethrough")(text, options, globals);
      text = showdown2.subParser("ellipsis")(text, options, globals);
      text = showdown2.subParser("hashHTMLSpans")(text, options, globals);
      text = showdown2.subParser("encodeAmpsAndAngles")(text, options, globals);
      if (options.simpleLineBreaks) {
        if (!/\n\n¨K/.test(text)) {
          text = text.replace(/\n+/g, "<br />\n");
        }
      } else {
        text = text.replace(/  +\n/g, "<br />\n");
      }
      text = globals.converter._dispatch("spanGamut.after", text, options, globals);
      return text;
    });
    showdown2.subParser("strikethrough", function(text, options, globals) {
      function parseInside(txt) {
        if (options.simplifiedAutoLink) {
          txt = showdown2.subParser("simplifiedAutoLinks")(txt, options, globals);
        }
        return "<del>" + txt + "</del>";
      }
      if (options.strikethrough) {
        text = globals.converter._dispatch("strikethrough.before", text, options, globals);
        text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(wm, txt) {
          return parseInside(txt);
        });
        text = globals.converter._dispatch("strikethrough.after", text, options, globals);
      }
      return text;
    });
    showdown2.subParser("stripLinkDefinitions", function(text, options, globals) {
      var regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, base64Regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
      text += "¨0";
      var replaceFunc = function(wholeMatch, linkId, url, width2, height2, blankLines, title) {
        linkId = linkId.toLowerCase();
        if (text.toLowerCase().split(linkId).length - 1 < 2) {
          return wholeMatch;
        }
        if (url.match(/^data:.+?\/.+?;base64,/)) {
          globals.gUrls[linkId] = url.replace(/\s/g, "");
        } else {
          globals.gUrls[linkId] = showdown2.subParser("encodeAmpsAndAngles")(url, options, globals);
        }
        if (blankLines) {
          return blankLines + title;
        } else {
          if (title) {
            globals.gTitles[linkId] = title.replace(/"|'/g, "&quot;");
          }
          if (options.parseImgDimensions && width2 && height2) {
            globals.gDimensions[linkId] = {
              width: width2,
              height: height2
            };
          }
        }
        return "";
      };
      text = text.replace(base64Regex, replaceFunc);
      text = text.replace(regex, replaceFunc);
      text = text.replace(/¨0/, "");
      return text;
    });
    showdown2.subParser("tables", function(text, options, globals) {
      if (!options.tables) {
        return text;
      }
      var tableRgx = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
      function parseStyles(sLine) {
        if (/^:[ \t]*--*$/.test(sLine)) {
          return ' style="text-align:left;"';
        } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
          return ' style="text-align:right;"';
        } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
          return ' style="text-align:center;"';
        } else {
          return "";
        }
      }
      function parseHeaders(header, style2) {
        var id = "";
        header = header.trim();
        if (options.tablesHeaderId || options.tableHeaderId) {
          id = ' id="' + header.replace(/ /g, "_").toLowerCase() + '"';
        }
        header = showdown2.subParser("spanGamut")(header, options, globals);
        return "<th" + id + style2 + ">" + header + "</th>\n";
      }
      function parseCells(cell, style2) {
        var subText = showdown2.subParser("spanGamut")(cell, options, globals);
        return "<td" + style2 + ">" + subText + "</td>\n";
      }
      function buildTable(headers, cells) {
        var tb = "<table>\n<thead>\n<tr>\n", tblLgn = headers.length;
        for (var i = 0; i < tblLgn; ++i) {
          tb += headers[i];
        }
        tb += "</tr>\n</thead>\n<tbody>\n";
        for (i = 0; i < cells.length; ++i) {
          tb += "<tr>\n";
          for (var ii = 0; ii < tblLgn; ++ii) {
            tb += cells[i][ii];
          }
          tb += "</tr>\n";
        }
        tb += "</tbody>\n</table>\n";
        return tb;
      }
      function parseTable(rawTable) {
        var i, tableLines = rawTable.split("\n");
        for (i = 0; i < tableLines.length; ++i) {
          if (/^ {0,3}\|/.test(tableLines[i])) {
            tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, "");
          }
          if (/\|[ \t]*$/.test(tableLines[i])) {
            tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, "");
          }
          tableLines[i] = showdown2.subParser("codeSpans")(tableLines[i], options, globals);
        }
        var rawHeaders = tableLines[0].split("|").map(function(s) {
          return s.trim();
        }), rawStyles = tableLines[1].split("|").map(function(s) {
          return s.trim();
        }), rawCells = [], headers = [], styles = [], cells = [];
        tableLines.shift();
        tableLines.shift();
        for (i = 0; i < tableLines.length; ++i) {
          if (tableLines[i].trim() === "") {
            continue;
          }
          rawCells.push(
            tableLines[i].split("|").map(function(s) {
              return s.trim();
            })
          );
        }
        if (rawHeaders.length < rawStyles.length) {
          return rawTable;
        }
        for (i = 0; i < rawStyles.length; ++i) {
          styles.push(parseStyles(rawStyles[i]));
        }
        for (i = 0; i < rawHeaders.length; ++i) {
          if (showdown2.helper.isUndefined(styles[i])) {
            styles[i] = "";
          }
          headers.push(parseHeaders(rawHeaders[i], styles[i]));
        }
        for (i = 0; i < rawCells.length; ++i) {
          var row = [];
          for (var ii = 0; ii < headers.length; ++ii) {
            if (showdown2.helper.isUndefined(rawCells[i][ii]))
              ;
            row.push(parseCells(rawCells[i][ii], styles[ii]));
          }
          cells.push(row);
        }
        return buildTable(headers, cells);
      }
      text = globals.converter._dispatch("tables.before", text, options, globals);
      text = text.replace(/\\(\|)/g, showdown2.helper.escapeCharactersCallback);
      text = text.replace(tableRgx, parseTable);
      text = text.replace(singeColTblRgx, parseTable);
      text = globals.converter._dispatch("tables.after", text, options, globals);
      return text;
    });
    showdown2.subParser("underline", function(text, options, globals) {
      if (!options.underline) {
        return text;
      }
      text = globals.converter._dispatch("underline.before", text, options, globals);
      if (options.literalMidWordUnderscores) {
        text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
          return "<u>" + txt + "</u>";
        });
        text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
          return "<u>" + txt + "</u>";
        });
      } else {
        text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m2) {
          return /\S$/.test(m2) ? "<u>" + m2 + "</u>" : wm;
        });
        text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m2) {
          return /\S$/.test(m2) ? "<u>" + m2 + "</u>" : wm;
        });
      }
      text = text.replace(/(_)/g, showdown2.helper.escapeCharactersCallback);
      text = globals.converter._dispatch("underline.after", text, options, globals);
      return text;
    });
    showdown2.subParser("unescapeSpecialChars", function(text, options, globals) {
      text = globals.converter._dispatch("unescapeSpecialChars.before", text, options, globals);
      text = text.replace(/¨E(\d+)E/g, function(wholeMatch, m1) {
        var charCodeToReplace = parseInt(m1);
        return String.fromCharCode(charCodeToReplace);
      });
      text = globals.converter._dispatch("unescapeSpecialChars.after", text, options, globals);
      return text;
    });
    showdown2.subParser("makeMarkdown.blockquote", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes()) {
        var children = node.childNodes, childrenLength = children.length;
        for (var i = 0; i < childrenLength; ++i) {
          var innerTxt = showdown2.subParser("makeMarkdown.node")(children[i], globals);
          if (innerTxt === "") {
            continue;
          }
          txt += innerTxt;
        }
      }
      txt = txt.trim();
      txt = "> " + txt.split("\n").join("\n> ");
      return txt;
    });
    showdown2.subParser("makeMarkdown.codeBlock", function(node, globals) {
      var lang = node.getAttribute("language"), num = node.getAttribute("precodenum");
      return "```" + lang + "\n" + globals.preList[num] + "\n```";
    });
    showdown2.subParser("makeMarkdown.codeSpan", function(node) {
      return "`" + node.innerHTML + "`";
    });
    showdown2.subParser("makeMarkdown.emphasis", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes()) {
        txt += "*";
        var children = node.childNodes, childrenLength = children.length;
        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
        }
        txt += "*";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.header", function(node, globals, headerLevel) {
      var headerMark = new Array(headerLevel + 1).join("#"), txt = "";
      if (node.hasChildNodes()) {
        txt = headerMark + " ";
        var children = node.childNodes, childrenLength = children.length;
        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
        }
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.hr", function() {
      return "---";
    });
    showdown2.subParser("makeMarkdown.image", function(node) {
      var txt = "";
      if (node.hasAttribute("src")) {
        txt += "![" + node.getAttribute("alt") + "](";
        txt += "<" + node.getAttribute("src") + ">";
        if (node.hasAttribute("width") && node.hasAttribute("height")) {
          txt += " =" + node.getAttribute("width") + "x" + node.getAttribute("height");
        }
        if (node.hasAttribute("title")) {
          txt += ' "' + node.getAttribute("title") + '"';
        }
        txt += ")";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.links", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes() && node.hasAttribute("href")) {
        var children = node.childNodes, childrenLength = children.length;
        txt = "[";
        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
        }
        txt += "](";
        txt += "<" + node.getAttribute("href") + ">";
        if (node.hasAttribute("title")) {
          txt += ' "' + node.getAttribute("title") + '"';
        }
        txt += ")";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.list", function(node, globals, type) {
      var txt = "";
      if (!node.hasChildNodes()) {
        return "";
      }
      var listItems = node.childNodes, listItemsLenght = listItems.length, listNum = node.getAttribute("start") || 1;
      for (var i = 0; i < listItemsLenght; ++i) {
        if (typeof listItems[i].tagName === "undefined" || listItems[i].tagName.toLowerCase() !== "li") {
          continue;
        }
        var bullet = "";
        if (type === "ol") {
          bullet = listNum.toString() + ". ";
        } else {
          bullet = "- ";
        }
        txt += bullet + showdown2.subParser("makeMarkdown.listItem")(listItems[i], globals);
        ++listNum;
      }
      txt += "\n<!-- -->\n";
      return txt.trim();
    });
    showdown2.subParser("makeMarkdown.listItem", function(node, globals) {
      var listItemTxt = "";
      var children = node.childNodes, childrenLenght = children.length;
      for (var i = 0; i < childrenLenght; ++i) {
        listItemTxt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
      }
      if (!/\n$/.test(listItemTxt)) {
        listItemTxt += "\n";
      } else {
        listItemTxt = listItemTxt.split("\n").join("\n    ").replace(/^ {4}$/gm, "").replace(/\n\n+/g, "\n\n");
      }
      return listItemTxt;
    });
    showdown2.subParser("makeMarkdown.node", function(node, globals, spansOnly) {
      spansOnly = spansOnly || false;
      var txt = "";
      if (node.nodeType === 3) {
        return showdown2.subParser("makeMarkdown.txt")(node, globals);
      }
      if (node.nodeType === 8) {
        return "<!--" + node.data + "-->\n\n";
      }
      if (node.nodeType !== 1) {
        return "";
      }
      var tagName = node.tagName.toLowerCase();
      switch (tagName) {
        case "h1":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 1) + "\n\n";
          }
          break;
        case "h2":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 2) + "\n\n";
          }
          break;
        case "h3":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 3) + "\n\n";
          }
          break;
        case "h4":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 4) + "\n\n";
          }
          break;
        case "h5":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 5) + "\n\n";
          }
          break;
        case "h6":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 6) + "\n\n";
          }
          break;
        case "p":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.paragraph")(node, globals) + "\n\n";
          }
          break;
        case "blockquote":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.blockquote")(node, globals) + "\n\n";
          }
          break;
        case "hr":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.hr")(node, globals) + "\n\n";
          }
          break;
        case "ol":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.list")(node, globals, "ol") + "\n\n";
          }
          break;
        case "ul":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.list")(node, globals, "ul") + "\n\n";
          }
          break;
        case "precode":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.codeBlock")(node, globals) + "\n\n";
          }
          break;
        case "pre":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.pre")(node, globals) + "\n\n";
          }
          break;
        case "table":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.table")(node, globals) + "\n\n";
          }
          break;
        case "code":
          txt = showdown2.subParser("makeMarkdown.codeSpan")(node, globals);
          break;
        case "em":
        case "i":
          txt = showdown2.subParser("makeMarkdown.emphasis")(node, globals);
          break;
        case "strong":
        case "b":
          txt = showdown2.subParser("makeMarkdown.strong")(node, globals);
          break;
        case "del":
          txt = showdown2.subParser("makeMarkdown.strikethrough")(node, globals);
          break;
        case "a":
          txt = showdown2.subParser("makeMarkdown.links")(node, globals);
          break;
        case "img":
          txt = showdown2.subParser("makeMarkdown.image")(node, globals);
          break;
        default:
          txt = node.outerHTML + "\n\n";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.paragraph", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes()) {
        var children = node.childNodes, childrenLength = children.length;
        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
        }
      }
      txt = txt.trim();
      return txt;
    });
    showdown2.subParser("makeMarkdown.pre", function(node, globals) {
      var num = node.getAttribute("prenum");
      return "<pre>" + globals.preList[num] + "</pre>";
    });
    showdown2.subParser("makeMarkdown.strikethrough", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes()) {
        txt += "~~";
        var children = node.childNodes, childrenLength = children.length;
        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
        }
        txt += "~~";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.strong", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes()) {
        txt += "**";
        var children = node.childNodes, childrenLength = children.length;
        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
        }
        txt += "**";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.table", function(node, globals) {
      var txt = "", tableArray = [[], []], headings = node.querySelectorAll("thead>tr>th"), rows = node.querySelectorAll("tbody>tr"), i, ii;
      for (i = 0; i < headings.length; ++i) {
        var headContent = showdown2.subParser("makeMarkdown.tableCell")(headings[i], globals), allign = "---";
        if (headings[i].hasAttribute("style")) {
          var style2 = headings[i].getAttribute("style").toLowerCase().replace(/\s/g, "");
          switch (style2) {
            case "text-align:left;":
              allign = ":---";
              break;
            case "text-align:right;":
              allign = "---:";
              break;
            case "text-align:center;":
              allign = ":---:";
              break;
          }
        }
        tableArray[0][i] = headContent.trim();
        tableArray[1][i] = allign;
      }
      for (i = 0; i < rows.length; ++i) {
        var r2 = tableArray.push([]) - 1, cols = rows[i].getElementsByTagName("td");
        for (ii = 0; ii < headings.length; ++ii) {
          var cellContent = " ";
          if (typeof cols[ii] !== "undefined") {
            cellContent = showdown2.subParser("makeMarkdown.tableCell")(cols[ii], globals);
          }
          tableArray[r2].push(cellContent);
        }
      }
      var cellSpacesCount = 3;
      for (i = 0; i < tableArray.length; ++i) {
        for (ii = 0; ii < tableArray[i].length; ++ii) {
          var strLen = tableArray[i][ii].length;
          if (strLen > cellSpacesCount) {
            cellSpacesCount = strLen;
          }
        }
      }
      for (i = 0; i < tableArray.length; ++i) {
        for (ii = 0; ii < tableArray[i].length; ++ii) {
          if (i === 1) {
            if (tableArray[i][ii].slice(-1) === ":") {
              tableArray[i][ii] = showdown2.helper.padEnd(tableArray[i][ii].slice(-1), cellSpacesCount - 1, "-") + ":";
            } else {
              tableArray[i][ii] = showdown2.helper.padEnd(tableArray[i][ii], cellSpacesCount, "-");
            }
          } else {
            tableArray[i][ii] = showdown2.helper.padEnd(tableArray[i][ii], cellSpacesCount);
          }
        }
        txt += "| " + tableArray[i].join(" | ") + " |\n";
      }
      return txt.trim();
    });
    showdown2.subParser("makeMarkdown.tableCell", function(node, globals) {
      var txt = "";
      if (!node.hasChildNodes()) {
        return "";
      }
      var children = node.childNodes, childrenLength = children.length;
      for (var i = 0; i < childrenLength; ++i) {
        txt += showdown2.subParser("makeMarkdown.node")(children[i], globals, true);
      }
      return txt.trim();
    });
    showdown2.subParser("makeMarkdown.txt", function(node) {
      var txt = node.nodeValue;
      txt = txt.replace(/ +/g, " ");
      txt = txt.replace(/¨NBSP;/g, " ");
      txt = showdown2.helper.unescapeHTMLEntities(txt);
      txt = txt.replace(/([*_~|`])/g, "\\$1");
      txt = txt.replace(/^(\s*)>/g, "\\$1>");
      txt = txt.replace(/^#/gm, "\\#");
      txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3");
      txt = txt.replace(/^( {0,3}\d+)\./gm, "$1\\.");
      txt = txt.replace(/^( {0,3})([+-])/gm, "$1\\$2");
      txt = txt.replace(/]([\s]*)\(/g, "\\]$1\\(");
      txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:");
      return txt;
    });
    var root2 = this;
    if (module.exports) {
      module.exports = showdown2;
    } else {
      root2.showdown = showdown2;
    }
  }).call(commonjsGlobal);
})(showdown);
var showdownExports = showdown.exports;
async function getSummary(url, signal) {
  const mdConverter = new showdownExports.Converter();
  return {
    status: "green",
    summary: mdConverter.makeHtml(`- **Security Responsibility**: Users are responsible for keeping their account access secure.
      - **Liability Limits**: Robinhood isn't liable for unauthorized access or system failures.
      - **Access Rights**: Robinhood can restrict or terminate accounts at any time without notice.
      - **Electronic Communications**: Users agree to receive documents and communications electronically.
      - **Contact Information**: Users must keep their contact details current.
      - **Governing Law**: Governed by California law, with some federal and FINRA regulations also applicable.`)
  };
}
async function getChatResponse(url, message, signal) {
  await new Promise((resolve) => setTimeout(resolve, 2e3));
  return `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
}
var Send = {};
var interopRequireDefault = { exports: {} };
(function(module) {
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  module.exports = _interopRequireDefault2, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(interopRequireDefault);
var interopRequireDefaultExports = interopRequireDefault.exports;
var createSvgIcon$1 = {};
function isPlainObject(item) {
  if (typeof item !== "object" || item === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(item);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in item) && !(Symbol.iterator in item);
}
function deepClone(source) {
  if (!isPlainObject(source)) {
    return source;
  }
  const output = {};
  Object.keys(source).forEach((key) => {
    output[key] = deepClone(source[key]);
  });
  return output;
}
function deepmerge$1(target, source, options = {
  clone: true
}) {
  const output = options.clone ? _extends$1({}, target) : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (key === "__proto__") {
        return;
      }
      if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
        output[key] = deepmerge$1(target[key], source[key], options);
      } else if (options.clone) {
        output[key] = isPlainObject(source[key]) ? deepClone(source[key]) : source[key];
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}
const deepmerge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: deepmerge$1,
  isPlainObject
}, Symbol.toStringTag, { value: "Module" }));
function formatMuiErrorMessage$1(code) {
  let url = "https://mui.com/production-error/?code=" + code;
  for (let i = 1; i < arguments.length; i += 1) {
    url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return "Minified MUI error #" + code + "; visit " + url + " for the full message.";
}
const formatMuiErrorMessage = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: formatMuiErrorMessage$1
}, Symbol.toStringTag, { value: "Module" }));
var reactIs = { exports: {} };
var reactIs_production_min = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = Symbol.for("react.element"), c = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), e = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), h = Symbol.for("react.context"), k = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), n = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), t = Symbol.for("react.offscreen"), u;
u = Symbol.for("react.module.reference");
function v(a) {
  if ("object" === typeof a && null !== a) {
    var r2 = a.$$typeof;
    switch (r2) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case m:
          case n:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case h:
              case l:
              case q:
              case p:
              case g:
                return a;
              default:
                return r2;
            }
        }
      case c:
        return r2;
    }
  }
}
reactIs_production_min.ContextConsumer = h;
reactIs_production_min.ContextProvider = g;
reactIs_production_min.Element = b;
reactIs_production_min.ForwardRef = l;
reactIs_production_min.Fragment = d;
reactIs_production_min.Lazy = q;
reactIs_production_min.Memo = p;
reactIs_production_min.Portal = c;
reactIs_production_min.Profiler = f;
reactIs_production_min.StrictMode = e;
reactIs_production_min.Suspense = m;
reactIs_production_min.SuspenseList = n;
reactIs_production_min.isAsyncMode = function() {
  return false;
};
reactIs_production_min.isConcurrentMode = function() {
  return false;
};
reactIs_production_min.isContextConsumer = function(a) {
  return v(a) === h;
};
reactIs_production_min.isContextProvider = function(a) {
  return v(a) === g;
};
reactIs_production_min.isElement = function(a) {
  return "object" === typeof a && null !== a && a.$$typeof === b;
};
reactIs_production_min.isForwardRef = function(a) {
  return v(a) === l;
};
reactIs_production_min.isFragment = function(a) {
  return v(a) === d;
};
reactIs_production_min.isLazy = function(a) {
  return v(a) === q;
};
reactIs_production_min.isMemo = function(a) {
  return v(a) === p;
};
reactIs_production_min.isPortal = function(a) {
  return v(a) === c;
};
reactIs_production_min.isProfiler = function(a) {
  return v(a) === f;
};
reactIs_production_min.isStrictMode = function(a) {
  return v(a) === e;
};
reactIs_production_min.isSuspense = function(a) {
  return v(a) === m;
};
reactIs_production_min.isSuspenseList = function(a) {
  return v(a) === n;
};
reactIs_production_min.isValidElementType = function(a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === e || a === m || a === n || a === t || "object" === typeof a && null !== a && (a.$$typeof === q || a.$$typeof === p || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l || a.$$typeof === u || void 0 !== a.getModuleId) ? true : false;
};
reactIs_production_min.typeOf = v;
{
  reactIs.exports = reactIs_production_min;
}
var reactIsExports = reactIs.exports;
const fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function getFunctionName(fn2) {
  const match = `${fn2}`.match(fnNameMatchRegex);
  const name = match && match[1];
  return name || "";
}
function getFunctionComponentName(Component, fallback = "") {
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}
function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName);
}
function getDisplayName$1(Component) {
  if (Component == null) {
    return void 0;
  }
  if (typeof Component === "string") {
    return Component;
  }
  if (typeof Component === "function") {
    return getFunctionComponentName(Component, "Component");
  }
  if (typeof Component === "object") {
    switch (Component.$$typeof) {
      case reactIsExports.ForwardRef:
        return getWrappedName(Component, Component.render, "ForwardRef");
      case reactIsExports.Memo:
        return getWrappedName(Component, Component.type, "memo");
      default:
        return void 0;
    }
  }
  return void 0;
}
const getDisplayName = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: getDisplayName$1,
  getFunctionName
}, Symbol.toStringTag, { value: "Module" }));
function capitalize$1(string) {
  if (typeof string !== "string") {
    throw new Error(formatMuiErrorMessage$1(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const capitalize = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: capitalize$1
}, Symbol.toStringTag, { value: "Module" }));
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }
    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {
  });
}
function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout);
  };
  return debounced;
}
function deprecatedPropType(validator, reason) {
  {
    return () => null;
  }
}
function isMuiElement(element, muiNames) {
  var _muiName, _element$type;
  return /* @__PURE__ */ reactExports.isValidElement(element) && muiNames.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (_muiName = element.type.muiName) != null ? _muiName : (_element$type = element.type) == null || (_element$type = _element$type._payload) == null || (_element$type = _element$type.value) == null ? void 0 : _element$type.muiName
  ) !== -1;
}
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
function requirePropFactory(componentNameInError, Component) {
  {
    return () => null;
  }
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
const useEnhancedEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
const useEnhancedEffect$1 = useEnhancedEffect;
let globalId = 0;
function useGlobalId(idOverride) {
  const [defaultId, setDefaultId] = reactExports.useState(idOverride);
  const id = idOverride || defaultId;
  reactExports.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`mui-${globalId}`);
    }
  }, [defaultId]);
  return id;
}
const maybeReactUseId = React["useId".toString()];
function useId(idOverride) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId();
    return idOverride != null ? idOverride : reactId;
  }
  return useGlobalId(idOverride);
}
function unsupportedProp(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = reactExports.useRef(controlled !== void 0);
  const [valueState, setValue] = reactExports.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  const setValueIfUncontrolled = reactExports.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
function useEventCallback(fn2) {
  const ref = reactExports.useRef(fn2);
  useEnhancedEffect$1(() => {
    ref.current = fn2;
  });
  return reactExports.useRef((...args) => (
    // @ts-expect-error hide `this`
    (0, ref.current)(...args)
  )).current;
}
function useForkRef(...refs) {
  return reactExports.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
  }, refs);
}
class Timeout {
  constructor() {
    this.currentId = null;
    this.clear = () => {
      if (this.currentId !== null) {
        clearTimeout(this.currentId);
        this.currentId = null;
      }
    };
    this.disposeEffect = () => {
      return this.clear;
    };
  }
  static create() {
    return new Timeout();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay, fn2) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = null;
      fn2();
    }, delay);
  }
}
let hadKeyboardEvent = true;
let hadFocusVisibleRecently = false;
const hadFocusVisibleRecentlyTimeout = new Timeout();
const inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};
function focusTriggersKeyboardModality(node) {
  const {
    type,
    tagName
  } = node;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node.readOnly) {
    return true;
  }
  if (node.isContentEditable) {
    return true;
  }
  return false;
}
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}
function handlePointerDown() {
  hadKeyboardEvent = false;
}
function handleVisibilityChange() {
  if (this.visibilityState === "hidden") {
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, true);
  doc.addEventListener("mousedown", handlePointerDown, true);
  doc.addEventListener("pointerdown", handlePointerDown, true);
  doc.addEventListener("touchstart", handlePointerDown, true);
  doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}
function isFocusVisible(event) {
  const {
    target
  } = event;
  try {
    return target.matches(":focus-visible");
  } catch (error) {
  }
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}
function useIsFocusVisible() {
  const ref = reactExports.useCallback((node) => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = reactExports.useRef(false);
  function handleBlurVisible() {
    if (isFocusVisibleRef.current) {
      hadFocusVisibleRecently = true;
      hadFocusVisibleRecentlyTimeout.start(100, () => {
        hadFocusVisibleRecently = false;
      });
      isFocusVisibleRef.current = false;
      return true;
    }
    return false;
  }
  function handleFocusVisible(event) {
    if (isFocusVisible(event)) {
      isFocusVisibleRef.current = true;
      return true;
    }
    return false;
  }
  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}
function resolveProps(defaultProps, props) {
  const output = _extends$1({}, props);
  Object.keys(defaultProps).forEach((propName) => {
    if (propName.toString().match(/^(components|slots)$/)) {
      output[propName] = _extends$1({}, defaultProps[propName], output[propName]);
    } else if (propName.toString().match(/^(componentsProps|slotProps)$/)) {
      const defaultSlotProps = defaultProps[propName] || {};
      const slotProps = props[propName];
      output[propName] = {};
      if (!slotProps || !Object.keys(slotProps)) {
        output[propName] = defaultSlotProps;
      } else if (!defaultSlotProps || !Object.keys(defaultSlotProps)) {
        output[propName] = slotProps;
      } else {
        output[propName] = _extends$1({}, slotProps);
        Object.keys(defaultSlotProps).forEach((slotPropName) => {
          output[propName][slotPropName] = resolveProps(defaultSlotProps[slotPropName], slotProps[slotPropName]);
        });
      }
    } else if (output[propName] === void 0) {
      output[propName] = defaultProps[propName];
    }
  });
  return output;
}
function composeClasses(slots, getUtilityClass, classes = void 0) {
  const output = {};
  Object.keys(slots).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (slot) => {
      output[slot] = slots[slot].reduce((acc, key) => {
        if (key) {
          const utilityClass = getUtilityClass(key);
          if (utilityClass !== "") {
            acc.push(utilityClass);
          }
          if (classes && classes[key]) {
            acc.push(classes[key]);
          }
        }
        return acc;
      }, []).join(" ");
    }
  );
  return output;
}
const defaultGenerator = (componentName) => componentName;
const createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator) {
      generate = generator;
    },
    generate(componentName) {
      return generate(componentName);
    },
    reset() {
      generate = defaultGenerator;
    }
  };
};
const ClassNameGenerator = createClassNameGenerator();
const ClassNameGenerator$1 = ClassNameGenerator;
const globalStateClasses = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function generateUtilityClass(componentName, slot, globalStatePrefix = "Mui") {
  const globalStateClass = globalStateClasses[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator$1.generate(componentName)}-${slot}`;
}
function generateUtilityClasses(componentName, slots, globalStatePrefix = "Mui") {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });
  return result;
}
function clamp$1(val, min2 = Number.MIN_SAFE_INTEGER, max2 = Number.MAX_SAFE_INTEGER) {
  return Math.max(min2, Math.min(val, max2));
}
const clamp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: clamp$1
}, Symbol.toStringTag, { value: "Module" }));
function r(e2) {
  var t2, f2, n2 = "";
  if ("string" == typeof e2 || "number" == typeof e2)
    n2 += e2;
  else if ("object" == typeof e2)
    if (Array.isArray(e2)) {
      var o = e2.length;
      for (t2 = 0; t2 < o; t2++)
        e2[t2] && (f2 = r(e2[t2])) && (n2 && (n2 += " "), n2 += f2);
    } else
      for (f2 in e2)
        e2[f2] && (n2 && (n2 += " "), n2 += f2);
  return n2;
}
function clsx() {
  for (var e2, t2, f2 = 0, n2 = "", o = arguments.length; f2 < o; f2++)
    (e2 = arguments[f2]) && (t2 = r(e2)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
function getThemeProps(params) {
  const {
    theme: theme2,
    name,
    props
  } = params;
  if (!theme2 || !theme2.components || !theme2.components[name] || !theme2.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme2.components[name].defaultProps, props);
}
const _excluded$8 = ["values", "unit", "step"];
const sortBreakpointsValues = (values2) => {
  const breakpointsAsArray = Object.keys(values2).map((key) => ({
    key,
    val: values2[key]
  })) || [];
  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return _extends$1({}, acc, {
      [obj.key]: obj.val
    });
  }, {});
};
function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: values2 = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit = "px",
    step = 5
  } = breakpoints, other = _objectWithoutPropertiesLoose(breakpoints, _excluded$8);
  const sortedValues = sortBreakpointsValues(values2);
  const keys = Object.keys(sortedValues);
  function up(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start2, end2) {
    const endIndex = keys.indexOf(end2);
    return `@media (min-width:${typeof values2[start2] === "number" ? values2[start2] : start2}${unit}) and (max-width:${(endIndex !== -1 && typeof values2[keys[endIndex]] === "number" ? values2[keys[endIndex]] : end2) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  function not(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }
    return between(key, keys[keys.indexOf(key) + 1]).replace("@media", "@media not all and");
  }
  return _extends$1({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}
const shape = {
  borderRadius: 4
};
const shape$1 = shape;
function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge$1(acc, item, {
    clone: false
    // No need to clone deep, it's way faster.
  });
}
const values = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
};
const defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (key) => `@media (min-width:${values[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme2 = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme2.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = theme2.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;
  const breakpointsInOrder = (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style2) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style2);
}
function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== "string") {
    return null;
  }
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null) {
      return val;
    }
  }
  return path.split(".").reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}
function getStyleValue(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform) {
    value = transform(value, userValue, themeMapping);
  }
  return value;
}
function style$1(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options;
  const fn2 = (props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme2 = props.theme;
    const themeMapping = getPath(theme2, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize$1(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn2.propTypes = {};
  fn2.filterProps = [prop];
  return fn2;
}
function memoize(fn2) {
  const cache2 = {};
  return (arg) => {
    if (cache2[arg] === void 0) {
      cache2[arg] = fn2(arg);
    }
    return cache2[arg];
  };
}
const properties = {
  m: "margin",
  p: "padding"
};
const directions = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
};
const aliases = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
};
const getCssProperties = memoize((prop) => {
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }
  const [a, b2] = prop.split("");
  const property = properties[a];
  const direction = directions[b2] || "";
  return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
});
const marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"];
const paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
[...marginKeys, ...paddingKeys];
function createUnaryUnit(theme2, themeKey, defaultValue, propName) {
  var _getPath;
  const themeSpacing = (_getPath = getPath(theme2, themeKey, false)) != null ? _getPath : defaultValue;
  if (typeof themeSpacing === "number") {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      return themeSpacing * abs;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      return themeSpacing[abs];
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  return () => void 0;
}
function createUnarySpacing(theme2) {
  return createUnaryUnit(theme2, "spacing", 8);
}
function getValue(transformer, propValue) {
  if (typeof propValue === "string" || propValue == null) {
    return propValue;
  }
  const abs = Math.abs(propValue);
  const transformed = transformer(abs);
  if (propValue >= 0) {
    return transformed;
  }
  if (typeof transformed === "number") {
    return -transformed;
  }
  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
  if (keys.indexOf(prop) === -1) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys, prop, transformer)).reduce(merge, {});
}
function margin(props) {
  return style(props, marginKeys);
}
margin.propTypes = {};
margin.filterProps = marginKeys;
function padding(props) {
  return style(props, paddingKeys);
}
padding.propTypes = {};
padding.filterProps = paddingKeys;
function createSpacing(spacingInput = 8) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const transform = createUnarySpacing({
    spacing: spacingInput
  });
  const spacing = (...argsInput) => {
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map((argument) => {
      const output = transform(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing.mui = true;
  return spacing;
}
function compose(...styles) {
  const handlers = styles.reduce((acc, style2) => {
    style2.filterProps.forEach((prop) => {
      acc[prop] = style2;
    });
    return acc;
  }, {});
  const fn2 = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn2.propTypes = {};
  fn2.filterProps = styles.reduce((acc, style2) => acc.concat(style2.filterProps), []);
  return fn2;
}
function borderTransform(value) {
  if (typeof value !== "number") {
    return value;
  }
  return `${value}px solid`;
}
function createBorderStyle(prop, transform) {
  return style$1({
    prop,
    themeKey: "borders",
    transform
  });
}
const border = createBorderStyle("border", borderTransform);
const borderTop = createBorderStyle("borderTop", borderTransform);
const borderRight = createBorderStyle("borderRight", borderTransform);
const borderBottom = createBorderStyle("borderBottom", borderTransform);
const borderLeft = createBorderStyle("borderLeft", borderTransform);
const borderColor = createBorderStyle("borderColor");
const borderTopColor = createBorderStyle("borderTopColor");
const borderRightColor = createBorderStyle("borderRightColor");
const borderBottomColor = createBorderStyle("borderBottomColor");
const borderLeftColor = createBorderStyle("borderLeftColor");
const outline = createBorderStyle("outline", borderTransform);
const outlineColor = createBorderStyle("outlineColor");
const borderRadius = (props) => {
  if (props.borderRadius !== void 0 && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4);
    const styleFromPropValue = (propValue) => ({
      borderRadius: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }
  return null;
};
borderRadius.propTypes = {};
borderRadius.filterProps = ["borderRadius"];
compose(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, outline, outlineColor);
const gap = (props) => {
  if (props.gap !== void 0 && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8);
    const styleFromPropValue = (propValue) => ({
      gap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
  return null;
};
gap.propTypes = {};
gap.filterProps = ["gap"];
const columnGap = (props) => {
  if (props.columnGap !== void 0 && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8);
    const styleFromPropValue = (propValue) => ({
      columnGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }
  return null;
};
columnGap.propTypes = {};
columnGap.filterProps = ["columnGap"];
const rowGap = (props) => {
  if (props.rowGap !== void 0 && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8);
    const styleFromPropValue = (propValue) => ({
      rowGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }
  return null;
};
rowGap.propTypes = {};
rowGap.filterProps = ["rowGap"];
const gridColumn = style$1({
  prop: "gridColumn"
});
const gridRow = style$1({
  prop: "gridRow"
});
const gridAutoFlow = style$1({
  prop: "gridAutoFlow"
});
const gridAutoColumns = style$1({
  prop: "gridAutoColumns"
});
const gridAutoRows = style$1({
  prop: "gridAutoRows"
});
const gridTemplateColumns = style$1({
  prop: "gridTemplateColumns"
});
const gridTemplateRows = style$1({
  prop: "gridTemplateRows"
});
const gridTemplateAreas = style$1({
  prop: "gridTemplateAreas"
});
const gridArea = style$1({
  prop: "gridArea"
});
compose(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
function paletteTransform(value, userValue) {
  if (userValue === "grey") {
    return userValue;
  }
  return value;
}
const color = style$1({
  prop: "color",
  themeKey: "palette",
  transform: paletteTransform
});
const bgcolor = style$1({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: paletteTransform
});
const backgroundColor = style$1({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: paletteTransform
});
compose(color, bgcolor, backgroundColor);
function sizingTransform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
const width = style$1({
  prop: "width",
  transform: sizingTransform
});
const maxWidth = (props) => {
  if (props.maxWidth !== void 0 && props.maxWidth !== null) {
    const styleFromPropValue = (propValue) => {
      var _props$theme, _props$theme2;
      const breakpoint = ((_props$theme = props.theme) == null || (_props$theme = _props$theme.breakpoints) == null || (_props$theme = _props$theme.values) == null ? void 0 : _props$theme[propValue]) || values[propValue];
      if (!breakpoint) {
        return {
          maxWidth: sizingTransform(propValue)
        };
      }
      if (((_props$theme2 = props.theme) == null || (_props$theme2 = _props$theme2.breakpoints) == null ? void 0 : _props$theme2.unit) !== "px") {
        return {
          maxWidth: `${breakpoint}${props.theme.breakpoints.unit}`
        };
      }
      return {
        maxWidth: breakpoint
      };
    };
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
};
maxWidth.filterProps = ["maxWidth"];
const minWidth = style$1({
  prop: "minWidth",
  transform: sizingTransform
});
const height = style$1({
  prop: "height",
  transform: sizingTransform
});
const maxHeight = style$1({
  prop: "maxHeight",
  transform: sizingTransform
});
const minHeight = style$1({
  prop: "minHeight",
  transform: sizingTransform
});
style$1({
  prop: "size",
  cssProperty: "width",
  transform: sizingTransform
});
style$1({
  prop: "size",
  cssProperty: "height",
  transform: sizingTransform
});
const boxSizing = style$1({
  prop: "boxSizing"
});
compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
const defaultSxConfig = {
  // borders
  border: {
    themeKey: "borders",
    transform: borderTransform
  },
  borderTop: {
    themeKey: "borders",
    transform: borderTransform
  },
  borderRight: {
    themeKey: "borders",
    transform: borderTransform
  },
  borderBottom: {
    themeKey: "borders",
    transform: borderTransform
  },
  borderLeft: {
    themeKey: "borders",
    transform: borderTransform
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: borderTransform
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: borderRadius
  },
  // palette
  color: {
    themeKey: "palette",
    transform: paletteTransform
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: paletteTransform
  },
  backgroundColor: {
    themeKey: "palette",
    transform: paletteTransform
  },
  // spacing
  p: {
    style: padding
  },
  pt: {
    style: padding
  },
  pr: {
    style: padding
  },
  pb: {
    style: padding
  },
  pl: {
    style: padding
  },
  px: {
    style: padding
  },
  py: {
    style: padding
  },
  padding: {
    style: padding
  },
  paddingTop: {
    style: padding
  },
  paddingRight: {
    style: padding
  },
  paddingBottom: {
    style: padding
  },
  paddingLeft: {
    style: padding
  },
  paddingX: {
    style: padding
  },
  paddingY: {
    style: padding
  },
  paddingInline: {
    style: padding
  },
  paddingInlineStart: {
    style: padding
  },
  paddingInlineEnd: {
    style: padding
  },
  paddingBlock: {
    style: padding
  },
  paddingBlockStart: {
    style: padding
  },
  paddingBlockEnd: {
    style: padding
  },
  m: {
    style: margin
  },
  mt: {
    style: margin
  },
  mr: {
    style: margin
  },
  mb: {
    style: margin
  },
  ml: {
    style: margin
  },
  mx: {
    style: margin
  },
  my: {
    style: margin
  },
  margin: {
    style: margin
  },
  marginTop: {
    style: margin
  },
  marginRight: {
    style: margin
  },
  marginBottom: {
    style: margin
  },
  marginLeft: {
    style: margin
  },
  marginX: {
    style: margin
  },
  marginY: {
    style: margin
  },
  marginInline: {
    style: margin
  },
  marginInlineStart: {
    style: margin
  },
  marginInlineEnd: {
    style: margin
  },
  marginBlock: {
    style: margin
  },
  marginBlockStart: {
    style: margin
  },
  marginBlockEnd: {
    style: margin
  },
  // display
  displayPrint: {
    cssProperty: false,
    transform: (value) => ({
      "@media print": {
        display: value
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: gap
  },
  rowGap: {
    style: rowGap
  },
  columnGap: {
    style: columnGap
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: sizingTransform
  },
  maxWidth: {
    style: maxWidth
  },
  minWidth: {
    transform: sizingTransform
  },
  height: {
    transform: sizingTransform
  },
  maxHeight: {
    transform: sizingTransform
  },
  minHeight: {
    transform: sizingTransform
  },
  boxSizing: {},
  // typography
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: false,
    themeKey: "typography"
  }
};
const defaultSxConfig$1 = defaultSxConfig;
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === "function" ? maybeFn(arg) : maybeFn;
}
function unstable_createStyleFunctionSx() {
  function getThemeValue(prop, val, theme2, config) {
    const props = {
      [prop]: val,
      theme: theme2
    };
    const options = config[prop];
    if (!options) {
      return {
        [prop]: val
      };
    }
    const {
      cssProperty = prop,
      themeKey,
      transform,
      style: style2
    } = options;
    if (val == null) {
      return null;
    }
    if (themeKey === "typography" && val === "inherit") {
      return {
        [prop]: val
      };
    }
    const themeMapping = getPath(theme2, themeKey) || {};
    if (style2) {
      return style2(props);
    }
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize$1(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, val, styleFromPropValue);
  }
  function styleFunctionSx2(props) {
    var _theme$unstable_sxCon;
    const {
      sx,
      theme: theme2 = {}
    } = props || {};
    if (!sx) {
      return null;
    }
    const config = (_theme$unstable_sxCon = theme2.unstable_sxConfig) != null ? _theme$unstable_sxCon : defaultSxConfig$1;
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === "function") {
        sxObject = sxInput(theme2);
      } else if (typeof sxInput !== "object") {
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme2.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css2 = emptyBreakpoints;
      Object.keys(sxObject).forEach((styleKey) => {
        const value = callIfFn(sxObject[styleKey], theme2);
        if (value !== null && value !== void 0) {
          if (typeof value === "object") {
            if (config[styleKey]) {
              css2 = merge(css2, getThemeValue(styleKey, value, theme2, config));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme: theme2
              }, value, (x) => ({
                [styleKey]: x
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css2[styleKey] = styleFunctionSx2({
                  sx: value,
                  theme: theme2
                });
              } else {
                css2 = merge(css2, breakpointsValues);
              }
            }
          } else {
            css2 = merge(css2, getThemeValue(styleKey, value, theme2, config));
          }
        }
      });
      return removeUnusedBreakpoints(breakpointsKeys, css2);
    }
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  return styleFunctionSx2;
}
const styleFunctionSx$1 = unstable_createStyleFunctionSx();
styleFunctionSx$1.filterProps = ["sx"];
const styleFunctionSx$2 = styleFunctionSx$1;
function applyStyles(key, styles) {
  const theme2 = this;
  if (theme2.vars && typeof theme2.getColorSchemeSelector === "function") {
    const selector = theme2.getColorSchemeSelector(key).replace(/(\[[^\]]+\])/, "*:where($1)");
    return {
      [selector]: styles
    };
  }
  if (theme2.palette.mode === key) {
    return styles;
  }
  return {};
}
const _excluded$7 = ["breakpoints", "palette", "spacing", "shape"];
function createTheme$2(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded$7);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = createSpacing(spacingInput);
  let muiTheme = deepmerge$1({
    breakpoints,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: _extends$1({
      mode: "light"
    }, paletteInput),
    spacing,
    shape: _extends$1({}, shape$1, shapeInput)
  }, other);
  muiTheme.applyStyles = applyStyles;
  muiTheme = args.reduce((acc, argument) => deepmerge$1(acc, argument), muiTheme);
  muiTheme.unstable_sxConfig = _extends$1({}, defaultSxConfig$1, other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx$2({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
const createTheme$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: createTheme$2,
  private_createBreakpoints: createBreakpoints,
  unstable_applyStyles: applyStyles
}, Symbol.toStringTag, { value: "Module" }));
let cache;
if (typeof document === "object") {
  cache = createCache({
    key: "css",
    prepend: true
  });
}
function StyledEngineProvider(props) {
  const {
    injectFirst,
    children
  } = props;
  return injectFirst && cache ? /* @__PURE__ */ jsxRuntimeExports.jsx(CacheProvider, {
    value: cache,
    children
  }) : children;
}
function isEmpty$1(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
function GlobalStyles(props) {
  const {
    styles,
    defaultTheme: defaultTheme2 = {}
  } = props;
  const globalStyles = typeof styles === "function" ? (themeInput) => styles(isEmpty$1(themeInput) ? defaultTheme2 : themeInput) : styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Global, {
    styles: globalStyles
  });
}
function styled$2(tag, options) {
  const stylesFactory = newStyled(tag, options);
  return stylesFactory;
}
const internal_processStyles = (tag, processor) => {
  if (Array.isArray(tag.__emotion_styles)) {
    tag.__emotion_styles = processor(tag.__emotion_styles);
  }
};
const styledEngine = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GlobalStyles,
  StyledEngineProvider,
  ThemeContext,
  css,
  default: styled$2,
  internal_processStyles,
  keyframes
}, Symbol.toStringTag, { value: "Module" }));
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme$1(defaultTheme2 = null) {
  const contextTheme = reactExports.useContext(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme2 : contextTheme;
}
const systemDefaultTheme$1 = createTheme$2();
function useTheme(defaultTheme2 = systemDefaultTheme$1) {
  return useTheme$1(defaultTheme2);
}
function useThemeProps$1({
  props,
  name,
  defaultTheme: defaultTheme2,
  themeId
}) {
  let theme2 = useTheme(defaultTheme2);
  if (themeId) {
    theme2 = theme2[themeId] || theme2;
  }
  const mergedProps = getThemeProps({
    theme: theme2,
    name,
    props
  });
  return mergedProps;
}
const _excluded$6 = ["sx"];
const splitProps = (props) => {
  var _props$theme$unstable, _props$theme;
  const result = {
    systemProps: {},
    otherProps: {}
  };
  const config = (_props$theme$unstable = props == null || (_props$theme = props.theme) == null ? void 0 : _props$theme.unstable_sxConfig) != null ? _props$theme$unstable : defaultSxConfig$1;
  Object.keys(props).forEach((prop) => {
    if (config[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};
function extendSxProp(props) {
  const {
    sx: inSx
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$6);
  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === "function") {
    finalSx = (...args) => {
      const result = inSx(...args);
      if (!isPlainObject(result)) {
        return systemProps;
      }
      return _extends$1({}, systemProps, result);
    };
  } else {
    finalSx = _extends$1({}, systemProps, inSx);
  }
  return _extends$1({}, otherProps, {
    sx: finalSx
  });
}
const styleFunctionSx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: styleFunctionSx$2,
  extendSxProp,
  unstable_createStyleFunctionSx,
  unstable_defaultSxConfig: defaultSxConfig$1
}, Symbol.toStringTag, { value: "Module" }));
function createMixins(breakpoints, mixins) {
  return _extends$1({
    toolbar: {
      minHeight: 56,
      [breakpoints.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    }
  }, mixins);
}
var colorManipulator = {};
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(formatMuiErrorMessage);
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(clamp);
var _interopRequireDefault$2 = interopRequireDefaultExports;
Object.defineProperty(colorManipulator, "__esModule", {
  value: true
});
colorManipulator.alpha = alpha;
colorManipulator.blend = blend;
colorManipulator.colorChannel = void 0;
var darken_1 = colorManipulator.darken = darken;
colorManipulator.decomposeColor = decomposeColor;
colorManipulator.emphasize = emphasize;
var getContrastRatio_1 = colorManipulator.getContrastRatio = getContrastRatio;
colorManipulator.getLuminance = getLuminance;
colorManipulator.hexToRgb = hexToRgb;
colorManipulator.hslToRgb = hslToRgb;
var lighten_1 = colorManipulator.lighten = lighten;
colorManipulator.private_safeAlpha = private_safeAlpha;
colorManipulator.private_safeColorChannel = void 0;
colorManipulator.private_safeDarken = private_safeDarken;
colorManipulator.private_safeEmphasize = private_safeEmphasize;
colorManipulator.private_safeLighten = private_safeLighten;
colorManipulator.recomposeColor = recomposeColor;
colorManipulator.rgbToHex = rgbToHex;
var _formatMuiErrorMessage2 = _interopRequireDefault$2(require$$1);
var _clamp = _interopRequireDefault$2(require$$2);
function clampWrapper(value, min2 = 0, max2 = 1) {
  return (0, _clamp.default)(value, min2, max2);
}
function hexToRgb(color2) {
  color2 = color2.slice(1);
  const re = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g");
  let colors = color2.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n2) => n2 + n2);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n2, index) => {
    return index < 3 ? parseInt(n2, 16) : Math.round(parseInt(n2, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function intToHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
function decomposeColor(color2) {
  if (color2.type) {
    return color2;
  }
  if (color2.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color2));
  }
  const marker = color2.indexOf("(");
  const type = color2.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error((0, _formatMuiErrorMessage2.default)(9, color2));
  }
  let values2 = color2.substring(marker + 1, color2.length - 1);
  let colorSpace;
  if (type === "color") {
    values2 = values2.split(" ");
    colorSpace = values2.shift();
    if (values2.length === 4 && values2[3].charAt(0) === "/") {
      values2[3] = values2[3].slice(1);
    }
    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error((0, _formatMuiErrorMessage2.default)(10, colorSpace));
    }
  } else {
    values2 = values2.split(",");
  }
  values2 = values2.map((value) => parseFloat(value));
  return {
    type,
    values: values2,
    colorSpace
  };
}
const colorChannel = (color2) => {
  const decomposedColor = decomposeColor(color2);
  return decomposedColor.values.slice(0, 3).map((val, idx) => decomposedColor.type.indexOf("hsl") !== -1 && idx !== 0 ? `${val}%` : val).join(" ");
};
colorManipulator.colorChannel = colorChannel;
const private_safeColorChannel = (color2, warning) => {
  try {
    return colorChannel(color2);
  } catch (error) {
    if (warning && false) {
      console.warn(warning);
    }
    return color2;
  }
};
colorManipulator.private_safeColorChannel = private_safeColorChannel;
function recomposeColor(color2) {
  const {
    type,
    colorSpace
  } = color2;
  let {
    values: values2
  } = color2;
  if (type.indexOf("rgb") !== -1) {
    values2 = values2.map((n2, i) => i < 3 ? parseInt(n2, 10) : n2);
  } else if (type.indexOf("hsl") !== -1) {
    values2[1] = `${values2[1]}%`;
    values2[2] = `${values2[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    values2 = `${colorSpace} ${values2.join(" ")}`;
  } else {
    values2 = `${values2.join(", ")}`;
  }
  return `${type}(${values2})`;
}
function rgbToHex(color2) {
  if (color2.indexOf("#") === 0) {
    return color2;
  }
  const {
    values: values2
  } = decomposeColor(color2);
  return `#${values2.map((n2, i) => intToHex(i === 3 ? Math.round(255 * n2) : n2)).join("")}`;
}
function hslToRgb(color2) {
  color2 = decomposeColor(color2);
  const {
    values: values2
  } = color2;
  const h2 = values2[0];
  const s = values2[1] / 100;
  const l2 = values2[2] / 100;
  const a = s * Math.min(l2, 1 - l2);
  const f2 = (n2, k2 = (n2 + h2 / 30) % 12) => l2 - a * Math.max(Math.min(k2 - 3, 9 - k2, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f2(0) * 255), Math.round(f2(8) * 255), Math.round(f2(4) * 255)];
  if (color2.type === "hsla") {
    type += "a";
    rgb.push(values2[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function getLuminance(color2) {
  color2 = decomposeColor(color2);
  let rgb = color2.type === "hsl" || color2.type === "hsla" ? decomposeColor(hslToRgb(color2)).values : color2.values;
  rgb = rgb.map((val) => {
    if (color2.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function alpha(color2, value) {
  color2 = decomposeColor(color2);
  value = clampWrapper(value);
  if (color2.type === "rgb" || color2.type === "hsl") {
    color2.type += "a";
  }
  if (color2.type === "color") {
    color2.values[3] = `/${value}`;
  } else {
    color2.values[3] = value;
  }
  return recomposeColor(color2);
}
function private_safeAlpha(color2, value, warning) {
  try {
    return alpha(color2, value);
  } catch (error) {
    if (warning && false) {
      console.warn(warning);
    }
    return color2;
  }
}
function darken(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clampWrapper(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] *= 1 - coefficient;
  } else if (color2.type.indexOf("rgb") !== -1 || color2.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color2);
}
function private_safeDarken(color2, coefficient, warning) {
  try {
    return darken(color2, coefficient);
  } catch (error) {
    if (warning && false) {
      console.warn(warning);
    }
    return color2;
  }
}
function lighten(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clampWrapper(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] += (100 - color2.values[2]) * coefficient;
  } else if (color2.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (255 - color2.values[i]) * coefficient;
    }
  } else if (color2.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (1 - color2.values[i]) * coefficient;
    }
  }
  return recomposeColor(color2);
}
function private_safeLighten(color2, coefficient, warning) {
  try {
    return lighten(color2, coefficient);
  } catch (error) {
    if (warning && false) {
      console.warn(warning);
    }
    return color2;
  }
}
function emphasize(color2, coefficient = 0.15) {
  return getLuminance(color2) > 0.5 ? darken(color2, coefficient) : lighten(color2, coefficient);
}
function private_safeEmphasize(color2, coefficient, warning) {
  try {
    return emphasize(color2, coefficient);
  } catch (error) {
    if (warning && false) {
      console.warn(warning);
    }
    return color2;
  }
}
function blend(background, overlay, opacity, gamma = 1) {
  const blendChannel = (b2, o) => Math.round((b2 ** (1 / gamma) * (1 - opacity) + o ** (1 / gamma) * opacity) ** gamma);
  const backgroundColor2 = decomposeColor(background);
  const overlayColor = decomposeColor(overlay);
  const rgb = [blendChannel(backgroundColor2.values[0], overlayColor.values[0]), blendChannel(backgroundColor2.values[1], overlayColor.values[1]), blendChannel(backgroundColor2.values[2], overlayColor.values[2])];
  return recomposeColor({
    type: "rgb",
    values: rgb
  });
}
const common = {
  black: "#000",
  white: "#fff"
};
const common$1 = common;
const grey = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
const grey$1 = grey;
const purple = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
};
const purple$1 = purple;
const red = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
const red$1 = red;
const orange = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
const orange$1 = orange;
const blue = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
const blue$1 = blue;
const lightBlue = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
};
const lightBlue$1 = lightBlue;
const green = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
const green$1 = green;
const _excluded$5 = ["mode", "contrastThreshold", "tonalOffset"];
const light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: "rgba(0, 0, 0, 0.87)",
    // Secondary text.
    secondary: "rgba(0, 0, 0, 0.6)",
    // Disabled text have even lower visual prominence.
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  // The color used to divide different elements.
  divider: "rgba(0, 0, 0, 0.12)",
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common$1.white,
    default: common$1.white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: "rgba(0, 0, 0, 0.54)",
    // The color of an hovered action.
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: "rgba(0, 0, 0, 0.26)",
    // The background color of a disabled action.
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
const dark = {
  text: {
    primary: common$1.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: common$1.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten_1(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken_1(intent.main, tonalOffsetDark);
    }
  }
}
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue$1[200],
      light: blue$1[50],
      dark: blue$1[400]
    };
  }
  return {
    main: blue$1[700],
    light: blue$1[400],
    dark: blue$1[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple$1[200],
      light: purple$1[50],
      dark: purple$1[400]
    };
  }
  return {
    main: purple$1[500],
    light: purple$1[300],
    dark: purple$1[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red$1[500],
      light: red$1[300],
      dark: red$1[700]
    };
  }
  return {
    main: red$1[700],
    light: red$1[400],
    dark: red$1[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue$1[400],
      light: lightBlue$1[300],
      dark: lightBlue$1[700]
    };
  }
  return {
    main: lightBlue$1[700],
    light: lightBlue$1[500],
    dark: lightBlue$1[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green$1[400],
      light: green$1[300],
      dark: green$1[700]
    };
  }
  return {
    main: green$1[800],
    light: green$1[500],
    dark: green$1[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange$1[400],
      light: orange$1[300],
      dark: orange$1[700]
    };
  }
  return {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: orange$1[500],
    dark: orange$1[900]
  };
}
function createPalette(palette) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette, other = _objectWithoutPropertiesLoose(palette, _excluded$5);
  const primary = palette.primary || getDefaultPrimary(mode);
  const secondary = palette.secondary || getDefaultSecondary(mode);
  const error = palette.error || getDefaultError(mode);
  const info = palette.info || getDefaultInfo(mode);
  const success = palette.success || getDefaultSuccess(mode);
  const warning = palette.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = getContrastRatio_1(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    return contrastText;
  }
  const augmentColor = ({
    color: color2,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color2 = _extends$1({}, color2);
    if (!color2.main && color2[mainShade]) {
      color2.main = color2[mainShade];
    }
    if (!color2.hasOwnProperty("main")) {
      throw new Error(formatMuiErrorMessage$1(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color2.main !== "string") {
      throw new Error(formatMuiErrorMessage$1(12, name ? ` (${name})` : "", JSON.stringify(color2.main)));
    }
    addLightOrDark(color2, "light", lightShade, tonalOffset);
    addLightOrDark(color2, "dark", darkShade, tonalOffset);
    if (!color2.contrastText) {
      color2.contrastText = getContrastText(color2.main);
    }
    return color2;
  };
  const modes = {
    dark,
    light
  };
  const paletteOutput = deepmerge$1(_extends$1({
    // A collection of common colors.
    common: _extends$1({}, common$1),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: "success"
    }),
    // The grey colors.
    grey: grey$1,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}
const _excluded$4 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
const caseAllCaps = {
  textTransform: "uppercase"
};
const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
function createTypography(palette, typography) {
  const _ref = typeof typography === "function" ? typography(palette) : typography, {
    fontFamily = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize = 14,
    // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    pxToRem: pxToRem2
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  const coef = fontSize / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => _extends$1({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight
  }, fontFamily === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing / size)}em`
  } : {}, casing, allVariants);
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return deepmerge$1(_extends$1({
    htmlFontSize,
    pxToRem,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false
    // No need to clone deep
  });
}
const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
const shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
const shadows$1 = shadows;
const _excluded$3 = ["duration", "easing", "delay"];
const easing = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function createTransitions(inputTransitions) {
  const mergedEasing = _extends$1({}, easing, inputTransitions.easing);
  const mergedDuration = _extends$1({}, duration, inputTransitions.duration);
  const create = (props = ["all"], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options;
    _objectWithoutPropertiesLoose(options, _excluded$3);
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  };
  return _extends$1({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}
const zIndex = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
const zIndex$1 = zIndex;
const _excluded$2 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function createTheme(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded$2);
  if (options.vars) {
    throw new Error(formatMuiErrorMessage$1(18));
  }
  const palette = createPalette(paletteInput);
  const systemTheme = createTheme$2(options);
  let muiTheme = deepmerge$1(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows$1.slice(),
    typography: createTypography(palette, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends$1({}, zIndex$1)
  });
  muiTheme = deepmerge$1(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge$1(acc, argument), muiTheme);
  muiTheme.unstable_sxConfig = _extends$1({}, defaultSxConfig$1, other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx$2({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
const defaultTheme = createTheme();
const defaultTheme$1 = defaultTheme;
const THEME_ID = "$$material";
function useThemeProps({
  props,
  name
}) {
  return useThemeProps$1({
    props,
    name,
    defaultTheme: defaultTheme$1,
    themeId: THEME_ID
  });
}
var createStyled$1 = {};
var _extends = { exports: {} };
var hasRequired_extends;
function require_extends() {
  if (hasRequired_extends)
    return _extends.exports;
  hasRequired_extends = 1;
  (function(module) {
    function _extends3() {
      module.exports = _extends3 = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports;
      return _extends3.apply(this, arguments);
    }
    module.exports = _extends3, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(_extends);
  return _extends.exports;
}
var objectWithoutPropertiesLoose = { exports: {} };
var hasRequiredObjectWithoutPropertiesLoose;
function requireObjectWithoutPropertiesLoose() {
  if (hasRequiredObjectWithoutPropertiesLoose)
    return objectWithoutPropertiesLoose.exports;
  hasRequiredObjectWithoutPropertiesLoose = 1;
  (function(module) {
    function _objectWithoutPropertiesLoose3(source, excluded) {
      if (source == null)
        return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        target[key] = source[key];
      }
      return target;
    }
    module.exports = _objectWithoutPropertiesLoose3, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(objectWithoutPropertiesLoose);
  return objectWithoutPropertiesLoose.exports;
}
const require$$3 = /* @__PURE__ */ getAugmentedNamespace(styledEngine);
const require$$4 = /* @__PURE__ */ getAugmentedNamespace(deepmerge);
const require$$5 = /* @__PURE__ */ getAugmentedNamespace(capitalize);
const require$$6 = /* @__PURE__ */ getAugmentedNamespace(getDisplayName);
const require$$7 = /* @__PURE__ */ getAugmentedNamespace(createTheme$1);
const require$$8 = /* @__PURE__ */ getAugmentedNamespace(styleFunctionSx);
var _interopRequireDefault$1 = interopRequireDefaultExports;
Object.defineProperty(createStyled$1, "__esModule", {
  value: true
});
var _default = createStyled$1.default = createStyled;
createStyled$1.shouldForwardProp = shouldForwardProp;
createStyled$1.systemDefaultTheme = void 0;
var _extends2 = _interopRequireDefault$1(require_extends());
var _objectWithoutPropertiesLoose2 = _interopRequireDefault$1(requireObjectWithoutPropertiesLoose());
var _styledEngine = _interopRequireWildcard(require$$3);
var _deepmerge = require$$4;
_interopRequireDefault$1(require$$5);
_interopRequireDefault$1(require$$6);
var _createTheme = _interopRequireDefault$1(require$$7);
var _styleFunctionSx = _interopRequireDefault$1(require$$8);
const _excluded$1 = ["ownerState"], _excluded2 = ["variants"], _excluded3 = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function _getRequireWildcardCache(e2) {
  if ("function" != typeof WeakMap)
    return null;
  var r2 = /* @__PURE__ */ new WeakMap(), t2 = /* @__PURE__ */ new WeakMap();
  return (_getRequireWildcardCache = function(e22) {
    return e22 ? t2 : r2;
  })(e2);
}
function _interopRequireWildcard(e2, r2) {
  if (!r2 && e2 && e2.__esModule)
    return e2;
  if (null === e2 || "object" != typeof e2 && "function" != typeof e2)
    return { default: e2 };
  var t2 = _getRequireWildcardCache(r2);
  if (t2 && t2.has(e2))
    return t2.get(e2);
  var n2 = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u2 in e2)
    if ("default" !== u2 && Object.prototype.hasOwnProperty.call(e2, u2)) {
      var i = a ? Object.getOwnPropertyDescriptor(e2, u2) : null;
      i && (i.get || i.set) ? Object.defineProperty(n2, u2, i) : n2[u2] = e2[u2];
    }
  return n2.default = e2, t2 && t2.set(e2, n2), n2;
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function isStringTag(tag) {
  return typeof tag === "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96;
}
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
const systemDefaultTheme = createStyled$1.systemDefaultTheme = (0, _createTheme.default)();
const lowercaseFirstLetter = (string) => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toLowerCase() + string.slice(1);
};
function resolveTheme({
  defaultTheme: defaultTheme2,
  theme: theme2,
  themeId
}) {
  return isEmpty(theme2) ? defaultTheme2 : theme2[themeId] || theme2;
}
function defaultOverridesResolver(slot) {
  if (!slot) {
    return null;
  }
  return (props, styles) => styles[slot];
}
function processStyleArg(callableStyle, _ref) {
  let {
    ownerState
  } = _ref, props = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded$1);
  const resolvedStylesArg = typeof callableStyle === "function" ? callableStyle((0, _extends2.default)({
    ownerState
  }, props)) : callableStyle;
  if (Array.isArray(resolvedStylesArg)) {
    return resolvedStylesArg.flatMap((resolvedStyle) => processStyleArg(resolvedStyle, (0, _extends2.default)({
      ownerState
    }, props)));
  }
  if (!!resolvedStylesArg && typeof resolvedStylesArg === "object" && Array.isArray(resolvedStylesArg.variants)) {
    const {
      variants = []
    } = resolvedStylesArg, otherStyles = (0, _objectWithoutPropertiesLoose2.default)(resolvedStylesArg, _excluded2);
    let result = otherStyles;
    variants.forEach((variant) => {
      let isMatch = true;
      if (typeof variant.props === "function") {
        isMatch = variant.props((0, _extends2.default)({
          ownerState
        }, props, ownerState));
      } else {
        Object.keys(variant.props).forEach((key) => {
          if ((ownerState == null ? void 0 : ownerState[key]) !== variant.props[key] && props[key] !== variant.props[key]) {
            isMatch = false;
          }
        });
      }
      if (isMatch) {
        if (!Array.isArray(result)) {
          result = [result];
        }
        result.push(typeof variant.style === "function" ? variant.style((0, _extends2.default)({
          ownerState
        }, props, ownerState)) : variant.style);
      }
    });
    return result;
  }
  return resolvedStylesArg;
}
function createStyled(input = {}) {
  const {
    themeId,
    defaultTheme: defaultTheme2 = systemDefaultTheme,
    rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
    slotShouldForwardProp: slotShouldForwardProp2 = shouldForwardProp
  } = input;
  const systemSx = (props) => {
    return (0, _styleFunctionSx.default)((0, _extends2.default)({}, props, {
      theme: resolveTheme((0, _extends2.default)({}, props, {
        defaultTheme: defaultTheme2,
        themeId
      }))
    }));
  };
  systemSx.__mui_systemSx = true;
  return (tag, inputOptions = {}) => {
    (0, _styledEngine.internal_processStyles)(tag, (styles) => styles.filter((style2) => !(style2 != null && style2.__mui_systemSx)));
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot))
    } = inputOptions, options = (0, _objectWithoutPropertiesLoose2.default)(inputOptions, _excluded3);
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      componentSlot && componentSlot !== "Root" && componentSlot !== "root" || false
    );
    const skipSx = inputSkipSx || false;
    let label;
    let shouldForwardPropOption = shouldForwardProp;
    if (componentSlot === "Root" || componentSlot === "root") {
      shouldForwardPropOption = rootShouldForwardProp2;
    } else if (componentSlot) {
      shouldForwardPropOption = slotShouldForwardProp2;
    } else if (isStringTag(tag)) {
      shouldForwardPropOption = void 0;
    }
    const defaultStyledResolver = (0, _styledEngine.default)(tag, (0, _extends2.default)({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));
    const transformStyleArg = (stylesArg) => {
      if (typeof stylesArg === "function" && stylesArg.__emotion_real !== stylesArg || (0, _deepmerge.isPlainObject)(stylesArg)) {
        return (props) => processStyleArg(stylesArg, (0, _extends2.default)({}, props, {
          theme: resolveTheme({
            theme: props.theme,
            defaultTheme: defaultTheme2,
            themeId
          })
        }));
      }
      return stylesArg;
    };
    const muiStyledResolver = (styleArg, ...expressions) => {
      let transformedStyleArg = transformStyleArg(styleArg);
      const expressionsWithDefaultTheme = expressions ? expressions.map(transformStyleArg) : [];
      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme2 = resolveTheme((0, _extends2.default)({}, props, {
            defaultTheme: defaultTheme2,
            themeId
          }));
          if (!theme2.components || !theme2.components[componentName] || !theme2.components[componentName].styleOverrides) {
            return null;
          }
          const styleOverrides = theme2.components[componentName].styleOverrides;
          const resolvedStyleOverrides = {};
          Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
            resolvedStyleOverrides[slotKey] = processStyleArg(slotStyle, (0, _extends2.default)({}, props, {
              theme: theme2
            }));
          });
          return overridesResolver(props, resolvedStyleOverrides);
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          var _theme$components;
          const theme2 = resolveTheme((0, _extends2.default)({}, props, {
            defaultTheme: defaultTheme2,
            themeId
          }));
          const themeVariants = theme2 == null || (_theme$components = theme2.components) == null || (_theme$components = _theme$components[componentName]) == null ? void 0 : _theme$components.variants;
          return processStyleArg({
            variants: themeVariants
          }, (0, _extends2.default)({}, props, {
            theme: theme2
          }));
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push(systemSx);
      }
      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill("");
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      }
      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
      if (tag.muiName) {
        Component.muiName = tag.muiName;
      }
      return Component;
    };
    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }
    return muiStyledResolver;
  };
}
function slotShouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
const rootShouldForwardProp = (prop) => slotShouldForwardProp(prop) && prop !== "classes";
const rootShouldForwardProp$1 = rootShouldForwardProp;
const styled = _default({
  themeId: THEME_ID,
  defaultTheme: defaultTheme$1,
  rootShouldForwardProp: rootShouldForwardProp$1
});
const styled$1 = styled;
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const _excluded = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"];
const useUtilityClasses = (ownerState) => {
  const {
    color: color2,
    fontSize,
    classes
  } = ownerState;
  const slots = {
    root: ["root", color2 !== "inherit" && `color${capitalize$1(color2)}`, `fontSize${capitalize$1(fontSize)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, classes);
};
const SvgIconRoot = styled$1("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== "inherit" && styles[`color${capitalize$1(ownerState.color)}`], styles[`fontSize${capitalize$1(ownerState.fontSize)}`]];
  }
})(({
  theme: theme2,
  ownerState
}) => {
  var _theme$transitions, _theme$transitions$cr, _theme$transitions2, _theme$typography, _theme$typography$pxT, _theme$typography2, _theme$typography2$px, _theme$typography3, _theme$typography3$px, _palette$ownerState$c, _palette, _palette2, _palette3;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // for example heroicons uses fill="none" and stroke="currentColor"
    fill: ownerState.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (_theme$transitions = theme2.transitions) == null || (_theme$transitions$cr = _theme$transitions.create) == null ? void 0 : _theme$transitions$cr.call(_theme$transitions, "fill", {
      duration: (_theme$transitions2 = theme2.transitions) == null || (_theme$transitions2 = _theme$transitions2.duration) == null ? void 0 : _theme$transitions2.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((_theme$typography = theme2.typography) == null || (_theme$typography$pxT = _theme$typography.pxToRem) == null ? void 0 : _theme$typography$pxT.call(_theme$typography, 20)) || "1.25rem",
      medium: ((_theme$typography2 = theme2.typography) == null || (_theme$typography2$px = _theme$typography2.pxToRem) == null ? void 0 : _theme$typography2$px.call(_theme$typography2, 24)) || "1.5rem",
      large: ((_theme$typography3 = theme2.typography) == null || (_theme$typography3$px = _theme$typography3.pxToRem) == null ? void 0 : _theme$typography3$px.call(_theme$typography3, 35)) || "2.1875rem"
    }[ownerState.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (_palette$ownerState$c = (_palette = (theme2.vars || theme2).palette) == null || (_palette = _palette[ownerState.color]) == null ? void 0 : _palette.main) != null ? _palette$ownerState$c : {
      action: (_palette2 = (theme2.vars || theme2).palette) == null || (_palette2 = _palette2.action) == null ? void 0 : _palette2.active,
      disabled: (_palette3 = (theme2.vars || theme2).palette) == null || (_palette3 = _palette3.action) == null ? void 0 : _palette3.disabled,
      inherit: void 0
    }[ownerState.color]
  };
});
const SvgIcon = /* @__PURE__ */ reactExports.forwardRef(function SvgIcon2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiSvgIcon"
  });
  const {
    children,
    className,
    color: color2 = "inherit",
    component = "svg",
    fontSize = "medium",
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = "0 0 24 24"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const hasSvgAsChild = /* @__PURE__ */ reactExports.isValidElement(children) && children.type === "svg";
  const ownerState = _extends$1({}, props, {
    color: color2,
    component,
    fontSize,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox,
    hasSvgAsChild
  });
  const more = {};
  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }
  const classes = useUtilityClasses(ownerState);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SvgIconRoot, _extends$1({
    as: component,
    className: clsx(classes.root, className),
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? void 0 : true,
    role: titleAccess ? "img" : void 0,
    ref
  }, more, other, hasSvgAsChild && children.props, {
    ownerState,
    children: [hasSvgAsChild ? children.props.children : children, titleAccess ? /* @__PURE__ */ jsxRuntimeExports.jsx("title", {
      children: titleAccess
    }) : null]
  }));
});
SvgIcon.muiName = "SvgIcon";
const SvgIcon$1 = SvgIcon;
function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SvgIcon$1, _extends$1({
      "data-testid": `${displayName}Icon`,
      ref
    }, props, {
      children: path
    }));
  }
  Component.muiName = SvgIcon$1.muiName;
  return /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef(Component));
}
const unstable_ClassNameGenerator = {
  configure: (generator) => {
    ClassNameGenerator$1.configure(generator);
  }
};
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: capitalize$1,
  createChainedFunction,
  createSvgIcon,
  debounce,
  deprecatedPropType,
  isMuiElement,
  ownerDocument,
  ownerWindow,
  requirePropFactory,
  setRef,
  unstable_ClassNameGenerator,
  unstable_useEnhancedEffect: useEnhancedEffect$1,
  unstable_useId: useId,
  unsupportedProp,
  useControlled,
  useEventCallback,
  useForkRef,
  useIsFocusVisible
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(utils);
var hasRequiredCreateSvgIcon;
function requireCreateSvgIcon() {
  if (hasRequiredCreateSvgIcon)
    return createSvgIcon$1;
  hasRequiredCreateSvgIcon = 1;
  (function(exports) {
    "use client";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function() {
        return _utils.createSvgIcon;
      }
    });
    var _utils = require$$0;
  })(createSvgIcon$1);
  return createSvgIcon$1;
}
var _interopRequireDefault = interopRequireDefaultExports;
Object.defineProperty(Send, "__esModule", {
  value: true
});
var default_1 = Send.default = void 0;
var _createSvgIcon = _interopRequireDefault(requireCreateSvgIcon());
var _jsxRuntime = jsxRuntimeExports;
default_1 = Send.default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
  d: "M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"
}), "Send");
function Chat({ url, domainName, title }) {
  const [chats, setChats] = reactExports.useState([]);
  const [isFetching, setIsFetching] = reactExports.useState(false);
  const [inputText, setInputText] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { direction: "column", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { overflowY: "scroll", flex: "1", children: chats.length < 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}) : chats.map(({ isUser, message }) => {
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { position: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          display: "block",
          resize: "none",
          value: inputText,
          onChange: (e2) => {
            setInputText(e2.target.value);
          },
          placeholder: `Any questions regarding ${domainName}'s ${title}?`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconButton,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(default_1, {}),
          disabled: isFetching,
          position: "absolute",
          right: "20",
          onClick: (e2) => {
            if (inputText.trim() === "")
              return;
            setChats((prev) => [...prev, { isUser: true, message: inputText }]);
            setInputText("");
            const controller = new AbortController();
            setIsFetching(true);
            getChatResponse(url, chats.at(-1).message, controller.signal).then((response) => {
              setChats((prev) => [...prev, { isUser: false, message: response }]);
            }).catch((err) => {
              console.log("error fetching chat response", err);
            }).finally(() => {
              setIsFetching(false);
            });
            return () => {
              controller.abort();
            };
          }
        }
      )
    ] })
  ] });
}
function Badge({ url, title }) {
  const [data, setData] = reactExports.useState(null);
  const domainName = reactExports.useMemo(() => {
    let domain = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[1].split(".");
    domain = domain[domain.length - 2] ?? domain[0];
    return domain[0].toUpperCase() + domain.slice(1).toLowerCase();
  }, []);
  reactExports.useEffect(() => {
    const controller = new AbortController();
    getSummary(url, controller.signal).then(setData);
    return () => {
      controller.abort();
    };
  }, []);
  console.log(data == null ? void 0 : data.summary);
  return data === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(BounceLoader, { size: 20, speedMultiplier: 1.2, color: "blue" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "tnc-crawler-content-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { backgroundColor: "green", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer" } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { minW: "400px", sx: { "&:focus": { boxShadow: "none" } }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { isFitted: true, position: "relative", variant: "line", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverArrow, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverHeader, { fontWeight: 700, fontSize: "16px", minW: "fit-content", children: [
        domainName,
        "'s ",
        title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverCloseButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverBody, { height: "50vh", maxh: "500px", overflowY: "scroll", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabPanels, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabPanel, { px: "15px", py: "5px", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { dangerouslySetInnerHTML: { __html: data.summary } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabPanel, { p: "0px", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Chat, { url, title, domainName }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverFooter, { p: "0px", height: "50px", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabList, { height: "50px", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tab, { children: "Understand" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tab, { children: "Ask" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabIndicator, {})
      ] })
    ] }) }) })
  ] }) });
}
const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`
  }
});
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
const legalDocumentRegex = /\bagreement\b|\bprivacy policy\b|\bprivacy notice\b|\bcookie policy\b|\bterms and conditions\b|\bterms & conditions\b|\bterms of use\b|\bt&c\b|\bconditions of use\b|\bterms of service\b/i;
const anchorEls = Array.from(document.getElementsByTagName("a")).filter((anchorEl) => legalDocumentRegex.test(anchorEl.innerText));
createRoot(rootIntoShadow).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(ChakraProvider, { theme, children: anchorEls.map((anchorEl) => {
    const containerDiv = document.createElement("div");
    containerDiv.style.display = "inline-block";
    anchorEl.parentNode.insertBefore(containerDiv, anchorEl);
    containerDiv.appendChild(anchorEl);
    const contentDiv = document.createElement("div");
    contentDiv.style.display = "inline-block";
    anchorEl.after(contentDiv);
    return reactDomExports.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { url: anchorEl.href, title: anchorEl.innerText }), contentDiv);
  }) })
);
