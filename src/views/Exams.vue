<template>
  <div id="exams">
    <img alt="Vue logo" src="./../assets/logo.png" width="160" height="320">
    <h2>Exams</h2>
    <examtable></examtable>
  </div>
</template>

<script>
import examtable from "./../components/ExamTable";
export default {
  name: 'Exams',
  components: {
    examtable
  }
};
</script>

<style>
#exams {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>