import "react";

declare module "react" {
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    command?:
    | ""
    | "show-modal"
    | "close"
    | "hide-popover"
    | "toggle-popover"
    | "show-popover"
    | `--${string}`;
    // camel case makes react to show warning
    commandfor?: string;
  }
}

declare global {
  interface CommandEvent extends Event {
    source: Element;
    command: string;
  }

  interface Window {
    CommandEvent: CommandEvent;
  }
}

export { };
