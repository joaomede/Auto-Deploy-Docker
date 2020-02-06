<template>
  <div class="centralDiv">
    <v-card class="ma-2">
      <h2 class="text-center">
        Login
      </h2>
      <v-col cols="12" sm="12">
        <v-text-field
          v-model="loginForm.email"
          :rules="[rules.required, rules.email]"
          label="E-mail"
        />
      </v-col>

      <v-col cols="12" sm="12">
        <v-text-field
          v-model="loginForm.password"
          :rules="[rules.required, rules.min]"
          label="Your Password"
          type="Password"
        />
        <div class="text-center my-2">
          <v-btn color="black" dark class="ma-2" to="/register">
            Register
          </v-btn>
          <v-btn color="green" dark class="ma-2" @click="login()">
            Login
          </v-btn>
        </div>
      </v-col>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      rules: {
        min: v => v.length >= 8 || "Min 8 characters",
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    async login() {
      try {
        const result = await this.$axios.post(
          "/api/auth/login",
          this.loginForm
        );
        this.$store.dispatch("setLogin", result.data.user);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    checkLogin() {
      if (this.user.id !== null) {
        this.$router.replace("home");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
