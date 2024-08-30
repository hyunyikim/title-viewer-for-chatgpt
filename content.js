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
            newTitleElement.textContent = title;
            // TODO: styling
            // TODO: text ellipsis
            newTitleElement.setAttribute('class', `flex items-center gap-2 pr-1 leading-[0]`);
            // newTitleElement.style.fontWeight = 'bold'; // Optional styling

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
