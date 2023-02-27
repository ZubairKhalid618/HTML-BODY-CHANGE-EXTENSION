const fileInput = document.getElementById("file-input");
const replaceBodyBtn = document.getElementById("replace-body-btn");

replaceBodyBtn.addEventListener("click", () => {
  const file = fileInput.files[0];
  const fileReader = new FileReader();

  fileReader.onload = () => {
    const fileContents = fileReader.result;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          function: (bodyContent) => {
            document.body.innerHTML = bodyContent;
          },
          args: [fileContents],
        },
        () => {
          console.log("Body replaced successfully!");
        }
      );
    });
  };

  fileReader.readAsText(file);
});
