<template>
    <div id="app">
        <router-view class="header" name="header"></router-view>
        <transition name="fade" mode="out-in" appear>
          <router-view class="main" name="main"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style scoped>
    html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .header {
        margin-bottom: 50px;
    }

    .main {
        width: 100%;
        height: 1000px;
    }
</style>
