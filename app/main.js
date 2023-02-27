"use strict";

$(function () {
  const
    backblaze = $('#backblaze'),
    bunny = $('#bunny'),
    scaleway = $('#scaleway'),
    vultr = $('#vultr');
  const
    backblazeText = $('#backblaze-text span'),
    bunnyText = $('#bunny-text span'),
    scalewayText = $('#scaleway-text span'),
    vultrText = $('#vultr-text span');
  let
    storageTitle = $('#storage-title span'),
    transferTitle = $('#transfer-title span');
  let
    backblazePrice,
    bunnyPrice,
    scalewayPrice,
    vultrPrice;

  $().ready(ChangeDate);
  $(`#storage, 
    #transfer, 
    input[name=bunny], 
    input[name=scaleway]`).change(ChangeDate);

  function FlipMobile(Company, Price) {
    const _630px = window.matchMedia("(max-width: 630px)");

    if (!_630px.matches) {
      Company.css('height', Price * 4);
    } else {
      Company.css('width', Price * 5);
    }
  }

  function FinalActions(Company, Price, Text) {
    Price = Number(Price.toFixed(2));
    Text.text(Price);
    FlipMobile(Company, Price);
  }

  function BackblazeValues(Storage, Transfer) {
    backblazePrice = (Storage * 0.005) + (Transfer * 0.01);
    if (backblazePrice < 7) {
      backblazePrice = 7;
    }

    FinalActions(backblaze, backblazePrice, backblazeText);
  }

  function BunnyValues(Storage, Transfer) {
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

    FinalActions(bunny, bunnyPrice, bunnyText);
  }

  function ScalewayValues(Storage, Transfer) {
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

    FinalActions(scaleway, scalewayPrice, scalewayText);
  }

  function VultrValues(Storage, Transfer) {
    vultrPrice = (Storage * 0.01) + (Transfer * 0.01);
    if (vultrPrice < 5) {
      vultrPrice = 5;
    }

    FinalActions(vultr, vultrPrice, vultrText);
  }

  function ChangeDate() {
    let
      Storage = $('#storage').val(),
      Transfer = $('#transfer').val();

    storageTitle.text(Storage);
    transferTitle.text(Transfer);

    BackblazeValues(Storage, Transfer);
    BunnyValues(Storage, Transfer);
    ScalewayValues(Storage, Transfer);
    VultrValues(Storage, Transfer);

    let priceArray = [backblazePrice, bunnyPrice, scalewayPrice, vultrPrice];
    let graphArray = [backblaze, bunny, scaleway, vultr];
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
})