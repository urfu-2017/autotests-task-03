<template>
    <ul>
        <li :class="`log--${item.level}`" v-for="(item, itemIdx) in log.slice(-3)" :key="itemIdx">
            {{ item.message }}
        </li>
    </ul>
</template>

<script>
export default {
    props: ['log']
}
</script>
