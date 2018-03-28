<template>
    <div>
          <h1>
                This is a TEST COMPONENT.VUE file
          </h1>
    </div>

</template>


<script>
        axios.defaults.baseURL = 'https://localhost:8000';

        axios.get('/user?ID=12345')
                .then(function (response) {
                console.log(response);
                    })
        .catch(function (error) {
                    console.log(error);
        });

        export default {
            beforeCreate: function() {
                console.log(this.$_serverName)
            }

        }


</script>