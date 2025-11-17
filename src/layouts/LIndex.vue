<script lang="ts" setup>

</script>

<template>
  <section>
    <div class="header">
      <nav>导航栏</nav>
    </div>

    <div class="body">
      主体

    </div>
    <div class="footer">
      <p>© 2018 Gandalf</p>
    </div>
  </section>



</template>


<style scoped lang="less">
/* 确保html和body有100%高度 */


/* 布局容器 */
#app {
  height: 100vh;
}

section {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .header {
    min-height: 3rem;
    background-color: #f0f0f0;
  }

  .body {
    flex: 1;
    background-color: #7b9e37;
  }

  .footer {
    min-height: 3rem;
    background-color: #ff6464;
  }

}
</style>
