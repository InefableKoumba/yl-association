import * as migration_20260420_152627 from './20260420_152627';
import * as migration_20260516_090601 from './20260516_090601';

export const migrations = [
  {
    up: migration_20260420_152627.up,
    down: migration_20260420_152627.down,
    name: '20260420_152627',
  },
  {
    up: migration_20260516_090601.up,
    down: migration_20260516_090601.down,
    name: '20260516_090601'
  },
];
