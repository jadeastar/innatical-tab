let REFRESH_TOKEN = process.env.REFRESH_TOKEN
let EXTENSION_ID = process.env.EXTENSION_ID
let CLIENT_SECRET = process.env.CLIENT_SECRET
let CLIENT_ID = process.env.CLIENT_ID

const webStore = require('chrome-webstore-upload')({
  extensionId: EXTENSION_ID,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  refreshToken: REFRESH_TOKEN
})

function upload() {
  const extensionSource = fs.createReadStream(
    '../web-ext-artifacts/innatical_tab-*.zip'
  )
  webStore
    .uploadExisting(extensionSource)
    .then((res) => {
      console.log('Successfully uploaded the ZIP')

      // call publish API on success
    })
    .catch((error) => {
      console.log(`Error while uploading ZIP: ${error}`)
      process.exit(1)
    })
}
