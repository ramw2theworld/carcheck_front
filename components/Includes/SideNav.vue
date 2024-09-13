<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTachometerAlt, faSignOutAlt, faUserAlt,faListCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faTachometerAlt, faSignOutAlt, faUserAlt, faListCheck);

const auth = useAuthStore();

const logout = async () => {
    await auth.logout();
};

defineExpose({ logout });
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
                        <FontAwesomeIcon :icon="['fas', 'user-alt']" />

                    </div>
                    User
                </NuxtLink>

                <NuxtLink class="nav-link" to="/my-plan">
                    <div class="sb-nav-link-icon">
                        <FontAwesomeIcon :icon="['fas', 'list-check']" />
                    </div>
                    My Plans
                </NuxtLink>

                <button class="nav-link" @click="logout">
                    <div class="sb-nav-link-icon">
                        <FontAwesomeIcon :icon="['fas', 'sign-out-alt']" />
                    </div>
                    Logout
                </button>
            </div>
        </div>
        <div class="sb-sidenav-footer">
            <div class="small">Logged in as: RamW2W</div>
            Start Bootstrap
        </div>
    </nav>
</template>