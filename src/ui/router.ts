import { RouteOption } from './route-option';

export enum Routes {
  Menu = '#menu',
  Game = '#game',
  GameOver = '#game-over',
  Default = 'default'
}

export class Router {
  private lastScreen: string = Routes.Menu;

  constructor(private readonly screenRouteConfig: {[key: string]: RouteOption}) {}

  public init(): void {
    window.addEventListener('hashchange', this.changeRoute.bind(this));

    requestAnimationFrame(this.changeRoute.bind(this));
  }

  private changeRoute(): void {
    let target = location.hash;

    if (Object.keys(this.screenRouteConfig).indexOf(target) === -1) {
      target = Routes.Default;
    }

    if (this.lastScreen !== target) {
      this.screenRouteConfig[this.lastScreen].deactivation();
      this.screenRouteConfig[target].activation();
      this.lastScreen = target;
    }
  }
}
