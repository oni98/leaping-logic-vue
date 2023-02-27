<template>
    <div id="login-column" class="col-md-4">
        <div id="login-box" class="col-md-12">
            <form id="login-form" class="form" v-on:submit="forgotPassword" method="post">
                <h3 class="text-center fw-bold">Send Reset Email</h3>

                <div class="form-group pt-2">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                        v-model="formData.email">
                    <small id="emailHelp" class="form-text text-danger" v-if="errors.email">{{ errors.email }}</small>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-submit btn-md">Send</button>
                </div>

                <div id="register-link" class="text-center">
                    <router-link to="/login" class="text-dark text-decoration-none fw-bold">Back to Login</router-link>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
    name: "AuthLayout",
    data() {
        return {
            formData: {
                email: '',
            },
            errors: {},
            success: false
        }
    },
    methods: {
        forgotPassword: function (e) {
            e.preventDefault()
            if (this.validate()) {
                return;
            }
            let $this = this;
            let formData = new FormData();
            formData.append('email', this.formData.email);
            axios.post('/forgot-password', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (response) {
                let res = response.data;
                if (res.error) {
                    $this.errors.email = '';

                    if (res.data.email)
                        $this.errors['email'] = res.data.email[0];
                    return;
                }
                if (response.status == 200) {
                    $this.success = true
                    alert('We have emailed your password reset link')
                    $this.formData.email = '';
                }

            });

        },
        validate: function () {
            this.errors = [];
            let is_error = false;
            if (!this.formData.email) {
                this.errors['email'] = 'Email is required';
                is_error = true;
            }

            return is_error;
        }
    },
    created() {

    },
    mounted() {

    },
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