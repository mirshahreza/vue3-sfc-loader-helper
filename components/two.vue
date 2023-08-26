<template>
    <h1 >Component two : {{ title }}</h1>
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
