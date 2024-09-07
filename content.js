// TODO: when click on other chat

const INITIAL_CHAT_NAME = 'ChatGPT';

document.addEventListener('DOMContentLoaded', function () {
  const onAddTitleToGnb = (title) => {
    const articles = document.querySelectorAll('article');
    if (articles?.length > 0) {
      const gnbElement = articles[0]?.previousElementSibling;
      console.log('gnbElement', title);

      if (gnbElement && gnbElement?.tagName === 'DIV') {
        console.log('gnbElement is DIV');

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
});
