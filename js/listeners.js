import { indicatorUpdate, switches, providers } from "./main.js";
import { Provider } from "./providers.js";


export let
  switchRadio,
  switchRadioProvider;

let
  limiterRedraw = 0,
  portraitMode = false;


export function additionListener() {
  document.addEventListener("DOMContentLoaded", () => {
    indicatorUpdate();
  })
  window.addEventListener('resize', function () {
    const windowWidth = this.window.innerWidth;

    const startOfCount = function () {
      limiterRedraw = 0;
      limiterRedraw++;
    }

    if ((windowWidth < 631) && (!portraitMode)) {
      portraitMode = true;
      startOfCount();
    }
    if ((windowWidth >= 631) && (portraitMode)) {
      portraitMode = false;
      startOfCount();
    }

    if ((portraitMode) && (limiterRedraw < 2) && (windowWidth < 631)) {
      limiterRedraw++;
      Provider.redrawingAll(providers, 'portrait');
    }
    if ((!portraitMode) && (limiterRedraw < 2) && (windowWidth >= 631)) {
      limiterRedraw++;
      Provider.redrawingAll(providers, 'landscape');
    }
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