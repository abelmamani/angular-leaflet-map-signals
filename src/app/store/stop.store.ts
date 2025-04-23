import { inject, InjectionToken } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Stop } from '../models/stop.model';

type StopState = {
  stops: Stop[] | null;
  stop: Stop | null;
};
const initialState: StopState = {
  stops: null,
  stop: null,
};

const STOP_STATE = new InjectionToken<StopState>('StopStore', {
  factory: () => initialState,
});

export const StopStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(STOP_STATE)),
  withMethods((store) => ({
    updateStops: (newStops: Stop[]) => {
      patchState(store, ({ stops }) => ({
        stops: newStops,
      }));
    },
    updateStop: (newStop: Stop) => {
      patchState(store, ({ stop }) => ({
        stop: newStop,
      }));
    },
    removeStop: () => {
      patchState(store, () => ({
        stop: null,
      }));
    }
  }))
);
