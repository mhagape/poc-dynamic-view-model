import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";

@Directive({
  selector: "[resolve]"
})
export class ViewModelResolver<T> {
  @Input() resolve: ViewModelSource<T>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    // this is just a PoC and thus doesn't account for issues that we're
    // likely to run into when implementing this for real e.g. the view
    // model source can change, the resolvers should be easy to register
    // dynamically etc.
    this.getViewModel(this.resolve).then(vm => {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: vm
      });
    });
  }

  private getViewModel<T>(source: ViewModelSource<T>): Promise<T> {
    switch (source.type) {
      case "local":
        return Promise.resolve(source.viewModel);
      case "remote":
        return this.mockFetch(source.url);
    }
  }

  private mockFetch<T>(url: string): Promise<T> {
    const body = url
      .match(/\?(.*)/)[1]
      .split("&")
      .map(p => p.split("="))
      .reduce(
        (body, [key, value]) => ({
          ...body,
          [key]: value
        }),
        {}
      );

    return new Promise(resolve => {
      setTimeout(() => resolve(<T>body), 1500);
    });
  }
}
