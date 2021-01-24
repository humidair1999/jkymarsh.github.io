const writingWorkButtonsListEl = document.getElementById('jky-js-writing-work-buttons-list');
const writingWorkIframeEl = document.getElementById('jky-js-writing-work-iframe');

if (writingWorkButtonsListEl && writingWorkIframeEl) {
  const BUTTON_CLASSNAME = 'jky-js-writing-work-buttons-list__button';

  writingWorkButtonsListEl.addEventListener('click', (evt) => {
    const closestTargetEl = evt.target.closest(`.${BUTTON_CLASSNAME}`);
    const isButtonTarget = !!closestTargetEl;

    evt.preventDefault();

    if (isButtonTarget) {
      const writingFileUrl = closestTargetEl.getAttribute('data-url');

      writingWorkButtonsListEl.querySelectorAll(`.${BUTTON_CLASSNAME}`).forEach((buttonEl) => {
        buttonEl.classList.remove('is-active');
      });

      closestTargetEl.classList.add('is-active');

      writingWorkIframeEl.src = writingFileUrl;
    }
  });
}
