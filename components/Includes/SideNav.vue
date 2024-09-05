<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTachometerAlt  } from '@fortawesome/free-solid-svg-icons';

library.add(faTachometerAlt);

export default {
  components: {
    FontAwesomeIcon
  }
};
</script>


<template>
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
            <div class="nav">
                <div class="sb-sidenav-menu-heading">Core</div>
                <NuxtLink class="nav-link" to="/dashboard">
                    <div class="sb-nav-link-icon">
                        <FontAwesomeIcon :icon="['fas', 'tachometer-alt']" />
                    </div>
                    Dashboard
                </NuxtLink>
                <NuxtLink class="nav-link" to="/user">
                    <div class="sb-nav-link-icon">
                        <!-- <FontAwesomeIcon :icon="['fas', 'user']" /> -->
                    </div>
                    User
                </NuxtLink>

                <NuxtLink class="nav-link" to="/settings">
                    <div class="sb-nav-link-icon">
                        <!-- <FontAwesomeIcon :icon="['fas', 'settings']" /> -->
                    </div>
                    Settings
                </NuxtLink>

                <NuxtLink class="nav-link" to="/my-plans">
                    <div class="sb-nav-link-icon">
                        <!-- <FontAwesomeIcon :icon="['fas', 'plans']" /> -->
                    </div>
                    My Plans
                </NuxtLink>
            </div>
        </div>
        <div class="sb-sidenav-footer">
            <div class="small">Logged in as: RamW2W</div>
            Start Bootstrap
        </div>
    </nav>
</template>