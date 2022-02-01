const svgs = `
    <svg class="tooltip__icon">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
    <svg class="tooltip__icon">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
    <svg class="tooltip__icon">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
    <svg class="tooltip__icon">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
`;
const toolTip = document.createElement("div");
toolTip.classList.add("tooltip");
toolTip.innerHTML = svgs;

const toolTipTail = document.createElement("div");
toolTipTail.classList.add("tooltip__tail");
document.onmouseup = () => {
  // get the highlighted Element
  const selection = document.getSelection();

  // element from where we started highlighting

  const anchorNode = selection.anchorNode;
  // element where where we stopped highlighting

  const focusNode = selection.focusNode;

  if (anchorNode !== focusNode) {
    // multiLine selection
    return;
  }
  // get the dimension for the highlighted node
  const rangeRect = selection.getRangeAt(0).getClientRects()[0];
  // selected elements middle dimensions
  document.body.appendChild(toolTip);
  document.body.appendChild(toolTipTail);

  const toolTipWidth = toolTip.offsetWidth;
  const toolTipHeight = toolTip.offsetHeight;
  const toolTipTailWidth = toolTipTail.offsetWidth;
  const toolTipTailHeight = toolTipTail.offsetHeight;

  const y = rangeRect.y;
  const midX = rangeRect.x + (rangeRect.width/2);

  toolTip.style.top = `${y - toolTipHeight - toolTipTailHeight/2}px`;
  toolTip.style.left = `${midX - toolTipWidth/2}px`;

  toolTipTail.style.top = `${y - toolTipTailHeight/2}px`;
  toolTipTail.style.left = `${midX - toolTipTailWidth/2}px`;
};
