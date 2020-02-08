<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
    <div class="centralDiv">
      <v-card class="ma-2">
        <v-form>
          <h2 class="text-center">
            Login
          </h2>
          <v-col cols="12" sm="12">
            <ValidationProvider
              name="email"
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
                label="E-mail"
                required
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-form>
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
              label="Password"
              type="password"
              outlined
              rounded
              dense
              required
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <div class="text-center">
          <v-col cols="12">
            <BlackButton
              class="mx-2"
              name="Register"
              @eventClick="toRegister()"
            />
            <v-btn
              color="primary"
              @click="passes(login)"
              :disabled="invalid || !validated"
              >Login</v-btn
            >
          </v-col>
        </div>
      </v-card>
    </div>
  </ValidationObserver>
</template>

<script>
import BlackButton from "../components/button/BlackButton";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    BlackButton,
    ValidationProvider,
    ValidationObserver
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
