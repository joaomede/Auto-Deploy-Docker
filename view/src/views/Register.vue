<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
    <div class="centralDiv">
      <v-card class="ma-2">
        <h2 class="text-center">
          Register
        </h2>
        <v-col cols="12" sm="12">
          <ValidationProvider
            name="Email"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="loginForm.name"
              label="Your name"
              :error-messages="errors"
              :success="valid"
              outlined
              rounded
              dense
              required
            ></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" sm="12">
          <ValidationProvider
            name="Email"
            rules="required|email"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="loginForm.email"
              :error-messages="errors"
              :success="valid"
              outlined
              rounded
              dense
              label="Email"
              required
            ></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" sm="12">
          <ValidationProvider
            name="password"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="loginForm.password"
              :error-messages="errors"
              :success="valid"
              label="Your Password"
              type="password"
              outlined
              rounded
              dense
              required
            ></v-text-field>
          </ValidationProvider>
          <div class="text-center my-2">
            <BlackButton
              class="mx-2"
              name="Back To Login"
              @eventClick="toLogin()"
            />
            <GreenButtonValid
              :invalid="invalid"
              :validated="validated"
              :passes="passes"
              name="Register"
              @eventClick="register()"
            />
          </div>
        </v-col>
      </v-card>
    </div>
  </ValidationObserver>
</template>

<script>
import BlackButton from "../components/button/BlackButton";
import GreenButtonValid from "../components/button/GreenButtonValid";

export default {
  components: {
    BlackButton,
    GreenButtonValid
  },
  data() {
    return {
      loginForm: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    async register() {
      try {
        const result = await this.$axios.post(
          "/api/auth/register",
          this.loginForm
        );
        this.$store.dispatch("setLogin", result.data.user);
        this.notify(result.data.ok, "green");
      } catch (error) {
        this.notify(error.response.data.error, "red");
      }
    },
    toLogin() {
      this.$router.replace("/login");
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
