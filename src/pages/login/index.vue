<template>
  <v-container
    fluid
    class="d-flex flex-column justify-center align-center py-8"
  >
    <v-row justify="center">
      <v-col>
        <v-card class="pa-6" outlined>
          <!-- Login Icon and Title -->
          <v-row class="d-flex justify-center">
            <h2>
              <v-icon large>mdi-login</v-icon>
              <span class="ml-2">Login</span>
            </h2>
          </v-row>

          <!-- Form -->
          <v-form
            ref="loginForm"
            v-model="formValid"
            @submit.prevent="handleSubmit"
          >
            <v-text-field
              clearable
              label="Email"
              v-model="formData.email"
              type="email"
              :error-messages="emailErrors"
              :rules="[rules.required, rules.email]"
              required
            ></v-text-field>

            <v-text-field
              clearable
              label="Password"
              v-model="formData.password"
              type="password"
              :error-messages="passwordErrors"
              :rules="[rules.required, rules.minLength]"
              required
            ></v-text-field>

            <v-row justify="center">
              <v-col>
                <v-checkbox v-model="remember" label="Remember me"></v-checkbox>
              </v-col>
              <v-col class="text-right">
                <v-btn href="/forget" class="mt-2">Forgot password?</v-btn>
              </v-col>
            </v-row>

            <!-- Submit Button -->
            <v-btn
              :loading="loading"
              :disabled="!formValid || loading"
              type="submit"
              color="primary"
              block
            >
              <!-- Use a conditional rendering directly inside the button content -->
              <template v-if="!loading"> Sign in </template>
              <v-progress-circular
                v-else
                indeterminate
                size="20"
              ></v-progress-circular>
            </v-btn>

            <!-- Sign up link -->
            <v-row justify="center" class="mt-4">
              <p class="text-center">
                Don’t have an account yet?
                <v-btn href="/signup">Sign up</v-btn>
              </p>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/services/axios";
import useRoutes from "@/hooks/routes";
import { useAuthStore } from "@/stores/authStore";
import { AxiosError } from "axios";

// Define the form data type
interface FormData {
  email: string;
  password: string;
}

const authStore = useAuthStore(); // Access the auth store

// Reactive form data
const formData: Ref<FormData> = ref({
  email: "",
  password: "",
});

const remember = ref<boolean>(false);
const loading = ref<boolean>(false);
const formValid = ref<boolean>(false);
const router = useRouter();

// Validation rules
const rules = {
  required: (v: string) => !!v || "Field is required",
  email: (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  minLength: (v: string) =>
    (v && v.length >= 6) || "Password must be at least 6 characters",
};

// Error messages for validation
const emailErrors = ref<string[]>([]);
const passwordErrors = ref<string[]>([]);

// Get the login URL from routes
const routes = useRoutes();
const url = routes.URLs.LOGIN_URL();

// Check if the user is already logged in
onMounted(() => {
  if (authStore.isLogin) {
    router.replace("/");
  }
});

// Handle form submission
const handleSubmit = async () => {
  loading.value = true;
  emailErrors.value = [];
  passwordErrors.value = [];

  try {
    const response = await axiosInstance.post(url, {
      username: formData.value.email,
      password: formData.value.password,
    });

    // Update the user information in the store
    authStore.setUserInfo(response.data);

    // Redirect to the homepage after successful login
    router.push("/");
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.error("Axios Error: ", error.message);
      const { status, data } = error.response;

      // Show error messages based on the response status
      if (status === 401) {
        emailErrors.value = ["Invalid email or password"];
        passwordErrors.value = ["Invalid email or password"];
      } else {
        emailErrors.value = [data.message || "An error occurred"];
      }
    } else {
      console.error("Unknown Error: ", error);
      emailErrors.value = ["An unexpected error occurred"];
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Custom styles */
.text-center {
  text-align: center;
}
.ml-2 {
  margin-left: 8px;
}
</style>
