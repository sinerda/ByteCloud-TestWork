import { maximumPriceOfAll } from "./main.js";

export class Provider {

  constructor(nameProvider) {
    this.chart = document.getElementById(`${nameProvider}`);
    this.lablePrice = document.getElementById(`${nameProvider}-text`).querySelector('span');
    this.graph = document.getElementById(`${nameProvider}-graph`);
    this.price = 0;
    this.percentageOfMax = 0;
  }

  maximumPriceOfProvider(maxStorage, maxTransfer) {
    return this.calculation(maxStorage, maxTransfer);
  }

  static updateAllPriceProvider(storage, transfer, providers) {
    providers.forEach((current) => {
      current.updatePrice(storage, transfer);
    })
  }

  updatePrice(storage, transfer) {
    this.calculation(storage, transfer);
    this.priceFormatting(this.price);
    this.percentageOfMaxPrice(maximumPriceOfAll, this.price);
    this.rendering();
  }

  priceFormatting(inputPrice) {
    this.price = Number(inputPrice.toFixed(2));
  }

  percentageOfMaxPrice(maxPrice, price) {
    this.percentageOfMax = ((price / maxPrice) * 100);
  }
  
  rendering() {
    this.lablePrice.innerText = this.price;
    this.chartDrawing(this.graph, this.price, this.percentageOfMax);
  };

  chartDrawing(company, price, percentage) {
    const 
      _630px = window.matchMedia("(max-width: 630px)");

    if (!_630px.matches) {
      company.style.height = `${percentage}%`;
    } else {
      company.style.width = `${percentage}%`;
    }
  }

  static redrawing(providers, screenMode) {
    providers.forEach((current) => {
      current.chartRedrawing(current.graph, current.price, screenMode);
    })
  }

  chartRedrawing(company, price, percentage, screenMode) {
    switch (screenMode) {
      case 'portrait':
        company.style.height = '35px';
        company.style.width = `${percentage}%`;
        break;
      case 'landscape':
        company.style.width = '90px';
        company.style.height = `${price * 4}px`;
        break;
    }
  }

  static coloringMinimumPrice(providers) {
    // убираем классы от предыдущей колоризации
    for (let i = 0; i < providers.length; i++) {
      providers[i].chart.classList.remove('low-price');
    }

    // Ищем минимальное число
    let minimalNumber = providers[0].price;

    for (let i = 1; i < providers.length; i++) {
      if (providers[i].price < providers[i - 1].price) {
        if (providers[i].price < minimalNumber) {
          minimalNumber = providers[i].price;
        }
      }
      else if (providers[i - 1].price < minimalNumber) {
        minimalNumber = providers[i - 1].price;
      }
    }

    let providersWithMinimumPrices = [];

    for (let i = 0; i < providers.length; i++) {
      if (providers[i].price == minimalNumber) {
        providersWithMinimumPrices.push(providers[i].chart);
      }
    }

    // цепляем классы 
    for (let i = 0; i < providersWithMinimumPrices.length; i++) {
      providersWithMinimumPrices[i].classList.toggle('low-price');
    }
  }
}

export class Backblaze extends Provider {

  calculation(storage, transfer) {
    this.price = (storage * 0.005) + (transfer * 0.01);
    if (this.price < 7) {
      this.price = 7;
    }
    return this.price;
  }

}

export class Bunny extends Provider {

  calculation(storage, transfer) {
    let option = document.querySelector('input[name=bunny]:checked').value;

    switch (option) {
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
    return this.price;
  }

}

export class Scaleway extends Provider {

  calculation(storage, transfer) {
    if ((storage <= 75) && (transfer <= 75)) {
      this.price = 0;
    }
    else {
      let option = document.querySelector('input[name=scaleway]:checked').value;

      switch (option) {
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
    return this.price;
  }

}

export class Vultr extends Provider {

  calculation(storage, transfer) {
    this.price = (storage * 0.01) + (transfer * 0.01);
    if (this.price < 5) {
      this.price = 5;
    }
    return this.price;
  }

}