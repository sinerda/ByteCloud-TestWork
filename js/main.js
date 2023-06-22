import { Provider, Backblaze, Bunny, Scaleway, Vultr } from "./providers.js";
import { additionListener, switchRadio, radioProviderName } from "./listeners.js";
import { updateControlPanelCurrentReadings } from "./controlPanel.js";


const
  backblaze = new Backblaze('backblaze'),
  bunny = new Bunny('bunny'),
  scaleway = new Scaleway('scaleway'),
  vultr = new Vultr('vultr');
const
  storage = document.getElementById('storage'),
  transfer = document.getElementById('transfer'),
  input_bunny = document.querySelectorAll('.date__company-input input[name=bunny]'),
  input_scaleway = document.querySelectorAll(".date__company-input input[name='scaleway']");

export const
  _630px = window.matchMedia("(max-width: 630px)"),
  providers = [backblaze, bunny, scaleway, vultr],
  switches = [storage, transfer, input_bunny, input_scaleway];
export let
  maximumPriceOfAll = 0;



document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage(input_bunny, input_scaleway);
  indicatorUpdate();
})

additionListener();
maxPrice(providers);

function loadFromStorage(bunny, scaleway) {
  if (localStorage.getItem('storage') == null) {
    saveToStorage(500, 500, 'hdd', 'milti');
  }
  else {
    const
      bunnyItem = localStorage.getItem('bunny'),
      scalewayItem = localStorage.getItem('scaleway'),
      switches = [bunny, scaleway];

    for (let one_of_switches of switches) {
      for (const radioButton of one_of_switches) {
        if ((radioButton.defaultValue == bunnyItem) ||
          (radioButton.defaultValue == scalewayItem)) {
          radioButton.checked = true;
          break;
        }
      }
    }

    storage.value = localStorage.getItem('storage');
    transfer.value = localStorage.getItem('transfer');
  }
}

function saveToStorage(storage, transfer, bunny, scaleway) {
  if (typeof bunny !== 'string') {
    let
      bunnyNew,
      scalewayNew;
    const
      switches = [bunny, scaleway];

    for (let one_of_switches of switches) {
      for (const radioButton of one_of_switches) {
        if (radioButton.checked) {
          switch (radioButton.name) {
            case 'bunny':
              bunnyNew = radioButton.value;
              break;
            case 'scaleway':
              scalewayNew = radioButton.value;
              break;
          }
        }
      }
    }
    localStorage.setItem('bunny', bunnyNew);
    localStorage.setItem('scaleway', scalewayNew);
  }
  else {
    localStorage.setItem('bunny', bunny);
    localStorage.setItem('scaleway', scaleway);
  }
  localStorage.setItem('storage', storage);
  localStorage.setItem('transfer', transfer);
}

function maxPrice(providers) {
  const
    maxStorage = storage.getAttribute('max'),
    maxTransfer = transfer.getAttribute('max');

  providers.forEach((current) => {
    let maxPrice = current.maximumPriceOfProvider(maxStorage, maxTransfer);
    if (maxPrice > maximumPriceOfAll) {
      maximumPriceOfAll = maxPrice;
    }
  })
}

export function indicatorUpdate() {
  if (switchRadio) {
    switch (radioProviderName) {
      case 'bunny': bunny.updatePrice(storage.value, transfer.value);
      case 'scaleway': scaleway.updatePrice(storage.value, transfer.value);
    }
  } else {
    updateControlPanelCurrentReadings(storage.value, transfer.value);
    Provider.updateAllPriceProvider(storage.value, transfer.value, providers);
  }
  Provider.coloringMinimumPrice(providers);
}

window.onbeforeunload = function () {
  saveToStorage(storage.value, transfer.value, input_bunny, input_scaleway);
}