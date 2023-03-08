import { indicatorUpdate } from "./main.js";
import { switches } from "./main.js";


export let
  switchRadio,
  switchRadioProvider;

export function additionListener() {
  document.addEventListener("DOMContentLoaded", () => {
    indicatorUpdate();
  })
  additionListenerChangeForSwitches(switches);
}

export function additionListenerChangeForSwitches(switches) {
  switches.forEach((current) => {
    if (!NodeList.prototype.isPrototypeOf(current)) {
      current.addEventListener("input", () => {
        indicatorUpdate();
      })
    } else {
      current.forEach((currentNodeList) => {
        currentNodeList.addEventListener("input", () => {
          switchRadio = true;
          switchRadioProvider = currentNodeList.name;

          indicatorUpdate();
          
          switchRadio = false;
        })
      })
    }
  })
}