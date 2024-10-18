<template>
  <v-container
    fluid
    class="d-flex flex-column justify-center align-center py-8"
  >
    <v-row justify="center">
      <v-col>
        <v-card class="pa-6" outlined>
          <!-- Login Icon -->
          <v-row class="justify-center">
            <v-icon large>mdi-login</v-icon>
            <v-label text="Login"></v-label>
          </v-row>

          <!-- Form -->
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              label="Email"
              v-model="formData.email"
              type="email"
              required
            ></v-text-field>

            <v-text-field
              label="Password"
              v-model="formData.password"
              type="password"
              required
            ></v-text-field>

            <v-row justify="center" class="">
              <v-col>
                <v-checkbox v-model="remember" label="Remember me"></v-checkbox>
              </v-col>
              <v-col>
                <v-btn class="mt-2" href="/forget">Forgot password?</v-btn>
              </v-col>
            </v-row>

            <!-- Submit Button -->
            <v-btn type="submit" color="primary" block>Sign in</v-btn>

            <!-- Sign up link -->
            <v-row justify="center" class="mt-4">
              <p class="text-center">
                Don’t have an account yet? <v-btn href="/signup">Sign up</v-btn>
              </p>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/services/axios";
import useRoutes from "@/hooks/routes";
import { useAuthStore } from "@/stores/authStore";
import { AxiosError } from "axios";

// Access the user information store (pinia or other state management tool)
const userInfo = useAuthStore();

// Reactive form data
const formData = ref({
  email: "",
  password: "",
});

const remember = ref(false);
const router = useRouter();

// Get the login URL from routes
const routes = useRoutes();
const url = routes.URLs.LOGIN_URL();

// Check if the user is already logged in
onMounted(() => {
  const user = sessionStorage.getItem("user");
  if (user) {
    const userObject = JSON.parse(user);
    if (
      Object.values(userObject).every(
        (value) => value !== undefined && value !== null
      )
    ) {
      router.replace("/");
    }
  }
});

// Handle form submission
const handleSubmit = async () => {
  try {
    const response = await axiosInstance.post(url, {
      username: formData.value.email,
      password: formData.value.password,
    });

    // Update the user information in the store
    userInfo.setUserInfo(response.data);

    // Redirect to the homepage after successful login
    router.push("/");
    window.location.reload();
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      console.error("Axios Error: ", (error as AxiosError).message);
    } else {
      console.error("Unknown Error: ", error);
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
