export default class LoadingOverlay {
  private readonly loadingClass = 'loading--overlay';

  constructor(gameRoot: HTMLDivElement) {
    const loadingOverlay = document.createElement('div') as HTMLDivElement;
    loadingOverlay.className = this.loadingClass;

    gameRoot.appendChild(loadingOverlay);
  }

  public removeOverlay(gameRoot: HTMLDivElement) {
    const loadingOverlay = gameRoot.querySelector(`.${this.loadingClass}`) as HTMLDivElement;
    loadingOverlay.remove();
  }
}
