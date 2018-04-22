<template>
    <span>{{ value }}</span>
</template>

<script>
    export default {
        props: ['value']
    }
</script>

<style lang="stylus" scoped>
    span {
        display block
        width 100%
        height 100%
    }
</style>
