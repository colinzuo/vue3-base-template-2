<template>
  <div class="container">
    <nav class="mx-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/auth/login">Login</RouterLink>
      <RouterLink to="/auth/signup">Signup</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

nav {
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
}

nav a {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
