const iframeTypes = {
  "tokenizer-embed-height": "tokenizer-embed",
  "signal-deck-embed-height": "signal-deck-embed",
};

function applyFrameHeight(frame, height) {
  if (!frame || !height) {
    return;
  }

  const minHeight = Number(frame.dataset.minHeight || 520);
  frame.style.height = `${Math.max(minHeight, Math.ceil(height))}px`;
}

function sizeFromDocument(frame) {
  try {
    const height = frame.contentDocument?.documentElement?.scrollHeight;
    applyFrameHeight(frame, height);
  } catch (error) {
    console.error("Unable to size showcase embed", error);
  }
}

Object.values(iframeTypes).forEach((frameId) => {
  const frame = document.getElementById(frameId);
  if (!frame) {
    return;
  }

  frame.addEventListener("load", () => {
    sizeFromDocument(frame);
  });
});

window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) {
    return;
  }

  const frameId = iframeTypes[event.data?.type];
  if (!frameId) {
    return;
  }

  const frame = document.getElementById(frameId);
  applyFrameHeight(frame, event.data.height);
});
