type t;

[@bs.val] external getElementById: string => t = "document.getElementById";
[@bs.send] external appendChild: (t, t) => unit = "";
