import imgContent from './images/img1.jpg';
console.log(imgContent)
window.onload = function() {
  var img = document.createElement('img');
  img.src = imgContent;
  document.body.appendChild(img);
}
