open Webapi;

module Renderer = PixiRenderer;

let state = ref(State.initial);
let preference = ref("TODO: create a default preference object");
let renderer = Renderer.make(state^, Config.config, preference^);

let rec main = (_) => {
  state := Logic.logic(state^);
  renderer |> Renderer.render;

  requestAnimationFrame(main);
};

requestAnimationFrame(main);
