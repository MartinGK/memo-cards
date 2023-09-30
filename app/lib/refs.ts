'use client'
import { ForwardedRef,  MutableRefObject  } from "react";

export const reassignRef = <T>(
  ref: ForwardedRef<unknown> | MutableRefObject<T | null>,
  newRef: MutableRefObject<T | null>
) => {
  if (ref) {
    if (typeof ref === "function") {
      ref(newRef!.current);
    } else {
      (ref as MutableRefObject<T | null>).current =
      newRef!.current;
    }
  }
};
