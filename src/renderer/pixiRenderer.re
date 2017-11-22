module Ticker {
  type t;

  [@bs.module "pixi.js"] [@bs.scope "ticker"] [@bs.val] external shared : t = "";
  [@bs.set] external setAutoStart: (t, Js.boolean) => unit = "autoStart";
  [@bs.send] external stop: t => unit = "stop";
};

module Application {
  type t;

  [@bs.module "pixi.js"] [@bs.new] external make: (int, int, {. "autoStart": Js.boolean, "antialias": Js.boolean }) => t = "Application";
  [@bs.get] external getTicker: t => Ticker.t = "ticker";
  [@bs.get] external getView: t => Node.t = "view";
  [@bs.send] external render: t => unit => unit = "";
};


let make = (state, config, preference) => {
  Ticker.setAutoStart(Ticker.shared, Js.false_);
  Ticker.stop(Ticker.shared);

  let application = Application.make(config##screen##width, config##screen##height, { "autoStart": Js.false_, "antialias": Js.true_ });
  Ticker.stop(Application.getTicker(application));

  { "state": state, "config": config, "preference": preference, "application": application };
};

let addRenderedCanvasToNode = (this, node) => {
  Node.appendChild(node, Application.getView(this##application));
};
