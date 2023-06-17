import { Provider, Backblaze, Bunny, Scaleway, Vultr } from "./providers.js";
import { additionListener, switchRadio, switchRadioProvider } from "./listeners.js";
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
  providers = [backblaze, bunny, scaleway, vultr],
  switches = [storage, transfer, input_bunny, input_scaleway];
export let 
  maximumPriceOfAll = 0;


additionListener();
maxPrice(providers);

function maxPrice(providers) {
  const
    maxStorage = storage.getAttribute('max'),
    maxTransfer = transfer.getAttribute('max');

  providers.forEach((current) => {
    let maximumPrice = current.maximumPriceOfProvider(maxStorage, maxTransfer);
    if (maximumPrice > maximumPriceOfAll) {
      maximumPriceOfAll = maximumPrice;
    }
  })
}

export function indicatorUpdate() {
  if (!switchRadio) {
    updateControlPanelCurrentReadings(storage.value, transfer.value);
    Provider.updateAllPriceProvider(storage.value, transfer.value, providers);
  } else {
    switch (switchRadioProvider) {
      case 'bunny': bunny.updatePrice(storage.value, transfer.value);
      case 'scaleway': scaleway.updatePrice(storage.value, transfer.value);
    }
  }

  Provider.coloringMinimumPrice(providers);
}