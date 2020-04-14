export default {
  fileToImage: function (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function (event) {
        const img = new Image()
        if (event.target.result) {
          img.onload = function () {
            resolve(img)
          }
          img.src = event.target.result // base64
        } else {
          reject(new Error('fileToImage error'))
        }
      }
      reader.readAsDataURL(file)
    })
  },

  dataURLtoFile: function (dataurl, filename) {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }
}
