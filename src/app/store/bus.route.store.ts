import { inject, InjectionToken } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { BusRoute } from '../models/bus.route.model';

type BusRouteState = {
  busRoutes: BusRoute[] | null;
  busRoute: BusRoute | null;
};
const initialState: BusRouteState = {
  busRoutes: null,
  busRoute: null,
};

const BUS_ROUTE_STATE = new InjectionToken<BusRouteState>('BusRouteStore', {
  factory: () => initialState,
});

export const BusRouteStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(BUS_ROUTE_STATE)),
  withMethods((store) => ({
    updateRoutes: (routes: BusRoute[]) => {
      patchState(store, ({ busRoutes }) => ({
        busRoutes: routes,
      }));
    },
    removeRoutes: () => {
      patchState(store, ({ busRoutes }) => ({
        busRoutes: null,
      }));
    },
    updateRoute: (route: BusRoute) => {
      patchState(store, ({ busRoute }) => ({
        busRoute: route,
      }));
    },
    removeRoute: () => {
      patchState(store, ({ busRoute }) => ({
        busRoute: null,
      }));
    },
  }))
);
