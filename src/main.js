import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

function update(data) {
  console.log("ignoring update");
}

export default app
