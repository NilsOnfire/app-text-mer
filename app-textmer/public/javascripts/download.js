function convertirASVG() {
    // Obtener el contenido SVG
    var svgElement = document.querySelector('svg');

    // Crear un elemento de lienzo (canvas)
    var canvas = document.createElement('canvas');
    canvas.width = svgElement.width.baseVal.value;
    canvas.height = svgElement.height.baseVal.value;
    var ctx = canvas.getContext('2d');

    // Convertir SVG a imagen
    var svgString = new XMLSerializer().serializeToString(svgElement);
    var imagenSVG = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    var DOMURL = window.URL || window.webkitURL || window;
    var url = DOMURL.createObjectURL(imagenSVG);

    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);

      // Convertir lienzo (canvas) a imagen PNG
      canvas.toBlob(function (blob) {
        // Crear un enlace para descargar la imagen
        var enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = 'imagen.png';
        enlace.click();
      });
    };
    img.src = url;
  }