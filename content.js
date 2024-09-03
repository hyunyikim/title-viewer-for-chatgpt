// TODO: when title is changed
// TODO: when click on other chat

document.addEventListener('DOMContentLoaded', function () {
  let isContentLoaded = false;
  const titleElements = document.getElementsByTagName('title');

  const intervalId = setInterval(() => {
    if (titleElements?.length > 0 && !isContentLoaded) {
      const titleElement = titleElements[0];
      const title = (titleElement.textContent || '').trim();
      console.log('title', title);

      if (title !== 'ChatGPT') {
        isContentLoaded = true;
        clearInterval(intervalId);

        // Add title to Nav
        const articles = document.querySelectorAll('article');

        // TODO: if there is a chat before starting?
        if (articles?.length > 0) {
          const navElement = articles[0]?.previousElementSibling;
          console.log('navElement', navElement);
          if (navElement && navElement?.tagName === 'DIV') {
            console.log('navElement is DIV');

            const newTitleElement = document.createElement('div');
            // newTitleElement.textContent = title;
            newTitleElement.textContent = `hello world, I'm making an Chrome Extension right now, I wonder this is working. How much area it will occupied? hello world, I'm making an Chrome Extension right now, I wonder this is working. How much area it will occupied?`;

            newTitleElement.setAttribute(
              'class',
              `block text-ellipsis overflow-hidden whitespace-nowrap flex-1 overflow-hidden items-center gap-2 px-1 text-token-text-secondary`
            );

            const lastNavChildElement = navElement.lastChild;
            if (lastNavChildElement) {
              navElement.insertBefore(newTitleElement, lastNavChildElement);
            }
          }
        }
      }
    }
  }, 500);
});
