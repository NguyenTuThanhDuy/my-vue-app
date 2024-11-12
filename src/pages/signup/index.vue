<template>
  <v-container
    fluid
    class="d-flex flex-column justify-center align-center py-8"
  >
    <v-row justify="center">
      <v-col>
        <v-card class="pa-6" outlined>
          <!-- Signup Icon and Title -->
          <v-row class="d-flex justify-center">
            <h2>
              <v-icon large>mdi-account-plus</v-icon>
              <span class="ml-2">Sign Up</span>
            </h2>
          </v-row>

          <!-- Form -->
          <v-form
            ref="signupForm"
            v-model="formValid"
            @submit.prevent="handleSubmit"
          >
            <!-- Email Field -->
            <v-text-field
              label="Email"
              v-model="formData.email"
              type="email"
              :error-messages="emailErrors"
              :rules="[rules.required, rules.email]"
              required
            ></v-text-field>

            <!-- Password Field -->
            <v-text-field
              label="Password"
              v-model="formData.password"
              type="password"
              :error-messages="passwordErrors"
              :rules="[rules.required, rules.minLength]"
              required
            ></v-text-field>

            <!-- Confirm Password Field -->
            <v-text-field
              label="Confirm Password"
              v-model="formData.confirmPassword"
              type="password"
              :error-messages="confirmPasswordErrors"
              :rules="[rules.required, rules.passwordMatch]"
              required
            ></v-text-field>

            <!-- Acceptance Checkbox -->
            <v-checkbox
              v-model="formData.isAccepted"
              label="I accept the Terms and Conditions"
              :error-messages="acceptanceErrors"
              :rules="[rules.accepted]"
              required
            ></v-checkbox>

            <!-- Submit Button -->
            <v-btn
              :loading="loading"
              :disabled="!formValid || loading"
              type="submit"
              color="primary"
              block
            >
              <template v-if="!loading">Sign up</template>
              <v-progress-circular
                v-else
                indeterminate
                size="20"
              ></v-progress-circular>
            </v-btn>

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

// Reactive form data and validation state
const formData = ref({
  email: "",
  password: "",
  confirmPassword: "",
  isAccepted: false,
});
const loading = ref(false);
const formValid = ref(false);

// Validation rules
const rules = {
  required: (v: string) => !!v || "Field is required",
  email: (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  minLength: (v: string) =>
    (v && v.length >= 6) || "Password must be at least 6 characters",
  passwordMatch: () =>
    formData.value.password === formData.value.confirmPassword ||
    "Passwords must match",
  accepted: (v: boolean) => v || "You must accept the Terms and Conditions",
};

// Error messages for validation
const emailErrors = ref<string[]>([]);
const passwordErrors = ref<string[]>([]);
const confirmPasswordErrors = ref<string[]>([]);
const acceptanceErrors = ref<string[]>([]);

// Get the signup URL from routes
const routes = useRoutes();
const url = routes.URLs.SIGNUP_URL();

// Watch form data to perform real-time validation
watch(
  () => formData.value,
  () => {
    emailErrors.value = [];
    passwordErrors.value = [];
    confirmPasswordErrors.value = [];
    acceptanceErrors.value = [];

    // Basic validation
    if (!formData.value.isAccepted)
      acceptanceErrors.value.push("You must accept the Terms and Conditions");
    if (formData.value.password !== formData.value.confirmPassword)
      confirmPasswordErrors.value.push("Passwords must match");
  },
  { deep: true }
);

// Form submit handler
const handleSubmit = async () => {
  if (!formValid.value) return;

  loading.value = true;
  try {
    const data = {
      user_account: {
        username: formData.value.email,
        password: formData.value.password,
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
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.error("Axios Error: ", (error as AxiosError).message);
      emailErrors.value = [error.response.data.message || "An error occurred"];
    } else {
      console.error("Unknown Error: ", error);
      emailErrors.value = ["An unexpected error occurred"];
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.ml-2 {
  margin-left: 8px;
}
.text-center {
  text-align: center;
}
</style>
