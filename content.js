const INITIAL_CHAT_NAME = 'ChatGPT';
const DETECT_ARTICLE_MAX_COUNT = 3;

let observer = null;

document.addEventListener('DOMContentLoaded', function () {
  const onAddTitleToGnb = (title) => {
    let count = 0;

    // detect article elements
    const addTitleToGnbIntervalId = setInterval(() => {
      count += 1;
      const articles = document.querySelectorAll('article');

      // try limited times
      if (count > DETECT_ARTICLE_MAX_COUNT) {
        clearInterval(addTitleToGnbIntervalId);
        return;
      }

      if (articles?.length > 0) {
        clearInterval(addTitleToGnbIntervalId);

        const gnbElement = articles[0]?.previousElementSibling;
        if (gnbElement && gnbElement?.tagName === 'DIV') {
          // Already existed title
          const existedTitleElement = document.querySelector('.chatgpt-chat-title');
          if (existedTitleElement) {
            existedTitleElement.textContent = title;
            return;
          }

          // No title
          const newTitleElement = document.createElement('div');
          newTitleElement.textContent = title;

          newTitleElement.setAttribute(
            'class',
            `block text-ellipsis overflow-hidden whitespace-nowrap flex-1 overflow-hidden items-center gap-2 px-1 text-token-text-secondary chatgpt-chat-title`
          );
          const lastNavChildElement = gnbElement.lastChild;
          if (lastNavChildElement) {
            gnbElement.insertBefore(newTitleElement, lastNavChildElement);
          }
        }
      }
    }, 500);
  };

  // after content initially loaded
  const titleElement = document.querySelector('title');
  const initialContentLoadIntervalId = setInterval(() => {
    if (titleElement) {
      const title = (titleElement?.textContent || '').trim();
      if (title !== INITIAL_CHAT_NAME) {
        // Add title to Gnb
        onAddTitleToGnb(title);
        clearInterval(initialContentLoadIntervalId);
      }
    }
  }, 500);

  // detect title changes
  const detectNavChangeIntervalId = setInterval(() => {
    const navElement = document.querySelector('nav');

    if (navElement) {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const selectedChatTitle = document.querySelector('nav li .bg-token-sidebar-surface-secondary a > div')?.textContent;

          if (selectedChatTitle) {
            onAddTitleToGnb(selectedChatTitle);
          }
        });
      });
      observer.observe(navElement, { subtree: true, attributeFilter: ['class'] });

      clearInterval(detectNavChangeIntervalId);
    }
  }, 500);
});

window.addEventListener('unload', () => {
  if (observer) {
    observer.disconnect();
  }
});
