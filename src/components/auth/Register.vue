<template>
  <div class="container-fluid row justify-content-center">
    <div class="col-md-6 register-form">
      <h3 class="text-center fw-bold">REGISTER</h3>
      <h5 class="text-center text-success" v-if="success">Registration Successful</h5>
      <form v-on:submit="register">
        <div class="form-group pt-2">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" aria-describedby="nameHelp" v-model="formData.name">
          <small id="nameHelp" class="form-text text-danger" v-if="errors.name">{{ errors.name }}</small>
        </div>
        <div class="form-group pt-2">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="formData.email">
          <small id="emailHelp" class="form-text text-danger" v-if="errors.email">{{ errors.email }}</small>
        </div>

        <div class="form-group pt-2">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" aria-describedby="passwordHelp"
            v-model="formData.password">
          <small id="passwordHelp" class="form-text text-danger" v-if="errors.password">{{ errors.password }}</small>
        </div>

        <div class="form-group pt-2">
          <label for="password_confirmation">Confirm Password</label>
          <input type="password" class="form-control" id="email" aria-describedby="passwordConfirmationHelp"
            v-model="formData.password_confirmation">
          <small id="passwordConfirmationHelp" class="form-text text-danger" v-if="errors.password">{{
            errors.password }}</small>
        </div>

        <div class="form-group mt-2">
          <button type="submit" class="btn btn-submit">Submit</button>
        </div>
      </form>
      <div id="register-link" class="text-center">
        Already have an account? <router-link to="/login" class="text-dark text-decoration-none fw-bold">Login
          here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Register',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      errors: {},
      success: false
    }
  },
  methods: {
    register: function (e) {
      e.preventDefault()
      if (this.validate()) {
        return;
      }
      let $this = this;
      let formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('email', this.formData.email);
      formData.append('password', this.formData.password);
      formData.append('password_confirmation', this.formData.password_confirmation);
      axios.post('/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        let res = response.data;

        if (res.error) {
          $this.errors.name = '';
          $this.errors.email = '';
          $this.errors.pass = '';

          if (res.data.name)
            $this.errors['name'] = res.data.name[0];
          if (res.data.email)
            $this.errors['email'] = res.data.email[0];
          if (res.data.password)
            $this.errors['password'] = res.data.password[0];
          return;
        }
        if (res.status == 'ok') {
          $this.success = true

          $this.formData.name = '';
          $this.formData.email = '';
          $this.formData.password = '';
          $this.formData.password_confirmation = '';
        }

      });

    },

    validate: function () {
      this.errors = [];
      let is_error = false;
      if (!this.formData.name) {
        this.errors['name'] = 'Name is required';
        is_error = true;
      }

      if (!this.formData.email) {
        this.errors['email'] = 'Email is required';
        is_error = true;
      }
      if (!this.formData.password) {
        this.errors['password'] = 'Password is required';
        is_error = true;
      }

      return is_error;
    }
  }
}
</script>

<style>
.register-form {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 30px !important;
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