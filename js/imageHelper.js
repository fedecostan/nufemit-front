function compressImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let width = image.width;
      let height = image.height;
      let quality = 0.7;
      let scaleFactor = Math.sqrt(51200 / file.size);
      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(function (blob) {
        if (blob.size > 76800) {
          reject("Compressed image size exceeds maximum limit.");
        } else {
          resolve(blob);
        }
      }, file.type, quality);
    };
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}

function setProfileImage(filename, imgId) {
  if (filename) {
    fetchFile(filename,
      image => document.getElementById(imgId).src = image,
      () => document.getElementById(imgId).src = "images/default-profile.jpg");
  } else {
    document.getElementById(imgId).src = "images/default-profile.jpg";
  }
}