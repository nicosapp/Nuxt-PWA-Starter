<template>
  <v-container dark>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-form
          ref="form"
          v-model="valid"
          class="mb-4"
          lazy-validation
          @submit.prevent="signup"
        >
          <v-text-field
            id="name"
            v-model="form.name"
            name="name"
            :rules="[rules.required, nameLength]"
            label="Username"
            :error-messages="validation.name"
            required
            filled
          ></v-text-field>
          <v-text-field
            id="email"
            v-model="form.email"
            name="email"
            :rules="[rules.required, rules.emailValid]"
            label="E-mail"
            :error-messages="validation.email"
            required
            filled
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[
              rules.required,
              rules.passwordLength,
              rules.passwordLowerCase,
              rules.passwordUpperCase,
              rules.passwordSpecials,
              rules.passwordNumbers,
            ]"
            :type="show ? 'text' : 'password'"
            name="password"
            label="Password"
            filled
            required
            :error-messages="validation.password"
            @click:append="show = !show"
          ></v-text-field>

          <v-text-field
            v-model="form.password_confirmation"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.passwordMatch]"
            :type="show ? 'text' : 'password'"
            name="password_confirmation"
            label="Password confirmation"
            filled
            required
            :error-messages="validation.password_confirmation"
            @click:append="show = !show"
          ></v-text-field>

          <div class="d-flex justify-center">
            <v-btn
              block
              height="3em"
              type="submit"
              :disabled="!valid || loading"
              :loading="loading"
              color="primary"
              class="mr-4"
              @click="validate"
            >
              Sign up
            </v-btn>
          </div>
        </v-form>
        <div class="text-center">
          Already an account ?
          <nuxt-link to="/auth/signup">Sign in here</nuxt-link>
        </div>
        <div><SocialLoginButton :socials="['google', 'facebook']" /></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import validationRules from '@/mixins/helper/formValidationRules'
import SocialLoginButton from '../components/SocialLoginButton'
export default {
  components: {
    SocialLoginButton,
  },
  mixins: [validationRules],
  data() {
    return {
      loading: true,
      valid: true,
      show: false,
      nameLength: (v) => v.length >= 4 || 'Min 4 characters',
      validation: {},
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  computed: {
    isError() {
      return Object.keys(this.validation).length
    },
  },
  methods: {
    validate() {
      this.validation = {}
      this.$refs.form.validate()
    },
    async signup() {
      this.loading = true
      try {
        await this.$axios.$post('auth/signup', this.form)
        this.$router.push({
          name: 'account',
        })
      } catch (e) {
        if (e.response.status === 422) {
          this.validation = e.response.data.errors
          this.$notifier.error({ message: 'There is an error in the form!' })
        }
      }
      this.loading = false
    },
  },
  head() {
    return {
      title: 'Sign up',
    }
  },
}
</script>
