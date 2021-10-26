---
title: 'Converting a Function into a Hook'
description: 'Taking a function that utilizes useRef and converting it into a reusable hook in TypeScript'
---
## The Idea

I had a function that finds an elements center y and center x coordinates. It seemed like something that could be useful in many places, so I converted it into a hook.

### The Process

The easy first step was to cut the function itself and paste it into a new file.

Type issues. The return value and ref argument would require a div element. What if I want to use something else?

One challenge with that was getting the proper type for the ref element. I could require divs, but what if I want to use another element?
I'm still pretty new to TypeScript, and haven't quite wrapped my head around things like utilizing generics.

Took a bit of searching but finally found this on [Stack Overflow](https://stackoverflow.com/questions/57201223/typescript-how-to-declare-a-type-that-includes-all-types-extending-a-common-typ/57201395)
Something like this does the trick!

```ts
// The original function from my component.
function getElementCenter({ offsetTop, offsetLeft, clientWidth, clientHeight }: CenterArgs) {
  const centerX = offsetLeft + clientWidth / 2;
  const centerY = offsetTop + clientHeight / 2;
  return {
    centerX,
    centerY
  };
}

type UseElementCenterType<T extends HTMLElement> = [number, number, RefObject<T>]

export function useElementCenter<T extends HTMLElement>(): UseElementCenterType<T> {
  const centerRef = useRef<T>(null);
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);

  return [ centerX, centerY, centerRef ]
  }
```

Then whenever you use the hook, you explicitly declare what sort of element you're passing through the ref.

```ts
  const [centerX, centerY, centerRef] = useElementCenter<HTMLDivElement>();
```

Well, that works... almost. Turns out that using this as a hook causes a render error due to the ref initializing as null. If there's no element, there are no dimensions to pass to the `getElementCenter` function. I solved that using a `useEffect()` hook to only call the function if there's an element being ref'd.

```ts
  // Need useEffect here to account for initiating the ref as null.
  useEffect(() => {
    if(centerRef.current) {
      const {
        offsetTop,
        offsetLeft,
        clientWidth,
        clientHeight, 
      } = centerRef.current;
      const { centerX, centerY } = getElementCenter({ offsetTop, offsetLeft, clientWidth, clientHeight });
      setCenterX(centerX);
      setCenterY(centerY);
    }
  });
```

useRef(null) issue solved by useEffect
