---
layout: post
title: How useReducer can make complex form logic easier
description: Don't get caught in prop hell
date: 2025-05-02
keywords: frontend, tutorial, react
image: shopping-list-1.webp
---

I recently had the chance to work on a moderately complex React form. Instead of spreading the form logic across multiple components, I decided to keep the form in a single shared store created with [`useReducer`](https://react.dev/reference/react/useReducer).

It ended up being fairly helpful for this specific use case. A reducer can easily encapsulate lots of form logic without requiring the rest of the app to adopt a global state manager like Redux.

Here's how it worked.

### Background

I've created a small app ([source](https://github.com/kyle-n/ShoppingList), [live demo](https://stackblitz.com/github/kyle-n/ShoppingList)) to demonstrate the problem. Imagine you're making a web app to help users track their shopping list.

![A screenshot of a shopping list web app](shopping-list-1.webp)

The app includes five features:

1. A single text field, where users enter an item name.
2. When they hit enter or tap "Add," it adds an item with that name to their shopping list.
3. When they've picked up that item in the store, they can tap the "Delete" button next to each list item.
4. Each item displays in a text field, so the user can change its name.
5. The user can tap "Undo" to undo any change they've just made.

`<App />` keeps the store and passes callbacks down to low-logic display components.

```tsx
// App.tsx

function App() {
  const [state, dispatch] = useReducer(globalStateReducer, initialGlobalState);
  const addItem = useCallback(
    (newItem: Item) => dispatch({ type: 'addItem', newItem }),
    [dispatch]
  );
  const deleteItem = useCallback(
    (id: string) => dispatch({ type: 'deleteItem', id }),
    [dispatch]
  );
  const updateName = useCallback(
    (id: string, newName: string) =>
      dispatch({ type: 'updateName', id, newName }),
    [dispatch]
  );
  const undo = useCallback(() => {
    dispatch({ type: 'undo' });
  }, []);

  return (
    <>
      <header>
        <h1>Shopping List</h1>
      </header>
      <main>
        <ItemInput onSubmit={addItem} />
        <UndoButton onClick={undo} />
        <hr style={{ margin: '2rem 0' }} />
        <ItemList
          items={state.items}
          onDelete={deleteItem}
          onChangeName={updateName}
        />
      </main>
    </>
  );
}
```

`<ItemList />` maps items into `<ItemListEntry />` components...

```tsx
// ItemList.tsx

type Props = {
  items: Item[];
  onDelete: (id: string) => void;
  onChangeName: (id: string, newName: string) => void;
};

function ItemList({ items, onDelete, onChangeName }: Props) {
  const getIfDuplicated = useCallback((item: Item, items: Item[]) => {
    return items.filter(i => i.name === item.name).length > 1;
  }, []);

  return (
    <div>
      {items.map(item => (
        <ItemListEntry
          key={item.id}
          item={item}
          isDuplicated={getIfDuplicated(item, items)}
          onDelete={onDelete}
          onChangeName={onChangeName}
        />
      ))}
    </div>
  );
}
```

...and `<ItemListEntry />` renders an input field with the item name and a delete button.

```tsx
type Props = {
  item: Item;
  isDuplicated: boolean;
  onDelete: (id: string) => void;
  onChangeName: (id: string, newName: string) => void;
};

function ItemListEntry({ item, isDuplicated, onDelete, onChangeName }: Props) {
  const deleteSelf = useCallback(() => onDelete(item.id), [item.id, onDelete]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={item.name}
        style={{ border: isDuplicated ? '1px solid red' : undefined }}
        onChange={event => {
          const newName = event.target.value;
          onChangeName(item.id, newName);
        }}
      />
      <button onClick={deleteSelf} style={{ marginLeft: '1rem' }}>
        Delete
      </button>
    </div>
  );
}
```

At first glance, the shopping list app seems simple. We wouldn't bother with `useReducer` over `useState` with a simple array, except for one thing: the undo button.

The undo button is, in a way, a complex bit of form logic. It requires we track each action the user takes and give them a way to undo it. It requires we manage not just one piece of state (the user's shopping list), but two - the list and the actions they took creating it.

We can certainly try to keep these states in sync - maybe the `addItem()` callback in `<App />` could set the `items` and `events` state. But frankly, this kind of higher-level state management is what Redux-like state managers are designed for.

```ts
// store.tsx

import { Item } from './types';

type GlobalState = {
  items: Item[];
};

export const initialGlobalState: GlobalState = {
  items: []
};

export type Action =
  | { type: 'addItem'; newItem: Item }
  | { type: 'deleteItem'; id: string }
  | { type: 'updateName'; id: string; newName: string };

export function globalStateReducer(
  state: GlobalState,
  action: Action
): GlobalState {
  switch (action.type) {
    case 'addItem':
      return {
        ...state,
        items: [...state.items, action.newItem]
      };
    case 'deleteItem':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    case 'updateName':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id ? { ...item, name: action.newName } : item
        )
      };
    default:
      return state;
  }
}
```

Here's a simple reducer for managing our shopping list. The user can add, delete or update items.

The reducer provides us a single point of logic where we can track all user actions for easy undoing later. Each action dispatched to the store will create an event. So let's track events in state...

```ts
// store.tsx

type GlobalState = {
  items: Item[];
  events: Array<{
    action: Action;
    previousValue?: unknown;
  }>;
};

export const initialGlobalState: GlobalState = {
  items: [],
  events: []
};

export type Action =
  | { type: 'addItem'; newItem: Item }
  | { type: 'deleteItem'; id: string }
  | { type: 'updateName'; id: string; newName: string }
  | { type: 'undo' };

// ...

    case 'addItem':
      return {
        ...state,
        items: [...state.items, action.newItem],
        events: [...state.events, { action }]
      };

// ...
```

...and handle `'undo'` events in the reducer...

```ts
// store.ts
// ...

    case 'undo': {
      if (state.events.length === 0) {
        return state;
      }
      return undoActionReducer(state);
    }

// ...

function undoActionReducer(state: GlobalState): GlobalState {
  const newState = structuredClone(state);
  const lastEvent = newState.events.pop()!;
  const { action } = lastEvent;
  switch (action.type) {
    case 'addItem':
      return {
        ...newState,
        items: newState.items.filter(item => item.id !== action.newItem.id)
      };
    default:
      return newState;
  }
}
```

`undoActionReducer` processes the last event in the stack, checks its type and undoes it. If it was an `'addItem'` action, we remove that action from state. We can repeat this process for the other two action types.

```ts
// store.ts
// ...

export function globalStateReducer(
  state: GlobalState,
  action: Action
): GlobalState {
  switch (action.type) {
    case 'addItem':
      return {
        ...state,
        items: [...state.items, action.newItem],
        events: [...state.events, { action }]
      };
    case 'deleteItem':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
        events: [
          ...state.events,
          {
            action,
            previousValue: state.items.find(item => item.id === action.id)
          }
        ]
      };
    case 'updateName':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id ? { ...item, name: action.newName } : item
        ),
        events: [
          ...state.events,
          {
            action,
            previousValue:
              state.items.find(item => item.id === action.id)?.name ?? ''
          }
        ]
      };
    case 'undo': {
      if (state.events.length === 0) {
        return state;
      }
      return undoActionReducer(state);
    }
    default:
      return state;
  }
}

function undoActionReducer(state: GlobalState): GlobalState {
  const newState = structuredClone(state);
  const lastEvent = newState.events.pop()!;
  const { action } = lastEvent;
  switch (action.type) {
    case 'addItem':
      return {
        ...newState,
        items: newState.items.filter(item => item.id !== action.newItem.id)
      };
    case 'deleteItem': {
      const deletedItem = lastEvent.previousValue as Item;
      return {
        ...newState,
        items: [...newState.items, deletedItem]
      };
    }
    case 'updateName': {
      const previousName = lastEvent.previousValue as string;
      return {
        ...newState,
        items: newState.items.map(item =>
          item.id === action.id ? { ...item, name: previousName } : item
        )
      };
    }
    default:
      return newState;
  }
}
```

A `useReducer` form can incorporate this and any number of complex business rules easily, without muddying the rest of the UI code. If we were to extend this form to check for duplicates or filter forbidden product names, we have one easy central place to do it.
