import { Provider, Backblaze, Bunny, Scaleway, Vultr } from "./provider.js";
import { additionListener, switchRadio, switchRadioProvider } from "./listener.js";
import { updateControlPanelCurrentReadings } from "./controlPanel.js";


const
  backblaze = new Backblaze('backblaze'),
  bunny = new Bunny('bunny'),
  scaleway = new Scaleway('scaleway'),
  vultr = new Vultr('vultr'),
  providers = [backblaze, bunny, scaleway, vultr],

  storage = document.getElementById('storage'),
  transfer = document.getElementById('transfer'),
  input_bunny = document.querySelectorAll('.date__company-input input[name=bunny]'),
  input_scaleway = document.querySelectorAll(".date__company-input input[name='scaleway']");

export const switches = [storage, transfer, input_bunny, input_scaleway];


additionListener();

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