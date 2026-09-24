// Pequenos auxiliares de acessibilidade sem dependências.
// Importar este módulo não depende de DOM, window ou outros globais.

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getDocument(container, options) {
  return options.document || container.ownerDocument || globalThis.document;
}

function getCandidateElements(container, options) {
  if (typeof options.getFocusableElements === 'function') {
    return Array.from(options.getFocusableElements(container) || []);
  }
  if (typeof container.querySelectorAll !== 'function') return [];
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
}

function isDisabled(element) {
  return element?.disabled === true
    || (typeof element.getAttribute === 'function' && element.getAttribute('disabled') !== null)
    || element?.getAttribute?.('aria-disabled') === 'true';
}

function isHidden(element) {
  if (!element) return true;
  if (element.hidden === true) return true;
  if (element.offsetParent === null) return true;
  if (element.getAttribute?.('aria-hidden') === 'true') return true;
  return false;
}

function isConnected(element) {
  return Boolean(element) && element.isConnected !== false;
}

function canReceiveFocus(element) {
  return isConnected(element)
    && !isDisabled(element)
    && !isHidden(element)
    && typeof element.focus === 'function';
}

function getFocusableElements(container, options) {
  return getCandidateElements(container, options).filter((element) => canReceiveFocus(element));
}

function addListener(target, type, handler) {
  if (target && typeof target.addEventListener === 'function') {
    target.addEventListener(type, handler);
    return true;
  }
  return false;
}

function removeListener(target, type, handler) {
  if (target && typeof target.removeEventListener === 'function') {
    target.removeEventListener(type, handler);
  }
}

/**
 * Mantém Tab e Shift+Tab dentro de um diálogo, mesmo quando seus botões são
 * reconstruídos. O foco é consultado de novo em cada evento e controles
 * ocultos, desativados ou desconectados são ignorados.
 * Retorna uma função idempotente que remove os listeners e restaura o foco.
 */
export function trapFocus(container, options = {}) {
  if (!container || typeof container.addEventListener !== 'function') {
    throw new TypeError('trapFocus requires an element with addEventListener');
  }

  const document = getDocument(container, options);
  const eventTarget = document && typeof document.addEventListener === 'function' ? document : container;
  const previous = Object.prototype.hasOwnProperty.call(options, 'activeElement')
    ? options.activeElement
    : document?.activeElement;
  const fallbackFocusTarget = options.fallbackFocusTarget;
  const canReadAttribute = typeof container.getAttribute === 'function';
  const hadTabIndex = canReadAttribute && container.getAttribute('tabindex') !== null;
  const originalTabIndex = hadTabIndex ? container.getAttribute('tabindex') : null;
  let released = false;
  let lastTabDirection = 1;

  const currentFocusableElements = () => {
    const elements = getFocusableElements(container, options);
    return elements.length ? elements : (canReceiveFocus(container) ? [container] : []);
  };

  const focusElement = (element) => {
    if (!canReceiveFocus(element)) return false;
    element.focus();
    return true;
  };

  const onKeyDown = (event) => {
    if (released || event.key !== 'Tab') return;
    lastTabDirection = event.shiftKey ? -1 : 1;
    const elements = currentFocusableElements();
    if (!elements.length) return;

    const active = document?.activeElement;
    const inside = typeof container.contains === 'function' && container.contains(active);
    const first = elements[0];
    const last = elements[elements.length - 1];
    const activeIsFocusable = elements.includes(active);

    if (!inside || !activeIsFocusable) {
      event.preventDefault?.();
      focusElement(event.shiftKey ? last : first);
      return;
    }

    if (event.shiftKey && active === first) {
      event.preventDefault?.();
      focusElement(last);
    } else if (!event.shiftKey && active === last) {
      event.preventDefault?.();
      focusElement(first);
    }
  };

  const onFocusIn = (event) => {
    if (released) return;
    const active = event?.target;
    if (typeof container.contains === 'function' && container.contains(active)) return;
    const elements = currentFocusableElements();
    if (!elements.length) return;
    focusElement(lastTabDirection < 0 ? elements[elements.length - 1] : elements[0]);
  };

  addListener(eventTarget, 'keydown', onKeyDown);
  addListener(eventTarget, 'focusin', onFocusIn);

  if (getFocusableElements(container, options).length === 0) {
    if (!hadTabIndex && typeof container.setAttribute === 'function') {
      container.setAttribute('tabindex', '-1');
    }
    focusElement(container);
  }

  return () => {
    if (released) return;
    released = true;
    removeListener(eventTarget, 'keydown', onKeyDown);
    removeListener(eventTarget, 'focusin', onFocusIn);
    if (canReadAttribute && typeof container.setAttribute === 'function') {
      if (hadTabIndex) container.setAttribute('tabindex', originalTabIndex);
      else container.removeAttribute?.('tabindex');
    }

    const restoreTarget = canReceiveFocus(previous)
      ? previous
      : (canReceiveFocus(fallbackFocusTarget)
        ? fallbackFocusTarget
        : (canReceiveFocus(container) ? container : null));
    restoreTarget?.focus?.();
  };
}

// Stack compartilhado para que Escape sempre feche o diálogo mais acima.
export const openModalStack = (() => {
  const stack = [];

  const closeRecord = (record) => {
    if (!record) return null;
    record.release?.();
    return record.element;
  };

  return {
    push(element, options = {}) {
      if (element == null || stack.some((record) => record.element === element)) return null;
      const normalized = typeof options === 'function' ? { release: options } : (options || {});
      stack.push({
        element,
        release: typeof normalized.release === 'function' ? normalized.release : null,
        opener: normalized.opener ?? null,
      });
      return element;
    },
    close(element) {
      const index = stack.findIndex((record) => record.element === element);
      if (index < 0) return null;
      const [record] = stack.splice(index, 1);
      return closeRecord(record);
    },
    closeTop() {
      return closeRecord(stack.pop());
    },
    top() {
      return stack.length ? stack[stack.length - 1].element : null;
    },
    size() {
      return stack.length;
    },
    isEmpty() {
      return stack.length === 0;
    },
    isOpen() {
      return stack.length > 0;
    },
  };
})();

export function shouldReduceMotion() {
  const view = globalThis.window;
  if (!view || typeof view.matchMedia !== 'function') return false;
  try {
    return Boolean(view.matchMedia('(prefers-reduced-motion: reduce)')?.matches);
  } catch {
    return false;
  }
}
