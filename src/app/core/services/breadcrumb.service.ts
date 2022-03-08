import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Breadcrumb } from 'src/app/models/breadcrumb.model';


@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  public crumbs$: Subject<Breadcrumb[]> = new Subject<Breadcrumb[]>();
  private breadcrumbs: Breadcrumb[] = [];
  private paths: string[] = [];

  constructor(private router: Router) {
    this.listenToRoutingEvents();
  }

  // This method subscribes to routing events and calls the buildBreadCrumb() method @ route ActivationEnd
  private listenToRoutingEvents(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof ActivationEnd && e.snapshot.component) {
        let current: ActivatedRouteSnapshot = e.snapshot;
        this.breadcrumbs = [];
        this.paths = [];

        this.buildBreadCrumb(current, this.breadcrumbs, this.paths, false);
      }
    });
  }

  // Recursive method. It is dynamic thanks to the 'recursively' boolean argument, which makes it either add the current routed component's breadcrumb
  // (when invoked from outside, so the first time), or its parents' (in subsequent iterations) to the breadcrumbs array
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

    this.crumbs$.next(this.breadcrumbs);
  }

  // If current snapshot has an empty string as a path, the method is going to fetch it from its parent (see instructions on how to set routing with this breadcrumb component)
  // otherwise it just fecthes the former
  private getUrl(current: ActivatedRouteSnapshot): string {
    let result: string = '';

    if (current.routeConfig?.path?.length === 0 && current.parent?.routeConfig?.path) {
      result = current.parent.routeConfig.path;
    }
    else if (current.routeConfig?.path) {
      result = current.routeConfig.path
    }

    return result;
  }

  // This method simply takes the path segments it needs to compose the full path of the single breadcrumb that has been clicked by the user, and joins them
  // into a proper path it can navigate to
  public navigateBreadCrumb(crumb: Breadcrumb): void {
    let crumbPath: string = crumb.url;
    let paths: string[] = this.paths;
    let index: number = paths.indexOf(crumbPath);
    let destinationPath: string = paths.slice(0, (index + 1)).join('/');

    this.router.navigate([destinationPath]);
  }

}
