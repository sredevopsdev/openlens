/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { docsUrl, forumsUrl } from "../../../common/vars";
import type { WeblinkData } from "../../../common/weblinks-store/weblink-store";
import { getInjectable } from "@ogre-tools/injectable";
import { weblinkStoreMigrationInjectionToken } from "../../../common/weblinks-store/migration-token";
import { lensDocumentationWeblinkId, lensForumsWeblinkId } from "../links";
import { applicationInformationToken } from "@k8slens/application";

const currentVersionWeblinkStoreMigrationInjectable = getInjectable({
  id: "current-version-weblink-store-migration",
  instantiate: (di) => {
    const { version } = di.inject(applicationInformationToken);

    return {
      version, // Run always after upgrade
      run(store) {
        const weblinksRaw = store.get("weblinks");
        const weblinks = (Array.isArray(weblinksRaw) ? weblinksRaw : []) as WeblinkData[];
        const forumsWeblink = weblinks.find(weblink => weblink.id === lensForumsWeblinkId);

        if (forumsWeblink) {
          forumsWeblink.url = forumsUrl;
        }

        const docsWeblink = weblinks.find(weblink => weblink.id === lensDocumentationWeblinkId);

        if (docsWeblink) {
          docsWeblink.url = docsUrl;
        }

        const removedSlackLink = weblinks.filter(weblink => weblink.id !== "lens-slack-link");

        store.set("weblinks", removedSlackLink);
      },
    };
  },
  injectionToken: weblinkStoreMigrationInjectionToken,
});

export default currentVersionWeblinkStoreMigrationInjectable;
