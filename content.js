console.log("hello world! it's content for TitleViewer");

document.addEventListener('DOMContentLoaded', function () {
  console.log('loaded!!!!');

  let isContentLoaded = false;
  const titleElements = document.getElementsByTagName('title');

  const intervalId = setInterval(() => {
    if (titleElements?.length > 0 && !isContentLoaded) {
      const title = (titleElements[0].textContent || '').trim();
      console.log('title', title);

      if (title !== 'ChatGPT') {
        isContentLoaded = true;
        clearInterval(intervalId);
      }
    }
  }, 500);
});
