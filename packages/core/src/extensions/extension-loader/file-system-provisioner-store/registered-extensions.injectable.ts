/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";
import type { LensExtensionId } from "../../lens-extension";

export const registeredExtensionsInjectable = getInjectable({
  id: "registered-extensions",
  instantiate: () => observable.map<LensExtensionId, string>(),
});
