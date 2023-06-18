export function updateControlPanelCurrentReadings(storageValue, transferValue) {
  const
    storageReadings = document.getElementById('storage-title').querySelector('span'),
    transferReadings = document.getElementById('transfer-title').querySelector('span');

  storageReadings.innerHTML = storageValue;
  transferReadings.innerHTML = transferValue;
}