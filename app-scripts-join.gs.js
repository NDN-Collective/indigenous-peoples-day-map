function combineData() {
  var doc = SpreadsheetApp.getActiveSpreadsheet()
  var sheets = doc.getSheets()
  var outSheet = doc.getSheetByName('combined')

  for (i in sheets) {
    if (sheets[i].getSheetName().substring(0, 9) == 'followers') {
      var target = sheets[i].getSheetName().substring(12)
      var data = getRowsData(sheets[i])
      for (j in data) {
        data[j]['target'] = target
      }

      insertData(outSheet, data)
    }
  }
}