<script lang="ts" setup>

</script>

<template>
  <section>
    <header class="header">
      <nav>导航栏
        <ul>
          <li>Home</li>
          <li>Notes</li>
          <li>Statistic</li>
        </ul>
        <input type="text" id="Search">
      </nav>
    </header>

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
    background-color: #242424;
    display: flex;

    nav {
      display: flex;
      list-style: none;

      ul {
        display: flex;
        list-style: none;

        li {
          margin-right: 1rem;
        }
      }
    }


  }

  .body {
    flex: 1;
    background-color: #6d6d6d;
  }

  .footer {
    min-height: 3rem;
    background-color: #373737;
  }

}
</style>
