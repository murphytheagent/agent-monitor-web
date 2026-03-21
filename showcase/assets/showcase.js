const frame = document.getElementById("tokenizer-embed");

function applyFrameHeight(height) {
  if (!frame || !height) {
    return;
  }

  frame.style.height = `${Math.max(520, Math.ceil(height))}px`;
}

if (frame) {
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) {
      return;
    }

    if (!event.data || event.data.type !== "tokenizer-embed-height") {
      return;
    }

    applyFrameHeight(event.data.height);
  });

  frame.addEventListener("load", () => {
    try {
      const height = frame.contentDocument?.documentElement?.scrollHeight;
      applyFrameHeight(height);
    } catch (error) {
      console.error("Unable to size tokenizer embed", error);
    }
  });
}
