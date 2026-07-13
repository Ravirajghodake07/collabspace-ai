export const downloadAsText = (title, content) => {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]+>/g, "");

  const blob = new Blob([plainText], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = `${title}.txt`;

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};

export const downloadAsHTML = (title, content) => {
  const blob = new Blob([content], {
    type: "text/html;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = `${title}.html`;

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};