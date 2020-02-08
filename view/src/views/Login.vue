<template>
  <div class="centralDiv">
    <v-card class="ma-2">
      <h2 class="text-center">
        Login
      </h2>
      <v-col cols="12" sm="12">
        <EmailField label="E-mail" @model="loginForm.email = $event" />
      </v-col>

      <v-col cols="12" sm="12">
        <PasswordField @model="loginForm.password = $event" />
      </v-col>
      <div class="text-center">
        <v-col cols="12">
          <BlackButton
            class="mx-2"
            name="Register"
            @eventClick="toRegister()"
          />
          <GreenButton class="mx-2" name="Login" @eventClick="login()" />
        </v-col>
      </div>
    </v-card>
  </div>
</template>

<script>
import EmailField from "../components/inputs/EmailField";
import PasswordField from "../components/inputs/PasswordField";
import BlackButton from "../components/button/BlackButton";
import GreenButton from "../components/button/GreenButton";
export default {
  components: {
    EmailField,
    PasswordField,
    BlackButton,
    GreenButton
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
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
        this.notify(result.data.ok, "green");
      } catch (error) {
        this.notify(error.response.data.error, "red");
      }
    },
    checkLogin() {
      if (this.user.id !== null) {
        this.$router.replace("home");
      }
    },
    toRegister() {
      this.$router.replace("/register");
    }
  }
};
</script>

<style lang="scss" scoped></style>
