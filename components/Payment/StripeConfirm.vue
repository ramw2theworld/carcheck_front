<template>
    <div class="modal" v-if="isVisible">
        <div class="modal-content">
            <p>Do you want to proceed with the payment?</p>
            <button @click="confirm">Confirm</button>
            <button @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isVisible: Boolean
});

const emits = defineEmits(['confirm', 'cancel']);

function confirm() {
    emits('confirm');
}

function cancel() {
    emits('cancel');
}
</script>

<style scoped>
.modal {
    /* Modal styling */
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    /* Content styling */
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
