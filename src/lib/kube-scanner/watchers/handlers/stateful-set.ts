import { V1StatefulSet } from '@kubernetes/client-node';
import * as uuidv4 from 'uuid/v4';
import { WatchEventType } from '../types';
import { deleteWorkload } from './index';

export async function statefulSetWatchHandler(eventType: string, statefulSet: V1StatefulSet) {
  if (eventType !== WatchEventType.Deleted) {
    return;
  }

  const logId = uuidv4().substring(0, 8);

  await deleteWorkload({
    kind: 'StatefulSet',
    objectMeta: statefulSet.metadata,
    specMeta: statefulSet.spec.template.metadata,
    containers: statefulSet.spec.template.spec.containers,
    ownerRefs: statefulSet.metadata.ownerReferences,
  }, logId);
}