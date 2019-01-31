export function uploadImgToBase64 (file) {
  var base = ''
  var ImgToBase64 = new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () { // 圖片轉base64完成後返回reader物
      resolve(reader.result)
    }
    reader.onerror = reject
  })
  ImgToBase64.then((result) => {
    base = result
    console.log(result)
  })
  return base
}
