<template>
  <div id="login-column" class="col-md-4">
    <div id="login-box" class="col-md-12">
      <form id="login-form" class="form" v-on:submit="login" method="post">
        <h3 class="text-center fw-bold">LOG IN</h3>

        <ul v-if="errors.length > 0">
          <li class="text-danger" v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label for="email" class="">Email</label><br />
          <input type="email" name="email" id="email" class="form-control" v-model="email" v-on:keyup="validate" />
        </div>
        <div class="form-group mt-2">
          <label for="password" class="">Password</label><br />
          <input type="password" name="password" class="form-control" v-model="password" v-on:keyup="validate" />
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-6"><button type="submit" class="btn btn-submit btn-md">Submit</button></div>
            <div class="col-md-6 text-end"><router-link class="text-decoration-none text-dark" to="/forgot-password">Forgot Password?</router-link></div>
          </div>

          <div id="register-link" class="text-right">
            Don't have an account? <router-link to="/register" class="text-dark text-decoration-none fw-bold">Register here</router-link>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "AuthLayout",
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      isFormSubmitted: false
    }
  },
  methods: {
    login: function (e) {
      let $this = this;
      this.isFormSubmitted = true;

      e.preventDefault()
      if (!this.validate()) {
        return;
      }
      this.$store.dispatch('login', { email: this.email, password: this.password })
    },
    validate: function () {
      if (!this.isFormSubmitted) {
        return;
      }
      this.errors = [];
      if (this.email == '') {
        this.errors.push('Please enter a valid email')
      }
      if (this.password == '') {
        this.errors.push('Please enter password')
      }
      return !this.errors.length;
    }
  },
  created() {

  },
  mounted() {

  },
  computed: {
    ...mapGetters([
      'isAutenticated'
    ])
  }
};
</script>

<style>
#login-column {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 30px;
  color: #fff;
}

.btn-submit {
  background: #427fc5 !important;
  color: #fff !important;
  margin: 20px 0px;
  padding: 7px 25px !important;
}

.btn-submit:hover {
  background: #5392da !important;
}
</style>