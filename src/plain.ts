function stripFormatting(text: string) {
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = text;
  return tempDiv.textContent || tempDiv.innerText;
}

document.addEventListener("copy", function (event) {
  event.preventDefault(); // Prevent the default copy behavior

  var text = window?.getSelection()?.toString(); // Get the selected text
  var plainText = stripFormatting(text as string); // Remove formatting from the selected text

  event?.clipboardData?.setData("text/plain", plainText); // Set the plain text as the clipboard data
});
