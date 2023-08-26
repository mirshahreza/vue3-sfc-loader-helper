<template>
    <h1 >Component one : {{ title }}</h1>
</template>

<script>

    export default {
        props: {
            title: {
                type: String,
                required: true,
                default: 'Title One'
            }
        },
        setup(props) {
            //console.log(props.test)
        }
    }

</script>
