<template>
    <h1 >Component four : {{ title }}</h1>
</template>

<script>

    export default {
        props: {
            title: {
                type: String,
                required: true,
                default: 'Title Tow'
            }
        },
        setup(props) {
            console.log(props.test)
        }
    }

</script>
