import { indicatorUpdate, switches, providers } from "./main.js";
import { Provider } from "./providers.js";


export let
  switchRadio,
  radioProviderName;

let
  limiterRedraw = 0,
  portraitMode = false;


export function additionListener() {
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

  listenerChangeForSwitches(switches);
}

export function listenerChangeForSwitches(switches) {
  switches.forEach((current) => {
    if (NodeList.prototype.isPrototypeOf(current)) {
      current.forEach((currentNodeList) => {
        currentNodeList.addEventListener("input", () => {
          switchRadio = true;
          radioProviderName = currentNodeList.name;

          indicatorUpdate();

          switchRadio = false;
        })
      })
    }
    else {
      current.addEventListener("input", () => {
        indicatorUpdate();
      })
    }
  })
}