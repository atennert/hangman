'use strict';

export enum Routes {
  Menu = '#menu',
  Game = '#game',
  Default = 'default'
}

export class Router {
  constructor(private readonly routeConfig: any) {}

  public init() {
    window.addEventListener('hashchange', this.changeRoute.bind(this));

    this.changeRoute();
  }

  private changeRoute() {
    const target = location.hash,
      action = this.routeConfig[target];
    if (action) {
      action();
    } else {
      this.routeConfig[Routes.Default]();
    }
    return 0;
  }
}
