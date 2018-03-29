<template>
  <div class="hello">
          <h1>I Am Ronok</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
       axiosurl:''

    }
  },
    beforecreate:function () {

    },
    created(){
        this.axiosurl = 'http://'+this.$_serverName+':8855/api/test';
    },
    beforeCreate: function() {
        console.log(this.$_serverName)
    },
    methods : {
                axiosfetch : function () {
                   axios({
                       method: 'get',
                       url: this.axiosurl,
                   })
                       .then(function (response) {
                           console.log(response);
                       })
                       .catch(function (error) {
                           console.log(error);
                       });
               }
    },
    mounted:function () {
        this.axiosfetch();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
