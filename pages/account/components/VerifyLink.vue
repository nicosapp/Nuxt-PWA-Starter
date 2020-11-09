<template>
  <v-alert
    border="left"
    color="primary"
    prominent
    dark
    icon="mdi-account-reactivate"
  >
    <v-card flat color="primary">
      <v-card-title>Email verification</v-card-title>
      <v-card-subtitle
        >Please check your mail box to activate your account</v-card-subtitle
      >
      <v-card-actions>
        <v-btn
          text
          :disabled="loading"
          :loading="loading"
          @click.prevent="send"
        >
          send a new activation link
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      absolute: true,
      overlay: true,
    }
  },
  computed: {
    isNotVerified() {
      return !this.$auth.user.is_verified
    },
  },
  methods: {
    async send() {
      this.loading = true
      try {
        await this.$axios.$post('email/resend')
        this.$notifier.success({
          message:
            'An email has been sent to you! Click on the link to activate your account',
        })
      } catch (e) {
        if (e.response && e.response.status === 429) {
          this.$notifier.warn({
            message: 'Please wait a few minutes to request a new email',
          })
          return
        }
        this.$notifier.error500()
      }
      this.loading = false
    },
  },
}
</script>
