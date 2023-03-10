/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";
import { KubeApi } from "../kube-api";
import type { KubeJsonApiData } from "../kube-json-api";
import type { ClusterScopedMetadata, KubeObjectMetadata, KubeObjectScope, Toleration } from "../kube-object";
import { KubeObject } from "../kube-object";

export interface RuntimeClassData extends KubeJsonApiData<KubeObjectMetadata<KubeObjectScope.Cluster>, void, void> {
  handler: string;
  overhead?: RuntimeClassOverhead;
  scheduling?: RuntimeClassScheduling;
}

export interface RuntimeClassOverhead {
  podFixed?: string;
}

export interface RuntimeClassScheduling {
  nodeSelector?: Partial<Record<string, string>>;
  tolerations?: Toleration[];
}

export class RuntimeClass extends KubeObject<
  ClusterScopedMetadata,
  void,
  void
> {
  static readonly kind = "RuntimeClass";
  static readonly namespaced = false;
  static readonly apiBase = "/apis/node.k8s.io/v1/runtimeclasses";

  handler: string;
  overhead?: RuntimeClassOverhead;
  scheduling?: RuntimeClassScheduling;

  constructor({ handler, overhead, scheduling, ...rest }: RuntimeClassData) {
    super(rest);
    this.handler = handler;
    this.overhead = overhead;
    this.scheduling = scheduling;
  }

  getHandler() {
    return this.handler;
  }

  getPodFixed() {
    return this.overhead?.podFixed ?? "";
  }

  getNodeSelectors(): string[] {
    return Object.entries(this.scheduling?.nodeSelector ?? {})
      .map(values => values.join(": "));
  }

  getTolerations() {
    return this.scheduling?.tolerations ?? [];
  }
}

export class RuntimeClassApi extends KubeApi<RuntimeClass, RuntimeClassData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      objectConstructor: RuntimeClass,
      ...opts,
    });
  }
}
