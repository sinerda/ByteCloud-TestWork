"use strict";

$(function () {
  // 
  // Объекты
  let backblaze = {
    price: 0,
    text: $('#backblaze-text span'),
    chart: $('#backblaze'),

    calculate(Storage, Transfer) {
      this.price = (Storage * 0.005) + (Transfer * 0.01);
      if (this.price < 7) {
        this.price = 7;
      }
      return this.price;
    },
    rendering(Storage, Transfer) {
      this.calculate(Storage, Transfer);
      finalActions(this.chart, this.price, this.text);
    }
  }

  // - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - - 
  const
    // backblaze = $('#backblaze'),
    bunny = $('#bunny'),
    scaleway = $('#scaleway'),
    vultr = $('#vultr'),
    // backblazeText = $('#backblaze-text span'),
    bunnyText = $('#bunny-text span'),
    scalewayText = $('#scaleway-text span'),
    vultrText = $('#vultr-text span');
  let
    storageTitle = $('#storage-title span'),
    transferTitle = $('#transfer-title span'),
    // backblazePrice,
    bunnyPrice,
    scalewayPrice,
    vultrPrice;

  $().ready(changeDate);
  $(`#storage, 
    #transfer, 
    input[name=bunny], 
    input[name=scaleway]`).change(changeDate);

  // 
  // Основная функция
  function changeDate() {
    let
      Storage = $('#storage').val(),
      Transfer = $('#transfer').val();

    storageTitle.text(Storage);
    transferTitle.text(Transfer);

    backblaze.rendering(Storage, Transfer);
    bunnyValues(Storage, Transfer);
    scalewayValues(Storage, Transfer);
    vultrValues(Storage, Transfer);

    coloringMinimumValue();
  }

  // 
  // Алгоритмы подсчёта значений
  // - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - - 
  function bunnyValues(Storage, Transfer) {
    let bunnyCheck = $('input[name=bunny]:checked').val();

    switch (bunnyCheck) {
      case 'hdd':
        bunnyPrice = (Storage * 0.01) + (Transfer * 0.01);
        break;
      case 'ssd':
        bunnyPrice = (Storage * 0.02) + (Transfer * 0.01);
        break;
    }
    if (bunnyPrice > 10) {
      bunnyPrice = 10;
    }

    finalActions(bunny, bunnyPrice, bunnyText);
  }

  function scalewayValues(Storage, Transfer) {
    if ((Storage <= 75) && (Transfer <= 75)) {
      scalewayPrice = 0;
    }
    else {
      let scalewayCheck = $('input[name=scaleway]:checked').val();

      switch (scalewayCheck) {
        case 'multi':
          if (Storage <= 75) {
            scalewayPrice = (Transfer - 75) * 0.02;
          } else if (Transfer <= 75) {
            scalewayPrice = (Storage - 75) * 0.06;
          } else {
            scalewayPrice = ((Storage - 75) * 0.06) + ((Transfer - 75) * 0.02);
            break;
          }
        case 'single':
          if (Storage <= 75) {
            scalewayPrice = (Transfer - 75) * 0.02;
          } else if (Transfer <= 75) {
            scalewayPrice = (Storage - 75) * 0.03;
          } else {
            scalewayPrice = ((Storage - 75) * 0.03) + ((Transfer - 75) * 0.02);
            break;
          }
      }
    }

    finalActions(scaleway, scalewayPrice, scalewayText);
  }

  function vultrValues(Storage, Transfer) {
    vultrPrice = (Storage * 0.01) + (Transfer * 0.01);
    if (vultrPrice < 5) {
      vultrPrice = 5;
    }

    finalActions(vultr, vultrPrice, vultrText);
  }
  // - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - - 

  // 
  // Вспомогательные функции
  // - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - - 
  function finalActions(Company, Price, Text) {
    Price = Number(Price.toFixed(2));
    Text.text(Price);
    chartDrawing(Company, Price);
  }

  function chartDrawing(Company, Price) {
    const _630px = window.matchMedia("(max-width: 630px)");

    if (!_630px.matches) {
      Company.css('height', Price * 4);
    } else {
      Company.css('width', Price * 5);
    }
  }

  function coloringMinimumValue() {
    let priceArray = [backblaze.price, bunnyPrice, scalewayPrice, vultrPrice];
    let graphArray = [backblaze.chart, bunny, scaleway, vultr];

    // убираем предыдущие классы
    for (let i = 0; i < graphArray.length; i++) {
      graphArray[i].removeClass('low-price');
    }
    // Ищем минимальное число
    let totalLow = priceArray[0];
    for (let i = 1; i < priceArray.length; i++) {
      if (priceArray[i] < priceArray[i - 1]) {
        if (priceArray[i] < totalLow) {
          totalLow = priceArray[i];
        }
      }
      else if (priceArray[i - 1] < totalLow) {
        totalLow = priceArray[i - 1];
      }
    }
    // Заполняем массив элементами с мин. значением
    let lowArray = [];
    for (let i = 0; i < priceArray.length; i++) {
      if (priceArray[i] == totalLow) {
        lowArray.push(graphArray[i]);
      }
    }
    // цепляем классы 
    for (let i = 0; i < lowArray.length; i++) {
      lowArray[i].toggleClass('low-price');
    }
  }
  // - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - - 
})