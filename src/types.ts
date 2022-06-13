export type Item = {
  id: `${number}`;
  title: string;
  status: boolean;
};

export type Items = Item[];

export type State = {
  items: Items;
};

export type Actions =
  | { type: "addItem"; item: Item }
  | { type: "removeItem"; itemId: Item["id"] }
  | { type: "updateItem"; item: Item };

export type ActionHandlers = {
  addItem: (item: Item) => void;
  removeItem: (itemId: Item["id"]) => void;
  updateItem: (item: Item) => void;
};

export type ContextType = [State, ActionHandlers];

export type ProviderType = {
  children: React.ReactNode;
};

export type ItemsProps = {
  items: State["items"];
  removeItem: ActionHandlers["removeItem"];
};

export type ToolbarProps = {
  addItem: ActionHandlers["addItem"];
};
