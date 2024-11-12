<template>
  <v-container
    fluid
    class="d-flex flex-column justify-center align-center py-8"
  >
    <v-row justify="center">
      <v-col>
        <v-card class="pa-6" outlined>
          <!-- Signup Icon -->
          <v-row class="d-flex justify-center">
            <h2>
              <v-icon large>mdi-account-plus</v-icon>
              <v-label large>SignUp</v-label>
            </h2>
          </v-row>

          <!-- Form -->
          <v-form @submit.prevent="handleSubmit">
            <!-- Email Field -->
            <v-text-field
              label="Email"
              v-model="formData.email"
              type="email"
              required
            ></v-text-field>

            <!-- Password Field -->
            <v-text-field
              label="Password"
              v-model="formData.password"
              type="password"
              required
            ></v-text-field>

            <!-- Confirm Password Field -->
            <v-text-field
              label="Confirm Password"
              v-model="formData.confirmPassword"
              type="password"
              required
            ></v-text-field>

            <!-- Acceptance Checkbox -->
            <v-row justify="space-between" class="">
              <v-checkbox
                v-model="formData.isAccepted"
                label="I accept the Terms and Conditions"
                required
              ></v-checkbox>
            </v-row>

            <!-- Submit Button -->
            <v-btn type="submit" color="primary" block :disabled="!isError"
              >Sign up</v-btn
            >

            <!-- Login link -->
            <v-row justify="center" class="mt-4">
              <p class="text-center">
                Already have an account?
                <v-btn href="/login">Login here</v-btn>
              </p>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/services/axios";
import useRoutes from "@/hooks/routes";
import { AxiosError } from "axios";

// Initialize router
const router = useRouter();
let isError = false;

// Reactive form data
const formData = ref({
  email: "",
  password: "",
  confirmPassword: "",
  isAccepted: false,
});

// Get the signup URL from your route utilities
const routes = useRoutes();
const url = routes.URLs.SIGNUP_URL();

watch(formData.value, async (newData, oldData) => {
  if (
    newData.password !== newData.confirmPassword ||
    newData.password === "" ||
    newData.confirmPassword === "" ||
    !newData.isAccepted
  ) {
    isError = true;
  } else {
    isError = false;
  }
});
// Form submit handler
const handleSubmit = async () => {
  const { email, password, confirmPassword, isAccepted } = formData.value;

  // Basic validation
  if (password !== confirmPassword || !isAccepted) {
    isError = true;
    return;
  }
  isError = false;

  try {
    const data = {
      user_account: {
        username: email,
        password: password,
      },
      firstname: "Duy",
      lastname: "Nguyen",
      date_of_birth: "01/10/1997",
      phone_number: "84913906655",
    };

    const response = await axiosInstance.post(url, data);

    if (response.status === 201) {
      router.push({ name: "login" });
    } else {
      console.log(response.status);
    }
    // Redirect to the login page after successful signup
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      console.error("Axios Error: ", (error as AxiosError).message);
    } else {
      console.error("Unknown Error: ", error);
    }
  }
};
</script>

<style scoped lang="scss">
/* You can add your scoped styles here */
</style>
