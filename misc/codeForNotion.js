//I use this code in notion to bring me all the text inside a 2 rows table.
const allSpans = [
  ...document.querySelectorAll(".notion-table-view-cell div span"),
];
let response = [];
for (let i = 0; i + 1 < allSpans.length; i += 2) {
  if (allSpans[i]) {
    const res = [allSpans[i].innerText, allSpans[i + 1].innerText];
    if (res[0] === res[1]) {
      res[1] = allSpans[i + 2].innerText;
    }
    response.push({
      wordsToRelate: res[0],
      relationToRelate: res[1],
    });
  }
}
console.log(response);
