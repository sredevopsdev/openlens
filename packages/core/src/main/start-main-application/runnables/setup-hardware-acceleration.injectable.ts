/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import disableHardwareAccelerationInjectable from "../../electron-app/features/disable-hardware-acceleration.injectable";
import hardwareAccelerationShouldBeDisabledInjectable from "../../vars/hardware-acceleration-should-be-disabled.injectable";
import { beforeElectronIsReadyInjectionToken } from "../runnable-tokens/before-electron-is-ready-injection-token";

const setupHardwareAccelerationInjectable = getInjectable({
  id: "setup-hardware-acceleration",

  instantiate: (di) => {
    const hardwareAccelerationShouldBeDisabled = di.inject(hardwareAccelerationShouldBeDisabledInjectable);
    const disableHardwareAcceleration = di.inject(disableHardwareAccelerationInjectable);

    return {
      id: "setup-hardware-acceleration",
      run: () => {
        if (hardwareAccelerationShouldBeDisabled) {
          disableHardwareAcceleration();
        }

        return undefined;
      },
    };
  },

  injectionToken: beforeElectronIsReadyInjectionToken,
});

export default setupHardwareAccelerationInjectable;
