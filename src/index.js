import { createApp } from "vue";
import "@/styles/index.scss";
import App from "@/components/App.vue";

/*
    Entry point
*/

const app = createApp(App);

app.mount("#root");
