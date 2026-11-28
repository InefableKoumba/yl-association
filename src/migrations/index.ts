import * as migration_20260420_152627 from './20260420_152627';
import * as migration_20260516_090601 from './20260516_090601';
import * as migration_20261121_130733_redesign from './20261121_130733_redesign';
import * as migration_20261121_181033 from './20261121_181033';
import * as migration_20261128_092636 from './20261128_092636';

export const migrations = [
  {
    up: migration_20260420_152627.up,
    down: migration_20260420_152627.down,
    name: '20260420_152627',
  },
  {
    up: migration_20260516_090601.up,
    down: migration_20260516_090601.down,
    name: '20260516_090601',
  },
  {
    up: migration_20261121_130733_redesign.up,
    down: migration_20261121_130733_redesign.down,
    name: '20261121_130733_redesign',
  },
  {
    up: migration_20261121_181033.up,
    down: migration_20261121_181033.down,
    name: '20261121_181033',
  },
  {
    up: migration_20261128_092636.up,
    down: migration_20261128_092636.down,
    name: '20261128_092636'
  },
];
