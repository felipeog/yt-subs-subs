function customFade(node, {}) {
  const o = +getComputedStyle(node).opacity;

  return {
    delay: 0,
    duration: 200,
    css: (t) => `opacity: ${t * o}`,
  };
}

export { customFade };
