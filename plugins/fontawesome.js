import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

// This is important to avoid adding extra weight to your project with unused styles
config.autoAddCss = false;

// Add the specific icons you need
library.add(fas);

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
