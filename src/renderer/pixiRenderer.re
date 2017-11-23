open Webapi.Dom;

module Ticker {
  type t;

  [@bs.module "pixi.js"] [@bs.scope "ticker"] [@bs.val] external shared : t = "";
  [@bs.set] external setAutoStart: (t, Js.boolean) => unit = "autoStart";
  [@bs.send.pipe: t] external stop: unit = "";
};

module Application {
  type t;

  [@bs.module "pixi.js"] [@bs.new] external make: (int, int, {. "autoStart": Js.boolean, "antialias": Js.boolean }) => t = "Application";
  [@bs.get] external ticker: t => Ticker.t = "";
  [@bs.get] external view: t => Node.t = "";
  [@bs.send.pipe: t] external render: unit = "";
};


let make = (state, config, preference) => {
  Ticker.setAutoStart(Ticker.shared, Js.false_);
  Ticker.shared |> Ticker.stop;

  let application = Application.make(config##screen##width, config##screen##height, { "autoStart": Js.false_, "antialias": Js.true_ });
  application |> Application.ticker |> Ticker.stop;

  { "state": state, "config": config, "preference": preference, "application": application };
};

let addRenderedCanvasToNode = (node, this) => {
  node |> Node.appendChild(this##application |> Application.view);
};

let render = this => {
  this##application |> Application.render;
}
