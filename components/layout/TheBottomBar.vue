<template>
  <div>
    <v-bottom-navigation
      v-if="visible"
      v-model="active"
      grow
      app
      class="bottomBar"
      color="primary"
      :min-width="0"
    >
      <v-btn value="timeline" @click="pushRoute('timeline', 'timeline')">
        <div>Words</div>
        <v-icon>mdi-format-list-text</v-icon>
      </v-btn>

      <v-btn value="actions" @click="pushRoute('dashboard', 'actions')">
        <div>Actions</div>
        <v-icon>mdi-playlist-edit</v-icon>
      </v-btn>

      <v-btn value="create" @click="createSnippet">
        <div>Create</div>
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>

      <v-btn value="dashboard" @click="pushRoute('dashboard', 'dashboard')">
        <div>Dashboard</div>
        <v-icon>mdi-view-dashboard-variant-outline</v-icon>
      </v-btn>

      <v-btn value="account" @click="pushRoute('account', 'account')">
        <div>Account</div>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-bottom-sheet> </v-bottom-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      value: 'home',
    }
  },
  computed: {
    ...mapGetters({
      activeValue: 'bottomBar/active',
    }),
    visible() {
      return this.$auth.loggedIn && this.$auth.user.is_verified
    },
    active: {
      get() {
        return this.activeValue
      },
      set(activeValue) {
        this.setActive(activeValue)
      },
    },
  },

  methods: {
    ...mapActions({
      setActive: 'bottomBar/setActive',
    }),

    pushRoute(active, route) {
      this.setActive(active)
      this.$router.push({
        name: route,
      })
    },

    async createSnippet() {
      try {
        const snippet = await this.$axios.$post('snippets')
        this.setActive('create')
        this.$router.push({
          name: 'snippets-id-edit',
          params: { id: snippet.data.uuid },
        })
      } catch (e) {}
    },
  },
}
</script>

<style scoped lang="scss">
.v-btn {
  min-width: 10px !important;
  padding: 0 !important;
}
</style>
