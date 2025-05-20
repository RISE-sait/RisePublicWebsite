export interface Practice {
  id: string;
  program: {
    id: string;
    name: string;
    type: string;
  };
  location: {
    id: string;
    name: string;
    address: string;
  };
  start_at: string;
  end_at: string;
}
