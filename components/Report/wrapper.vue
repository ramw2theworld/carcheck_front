<script lang="ts" setup>
const props = defineProps<{
  class?: string
}>()
</script><template>
  <section class="xl:px-[8.25rem] px-5" :class="props.class">
    <slot />
  </section>
</template>