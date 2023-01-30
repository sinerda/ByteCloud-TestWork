"use strict";

$(function () {

  $().ready(ChangeDate);
  $('#storage').change(ChangeDate);
  $('#transfer').change(ChangeDate);
  $('input[name=bunny]').change(ChangeDate);
  $('input[name=scaleway]').change(ChangeDate);

  function ChangeDate() {
    const _630px = window.matchMedia("(max-width: 630px)");

    let Storage = $('#storage').val(),
      Transfer = $('#transfer').val(),
      storageTitle = $('#storage-title span'),
      transferTitle = $('#transfer-title span');

    storageTitle.text(Storage);
    transferTitle.text(Transfer);

    const backblaze = $('#backblaze'),
      bunny = $('#bunny'),
      scaleway = $('#scaleway'),
      vultr = $('#vultr');

    const backblazeText = $('#backblaze-text span'),
      bunnyText = $('#bunny-text span'),
      scalewayText = $('#scaleway-text span'),
      vultrText = $('#vultr-text span');


    // backblaze
    let backblazePrise = ((Storage * 0.005) + (Transfer * 0.01)).toFixed(2);
    backblazePrise = Number(backblazePrise);
    if (backblazePrise < 7) { backblazePrise = 7; }
    backblazeText.text(backblazePrise);
    if (!_630px.matches) {
      backblaze.css('height', backblazePrise * 4);
    } else {
      backblaze.css('width', backblazePrise * 5);
    }

    // bunny
    let bunnyCheck = $('input[name=bunny]:checked').val();
    let bunnyPrise;
    switch (bunnyCheck) {
      case 'hdd':
        bunnyPrise = ((Storage * 0.01) + (Transfer * 0.01)).toFixed(2);
        break;
      case 'ssd':
        bunnyPrise = ((Storage * 0.02) + (Transfer * 0.01)).toFixed(2);
        break;
    }
    bunnyPrise = Number(bunnyPrise);
    if (bunnyPrise > 10) { bunnyPrise = 10; }
    bunnyText.text(bunnyPrise);
    if (!_630px.matches) {
      bunny.css('height', bunnyPrise * 4);
    } else {
      bunny.css('width', bunnyPrise * 5);
    }

    // scaleway
    let scalewayPrise;
    if ((Storage <= 75) && (Transfer <= 75)) { scalewayPrise = 0; }
    else {
      let scalewayCheck = $('input[name=scaleway]:checked').val();
      switch (scalewayCheck) {
        case 'multi':
          if (Storage <= 75) scalewayPrise = ((Transfer - 75) * 0.02).toFixed(2);
          else if (Transfer <= 75) scalewayPrise = ((Storage - 75) * 0.06).toFixed(2);
          else scalewayPrise = (((Storage - 75) * 0.06) + ((Transfer - 75) * 0.02)).toFixed(2);
          break;
        case 'single':
          if (Storage <= 75) scalewayPrise = ((Transfer - 75) * 0.02).toFixed(2);
          else if (Transfer <= 75) scalewayPrise = ((Storage - 75) * 0.03).toFixed(2);
          else scalewayPrise = (((Storage - 75) * 0.03) + ((Transfer - 75) * 0.02)).toFixed(2);
          break;
      }
    }
    scalewayPrise = Number(scalewayPrise);
    scalewayText.text(scalewayPrise);
    if (!_630px.matches) {
      scaleway.css('height', scalewayPrise * 4);
    } else {
      scaleway.css('width', scalewayPrise * 5);
    }

    // vultr
    let vultrPrise = ((Storage * 0.01) + (Transfer * 0.01)).toFixed(2);
    vultrPrise = Number(vultrPrise);
    if (vultrPrise < 5) { vultrPrise = 5; }
    vultrText.text(vultrPrise);
    if (!_630px.matches) {
      vultr.css('height', vultrPrise * 4);
    } else {
      vultr.css('width', vultrPrise * 5);
    }



    let priceArray = [backblazePrise, bunnyPrise, scalewayPrise, vultrPrise];
    let graphArray = [backblaze, bunny, scaleway, vultr];
    // убираем предыдущие классы
    for (let i = 0; i < graphArray.length; i++) {
      graphArray[i].removeClass('low-price');
    }
    // Ищем минимальное число
    let totalLow = priceArray[0];
    for (let i = 1; i < priceArray.length; i++) {
      if (priceArray[i] < priceArray[i - 1]) {
        if (priceArray[i] < totalLow) { totalLow = priceArray[i]; }
      }
      else if (priceArray[i - 1] < totalLow) { totalLow = priceArray[i - 1]; }
    }
    // Заполняем массив элементами с мин. значением
    let lowArray = [];
    for (let i = 0; i < priceArray.length; i++) {
      if (priceArray[i] == totalLow) { lowArray.push(graphArray[i]); }
    }
    // цепляем классы 
    for (let i = 0; i < lowArray.length; i++) {
      if (!(lowArray[i].hasClass('low-price'))) {
        lowArray[i].toggleClass('low-price');
      }
    }
  }
})