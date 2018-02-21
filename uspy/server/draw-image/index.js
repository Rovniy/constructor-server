'use strict';

const {registerFont, Image, createCanvas, Canvas} = require('canvas'),
  fs = require('fs');

let config = {
  context: '2d',
  default: {
    rotate: 0,
    color: 'rgb(255,255,255,1)'
  }
};

/**
 * Создание готовой картинки
 */
function drawImage() {
  let id = require('../test/image.config');
  let canvas = createCanvas(id.canvas.width, id.canvas.height),
    ctx = canvas.getContext(config.context),
    itemIndex = 0,
    lengthIndexArray = id.items.length;

  /**
   * Отрисовка элементов
   */
  function createItem() {
    let item = id.items[itemIndex];
    if (id.items[itemIndex]) {
      ctx.rotate(config.default.rotate);
      switch (item.type) {
        /********************** ИЗОБРАЖЕНИЕ ********************/
        case 'image':
          console.log('нашел изображение');
          fs.readFile(item.src, function (err, filePath) {
            if (err) throw err;
            let img = new Image;
            img.src = filePath;
            ctx.rotate(item.rotation * Math.PI / 180);
            ctx.drawImage(img, item.positionX, item.positionY, item.width, item.height);
            console.log('Нарисовал изображение');
            checkCounter();
          });
          break;
        /*********************** ТЕКСТ *****************************/
        case "text":
          console.log('нашел текст');
          let f = registerFont('./src/fonts/'+item.font, {family: 'CurrentFont'});
          ctx.font = item.style + ' ' + item.size + 'px CurrentFont';
          ctx.textBaseline = "top";
          ctx.rotate(item.rotation * Math.PI / 180);
          ctx.fillStyle = item.color;
          ctx.fillText(item.content, item.positionX, item.positionY);
          console.log('Нарисовал текст');
          f = undefined;
          checkCounter();
          break;
        /************************* НЕНАЙДЕННОЕ **********************/
        default :
          console.log('DRAWIMAGE : drawImage() : not found item type');
          checkCounter();
      }
    }
  }
  /**
   * Переход по элементам
   */
  function checkCounter() {
    itemIndex++;
    if (itemIndex < lengthIndexArray) {
      createItem();
    } else {
      saveFile(canvas, id); //Сохранение полученного изображениея в файл
    }
  }

  createItem(); //Отрисовка элементов
}

/**
 * Сохранение полученного изображениея в файл
 * @param canvas - рабочай область
 * @param id - данные JSON-структуры файла
 */
function saveFile(canvas, id) {
  let stream = canvas.pngStream(),
    imagePath = './src/test.png',
    out = fs.createWriteStream(imagePath);

  stream.on('data', function (chunk) {
    out.write(chunk);
  });

  stream.on('end', function () {
    console.log('DRAWIMAGE : image for user ' + id.owner + ' created in path:', imagePath);
  });
}

module.exports = drawImage;



