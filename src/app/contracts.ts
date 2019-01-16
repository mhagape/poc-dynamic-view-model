type LocalViewModelSource<T> = {
  viewModel: T;
  type: "local";
};

type RemoteViewModelSource<T> = {
  url: string;
  type: "remote";
};

export type ViewModelSource<T> =
  | LocalViewModelSource<T>
  | RemoteViewModelSource<T>;
