import { indicatorUpdate, switches, providers } from "./main.js";
import { Provider } from "./providers.js";


export let
  switchRadio,
  switchRadioProvider;

let 
  limiterResize = 0,
  portraitMode = false;


export function additionListener() {
  document.addEventListener("DOMContentLoaded", () => {
    indicatorUpdate();
  })
  window.addEventListener('resize', function () {
    const windowWidth = this.window.innerWidth;   

    const startOfCount = function() {
      limiterResize = 0;
      limiterResize++;
    }   

    if ((windowWidth < 630) && (!portraitMode)) {
      portraitMode = true;
      startOfCount();
    }
    if ((windowWidth > 630) && (portraitMode)) {
      portraitMode = false;
      startOfCount();
    }

    if ((portraitMode) && (limiterResize < 2)) {
      limiterResize++;
      Provider.redrawing(providers, 'portrait');
    }
    if ((!portraitMode) && (limiterResize < 2)) {
      limiterResize++;
      Provider.redrawing(providers, 'landscape');
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