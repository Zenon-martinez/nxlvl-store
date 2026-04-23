import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Data,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Subject, filter, takeUntil } from 'rxjs';

type BreadcrumbLabelResolver = (data: Data, route: ActivatedRouteSnapshot) => string;

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-product-breadcrumbs',
  imports: [CommonModule, RouterLink, MatIcon],
  templateUrl: './product-breadcrumbs.component.html',
  styleUrl: './product-breadcrumbs.component.scss',
})
export class ProductBreadcrumbsComponent implements OnInit, OnDestroy {
  @Input() items: BreadcrumbItem[] | null = null;

  breadcrumbs: BreadcrumbItem[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.refreshBreadcrumbs();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.refreshBreadcrumbs());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isLast(index: number): boolean {
    return index === this.breadcrumbs.length - 1;
  }

  private refreshBreadcrumbs(): void {
    if (this.items?.length) {
      this.breadcrumbs = [...this.items];
      return;
    }

    this.breadcrumbs = this.buildFromRoute(this.activatedRoute.root.snapshot);
  }

  private buildFromRoute(route: ActivatedRouteSnapshot): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [];

    let current: ActivatedRouteSnapshot | null = route;
    let url = '';

    while (current) {
      const segment = current.url.map((part) => part.path).join('/');
      if (segment) {
        url += `/${segment}`;
      }

      const raw = current.data?.['breadcrumb'] as
        | string
        | BreadcrumbLabelResolver
        | undefined;
      if (raw) {
        const label = typeof raw === 'function' ? raw(current.data, current) : raw;
        breadcrumbs.push({
          label,
          url: url || '/',
        });
      }

      current = current.firstChild;
    }

    return breadcrumbs;
  }
}
