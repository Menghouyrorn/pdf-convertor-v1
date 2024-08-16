import kh from "./messages/kh.json";

type Message = typeof kh;

declare global {
  interface IntlMessages extends Messages {}
}
