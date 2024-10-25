"use client";
import { useRef, useState } from "react";

interface LocalStateProps<T> {
  children(
    state: T,
    setState: React.Dispatch<React.SetStateAction<T>>
  ): React.JSX.Element;
  initialState: T;
}

export function LocalState<T>({ children, initialState }: LocalStateProps<T>) {
  let result = useState(initialState);
  return children(...result);
}

interface LocalRefProps<T> {
  children(ref: React.RefObject<T>): React.JSX.Element;
}

export function LocalRef<T>({ children }: LocalRefProps<T>) {
  let ref = useRef<T>(null);
  return children(ref);
}

interface LocalHookProps<T extends (...args: any) => any> {
  children(args: ReturnType<T>): React.JSX.Element;
  params: Parameters<T>;
  func: T;
}

export function LocalHook<T extends (...args: any) => any>({
  children,
  params,
  func,
}: LocalHookProps<T>) {
  let res = func(params);
  return children(res);
}
