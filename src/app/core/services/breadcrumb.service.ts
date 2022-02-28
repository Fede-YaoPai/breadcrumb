import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { Breadcrumb } from 'src/app/models/breadcrumb.model';


@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  public breadcrumbs: Breadcrumb[] = [];
  private paths: string[] = [];

  constructor(private router: Router) {

    // Mi sottoscrivo agli eventi di routing. Esegue tutto il codice solo all'istanza di ActivationEnd e se trova
    // una ActivatedRouteSnapshot che abbia un componente istanziato
    this.router.events.subscribe((e) => {
      if (e instanceof ActivationEnd && e.snapshot.component) {
        let current: ActivatedRouteSnapshot = e.snapshot;
        this.breadcrumbs = [];
        this.paths = [];

        this.buildBreadCrumb(current, this.breadcrumbs, this.paths, false);
      }
    });
  }

  // Metodo ricorsivo. Grazie al parametro "recursively", aggiunge all'array il breadcrumb relativo al componente corrente se chiamato dall'esterno (quindi
  // nella prima iterazione), mentre aggiunge gli eventuali componenti parent alla lista dei breadcrumbs nelle iterazioni successive.
  private buildBreadCrumb(current: ActivatedRouteSnapshot, targetBreadcrumbs: Breadcrumb[], targetPaths: string[], recursively: boolean): void {
    if (!recursively) {
      targetBreadcrumbs.unshift({ label: current.data.crumb, url: this.getUrl(current) });
      targetPaths.unshift(this.getUrl(current));
    }

    let parent: ActivatedRouteSnapshot | null = current.parent;

    if (parent) {
      let newBreadcrumb: Breadcrumb = { label: parent.data.crumb, url: this.getUrl(parent) };
      let alreadyExists: boolean = targetBreadcrumbs.findIndex(b => b.label == newBreadcrumb.label) != -1;

      if (!alreadyExists && newBreadcrumb.label) {
        targetBreadcrumbs.unshift(newBreadcrumb);
        targetPaths.unshift(this.getUrl(parent));
      }

      this.buildBreadCrumb(parent, targetBreadcrumbs, targetPaths, true);
    }
  }

  // Se lo snapshot attuale ha una stringa vuota come path, significa che deve prenderla dal parent (vedi impostazione del routing),
  // altrimenti prendi quella dell'attuale
  private getUrl(current: ActivatedRouteSnapshot): string {
    let result = '';

    if (current.routeConfig?.path?.length === 0) {
      if (current.parent?.routeConfig?.path) {
        result = current.parent?.routeConfig?.path;
      }
    }
    else if (current.routeConfig?.path) {
      result = current.routeConfig?.path
    }

    return result;
  }

  // Prendi dall'array di path relative ai breadcrumbs solo quelle fino al breadcrumb cliccato, e uniscile aggiungendo uno /
  // tra l'una e l'altra per formare la path a cui navigare
  public navigateBreadCrumb(crumb: Breadcrumb): void {
    let crumbPath: string = crumb.url;
    let paths = this.paths;
    let index = paths.indexOf(crumbPath);
    let destinationPath: string = paths.slice(0, (index + 1)).join('/');

    this.router.navigate([destinationPath]);
  }

}
