## React Context

<img src="https://images.unsplash.com/photo-1527409335569-f0e5c91fa707?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="React" width="350" />

***

_useRef_

Avoid re-renders when context holds the state of the app

```JavaScript
    const store = useRef(initState);
```

_React-Dev-Tools_

Go to Components, turn on 'highlight updates when components render' to see which components render

_useSyncExternalStore_ 

subscirbes to some data source, when it changes, it will get a snapshot from that data source and save it locally

```JavaScript
    const state = useSyncExternalStore(
        store.subscribe,
        () => selector(store.get()),
        () => selector(initState),
    );
```