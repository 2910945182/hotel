<template>
    index
</template>

<script setup>
import { onBeforeMount } from "vue";
import { LoginAuto } from "../api/admin";
import { useRouter } from 'vue-router'

let router = useRouter()

onBeforeMount(async () => {
    if (await LoginAuto()) {
        router.push("/layout");
    } else {
        router.push("/login");
    }
});

</script>
