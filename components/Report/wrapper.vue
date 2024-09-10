<script lang="ts" setup>
const props = defineProps<{
  class?: string
}>()
</script><template>
  <section class="px-[8.25rem]" :class="props.class">
    <slot />
  </section>
</template>