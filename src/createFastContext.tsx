import { ReactNode, createContext, useCallback, useContext, useRef, useSyncExternalStore } from "react";

export default function createFastContext<Store>(initState: Store){

    function useStore(): {
        get: () => Store,
        set: (value: Partial<Store>) => void,
        subscribe: (callback: () => void) => () => void
      } {
        const store = useRef(initState);
      
        const get = useCallback(() => store.current, []);
      
        const subscribers = useRef(new Set<() => void>());
      
        const set = useCallback((value: Partial<Store>) => {
            store.current = { ...store.current, ...value };
            subscribers.current.forEach((callback) => callback());
        }, []);
      
        const subscribe = useCallback((callback: () => void) => {
          subscribers.current.add(callback);
          return () => subscribers.current.delete(callback);
        }, [])
      
        return {
          get,
          set,
          subscribe
        }
    }

    type UseStore = ReturnType<typeof useStore>
    const Context = createContext<UseStore | null>(null)

    function Provider({children}:{children: ReactNode}){
      return (
          <Context.Provider value={useStore()}>
              {children}
          </Context.Provider>
      )
    }

    function useStoreHook<SelectorOutput>(
      selector: (store: Store) => SelectorOutput
    ): [SelectorOutput, (value: Partial<Store>) => void] {
      
      const store = useContext(Context);

      if (!store) throw new Error("Store not found");
      
      const state = useSyncExternalStore(
        store.subscribe,
        () => selector(store.get()),
        () => selector(initState),
      );
  
      return [state, store.set];

    }

    return { useStoreHook, Provider }

}