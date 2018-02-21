'use strict';

var Canvas = require('canvas'),
  fs = require('fs');

var config = {
  context: '2d',
  default: {
    rotate: 0,
    color: 'rgb(255,255,255,1)'
  }
};

/**
 * Сброс настроек курсора
 * @param ctx - контекст отображения
 */
function setDefault(ctx) {
  ctx.rotate(config.default.rotate);
}

function drawImage(id) {
  console.log('рисую....');
  var Image = Canvas.Image,
    canvas = new Canvas(id.canvas.width, id.canvas.height),
    ctx = canvas.getContext(config.context);

  ctx.fillStyle = id.canvas.background; // Цвет background

  id.items.forEach(function (item) {
    //setDefault(ctx); //Сброс настроек курсора
    switch (item.type) {
      case 'image':

        var erase_image = new Image();
        erase_image.src = item.src;
        erase_image.onload = function(i)
        {
          ctx.drawImage(erase_image, item.positionX, item.positionY, item.width, item.height);
          console.log('тут изображени',i);
        };
        break;
      case "text":
        ctx.font = item.size*2 + 'px ' + item.font;
        ctx.rotate(item.rotate);
        ctx.fillText(item.content, item.positionX, item.positionY);
        // ctx.strokeStyle = item.color;

        /*var te = ctx.measureText('Awesome!');
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.beginPath();
        ctx.lineTo(50, 102);
        ctx.lineTo(50 + te.width, 102);
        ctx.stroke();*/
        break;
      default :
        console.log('DRAWIMAGE : drawImage() : not found item type');
    }
  });




  saveFile(canvas, id); //Сохранение полученного изображениея в файл

}

/**
 * Сохранение полученного изображениея в файл
 * @param canvas - рабочай область
 * @param id - данные JSON-структуры файла
 */
function saveFile(canvas, id) {
  var stream = canvas.pngStream(),
    imagePath = '././src/test.png',
    out = fs.createWriteStream(imagePath);

  stream.on('data', function (chunk) {
    out.write(chunk);
  });

  stream.on('end', function () {
    console.log('DRAWIMAGE : image for user ' + id.owner + ' created in path:', imagePath);
  });
}

module.exports = drawImage;



