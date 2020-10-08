const SHEETS = ['Events', 'Signups']
const ID_COL = 1

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    },
  )
}

function onEdit(evt) {
  const range = evt.range
  const sheet = range.getSheet()

  if (!SHEETS.includes(sheet.getSheetName())) {
    console.log('Skipping invalid sheet.')
    return
  }

  const totalRows = sheet.getMaxRows()

  sheet
    .getRange(2, 1, sheet.getMaxRows())
    .getValues()
    .forEach(function(row, index) {
      index = index + 1

      if (
        index >= totalRows ||
        sheet
        .getRange(index + 1, ID_COL)
        .getCell(1, 1)
        .getValue() !== ''
      ) {
        return
      }

      if (!row || row == ['']) {
        console.log(row)
      }

      sheet
        .getRange(index + 1, ID_COL)
        .getCell(1, 1)
        .setValue(uuidv4())
    })
}