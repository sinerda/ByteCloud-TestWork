"use strict";

class Company {

  constructor(nameCompany) {
    this.chart = document.getElementById(`${nameCompany}`);
    this.lablePrice = document.getElementById(`${nameCompany}-text`).querySelector('span');
    this.price = 0;
  }

  static updateAllCompany(storage, transfer) {
    const companies = [backblaze, bunny, scaleway, vultr];

    companies.forEach((current) => {
      current.update(storage, transfer);
    }, this)
  }

  update(storage, transfer) {
    this.calculation(storage, transfer);
    this.priceFormatting(this.price);
    this.rendering();
  }

  priceFormatting(inputPrice) {
    this.price = Number(inputPrice.toFixed(2));
  }

  rendering() {
    this.lablePrice.innerText = this.price;
    this.chartDrawing(this.chart, this.price);
  };

  chartDrawing(company, price) {
    const _630px = window.matchMedia("(max-width: 630px)");

    if (!_630px.matches) {
      company.style.height = `${price * 4}px`;
    } else {
      company.style.width = `${price * 5}px`;
    }
  }

  static coloringMinimumValue() {
    let priceArray = [backblaze.price, bunny.price, scaleway.price, vultr.price];
    let graphArray = [backblaze.chart, bunny.chart, scaleway.chart, vultr.chart];

    // убираем предыдущие классы
    for (let i = 0; i < graphArray.length; i++) {
      graphArray[i].classList.remove('low-price');
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
      lowArray[i].classList.toggle('low-price');
    }
  }
}

class Backblaze extends Company {

  calculation(storage, transfer) {
    this.price = (storage * 0.005) + (transfer * 0.01);
    if (this.price < 7) {
      this.price = 7;
    }
  }

}

class Bunny extends Company {

  calculation(storage, transfer) {
    let bunnyCheck = document.querySelector('input[name=bunny]:checked').value;

    switch (bunnyCheck) {
      case 'hdd':
        this.price = (storage * 0.01) + (transfer * 0.01);
        break;
      case 'ssd':
        this.price = (storage * 0.02) + (transfer * 0.01);
        break;
    }
    if (this.price > 10) {
      this.price = 10;
    }
  }

}

class Scaleway extends Company {

  calculation(storage, transfer) {
    if ((storage <= 75) && (transfer <= 75)) {
      this.price = 0;
    }
    else {
      let scalewayCheck = document.querySelector('input[name=scaleway]:checked').value;

      switch (scalewayCheck) {
        case 'multi':
          if (storage <= 75) {
            this.price = (transfer - 75) * 0.02;
          } else if (transfer <= 75) {
            this.price = (storage - 75) * 0.06;
          } else {
            this.price = ((storage - 75) * 0.06) + ((transfer - 75) * 0.02);
            break;
          }
        case 'single':
          if (storage <= 75) {
            this.price = (transfer - 75) * 0.02;
          } else if (transfer <= 75) {
            this.price = (storage - 75) * 0.03;
          } else {
            this.price = ((storage - 75) * 0.03) + ((transfer - 75) * 0.02);
            break;
          }
      }
    }
  }

}

class Vultr extends Company {

  calculation(storage, transfer) {
    this.price = (storage * 0.01) + (transfer * 0.01);
    if (this.price < 5) {
      this.price = 5;
    }
  }

}

// 
// Объекты
let
  backblaze = new Backblaze('backblaze'),
  bunny = new Bunny('bunny'),
  scaleway = new Scaleway('scaleway'),
  vultr = new Vultr('vultr');
// 
const
  storage = document.getElementById('storage'),
  transfer = document.getElementById('transfer'),
  storageTitle = document.getElementById('storage-title').querySelector('span'),
  transferTitle = document.getElementById('transfer-title').querySelector('span'),
  input_bunny = document.querySelector('input[name=bunny]'),
  input_scaleway = document.querySelector('input[name=scaleway]');

document.addEventListener("DOMContentLoaded", () => {
  changeDate();
})
storage.addEventListener("input", () => {
  changeDate();
})
transfer.addEventListener("input", () => {
  changeDate();
})
$(`input[name=bunny], 
    input[name=scaleway]`).change(changeDate);

// 
// Основная функция
function changeDate() {
  let
    storageValue = storage.value,
    transferValue = transfer.value;

  storageTitle.innerHTML = storageValue;
  transferTitle.innerHTML = transferValue;

  Company.updateAllCompany(storageValue, transferValue);
  Company.coloringMinimumValue();
}