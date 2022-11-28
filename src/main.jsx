import { For, createSignal, Show, createEffect, Switch, Match } from "solid-js";
import { createStore, produce } from "solid-js/store";

export default function Main() {

  let button, input, prevItems;

  const [items, setItems] = createStore([]);
  const [show, setShow] = createSignal(false);

  function handleClick(event) {
    event.preventDefault();
    console.log(items.length);
    setItems([...items, 
      {
        text: input.value, 
        done: false
      }
    ]);
  }

  function handleDone(value) {
    setItems(
      item => item.text === value,
      produce((item) => (item.done = !item.done)),
    );
    console.log(items);
  }

  return (
    <div class="container">
      <form onSubmit={handleClick}> 
        <div class="field is-grouped my-3">
          <p class="control is-expanded">
            <input ref={input} type="text" placeholder="todo item" 
            class="input"/>
            </p>
            <p class="control">
              <button type="button" class="button is-primary is-outlined"
              onClick={handleClick} ref={button}> Add todo items </button>
            </p>
        </div>
      </form>

      <Show when={show} fallback={<div> not showing</div>} >
        <div class="mx-4 px-2">
          <ul>
            <For each={items} >
              {(item) => (
              <li> 
                <Switch fallback={<div/>}>
                  <Match when={item.done}>
                    <label class="checkbox checked">
                      <input type="checkbox" checked="true" onchange={[handleDone, item.text]}/>
                        {item.text}
                    </label>
                  </Match>
                  <Match when={!item.done}>
                    <label class="checkbox">
                      <input type="checkbox" onchange={[handleDone, item.text]}/>
                        {item.text}
                    </label>
                    </Match>
                </Switch>
              </li>
              )}
            </For>
          </ul>
        </div>
      </Show >
    </div>
    );
}

