<template>
  <div>
    <form
      novalidate
      class="md-layout jc-center register"
      @submit.prevent="validateUser"
    >
      <md-card
        class="md-layout-item md-size-50 md-small-size-120 overflow-y overflow-x "
      >
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-card-header>
              <md-card-title>
                <fundooTitle />
              </md-card-title>
              <v-card-title>
                Create your Account
              </v-card-title>
            </md-card-header>
            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('firstName')">
                    <label for="first-name">First Name</label>
                    <md-input
                      autocomplete="off"
                      v-model="form.firstName"
                      label="First name"

                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.firstName.required"
                      >The first name is required</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.firstName.minlength"
                      >Invalid first name</span
                    >
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-50">
                  <md-field :class="getValidationClass('lastName')">
                    <label for="last-name">Last Name</label>
                    <md-input
                      name="last-name"
                      autocomplete="off"
                      v-model="form.lastName"
                      outline
                      dense
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.lastName.required"
                      >The last name is required</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.lastName.minlength"
                      >Invalid last name</span
                    >
                  </md-field>
                </div>
              </div>
              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input
                  type="email"
                  name="email"
                   autocomplete="off"
                  v-model="form.email"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.email.required"
                  >The email is required</span
                >
                <span class="md-error" v-else-if="!$v.form.email.email"
                  >Invalid email</span
                >
              </md-field>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('password')">
                    <label for="password">Password</label>
                    <md-input
                      name="password"
                      type="password"
                      v-model="form.password"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.password.required"
                      >The password is required</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.password.minlength"
                      >Password should contain minimum 4 charecters
                    </span>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('password')">
                    <label for="cpassword">Confirm</label>
                    <md-input
                      name="cpassword"
                      type="password"
                      v-model="form.cpassword"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.cpassword.required"
                      >The confirm password is required</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.cpassword.minlength"
                      >Confirm Password should contain minimum 4 charecters
                    </span>
                  </md-field>
                </div>
              </div>
              <p class="password-hint">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </p>
            </md-card-content>
            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-content>
              <md-card-actions>
                <span>
                  <router-link to="/login">sign in instead</router-link>
                </span>
                <v-spacer> </v-spacer>
                <md-button
                  type="submit"
                  class="md-raised md-primary"
                  :disabled="sending"
                  >Next</md-button
                >
              </md-card-actions>
            </md-card-content>
          </div>
          <div class="md-layout md-small-size-50">
            <figure class="account-img">
              <img
                src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
                alt=""
                width="244"
                height="244"
                class="j9NuTc TrZEUc"
              />
              <figcaption class="oEvHdd">
                One account. All of Google working for you.
              </figcaption>
            </figure>
          </div>
        </div>
        <md-snackbar :md-active.sync="userSaved"
          >The user {{ user }} was saved with success please
          login!</md-snackbar
        >
         <md-snackbar :md-active.sync="userNotSaved"
          >Error Occured please try again!</md-snackbar
        >
      </md-card>
    </form>
  </div>
</template>

<script>
import router from '../router/route.js';
import fundooTitle from '../components/fundooTitle.vue';

import { validationMixin } from 'vuelidate';

import { required, email, minLength } from 'vuelidate/lib/validators';

import user from '../services/user.js';
export default {
  components: {
    fundooTitle,
  },

  name: 'register',
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      cpassword: null,
    },
    userNotSaved: false,
    userSaved: false,
    sending: false,
    user: null,
  }),

  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      cpassword: {
        required,
        minLength: minLength(6),
      },
    },
  },

  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.email = null;
      this.form.password = null;
      this.form.cpassword = null;
     
        router.push({ name: 'login' });
    
    },
    saveUser() {
      this.sending = true;
      let data = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        emailId: this.form.email,
        password: this.form.password,
        confirmPassword: this.form.cpassword,
      };
      user
        .registerUser(data)
        .then((result) => {
          console.log('Success', result);
           window.setTimeout(() => {
            this.user = `${data.firstName} ${data.lastName}`;
            this.userSaved = true;
            this.sending = false;
            this.clearForm();
          }, 2000);
        })
         .catch((error) => {
          this.userNotSaved = true;
           console.warn('error ', error);
        } );  
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("../scss/register.scss");
</style>
